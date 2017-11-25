test("mock", () => {
  expect(1).toEqual(1);
});

// import { send, receive } from "../foreign";
// import { affectInput, affectOutput, affect } from "../affect";
// import { composition } from "../composition";
//
// test("affect input", async () => {
//   await affectInput(send(i => expect(i).toEqual(5)), receive(() => 5)).set(
//     "active"
//   );
//   await affectInput(
//     send(i => expect(i).toEqual("inactive")),
//     receive(() => "inactive")
//   ).set("active");
//   await affectInput(
//     send(i => expect(i).toEqual("inactive")),
//     receive(() => 5)
//   ).set("inactive");
//   await affectInput(
//     send(i => expect(i).toEqual("inactive")),
//     receive(() => "inactive")
//   ).set("inactive");
// });
//
// test("affect output", async () => {
//   await affectOutput(receive(() => 5), send(i => expect(i).toEqual(5))).set(
//     "active"
//   );
//   await affectOutput(
//     receive(() => "inactive"),
//     send(i => expect(i).toEqual("inactive"))
//   ).set("active");
//   await affectOutput(
//     receive(() => 5),
//     send(i => expect(i).toEqual("inactive"))
//   ).set("inactive");
//   await affectOutput(
//     receive(() => "inactive"),
//     send(i => expect(i).toEqual("inactive"))
//   ).set("inactive");
// });
//
// test("affect simple", async () => {
//   await affect(receive(() => 5), send(i => expect(i).toEqual(5))).set("active");
//   await affect(
//     receive(() => "inactive"),
//     send(i => expect(i).toEqual("inactive"))
//   ).set("active");
//   await affect(receive(() => 5), send(i => expect(i).toEqual("inactive"))).set(
//     "inactive"
//   );
//   await affect(
//     receive(() => "inactive"),
//     send(i => expect(i).toEqual("inactive"))
//   ).set("inactive");
//   await affect(send(i => expect(i).toEqual(5)), receive(() => 5)).set("active");
//   await affect(
//     send(i => expect(i).toEqual("inactive")),
//     receive(() => "inactive")
//   ).set("active");
//   await affect(send(i => expect(i).toEqual("inactive")), receive(() => 5)).set(
//     "inactive"
//   );
//   await affect(
//     send(i => expect(i).toEqual("inactive")),
//     receive(() => "inactive")
//   ).set("inactive");
// });
//
// test("affect composite", async () => {
//   await affect(
//     composition({ a: receive(() => 54) }),
//     composition({ a: send(i => expect(i).toEqual("inactive")) })
//   ).set("inactive");
//   await affect(
//     composition({ a: receive(() => 54) }),
//     composition({ a: send(i => expect(i).toEqual(54)) })
//   ).set("active");
//   await affect(
//     composition({ a: receive(() => "inactive") }),
//     composition({ a: send(i => expect(i).toEqual("inactive")) })
//   ).set("active");
//   await affect(
//     composition({
//       a: receive(() => "inactive"),
//       b: send(i => expect(i).toEqual("inactive"))
//     }),
//     composition({
//       a: send(i => expect(i).toEqual("inactive")),
//       b: receive(() => "inactive")
//     })
//   ).set("active");
//   await affect(
//     composition({
//       a: receive(() => "5"),
//       b: send(i => expect(i).toEqual("2"))
//     }),
//     composition({
//       a: send(i => expect(i).toEqual("5")),
//       b: receive(() => "2")
//     })
//   ).set("active");
//   await affect(
//     composition({
//       a: receive(() => "5"),
//       b: send(i => expect(i).toEqual("inactive"))
//     }),
//     composition({
//       a: send(i => expect(i).toEqual("inactive")),
//       b: receive(() => "2")
//     })
//   ).set("inactive");
// });
//
// test("affect deep composite", async () => {
//   await affect(
//     composition({
//       a: receive(() => "5"),
//       b: send(i => expect(i).toEqual("2")),
//       c: composition({
//         a: receive(() => "91"),
//         b: send(i => expect(i).toEqual("22"))
//       })
//     }),
//     composition({
//       a: send(i => expect(i).toEqual("5")),
//       b: receive(() => "2"),
//       c: composition({
//         a: send(i => expect(i).toEqual("91")),
//         b: receive(() => "22")
//       })
//     })
//   ).set("active");
//
//   await affect(
//     composition({
//       a: receive(() => "5"),
//       b: send(i => expect(i).toEqual("2")),
//       c: composition({
//         a: receive(() => "inactive"),
//         b: send(i => expect(i).toEqual("inactive"))
//       })
//     }),
//     composition({
//       a: send(i => expect(i).toEqual("5")),
//       b: receive(() => "2"),
//       c: null
//     })
//   ).set("active");
//
//   await affect(
//     composition({
//       a: receive(() => "5"),
//       b: send(i => expect(i).toEqual("inactive")),
//       c: composition({
//         a: receive(() => "inactive"),
//         b: send(i => expect(i).toEqual("inactive"))
//       })
//     }),
//     null
//   ).set("active");
// });
