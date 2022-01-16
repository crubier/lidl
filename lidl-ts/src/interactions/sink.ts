import { Data, Signal } from "../data";
import { inKey, InterfaceIn } from "../interfaces";

export const createSink = (initialContent = []) => {
  const sink = {
    content: initialContent,
    send: <T extends Data>(prefix: string): InterfaceIn<T> => {
      return {
        [inKey]: async (value: Promise<Signal<T>>) => {
          sink.content.push([prefix, await value]);
        },
      };
    },
  };
  return sink;
};
