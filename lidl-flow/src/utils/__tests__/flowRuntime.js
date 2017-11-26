/* @flow */

import {
  type Activation,
  type Boolean,
  type Number,
  type Text,
  type Value
} from "../../types";
import {
  type Input,
  type Output,
  type Composite,
  type Interface
} from "../../interfaces";
import t, { reify } from "flow-runtime";
import type { Type } from "flow-runtime";
import { keys, keysIn } from "lodash/fp";

test("flow runtime User", () => {
  type User = { name: string };

  const UserType = (reify: Type<User>);

  expect(UserType).toEqual(UserType);

  expect(UserType.toString(true)).toEqual(`type User = {
  name: string;
};`);

  expect(UserType.toString()).toEqual(`User`);

  expect(UserType.unwrap().toString(true)).toEqual(`{
  name: string;
}`);

  expect(UserType.unwrap().toString()).toEqual(`{
  name: string;
}`);
});

test("flow runtime Composite", () => {
  const CompositeType = (reify: Type<Composite>);

  expect(CompositeType.toString(true)).toEqual(`Composite`);

  expect(CompositeType.toString()).toEqual(`Composite`);

  expect(CompositeType.unwrap().toString(true)).toEqual(`{
  type: "composite";
  elements: {
    [key: string]: Interface;
  };
}`);

  expect(CompositeType.unwrap().toString()).toEqual(`{
  type: "composite";
  elements: {
    [key: string]: Interface;
  };
}`);

  expect(CompositeType.getProperty("type").toString(true)).toEqual(
    `type: "composite";`
  );

  expect(CompositeType.getProperty("type").toString()).toEqual(
    `type: "composite";`
  );

  expect(
    CompositeType.getProperty("type")
      .unwrap()
      .toString(true)
  ).toEqual(`"composite"`);

  expect(
    CompositeType.getProperty("type")
      .unwrap()
      .toString()
  ).toEqual(`"composite"`);
});

test("flow runtime Interface", () => {
  const InterfaceType = (reify: Type<Interface>);

  expect(InterfaceType.toString(true)).toEqual(`Interface`);

  expect(InterfaceType.unwrap().toString(true)).toEqual(
    `Input<Value> | Output<Value> | Composite`
  );

  // console.log(InterfaceType);
  // console.log(keysIn(InterfaceType));
  // console.log(keysIn(InterfaceType.unwrap()));
  // console.log(keysIn(InterfaceType.typename));
  // console.log(keysIn(InterfaceType.context));
  // console.log(keysIn(InterfaceType.reveal));
});

test("flow runtime Custom", () => {
  type MyInterface = {
    type: "composite",
    elements: {
      a: Input<String>,
      b: Output<Number>
    }
  };

  const MyInterfaceType = (reify: Type<MyInterface>);

  console.log(MyInterfaceType);
  console.log(keysIn(MyInterfaceType));
  console.log(keysIn(MyInterfaceType.unwrap()));
  console.log(keysIn(MyInterfaceType.typename));
  console.log(keysIn(MyInterfaceType.context));
  console.log(keysIn(MyInterfaceType.reveal));
});
