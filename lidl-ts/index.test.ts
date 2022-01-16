import { assert, expect, test } from "vitest";
import {
  active,
  affect,
  allIn,
  constant,
  constantActive,
  constantInactive,
  createChannel,
  createSink,
  inactive,
  noneIn,
  print,
  withBehaviourOut,
  withBehaviourIn,
  apply,
  createSource,
  previous,
  decomposeOut,
  composeIn,
} from "./index";

// Edit an assertion and save to see HMR in action

// test('Math.sqrt()', () => {
//   expect(Math.sqrt(4)).toBe(2)
//   expect(Math.sqrt(144)).toBe(12)
//   expect(Math.sqrt(2)).toBe(Math.SQRT2)
// })

// test('JSON', () => {
//   const input = {
//     foo: 'hello',
//     bar: 'world',
//   }

//   const output = JSON.stringify(input)

//   expect(output).eq('{"foo":"hello","bar":"world"}')
//   assert.deepEqual(JSON.parse(output), input, 'matches original')
// })

test("affect", async () => {
  // Utilities
  const log = createSink();

  // Interaction
  const interaction = affect(log.send("result"), constant("toto"));

  // Run
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);

  // Trace
  // console.log(log.content);
  assert.deepEqual(log.content, [
    ["result", "toto"],
    ["result", inactive],
    ["result", "toto"],
    ["result", "toto"],
  ]);
});

test("sinksourceaffect", async () => {
  // Utilities
  const sink = createSink();
  const source = createSource([
    ["yy", "toto1"],
    ["yy", "toto2"],
    ["yy", "toto3"],
    ["yy", "toto4"],
    ["yy", "toto5"],
    ["yy", "toto6"],
    ["yy", "toto7"],
  ]);

  // Interaction
  const interaction = affect(sink.send("xx"), source.receive("yy"));

  // Run
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  // Trace
  // console.log(sink.content);
  assert.deepEqual(sink.content, [
    ["xx", "toto1"],
    ["xx", inactive],
    ["xx", "toto3"],
    ["xx", "toto4"],
    ["xx", inactive],
    ["xx", "toto6"],
    ["xx", "toto7"],
  ]);
});

test("withBehaviour", async () => {
  // Utilities
  const log = createSink();

  // Interaction
  const interaction = withBehaviourOut(constant("toto"), log.send("behaviour"));

  // Run
  expect(await interaction()).toEqual("toto");
  expect(await interaction()).toEqual("toto");

  // Trace
  // console.log(log.content);
  assert.deepEqual(log.content, [
    ["behaviour", active],
    ["behaviour", active],
  ]);
});

test("allIn", async () => {
  // Utilities
  const log = createSink();

  // Interaction
  const interaction = allIn(log.send("value1"), log.send("value2"));

  // Run
  expect(await interaction(Promise.resolve("hoy"))).toEqual(undefined);
  expect(await interaction(Promise.resolve("ah"))).toEqual(undefined);

  // Trace
  // console.log(log.content);
  assert.deepEqual(log.content, [
    ["value1", "hoy"],
    ["value2", "hoy"],
    ["value1", "ah"],
    ["value2", "ah"],
  ]);
});

test("noneIn", async () => {
  // Utilities
  const log = createSink();

  // Interaction
  const interaction = noneIn(log.send("value1"), log.send("value2"));

  // Run
  expect(await interaction(Promise.resolve("hoy"))).toEqual(undefined);
  expect(await interaction(Promise.resolve("ah"))).toEqual(undefined);

  // Trace
  // console.log(log.content);
  assert.deepEqual(log.content, [
    ["value1", inactive],
    ["value2", inactive],
    ["value1", inactive],
    ["value2", inactive],
  ]);
});

test("case0", async () => {
  // Utilities
  const log = createSink();

  // Interaction
  const interaction = affect(
    log.send("result"),
    withBehaviourOut(constant("toto"), log.send("behaviour"))
  );

  // Run
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);

  // Trace
  // console.log(log.content);
  assert.deepEqual(log.content, [
    ["behaviour", active],
    ["result", "toto"],
    ["behaviour", active],
    ["result", inactive],
    ["behaviour", active],
    ["result", "toto"],
    ["behaviour", active],
    ["result", "toto"],
  ]);
});

test("case1", async () => {
  // Utilities
  const yooChanel = createChannel<string>("yoo");

  // Interaction
  const interaction = withBehaviourOut(
    yooChanel.receive(),
    affect(yooChanel.send(), constant("Yoo"))
  );

  // Run
  expect(await interaction()).toEqual("Yoo");
  expect(await interaction()).toEqual("Yoo");
  expect(await interaction()).toEqual("Yoo");
});

test("case2", async () => {
  // Utilities
  const yooChanel = createChannel<string>("yoo");
  const log = createSink();

  // Interaction
  const interaction = withBehaviourIn(
    yooChanel.send(),
    affect(log.send("Here"), yooChanel.receive())
  );

  // Run
  expect(await interaction(Promise.resolve("Coucou"))).toEqual(undefined);
  expect(await interaction(Promise.resolve("hello"))).toEqual(undefined);
  expect(await interaction(Promise.resolve("world"))).toEqual(undefined);

  // Trace
  // console.log(log.content);
  assert.deepEqual(log.content, [
    ["Here", "Coucou"],
    ["Here", "hello"],
    ["Here", "world"],
  ]);
});

test("case3", async () => {
  // Utilities
  const yooChanel = createChannel<string>("yoo");
  const log = createSink();

  // Interaction
  const interaction = withBehaviourIn(
    yooChanel.send(),
    allIn(
      affect(log.send("Here"), yooChanel.receive()),
      affect(log.send("Hey"), constant("Ho"))
    )
  );

  // Run
  expect(await interaction(Promise.resolve("Coucou"))).toEqual(undefined);
  expect(await interaction(Promise.resolve("hello"))).toEqual(undefined);
  expect(await interaction(Promise.resolve("world"))).toEqual(undefined);

  // Trace
  // console.log(log.content);
  assert.deepEqual(log.content, [
    ["Hey", "Ho"],
    ["Here", "Coucou"],
    ["Hey", "Ho"],
    ["Here", "hello"],
    ["Hey", "Ho"],
    ["Here", "world"],
  ]);
});

test("apply", async () => {
  // Utilities
  const sink = createSink();
  const source = createSource([
    ["a", 1],
    ["a", 6],
    ["a", 7],
  ]);

  // Interaction
  const interaction = apply(
    sink.send("Here"),
    constant((x: number) => x * 2),
    source.receive("a")
  );

  // Run
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);

  // Trace
  // console.log(sink.content);
  assert.deepEqual(sink.content, [
    ["Here", 2],
    ["Here", 12],
    ["Here", 14],
  ]);
});

test("previous1", async () => {
  // Utilities
  const sink = createSink();
  const source = createSource([
    ["a", 0],
    ["a", 1],
    ["a", 2],
    ["a", 3],
    ["a", 4],
    ["a", 5],
    ["a", 6],
    ["a", 7],
    ["a", 8],
    ["a", 9],
  ]);

  // Interaction
  const interaction = previous(sink.send("b"), source.receive("a"));

  // Run
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);

  // Trace
  // console.log(sink.content);
  assert.deepEqual(sink.content, [
    ["b", inactive],
    ["b", 0],
    ["b", 1],
    ["b", 2],
    ["b", 3],
    ["b", 4],
    ["b", 5],
    ["b", 6],
    ["b", 7],
    ["b", 8],
  ]);
});

test("previous2", async () => {
  // Utilities
  const sink = createSink();
  const source = createSource([
    ["a", 0],
    ["a", 1],
    ["a", 2],
    ["a", 3],
    ["a", 4],
    ["a", 5],
    ["a", 6],
    ["a", 7],
    ["a", 8],
    ["a", 9],
  ]);

  // Interaction
  const interaction = previous(sink.send("b"), source.receive("a"));

  // Run
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);

  // Trace
  // console.log(sink.content);
  assert.deepEqual(sink.content, [
    ["b", inactive],
    ["b", 0],
    ["b", 1],
    ["b", inactive],
    ["b", 2],
    ["b", 4],
    ["b", inactive],
    ["b", inactive],
    ["b", 5],
    ["b", 8],
  ]);
});

test("case4", async () => {
  // Utilities
  const sink = createSink();
  const source = createSource([
    ["a", 0],
    ["a", 1],
    ["a", 2],
    ["a", 3],
    ["a", 4],
    ["a", 5],
    ["a", 6],
    ["a", 7],
    ["a", 8],
    ["a", 9],
  ]);

  // Interaction
  const interaction = previous(sink.send("b"), source.receive("a"));

  // Run
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);

  // Trace
  // console.log(sink.content);
  assert.deepEqual(sink.content, [
    ["b", inactive],
    ["b", 0],
    ["b", 1],
    ["b", inactive],
    ["b", 2],
    ["b", 4],
    ["b", inactive],
    ["b", inactive],
    ["b", 5],
    ["b", 8],
  ]);
});

test("composition", async () => {
  // Utilities
  const sink = createSink();
  const source = createSource([
    ["a", 0],
    ["b", 10],
    ["a", 1],
    ["b", 11],
    ["a", 2],
    ["b", 12],
    ["a", 3],
    ["b", 13],
    ["a", 4],
    ["b", 14],
    ["a", 5],
    ["b", 15],
    ["a", 6],
    ["b", 16],
    ["a", 7],
    ["b", 17],
    ["a", 8],
    ["b", 18],
    ["a", 9],
    ["b", 19],
  ]);

  // Interaction
  const interaction = affect(
    decomposeOut([sink.send("x"), sink.send("y")]),
    composeIn([source.receive("a"), source.receive("b")])
  );

  // Run
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantInactive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);
  expect(await interaction(constantActive())).toEqual(undefined);

  // Trace
  // console.log(sink.content);
  assert.deepEqual(sink.content, [
    ["x", 0],
    ["y", 10],
    ["x", 1],
    ["y", 11],
    ["x", 2],
    ["y", 12],
    ["x", inactive],
    ["y", inactive],
    ["x", 4],
    ["y", 14],
    ["x", 5],
    ["y", 15],
    ["x", inactive],
    ["y", inactive],
    ["x", inactive],
    ["y", inactive],
    ["x", 8],
    ["y", 18],
    ["x", 9],
    ["y", 19],
  ]);
});
