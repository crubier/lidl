import { grammar } from "./parser";

const INDENT = "  ";

function indent(depth: number): string {
  return INDENT.repeat(depth);
}

const formatSemantics = grammar.createSemantics();

formatSemantics.addOperation<any>("fmt(depth)", {
  Start(contents) {
    return contents.children
      .map((c: any) => c.fmt(0))
      .join("\n\n") + "\n";
  },

  Content(alt) {
    return alt.fmt(this.args.depth);
  },

  InteractionDefinition(_kw, sig, withClause, _is, interaction) {
    const depth = this.args.depth as number;
    const base = indent(depth);
    const sigStr = sig.fmt(depth);
    const withStr =
      withClause.children.length > 0
        ? "\n" + withClause.children[0].fmt(depth)
        : "";
    const interStr = interaction.fmt(depth + 1);
    return `${base}interaction ${sigStr}${withStr}\n${base}is\n${indent(depth + 1)}${interStr}`;
  },

  WithClause(_with, contents) {
    const depth = this.args.depth as number;
    const base = indent(depth);
    const defs = contents.children
      .map((c: any) => c.fmt(depth + 1))
      .join("\n");
    return `${base}with\n${defs}`;
  },

  InteractionSignature(_open, elements, _close, _colon, iface) {
    const depth = this.args.depth as number;
    const parts = elements.children.map((c: any) => c.fmt(depth));
    return `(${parts.join("")}):${iface.fmt(depth)}`;
  },

  InteractionSignatureElement_operator(chars) {
    return chars.sourceString.replace(/\s+/g, " ").trim();
  },

  InteractionSignatureElement_operand(_open, name, _colon, iface, _close) {
    const depth = this.args.depth as number;
    return `(${name.sourceString}:${iface.fmt(depth)})`;
  },

  sigOperatorChars(_chars) {
    return this.sourceString;
  },

  Interaction(_open, elements, _close) {
    const depth = this.args.depth as number;
    const elems: { type: string; text: string }[] = elements.children.map(
      (c: any) => c.fmt(depth),
    );

    const normalized = elems.map((e) =>
      e.type === "operator"
        ? { ...e, text: e.text.replace(/\s+/g, " ").trim() }
        : e,
    );

    const singleLine = `(${normalized.map((e) => e.text).join("")})`;
    if (singleLine.length <= 80) {
      return singleLine;
    }

    const base = indent(depth);
    const inner = indent(depth + 1);
    const lines: string[] = [];
    for (const e of normalized) {
      if (e.type === "operator") {
        lines.push(`${inner}${e.text}`);
      } else {
        lines.push(`${inner}${e.text}`);
      }
    }
    return `(\n${lines.join("\n")}\n${base})`;
  },

  InteractionElement_operand(interaction) {
    return { type: "operand", text: interaction.fmt(this.args.depth) };
  },

  InteractionElement_operator(chars) {
    return { type: "operator", text: chars.sourceString };
  },

  interactionOperatorChars(_chars) {
    return this.sourceString;
  },

  InterfaceDefinition(_kw, name, withClause, _is, iface) {
    const depth = this.args.depth as number;
    const base = indent(depth);
    const withStr =
      withClause.children.length > 0
        ? "\n" + withClause.children[0].fmt(depth)
        : "";
    return `${base}interface ${name.sourceString}${withStr}\n${base}is\n${indent(depth + 1)}${iface.fmt(depth + 1)}`;
  },

  Interface(alt) {
    return alt.fmt(this.args.depth);
  },

  InterfaceAtomic(data, dir) {
    return `${data.fmt(this.args.depth)} ${dir.sourceString}`;
  },

  InterfaceComposite(_open, list, _close) {
    const depth = this.args.depth as number;
    const items = list
      .asIteration()
      .children.map((c: any) => c.fmt(depth));
    const singleLine = `{${items.join(", ")}}`;
    if (singleLine.length <= 80) {
      return singleLine;
    }
    const base = indent(depth);
    const parts = items.map((e: string) => `${indent(depth + 1)}${e}`);
    return `{\n${parts.join(",\n")}\n${base}}`;
  },

  InterfaceCompositeElement(key, _colon, value) {
    return `${key.sourceString}:${value.fmt(this.args.depth)}`;
  },

  InterfaceOperation(op, _open, list, _close) {
    const depth = this.args.depth as number;
    const items = list
      .asIteration()
      .children.map((c: any) => c.fmt(depth));
    return `${op.sourceString}(${items.join(", ")})`;
  },

  interfaceOperator(_) {
    return this.sourceString;
  },

  InterfaceNamed(name) {
    return name.sourceString;
  },

  direction(_) {
    return this.sourceString;
  },

  DataDefinition(_kw, name, withClause, _is, data) {
    const depth = this.args.depth as number;
    const base = indent(depth);
    const withStr =
      withClause.children.length > 0
        ? "\n" + withClause.children[0].fmt(depth)
        : "";
    return `${base}data ${name.sourceString}${withStr}\n${base}is\n${indent(depth + 1)}${data.fmt(depth + 1)}`;
  },

  Data(alt) {
    return alt.fmt(this.args.depth);
  },

  DataAtomic(name) {
    return name.sourceString;
  },

  DataComposite(_open, list, _close) {
    const depth = this.args.depth as number;
    const items = list
      .asIteration()
      .children.map((c: any) => c.fmt(depth));
    const singleLine = `{${items.join(", ")}}`;
    if (singleLine.length <= 80) {
      return singleLine;
    }
    const base = indent(depth);
    const parts = items.map((e: string) => `${indent(depth + 1)}${e}`);
    return `{\n${parts.join(",\n")}\n${base}}`;
  },

  DataCompositeElement(key, _colon, value) {
    return `${key.sourceString}:${value.fmt(this.args.depth)}`;
  },

  DataArray(_open, data, _close) {
    return `[${data.fmt(this.args.depth)}]`;
  },

  DataFunction(_open, domain, _arrow, codomain, _close) {
    return `{${domain.fmt(this.args.depth)} -> ${codomain.fmt(this.args.depth)}}`;
  },

  DataOperation(op, _open, list, _close) {
    const depth = this.args.depth as number;
    const items = list
      .asIteration()
      .children.map((c: any) => c.fmt(depth));
    return `${op.sourceString}(${items.join(", ")})`;
  },

  dataOperator(_) {
    return this.sourceString;
  },

  arrow(_) {
    return this.sourceString;
  },

  interfaceIdentifier(_first, _rest) {
    return this.sourceString;
  },

  dataIdentifier(_first, _rest) {
    return this.sourceString;
  },

  variableIdentifier(_first, _rest) {
    return this.sourceString;
  },

  keyIdentifier(_first, _rest) {
    return this.sourceString;
  },

  NonemptyListOf(first, _sep, rest) {
    return [
      first.fmt(this.args.depth),
      ...rest.children.map((c: any) => c.fmt(this.args.depth)),
    ];
  },

  EmptyListOf() {
    return [];
  },

  _terminal() {
    return this.sourceString;
  },

  _iter(...children) {
    return children.map((c: any) => c.fmt(this.args.depth));
  },
});

export function format(source: string): string {
  const match = grammar.match(source, "Start");
  if (match.failed()) {
    throw new Error(`Parse error: ${(match as any).message || "Invalid LIDL"}`);
  }
  return formatSemantics(match).fmt(0);
}
