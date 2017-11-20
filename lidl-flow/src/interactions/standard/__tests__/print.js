import { print } from "../print";
import { literal } from "../literal";

import { affect } from "../../base/affect";

test("no channel", async () => {
  const mockLoggingFunction = jest.fn();
  await affect(print("value", mockLoggingFunction), literal(5)).set("active");
  expect(mockLoggingFunction).toHaveBeenCalledWith("value: 5");
});
