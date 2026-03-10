# LIDL Module System

## Motivation

Today, all LIDL definitions live in a single file and external functions live in a monolithic JavaScript "header" string. This makes it impossible to:

- Split large programs across files
- Share and reuse definitions between projects
- Avoid identifier collisions in larger codebases

LIDL already has a scoping mechanism — the `with` clause allows local sub-definitions inside any definition. A module system extends this concept to the file level.

## Design

### Import / Export Syntax

Top-level definitions are exported by default (all `interaction`, `interface`, and `data` definitions in a file are public).

Importing from another file:

```
import "path/to/file.lidl"
```

This brings all definitions from the imported file into scope. Definitions from the imported file can be used in interaction expressions, interface references, and data references just as if they were defined locally.

Selective imports:

```
import { MyInteraction, MyInterface } from "path/to/file.lidl"
```

### Name Conflicts

If two imported files define the same name, the compiler should emit an error at the import site. Qualified access could resolve ambiguities in a future iteration:

```
import "sensors.lidl" as Sensors
import "actuators.lidl" as Actuators

interaction (main): ... is
  (Sensors.readTemperature)
```

### Resolution Rules

1. **Relative paths** resolve from the importing file's directory: `import "./utils.lidl"`
2. **Package paths** resolve from a `lidl_packages/` directory or a future registry: `import "std/math.lidl"`
3. **Circular imports** are an error at compile time

### Integration with `with` Clause

The `with` clause already scopes definitions. Imports behave as if the imported definitions were prepended to the file's top level. Local `with` definitions shadow imported ones.

### Standard Library

A set of commonly needed definitions (arithmetic wrappers, boolean logic, state patterns like `previous`, `flow`, `init`) should ship as a LIDL standard library that can be imported:

```
import "std/state.lidl"
import "std/logic.lidl"
```

This replaces the current approach of encoding these patterns in the JavaScript header.

### Compiler Changes

1. The parser accepts `import` statements at the top level (before `Content*`)
2. The compiler resolves imports, loads and parses referenced files, and merges their ASTs
3. Duplicate detection runs after merge
4. The graph pipeline operates on the merged AST as it does today

### Header Files

JavaScript header files (`-h` flag in the CLI) remain separate — they provide FFI bindings, not LIDL definitions. A future evolution could allow `import` of `.ts` or `.js` files to declare external functions with LIDL type signatures:

```
import { addOne } from "./math.ts" as (add one): {Number -> Number} out
```
