import type { Monaco } from "@monaco-editor/react";
import { tokenize, TOKEN_TYPES } from "lidl-core";

let registered = false;

export function registerLidlLanguage(monaco: Monaco) {
  if (registered) return;
  registered = true;

  monaco.languages.register({ id: "lidl" });

  // Layer 1: Monarch tokenizer for instant, line-level coloring.
  // Intentionally conservative — ambiguous words like "to", "and", "get"
  // are NOT listed as keywords since they appear in user-defined operator
  // names. The semantic token layer (Layer 2) provides accurate overrides.
  monaco.languages.setMonarchTokensProvider("lidl", {
    structKeywords: [] as string[],

    directions: ["in", "out", "ref"],

    interfaceOperators: [
      "conjugation",
      "globalisation",
      "localisation",
      "reception",
      "emission",
      "union",
      "intersection",
      "complement",
    ],

    interactionKeywords: [
      "function",
      "variable",
      "apply",
      "behaviour",
      "previous",
      "next",
      "active",
      "inactive",
    ],

    booleans: ["true", "false"],

    tokenizer: {
      root: [
        [/"/, "string", "@string"],
        [/-?\d+(\.\d+)?/, "number"],
        [/→|->/, "operator"],
        [/[!?=]/, "operator"],
        [/#/, "operator"],
        [/[:,]/, "delimiter"],
        [/[{}()\[\]]/, "@brackets"],
        [
          /[A-Z][a-zA-Z0-9]*/,
          "type.identifier",
        ],
        [
          /[a-z][a-zA-Z0-9]*/,
          {
            cases: {
              "@structKeywords": "structKeyword",
              "@directions": "direction",
              "@interfaceOperators": "keyword",
              "@interactionKeywords": "keyword",
              "@booleans": "number",
              "@default": "variable",
            },
          },
        ],
        [/\s+/, "white"],
      ],

      string: [
        [/[^"]+/, "string"],
        [/"/, "string", "@pop"],
      ],
    },

    brackets: [
      { open: "(", close: ")", token: "delimiter.parenthesis" },
      { open: "{", close: "}", token: "delimiter.curly" },
      { open: "[", close: "]", token: "delimiter.square" },
    ],
  } as any);

  monaco.languages.setLanguageConfiguration("lidl", {
    brackets: [
      ["(", ")"],
      ["{", "}"],
      ["[", "]"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: '"', close: '"' },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: '"', close: '"' },
    ],
  });

  // Custom themes that extend the built-in ones with a distinct
  // "direction" token color for in/out/ref.
  monaco.editor.defineTheme("lidl-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "structKeyword", foreground: "7b2d8b", fontStyle: "bold" },
      { token: "direction", foreground: "d35400", fontStyle: "bold" },
    ],
    colors: {},
  });

  monaco.editor.defineTheme("lidl-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "structKeyword", foreground: "c586c0", fontStyle: "bold" },
      { token: "direction", foreground: "f0a500", fontStyle: "bold" },
    ],
    colors: {},
  });

  // Layer 2: Ohm-based semantic tokens for context-aware coloring.
  // Parses the full document with the LIDL grammar and walks the parse
  // tree, so it correctly distinguishes types vs variables vs properties
  // vs parameters, and only highlights direction keywords (in/out/ref)
  // inside interface declarations.
  const tokenTypesLegend = TOKEN_TYPES as unknown as string[];

  monaco.languages.registerDocumentSemanticTokensProvider("lidl", {
    getLegend() {
      return { tokenTypes: tokenTypesLegend, tokenModifiers: [] };
    },

    provideDocumentSemanticTokens(model: { getValue(): string; getPositionAt(offset: number): { lineNumber: number; column: number } }) {
      const tokens = tokenize(model.getValue());
      if (tokens.length === 0) return { data: new Uint32Array(0) };

      const data: number[] = [];
      let prevLine = 0;
      let prevChar = 0;

      for (const token of tokens) {
        const pos = model.getPositionAt(token.start);
        const line = pos.lineNumber - 1;
        const char = pos.column - 1;
        const length = token.end - token.start;
        const typeIdx = tokenTypesLegend.indexOf(token.type);
        if (typeIdx < 0 || length <= 0) continue;

        const deltaLine = line - prevLine;
        const deltaChar = deltaLine === 0 ? char - prevChar : char;

        data.push(deltaLine, deltaChar, length, typeIdx, 0);
        prevLine = line;
        prevChar = char;
      }

      return { data: new Uint32Array(data) };
    },

    releaseDocumentSemanticTokens() {},
  });
}
