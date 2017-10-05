// @flow

import { available } from "./asyncs";

type Input<X> = X => Promise<void>;
type Output<X> = void => Promise<X>;

let channel: ?number = undefined;

const output: Output<number> = async () => {
  return await available(channel);
};

const input: Input<number> = async x => {
  channel = x;
};

async function main() {
  const res = output();
  await input(3);
  console.log(await res);
}

try {
  main();
} catch (e) {
  console.log(e);
}
