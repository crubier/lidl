// import { send, receive } from "../../../base/foreign";
// import { func } from "../../../base/function";
// import { application } from "../../../base/application";
// import { literal } from "../../literal";
// import { isExpected } from "../../expect";
//
// import { sum } from "..";
//
// test("Math functions", async () => {
//   application(sum, literal({ x: 4, y: 5 }), isExpected.toEqual(9)).set(
//     "active"
//   );
//   application(
//     sum,
//     literal({ x: "inactive", y: 5 }),
//     isExpected.toBeInactive()
//   ).set("active");
//   application(
//     sum,
//     literal({ x: "inactive", y: "inactive" }),
//     isExpected.toBeInactive()
//   ).set("active");
//   application(sum, literal({ x: 5 }), isExpected.toBeInactive()).set("active");
//   application(sum, null, isExpected.toBeInactive()).set("active");
//   application(sum, literal(null), isExpected.toBeInactive()).set("active");
//   application(sum, literal("inactive"), isExpected.toBeInactive()).set(
//     "active"
//   );
// });
test("mock", () => {
  expect(1).toEqual(1);
});
