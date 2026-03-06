# Operators

Operators are the textual patterns that give LIDL interactions their meaning. Every interaction expression has an **operator** (what it does) and zero or more **operands** (what it does it to).

## How Operators Work

An interaction expression is written as parenthesized text with nested sub-interactions:

```lidl
(apply (addOne) to ((x)!) and get ((y)?))
```

The compiler extracts the **operator string** by:

1. Taking all the literal text portions
2. Replacing each sub-interaction position with `$`
3. Stripping whitespace

For the example above, the operator string is `apply$to$andget$`.

The operands are the nested interactions, in order: `(addOne)`, `((x)!)`, `((y)?)`.

## Operator Classification

The compiler classifies each operator string to determine how the interaction should be compiled. Operators are checked against the following categories, in priority order:

| Priority | Category | Pattern | Example |
|----------|----------|---------|---------|
| 1 | Composition | `{key:$,...}` | `{x:$ y:$}` |
| 2 | Behaviour | `$withbehaviour$` | `(a) with behaviour (b)` |
| 3 | Previous | `$=previous$` or `next$=$` | `(y) = previous (x)` |
| 4 | Function Application | `apply$to$andget$` or `$$=$` | `apply (f) to (x) and get (y)` |
| 5 | Affectation | `$=$` | `(a) = (b)` |
| 6 | Reference | `$!` | `(x) !` |
| 7 | CoReference | `$?` | `(x) ?` |
| 8 | Identifier | `variable...` or `#...` | `variable x`, `# name` |
| 9 | Function | `function name` | `function addOne` |
| 10 | Activation | `active` or `inactive` | `active` |
| 11 | Boolean | `true` or `false` | `true` |
| 12 | Number | numeric pattern | `42`, `3.14` |
| 13 | Text | `"..."` | `"hello"` |
| 14 | Custom | any other non-whitespace | `myCustomOp` |
| 15 | Void | whitespace only | ` ` |

### Priority and Ambiguity

The order matters. For example, the operator string `$=$` could match both "Affectation" and "Previous" (`$=previous$`). Because Previous is checked first and requires the literal text `previous`, only the exact pattern `$=previous$` matches Previous -- `$=$` matches Affectation.

Similarly, `$$=$` matches Function Application (shorthand), not a combination of other operators.

## Base Operators vs Custom Operators

Operators fall into two categories:

### Base Operators

These are recognized by the compiler and have built-in compilation semantics. They correspond to the [base interactions](base-interactions.md). Any interaction whose operator matches a base pattern is compiled directly without needing a definition.

### Custom Operators

Any operator that doesn't match a base pattern is classified as **Custom**. Custom operators must have a corresponding interaction definition in scope -- the compiler will look up the definition and expand (inline) the custom interaction.

```lidl
-- This is a custom operator: "(a) + (b)"
-- Operator string: "$+$"
-- Must have a matching definition:
interaction
  ((a:Number in) + (b:Number in)):Number out
  ...
```

## Operator Matching

When the compiler encounters a custom interaction, it searches for a matching definition by comparing operator strings. Two interactions match if their normalized operator strings are identical.

The search follows scoping rules:

1. First, check the sub-definitions of the current definition
2. If not found, check the parent definition
3. Continue up the scope chain until found or an error is raised

## Natural Language Operators

One of LIDL's distinctive features is that operators can be arbitrary text, enabling natural-language-style code:

```lidl
(cursor of (mouse))
(when (condition) then (effect1) else (effect2))
(make (x) flow initially from (0))
((point) is inside (rectangle))
(graphics containing (a) and (b))
```

Each of these has a unique operator string:

| Expression | Operator String |
|-----------|----------------|
| `(cursor of (mouse))` | `cursorof$` |
| `(when (c) then (a) else (b))` | `when$then$else$` |
| `(make (x) flow initially from (y))` | `make$flowinitiallyfrom$` |
| `((p) is inside (r))` | `$isinside$` |
| `(graphics containing (a) and (b))` | `graphicscontaining$and$` |

## The `$` Placeholder

In operator patterns (used in the operator grammar and for display), `$` marks the position of an operand. This is an internal representation -- you never write `$` in LIDL source code. Operand positions are determined by the placement of parenthesized sub-interactions.

## Composition Operators

Composition operators are special because their pattern includes field keys:

```lidl
({x:(1) y:(2)})
```

Operator string: `{x:$y:$}`.

The keys (`x`, `y`) are part of the operator and determine how the compound value is structured. This means two compositions with different keys are different operators:

```lidl
({x:(1) y:(2)})    -- operator: {x:$y:$}
({a:(1) b:(2)})    -- operator: {a:$b:$}
```

## Identifier Operators

Identifier operators can contain operands, creating parameterized identifiers:

```lidl
(variable result of (a)+(b))   -- operator: variable result of $+$
(# cursor of (mouse))          -- operator: # cursor of $
```

Two identifier interactions with different operands refer to different variables, even if the text portions match.

## Next Steps

- See the complete list of [Base Interactions](base-interactions.md) and their operator patterns
- Learn how [Definitions](definitions.md) create named interactions with custom operators
- Explore the [Compilation Pipeline](../tooling/compilation-pipeline.md) to see how operators are resolved
