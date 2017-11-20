import { send, receive } from "../foreign";
import { allInput, all } from "../all";

test("simple all input", async () => {
  await allInput(
    send(i => expect(i).toEqual(5)),
    send(i => expect(i).toEqual(5)),
    send(i => expect(i).not.toEqual(6))
  ).set(5);
});

test("simple all activation ", async () => {
  await all(
    send(i => expect(i).toEqual("active")),
    send(i => expect(i).toEqual("active")),
    send(i => expect(i).not.toEqual(6))
  ).set("active");
});
