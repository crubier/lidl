import { send, receive } from "../foreign";
import { affectSimple } from "../affect";

test("simple affect", async () => {
  await affectSimple(send(i => expect(i).toEqual(5)), receive(() => 5)).set(
    "active"
  );
  await affectSimple(
    send(i => expect(i).toEqual("inactive")),
    receive(() => "inactive")
  ).set("active");
  await affectSimple(
    send(i => expect(i).toEqual("inactive")),
    receive(() => 5)
  ).set("inactive");
  await affectSimple(
    send(i => expect(i).toEqual("inactive")),
    receive(() => "inactive")
  ).set("inactive");
});
