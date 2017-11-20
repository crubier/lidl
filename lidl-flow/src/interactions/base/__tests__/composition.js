import { send, receive } from "../foreign";
import { composition } from "../composition";
import Promise from "bluebird";

test("simple function", async () => {
  const interaction = composition({
    a: send(i => expect(i).toEqual(2)),
    b: receive(() => 91)
  });
  const [_, result] = await Promise.all([
    interaction.elements.a.set(2),
    interaction.elements.b.get()
  ]);
  expect(result).toEqual(91);
});
