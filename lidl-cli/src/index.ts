#!/usr/bin/env bun

import { parseArgs } from "node:util";
import { compiler, examples } from "../../lidl-core/index";

const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const blue = (s: string) => `\x1b[34m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;

async function main() {
  const { values } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
      input: { type: "string", short: "i" },
      output: { type: "string", short: "o" },
      header: { type: "string", short: "h" },
      help: { type: "boolean" },
    },
    strict: true,
  });

  if (values.help || !values.input || !values.output) {
    console.log(`
${bold("LIDL Compiler")}

${bold("Usage:")} lidl -i <input.lidl> -o <output.js> [-h <header.js>]

${bold("Options:")}
  -i, --input   Input LIDL file to compile (required)
  -o, --output  Output generated JS file (required)
  -h, --header  Header JS file to use in the generated JS file
      --help    Show this help message

${bold("Example:")}
  lidl -i foo.lidl -o foo.js
`);
    process.exit(values.help ? 0 : 1);
  }

  console.log(blue("\nLidl Compiler"));

  try {
    const inputFile = values.input;
    console.log(`Compiling ${inputFile}`);
    const code = await Bun.file(inputFile).text();

    let header: string;
    if (values.header === undefined) {
      console.log("Using default header file");
      header = examples.header;
    } else {
      console.log(`Using header file ${values.header}`);
      header = await Bun.file(values.header).text();
    }

    compiler.simpleCompile(code, header, async (output: string) => {
      await Bun.write(values.output!, output);
      console.log(green("Success!") + "\n");
    });
  } catch (e: any) {
    console.log(red(`Error: ${e.message}`) + "\n");
    process.exit(1);
  }
}

main();
