import * as serializer from "../serializer";
import parser from "../parser";
import _ from "lodash";

describe("serializer", function () {
  describe("interactions", function () {
    it("simple case", function () {
      expect(
        serializer
          .serialize(
            parser.parse("(cos((4)*((5)lol(bob)joe))+(5))", {
              startRule: "interaction",
            }),
          )
          .replace(/\s/g, ""),
      ).toEqual("(cos((4)*((5)lol(bob)joe))+(5))");
    });
  });
});
