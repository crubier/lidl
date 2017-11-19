import { send as sendChannel, receive as receiveChannel } from "../channel";
import { send, receive } from "../foreign";
import { all } from "../all";
import { affect } from "../affect";

test("no send channel", async () => {
  //   await all(
  //     affect(send(i => expect(i).toEqual(5)), receive(() => 5)),
  //     affect(send(i => expect(i).toEqual(5)), receive(() => 5))
  //   ).set("active");
});

// test("simple send channel", async () => {
//   await all(
//     affect(send(i => expect(i).toEqual(5)), receiveChannel("a")),
//     affect(sendChannel("a"), receive(() => 5))
//   ).set("active");
// });
