import { send, receive } from "../foreign";
import { affectInput, affectOutput, affect, affectComposite } from "../affect";
import { composition } from "../composition";

test("affect input", async () => {
  await affectInput(send(i => expect(i).toEqual(5)), receive(() => 5)).set(
    "active"
  );
  await affectInput(
    send(i => expect(i).toEqual("inactive")),
    receive(() => "inactive")
  ).set("active");
  await affectInput(
    send(i => expect(i).toEqual("inactive")),
    receive(() => 5)
  ).set("inactive");
  await affectInput(
    send(i => expect(i).toEqual("inactive")),
    receive(() => "inactive")
  ).set("inactive");
});

test("affect output", async () => {
  await affectOutput(receive(() => 5), send(i => expect(i).toEqual(5))).set(
    "active"
  );
  await affectOutput(
    receive(() => "inactive"),
    send(i => expect(i).toEqual("inactive"))
  ).set("active");
  await affectOutput(
    receive(() => 5),
    send(i => expect(i).toEqual("inactive"))
  ).set("inactive");
  await affectOutput(
    receive(() => "inactive"),
    send(i => expect(i).toEqual("inactive"))
  ).set("inactive");
});

test("affect simple", async () => {
  await affect(receive(() => 5), send(i => expect(i).toEqual(5))).set("active");
  await affect(
    receive(() => "inactive"),
    send(i => expect(i).toEqual("inactive"))
  ).set("active");
  await affect(receive(() => 5), send(i => expect(i).toEqual("inactive"))).set(
    "inactive"
  );
  await affect(
    receive(() => "inactive"),
    send(i => expect(i).toEqual("inactive"))
  ).set("inactive");
  await affect(send(i => expect(i).toEqual(5)), receive(() => 5)).set("active");
  await affect(
    send(i => expect(i).toEqual("inactive")),
    receive(() => "inactive")
  ).set("active");
  await affect(send(i => expect(i).toEqual("inactive")), receive(() => 5)).set(
    "inactive"
  );
  await affect(
    send(i => expect(i).toEqual("inactive")),
    receive(() => "inactive")
  ).set("inactive");
});

test("affect composite", async () => {
  await affectComposite(
    composition({ a: receive(() => 54) }),
    composition({ a: send(i => expect(i).toEqual("inactive")) })
  ).set("inactive");
  await affectComposite(
    composition({ a: receive(() => 54) }),
    composition({ a: send(i => expect(i).toEqual(54)) })
  ).set("active");
});
