test("Can several times on the same promise ", async () => {
  let p = Promise.resolve(5);
  expect(await p).toEqual(5);
  expect(await p).toEqual(5);
  expect(await p).toEqual(5);
  expect(await p).toEqual(5);
  expect(await p).toEqual(5);

  p = Promise.resolve(6);
  expect(await p).toEqual(6);
  expect(await p).toEqual(6);
  expect(await p).toEqual(6);
  expect(await p).toEqual(6);
  expect(await p).toEqual(6);
});
