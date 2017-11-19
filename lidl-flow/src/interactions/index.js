/* @flow */

///////////////////////////////////////////////////////////////////////////////

import assert from "assert";
import { keys } from "lodash/fp";
import { getChannel, setChannel } from "../utils/asyncs";

///////////////////////////////////////////////////////////////////////////////

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

let channels: { [string]: any } = {};

///////////////////////////////////////////////////////////////////////////////
// Interactions

// Receive from a global channel
export function receive<T: Value>(variableName: string): Output<T> {
  return {
    type: "output",
    get: async () => {
      return await getChannel(channels, variableName);
    }
  };
}

// Send to a global channel
export function send<T: Value>(variableName: string): Input<T> {
  return {
    type: "input",
    set: async (x: T) => {
      await setChannel(channels, variableName, x);
      return;
    }
  };
}

// Receive a constant value
export function constant<T: Value>(value: T): Output<T> {
  return {
    type: "output",
    get: async () => {
      return value;
    }
  };
}

// Print a value
export function print<T: Value>(prefix?: string = ""): Input<T> {
  return {
    type: "input",
    set: async (x: T) => {
      console.log(`${prefix}: ${x.toString()}`);
      return;
    }
  };
}

// Sets the left value to the right value
export function affectSimple<T: Value>(
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
        const value: T = "inactive";
        await left.set(value);
        return;
      }
    }
  };
}

// Sets the left value to the right value
export function apply<T: Value, U: Value>(
  f: Output<(T) => U>,
  x: Output<T>,
  y: Input<U>
): Input<Activation> {
  return {
    type: "input",
    set: async (activation: Activation) => {
      if (activation === "active") {
        const func: T => U = await f.get();
        const value: T = await x.get();
        await y.set(func(value));
        return;
      } else {
        const value: U = "inactive";
        await y.set(value);
        return;
      }
    }
  };
}

// // Equivalent to the left value while outputing active to the right
// function withBehaviour<T:Interface>(left: T, right: Input<Activation>): T {
//   return async (interf: T) => {
//
//   };
// }

///////////////////////////////////////////////////////////////////////////////

// const tests = {
//   test1: async () => {
//     const [output1, input1, output2, lol] = await Promise.all([
//       receive("toto").get(),
//       send("toto").set(3),
//       constant("inactive").get(),
//       print("Bob").set(5)
//     ]);
//     assert(output1 === 3);
//     assert(output2 === "inactive");
//   },
//   test2: async () => {
//     const [input1] = await Promise.all([
//       affectSimple(print("Bob"), constant(120)).set("active")
//     ]);
//   }
// };
//
// async function main(tests) {
//   for (let a of keys(tests)) {
//     console.log("=================================================");
//     console.log("");
//     console.log(`Testing "${a}"`);
//     await tests[a]();
//     console.log("");
//   }
// }
//
// main(tests);
