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

/** Sets the arguments value to the input value
 * @param args operands which will receive the value of the input
 */
export function allInput<T: Value>(...args: Input<T>[]): Input<T> {
  return {
    type: "input",
    set: async (value: T) => {
      return await Promise.all(args.map(arg => arg.set(value)));
    }
  };
}

export const all = allInput;
