/* @flow */

import { defer, mapValues } from "lodash/fp";

import Promise from "bluebird";

type Return<R> = { error: false, done: true, value: R };
type Yield<Y> = { error: false, done: false, value: Y };
type Throw = { error: true, done: boolean, value: mixed };
type Result<T, R> = Return<R> | Yield<T> | Throw;

class AsyncChannel<T> {
  isReady: Promise<void>;
  promise: Promise<T>;
  resolve: T => mixed;
  reject: mixed => mixed;

  constructor() {}

  getReady() {
    this.isReady = new Promise((resolveReady, rejectReady) => {
      try {
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
          resolveReady();
        });
      } catch (e) {
        rejectReady();
      }
    });
  }
}

export default class ReifiedGenerator<Y: mixed, R: mixed, N: mixed> {
  channels: {
    yield: AsyncChannel<Y>,
    next: AsyncChannel<N>,
    return: AsyncChannel<R>,
    throw: AsyncChannel<Error>,
    sent: AsyncChannel<void>
  };

  constructor() {
    this.getReady();
  }

  async yield(
    value: Y,
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): Promise<N> {
    console.log("METHOD YIELD WAITING READY");
    if (waitForReady) {
      await this.isReady();
    }

    console.log("METHOD YIELD READY");

    // defer(() => this.channels.yield.resolve(value));
    this.channels.yield.resolve(value);

    const next = await this.channels.next.promise;

    console.log("METHOD YIELD WAITING DONE");
    if (waitForDone) {
      await this.isDone();
    }

    console.log("METHOD YIELD DONE");

    return next;
  }

  async return(
    value: R,
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): Promise<void> {
    if (waitForReady) {
      await this.isReady();
    }

    // defer(() => this.channels.return.resolve(value));
    this.channels.return.resolve(value);

    if (waitForDone) {
      await this.isDone();
    }
    return;
  }

  async throw(
    value: Error,
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): Promise<void> {
    if (waitForReady) {
      await this.isReady();
    }

    // defer(() => this.channels.throw.resolve(value));
    this.channels.throw.resolve(value);

    if (waitForDone) {
      await this.isDone();
    }
    return;
  }
  getReady() {
    this.channels = {
      yield: new AsyncChannel(),
      next: new AsyncChannel(),
      return: new AsyncChannel(),
      throw: new AsyncChannel(),
      sent: new AsyncChannel()
    };
    mapValues(channel => channel.getReady(), this.channels);
  }

  async isReady() {
    await Promise.props(mapValues(channel => channel.isReady, this.channels));
    console.log("IS READY");
  }

  async isDone() {
    await this.channels.sent.promise;
    console.log("DONE");
  }

  async *generator(
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): AsyncGenerator<Y, R | void, N> {
    console.log("===========================================================");
    while (true) {
      if (waitForReady) {
        await this.isReady();
      }
      console.log("GEN IS READY");

      const { which, result } = await Promise.any([
        this.channels.yield.promise.then(r => ({
          which: "yield",
          result: r
        })),
        this.channels.return.promise.then(r => ({
          which: "return",
          result: r
        })),
        this.channels.throw.promise.then(r => ({ which: "throw", result: r }))
      ]);

      if (which === "yield") {
        console.log("GEN WILL YIELD");
        const value = yield result;

        defer(() => this.channels.next.resolve(value));
        // this.channels.next.resolve(value);

        console.log("GEN DID YIELD");
      } else if (which === "return") {
        console.log("GEN WILL RETURN");
        return result;
      } else if (which === "throw") {
        console.log("GEN WILL THROW");
        throw result;
      }

      this.channels.sent.resolve();
      if (waitForDone) {
        await this.isDone();
      }
      console.log("GEN IS DONE");
      this.getReady();
      console.log(
        "==========================================================="
      );
    }
  }
}
