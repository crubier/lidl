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

/**
 * Receive from an external function
 * @param func A function that returns a value or a promise of a value
 */
export function receive<T: Value>(func: any => T | Promise<T>): Output<T> {
  return {
    type: "output",
    get: async () => {
      if (func != null) {
        const result = func();
        if (result != null) {
          if (result.then != null) {
            const promiseResult = await result;
            if (promiseResult != null) {
              return promiseResult;
            } else {
              return "inactive";
            }
          } else {
            return result;
          }
        } else {
          return "inactive";
        }
      } else {
        return "inactive";
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
    set: async (x: T) => {
      if (func != null) {
        const result = func(x);
        if (result) {
          if (result.then != null) {
            const promiseResult = await result;
            if (promiseResult != null) {
              return promiseResult;
            } else {
              return "inactive";
            }
          } else {
            return result;
          }
        } else {
          return "inactive";
        }
      } else {
        return "inactive";
      }
    }
  };
}
