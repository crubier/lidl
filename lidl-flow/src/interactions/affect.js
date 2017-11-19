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

///////////////////////////////////////////////////////////////////////////////
// Interactions

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
        const value: T = ("inactive": any);
        await left.set(value);
        return;
      }
    }
  };
}

export const affect = affectSimple;
