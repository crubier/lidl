import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  Diagnostic,
  DiagnosticSeverity,
  CompletionItem,
  CompletionItemKind,
  Hover,
  SymbolInformation,
  SymbolKind,
  DocumentFormattingParams,
  TextEdit,
  Range,
  Position,
  Location,
} from "vscode-languageserver/node";

import { TextDocument } from "vscode-languageserver-textdocument";
import { parser, format, examples, graphCompiler } from "lidl-core";

const graphCompilerCompile = graphCompiler.compile;

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const KEYWORDS = [
  "interaction",
  "interface",
  "data",
  "is",
  "with",
  "in",
  "out",
  "ref",
];

const INTERFACE_OPERATORS = [
  "conjugation",
  "globalisation",
  "localisation",
  "reception",
  "emission",
  "union",
  "intersection",
  "complement",
];

const DATA_OPERATORS = ["union", "intersection", "complement"];

connection.onInitialize((_params: InitializeParams): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Full,
      completionProvider: {
        triggerCharacters: ["(", "{", ":", " "],
      },
      hoverProvider: true,
      documentSymbolProvider: true,
      documentFormattingProvider: true,
      definitionProvider: true,
    },
  };
});

// --- Diagnostics ---

interface ParsedDoc {
  ast: any[] | null;
  errors: Diagnostic[];
}

const parsedCache = new Map<string, ParsedDoc>();

function validateDocument(doc: TextDocument): void {
  const text = doc.getText();
  const diagnostics: Diagnostic[] = [];
  let ast: any[] | null = null;

  try {
    ast = parser.parse(text);
  } catch (e: any) {
    const loc = e.location;
    const startLine = loc?.start?.line ?? 0;
    const startCol = loc?.start?.column ?? 0;
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: {
        start: { line: Math.max(0, startLine - 1), character: startCol },
        end: { line: Math.max(0, startLine - 1), character: startCol + 1 },
      },
      message: e.message,
      source: "lidl",
    });
  }

  if (ast) {
    try {
      const compileErrors: string[] = [];
      graphCompilerCompile(ast[0], examples.header, {
        error: (_g: any, data: any) => {
          compileErrors.push(data?.error?.message || "Compilation error");
          return true;
        },
        getJsCode: () => true,
      });
      for (const msg of compileErrors) {
        diagnostics.push({
          severity: DiagnosticSeverity.Warning,
          range: {
            start: { line: 0, character: 0 },
            end: { line: 0, character: 1 },
          },
          message: msg,
          source: "lidl",
        });
      }
    } catch (e: any) {
      diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 1 },
        },
        message: `Compilation: ${e.message}`,
        source: "lidl",
      });
    }
  }

  parsedCache.set(doc.uri, { ast, errors: diagnostics });
  connection.sendDiagnostics({ uri: doc.uri, diagnostics });
}

documents.onDidChangeContent((change) => {
  validateDocument(change.document);
});

// --- Completions ---

connection.onCompletion((_params): CompletionItem[] => {
  const doc = documents.get(_params.textDocument.uri);
  if (!doc) return [];

  const cached = parsedCache.get(_params.textDocument.uri);
  const items: CompletionItem[] = [];

  for (const kw of KEYWORDS) {
    items.push({
      label: kw,
      kind: CompletionItemKind.Keyword,
    });
  }

  for (const op of INTERFACE_OPERATORS) {
    items.push({
      label: op,
      kind: CompletionItemKind.Function,
      detail: "Interface operator",
    });
  }

  for (const op of DATA_OPERATORS) {
    items.push({
      label: op,
      kind: CompletionItemKind.Function,
      detail: "Data operator",
    });
  }

  if (cached?.ast) {
    for (const def of cached.ast) {
      if (def.type === "InteractionDefinition" && def.signature) {
        items.push({
          label: def.signature.operator,
          kind: CompletionItemKind.Function,
          detail: "Interaction",
        });
      } else if (def.type === "InterfaceDefinition" && def.signature) {
        items.push({
          label: def.signature,
          kind: CompletionItemKind.Interface,
          detail: "Interface",
        });
      } else if (def.type === "DataDefinition" && def.signature) {
        items.push({
          label: def.signature,
          kind: CompletionItemKind.Struct,
          detail: "Data type",
        });
      }
    }
  }

  return items;
});

// --- Hover ---

connection.onHover((params): Hover | null => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;

  const cached = parsedCache.get(params.textDocument.uri);
  if (!cached?.ast) return null;

  const offset = doc.offsetAt(params.position);
  const found = findNodeAtOffset(cached.ast, offset);
  if (!found) return null;

  let content = "";
  switch (found.type) {
    case "InteractionDefinition":
      content = `**interaction** \`${found.signature?.operator || "?"}\``;
      if (found.signature?.interfac) {
        content += `\n\nInterface: \`${describeInterface(found.signature.interfac)}\``;
      }
      break;
    case "InterfaceDefinition":
      content = `**interface** \`${found.signature || "?"}\``;
      break;
    case "DataDefinition":
      content = `**data** \`${found.signature || "?"}\``;
      break;
    case "InterfaceAtomic":
      content = `\`${describeData(found.data)} ${found.direction}\``;
      break;
    case "InterfaceNamed":
      content = `**interface** \`${found.name}\``;
      break;
    case "DataAtomic":
      content = `**data** \`${found.name}\``;
      break;
    default:
      return null;
  }

  return { contents: { kind: "markdown", value: content } };
});

// --- Document Symbols ---

connection.onDocumentSymbol((params): SymbolInformation[] => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];

  const cached = parsedCache.get(params.textDocument.uri);
  if (!cached?.ast) return [];

  const symbols: SymbolInformation[] = [];

  function collectSymbols(defs: any[], uri: string) {
    for (const def of defs) {
      const meta = def.meta?.location;
      if (!meta) continue;

      const startPos = doc!.positionAt(meta.start.offset);
      const endPos = doc!.positionAt(meta.end.offset);
      const range = Range.create(startPos, endPos);

      if (def.type === "InteractionDefinition") {
        symbols.push({
          name: `interaction (${def.signature?.operator || "?"})`,
          kind: SymbolKind.Function,
          location: Location.create(uri, range),
        });
        if (def.definitions) collectSymbols(def.definitions, uri);
      } else if (def.type === "InterfaceDefinition") {
        symbols.push({
          name: `interface ${def.signature || "?"}`,
          kind: SymbolKind.Interface,
          location: Location.create(uri, range),
        });
      } else if (def.type === "DataDefinition") {
        symbols.push({
          name: `data ${def.signature || "?"}`,
          kind: SymbolKind.Struct,
          location: Location.create(uri, range),
        });
      }
    }
  }

  collectSymbols(cached.ast, params.textDocument.uri);
  return symbols;
});

// --- Formatting ---

connection.onDocumentFormatting(
  (params: DocumentFormattingParams): TextEdit[] | null => {
    const doc = documents.get(params.textDocument.uri);
    if (!doc) return null;

    try {
      const formatted = format(doc.getText());
      const lastLine = doc.lineCount - 1;
      const lastChar = doc.getText().length;
      return [
        TextEdit.replace(
          Range.create(
            Position.create(0, 0),
            doc.positionAt(lastChar),
          ),
          formatted,
        ),
      ];
    } catch {
      return null;
    }
  },
);

// --- Go to Definition ---

connection.onDefinition((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;

  const cached = parsedCache.get(params.textDocument.uri);
  if (!cached?.ast) return null;

  const offset = doc.offsetAt(params.position);
  const word = getWordAtOffset(doc.getText(), offset);
  if (!word) return null;

  const def = findDefinition(cached.ast, word);
  if (!def?.meta?.location) return null;

  const meta = def.meta.location;
  const startPos = doc.positionAt(meta.start.offset);
  const endPos = doc.positionAt(meta.end.offset);
  return Location.create(
    params.textDocument.uri,
    Range.create(startPos, endPos),
  );
});

// --- Helpers ---

function findNodeAtOffset(defs: any[], offset: number): any | null {
  for (const def of defs) {
    const meta = def.meta?.location;
    if (meta && offset >= meta.start.offset && offset <= meta.end.offset) {
      if (def.definitions) {
        const inner = findNodeAtOffset(def.definitions, offset);
        if (inner) return inner;
      }
      return def;
    }
  }
  return null;
}

function findDefinition(defs: any[], name: string): any | null {
  for (const def of defs) {
    if (def.type === "InteractionDefinition" && def.signature?.operator === name) {
      return def;
    }
    if (def.type === "InterfaceDefinition" && def.signature === name) {
      return def;
    }
    if (def.type === "DataDefinition" && def.signature === name) {
      return def;
    }
    if (def.definitions) {
      const found = findDefinition(def.definitions, name);
      if (found) return found;
    }
  }
  return null;
}

function getWordAtOffset(text: string, offset: number): string | null {
  let start = offset;
  let end = offset;
  while (start > 0 && /\w/.test(text[start - 1])) start--;
  while (end < text.length && /\w/.test(text[end])) end++;
  const word = text.slice(start, end);
  return word.length > 0 ? word : null;
}

function describeInterface(iface: any): string {
  if (!iface) return "?";
  switch (iface.type) {
    case "InterfaceAtomic":
      return `${describeData(iface.data)} ${iface.direction}`;
    case "InterfaceComposite":
      return (
        "{" +
        (iface.element || [])
          .map((e: any) => `${e.key}: ${describeInterface(e.value)}`)
          .join(", ") +
        "}"
      );
    case "InterfaceNamed":
      return iface.name;
    case "InterfaceOperation":
      return `${iface.operator}(${(iface.operand || []).map(describeInterface).join(", ")})`;
    default:
      return "?";
  }
}

function describeData(data: any): string {
  if (!data) return "?";
  switch (data.type) {
    case "DataAtomic":
      return data.name;
    case "DataComposite":
      return (
        "{" +
        (data.element || [])
          .map((e: any) => `${e.key}: ${describeData(e.value)}`)
          .join(", ") +
        "}"
      );
    case "DataFunction":
      return `{${describeData(data.domain)} -> ${describeData(data.codomain)}}`;
    case "DataArray":
      return `[${describeData(data.element)}]`;
    default:
      return "?";
  }
}

documents.listen(connection);
connection.listen();
