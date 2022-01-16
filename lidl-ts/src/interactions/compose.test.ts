import { expect, test } from "vitest";
import { outKey, inKey, arrayKey, objectKey } from "../interfaces";
import { compose, composeOut, decomposeIn } from "./compose";
import { createSource } from "./source";
import { createSink } from "./sink";

test("compose array", async () => {
  const source = createSource([
    ["0", "a"],
    ["1", "b"],
  ]);
  const interaction = compose([source.receive("0"), source.receive("1")]);
  expect(await interaction[arrayKey][0][outKey]()).toEqual("a");
  expect(await interaction[arrayKey][1][outKey]()).toEqual("b");
});

test("compose object", async () => {
  const source = createSource([
    ["0", "a"],
    ["1", "b"],
  ]);
  const interaction = compose({
    a: source.receive("0"),
    b: source.receive("1"),
  });
  expect(await interaction[objectKey]["a"][outKey]()).toEqual("a");
  expect(await interaction[objectKey]["b"][outKey]()).toEqual("b");
});

test("compose out array", async () => {
  const source = createSource([
    ["0", "a"],
    ["1", "b"],
  ]);
  const interaction = composeOut([source.receive("0"), source.receive("1")]);
  expect(await interaction[outKey]()).toEqual(["a", "b"]);
});

test("compose out object", async () => {
  const source = createSource([
    ["x", "a"],
    ["y", "b"],
  ]);
  const interaction = composeOut({
    x: source.receive("x"),
    y: source.receive("y"),
  });
  expect(await interaction[outKey]()).toEqual({ x: "a", y: "b" });
});

test("compose out deep object", async () => {
  const source = createSource([
    ["x.u", "a"],
    ["x.v", "b"],
    ["y.0", "a"],
    ["y.1", "b"],
  ]);
  const interaction = composeOut({
    x: composeOut({ u: source.receive("x.u"), v: source.receive("x.v") }),
    y: composeOut([source.receive("y.0"), source.receive("y.1")]),
  });
  expect(await interaction[outKey]()).toEqual({
    x: { u: "a", v: "b" },
    y: ["a", "b"],
  });
});

test("decompose in array", async () => {
  const sink = createSink();
  const interaction = decomposeIn([sink.send("0"), sink.send("1")]);
  expect(await interaction[inKey](Promise.resolve(["a", "b"]))).toBeUndefined();
  expect(sink.content).toEqual([
    ["0", "a"],
    ["1", "b"],
  ]);
});

test("decompose in object", async () => {
  const sink = createSink();
  const interaction = decomposeIn({ x: sink.send("x"), y: sink.send("y") });
  expect(
    await interaction[inKey](Promise.resolve({ x: "a", y: "b" }))
  ).toBeUndefined();
  expect(sink.content).toEqual([
    ["x", "a"],
    ["y", "b"],
  ]);
});

test("decompose in deep object", async () => {
  const sink = createSink();
  const interaction = decomposeIn({
    x: decomposeIn({ u: sink.send("x.u"), v: sink.send("x.v") }),
    y: decomposeIn([sink.send("y.0"), sink.send("y.1")]),
  });
  expect(
    await interaction[inKey](
      Promise.resolve({
        x: { u: "a", v: "b" },
        y: ["a", "b"],
      })
    )
  ).toBeUndefined();
  expect(sink.content).toEqual([
    ["x.u", "a"],
    ["x.v", "b"],
    ["y.0", "a"],
    ["y.1", "b"],
  ]);
});
