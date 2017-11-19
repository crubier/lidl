/* @flow */
import { type Value } from "../types";

export type Input<T: Value> = { type: "input", set: T => Promise<any> };
export type Output<T: Value> = { type: "output", get: any => Promise<T> };
export type CompositeInterface = {
  type: "composite",
  content: { [string]: Interface }
};
export type Interface = Input<*> | Output<*> | CompositeInterface;
