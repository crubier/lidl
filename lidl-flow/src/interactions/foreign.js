import {
  type Activation,
  type Boolean,
  type Number,
  type Text,
  type Value
} from "../types";
import {
  type Input,
  type Output,
  type CompositeInterface,
  type Interface
} from "../interfaces";

///////////////////////////////////////////////////////////////////////////////
// Interactions

// Receive from an external function
export function receive<T: Value>(func: any => T | Promise<T>): Output<T> {
  return {
    type: "output",
    get: async () => {
      const result = func();
      if (result) {
        if (result.then != null) {
          return await result;
        } else {
          return result;
        }
      } else {
        return "inactive";
      }
    }
  };
}

// Send to an external function
export function send<T: Value>(func: (T | Promise<T>) => any): Input<T> {
  return {
    type: "input",
    set: async (x: T) => {
      const result = func(x);
      if (result) {
        if (result.then != null) {
          return await result;
        } else {
          return result;
        }
      } else {
        return;
      }
    }
  };
}
