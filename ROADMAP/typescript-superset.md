# LIDL as a Superset of TypeScript

## Motivation

LIDL currently has a minimal expression language — most computation (arithmetic, string operations, conditionals, collection operations) is delegated to JavaScript functions defined in a header file. This creates friction:

- Simple operations like `a + b` require a header function `addition` and the verbose `(apply (addition) to ({a:$, b:$}) and get ($))`
- No pattern matching, no collection operations, no string interpolation in the language itself
- Developers must learn two languages: LIDL for interaction structure, JavaScript for everything else

Rather than building a full programming language inside LIDL, a better approach is to make LIDL a **superset of TypeScript** — valid TypeScript is valid LIDL, but LIDL adds bidirectional interaction interfaces on top.

## Core Idea

TypeScript already provides:
- A complete expression language (arithmetic, string ops, ternary, etc.)
- Pattern matching (via `switch`, destructuring)
- Collection operations (`map`, `filter`, `reduce`)
- A sophisticated type system (generics, union types, intersection types, etc.)
- Mature tooling (tsc, LSP, formatters, linters)

LIDL's unique contribution is the **interaction layer**:
- Bidirectional typed interfaces with `in` / `out` / `ref` directions
- Composition via structural matching of interfaces
- Interface operations: conjugation, globalisation, localisation, reception, emission
- Declarative interaction definitions with the `interaction ... is ...` pattern
- The graph-based compilation pipeline for data-flow analysis

## What This Looks Like

### Today (LIDL + JS header)

```
// header.js
function addition(input) {
  if (input.a !== null && input.b !== null)
    return input.a + input.b;
  return null;
}

// program.lidl
interaction (main): {a: Number in, b: Number in, sum: Number out}
with
  interaction (addition): {{a: Number, b: Number} -> Number} out is (function addition)
is
  ({a: ((x)!), b: ((y)!), sum: (apply (addition) to ({a: ((x)!), b: ((y)!)}) and get ($))})
```

### Future (LIDL as TypeScript superset)

```lidl
interaction main: {a: Number in, b: Number in, sum: Number out} is {
  sum = a + b
}
```

TypeScript expressions (`a + b`) are used directly inside interaction bodies. The LIDL compiler:
1. Parses the interaction structure (interfaces, definitions, `with` clauses)
2. Extracts TypeScript expression fragments
3. Compiles interaction wiring via the graph pipeline
4. Delegates expression compilation to the TypeScript compiler
5. Produces a combined JavaScript output

## Syntax Extension Points

LIDL would extend TypeScript syntax in specific, non-conflicting ways:

### `interaction` declarations

```typescript
interaction (signature): InterfaceType is InteractionExpression
```

These are new top-level declarations not present in TypeScript. They define reactive data-flow components with typed bidirectional ports.

### Directional interface types

```typescript
interface MyComponent {
  input: Number in,      // LIDL extension: direction annotation
  output: String out,
  config: Config ref
}
```

The `in`, `out`, `ref` direction annotations after type names are LIDL-specific. Standard TypeScript `interface` declarations without directions remain valid and behave as TypeScript interfaces.

### `data` definitions

```typescript
data Temperature is Number
data SensorReading is { value: Temperature, timestamp: Number }
```

These provide LIDL's structural data type system alongside TypeScript's type aliases.

### Interface operations

```typescript
type Conjugated = conjugation(MyComponent)
type InputOnly = reception(MyComponent)
```

These are new type-level operations specific to LIDL's interface algebra.

## Compilation Strategy

```
LIDL Source (.lidl)
  │
  ├─ Parse ──► Interaction AST + TypeScript expression fragments
  │
  ├─ LIDL Pipeline ──► Graph transformations, interface matching, data-flow wiring
  │
  ├─ TypeScript Compiler ──► Expression compilation, type checking
  │
  └─ Emit ──► Combined JavaScript (interaction wiring + compiled expressions)
```

The key insight is that LIDL's graph pipeline and TypeScript's expression compiler operate on **different levels** and can be composed:
- LIDL handles the **macro structure**: which ports connect to which, how data flows between components
- TypeScript handles the **micro structure**: what happens to data inside each node

## Advantages

1. **Zero learning curve for expressions** — developers already know TypeScript
2. **Full type inference** — TypeScript's type checker validates expressions, LIDL validates interface compatibility
3. **Ecosystem access** — npm packages, existing libraries, familiar tooling
4. **Incremental adoption** — start with TypeScript, gradually add interaction structure
5. **IDE support for free** — TypeScript LSP handles expression editing, LIDL LSP handles interaction structure

## Open Questions

- **Syntax conflicts**: TypeScript's `interface` keyword overlaps with LIDL's `interface` (but with different semantics — directions). Need a clear disambiguation rule.
- **Module interop**: How do LIDL interactions import/export alongside TypeScript modules?
- **Runtime model**: TypeScript is pull-based (call functions), LIDL is push-based (reactive data flow). How do they interleave?
- **JSX**: Could LIDL interaction expressions use JSX-like syntax for composition? E.g. `<Sensor input={reading} />` instead of `(read sensor data from (reading))`.
