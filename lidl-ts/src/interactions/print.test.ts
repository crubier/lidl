import { expect, test, fn } from "vitest";
import { inKey } from "../interfaces";
import { print } from "./print";

test("print", async () => {
  const doPrint = fn();
  const interaction = print("foo", doPrint);
  expect(await interaction[inKey](Promise.resolve("Ok"))).toBeUndefined();
  expect(doPrint).toHaveBeenCalledTimes(1);
  expect(doPrint).toHaveBeenCalledWith("foo", '"Ok"');
});
