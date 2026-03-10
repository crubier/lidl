import type { Node } from "ohm-js";
import { grammar } from "./parser";

export interface SemanticToken {
  start: number;
  end: number;
  type: string;
}

export const TOKEN_TYPES = [
  "keyword",
  "type",
  "variable",
  "property",
  "parameter",
  "string",
  "number",
  "operator",
  "direction",
  "structKeyword",
] as const;

export type TokenType = (typeof TOKEN_TYPES)[number];

function tok(node: Node, type: TokenType): SemanticToken {
  return { start: node.source.startIdx, end: node.source.endIdx, type };
}

const OPERATOR_KEYWORDS = new Set([
  "function",
  "variable",
  "behaviour",
  "previous",
  "next",
  "active",
  "inactive",
  "apply",
]);

const OPERATOR_CONSTANTS = new Set(["true", "false"]);

function subTokenizeOperatorText(
  baseOffset: number,
  text: string,
): SemanticToken[] {
  const tokens: SemanticToken[] = [];
  const re =
    /([A-Z][a-zA-Z0-9]*)|([a-z][a-zA-Z0-9]*)|(-?\d+(?:\.\d+)?)|("(?:[^"\\]|\\.)*")|([!?=]|#|→|->)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const start = baseOffset + m.index;
    const end = start + m[0].length;
    if (m[1]) {
      tokens.push({ start, end, type: "type" });
    } else if (m[2]) {
      if (OPERATOR_KEYWORDS.has(m[2]))
        tokens.push({ start, end, type: "keyword" });
      else if (OPERATOR_CONSTANTS.has(m[2]))
        tokens.push({ start, end, type: "number" });
    } else if (m[3]) {
      tokens.push({ start, end, type: "number" });
    } else if (m[4]) {
      tokens.push({ start, end, type: "string" });
    } else if (m[5]) {
      tokens.push({ start, end, type: "operator" });
    }
  }
  return tokens;
}

const tokenSemantics = grammar.createSemantics();

tokenSemantics.addOperation<SemanticToken[]>("tokenize", {
  _nonterminal(...children: Node[]) {
    return children.flatMap((c: Node) => c.tokenize());
  },
  _terminal() {
    return [];
  },
  _iter(...children: Node[]) {
    return children.flatMap((c: Node) => c.tokenize());
  },

  InteractionDefinition(
    _kw: Node,
    sig: Node,
    withClause: Node,
    _is: Node,
    interaction: Node,
  ) {
    return [
      tok(_kw, "structKeyword"),
      ...sig.tokenize(),
      ...withClause.children.flatMap((c: Node) => c.tokenize()),
      tok(_is, "structKeyword"),
      ...interaction.tokenize(),
    ];
  },

  WithClause(_with: Node, contents: Node) {
    return [
      tok(_with, "structKeyword"),
      ...contents.children.flatMap((c: Node) => c.tokenize()),
    ];
  },

  InteractionSignatureElement_operand(
    _open: Node,
    name: Node,
    _colon: Node,
    iface: Node,
    _close: Node,
  ) {
    return [tok(name, "parameter"), ...iface.tokenize()];
  },

  InterfaceDefinition(
    _kw: Node,
    name: Node,
    withClause: Node,
    _is: Node,
    iface: Node,
  ) {
    return [
      tok(_kw, "structKeyword"),
      tok(name, "type"),
      ...withClause.children.flatMap((c: Node) => c.tokenize()),
      tok(_is, "structKeyword"),
      ...iface.tokenize(),
    ];
  },

  InterfaceCompositeElement(key: Node, _colon: Node, value: Node) {
    return [tok(key, "property"), ...value.tokenize()];
  },

  InterfaceNamed(name: Node) {
    return [tok(name, "type")];
  },

  direction(_: Node) {
    return [tok(this as unknown as Node, "direction")];
  },

  interfaceOperator(_: Node) {
    return [tok(this as unknown as Node, "keyword")];
  },

  DataDefinition(
    _kw: Node,
    name: Node,
    withClause: Node,
    _is: Node,
    data: Node,
  ) {
    return [
      tok(_kw, "structKeyword"),
      tok(name, "type"),
      ...withClause.children.flatMap((c: Node) => c.tokenize()),
      tok(_is, "structKeyword"),
      ...data.tokenize(),
    ];
  },

  DataAtomic(name: Node) {
    return [tok(name, "type")];
  },

  DataCompositeElement(key: Node, _colon: Node, value: Node) {
    return [tok(key, "property"), ...value.tokenize()];
  },

  DataFunction(
    _open: Node,
    domain: Node,
    _arrow: Node,
    codomain: Node,
    _close: Node,
  ) {
    return [
      ...domain.tokenize(),
      tok(_arrow, "operator"),
      ...codomain.tokenize(),
    ];
  },

  DataOperation(op: Node, _open: Node, list: Node, _close: Node) {
    return [tok(op, "keyword"), ...list.tokenize()];
  },

  dataOperator(_: Node) {
    return [tok(this as unknown as Node, "keyword")];
  },

  arrow(_: Node) {
    return [tok(this as unknown as Node, "operator")];
  },

  InteractionElement_operator(chars: Node) {
    return subTokenizeOperatorText(
      chars.source.startIdx,
      chars.sourceString,
    );
  },

  interfaceIdentifier(_first: Node, _rest: Node) {
    return [tok(this as unknown as Node, "type")];
  },

  dataIdentifier(_first: Node, _rest: Node) {
    return [tok(this as unknown as Node, "type")];
  },

  keyIdentifier(_first: Node, _rest: Node) {
    return [tok(this as unknown as Node, "property")];
  },
});

export function tokenize(source: string): SemanticToken[] {
  const match = grammar.match(source);
  if (match.failed()) return [];
  try {
    return tokenSemantics(match).tokenize();
  } catch {
    return [];
  }
}
