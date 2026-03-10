import * as ohm from "ohm-js";

const grammar = ohm.grammar(String.raw`LIDLOperator {
  Start = Composition
        | Behaviour
        | Affectation
        | Previous
        | Identifier
        | Reference
        | CoReference
        | FunctionApplication
        | Function
        | Activation
        | Boolean
        | Number
        | Text
        | Custom
        | Void

  Composition = "{" CompositionEntry* "}"
  CompositionEntry = keyIdentifier ":" "$" ","?

  Behaviour = "$" "with" "behaviour" "$"

  Affectation = "$" "=" "$"

  Previous = "get" "$" "from" "previous" "and" "set" "$" "for" "next"  -- long
           | "$" "=" "previous" "$"                                     -- assign
           | "next" "$" "=" "$"                                         -- next

  Identifier = "variable" opIdent? ("$" opIdent?)*  -- variable
             | "#" opIdent? ("$" opIdent?)*          -- hash

  Reference = "$" "!"

  CoReference = "$" "?"

  FunctionApplication = "apply" "$" "to" "$" "and" "get" "$"  -- long
                       | "$" "$" "=" "$"                        -- short

  Function = "function" functionIdentifier

  Activation = "active"    -- active
             | "inactive"  -- inactive

  Boolean = "true"   -- true
          | "false"  -- false

  Number = "-"? digit+ ("." digit+)?

  Text = "\"" (~"\"" any)* "\""

  Custom = customChars

  Void = end

  customChars = (~space ~"_" ~"(" ~")" any)+
  opIdent = (~space ~"$" ~"(" ~")" any)+
  keyIdentifier = (lower | digit) alnum*
  functionIdentifier = (letter | "_") (alnum | "_")*
}`);

const semantics = grammar.createSemantics();

semantics.addOperation<string>("classify", {
  Start(alt) {
    return alt.classify();
  },
  Composition(_open, _entries, _close) {
    return "Composition";
  },
  CompositionEntry(_key, _colon, _dollar, _comma) {
    return "Composition";
  },
  Behaviour(_d1, _with, _beh, _d2) {
    return "Behaviour";
  },
  Affectation(_d1, _eq, _d2) {
    return "Affectation";
  },
  Previous_long(_get, _d1, _from, _prev, _and, _set, _d2, _for, _next) {
    return "Previous";
  },
  Previous_assign(_d1, _eq, _prev, _d2) {
    return "Previous";
  },
  Previous_next(_next, _d1, _eq, _d2) {
    return "Previous";
  },
  Identifier_variable(_var, _name, _dollars, _dollarNames) {
    return "Identifier";
  },
  Identifier_hash(_hash, _name, _dollars, _dollarNames) {
    return "Identifier";
  },
  Reference(_d, _bang) {
    return "Reference";
  },
  CoReference(_d, _q) {
    return "CoReference";
  },
  FunctionApplication_long(_apply, _d1, _to, _d2, _and, _get, _d3) {
    return "FunctionApplication";
  },
  FunctionApplication_short(_d1, _d2, _eq, _d3) {
    return "FunctionApplication";
  },
  Function(_kw, _name) {
    return "Function";
  },
  Activation_active(_) {
    return "Activation";
  },
  Activation_inactive(_) {
    return "Activation";
  },
  Boolean_true(_) {
    return "Boolean";
  },
  Boolean_false(_) {
    return "Boolean";
  },
  Number(_neg, _int, _dot, _frac) {
    return "Number";
  },
  Text(_open, _content, _close) {
    return "Text";
  },
  Custom(_chars) {
    return "Custom";
  },
  Void(_end) {
    return "Void";
  },
  customChars(_) {
    return this.sourceString;
  },
  opIdent(_) {
    return this.sourceString;
  },
  keyIdentifier(_first, _rest) {
    return this.sourceString;
  },
  functionIdentifier(_first, _rest) {
    return this.sourceString;
  },
  _terminal() {
    return this.sourceString;
  },
  _iter(...children) {
    return children.map((c: ohm.Node) => c.classify());
  },
});

const operator = {
  parse(input: string) {
    const match = grammar.match(input);
    if (match.failed()) {
      return "Custom";
    }
    return semantics(match).classify();
  },
  SyntaxError: SyntaxError,
};

export default operator;
