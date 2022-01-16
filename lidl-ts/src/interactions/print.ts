import { Data, Signal } from "../data";
import { InterfaceIn, inKey } from "../interfaces";

export const print = <T extends Data>(prefix: string): InterfaceIn<T> => {
  return {
    [inKey]: async (value: Promise<Signal<T>>) => {
      const result = await value;
      console.log(`[Print] Receiving ${prefix} ${JSON.stringify(result)}`);
      console.log(prefix, JSON.stringify(result));
    },
  };
};
