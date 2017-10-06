// @flow

///////////////////////////////////////////////////////////////////////////////

import assert from "assert";
import { keys } from "lodash/fp";
import { getChannel, setChannel } from "./asyncs";

///////////////////////////////////////////////////////////////////////////////

type inactive = "inactive";
type Activation = inactive | "active";
type Boolean = inactive | boolean;
type Number = inactive | number;
type Text = inactive | string;
type Value = Activation | Boolean | Number | Text;

type Input<T: Value> = { type: "input", set: T => Promise<void> };
type Output<T: Value> = { type: "output", get: void => Promise<T> };
type CompositeInterface = { type: "output", content: { [string]: Interface } };
type Interface = Input<*> | Output<*> | CompositeInterface;

let channels: { [string]: any } = {};

///////////////////////////////////////////////////////////////////////////////
// Interactions

// Receive from a global channel
function receive<T: Value>(variableName: string): Output<T> {
  return {
    type: "output",
    get: async () => {
      return await getChannel(channels, variableName);
    }
  };
}

// Send to a global channel
function send<T: Value>(variableName: string): Input<T> {
  return {
    type: "input",
    set: async (x: T) => {
      await setChannel(channels, variableName, x);
      return;
    }
  };
}

// Receive a constant value
function constant<T: Value>(value: T): Output<T> {
  return {
    type: "output",
    get: async () => {
      return value;
    }
  };
}

// Print a value
function print<T: Value>(prefix?: string = ""): Input<T> {
  return {
    type: "input",
    set: async (x: T) => {
      console.log(`${prefix}: ${x.toString()}`);
      return;
    }
  };
}

// Sets the left value to the right value
function affect<T: Value>(left: Input<T>, right: Output<T>): Input<Activation> {
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

// // Equivalent to the left value while outputing active to the right
// function withBehaviour<T>(left: Output<T>, right: Input<Activation>): Output<T> {
//   return async (activation: Activation) => {
//     if (activation === "active") {
//       const value: T = await right();
//       await left(value);
//       return;
//     } else {
//       await left("inactive");
//       return;
//     }
//   };
// }

///////////////////////////////////////////////////////////////////////////////

const tests = {
  test1: async () => {
    const [output1, input1, output2, lol] = await Promise.all([
      receive("toto").get(),
      send("toto").set(3),
      constant("inactive").get(),
      print("Bob").set(5)
    ]);
    assert(output1 === 3);
    assert(output2 === "inactive");
  },
  test2: async () => {
    const [input1] = await Promise.all([affect(print("Bob"), constant(120)).set("active")]);
  }
};

async function main(tests) {
  for (let a of keys(tests)) {
    console.log("=================================================");
    console.log("");
    console.log(`Testing "${a}"`);
    await tests[a]();
    console.log("");
  }
}

main(tests);
