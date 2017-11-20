import { literal } from "../literal";

test("simple literal", async () => {
  expect(await literal(5).get()).toEqual(5);
});
