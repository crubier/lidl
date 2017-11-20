/* @flow */

///////////////////////////////////////////////////////////////////////////////

import assert from "assert";
import { keys } from "lodash/fp";

///////////////////////////////////////////////////////////////////////////////

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
  type CompositeInterface,
  type Interface
} from "../../interfaces";

/** Equivalent to first argument, while outputting a constant active value to b
 * @param a interaction which this is equivalent to
 * @param b interaction which will receive a constant active value
 */
export function withBehaviourInput<T: Value>(
  a: Input<T>,
  b: Input<Activation>
): Input<T> {
  return {
    type: a.type,
    set: async (value: T) => {
      return await Promise.all([a.set(value), b.set("active")]);
    }
  };
}

/** Equivalent to first argument, while outputting a constant active value to b
 * @param a interaction which this is equivalent to
 * @param b interaction which will receive a constant active value
 */
export function withBehaviourOutput<T: Value>(
  a: Output<T>,
  b: Input<Activation>
): Output<T> {
  return {
    type: a.type,
    get: async () => {
      const [ra, rb] = await Promise.all([a.get(), b.set("active")]);
      return ra;
    }
  };
}

/** Equivalent to first argument, while outputting a constant active value to b
 * @param a interaction which this is equivalent to
 * @param b interaction which will receive a constant active value
 */
export function withBehaviour<I: Interface>(a: I, b: Input<Activation>): I {
  if (a.type === "input") {
    return (withBehaviourInput(a, b): any); //FIXME
  } else if (a.type === "output") {
    return (withBehaviourOutput(a, b): any); //FIXME
  } else {
    throw new Error("Unsupported withBehaviour");
  }
}
