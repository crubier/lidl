# Base Interactions

Base interactions are the built-in primitives of LIDL. Every LIDL program ultimately decomposes into a composition of these primitives. They are recognized by the compiler through their operator patterns and have special compilation semantics.

## Literals

Literal interactions produce constant values.

### Activation Literals

Interface: `Activation out`

```lidl
(active)      -- emits the active signal
(inactive)    -- emits the inactive signal (null)
```

### Boolean Literals

Interface: `Boolean out`

```lidl
(true)        -- emits true
(false)       -- emits false
(inactive)    -- emits inactive (null)
```

### Number Literals

Interface: `Number out`

```lidl
(0)           -- zero
(1)           -- one
(-1)          -- negative one
(3.14159)     -- floating point
(12e3)        -- scientific notation (12000)
(6.626e-34)   -- small scientific notation
(pi)          -- pi constant
(e)           -- Euler's number
(infinity)    -- positive infinity
(-infinity)   -- negative infinity
(inactive)    -- inactive (null)
```

### Text Literals

Interface: `Text out`

```lidl
("")                  -- empty string
("Hello")             -- simple text
("A multi-line\ntext") -- text with escape sequences
(inactive)            -- inactive (null)
```

### Function Literals

Interface: `{domain -> codomain} out`

Function literals reference native JavaScript functions defined in the header file:

```lidl
(function addOne)       -- references the JS function 'addOne'
(function isActive)     -- references the JS function 'isActive'
(function boolNot)      -- references the JS function 'boolNot'
```

Function names follow C-style naming: `[a-zA-Z_][a-zA-Z0-9_]*`.

## Composition

Composition interactions build or destructure compound data.

### Record Construction

Operator pattern: `{key:$ , ...}`

Creates a compound value from its parts:

```lidl
({x:(1), y:(2)})
```

This produces a value of type `{x:Number, y:Number}` with fields `x=1` and `y=2`.

Compositions can contain any sub-interactions, not just literals:

```lidl
({
  theNumber:((x)?)
  theResult:((y)!)
})
```

### Field Access

Sub-interactions in a composition can be accessed by key. This is handled through the composition mechanism itself -- the composition operator pattern includes the key names.

## Behaviour

Operator pattern: `$ with behaviour $`

The behaviour interaction is one of the most important constructs in LIDL. It combines a **value** with a **side effect**:

```lidl
((value) with behaviour (effect))
```

The overall interaction is equivalent to its first operand (the value), while always executing its second operand (the behaviour/effect).

This is the primary mechanism for attaching computations to data-flow nodes.

### Example

```lidl
(
  ({
    theNumber:((x)?)
    theResult:((y)!)
  })
  with behaviour
  (apply (addOne) to ((x)!) and get ((y)?))
)
```

The interaction's value is the composition `{theNumber:..., theResult:...}`, and its behaviour applies the `addOne` function, wiring input to output.

## Affectation

Operator pattern: `$ = $`

Assigns a value to an output:

```lidl
((x) = (5))
```

The left operand receives the value of the right operand. This is used to wire data from one place to another:

```lidl
(((theResult)?) = ((theNumber)!))
```

This reads from identifier `theNumber` and writes the value into identifier `theResult`.

## Reference and CoReference

### Reference (Read)

Operator pattern: `$ !`

Reads the current value of an identifier:

```lidl
((x)!)     -- read from identifier x
```

### CoReference (Write)

Operator pattern: `$ ?`

Writes a value into an identifier:

```lidl
((x)?)     -- write into identifier x
```

Together, reference and co-reference enable shared state:

```lidl
({
  input:((x)?)       -- write to x
  output:((x)!)      -- read from x
})
```

## Identifier

Operator pattern: `variable ...` or `# ...`

Identifier interactions are the **only** interactions that break referential transparency. They create named, mutable bindings that can be shared across an interaction.

```lidl
(variable name)              -- simple identifier
(variable result of (a)+(b)) -- compound identifier with operands
(#name)                      -- shorthand identifier syntax
(#(a) is active)             -- shorthand with operands
```

Identifiers with operands create unique bindings parameterized by their operands. Two identifiers with different operands refer to different variables.

## Function Application

Operator pattern: `apply $ to $ and get $`

Applies a function to an input and produces an output:

```lidl
(apply (addOne) to ((x)!) and get ((y)?))
```

- First operand: the function to apply
- Second operand: the input value
- Third operand: where to store the result

### Shorthand Form

Operator pattern: `$ $ = $`

A shorter form of function application:

```lidl
((addOne)((x)!) = ((y)?))
```

This is equivalent to `apply (addOne) to ((x)!) and get ((y)?)`.

## Previous / Next

The `previous` interaction carries data across time steps. It is the only mechanism for state persistence between steps.

### Previous (Read Past Value)

Operator pattern: `$ = previous $`

```lidl
((y)?) = previous ((x)!)
```

Assigns to `y` the value that `x` had on the **previous** time step. On the first step, the previous value is `inactive` (null).

### Next (Write Future Value)

Operator pattern: `next $ = $`

```lidl
next ((y)?) = ((x)!)
```

An alternative syntax that writes the current value of `x` to be available as `y` on the next step.

### Long Form

Operator pattern: `get $ from previous and set $ for next`

```lidl
(get ((y)?) from previous and set ((x)!) for next)
```

## Void

Operator pattern: (empty / whitespace only)

The void interaction represents the absence of interaction:

```lidl
()
```

It is automatically inserted by the compiler where needed to fill gaps in the data flow graph.

## All (Multi-Output)

While not a primitive, the `all` pattern is commonly defined to broadcast a value to multiple outputs:

```lidl
interaction
  (all (a:Activation out) (b:Activation out)):Activation in
with
  interaction (func all):{Activation->{a:Activation,b:Activation}} out
    is (function all)
is
  (
    ((variable all (a) (b))?)
    with behaviour
    (
      apply (func all) to ((variable all (a) (b))!)
      and get ({a:(a) b:(b)})
    )
  )
```

## Summary Table

| Interaction | Operator Pattern | Description |
|------------|-----------------|-------------|
| Composition | `{key:$ ...}` | Record construction |
| Behaviour | `$ with behaviour $` | Value with side effect |
| Affectation | `$ = $` | Assignment |
| Reference | `$ !` | Read from identifier |
| CoReference | `$ ?` | Write to identifier |
| Identifier | `variable ...` / `# ...` | Named mutable binding |
| Function Application | `apply $ to $ and get $` | Apply function |
| Function Application (short) | `$ $ = $` | Apply function (shorthand) |
| Previous | `$ = previous $` | Read previous time step |
| Next | `next $ = $` | Write for next time step |
| Function Literal | `function name` | Reference to native function |
| Activation | `active` / `inactive` | Activation literal |
| Boolean | `true` / `false` | Boolean literal |
| Number | numeric value | Number literal |
| Text | `"..."` | Text literal |
| Void | (empty) | No interaction |

## Next Steps

- Learn how [Operators](operators.md) are matched and resolved
- See how [Definitions](definitions.md) create reusable interactions from these primitives
- Explore complete [Examples](../examples/index.md) using these base interactions
