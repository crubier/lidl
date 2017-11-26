/* @flow */

import {
  type inactive,
  type Activation,
  type Boolean,
  type Number,
  type Text,
  type Value
} from "../../types";
import {
  type Input,
  type Output,
  type Composite,
  type Interface
} from "../../interfaces";

import { mapValues, has, isNil, values, mergeWith } from "lodash/fp";

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
  /** Sources that gave their value at a given step
   */
  stateSources: SourceFunction<T>[];

  /** Sinks that want their value at a given step
   */
  stateSinks: SinkFunction<T>[];

  /** All registred sources, list created before run time
   */
  sources: PromiseSourceFunction<T>[];

  /** All registred sinks, list created before run time
   */
  sinks: PromiseSinkFunction<T>[];

  /** Name of the channel
   */
  name: string;

  /** Constructor
   * @param name the name of the channel
   */
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
    this.stateSources = [];
    this.stateSinks = [];
    // console.log(
    //   `Initialized state of channel "${this.name}", which contains ${
    //     this.sinks.length
    //   } sinks and ${this.sources.length} sources`
    // );
  }

  /** # Customizable
   * The completion criterion, called when new data is received from a source.
   * If it returns true, then the channel will send data to the sinks
   *
   * @returns true if everything is ready to output (all sinks are listening and all sources have given their value)
   */
  isReady(): boolean {
    // console.log(
    //   `Checking state of channel "${this.name}", which has ${
    //     this.sinks.length
    //   }/${this.stateSinks.length} sinks ready and ${this.sources.length}/${
    //     this.stateSources.length
    //   } sources ready`
    // );
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
   * Perform the actual work of the channel
   */
  perform() {
    // console.log(`Performing channel "${this.name}"`);
    const result: T = this.stateSources.reduce(
      (
        aggregatedValue: T,
        currentFunction: SourceFunction<T>,
        index: number
      ) => {
        const currentValue = currentFunction();
        // console.log(
        //   `Received value ${currentValue.toString()} at index ${
        //     index
        //   } for channel "${this.name}"`
        // );
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
                `Incompatible values given to channel "${
                  this.name
                }": ${currentValue.toString()} and ${aggregatedValue.toString()}`
              );
            }
          }
        }
      },
      (("inactive": any): T)
    );
    // console.log(`Chose value ${result.toString()} for channel "${this.name}"`);
    this.stateSinks.forEach((currentFunction, index) => {
      const currentValue = result;
      // console.log(
      //   `Sent value ${currentValue.toString()} at index ${index} for channel "${
      //     this.name
      //   }"`
      // );
      currentFunction(result);
    });
  }

  /**
   * Add a source to this channel
   * @returns An async function that will need to be called with the value to be sent to the channel
   */
  addSource(): PromiseSourceFunction<T> {
    const sourceFunction: PromiseSourceFunction<T> = async (x: T) => {
      this.stateSources.push(() => x);
      if (this.isReady()) {
        this.perform();
        this.initializeState();
      }
    };
    this.sources.push(sourceFunction);
    // console.log(
    //   `Added a source to channel "${this.name}", which now contains ${
    //     this.sources.length
    //   } sources`
    // );
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
    // console.log(
    //   `Added a sink to channel "${this.name}", which now contains ${
    //     this.sinks.length
    //   } sinks`
    // );
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
export function receiveOutput<T: Value>(channelName: string): Output<T> {
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
export function sendInput<T: Value>(channelName: string): Input<T> {
  const channel = Channel.getInstance(channelName);
  const sourceFunction = channel.addSource();
  return {
    type: "input",
    set: async (x: T) => {
      return await sourceFunction(x);
    }
  };
}

/**
 * Send to a global channel
 * @param channelName the name of the channel
 * @returns a Lidl Input
 */
export function sendComposite<T: Value>(channelName: string): Interface {
  return {
    type: "input",
    set: async (x: T) => {
      return await sourceFunction(x);
    }
  };
}
