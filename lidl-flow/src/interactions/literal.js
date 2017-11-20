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

// Receive a constant value
export function literal<T: Value>(value: T): Output<T> {
  return {
    type: "output",
    get: async () => {
      return value;
    }
  };
}
