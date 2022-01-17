// Data values
export const inactive = Symbol("inactive");
export const active = Symbol("active");

// Utility to create LIDL Data (types)
export type Data<T> = typeof inactive | T;

// Data
export type Activation = Data<typeof active>;

// Utility to create LIDL Interfaces
export type In<T> = (value: Promise<Data<T>>) => Promise<void>;
export type Out<T> = () => Promise<Data<T>>;

// Channels
export const createChannel = <T>(
  name = "untitled"
): { send: () => In<T>; receive: () => Out<T> } => {
  // Both sides, in the world of LIDL
  const senders = [];
  const receivers = [];
  // Both sides, in the world of JavaScript
  let results = [];
  let resolves = [];
  // To run every time we ask or receive a value
  const runSignal = () => {
    if (
      results.length === senders.length &&
      resolves.length === receivers.length
    ) {
      // We got everything, trigger!
      // Input algorithm here is "consensus of active inputs"
      let result = inactive;
      for (let i = 0; i < results.length; i++) {
        if (results[i] !== inactive) {
          if (result === inactive) {
            result = results[i];
          } else if (result === results[i]) {
            result = results[i];
          } else {
            throw new Error(
              `Multiple different values received for channel "${name}": ${results}`
            );
          }
        }
      }
      // Input algorithm here is "all equal to result"
      for (let j = 0; j < resolves.length; j++) {
        resolves[j](result);
      }
      // Reset for next time step
      results = [];
      resolves = [];
    }
  };
  return {
    send: () => {
      const sender = async (value: Promise<Data<T>>) => {
        results.push(value);
        runSignal();
      };
      senders.push(sender);
      return sender;
    },
    receive: () => {
      const receiver = () => {
        return new Promise<Data<T>>((resolve) => {
          resolves.push(resolve);
          runSignal();
        });
      };
      receivers.push(receiver);
      return receiver;
    },
  };
};

// Util interactions
export const constant = <T>(value: T): Out<T> => {
  return async () => {
    return value;
  };
};

export const constantInactive = constant(inactive);
export const constantActive = constant(active);

export const print = <T>(): In<T> => {
  return async (value: Promise<Data<T>>) => {
    console.log(await value);
  };
};

export const createSink = (initialContent = []) => {
  const sink = {
    content: initialContent,
    send: <T>(prefix: string): In<T> => {
      return async (value: Promise<Data<T>>) => {
        sink.content.push([prefix, await value]);
      };
    },
  };
  return sink;
};

export const createSource = (initialContent = []) => {
  const source = {
    content: initialContent,
    receive: <T>(prefix: string): Out<T> => {
      let lastIndex = 0;
      return async (): Promise<Data<T>> => {
        while (source.content[lastIndex][0] !== prefix) {
          if (lastIndex >= source.content.length) {
            throw new Error(`Reached end of content for source "${prefix}"`);
          }
          lastIndex++;
        }
        return source.content[lastIndex++][1];
      };
    },
  };
  return source;
};

// Fundamental LIDL interactions
// y = x
export const affect = <T>(y: In<T>, x: Out<T>): In<Activation> => {
  return async (activation: Promise<Activation>) => {
    if ((await activation) === inactive) {
      await Promise.all([x(), y(constantInactive())]);
      return;
    }
    await y(x());
    return;
  };
};

// y = f (x)
export const apply = <X, Y>(
  y: In<Y>,
  f: Out<(input: X) => Y | Promise<Y>>,
  x: Out<X>
): In<Activation> => {
  return async (activation: Promise<Activation>) => {
    if ((await activation) === inactive) {
      await Promise.all([x(), f(), y(constantInactive())]);
      return;
    }
    const xValue = await x();
    if (xValue === inactive) {
      await Promise.all([f(), y(constantInactive())]);
      return;
    }
    const fValue = await f();
    if (fValue === inactive) {
      await y(constantInactive());
      return;
    }
    const yValue = await fValue(xValue);
    await y(Promise.resolve(yValue));
    return;
  };
};

// y = previous x
export const previous = <T>(y: In<T>, x: Out<T>): In<Activation> => {
  let lastValue: Data<T> = inactive;
  return async (activation: Promise<Activation>) => {
    if ((await activation) === inactive) {
      await Promise.all([x(), y(Promise.resolve(inactive))]);
      return;
    }
    [lastValue] = await Promise.all([x(), y(Promise.resolve(lastValue))]);
    return;
  };
};

export const withBehaviourIn = <T>(a: In<T>, b: In<Activation>): In<T> => {
  return async (value: Promise<Data<T>>) => {
    await Promise.all([a(value), b(Promise.resolve(active))]);
    return;
  };
};

export const withBehaviourOut = <T>(a: Out<T>, b: In<Activation>): Out<T> => {
  return async () => {
    const [result] = await Promise.all([a(), b(Promise.resolve(active))]);
    return result;
  };
};

export const allIn = <T>(...interactions: Array<In<T>>): In<T> => {
  return async (value: Promise<Data<T>>) => {
    const promises = [];
    for (const interaction of interactions) {
      promises.push(interaction(value));
    }
    await Promise.all(promises);
    return;
  };
};

export const someIn = <T>(...interactions: Array<In<T>>): In<T> => {
  return async (value: Promise<Data<T>>) => {
    const promises = [];
    for (const interaction of interactions) {
      if (Math.random() >= 0.5) {
        promises.push(interaction(value));
      } else {
        promises.push(interaction(constantInactive()));
      }
    }
    await Promise.all(promises);
    return;
  };
};

export const eitherIn = <T>(...interactions: Array<In<T>>): In<T> => {
  return async (value: Promise<Data<T>>) => {
    const index = Math.floor(Math.random() * interactions.length);
    const promises = [];
    for (let i = 0; i < interactions.length; i++) {
      if (i === index) {
        promises.push(interactions[i](value));
      } else {
        promises.push(interactions[i](constantInactive()));
      }
    }
    await Promise.all(promises);
    return;
  };
};

export const noneIn = <T>(...interactions: Array<In<T>>): In<T> => {
  return async () => {
    const promises = [];
    for (const interaction of interactions) {
      promises.push(interaction(constantInactive()));
    }
    await Promise.all(promises);
    return;
  };
};

export const composeIn = <T>(interactions: Array<Out<T>>): Out<Array<T>> => {
  return async (): Promise<Data<Array<T>>> => {
    const promises = [];
    for (const interaction of interactions) {
      promises.push(interaction());
    }
    return await Promise.all(promises);
  };
};

export const decomposeOut = <T>(interactions: Array<In<T>>): In<Array<T>> => {
  return async (value: Promise<Data<Array<T>>>): Promise<void> => {
    const result = await value;
    if (result === inactive) {
      const promises = [];
      for (let i = 0; i < interactions.length; i++) {
        promises.push(interactions[i](constantInactive()));
      }
      await Promise.all(promises);
      return;
    }
    const promises = [];
    for (let i = 0; i < interactions.length; i++) {
      promises.push(interactions[i](Promise.resolve(result[i])));
    }
    await Promise.all(promises);
    return;
  };
};
