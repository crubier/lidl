import { Data, Signal } from "../data";
import { InterfaceOut, outKey } from "../interfaces";

export const createSource = (initialContent = []) => {
  const source = {
    content: initialContent,
    receive: <T extends Data>(prefix: string): InterfaceOut<T> => {
      let lastIndex = 0;
      return {
        [outKey]: async (): Promise<Signal<T>> => {
          while (source.content[lastIndex][0] !== prefix) {
            if (lastIndex >= source.content.length) {
              throw new Error(
                `[Source] Reached end of content for source "${prefix}"`
              );
            }
            lastIndex++;
          }
          return source.content[lastIndex++][1];
        },
      };
    },
  };
  return source;
};
