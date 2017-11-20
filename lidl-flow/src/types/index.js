/* @flow */

import { isNil } from "lodash";

export type inactive = "inactive";
export type Lidl<T> = inactive | T;

export type Activation = Lidl<"active">;
export type Boolean = Lidl<boolean>;
export type Number = Lidl<number>;
export type Text = Lidl<string>;
export type Composite = Lidl<{ [string]: Value }>;
export type Value = Lidl<Activation | Boolean | Number | Text | Composite>;

export function isInactive(x: any): boolean {
  return x === "inactive" || isNil(x);
}
