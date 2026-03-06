# Interactions

An **interaction** is the central concept in LIDL. It represents a bidirectional data exchange between a system and its environment at a single point in time.

## What is an Interaction?

Unlike traditional programs that take inputs and produce outputs in a pipeline, LIDL models systems as **interactive**: at each time step, the system and its environment simultaneously exchange data through a shared interface. The system reads inputs, computes, and provides outputs -- all within a single interaction step.

An interaction is defined by:

1. A **signature** -- its name and parameters
2. An **interface** -- the typed data pipes it exposes
3. A **body** -- how it processes data, expressed as a composition of other interactions

## A Minimal Interaction

The simplest possible interaction passes data through unchanged:

```lidl
interaction
  (main):{theNumber:Number in, theResult:Number out}
is
  ({
    theNumber:((x)?)
    theResult:((x)!)
  })
```

Breaking this down:

- `interaction` -- keyword introducing a definition
- `(main)` -- the name (signature) of this interaction
- `:{theNumber:Number in, theResult:Number out}` -- its interface: receives a number, emits a number
- `is` -- separates the signature from the body
- The body is a composition `{...}` that wires `theNumber` to `theResult` through a shared identifier `x`

The `?` operator writes a value into identifier `x`, and the `!` operator reads from it. This is how data flows in LIDL.

## Step-Based Execution

LIDL programs execute in discrete **time steps**. At each step:

1. The environment provides input values through the interface
2. The interaction computes based on those inputs (and optionally, state from previous steps)
3. The interaction provides output values back through the interface

This model naturally fits interactive systems like user interfaces, where input events arrive, the system reacts, and output is produced -- cyclically.

Consider this scenario for the passthrough interaction above:

| Step | Input (`theNumber`) | Output (`theResult`) |
|------|--------------------:|---------------------:|
| 1    | 50                  | 50                   |
| 2    | 78                  | 78                   |
| 3    | null                | null                 |
| 4    | 42                  | 42                   |

When the input is `null` (inactive), the output is also `null`. This is the **inactive** value -- it propagates through computations naturally.

## Interaction Definitions

An interaction definition has this structure:

```lidl
interaction
  (signature):Interface
with
  -- sub-definitions (optional)
is
  (body)
```

The `with` block lets you define helper interactions that are scoped to the parent definition. This enables hierarchical decomposition of complex systems.

### Example: Using Sub-Definitions

```lidl
interaction
  (add one to input):{theNumber:Number in, theResult:Number out}
with
  interaction (addOne):{Number->Number} out is (function addOne)
is
  (
    ({
      theNumber:((x)?)
      theResult:((y)!)
    })
    with behaviour
    (apply (addOne) to ((x)!) and get ((y)?) )
  )
```

Here, `addOne` is a sub-definition that wraps a native JavaScript function. The main body:
1. Exposes the interface through a composition `{theNumber:..., theResult:...}`
2. Attaches a **behaviour** that applies the `addOne` function to the input and stores the result

## Composing Interactions

Interactions compose hierarchically. A complex interaction is built from simpler ones:

```lidl
interaction
  (cursor widget):{mouse:Mouse in, graphics:Graphics out}
with
  interaction (cursor):{Mouse->Graphics} out is (function cursor)
is
  (
    ({
      mouse: ((the mouse)?)
      graphics: ((the graphics)!)
    })
    with behaviour
    ((cursor)((the mouse)!)=((the graphics)?))
  )
```

This `cursor widget` interaction takes mouse input and produces graphics output by applying a `cursor` function.

You can then use `cursor widget` as a building block in larger interfaces:

```lidl
interaction
  (simple UI):{mouse:Mouse in, graphics:Graphics out}
is
  (group widget containing (cursor widget) and (button widget))
```

## Interactions with Arguments

Interactions can take arguments, creating reusable templates:

```lidl
interaction
  (bob(a:Number in)):Number out
is
  (a)
```

This interaction takes a `Number` argument `a` and outputs it directly. When used in another interaction, the argument is substituted:

```lidl
(bob(42))  -- outputs 42
```

## The Inactive Value

Every data type in LIDL can take a special **inactive** value (represented as `null` at runtime). This is not an error -- it's a fundamental part of the data model. An inactive value means "no data is present."

Inactive values propagate through computations: if a function receives an inactive input, it typically produces an inactive output. This provides a clean way to handle optional or conditional data without explicit null checks.

## Next Steps

- Learn how [Interfaces](interfaces.md) specify the data types and directions for interactions
- Understand the [Data Types](data-types.md) available in LIDL
- See how [Referential Transparency](referential-transparency.md) keeps interactions predictable
