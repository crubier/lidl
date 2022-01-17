import { expect, test } from "vitest";
import { outKey } from "../interfaces";
import { constant } from "./constant";

test("constant", async () => {
  const interaction = constant("foo");
  expect(await interaction[outKey]()).toEqual("foo");
});
