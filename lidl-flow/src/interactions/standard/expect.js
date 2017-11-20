import { send } from "../base/foreign";

import { mapValues } from "lodash/fp";

const mapValuesUncapped = mapValues.convert({ cap: false });

/**
 * All jasmine expect() methods wrapped into a LIDL Input interface
 * The interface receives the value and then checks the expectation on it
 */
const isExpectedAutomatic = mapValuesUncapped(
  (method, key) => (...v) => send(r => expect(r)[key](...v)),
  expect()
);

export const isExpected = {
  ...isExpectedAutomatic,
  // Manual way to add methods, for example:
  // toEqual: (...v) => send(r => expect(r).toEqual(...v)),
  // toBe: (...v) => send(r => expect(r).toBe(...v)),
  toBeInactive: (...v) => send(r => expect(r).toEqual("inactive"))
};
