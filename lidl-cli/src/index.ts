#!/usr/bin/env bun

import { parseArgs } from "node:util";
import { compiler, parser, runner, examples, format } from "../../lidl-core/index";

const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const blue = (s: string) => `\x1b[34m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;

function printUsage() {
  console.log(`
${bold("LIDL")} ${dim("— LIDL Interaction Description Language")}

${bold("Usage:")} lidl <command> [options]

${bold("Commands:")}
  compile   Compile a LIDL file to JavaScript
  check     Parse and type-check a LIDL file
  format    Format a LIDL file
  run       Compile and run a LIDL file with a scenario

${bold("Examples:")}
  lidl compile -i foo.lidl -o foo.js
  lidl check foo.lidl
  lidl format foo.lidl
  lidl run foo.lidl -s scenario.json

Run ${dim("lidl <command> --help")} for command-specific options.
`);
}

async function compileCmd(args: string[]) {
  const { values } = parseArgs({
    args,
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
${bold("lidl compile")} — Compile a LIDL file to JavaScript

${bold("Usage:")} lidl compile -i <input.lidl> -o <output.js> [-h <header.js>]

${bold("Options:")}
  -i, --input   Input LIDL file ${dim("(required)")}
  -o, --output  Output JavaScript file ${dim("(required)")}
  -h, --header  Header JS file with external function definitions
      --help    Show this help message
`);
    process.exit(values.help ? 0 : 1);
  }

  console.log(blue("Compiling") + ` ${values.input}`);

  const code = await Bun.file(values.input).text();

  let header: string;
  if (values.header === undefined) {
    header = examples.header;
  } else {
    console.log(dim(`Using header: ${values.header}`));
    header = await Bun.file(values.header).text();
  }

  compiler.simpleCompile(code, header, async (output: string) => {
    await Bun.write(values.output!, output);
    console.log(green("✓") + ` Written to ${values.output}`);
  });
}

async function checkCmd(args: string[]) {
  const { values, positionals } = parseArgs({
    args,
    options: {
      help: { type: "boolean" },
    },
    allowPositionals: true,
    strict: true,
  });

  if (values.help || positionals.length === 0) {
    console.log(`
${bold("lidl check")} — Parse and type-check a LIDL file

${bold("Usage:")} lidl check <file.lidl> [<file2.lidl> ...]

${bold("Options:")}
      --help    Show this help message
`);
    process.exit(values.help ? 0 : 1);
  }

  let allPassed = true;
  for (const file of positionals) {
    try {
      const code = await Bun.file(file).text();
      const ast = parser.parse(code);

      let errors: string[] = [];
      try {
        const { compile } = await import("../../lidl-core/src/graphCompiler");
        compile(ast[0], examples.header, {
          error: (_graph: any, data: any) => {
            errors.push(data?.error?.message || "Compilation error");
            return true;
          },
          getJsCode: () => true,
        });
      } catch (e: any) {
        errors.push(e.message);
      }

      if (errors.length > 0) {
        console.log(yellow("⚠") + ` ${file}`);
        for (const err of errors) {
          console.log(`  ${red("error:")} ${err}`);
        }
        allPassed = false;
      } else {
        console.log(green("✓") + ` ${file}`);
      }
    } catch (e: any) {
      console.log(red("✗") + ` ${file}`);
      console.log(`  ${red("error:")} ${e.message}`);
      allPassed = false;
    }
  }

  if (!allPassed) process.exit(1);
}

async function formatCmd(args: string[]) {
  const { values, positionals } = parseArgs({
    args,
    options: {
      stdout: { type: "boolean" },
      check: { type: "boolean" },
      help: { type: "boolean" },
    },
    allowPositionals: true,
    strict: true,
  });

  if (values.help || positionals.length === 0) {
    console.log(`
${bold("lidl format")} — Format a LIDL file

${bold("Usage:")} lidl format [options] <file.lidl> [<file2.lidl> ...]

${bold("Options:")}
      --stdout  Print formatted output to stdout instead of writing to file
      --check   Check if files are formatted without modifying them
      --help    Show this help message
`);
    process.exit(values.help ? 0 : 1);
  }

  let allFormatted = true;
  for (const file of positionals) {
    try {
      const code = await Bun.file(file).text();
      const formatted = format(code);

      if (values.check) {
        if (code !== formatted) {
          console.log(yellow("⚠") + ` ${file} needs formatting`);
          allFormatted = false;
        } else {
          console.log(green("✓") + ` ${file}`);
        }
      } else if (values.stdout) {
        process.stdout.write(formatted);
      } else {
        if (code !== formatted) {
          await Bun.write(file, formatted);
          console.log(green("✓") + ` Formatted ${file}`);
        } else {
          console.log(dim(`  ${file} already formatted`));
        }
      }
    } catch (e: any) {
      console.log(red("✗") + ` ${file}`);
      console.log(`  ${red("error:")} ${e.message}`);
      allFormatted = false;
    }
  }

  if (values.check && !allFormatted) process.exit(1);
}

async function runCmd(args: string[]) {
  const { values, positionals } = parseArgs({
    args,
    options: {
      scenario: { type: "string", short: "s" },
      header: { type: "string", short: "h" },
      help: { type: "boolean" },
    },
    allowPositionals: true,
    strict: true,
  });

  const file = positionals[0];
  if (values.help || !file || !values.scenario) {
    console.log(`
${bold("lidl run")} — Compile and run a LIDL file with a scenario

${bold("Usage:")} lidl run <file.lidl> -s <scenario.json> [-h <header.js>]

${bold("Options:")}
  -s, --scenario  Scenario JSON file ${dim("(required)")}
  -h, --header    Header JS file with external function definitions
      --help      Show this help message
`);
    process.exit(values.help ? 0 : 1);
  }

  console.log(blue("Compiling") + ` ${file}`);

  const code = await Bun.file(file).text();
  const scenarioJson = await Bun.file(values.scenario).text();
  const scenario = JSON.parse(scenarioJson);

  let header: string;
  if (values.header === undefined) {
    header = examples.header;
  } else {
    console.log(dim(`Using header: ${values.header}`));
    header = await Bun.file(values.header).text();
  }

  const ast = parser.parse(code);

  const { compile } = await import("../../lidl-core/src/graphCompiler");

  let jsCode: any = null;
  compile(ast[0], header, {
    getJsCode: (_graph: any, data: any) => {
      jsCode = data;
      return true;
    },
    error: (_graph: any, data: any) => {
      console.log(red("error:") + ` ${data?.error?.message || "Compilation error"}`);
      return true;
    },
  });

  if (!jsCode) {
    console.log(red("✗") + " Compilation produced no output");
    process.exit(1);
  }

  console.log(blue("Running") + ` with scenario ${values.scenario}`);
  const trace = runner.run(jsCode, scenario);
  console.log(JSON.stringify(trace, null, 2));
}

async function main() {
  const args = Bun.argv.slice(2);
  const command = args[0];
  const rest = args.slice(1);

  switch (command) {
    case "compile":
      return compileCmd(rest);
    case "check":
      return checkCmd(rest);
    case "format":
      return formatCmd(rest);
    case "run":
      return runCmd(rest);
    case "--help":
    case "-h":
    case undefined:
      printUsage();
      process.exit(command === undefined ? 1 : 0);
      break;
    default:
      console.log(red(`Unknown command: ${command}`));
      printUsage();
      process.exit(1);
  }
}

main().catch((e) => {
  console.log(red(`Error: ${e.message}`));
  process.exit(1);
});
