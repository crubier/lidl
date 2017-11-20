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

import { isInactive } from "../../types";
import { isNil } from "lodash/fp";

/** Sets the arguments value to the input value
 * @param args operands which will receive the value of the input
 */
export function application<T: Value, U: Value>(
  f: {
    type: "composite",
    elements: {
      input: Input<T>,
      output: Output<U>
    }
  },
  x: Output<T>,
  y: Input<U>
): Input<Activation> {
  return {
    type: "input",
    set: async (value: Activation) => {
      if (value != "inactive") {
        const xPromise = isNil(x) ? "inactive" : await x.get();
        const [_, result] = await Promise.all([
          f.elements.input.set(xPromise),
          f.elements.output.get()
        ]);
        await y.set(result);
      } else {
        await y.set(("inactive": any));
      }
    }
  };
}
