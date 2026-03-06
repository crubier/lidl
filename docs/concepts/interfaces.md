# Interfaces

An **interface** is the specification of data pipes for an interaction. It describes what data flows through an interaction, including the data type and the direction of flow.

## Anatomy of an Interface

An interface is built from two components:

- A **data type** -- what kind of data flows through the pipe
- A **direction** -- which way the data flows (`in`, `out`, or `ref`)

## Atomic Interfaces

The simplest interface is an **atomic interface**: a single data type with a direction.

```lidl
Number in       -- receives a number
Text out        -- emits text
Boolean in      -- receives a boolean
Activation out  -- emits an activation signal
```

Directions are always from the perspective of the **environment** (the entity interacting with the system):

- `in` -- data flows **into** the interaction (the environment provides it)
- `out` -- data flows **out of** the interaction (the interaction provides it)
- `ref` -- data flows in both directions (read/write)

## Composite Interfaces

Interfaces can be composed into **records** using curly braces:

```lidl
{x:Number in, y:Number out}
```

This interface has two fields: `x` (a number flowing in) and `y` (a number flowing out).

Composite interfaces can be nested:

```lidl
{
  mouse: {
    buttons: Number in,
    position: {x: Number in, y: Number in}
  },
  graphics: Graphics out
}
```

## Direction Shorthand

When all fields of a composite interface share the same direction, the direction can be specified at the composite level:

```lidl
{x:Number, y:Number} in
```

This is equivalent to:

```lidl
{x:Number in, y:Number in}
```

The second form is already **normalized** -- directions are pushed as deep as possible. But the first form is also valid and often more readable.

## Conjugation

The `co` operator flips all directions in an interface:

```lidl
co {x:Number in, y:Number out}
```

is equivalent to:

```lidl
{x:Number out, y:Number in}
```

Conjugation is useful when you need the "opposite" perspective of an interface. If an interaction has interface `I`, then the entity it interacts with must have interface `co I`.

## Interface Normalization

Multiple syntactic forms can describe the same interface. Two interfaces are considered equivalent if their **normalized** forms are identical.

Normalization works by:

1. Removing `co` operators (by flipping directions)
2. Moving directions as shallow (outward) as possible

Examples of equivalent interfaces:

```lidl
-- These are all equivalent:
{x:Number in, y:Number in}      -- explicit directions on each field
{x:Number, y:Number} in         -- direction on the composite (normalized form)
co {x:Number, y:Number} out     -- conjugation of an output composite
```

If a composite has mixed directions, the direction stays on the leaves:

```lidl
{x:Number in, y:{a:Number in, b:Number out}}
```

Here, `y` has mixed directions so the interface cannot be simplified further.

## Interface Operations

LIDL supports several operations on interfaces:

| Operation | Description |
|-----------|-------------|
| `conjugation` | Flip all directions (`in` becomes `out` and vice versa) |
| `globalisation` | Move directions outward (toward the root) when possible |
| `localisation` | Move directions inward (toward the leaves), expanding compound types |
| `reception` | Force all directions to `in` |
| `emission` | Force all directions to `out` |
| `union` | Combine the fields of two composite interfaces |
| `intersection` | Keep only the fields common to two composite interfaces |
| `complement` | Negate an interface (set-theoretic complement) |

These operations are specified using function-like syntax:

```lidl
conjugation({x:Number in, y:Number out})
reception({x:Number in, y:Number out})
```

## Interface Compatibility

Two interfaces are **compatible** if they can be connected -- meaning their data types match and their directions are complementary. An `in` on one side must correspond to an `out` on the other.

For composite interfaces, compatibility is checked field by field. Fields that exist in only one interface are allowed (partial compatibility).

## Interface Merging

When the compiler encounters two partial interface descriptions for the same interaction, it **merges** them into a single, more complete interface. Merging succeeds if the two interfaces are compatible (no conflicting types or directions). If a conflict exists, the compiler reports an error.

## Named Interfaces

Interfaces can be given names for reuse:

```lidl
interface Mouse is {
  buttons: Number,
  position: {x: Number, y: Number}
} in
```

Named interfaces are referenced using PascalCase identifiers:

```lidl
{mouse: Mouse in, graphics: Graphics out}
```

## Next Steps

- Learn about the [Data Types](data-types.md) that interfaces carry
- See how interfaces are used in [Interaction Definitions](../language-reference/definitions.md)
- Understand [Referential Transparency](referential-transparency.md) and how data flows through identifiers
