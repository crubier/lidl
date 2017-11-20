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

/**
 * Receive from an external function
 * @param func A function that returns a value or a promise of a value
 */
export function func<T: Value, U: Value>(f: T => U): Composite {
  let resolveFunction = null;
  let rejectFunction = null;
  let input = null;
  function perform() {
    if (resolveFunction != null && input != null) {
      resolveFunction(f(input));
      resolveFunction = null;
      rejectFunction = null;
      input = null;
    } else {
      return;
    }
  }
  return {
    type: "composite",
    elements: {
      input: {
        type: "input",
        set: async (value: T) => {
          input = value;
          perform();
        }
      },
      output: {
        type: "output",
        get: () => {
          return new Promise((resolve, reject) => {
            resolveFunction = resolve;
            rejectFunction = reject;
            perform();
          });
        }
      }
    }
  };
}
