/* @flow */

import { send } from "../base/foreign";

export function print(name: string) {
  return send(x => console.log(`${name}: ${x.toString()}`));
}
