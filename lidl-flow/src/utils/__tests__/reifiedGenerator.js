import ReifiedGenerator from "../reifiedGenerator";

test(
  "run on array manual",
  async () => {
    const source = new ReifiedGenerator();

    const values = [1, 2, 3, 5, 9, 0];

    const server = async () => {
      let i = 0;
      for (const v of values) {
        const x = await source.yield(v);
        expect(v).toEqual(x);
        i = i + 1;
      }
      await source.return();
    };

    const client = async () => {
      let i = 0;
      const gen = source.generator();
      for (const v of values) {
        const x = (await gen.next()).value;
        expect(v).toEqual(x);
        i = i + 1;
      }
      await gen.next();
    };

    await Promise.all([client(), server()]);
  },
  1000
);
