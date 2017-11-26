/* @flow */
import { type Value } from "../types";
import { every, mergeWith, isNil } from "lodash/fp";

export type Input<T: Value> = { type: "input", set: T => Promise<any> };

export type Output<T: Value> = { type: "output", get: any => Promise<T> };

export type Composite = {
  type: "composite",
  elements: { [string]: Interface }
};

export type Interface = Input<Value> | Output<Value> | Composite;

export function isCompatible(i: Interface, j: Interface): boolean {
  if (isNil(i) || isNil(j)) {
    return true;
  } else if (i.type === "input" && j.type === "output") {
    return true;
  } else if (i.type === "output" && j.type === "input") {
    return true;
  } else if (i.type === "composite" && j.type === "composite") {
    return every(
      a => isCompatible(a[0], a[1]),
      mergeWith(
        (ei, ej) => [isNil(ei) ? null : ei, isNil(ej) ? null : ej],
        i.elements,
        j.elements
      )
    );
  } else {
    return false;
  }
}
