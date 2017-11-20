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
  type Interface
} from "../../interfaces";

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
  } else {
    throw new Error("Unsupported affect");
  }
}
