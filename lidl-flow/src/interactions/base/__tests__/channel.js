test("mock", () => {
  expect(1).toEqual(1);
});

// import { send as sendChannel, receive as receiveChannel } from "../channel";
// import { send, receive } from "../foreign";
// import { all } from "../all";
// import { affect } from "../affect";
//
// test("no channel", async () => {
//   await all(
//     affect(send(i => expect(i).toEqual(5)), receive(() => 5)),
//     affect(send(i => expect(i).toEqual(5)), receive(() => 5))
//   ).set("active");
// });
//
// test("channel 1 send 1 receive", async () => {
//   await all(
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("a")),
//     affect(sendChannel("a"), receive(() => 5))
//   ).set("active");
// });
//
// test("channel 2 send 1 receive", async () => {
//   await all(
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("b")),
//     affect(sendChannel("b"), receive(() => 5)),
//     affect(sendChannel("b"), receive(() => 5))
//   ).set("active");
// });
//
// test("channel 1 send 2 receive", async () => {
//   await all(
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("c")),
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("c")),
//     affect(sendChannel("c"), receive(() => 5))
//   ).set("active");
// });
//
// test("channel 3 send 3 receive", async () => {
//   await all(
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("d")),
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("d")),
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("d")),
//     affect(sendChannel("d"), receive(() => 5)),
//     affect(sendChannel("d"), receive(() => 5)),
//     affect(sendChannel("d"), receive(() => 5))
//   ).set("active");
// });
//
// test("channel 3 send with inactive 3 receive", async () => {
//   await all(
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("e")),
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("e")),
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("e")),
//     affect(sendChannel("e"), receive(() => 5)),
//     affect(sendChannel("e"), receive(() => "inactive")),
//     affect(sendChannel("e"), receive(() => "inactive"))
//   ).set("active");
// });
//
// test("channel 3 send inactive 3 receive", async () => {
//   await all(
//     affect(send(i => expect(i).toEqual("inactive")), receiveChannel("f")),
//     affect(send(i => expect(i).toEqual("inactive")), receiveChannel("f")),
//     affect(send(i => expect(i).toEqual("inactive")), receiveChannel("f")),
//     affect(sendChannel("f"), receive(() => "inactive")),
//     affect(sendChannel("f"), receive(() => "inactive")),
//     affect(sendChannel("f"), receive(() => "inactive"))
//   ).set("active");
// });
