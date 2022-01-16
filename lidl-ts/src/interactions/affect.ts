import { Data, Signal, Activation, inactive, active } from "../data";
import {
  InterfaceIn,
  inKey,
  Interface,
  Complement,
  outKey,
  objectKey,
  arrayKey,
} from "../interfaces";

export const affect = <T extends Interface>(
  x: Complement<T>,
  y: T
): InterfaceIn<Activation> => {
  if (outKey in y && inKey in x) {
    // Atomic case
    return {
      [inKey]: async (activation: Promise<Signal<Activation>>) => {
        if ((await activation) === active) {
          const value = y[outKey]();
          await x[inKey](value);
          console.log(
            `[Affect] Atomic affecting ${JSON.stringify(await value)}`
          );
          return;
        } else {
          await Promise.all([y[outKey](Promise.resolve(inactive)), x[inKey]()]);
          console.log("[Affect] Atomic not affecting");
          return;
        }
      },
    };
  }

  if (inKey in y && outKey in x) {
    // Commutation of Atomic case
    return affect(
      // Need to force Typescript to understand that Complement<X> is an involution
      y as unknown as Complement<typeof x>,
      x
    );
  }

  if (objectKey in x && objectKey in y) {
    // Object case
    const subAffects: InterfaceIn<Activation>[] = [];
    const xObject = x[objectKey];
    const yObject = y[objectKey];
    for (const key of Object.keys(yObject)) {
      if (!(key in xObject)) {
        throw new Error(`[Affect] Missing key ${key} on left hand side`);
      }
    }
    for (const key of Object.keys(xObject)) {
      if (!(key in yObject)) {
        throw new Error(`[Affect] Missing key ${key} on right hand side`);
      }
      // TODO: work on intersection of X and Y and deal with things not in intersectin
      // @ts-ignore To avoid "Type instantiation is excessively deep and possibly infinite. ts(2589)"
      subAffects.push(affect(xObject[key], yObject[key]));
    }
    return {
      [inKey]: async (activation: Promise<Signal<Activation>>) => {
        const promises = [];
        for (const subAffect of subAffects) {
          promises.push(subAffect[inKey](activation));
        }
        await Promise.all(promises);
      },
    };
  }

  if (arrayKey in x && arrayKey in y) {
    // Array case
    const subAffects: InterfaceIn<Activation>[] = [];
    const xObject = x[arrayKey];
    const yObject = y[arrayKey];
    if (xObject.length !== yObject.length) {
      throw new Error(`[Affect] Both sides do not have the same length`);
    }
    for (let key = 0; key < xObject.length; key++) {
      subAffects.push(affect(xObject[key], yObject[key]));
    }
    return {
      [inKey]: async (activation: Promise<Signal<Activation>>) => {
        const promises = [];
        for (const subAffect of subAffects) {
          promises.push(subAffect[inKey](activation));
        }
        await Promise.all(promises);
      },
    };
  }

  throw new Error("[Affect] Unsupported affect interfaces");
};
