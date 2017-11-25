/* @flow */

import { defer } from "lodash/fp";

export default class Source<T: mixed> {
  resolve: T => mixed;

  reject: mixed => mixed;

  promise: Promise<T> = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });

  async yield(value: T): Promise<void> {
    defer(() => this.resolve(value));
    // this.resolve(value);
    return;
  }

  async throw(value: mixed): Promise<void> {
    defer(() => this.reject(value));
    // this.reject(value);
    return;
  }

  async *generator(): AsyncGenerator<T, void, void> {
    let promise = this.promise;
    while (true) {
      console.log(promise);
      try {
        yield await promise;
      } catch (e) {
        throw e;
      }
      promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
  }
}
