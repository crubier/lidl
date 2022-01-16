import { Data, Signal } from "./data";

////////////////////////////////////////////////////////
// Interfaces

// Interfaces symbols
export const inKey = Symbol("in");
export const outKey = Symbol("out");
export const objectKey = Symbol("object");
export const arrayKey = Symbol("array");

// Utility to create LIDL Interfaces
export type InterfaceIn<T extends Data> = {
  [inKey]: (value: Promise<Signal<T>>) => Promise<void>;
};
export type InterfaceOut<T extends Data> = {
  [outKey]: () => Promise<Signal<T>>;
};
export type InterfaceObject = {
  [objectKey]: {
    [key: string]: Interface;
  };
};
export type InterfaceArray = {
  [arrayKey]: Interface[];
};

export type Interface =
  | InterfaceIn<any>
  | InterfaceOut<any>
  | InterfaceObject
  | InterfaceArray;

export type Complement<T extends Interface> = T extends InterfaceIn<infer U>
  ? InterfaceOut<U>
  : T extends InterfaceOut<infer U>
  ? InterfaceIn<U>
  : T extends InterfaceObject
  ? {
      [objectKey]: {
        [key in keyof T[typeof objectKey]]: Complement<
          T[typeof objectKey][key]
        >;
      };
    }
  : T extends InterfaceArray
  ? {
      // See https://github.com/microsoft/TypeScript/issues/27995#issuecomment-432454438
      [arrayKey]: {
        [key in keyof T[typeof arrayKey]]: T[typeof arrayKey][key] extends T[typeof arrayKey][number]
          ? Complement<T[typeof arrayKey][key]>
          : T[typeof arrayKey][key];
      };
    }
  : T extends Complement<infer X>
  ? X
  : never;
