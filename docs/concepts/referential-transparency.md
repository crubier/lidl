# Referential Transparency

LIDL is designed around the principle of **referential transparency**: an expression can be replaced by its value without changing the program's behavior. This makes LIDL programs easier to reason about, test, and formally verify.

## The Core Rule

In LIDL, all interactions are referentially transparent **by default**. There is exactly one category of interaction that breaks referential transparency: **identifier interactions**.

This means the answer to "is this interaction referentially transparent?" is simple:

- If it contains an identifier interaction (`variable` or `#`), it is **not** referentially transparent
- Otherwise, it **is** referentially transparent

## Identifiers: The Controlled Impurity

Identifiers are the mechanism through which LIDL introduces named, mutable bindings. They act as shared variables that multiple parts of an interaction can read from and write to.

An identifier is accessed through two complementary operations:

### Reference (`!`) -- Read

The `!` operator reads the current value of an identifier:

```lidl
((x)!)    -- read the value of identifier x
```

### CoReference (`?`) -- Write

The `?` operator writes a value into an identifier:

```lidl
((x)?)    -- write a value into identifier x
```

### How They Work Together

A typical pattern wires an input to an output through a shared identifier:

```lidl
({
  theNumber:((x)?)     -- write input into x
  theResult:((x)!)     -- read x as output
})
```

When `theNumber` receives a value, it is written into `x`. The `theResult` port reads from `x` and outputs that value.

## Why Identifiers?

Referential transparency is a strong property, but interactive systems need some form of state and data sharing. Rather than abandoning purity entirely, LIDL confines impurity to a single, easily identified construct.

This design has several advantages:

1. **Easy analysis** -- Any tool can scan a LIDL program and immediately identify all points of impurity
2. **Local reasoning** -- Within a pure sub-expression, you can reason equationally
3. **Scoping** -- Identifiers obey scoping rules, limiting their impact to well-defined regions
4. **Composition** -- Pure interactions compose freely; impure ones are contained

## Scoping and Referential Transparency

The compiler performs a **referential transparency transformation** that ensures identifiers are properly scoped. When the same identifier name appears in different contexts, the compiler disambiguates them to prevent unintended sharing.

For example, if two different sub-interactions both use an identifier named `x`, the compiler ensures they refer to different variables unless explicitly intended to share.

## Special Identifiers

LIDL provides three built-in identifier interactions that break referential transparency in controlled ways:

### Time Step Identifier

```lidl
(time step identifier):Number out
```

A number that is different on every time step but has the same value in every interaction within the same step. It is not necessarily sequential, but it is unique -- two different time steps will never share the same identifier.

This is useful for maintaining referential transparency while using constructs that need a unique value per step (such as random number generation with a seed).

### Class Identifier

```lidl
(class identifier):Number out
```

A number that is constant in time but different every time it appears in the **source code as written** (the "folded" code). Two different occurrences of `(class identifier)` in the source code will produce different values, but the same occurrence will always produce the same value across time steps.

### Instance Identifier

```lidl
(instance identifier):Number out
```

A number that is constant in time but different every time it appears in the **fully expanded** code (the "unfolded" code, after all definitions have been inlined). If a definition is used multiple times, each use gets a unique instance identifier even though they share the same class identifier.

### Hierarchy of Identifiers

These three identifiers form a spectrum:

| Identifier | Varies across time? | Varies across source locations? | Varies across instances? |
|-----------|:---:|:---:|:---:|
| Time Step | Yes | No  | No  |
| Class     | No  | Yes | No  |
| Instance  | No  | Yes | Yes |

## The `previous` Interaction

The `previous` interaction is the only way to carry data between time steps:

```lidl
((y)?) = previous ((x)!)
```

This stores the current value of `x` and makes it available as `y` on the **next** time step. On the first time step, the previous value is `inactive` (null).

While `previous` itself is a base interaction (not an identifier), it interacts with identifiers to create stateful behavior. A common pattern wraps it in a named definition:

```lidl
interaction
  (previous (x:Number in)):Number out
is
  (
    ((the previous(x))!)
    with behaviour
    (((the previous(x))?)= previous (x))
  )
```

This definition creates a named "previous" interaction using identifiers to wire the state through.

## Example: Tracking State

A pattern for maintaining a mutable variable across time steps:

```lidl
interaction
  (make (x:Number ref) flow initially from (y:Number in)):Activation in
is
  (
    ((x)?) = (
                ((new (x))!)
                fallback to
                (if (init) then (y) else (previous ((x)!)) )
              )
  )
```

This interaction:
1. On the first step, initializes `x` to the value `y`
2. On subsequent steps, `x` takes either a newly written value or falls back to its previous value
3. The identifier `x` is the shared mutable state, with `?` for write and `!` for read

## Next Steps

- Learn the full syntax for identifiers and other constructs in the [Syntax Reference](../language-reference/syntax.md)
- See all [Base Interactions](../language-reference/base-interactions.md) including `previous`, `behaviour`, and `affectation`
- Explore [annotated examples](../examples/index.md) that demonstrate these patterns in practice
