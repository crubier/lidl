/* @flow */

import { receive } from "../base/foreign";
import { type Value } from "../../types";

export function literal(value: Value) {
  return receive(() => value);
}
