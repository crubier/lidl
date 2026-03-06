# Data Types

LIDL has a simple but expressive type system. Every piece of data flowing through an interaction has a declared type, and every value of every type can additionally be **inactive** (absent).

## Atomic Types

LIDL provides four built-in atomic types:

### Activation

The simplest type, with only two values:

| Value      | Meaning                    |
|------------|----------------------------|
| `active`   | A signal is present        |
| `inactive` | No signal (null at runtime)|

Activation is used for event-like signals -- things that either happen or don't. Button clicks, triggers, and guards are typically modeled as activations.

```lidl
Activation in   -- receives an activation signal
Activation out  -- emits an activation signal
```

### Boolean

Standard boolean type with three possible runtime values:

| Value      | Meaning         |
|------------|-----------------|
| `true`     | Logical true    |
| `false`    | Logical false   |
| `inactive` | No value (null) |

```lidl
Boolean in   -- receives a boolean
Boolean out  -- emits a boolean
```

### Number

Numeric type supporting integers and floating-point numbers:

```lidl
0, 1, 2, -1, 3.14159, 12e3, 6.626e-34
```

Special named values: `pi`, `e`, `infinity`, `-infinity`.

Like all types, numbers can also be `inactive` (null).

```lidl
Number in   -- receives a number
Number out  -- emits a number
```

### Text

String type for textual data:

```lidl
"", "Hello", "A multi-line\ntext", "Anything between double quotes"
```

```lidl
Text in   -- receives text
Text out  -- emits text
```

## Compound Types

### Records

Records group multiple named fields together:

```lidl
{x:Number, y:Number}
```

This is a compound type with two `Number` fields, `x` and `y` -- representing a 2D point.

Records can be nested:

```lidl
{
  position: {x:Number, y:Number},
  velocity: {x:Number, y:Number}
}
```

Field names use camelCase or start with a digit:

```lidl
{0:{x:Number, y:Number}, 1:{x:Number, y:Number}}
```

### Arrays

Array types represent homogeneous collections:

```lidl
[Number]       -- an array of numbers
[{x:Number, y:Number}]  -- an array of 2D points
```

### Function Types

Function types describe transformations from a domain to a codomain:

```lidl
{Number -> Number}              -- number to number
{{a:Number, b:Number} -> Number} -- pair of numbers to number
{Mouse -> Graphics}             -- mouse input to graphics output
```

Function types are used to declare native functions that bridge LIDL and the host language (JavaScript):

```lidl
interaction (addOne):{Number->Number} out is (function addOne)
```

## The Inactive Value

A distinctive feature of LIDL's type system is that **every type includes an implicit inactive value**. At runtime, `inactive` is represented as `null`.

This is not an error state -- it's a fundamental part of the data model. An inactive value means "no data is present at this time step." This is particularly important for interactive systems where:

- An input device may not always provide data (e.g., no mouse click this frame)
- A conditional branch may not produce output
- A value from a previous time step may not yet exist

### Propagation

Inactive values propagate naturally through computations. A well-behaved function receiving an inactive input produces an inactive output:

```javascript
var addOne = function(_) {
  if (_ !== null && _ !== undefined)
    return _ + 1;
  else
    return null;  // inactive in, inactive out
};
```

At runtime, the `active` value is represented as the string `"lidl_active_value"`, while `inactive` is `null`.

## Data Type Operations

LIDL supports set-theoretic operations on compound data types:

### Union

Combines the fields of two record types:

```lidl
union({x:Number, y:Number}, {z:Number})
-- Result: {x:Number, y:Number, z:Number}
```

### Intersection

Keeps only the fields common to both record types:

```lidl
intersection({x:Number, y:Number, z:Number}, {x:Number, z:Number})
-- Result: {x:Number, z:Number}
```

### Complement

The set-theoretic complement of a data type (partially implemented).

## Named Data Types

Data types can be given names using `data` definitions:

```lidl
data Point is {x:Number, y:Number}
```

Named types are referenced by their PascalCase identifier:

```lidl
{position: Point, velocity: Point}
```

## Type Comparison

Two types are structurally equal if:

- **Atomic types**: their names match
- **Arrays**: their element types are equal
- **Records**: they have the same set of keys and corresponding value types are equal
- **Functions**: both domain and codomain types are equal

Type comparison is structural, not nominal -- two independently defined types with the same structure are considered equal.

## Next Steps

- See how data types combine with directions to form [Interfaces](interfaces.md)
- Learn about [Base Interactions](../language-reference/base-interactions.md) including data type literals
- Explore [Referential Transparency](referential-transparency.md) and how data flows through a program
