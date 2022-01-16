import { Data } from "../data";
import { InterfaceOut, outKey } from "../interfaces";

export const constant = <T extends Data>(value: T): InterfaceOut<T> => {
  return {
    [outKey]: async () => {
      console.log(`[Constant] Sending ${JSON.stringify(value)}`);
      return value;
    },
  };
};
