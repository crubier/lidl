/* @flow */

import { defer } from "lodash/fp";

type Return<R> = { done: true, value: R };
type Yield<T> = { done: false, value: T };
type Result<T, R> = Return<R> | Yield<T>;

export default class Source<T: mixed, R: mixed> {
  resolveValueToYield: (Result<T, R>) => mixed;
  rejectValueToYield: mixed => mixed;

  resolveDidYield: () => mixed;
  rejectDidYield: mixed => mixed;

  isReadyToReceive: Promise<void>;
  isReadyToSend: Promise<void>;

  valueToYield: Promise<Result<T, R>>;
  didYield: Promise<void>;

  constructor() {
    this.getReady();
  }

  async yield(
    value: T,
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): Promise<void> {
    if (waitForReady) {
      await this.isReady();
    }
    // console.log("yield ready!", value);
    defer(() => this.resolveValueToYield({ value, done: false }));
    if (waitForDone) {
      await this.isDone();
    }
    // console.log("yield done!", value);
    return;
  }

  async return(
    value: R,
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): Promise<void> {
    if (waitForReady) {
      await this.isReady();
    }
    defer(() => this.resolveValueToYield({ value, done: true }));
    if (waitForDone) {
      await this.isDone();
    }
    return;
  }

  async throw(
    value: mixed,
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): Promise<void> {
    if (waitForReady) {
      await this.isReady();
    }
    defer(() => this.rejectValueToYield(value));
    if (waitForDone) {
      await this.isDone();
    }
    return;
  }

  getReadyToReceive() {
    this.isReadyToReceive = new Promise(
      (resolveIsReadyToReceive, rejectIsReadyToReceive) => {
        try {
          this.valueToYield = new Promise(
            (resolveValueToYield, rejectValueToYield) => {
              this.resolveValueToYield = resolveValueToYield;
              this.rejectValueToYield = rejectValueToYield;
              resolveIsReadyToReceive();
            }
          );
        } catch (e) {
          rejectIsReadyToReceive();
        }
      }
    );
  }

  getReadyToSend() {
    this.isReadyToSend = new Promise(
      (resolveIsReadyToSend, rejectIsReadyToSend) => {
        try {
          this.didYield = new Promise((resolveDidYield, rejectDidYield) => {
            this.resolveDidYield = resolveDidYield;
            this.rejectDidYield = rejectDidYield;
            resolveIsReadyToSend();
          });
        } catch (e) {
          rejectIsReadyToSend();
        }
      }
    );
  }

  getReady() {
    this.getReadyToReceive();
    this.getReadyToSend();
  }

  async isReady() {
    await this.isReadyToReceive;
    await this.isReadyToSend;
  }

  async isDone() {
    await this.didYield;
  }

  async *generator(
    waitForReady: boolean = true,
    waitForDone: boolean = true
  ): AsyncGenerator<T, R | void, void> {
    while (true) {
      if (waitForReady) {
        await this.isReady();
      }
      try {
        const result = await this.valueToYield;
        if (result.done) {
          this.resolveDidYield();
          return result.value;
        } else {
          // TODO Here ?
          // this.resolveDidYield();
          yield result.value;
          // Or here ?
          this.resolveDidYield();
        }
      } catch (e) {
        this.rejectDidYield();
        throw e;
      }
      if (waitForDone) {
        await this.isDone();
      }
      this.getReady();
    }
  }
}
