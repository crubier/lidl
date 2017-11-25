import Source from "../source";

test("simple ", async () => {
  const source = new Source();
  const gen = source.generator();
  const next = gen.next();
  await source.yield(1);
  const { value, done } = await next;
  expect(value).toEqual(1);
});

test("simpler ", async () => {
  const source = new Source();
  const gen = source.generator();
  await source.yield(1);
  const { value, done } = await gen.next();
  expect(value).toEqual(1);
});

test("run several steps ", async () => {
  const source = new Source();
  const gen = source.generator();
  await source.yield(1);
  expect((await gen.next()).value).toEqual(1);
  //
  await source.yield(2);
  expect((await gen.next()).value).toEqual(2);
  //
  // await source.yield(5);
  // expect((await gen.next()).value).toEqual(5);
});
