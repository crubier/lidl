/* @flow */

import { type Lidl, isInactive } from "../../../types";
import { type Input, type Output } from "../../../interfaces";
import { func } from "../../base/function";
import { isNil, has } from "lodash/fp";

export const sum: Output<Lidl<number>> = func(
  (input: Lidl<{ x: Lidl<number>, y: Lidl<number> }>) => {
    if (isInactive(input) || typeof input === "string") {
      return "inactive";
    } else if (isInactive(input.x) || isInactive(input.y)) {
      return "inactive";
    } else {
      return input.x + input.y;
    }
  }
);
