# Definitions

LIDL programs are organized as collections of **definitions**. There are three kinds of definitions -- for interactions, interfaces, and data types -- plus an import mechanism. Definitions can be nested, creating a hierarchical scope structure.

## Interaction Definitions

Interaction definitions are the primary building block of LIDL programs.

### Syntax

```lidl
interaction
  (signature):Interface
with
  -- sub-definitions (optional)
is
  (body)
```

### Parts

**Signature** -- The name and parameters of the interaction. The signature determines the operator pattern used to invoke this interaction.

```lidl
-- No parameters
(main):Number out

-- With parameters
(bob(a:Number in)):Number out

-- Natural language style with multiple parameters
((a:Number in) + (b:Number in)):Number out

-- Descriptive names
(cursor of (mouse:Mouse in)):Graphics out
```

**Interface** -- The type specification declaring what data flows in and out:

```lidl
:{theNumber:Number in, theResult:Number out}
:Number out
:{mouse:Mouse in, graphics:Graphics out}
```

**Sub-definitions** (`with` block) -- Optional nested definitions scoped to this interaction. These are only visible within the body and within other sub-definitions at the same level:

```lidl
with
  interaction (addOne):{Number->Number} out is (function addOne)

  interaction
    ((a:Number in) + (b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (...)
```

**Body** (`is` block) -- The interaction expression that implements this interaction:

```lidl
is
  (apply (addOne) to ((x)!) and get ((y)?))
```

### Complete Example

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
    (apply (addOne) to ((x)!) and get ((y)?))
  )
```

### Native Function Definitions

A special short form defines an interaction that wraps a native JavaScript function:

```lidl
interaction (addOne):{Number->Number} out is (function addOne)
```

This creates an interaction whose interface is a function type and whose body references a JavaScript function from the header file.

### Argument-Only Definitions

An interaction can be defined as just a typed argument (a "hole" that will be filled when the interaction is used):

```lidl
interaction (x):Number ref
```

This declares `x` as a Number that can be both read and written. It doesn't have a body -- it represents a parameter slot.

## Interface Definitions

Interface definitions create named, reusable interface types.

### Syntax

```lidl
interface Name
with
  -- sub-definitions (optional)
is
  interfaceSpecification
```

### Example

```lidl
interface Mouse is {
  buttons: Number,
  position: {x: Number, y: Number},
  wheel: {x: Number, y: Number, z: Number}
} in
```

Once defined, the interface can be referenced by name:

```lidl
interaction
  (cursor widget):{mouse: Mouse in, graphics: Graphics out}
is
  (...)
```

Interface names must be PascalCase: `[A-Z][a-zA-Z0-9]*`.

## Data Definitions

Data definitions create named, reusable data types.

### Syntax

```lidl
data Name
with
  -- sub-definitions (optional)
is
  dataSpecification
```

### Example

```lidl
data Point is {x:Number, y:Number}
data Rect is {x:Number, y:Number, width:Number, height:Number}
```

Data type names must be PascalCase: `[A-Z][a-zA-Z0-9]*`.

## Import Statements

Import statements include definitions from another file:

```lidl
import path/to/file.lidl
```

The imported definitions are inlined at the import point, as if their text content had been pasted in place. This is a simple textual inclusion mechanism.

## Scoping Rules

LIDL uses a hierarchical scoping model for definitions:

### Scope Chain

When the compiler encounters an interaction it needs to resolve, it searches for a matching definition following this chain:

1. **Arguments** -- Check if the interaction matches a parameter of the current definition's signature
2. **Sub-definitions** -- Check the `with` block of the current definition
3. **Parent scope** -- Move up to the parent definition and repeat

```lidl
interaction
  (main):{a:Number in, b:Number out}
with
  interaction                                 -- (2) sub-definition
    ((x:Number in) + (y:Number in)):Number out
  with
    interaction (addition):...                -- (2a) nested sub-definition
    is (function addition)
  is
    (...)
is
  (({a:((a)?), b:((b)!)}) with behaviour
   (((b)?) = ((1) + ((a)!))))               -- uses (x)+(y) from scope
```

### Definition Matching

A definition matches an interaction when their normalized operator strings are identical. The compiler extracts the operator by stripping whitespace and replacing operand positions with `$`.

For example, the interaction `((a)+(b))` has operator `$+$`, which matches the definition `((x:Number in) + (y:Number in)):Number out` because its signature also has operator `$+$`.

### Expansion

When a match is found, the compiler **expands** (inlines) the definition by:

1. Substituting the definition's formal parameters with the actual operands
2. Replacing the interaction expression with the definition's body (after substitution)

This expansion is performed recursively until only base interactions remain.

### Example of Expansion

Given:

```lidl
interaction
  ((a:Number in) + (b:Number in)):Number out
with
  interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
is
  (
    ((result of (a)+(b))!)
    with behaviour
    ((addition)({a:(a)b:(b)})=((result of (a)+(b))?))
  )
```

The expression `((1) + (2))` would be expanded by substituting `a=>(1)` and `b=>(2)`:

```lidl
(
  ((result of (1)+(2))!)
  with behaviour
  ((addition)({a:(1)b:(2)})=((result of (1)+(2))?))
)
```

## Hierarchical Composition

Definitions naturally compose hierarchically. A top-level interaction might use sub-interactions, which themselves are defined in terms of even simpler ones:

```lidl
interaction
  (simple UI):{mouse:Mouse in, graphics:Graphics out}
with
  -- Low-level definitions
  interaction (cursor):{Mouse->Graphics} out is (function cursor)
  interaction (button):{{...}->Graphics} out is (function button)
  interaction (group):{{a:Graphics,b:Graphics}->Graphics} out is (function group)

  -- Mid-level widget definitions
  interaction
    (cursor widget):{mouse:Mouse in, graphics:Graphics out}
  is (...)

  interaction
    (button widget):{mouse:Mouse in, graphics:Graphics out}
  is (...)

  -- Composition operator
  interaction
    (group containing (a:...) and (b:...)):{mouse:Mouse in, graphics:Graphics out}
  is (...)

is
  (group containing (cursor widget) and (button widget))
```

The top-level body is a single, readable expression. All the complexity is hidden in the definitions.

## Next Steps

- See complete [Examples](../examples/index.md) showing definitions in practice
- Learn about the [Compilation Pipeline](../tooling/compilation-pipeline.md) and how definitions are expanded
- Understand how [Operators](operators.md) are matched to definitions
