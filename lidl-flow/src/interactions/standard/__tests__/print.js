import { print } from "../print";
import { affect } from "../../base/affect";
import { literal } from "../../base/literal";

test("no channel", async () => {
  const spy = jest.spyOn(global.console, "log");
  await affect(print("value"), literal(5)).set("active");
  expect(spy).toHaveBeenCalledWith("value: 5");
});
