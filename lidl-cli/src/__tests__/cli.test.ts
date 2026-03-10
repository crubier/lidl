import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { spawn } from "bun";
import * as path from "path";
import * as fs from "fs";

const CLI = path.resolve(__dirname, "..", "index.ts");
const EXAMPLES_DIR = path.resolve(__dirname, "..", "..", "..", "lidl-core", "example", "ok");
const TMP_DIR = path.join(import.meta.dir, ".tmp-test");

function run(...args: string[]) {
  return spawn(["bun", CLI, ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });
}

async function runAndCapture(...args: string[]) {
  const proc = run(...args);
  const exitCode = await proc.exited;
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  return { exitCode, stdout, stderr };
}

beforeAll(() => {
  fs.mkdirSync(TMP_DIR, { recursive: true });
});

afterAll(() => {
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Help / Usage
// ---------------------------------------------------------------------------

describe("help", () => {
  test("no args shows usage and exits with 1", async () => {
    const { exitCode, stdout } = await runAndCapture();
    expect(exitCode).toBe(1);
    expect(stdout).toContain("lidl <command>");
  });

  test("--help shows usage and exits with 0", async () => {
    const { exitCode, stdout } = await runAndCapture("--help");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("compile");
    expect(stdout).toContain("check");
    expect(stdout).toContain("format");
    expect(stdout).toContain("run");
  });

  test("unknown command exits with 1", async () => {
    const { exitCode, stdout } = await runAndCapture("bogus");
    expect(exitCode).toBe(1);
    expect(stdout).toContain("Unknown command");
  });
});

// ---------------------------------------------------------------------------
// compile
// ---------------------------------------------------------------------------

describe("compile", () => {
  test("compile --help shows usage", async () => {
    const { exitCode, stdout } = await runAndCapture("compile", "--help");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("--input");
    expect(stdout).toContain("--output");
  });

  test("compile missing args exits with 1", async () => {
    const { exitCode } = await runAndCapture("compile");
    expect(exitCode).toBe(1);
  });

  test("compile simple example produces JS output", async () => {
    const input = path.join(EXAMPLES_DIR, "simple", "code.lidl");
    const output = path.join(TMP_DIR, "simple-output.js");
    const { exitCode, stdout } = await runAndCapture(
      "compile",
      "-i",
      input,
      "-o",
      output,
    );
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Written to");
    expect(fs.existsSync(output)).toBe(true);
    const content = fs.readFileSync(output, "utf8");
    expect(content.length).toBeGreaterThan(100);
  });

  test("compile with custom header", async () => {
    const input = path.join(EXAMPLES_DIR, "simple", "code.lidl");
    const header = path.join(EXAMPLES_DIR, "common.lidl.js");
    const output = path.join(TMP_DIR, "simple-header.js");
    const { exitCode } = await runAndCapture(
      "compile",
      "-i",
      input,
      "-o",
      output,
      "-h",
      header,
    );
    expect(exitCode).toBe(0);
    expect(fs.existsSync(output)).toBe(true);
  });

  test("compile invalid file exits with 1", async () => {
    const badFile = path.join(TMP_DIR, "bad.lidl");
    fs.writeFileSync(badFile, "interaction broken");
    const output = path.join(TMP_DIR, "bad-output.js");
    const { exitCode, stdout } = await runAndCapture(
      "compile",
      "-i",
      badFile,
      "-o",
      output,
    );
    expect(exitCode).toBe(1);
    expect(stdout).toContain("Error");
  });
});

// ---------------------------------------------------------------------------
// check
// ---------------------------------------------------------------------------

describe("check", () => {
  test("check --help shows usage", async () => {
    const { exitCode, stdout } = await runAndCapture("check", "--help");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Parse and type-check");
  });

  test("check valid file passes", async () => {
    const input = path.join(EXAMPLES_DIR, "simple", "code.lidl");
    const { exitCode, stdout } = await runAndCapture("check", input);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("✓");
  });

  test("check multiple valid files", async () => {
    const f1 = path.join(EXAMPLES_DIR, "simple", "code.lidl");
    const f2 = path.join(EXAMPLES_DIR, "arguments", "code.lidl");
    const { exitCode, stdout } = await runAndCapture("check", f1, f2);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("✓");
  });

  test("check invalid file exits with 1", async () => {
    const badFile = path.join(TMP_DIR, "bad-check.lidl");
    fs.writeFileSync(badFile, "this is not valid lidl");
    const { exitCode, stdout } = await runAndCapture("check", badFile);
    expect(exitCode).toBe(1);
    expect(stdout).toContain("✗");
    expect(stdout).toContain("error");
  });

  test("check missing args exits with 1", async () => {
    const { exitCode } = await runAndCapture("check");
    expect(exitCode).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// format
// ---------------------------------------------------------------------------

describe("format", () => {
  test("format --help shows usage", async () => {
    const { exitCode, stdout } = await runAndCapture("format", "--help");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("--stdout");
    expect(stdout).toContain("--check");
  });

  test("format --stdout prints formatted output", async () => {
    const input = path.join(EXAMPLES_DIR, "simple", "code.lidl");
    const { exitCode, stdout } = await runAndCapture(
      "format",
      "--stdout",
      input,
    );
    expect(exitCode).toBe(0);
    expect(stdout).toContain("interaction");
    expect(stdout).toContain("is");
  });

  test("format in-place modifies file", async () => {
    const testFile = path.join(TMP_DIR, "format-inplace.lidl");
    fs.writeFileSync(
      testFile,
      'interaction\n  (main):{x:Number in}\nis\n  ((x)!)\n',
    );
    const { exitCode } = await runAndCapture("format", testFile);
    expect(exitCode).toBe(0);
    const result = fs.readFileSync(testFile, "utf8");
    expect(result).toContain("interaction (main)");
  });

  test("format --check detects unformatted file", async () => {
    const testFile = path.join(TMP_DIR, "format-check.lidl");
    fs.writeFileSync(
      testFile,
      'interaction\n  (main):{x:Number in}\nis\n  ((x)!)\n',
    );
    const { exitCode, stdout } = await runAndCapture(
      "format",
      "--check",
      testFile,
    );
    expect(exitCode).toBe(1);
    expect(stdout).toContain("needs formatting");
  });

  test("format --check passes for already-formatted file", async () => {
    const input = path.join(EXAMPLES_DIR, "simple", "code.lidl");
    const { stdout: formatted } = await runAndCapture(
      "format",
      "--stdout",
      input,
    );
    const testFile = path.join(TMP_DIR, "format-check-ok.lidl");
    fs.writeFileSync(testFile, formatted);
    const { exitCode, stdout } = await runAndCapture(
      "format",
      "--check",
      testFile,
    );
    expect(exitCode).toBe(0);
    expect(stdout).toContain("✓");
  });

  test("format invalid file reports error", async () => {
    const badFile = path.join(TMP_DIR, "bad-format.lidl");
    fs.writeFileSync(badFile, "not valid lidl");
    const { exitCode, stdout } = await runAndCapture("format", badFile);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("✗");
  });
});

// ---------------------------------------------------------------------------
// run
// ---------------------------------------------------------------------------

describe("run", () => {
  test("run --help shows usage", async () => {
    const { exitCode, stdout } = await runAndCapture("run", "--help");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("--scenario");
  });

  test("run simple example with scenario produces trace", async () => {
    const input = path.join(EXAMPLES_DIR, "simple", "code.lidl");
    const scenario = path.join(EXAMPLES_DIR, "simple", "scenario.json");
    const { exitCode, stdout } = await runAndCapture(
      "run",
      input,
      "-s",
      scenario,
    );
    expect(exitCode).toBe(0);
    const trace = JSON.parse(stdout.split("\n").filter((l) => !l.includes("\x1b")).join("\n") || stdout.slice(stdout.indexOf("[")));
    expect(Array.isArray(trace)).toBe(true);
    expect(trace.length).toBeGreaterThan(0);
    expect(trace[0]).toHaveProperty("inter");
  });

  test("run missing scenario exits with 1", async () => {
    const input = path.join(EXAMPLES_DIR, "simple", "code.lidl");
    const { exitCode } = await runAndCapture("run", input);
    expect(exitCode).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// All examples compile and round-trip format
// ---------------------------------------------------------------------------

describe("all examples", () => {
  const examples = fs.readdirSync(EXAMPLES_DIR).filter((f) =>
    fs.statSync(path.join(EXAMPLES_DIR, f)).isDirectory(),
  );

  for (const name of examples) {
    const codeFile = path.join(EXAMPLES_DIR, name, "code.lidl");
    if (!fs.existsSync(codeFile)) continue;

    test(`check ${name}`, async () => {
      const { exitCode } = await runAndCapture("check", codeFile);
      expect(exitCode).toBe(0);
    });

    test(`format ${name} round-trips`, async () => {
      const { exitCode, stdout } = await runAndCapture(
        "format",
        "--stdout",
        codeFile,
      );
      expect(exitCode).toBe(0);
      const tmpFile = path.join(TMP_DIR, `roundtrip-${name}.lidl`);
      fs.writeFileSync(tmpFile, stdout);
      const { exitCode: checkExit } = await runAndCapture("check", tmpFile);
      expect(checkExit).toBe(0);
    });
  }
});
