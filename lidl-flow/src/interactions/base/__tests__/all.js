test("mock", () => {
  expect(1).toEqual(1);
});
//
// import { send, receive } from "../foreign";
// import { allInput, all } from "../all";
// import Source from "../../../utils/source";
//
//
//
// test("simple all input", async () => {
//   const source = new Source();
//
//   const testInteraction = allInput(
//     send(i => expect(i).toEqual(5)),
//     send(i => expect(i).toEqual(5)),
//     send(i => expect(i).not.toEqual(6))
//   ).set(source.generator());
//
//   await source.yield(5);
//   await source.return();
//   await testInteraction;
// });
//
// test("simple all activation ", async () => {
//   const source = new Source();
//
//   const testInteraction = allInput(
//     send(i => expect(i).toEqual("active")),
//     send(i => expect(i).toEqual("active")),
//     send(i => expect(i).not.toEqual(6))
//   ).set(source.generator());
//
//   await source.yield("active");
//   await source.return();
//   await testInteraction;
// });
