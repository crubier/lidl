////////////////////////////////////////////////////////
// Data
export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

export type Data =
  | string
  | number
  | boolean
  | null
  | Data[]
  | { [key: string]: Data }
  | ((input: Data) => Data);

// Signals symbols
export const active = null;
export const inactive = undefined;

export type Activation = typeof active | typeof inactive;

// Utility to create LIDL Signals
export type Signal<T extends Data> = T | typeof inactive;
