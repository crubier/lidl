import { expect, test } from "vitest";
import { outKey } from "../interfaces";
import { createSource } from "./source";

test("source", async () => {
  const source = createSource([["foo", "Ok"]]);
  const interaction = source.receive("foo");
  expect(await interaction[outKey]()).toEqual("Ok");
});
