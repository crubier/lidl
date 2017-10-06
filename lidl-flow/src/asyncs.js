// @flow

import { isNil } from "lodash/fp";

const NUM_RETRIES = 1000;
const DELAY = 0;

export const retry = async (f: number => void, retries: number = NUM_RETRIES, delay: number = DELAY): Promise<any> => {
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

export const getChannel = async (
  channels: { [string]: any },
  index: string,
  retries: number = NUM_RETRIES,
  delay: number = DELAY
): Promise<any> => {
  let i = 0;
  // eslint-disable-line no-constant-condition
  while (true) {
    if (!isNil(channels[index])) {
      return channels[index];
    } else {
      if (i >= retries) {
        throw new Error(`Could not receive variable after ${i} tries`);
      } else {
        i = i + 1;
      }
      await sleep(delay);
    }
  }
};

export const setChannel = async (channels: { [string]: any }, index: string, value: any): Promise<void> => {
  channels[index] = value;
  return;
};

export const sleep = (duration: number = DELAY): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), duration);
  });
};
