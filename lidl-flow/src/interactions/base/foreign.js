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

import { isNil } from "lodash/fp";

/**
 * Receive from an external function
 * @param func A function that returns a value or a promise of a value
 */
export function receive<T: Value>(func: any => T | Promise<T>): Output<T> {
  return {
    type: "output",
    get: async function*(): AsyncGenerator<T, void, void> {
      if (func != null) {
        while (true) {
          const result = func();
          if (isNil(result)) {
            yield "inactive";
          } else {
            if (result.then != null) {
              const r = await result;
              if (isNil(r)) {
                yield "inactive";
              } else {
                yield r;
              }
            } else {
              if (isNil(result)) {
                yield "inactive";
              } else {
                yield result;
              }
            }
          }
        }
      } else {
        while (true) {
          yield "inactive";
        }
      }
    }
  };
}

/**
 * Send to an external function
 * @param func A function that gets a value or a promise of a value
 */
export function send<T: Value>(func: (T | Promise<T>) => any): Input<T> {
  return {
    type: "input",
    set: async function(flow: AsyncGenerator<T, void, void>) {
      if (func != null) {
        for await (const value of flow) {
          const result = func(value);
          if (result) {
            if (result.then != null) {
              await result;
            }
          }
        }
      } else {
        for await (const value of flow) {
        }
      }
    }
  };
}
