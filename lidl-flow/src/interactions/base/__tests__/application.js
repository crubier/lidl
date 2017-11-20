import { send, receive } from "../foreign";
import { application } from "../application";
import { func } from "../function";

test("simple application", async () => {
  application(
    func(x => 2 * x),
    receive(() => 3),
    send(x => expect(x).toEqual(6))
  ).set("active");
});

test("inactive application", async () => {
  application(
    func(x => 2 * x),
    receive(() => 3),
    send(x => expect(x).toEqual("inactive"))
  ).set("inactive");
});
