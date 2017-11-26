import { sendInput, receiveOutput } from "../channel";
import { send, receive } from "../foreign";
import { all } from "../all";
import { affect } from "../affect";

test("no channel", async () => {
  await all(
    affect(send(i => expect(i).toEqual(5)), receive(() => 5)),
    affect(send(i => expect(i).toEqual(5)), receive(() => 5))
  ).set("active");
});

test("channel atomic 1 send 1 receive", async () => {
  await all(
    affect(send(i => expect(i).toEqual(5)), receiveOutput("a")),
    affect(sendInput("a"), receive(() => 5))
  ).set("active");
});

test("channel atomic 2 send 1 receive", async () => {
  await all(
    affect(send(i => expect(i).toEqual(5)), receiveOutput("b")),
    affect(sendInput("b"), receive(() => 5)),
    affect(sendInput("b"), receive(() => 5))
  ).set("active");
});

test("channel atomic 1 send 2 receive", async () => {
  await all(
    affect(send(i => expect(i).toEqual(5)), receiveOutput("c")),
    affect(send(i => expect(i).toEqual(5)), receiveOutput("c")),
    affect(sendInput("c"), receive(() => 5))
  ).set("active");
});

test("channel atomic 3 send 3 receive", async () => {
  await all(
    affect(send(i => expect(i).toEqual(5)), receiveOutput("d")),
    affect(send(i => expect(i).toEqual(5)), receiveOutput("d")),
    affect(send(i => expect(i).toEqual(5)), receiveOutput("d")),
    affect(sendInput("d"), receive(() => 5)),
    affect(sendInput("d"), receive(() => 5)),
    affect(sendInput("d"), receive(() => 5))
  ).set("active");
});

test("channel atomic 3 send with inactive 3 receive", async () => {
  await all(
    affect(send(i => expect(i).toEqual(5)), receiveOutput("e")),
    affect(send(i => expect(i).toEqual(5)), receiveOutput("e")),
    affect(send(i => expect(i).toEqual(5)), receiveOutput("e")),
    affect(sendInput("e"), receive(() => 5)),
    affect(sendInput("e"), receive(() => "inactive")),
    affect(sendInput("e"), receive(() => "inactive"))
  ).set("active");
});

test("channel atomic 3 send inactive 3 receive", async () => {
  await all(
    affect(send(i => expect(i).toEqual("inactive")), receiveOutput("f")),
    affect(send(i => expect(i).toEqual("inactive")), receiveOutput("f")),
    affect(send(i => expect(i).toEqual("inactive")), receiveOutput("f")),
    affect(sendInput("f"), receive(() => "inactive")),
    affect(sendInput("f"), receive(() => "inactive")),
    affect(sendInput("f"), receive(() => "inactive"))
  ).set("active");
});
