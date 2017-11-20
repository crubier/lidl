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

import { all } from "./all";

import { send, receive } from "./foreign";

import { composition } from "./composition";

import { mapValues, has, isNil, values, mergeWith } from "lodash/fp";

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

/** This function generates a stub for a given interface
 * A stub sends "inactive" through its outputs, and does not care about its inputs
 * @param i The interface to generate a stub for
 * @returns a stub interface compatible with i
 */
function stubForInterface(i: Interface): Interface {
  if (isNil(i)) {
    throw new Error(`Cannot create stub for null interface`);
  } else if (!has("type", i)) {
    throw new Error(`Cannot create stub for interface with no type defined`);
  } else if (i.type === "input") {
    // The stub sends inactive values
    return receive(() => "inactive");
  } else if (i.type === "output") {
    // The stub does not care about what it receives
    return send(x => null);
  } else if (i.type === "composite") {
    // The stub decomposes
    return composition(mapValues(e => stubForInterface(e), i.elements));
  } else {
    throw new Error(`Cannot create stub for interface of type ${i.type}`);
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
  if (isNil(left) && isNil(right)) {
    // If nothing on both sides, then this interaction is basically useless
    return send(x => null);
  } else if (isNil(left)) {
    // If nothing on left, then we make a stub for the right to work
    return affect(stubForInterface(right), right);
  } else if (isNil(right)) {
    // If nothing on right, then we make a stub for the left to work
    return affect(left, stubForInterface(left));
  } else if (left.type === "input" && right.type === "output") {
    // Dataflow is ok and going in the usual direction
    return affectInput(left, right);
  } else if (left.type === "output" && right.type === "input") {
    // Dataflow is ok and going in the opposite direction
    return affectOutput(left, right);
  } else if (left.type === "composite" && right.type === "composite") {
    // Complex affectations get decomposed into smaller elements
    if (isCompatible(left, right)) {
      return all(
        ...values(
          mergeWith(
            (leftElement, rightElement, key) =>
              affect(leftElement, rightElement),
            left.elements,
            right.elements
          )
        )
      );
    } else {
      // Undefined behaviour
      throw new Error(
        `Unsupported affect incompatible interfaces ${left.toString()} and ${right.toString()}`
      );
    }
  } else {
    // Undefined behaviour
    throw new Error(
      `Unsupported affect between ${left.toString()} and ${right.toString()}`
    );
  }
}
