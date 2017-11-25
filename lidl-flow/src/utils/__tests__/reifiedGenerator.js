import ReifiedGenerator from "../reifiedGenerator";

test(
  "run on array",
  async () => {
    const source = new ReifiedGenerator();

    const values = [1.5, 2.5, 3.5, 5.5, 9.5];

    const server = async () => {
      let i = 0;
      for (const v of values) {
        console.log(
          "Server",
          "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
        );
        console.log("Server", "v", v, i);
        const x = await source.yield(v);
        console.log("Server", "x", x, i);
        expect(v + 10).toEqual(x);
        i = i + 1;
        console.log(
          "Server",
          ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
      }
      console.log("Server", "done");
      await source.return();
    };

    const client = async () => {
      let i = 0;
      const gen = source.generator();
      for (const v of values) {
        console.log(
          "Client",
          "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
        );
        console.log("Client", "v", v, i);
        const x = (await gen.next(v + 10)).value;
        console.log("Client", "x", x, i);
        expect(v).toEqual(x);
        i = i + 1;
        console.log(
          "Client",
          ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
      }
      console.log("Client", "done");
      await gen.next();
    };

    await Promise.all([client(), server()]);
  },
  1000
);
