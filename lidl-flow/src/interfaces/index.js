/* @flow */
export type Input<T: Value> = { type: "input", set: T => Promise<void> };
export type Output<T: Value> = { type: "output", get: void => Promise<T> };
export type CompositeInterface = {
  type: "composite",
  content: { [string]: Interface }
};
export type Interface = Input<*> | Output<*> | CompositeInterface;
