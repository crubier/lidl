import { expect, test } from "vitest";
import { inKey } from "../interfaces";
import { createSink } from "./sink";

test("sink", async () => {
  const sink = createSink();
  const interaction = sink.send("foo");
  expect(await interaction[inKey](Promise.resolve("Ok"))).toBeUndefined();
  expect(sink.content).toEqual([["foo", "Ok"]]);
});
