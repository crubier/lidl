import babel from "rollup-plugin-babel";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  plugins: [
    // resolve({
    //   jsnext: true,
    //   main: true
    // }),
    // commonjs({
    //   exclude: ["node_modules/lodash/**"]
    // }),
    babel({
      exclude: "node_modules/**"
    }),

    globals(),
    builtins()
  ],
  output: {
    file: "bin/index.js",
    format: "cjs"
  }
};
