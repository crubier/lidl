import { expect, test } from "vitest";
import { affect } from "./affect";
import { inKey } from "../interfaces";
import { active } from "../data";
import { createSource } from "./source";
import { createSink } from "./sink";

test("affect atomic", async () => {
  const source = createSource([["x", "a"]]);
  const sink = createSink();
  const interaction = affect(sink.send("u"), source.receive("x"));
  expect(await interaction[inKey](Promise.resolve(active))).toBeUndefined();
  expect(sink.content).toEqual([["u", "a"]]);
});

test("affect atomic commuted", async () => {
  const source = createSource([["x", "a"]]);
  const sink = createSink();
  const interaction = affect(source.receive("x"), sink.send("u"));
  expect(await interaction[inKey](Promise.resolve(active))).toBeUndefined();
  expect(sink.content).toEqual([["u", "a"]]);
});
