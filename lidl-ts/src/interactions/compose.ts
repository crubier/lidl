import { Data, Signal } from "../data";
import {
  InterfaceOut,
  InterfaceIn,
  inKey,
  outKey,
  objectKey,
  arrayKey,
  Interface,
} from "../interfaces";

type ComposeResult<
  U extends
    | {
        [key: string]: Interface;
      }
    | Interface[]
> = U extends Array<Interface>
  ? {
      [arrayKey]: U;
    }
  : { [objectKey]: U };

export const compose = (<
  U extends {
    [key: string]: Interface;
  },
  V extends Interface[],
  T extends U | V
>(
  elements: T
):
  | {
      [arrayKey]: V;
    }
  | { [objectKey]: U } => {
  if (
    typeof elements === "object" &&
    !Array.isArray(elements) &&
    elements !== null
  ) {
    return {
      [objectKey]: elements as U,
    };
  }
  if (Array.isArray(elements)) {
    return {
      [arrayKey]: elements as V,
    };
  }
  throw new Error("[Compose] Invalid elements");
}) as <
  U extends
    | {
        [key: string]: Interface;
      }
    | Interface[]
>(
  elements: U
) => ComposeResult<U>;

export const composeOut = <T extends { [key: string]: Data } | Data[]>(
  elements: T extends { [key: string]: Data }
    ? {
        [key in keyof T]: InterfaceOut<T[key]>;
      }
    : InterfaceOut<T[]>[]
): InterfaceOut<T> => {
  if (
    typeof elements === "object" &&
    !Array.isArray(elements) &&
    elements !== null
  ) {
    // Composing an Object
    return {
      [outKey]: async () => {
        const promises = [];
        const result: Partial<T> = {};
        for (const key in elements) {
          promises.push(
            (async () => {
              result[key as keyof T] = await elements[key][outKey]();
              return;
            })()
          );
        }
        await Promise.all(promises);
        console.log(`[ComposeOut] Sending ${JSON.stringify(result)}`);
        return result;
      },
    };
  }
  if (Array.isArray(elements)) {
    // Composing an Array
    return {
      [outKey]: async () => {
        const promises = [];
        const result: T[number][] = [];
        for (const element of elements) {
          promises.push(
            (async () => {
              result.push(await element[outKey]());
              return;
            })()
          );
        }
        await Promise.all(promises);
        console.log(`[ComposeOut] Sending ${JSON.stringify(result)}`);
        return result;
      },
    };
  }
  throw new Error("[ComposeOut] Invalid elements");
};

// export const decomposeObjectOut = <T extends { [key: string]: Data }>(
//   value: InterfaceOut<T>
// ): {
//   [objectKey]: { [key in keyof T]: InterfaceOut<T[key]> };
// } => {
//   return {
//     [objectKey]: {},
//   };
// };

export const decomposeIn = <T extends { [key: string]: Data } | Data[]>(
  elements: T extends { [key: string]: Data }
    ? {
        [key in keyof T]: InterfaceIn<T[key]>;
      }
    : InterfaceIn<T[]>[]
): InterfaceIn<T> => {
  if (
    typeof elements === "object" &&
    !Array.isArray(elements) &&
    elements !== null
  ) {
    // Decomposing an Object
    return {
      [inKey]: async (value: Promise<Signal<T>>) => {
        const promises = [];
        const result = await value;
        for (const key in elements) {
          promises.push(elements[key][inKey](result[key]));
        }
        await Promise.all(promises);
        console.log(`[DecomposeIn] Sending ${JSON.stringify(result)}`);
        return;
      },
    };
  }
  if (Array.isArray(elements)) {
    // Decomposing an Array
    return {
      [inKey]: async (value: Promise<Signal<T>>) => {
        const promises = [];
        const result = await value;
        for (let key = 0; key < result.length; key++) {
          promises.push(elements[key][inKey](result[key]));
        }
        await Promise.all(promises);
        console.log(`[DecomposeIn] Sending ${JSON.stringify(result)}`);
        return;
      },
    };
  }
  throw new Error("[DecomposeIn] Invalid elements");
};

// decomposeOut
