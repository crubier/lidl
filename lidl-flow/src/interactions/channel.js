/* @flow */

///////////////////////////////////////////////////////////////////////////////

import assert from "assert";
import { keys } from "lodash/fp";
import { getChannel, setChannel } from "../utils/asyncs";

///////////////////////////////////////////////////////////////////////////////

import {
  type inactive,
  type Activation,
  type Boolean,
  type Number,
  type Text,
  type Value
} from "../types";
import {
  type Input,
  type Output,
  type CompositeInterface,
  type Interface
} from "../interfaces";

/**
 * An async function that will need to be called with the value to be sent to the channel
 */
type PromiseSourceFunction<T> = T => Promise<any>;
/**
 * An async function that will resolve to the ouput value of the channel when called
 */
type PromiseSinkFunction<T> = any => Promise<T>;
/**
 * A function that will need to be called with the value to be sent to the channel
 */
type SourceFunction<T> = any => T;
/**
 * A function that will resolve to the ouput value of the channel when called
 */
type SinkFunction<T> = T => any;

/**
 * A class that represent a channel between
 *   - Several sources which receive data on one side
 *   - Several sinks which send data on the other side
 */
class Channel<T: Value> {
  state: T[];
  stateSources: SourceFunction<T>[];
  stateSinks: SinkFunction<T>[];
  sources: PromiseSourceFunction<T>[];
  sinks: PromiseSinkFunction<T>[];
  name: string;

  constructor(name) {
    this.name = name;
    this.sources = [];
    this.sinks = [];
    this.initializeState();
  }

  /** # Customizable
   * Clears the state, at each step
   * @returns nothing
   */
  initializeState(): void {
    this.state = [];
    this.stateSources = [];
    this.stateSinks = [];
  }

  /** # Customizable
   * The completion criterion, called when new data is received from a source.
   * If it returns true, then the channel will send data to the sinks
   *
   * @returns true if everything is ready to output (all sinks are listening and all sources have given their value)
   */
  isReady(): boolean {
    if (
      this.stateSources.length === this.sources.length &&
      this.stateSinks.length === this.sinks.length
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Perform the actual
   */
  perform() {
    const result: T = this.stateSources.reduce(
      (aggregatedValue: T, currentFunction: SourceFunction<T>) => {
        const currentValue = currentFunction();
        if (currentValue === "inactive") {
          return aggregatedValue;
        } else {
          if (aggregatedValue === "inactive") {
            return currentValue;
          } else {
            if (aggregatedValue === currentValue) {
              return aggregatedValue;
            } else {
              throw new Error(
                `Incompatible values given to channel ${
                  this.name
                }: ${currentValue.toString()} and ${aggregatedValue.toString()}`
              );
            }
          }
        }
      },
      (("inactive": any): T)
    );
    this.stateSinks.forEach(currentFunction => currentFunction(result));
  }

  /**
   * Add a source to this channel
   * @returns An async function that will need to be called with the value to be sent to the channel
   */
  addSource(): PromiseSourceFunction<T> {
    const sourceFunction: PromiseSourceFunction<T> = async (x: T) => {
      this.stateSinks.push(() => x);
      if (this.isReady()) {
        this.perform();
        this.initializeState();
      }
    };
    this.sources.push(sourceFunction);
    return sourceFunction;
  }

  /**
   * Add a sink to this channel
   * @returns An async function that will resolve to the ouput value of the channel when called
   */
  addSink(): PromiseSinkFunction<T> {
    const sinkFunction: PromiseSinkFunction<T> = () => {
      return new Promise((resolve, reject) => {
        this.stateSinks.push(resolve);
        if (this.isReady()) {
          this.perform();
          this.initializeState();
        }
      });
    };
    this.sinks.push(sinkFunction);
    return sinkFunction;
  }

  /**
   * @returns the instance of the singleton Channel with the given name
   */
  static getInstance(name): Channel<any> {
    if (Channel.channels[name] == null) {
      Channel.channels[name] = new Channel(name);
    }
    return Channel.channels[name];
  }
  /**
   * The singleton list of all channels
   */
  static channels: { [string]: Channel<Value> } = {};
}

///////////////////////////////////////////////////////////////////////////////
// Interactions

/**
 * Receive from a global channel
 * @param channelName the name of the channel
 * @returns a Lidl Output
 */
export function receive<T: Value>(channelName: string): Output<T> {
  const channel = Channel.getInstance(channelName);
  const sinkFunction = channel.addSink();
  return {
    type: "output",
    get: async () => {
      return await sinkFunction();
    }
  };
}

/**
 * Send to a global channel
 * @param channelName the name of the channel
 * @returns a Lidl Input
 */
export function send<T: Value>(channelName: string): Input<T> {
  const channel = Channel.getInstance(channelName);
  const sourceFunctionGenerator = channel.addSource();
  return {
    type: "input",
    set: async (x: T) => {
      return await sourceFunctionGenerator(x);
    }
  };
}
