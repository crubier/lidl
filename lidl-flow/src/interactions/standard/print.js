/* @flow */

import { send } from "../base/foreign";

export function print(name: string, loggingFunction = console.log) {
  return send(x => loggingFunction(`${name}: ${x.toString()}`));
}
