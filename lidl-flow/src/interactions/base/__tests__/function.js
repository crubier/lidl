import { send, receive } from "../foreign";
import { func } from "../function";

test("simple function", async () => {
  const interaction = func(x => 2 * x);
  const [_, result] = await Promise.all([
    interaction.elements.input.set(3),
    interaction.elements.output.get()
  ]);
  expect(result).toEqual(6);
});
