// @flow

import { isNil } from "lodash/fp";

const NUM_RETRIES = 10;
const DELAY = 1;

export const retry = async (f, retries = NUM_RETRIES, delay = DELAY) => {
  let i = 0;
  // eslint-disable-line no-constant-condition
  while (true) {
    try {
      return await f(i);
    } catch (err) {
      if (i === retries) {
        throw err;
      } else {
        i = i + 1;
      }
      await sleep(delay);
    }
  }
};

export const available = async (variable, retries = NUM_RETRIES, delay = DELAY) => {
  let i = 0;
  // eslint-disable-line no-constant-condition
  while (true) {
    if (!isNil(variable)) {
      return variable;
    } else {
      if (i === retries) {
        throw new Error("Could not receive variable");
      } else {
        i = i + 1;
      }
      await sleep(delay);
    }
  }
};

export const sleep = (duration = DELAY) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), duration);
  });
};
