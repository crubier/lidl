import { send, receive } from "../foreign";

test("simple send", async () => {
  await send(i => expect(i).toEqual(5)).set(5);
});
test("promise send", async () => {
  await send(async i => expect(i).toEqual(5)).set(5);
});
test("simple receive", async () => {
  expect(await receive(() => 5).get()).toEqual(5);
});
test("simple send", async () => {
  expect(await receive(async () => 5).get()).toEqual(5);
});
