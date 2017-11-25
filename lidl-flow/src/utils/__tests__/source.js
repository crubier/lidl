import Source from "../source";
//
// test("simple ", async () => {
//   const source = new Source();
//   const gen = source.generator();
//   const next = gen.next();
//   await source.yield(1);
//   const { value, done } = await next;
//   expect(value).toEqual(1);
// });
//
// test("simpler ", async () => {
//   const source = new Source();
//   const gen = source.generator();
//   await source.yield(1);
//   const { value, done } = await gen.next();
//   expect(value).toEqual(1);
// });

// test(
//   "run several steps ",
//   async () => {
//     const source = new Source();
//     const gen = source.generator(false, true);
//     await source.yield(1, true, false);
//     expect((await gen.next()).value).toEqual(1);
//     await source.yield(2, true, true);
//     expect((await gen.next()).value).toEqual(2);
//     await source.yield(5, true, true);
//     expect((await gen.next()).value).toEqual(5);
//   },
//   5000
// );
//
test("run on array", async () => {
  const source = new Source();

  const values = [1, 2, 3, 5, 9, 0];

  const server = async () => {
    for (const v of values) {
      await source.yield(v);
    }
    await source.return();
  };

  const client = async () => {
    let i = 0;
    for await (const v of source.generator()) {
      expect(v).toEqual(values[i]);
      i = i + 1;
    }
  };

  await Promise.all([client(), server()]);
});
