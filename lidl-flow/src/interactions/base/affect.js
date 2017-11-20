/* @flow */

import {
  type Activation,
  type Boolean,
  type Number,
  type Text,
  type Value
} from "../../types";
import {
  type Input,
  type Output,
  type Composite,
  type Interface,
  isCompatible
} from "../../interfaces";

import { concat, map, flatMap, values } from "lodash/fp";

///////////////////////////////////////////////////////////////////////////////
// Interactions

/** Send Right value to Left
 * This is the usual affectation
 */
export function affectInput<T: Value>(
  left: Input<T>,
  right: Output<T>
): Input<Activation> {
  return {
    type: "input",
    set: async (activation: Activation) => {
      if (activation === "active") {
        const value: T = await right.get();
        await left.set(value);
        return;
      } else {
        const value: T = ("inactive": any);
        await left.set(value);
        return;
      }
    }
  };
}

/** Send Left value to Right
 * This is the reverse affectation
 */
export function affectOutput<T: Value>(
  left: Output<T>,
  right: Input<T>
): Input<Activation> {
  return {
    type: "input",
    set: async (activation: Activation) => {
      if (activation === "active") {
        const value: T = await left.get();
        await right.set(value);
        return;
      } else {
        const value: T = ("inactive": any);
        await right.set(value);
        return;
      }
    }
  };
}

function performAffectationToValue(v: Value, i: Interface): Promise<any>[] {
  if (i.type === "input") {
    return [i.set(v)];
  } else if (i.type === "output") {
    return [i.get()];
  } else if (i.type === "composite") {
    return flatMap(x => performAffectationToValue(v, x), values(i.elements));
  } else {
    throw new Error(
      `Cannot send value "${v.toString()}" to unknown interface "${i.toString()}" of type "${
        i.type
      }"`
    );
  }
}

function performAffectation(i: Interface, j: Interface): Promise<any>[] {
  if (i.type === "input") {
    return [i.set(v)];
  } else if (i.type === "output") {
    return [i.get()];
  } else if (i.type === "composite") {
    return flatMap(x => performAffectationToValue(v, x), values(i.elements));
  } else {
    throw new Error(
      `Cannot send value "${v.toString()}" to unknown interface "${i.toString()}" of type "${
        i.type
      }"`
    );
  }
}

export function affectComposite(
  left: Composite,
  right: Composite
): Input<Activation> {
  if (isCompatible(left, right)) {
    console.log("OKKKK");
    console.log(left.elements);
    return {
      type: "input",
      set: async (activation: Activation) => {
        if (activation === "active") {
          return await Promise.all(
            concat(
              performAffectationToValue("inactive", left),
              performAffectationToValue("inactive", right)
            )
          );
        } else {
          return await Promise.all(
            concat(
              performAffectationToValue("inactive", left),
              performAffectationToValue("inactive", right)
            )
          );
        }
      }
    };
  } else {
    throw new Error("Incompatible interfaces in affectation");
  }
}

/** General purpose affectation
 * @param left left hand side
 * @param right right hand side
 */
export function affect<I: Interface, J: Interface>(
  left: I,
  right: J
): Input<Activation> {
  if (left.type === "input" && right.type === "output") {
    return (affectInput(left, right): any); //FIXME
  } else if (left.type === "output" && right.type === "input") {
    return (affectOutput(left, right): any); //FIXME
  } else if (left.type === "composite" && right.type === "composite") {
    return (affectComposite(left, right): any); //FIXME
  } else {
    throw new Error("Unsupported affect");
  }
}
