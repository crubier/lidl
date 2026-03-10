import type { Monaco } from "@monaco-editor/react";

let registered = false;

export function registerLidlLanguage(monaco: Monaco) {
  if (registered) return;
  registered = true;

  monaco.languages.register({ id: "lidl" });

  monaco.languages.setMonarchTokensProvider("lidl", {
    keywords: ["interaction", "interface", "data", "is", "with"],

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
      "to",
      "and",
      "get",
      "from",
      "previous",
      "next",
      "set",
      "for",
      "behaviour",
      "active",
      "inactive",
    ],

    booleans: ["true", "false"],

    tokenizer: {
      root: [
        // Strings
        [/"/, "string", "@string"],

        // Numbers
        [/-?\d+(\.\d+)?/, "number"],

        // Arrow operator
        [/→|->/, "operator"],

        // Special single-char operators
        [/[!?=]/, "operator"],
        [/#/, "operator"],

        // Delimiters
        [/[:,]/, "delimiter"],

        // Brackets
        [/[{}()\[\]]/, "@brackets"],

        // Identifiers (uppercase start = type, lowercase start = variable/keyword)
        [
          /[A-Z][a-zA-Z0-9]*/,
          "type.identifier",
        ],
        [
          /[a-z][a-zA-Z0-9]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@directions": "keyword.direction",
              "@interfaceOperators": "keyword.operator",
              "@interactionKeywords": "keyword.flow",
              "@booleans": "constant.language",
              "@default": "variable",
            },
          },
        ],

        // Whitespace
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
}
