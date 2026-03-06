# Syntax

This page provides a comprehensive reference for LIDL's syntax and grammar.

## Program Structure

A LIDL program is a sequence of **definitions**. Each definition is one of:

- An **interaction definition** -- defines a named interaction
- An **interface definition** -- defines a named interface type
- A **data definition** -- defines a named data type
- An **import statement** -- includes definitions from another file

```
program     :=  definition*

definition  :=  interactionDefinition
            |   interfaceDefinition
            |   dataDefinition
            |   import
```

## Interaction Definitions

An interaction definition has three parts: a signature, optional sub-definitions, and a body.

```
interactionDefinition :=
    'interaction' signature ['with' definitions] 'is' interaction
```

### Signature

The signature declares the interaction's name, parameters, and interface:

```
signature :=  '(' signatureElement* ')' ':' interface
```

Signature elements are either literal text (forming the operator pattern) or parameter declarations:

```
signatureElement :=  operatorText
                 |   '(' variableName ':' interface ')'
```

Examples:

```lidl
-- No parameters
(main):{theNumber:Number in, theResult:Number out}

-- One parameter
(bob(a:Number in)):Number out

-- Multiple parameters with operator text
((a:Number in) + (b:Number in)):Number out

-- Natural language style
(cursor of (mouse:Mouse in)):Graphics out
```

### Body

The body is an **interaction expression** enclosed in parentheses:

```
interaction :=  '(' interactionElement* ')'

interactionElement :=  interaction     -- nested sub-interaction
                   |   operatorText    -- literal text
```

An interaction expression interleaves operator text with nested sub-interactions. The text portions form the **operator** and the nested interactions are the **operands**.

Example breakdown:

```lidl
(apply (addOne) to ((x)!) and get ((y)?))
```

| Part | Role |
|------|------|
| `apply` | operator text |
| `(addOne)` | operand 1 |
| `to` | operator text |
| `((x)!)` | operand 2 |
| `and get` | operator text |
| `((y)?)` | operand 3 |

The full operator string is `apply$to$andget$` (with `$` marking operand positions).

## Interface Specifications

```
interface :=  interfaceAtomic
          |   interfaceComposite
          |   interfaceOperation
          |   interfaceNamed

interfaceAtomic     :=  dataType direction
interfaceComposite  :=  '{' (key ':' interface) (',' key ':' interface)* '}'
interfaceOperation  :=  operatorName '(' interface (',' interface)* ')'
interfaceNamed      :=  InterfaceName

direction :=  'in' | 'out' | 'ref'
```

Interface operations: `conjugation`, `globalisation`, `localisation`, `reception`, `emission`, `union`, `intersection`, `complement`.

Examples:

```lidl
Number in                                       -- atomic
{x:Number in, y:Number out}                     -- composite
co {x:Number in, y:Number out}                  -- conjugation
Mouse                                           -- named
```

## Data Type Specifications

```
dataType :=  dataAtomic
         |   dataComposite
         |   dataArray
         |   dataFunction
         |   dataOperation

dataAtomic     :=  DataName
dataComposite  :=  '{' (key ':' dataType) (',' key ':' dataType)* '}'
dataArray      :=  '[' dataType ']'
dataFunction   :=  '{' dataType '->' dataType '}'
dataOperation  :=  operatorName '(' dataType (',' dataType)* ')'
```

Data operations: `union`, `intersection`, `complement`.

Examples:

```lidl
Number                                -- atomic
{x:Number, y:Number}                  -- composite (record)
[Number]                              -- array
{Number -> Number}                    -- function
{{a:Number, b:Number} -> Number}      -- function with compound domain
union({x:Number}, {y:Number})         -- union operation
```

## Import Statements

```
import :=  'import' filepath
```

Imports inline the definitions from another file at the import point.

## Naming Conventions

LIDL uses different naming conventions for different kinds of identifiers:

| Kind | Convention | Pattern | Examples |
|------|-----------|---------|----------|
| Interface names | PascalCase | `[A-Z][a-zA-Z0-9]*` | `Number`, `Mouse`, `Graphics` |
| Data type names | PascalCase | `[A-Z][a-zA-Z0-9]*` | `Activation`, `Boolean`, `Text` |
| Variable names | camelCase | `[a-z][a-zA-Z0-9]*` | `mouse`, `theResult`, `x` |
| Field keys | camelCase or numeric | `[a-z0-9][a-zA-Z0-9]*` | `x`, `position`, `0`, `1` |
| Function names | C-style | `[a-zA-Z_][a-zA-Z0-9_]*` | `addOne`, `isActive`, `boolNot` |

## Whitespace

Whitespace (spaces, tabs, newlines) is generally insignificant in LIDL. It is used to separate tokens but does not affect semantics. You can format your code freely:

```lidl
-- Compact
interaction(main):{a:Number in,b:Number out}is({a:((x)?),b:((x)!)})

-- Expanded
interaction
  (main):{a:Number in, b:Number out}
is
  ({
    a:((x)?)
    b:((x)!)
  })
```

Both forms are parsed identically. The expanded form is conventional for readability.

## Operator Text

Operator text in interaction expressions consists of any characters except parentheses `(` and `)`. Parentheses are reserved for delimiting sub-interactions.

In signatures, operator text additionally cannot contain `:` (which separates names from interfaces).

The operator text for an interaction is computed by stripping whitespace and replacing each operand position with `$`. This normalized operator string is what the compiler uses for pattern matching.

## Comments

LIDL does not currently have a comment syntax. Code is meant to be self-documenting through its natural-language-style operator names.

## Formal Grammar Summary

```
program              := definition*
definition           := interactionDef | interfaceDef | dataDef | import

interactionDef       := 'interaction' signature ['with' definition*] 'is' interaction
interfaceDef         := 'interface' InterfaceName ['with' definition*] 'is' interface
dataDef              := 'data' DataName ['with' definition*] 'is' dataType
import               := 'import' filepath

signature            := '(' sigElement* ')' ':' interface
sigElement           := text | '(' varName ':' interface ')'

interaction          := '(' interactionElement* ')'
interactionElement   := interaction | text

interface            := dataType direction
                     |  '{' (key ':' interface)+ '}'
                     |  interfaceOp '(' interface (',' interface)* ')'
                     |  InterfaceName

dataType             := DataName
                     |  '{' (key ':' dataType)+ '}'
                     |  '[' dataType ']'
                     |  '{' dataType '->' dataType '}'
                     |  dataOp '(' dataType (',' dataType)* ')'

direction            := 'in' | 'out' | 'ref'
interfaceOp          := 'conjugation' | 'globalisation' | 'localisation'
                     |  'reception' | 'emission' | 'union'
                     |  'intersection' | 'complement'
dataOp               := 'union' | 'intersection' | 'complement'
```

## Next Steps

- Learn about [Base Interactions](base-interactions.md) -- the built-in primitives
- Understand the [Operator](operators.md) system
- See how [Definitions](definitions.md) organize code hierarchically
