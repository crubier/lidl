test("mock", () => {
  expect(1).toEqual(1);
});

// import { send, receive } from "../foreign";
//
// import Source from "../../../utils/source";
//
// test("simple send", async () => {
//   const source = new Source();
//   const testInteraction = send(i => expect(i).toEqual(5)).set(
//     source.generator()
//   );
//   await source.yield(5);
//   await source.return();
//   await testInteraction;
// });
// test("promise send", async () => {
//   const source = new Source();
//   const testInteraction = send(async i => expect(i).toEqual(5)).set(
//     source.generator()
//   );
//   await source.yield(5);
//   await source.return();
//   await testInteraction;
// });
// test("simple send inactive", async () => {
//   const source = new Source();
//   const testInteraction = send(async i => expect(i).toEqual("inactive")).set(
//     source.generator()
//   );
//   await source.yield("inactive");
//   await source.return();
//   await testInteraction;
// });
// test("simple send null", async () => {
//   const source = new Source();
//   const testInteraction = send(null).set(source.generator());
//   await source.yield("inactive");
//   await source.return();
//   await testInteraction;
// });
//
// test("simple receive", async () => {
//   const gen = receive(() => 5).get();
//   expect((await gen.next()).value).toEqual(5);
// });
// test("simple receive", async () => {
//   const gen = receive(async () => 5).get();
//   expect((await gen.next()).value).toEqual(5);
// });
// test("null receive", async () => {
//   const gen = receive(null).get();
//   expect((await gen.next()).value).toEqual("inactive");
// });
// test("null func receive", async () => {
//   const gen = receive(() => null).get();
//   expect((await gen.next()).value).toEqual("inactive");
// });
// test("null promise receive", async () => {
//   const gen = receive(async () => null).get();
//   expect((await gen.next()).value).toEqual("inactive");
// });
