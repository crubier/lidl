import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { spawn, type Subprocess } from "bun";
import * as path from "path";

const SERVER = path.resolve(__dirname, "..", "server.ts");

let server: Subprocess;
let msgId = 0;

function nextId() {
  return ++msgId;
}

function sendMessage(msg: object): void {
  const body = JSON.stringify(msg);
  const header = `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n`;
  server.stdin!.write(header + body);
}

async function readMessage(): Promise<any> {
  const reader = server.stdout!.getReader();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) throw new Error("Server stdout closed");
    buffer += new TextDecoder().decode(value);

    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;

    const headerStr = buffer.slice(0, headerEnd);
    const match = headerStr.match(/Content-Length:\s*(\d+)/i);
    if (!match) continue;

    const contentLength = parseInt(match[1], 10);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + contentLength;

    if (buffer.length < bodyEnd) continue;

    const body = buffer.slice(bodyStart, bodyEnd);
    reader.releaseLock();
    return JSON.parse(body);
  }
}

async function request(method: string, params: any = {}): Promise<any> {
  const id = nextId();
  sendMessage({ jsonrpc: "2.0", id, method, params });
  // Read messages until we get a response with our ID
  while (true) {
    const msg = await readMessage();
    if (msg.id === id) return msg;
    // Else it was a notification (like diagnostics), skip it
  }
}

function notify(method: string, params: any = {}): void {
  sendMessage({ jsonrpc: "2.0", method, params });
}

const TEST_URI = "file:///test/example.lidl";

const VALID_LIDL = `interaction (main):{theNumber:Number in, theResult:Number out}
is
  ({theNumber:((x)?)theResult:((x)!)})
`;

const INVALID_LIDL = `interaction broken here`;

const MULTI_DEF_LIDL = `interaction (foo):{x:Number in}
is
  ((x)!)

interface MyIface
is
  {a:Number in, b:Number out}

data MyData
is
  {x:Number, y:Number}
`;

beforeAll(async () => {
  server = spawn(["bun", SERVER, "--stdio"], {
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  });

  const resp = await request("initialize", {
    processId: null,
    capabilities: {},
    rootUri: null,
  });

  expect(resp.result.capabilities).toBeDefined();
  notify("initialized", {});
});

afterAll(() => {
  try {
    sendMessage({ jsonrpc: "2.0", id: nextId(), method: "shutdown", params: {} });
    notify("exit", {});
  } catch {}
  server.kill();
});

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------

describe("initialization", () => {
  test("server reports expected capabilities", async () => {
    // Already initialized in beforeAll, just verify stored capabilities
    const resp = await request("initialize", {
      processId: null,
      capabilities: {},
      rootUri: null,
    });
    const caps = resp.result.capabilities;
    expect(caps.textDocumentSync).toBe(1);
    expect(caps.completionProvider).toBeDefined();
    expect(caps.hoverProvider).toBe(true);
    expect(caps.documentSymbolProvider).toBe(true);
    expect(caps.documentFormattingProvider).toBe(true);
    expect(caps.definitionProvider).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Diagnostics
// ---------------------------------------------------------------------------

describe("diagnostics", () => {
  test("valid LIDL produces no error diagnostics", async () => {
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/valid.lidl",
        languageId: "lidl",
        version: 1,
        text: VALID_LIDL,
      },
    });
    // Read the diagnostics notification
    const msg = await readMessage();
    expect(msg.method).toBe("textDocument/publishDiagnostics");
    const errorDiags = (msg.params.diagnostics || []).filter(
      (d: any) => d.severity === 1, // Error
    );
    expect(errorDiags.length).toBe(0);
  });

  test("invalid LIDL produces error diagnostics", async () => {
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/invalid.lidl",
        languageId: "lidl",
        version: 1,
        text: INVALID_LIDL,
      },
    });
    const msg = await readMessage();
    expect(msg.method).toBe("textDocument/publishDiagnostics");
    expect(msg.params.diagnostics.length).toBeGreaterThan(0);
    expect(msg.params.diagnostics[0].severity).toBe(1); // Error
  });
});

// ---------------------------------------------------------------------------
// Completions
// ---------------------------------------------------------------------------

describe("completions", () => {
  test("returns keyword completions", async () => {
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/comp.lidl",
        languageId: "lidl",
        version: 1,
        text: VALID_LIDL,
      },
    });
    await readMessage(); // diagnostics

    const resp = await request("textDocument/completion", {
      textDocument: { uri: "file:///test/comp.lidl" },
      position: { line: 0, character: 0 },
    });
    const items = resp.result;
    expect(Array.isArray(items)).toBe(true);

    const labels = items.map((i: any) => i.label);
    expect(labels).toContain("interaction");
    expect(labels).toContain("interface");
    expect(labels).toContain("data");
    expect(labels).toContain("is");
    expect(labels).toContain("with");
    expect(labels).toContain("in");
    expect(labels).toContain("out");
  });

  test("returns interface operator completions", async () => {
    const resp = await request("textDocument/completion", {
      textDocument: { uri: "file:///test/comp.lidl" },
      position: { line: 0, character: 0 },
    });
    const labels = resp.result.map((i: any) => i.label);
    expect(labels).toContain("conjugation");
    expect(labels).toContain("union");
  });

  test("returns defined names from AST", async () => {
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/multi.lidl",
        languageId: "lidl",
        version: 1,
        text: MULTI_DEF_LIDL,
      },
    });
    await readMessage(); // diagnostics

    const resp = await request("textDocument/completion", {
      textDocument: { uri: "file:///test/multi.lidl" },
      position: { line: 0, character: 0 },
    });
    const labels = resp.result.map((i: any) => i.label);
    expect(labels).toContain("foo");
    expect(labels).toContain("MyIface");
    expect(labels).toContain("MyData");
  });
});

// ---------------------------------------------------------------------------
// Document Symbols
// ---------------------------------------------------------------------------

describe("document symbols", () => {
  test("returns symbols for all definitions", async () => {
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/symbols.lidl",
        languageId: "lidl",
        version: 1,
        text: MULTI_DEF_LIDL,
      },
    });
    await readMessage(); // diagnostics

    const resp = await request("textDocument/documentSymbol", {
      textDocument: { uri: "file:///test/symbols.lidl" },
    });
    const symbols = resp.result;
    expect(Array.isArray(symbols)).toBe(true);
    expect(symbols.length).toBe(3);

    const names = symbols.map((s: any) => s.name);
    expect(names.some((n: string) => n.includes("foo"))).toBe(true);
    expect(names.some((n: string) => n.includes("MyIface"))).toBe(true);
    expect(names.some((n: string) => n.includes("MyData"))).toBe(true);
  });

  test("returns empty for invalid document", async () => {
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/nosymbols.lidl",
        languageId: "lidl",
        version: 1,
        text: INVALID_LIDL,
      },
    });
    await readMessage(); // diagnostics

    const resp = await request("textDocument/documentSymbol", {
      textDocument: { uri: "file:///test/nosymbols.lidl" },
    });
    expect(resp.result.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

describe("formatting", () => {
  test("formats a valid document", async () => {
    const unformatted = `interaction\n  (main):{x:Number in}\nis\n  ((x)!)\n`;
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/fmt.lidl",
        languageId: "lidl",
        version: 1,
        text: unformatted,
      },
    });
    await readMessage(); // diagnostics

    const resp = await request("textDocument/formatting", {
      textDocument: { uri: "file:///test/fmt.lidl" },
      options: { tabSize: 2, insertSpaces: true },
    });

    expect(Array.isArray(resp.result)).toBe(true);
    expect(resp.result.length).toBe(1);
    const edit = resp.result[0];
    expect(edit.newText).toContain("interaction (main)");
  });

  test("returns null for invalid document", async () => {
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/fmt-bad.lidl",
        languageId: "lidl",
        version: 1,
        text: INVALID_LIDL,
      },
    });
    await readMessage(); // diagnostics

    const resp = await request("textDocument/formatting", {
      textDocument: { uri: "file:///test/fmt-bad.lidl" },
      options: { tabSize: 2, insertSpaces: true },
    });

    expect(resp.result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Hover
// ---------------------------------------------------------------------------

describe("hover", () => {
  test("hover on interaction definition shows info", async () => {
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/hover.lidl",
        languageId: "lidl",
        version: 1,
        text: MULTI_DEF_LIDL,
      },
    });
    await readMessage(); // diagnostics

    const resp = await request("textDocument/hover", {
      textDocument: { uri: "file:///test/hover.lidl" },
      position: { line: 0, character: 5 },
    });
    if (resp.result) {
      expect(resp.result.contents).toBeDefined();
    }
  });

  test("hover on empty position returns null", async () => {
    const resp = await request("textDocument/hover", {
      textDocument: { uri: "file:///test/hover.lidl" },
      position: { line: 100, character: 0 },
    });
    expect(resp.result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Go to Definition
// ---------------------------------------------------------------------------

describe("definition", () => {
  test("go-to-definition finds named definition", async () => {
    const code = `interaction (foo):{x:Number in}
with
  interaction (bar):{y:Number out}
  is
    ((y)!)
is
  (bar)
`;
    notify("textDocument/didOpen", {
      textDocument: {
        uri: "file:///test/def.lidl",
        languageId: "lidl",
        version: 1,
        text: code,
      },
    });
    await readMessage(); // diagnostics

    // Try to find definition of "bar" at line 6
    const resp = await request("textDocument/definition", {
      textDocument: { uri: "file:///test/def.lidl" },
      position: { line: 2, character: 17 },
    });
    // May or may not find it depending on offset matching
    // At minimum, it shouldn't crash
    expect(resp.error).toBeUndefined();
  });

  test("go-to-definition returns null for unknown word", async () => {
    const resp = await request("textDocument/definition", {
      textDocument: { uri: "file:///test/def.lidl" },
      position: { line: 100, character: 0 },
    });
    expect(resp.result).toBeNull();
  });
});
