import * as ohm from "ohm-js";

export const grammar = ohm.grammar(String.raw`LIDL {
  Start = Content*

  Content = InteractionDefinition
          | InterfaceDefinition
          | DataDefinition

  InteractionDefinition = "interaction" InteractionSignature WithClause? "is" Interaction

  WithClause = "with" Content*

  InteractionSignature = "(" InteractionSignatureElement* ")" ":" Interface

  InteractionSignatureElement = sigOperatorChars            -- operator
                              | "(" variableIdentifier ":" Interface ")"  -- operand

  sigOperatorChars = (~"(" ~")" any)+

  Interaction = "(" InteractionElement* ")"

  InteractionElement = Interaction            -- operand
                     | interactionOperatorChars  -- operator

  interactionOperatorChars = (~"(" ~")" any)+

  InterfaceDefinition = "interface" interfaceIdentifier WithClause? "is" Interface

  Interface = InterfaceAtomic
            | InterfaceComposite
            | InterfaceOperation
            | InterfaceNamed

  InterfaceAtomic = Data direction

  InterfaceComposite = "{" NonemptyListOf<InterfaceCompositeElement, ","> "}"

  InterfaceCompositeElement = keyIdentifier ":" Interface

  InterfaceOperation = interfaceOperator "(" NonemptyListOf<Interface, ","> ")"

  interfaceOperator = "conjugation" | "globalisation" | "localisation"
                    | "reception" | "emission" | "union"
                    | "intersection" | "complement"

  InterfaceNamed = interfaceIdentifier

  direction = "out" | "in" | "ref"

  DataDefinition = "data" dataIdentifier WithClause? "is" Data

  Data = DataComposite
       | DataArray
       | DataFunction
       | DataOperation
       | DataAtomic

  DataAtomic = dataIdentifier

  DataComposite = "{" NonemptyListOf<DataCompositeElement, ","> "}"

  DataCompositeElement = keyIdentifier ":" Data

  DataArray = "[" Data "]"

  DataFunction = "{" Data arrow Data "}"

  DataOperation = dataOperator "(" NonemptyListOf<Data, ","> ")"

  arrow = "→" | "->"

  dataOperator = "union" | "intersection" | "complement"

  interfaceIdentifier = upper alnum*
  dataIdentifier = upper alnum*
  variableIdentifier = lower alnum*
  keyIdentifier = (lower | digit) alnum*
}`);

function mergeExpression(elements: any[]) {
  const res = { operator: "", operand: [] as any[] };
  for (const el of elements) {
    if (el.operand !== undefined && el.operand !== null) {
      res.operand.push(el.operand);
      res.operator += "$";
    }
    if (el.operator !== undefined && el.operator !== null) {
      res.operator += el.operator;
    }
  }
  return res;
}

function mergeSignature(elements: any[]) {
  const res = { operator: "", operand: [] as any[] };
  for (const el of elements) {
    if (el.operand !== undefined && el.operand !== null) {
      res.operand.push(el.operand);
      res.operator += "$";
    }
    if (el.operator !== undefined && el.operator !== null) {
      res.operator += el.operator;
    }
  }
  return res;
}

let parseOptions: any = {};

function makeMeta(node: ohm.Node) {
  const lc = node.source.getLineAndColumn();
  return {
    location: {
      source: undefined,
      start: { offset: node.source.startIdx, line: lc.lineNum, column: lc.colNum },
      end: { offset: node.source.endIdx, line: 0, column: 0 },
    },
    options: parseOptions,
  };
}

const semantics = grammar.createSemantics();

semantics.addOperation<any>("toAST", {
  Start(contents) {
    return contents.children.map((c: ohm.Node) => c.toAST());
  },

  Content(alt) {
    return alt.toAST();
  },

  InteractionDefinition(_kw, sig, withClause, _is, interaction) {
    const defs =
      withClause.children.length > 0 ? withClause.children[0].toAST() : [];
    const res: any = {
      type: "InteractionDefinition",
      interaction: interaction.toAST(),
      signature: sig.toAST(),
      definitions: defs,
      meta: makeMeta(this),
    };
    for (const def of res.definitions) {
      def.parent = res;
    }
    return res;
  },

  WithClause(_with, contents) {
    return contents.children.map((c: ohm.Node) => c.toAST());
  },

  InteractionSignature(_open, elements, _close, _colon, iface) {
    const elems = elements.children.map((c: ohm.Node) => c.toAST());
    const temp = mergeSignature(elems);
    return {
      type: "InteractionSignature",
      interfac: iface.toAST(),
      formating: temp.operator,
      operator: temp.operator.replace(/[ \t\r\n]*/g, ""),
      operand: temp.operand,
      meta: makeMeta(this),
    };
  },

  InteractionSignatureElement_operator(chars) {
    return { operator: chars.sourceString };
  },

  InteractionSignatureElement_operand(_open, name, _colon, iface, _close) {
    return {
      operand: {
        type: "InteractionSignatureOperandElement",
        interfac: iface.toAST(),
        name: name.toAST(),
        meta: makeMeta(this),
      },
    };
  },

  sigOperatorChars(_chars) {
    return this.sourceString;
  },

  Interaction(_open, elements, _close) {
    const elems = elements.children.map((c: ohm.Node) => c.toAST());
    const temp = mergeExpression(elems);
    return {
      type: "InteractionSimple",
      formating: temp.operator,
      operator: temp.operator.replace(/[ \t\r\n]*/g, ""),
      operand: temp.operand,
      meta: makeMeta(this),
    };
  },

  InteractionElement_operand(interaction) {
    return { operand: interaction.toAST() };
  },

  InteractionElement_operator(chars) {
    return { operator: chars.sourceString };
  },

  interactionOperatorChars(_chars) {
    return this.sourceString;
  },

  InterfaceDefinition(_kw, signature, withClause, _is, iface) {
    const defs =
      withClause.children.length > 0 ? withClause.children[0].toAST() : [];
    return {
      type: "InterfaceDefinition",
      interfac: iface.toAST(),
      signature: signature.toAST(),
      definitions: defs,
      meta: makeMeta(this),
    };
  },

  Interface(alt) {
    return alt.toAST();
  },

  InterfaceAtomic(data, dir) {
    return {
      type: "InterfaceAtomic",
      data: data.toAST(),
      direction: dir.toAST(),
      meta: makeMeta(this),
    };
  },

  InterfaceComposite(_open, list, _close) {
    return {
      type: "InterfaceComposite",
      element: list.asIteration().children.map((c: ohm.Node) => c.toAST()),
      meta: makeMeta(this),
    };
  },

  InterfaceCompositeElement(key, _colon, value) {
    return {
      type: "InterfaceCompositeElement",
      key: key.toAST(),
      value: value.toAST(),
      meta: makeMeta(this),
    };
  },

  InterfaceOperation(op, _open, list, _close) {
    return {
      type: "InterfaceOperation",
      operator: op.toAST(),
      operand: list.asIteration().children.map((c: ohm.Node) => c.toAST()),
      meta: makeMeta(this),
    };
  },

  interfaceOperator(_) {
    return this.sourceString;
  },

  InterfaceNamed(name) {
    return {
      type: "InterfaceNamed",
      name: name.toAST(),
      meta: makeMeta(this),
    };
  },

  direction(_) {
    return this.sourceString;
  },

  DataDefinition(_kw, signature, withClause, _is, data) {
    const defs =
      withClause.children.length > 0 ? withClause.children[0].toAST() : [];
    return {
      type: "DataDefinition",
      data: data.toAST(),
      signature: signature.toAST(),
      definitions: defs,
      meta: makeMeta(this),
    };
  },

  Data(alt) {
    return alt.toAST();
  },

  DataAtomic(name) {
    return {
      type: "DataAtomic",
      name: name.toAST(),
      meta: makeMeta(this),
    };
  },

  DataComposite(_open, list, _close) {
    return {
      type: "DataComposite",
      element: list.asIteration().children.map((c: ohm.Node) => c.toAST()),
      meta: makeMeta(this),
    };
  },

  DataCompositeElement(key, _colon, value) {
    return {
      type: "DataCompositeElement",
      key: key.toAST(),
      value: value.toAST(),
      meta: makeMeta(this),
    };
  },

  DataArray(_open, data, _close) {
    return {
      type: "DataArray",
      element: data.toAST(),
      meta: makeMeta(this),
    };
  },

  DataFunction(_open, domain, _arrow, codomain, _close) {
    return {
      type: "DataFunction",
      domain: domain.toAST(),
      codomain: codomain.toAST(),
      meta: makeMeta(this),
    };
  },

  DataOperation(op, _open, list, _close) {
    return {
      type: "DataOperation",
      operator: op.toAST(),
      operand: list.asIteration().children.map((c: ohm.Node) => c.toAST()),
      meta: makeMeta(this),
    };
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
    return [first.toAST(), ...rest.children.map((c: ohm.Node) => c.toAST())];
  },

  EmptyListOf() {
    return [];
  },

  _terminal() {
    return this.sourceString;
  },

  _iter(...children) {
    return children.map((c: ohm.Node) => c.toAST());
  },
});

const ruleNameMap: Record<string, string> = {
  start: "Start",
  interaction: "Interaction",
  interactionDefinition: "InteractionDefinition",
  interfac: "Interface",
  data: "Data",
};

class LIDLSyntaxError extends SyntaxError {
  expected: unknown;
  found: string | null;
  location: unknown;

  constructor(message: string, expected: unknown, found: string | null, location: unknown) {
    super(message);
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.location = location;
  }
}

const parser = {
  parse(input: string, options?: { startRule?: string; [key: string]: any }) {
    parseOptions = options || {};
    const startRule =
      ruleNameMap[parseOptions.startRule || "start"] || "Start";
    const match = grammar.match(input, startRule);
    if (match.failed()) {
      const failedMatch = match as ohm.FailedMatchResult;
      const pos = failedMatch.getRightmostFailurePosition();
      throw new LIDLSyntaxError(
        failedMatch.message || "Parse error",
        failedMatch.getExpectedText(),
        input[pos] ?? null,
        { start: { offset: pos, line: 0, column: 0 }, end: { offset: pos, line: 0, column: 0 } },
      );
    }
    return semantics(match).toAST();
  },
  SyntaxError: LIDLSyntaxError,
};

export default parser;
