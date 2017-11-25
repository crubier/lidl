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

import Source from "../../utils/source";

/** Sets the arguments value to the input value
 * @param args operands which will receive the value of the input
 */
//TODO
export function allInput<T: Value>(...args: Input<T>[]): Input<T> {
  return {
    type: "input",
    set: async function(flow: AsyncGenerator<T, void, void>) {
      const argsSetGenerators = args.map(arg => {
        const source = new Source();
        arg.set(source.generator());
        return source;
      });
      for await (const value of flow) {
        await Promise.all(
          argsSetGenerators.map(async source => {
            await source.yield(value);
          })
        );
      }
      // return await Promise.all(args.map(arg => arg.set(value)));
    }
  };
}

export const all = allInput;
