import { send, receive } from "../channel";

test("simple send", async () => {
  await send("a").set(5);
});
