/* @flow */

import { send } from "../base/foreign";

export function print(
  name: string,
  loggingFunction: string => any = console.log
) {
  return send(x => loggingFunction(`${name}: ${x.toString()}`));
}
