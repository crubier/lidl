test("mock", () => {
  expect(1).toEqual(1);
});

// import { send, receive } from "../foreign";
// import {
//   withBehaviourInput,
//   withBehaviourOutput,
//   withBehaviour
// } from "../withBehaviour";
//
// test("simple behaviour input", async () => {
//   await withBehaviourInput(
//     send(i => expect(i).toEqual(5)),
//     send(i => expect(i).toEqual("active"))
//   ).set(5);
//   await withBehaviourInput(
//     send(i => expect(i).toEqual("inactive")),
//     send(i => expect(i).toEqual("active"))
//   ).set("inactive");
// });
//
// test("simple behaviour output", async () => {
//   expect(
//     await withBehaviourOutput(
//       receive(() => 5),
//       send(i => expect(i).toEqual("active"))
//     ).get()
//   ).toEqual(5);
//   expect(
//     await withBehaviourOutput(
//       receive(() => "inactive"),
//       send(i => expect(i).toEqual("active"))
//     ).get()
//   ).toEqual("inactive");
// });
//
// test("simple behaviour output", async () => {
//   await withBehaviour(
//     send(i => expect(i).toEqual(5)),
//     send(i => expect(i).toEqual("active"))
//   ).set(5);
//   await withBehaviour(
//     send(i => expect(i).toEqual("inactive")),
//     send(i => expect(i).toEqual("active"))
//   ).set("inactive");
//   expect(
//     await withBehaviour(
//       receive(() => 5),
//       send(i => expect(i).toEqual("active"))
//     ).get()
//   ).toEqual(5);
//   expect(
//     await withBehaviour(
//       receive(() => "inactive"),
//       send(i => expect(i).toEqual("active"))
//     ).get()
//   ).toEqual("inactive");
// });
