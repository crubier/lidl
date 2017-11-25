import { isInactive } from "../";

test("simple type", () => {
  expect(isInactive("inactive")).toBeTruthy();
  expect(isInactive(false)).toBeFalsy();
  expect(isInactive({ a: "b" })).toBeFalsy();
});
