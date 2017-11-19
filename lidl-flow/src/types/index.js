/* @flow */
export type inactive = "inactive";
export type Activation = inactive | "active";
export type Boolean = inactive | boolean;
export type Number = inactive | number;
export type Text = inactive | string;
export type Composite = inactive | { [string]: Value };
export type Value = inactive | Activation | Boolean | Number | Text | Composite;
