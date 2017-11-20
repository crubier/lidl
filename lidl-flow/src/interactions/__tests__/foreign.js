import { send, receive } from "../foreign";

test("simple send", async () => {
  await send(i => expect(i).toEqual(5)).set(5);
});
test("promise send", async () => {
  await send(async i => expect(i).toEqual(5)).set(5);
});
test("simple send", async () => {
  await send(i => expect(i).toEqual("inactive")).set("inactive");
});
test("simple send", async () => {
  await send(null).set("inactive");
});

test("simple receive", async () => {
  expect(await receive(() => 5).get()).toEqual(5);
});
test("promise receive", async () => {
  expect(await receive(async () => 5).get()).toEqual(5);
});
test("null receive", async () => {
  expect(await receive(null).get()).toEqual("inactive");
});
test("null func receive", async () => {
  expect(await receive(() => null).get()).toEqual("inactive");
});
test("null promise receive", async () => {
  expect(await receive(async () => null).get()).toEqual("inactive");
});
