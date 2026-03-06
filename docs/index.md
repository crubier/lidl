# LIDL

**LIDL** (Language for Interface Description Language) is a formal language for designing, specifying, and verifying critical embedded human-machine interfaces.

LIDL provides a mathematically grounded way to describe interactive systems as compositions of **interactions** -- bidirectional data exchanges between a system and its environment. Programs written in LIDL are referentially transparent by default, compositional, and amenable to formal verification.

## Origin

LIDL was developed as part of a PhD thesis at ISAE-SUPAERO / University of Toulouse (2016):

> *Un langage formel pour la conception, la specification et la verification d'interfaces homme-machine embarquees critiques*
> -- Vincent Lecrubier

The language was designed to address the need for formal methods in safety-critical HMI development, particularly in aerospace contexts where human-machine interfaces must meet strict certification requirements.

## Key Properties

- **Referential transparency** -- Interactions are pure by default. Only explicit identifier interactions break referential transparency, making it easy to reason about program behavior.
- **Composability** -- Complex interfaces are built by composing simpler interactions using a small set of well-defined operators.
- **Typed data flow** -- Every data pipe has a declared type and direction (`in`, `out`, or `ref`), preventing entire classes of wiring errors at compile time.
- **Step-based execution** -- Programs execute as discrete transition functions, naturally modeling the cyclical nature of interactive systems (read inputs, compute, produce outputs).
- **Formal verification potential** -- The language's formal semantics enable static analysis, model checking, and other verification techniques.

## Project Structure

The LIDL project consists of three packages:

| Package | Description |
|---------|-------------|
| [lidl-core](tooling/lidl-core.md) | Core library for parsing, compiling, and analyzing LIDL programs |
| [lidl-cli](tooling/lidl-cli.md) | Command-line compiler that transforms `.lidl` files into JavaScript |
| lidl-sandbox | Interactive web-based IDE for experimenting with LIDL |

## Quick Example

A minimal LIDL program that receives a number and outputs it unchanged:

```lidl
interaction
  (main):{theNumber:Number in, theResult:Number out}
is
  ({
    theNumber:((x)?)
    theResult:((x)!)
  })
```

This defines an interaction called `main` with an interface containing a `Number` input and a `Number` output. The body wires them together through a shared identifier `x` -- writing to it with `?` and reading from it with `!`.

## Documentation Overview

- **[Getting Started](getting-started.md)** -- Install and run your first LIDL program
- **Concepts** -- Understand the core ideas behind the language
  - [Interactions](concepts/interactions.md) -- The central abstraction
  - [Interfaces](concepts/interfaces.md) -- Typed data flow specifications
  - [Data Types](concepts/data-types.md) -- The type system
  - [Referential Transparency](concepts/referential-transparency.md) -- Purity and identifiers
- **Language Reference** -- Detailed syntax and semantics
  - [Syntax](language-reference/syntax.md) -- Grammar and structure
  - [Base Interactions](language-reference/base-interactions.md) -- Built-in primitives
  - [Operators](language-reference/operators.md) -- Operator reference
  - [Definitions](language-reference/definitions.md) -- Defining interactions, interfaces, and data types
- **[Examples](examples/index.md)** -- Annotated programs from simple to complex
- **Tooling** -- Compiler and library reference
  - [lidl-core](tooling/lidl-core.md) -- JavaScript library API
  - [lidl-cli](tooling/lidl-cli.md) -- Command-line compiler
  - [Compilation Pipeline](tooling/compilation-pipeline.md) -- How LIDL compiles to JavaScript
