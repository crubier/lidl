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
  isDone: Promise<void>;

  constructor() {}

  getReady() {
    this.isReady = new Promise((resolveReady, rejectReady) => {
      try {
        this.promise = new Promise((resolve, reject) => {
          this.isDone = new Promise((resolveDone, rejectDone) => {
            this.resolve = (...x) => {
              resolve(...x);
              resolveDone();
            };
            this.reject = (...x) => {
              reject(...x);
              rejectDone();
            };
            resolveReady();
          });
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
    throw: AsyncChannel<Error>
  };

  constructor() {
    this.getReady();
  }

  async yield(
    value: Y,
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): Promise<N> {
    if (waitForReady) {
      await this.isReady();
    }

    defer(() => this.channels.yield.resolve(value));
    const next = await this.channels.next.promise;

    if (waitForDone) {
      await this.isDone();
    }

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
    defer(() => this.channels.return.resolve(value));
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
    defer(() => this.channels.throw.resolve(value));
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
      throw: new AsyncChannel()
    };
    mapValues(channel => channel.getReady(), this.channels);
  }

  async isReady() {
    await Promise.props(mapValues(channel => channel.isReady, this.channels));
  }

  async isDone() {
    await Promise.any([
      Promise.all([this.channels.yield.isDone, this.channels.next.isDone]),
      this.channels.return.isDone,
      this.channels.throw.isDone
    ]);
  }

  async *generator(
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): AsyncGenerator<Y, R | void, N> {
    while (true) {
      if (waitForReady) {
        await this.isReady();
      }

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
        const value = yield result;
        defer(() => this.channels.next.resolve(value));
      } else if (which === "return") {
        return result;
      } else if (which === "throw") {
        throw result;
      }

      if (waitForDone) {
        await this.isDone();
      }
      this.getReady();
    }
  }
}
