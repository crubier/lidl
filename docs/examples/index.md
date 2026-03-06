# Examples

This page presents annotated LIDL programs, progressing from simple to complex. Each example includes the source code, an explanation, and a trace showing its runtime behavior.

## 1. Simple Passthrough

The simplest useful interaction -- passes a number from input to output unchanged.

```lidl
interaction
  (main):{theNumber:Number in, theResult:Number out}
is
  ({
    theNumber:((x)?)
    theResult:((x)!)
  })
```

**How it works:**

- The interface has one input (`theNumber`) and one output (`theResult`)
- The body is a composition with two fields
- `((x)?)` writes the input value into identifier `x`
- `((x)!)` reads from identifier `x` and provides it as output
- The net effect: `theResult` always equals `theNumber`

**Trace:**

| Step | theNumber (in) | theResult (out) |
|------|---------------:|----------------:|
| 1    | 50             | 50              |
| 2    | 78             | 78              |
| 3    | null           | null            |
| 4    | 42             | 42              |

## 2. Interaction with Arguments

An interaction that takes a parameter and returns it directly.

```lidl
interaction
  (bob(a:Number in)):Number out
is
  (a)
```

**How it works:**

- The signature declares a parameter `a` of type `Number in`
- The body simply returns `a`
- When invoked as `(bob(42))`, the argument `42` is substituted for `a`

**Trace:**

| Step | Arg `a` | Output |
|------|--------:|-------:|
| 1    | 28      | 28     |
| 2    | 2       | 2      |
| 3    | 3       | 3      |
| 4    | 6       | 6      |

## 3. Function Application

Applies a native JavaScript function to transform input.

```lidl
interaction
  (bob):{theNumber:Number in, theResult:Number out}
with
  interaction (add one):{Number->Number} out is (function addOne)
is
  (
    ({
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
    with behaviour
    (apply (add one) to ((theNumber)!) and get ((theResult)?))
  )
```

**How it works:**

- Defines a native function interaction `(add one)` wrapping JavaScript's `addOne`
- The body has two layers:
  - A **composition** exposing the interface through identifiers
  - A **behaviour** that applies the function, reading from `theNumber` and writing to `theResult`
- `apply (f) to (x) and get (y)` is the function application base interaction

**Trace:**

| Step | theNumber (in) | theResult (out) |
|------|---------------:|----------------:|
| 1    | 50             | 51              |
| 2    | 78             | 79              |
| 3    | null           | null            |
| 4    | 42             | 43              |

When input is `null`, the function returns `null` (inactive propagation).

## 4. Two-Input Composition

Applies a function with two inputs.

```lidl
interaction
  (bob):{theNumber:Number in, theOther:Number in, theResult:Number out}
with
  interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
is
  (
    ({
      theNumber:((x)?)
      theOther:((y)?)
      theResult:((z)!)
    })
    with behaviour
    (apply (addition) to ({a:((x)!) b:((y)!)}) and get ((z)?))
  )
```

**How it works:**

- Two number inputs are combined into a compound argument `{a:..., b:...}`
- The `addition` function receives both and produces a single output
- The record `{a:((x)!) b:((y)!)}` is a composition that reads from two identifiers and builds a compound value

**Trace:**

| Step | theNumber | theOther | theResult |
|------|----------:|---------:|----------:|
| 1    | 50        | 50       | 100       |
| 2    | 78        | 2        | 80        |
| 3    | null      | 50       | null      |
| 4    | 42        | 12       | 54        |

## 5. Previous (State Across Time)

Uses the `previous` base interaction to access values from the prior time step.

```lidl
interaction
  (main):{theNumber:Number in, theResult:Number out}
is
  (
    ({
      theNumber:((x)?)
      theResult:((y)!)
    })
    with behaviour
    (((y)?) = previous ((x)!))
  )
```

**How it works:**

- `previous ((x)!)` retrieves the value of `x` from the previous time step
- On the first step, there is no previous value, so the result is `null`
- The affectation `((y)?) = previous ((x)!)` stores the previous value into `y`

**Trace:**

| Step | theNumber (in) | theResult (out) | Explanation |
|------|---------------:|----------------:|-------------|
| 1    | 50             | null            | No previous step |
| 2    | 78             | 50              | Previous theNumber was 50 |
| 3    | null           | 78              | Previous theNumber was 78 |
| 4    | 42             | null            | Previous theNumber was null |
| 5    | 67             | 42              | Previous theNumber was 42 |

## 6. Definition of Previous (Wrapping a Primitive)

The `previous` base interaction can be wrapped in a named definition for reuse.

```lidl
interaction
  (bob):{theNumber:Number in, theResult:Number out}
with
  interaction
    (previous (x:Number in)):Number out
  is
    (
      ((the previous(x))!)
      with behaviour
      (((the previous(x))?) = previous (x))
    )
is
  ({
    theNumber:((x)?)
    theResult:(previous((x)!))
  })
```

**How it works:**

- The sub-definition wraps the `previous` base interaction with identifiers
- `(the previous(x))` is a parameterized identifier -- each different `x` gets its own storage
- The body uses the named `(previous ...)` interaction instead of the raw base interaction
- The behavior is identical to example 5

## 7. Literals

Number literals can be used directly in computations.

```lidl
interaction
  (ok literal):Number out
with
  interaction
    ((a:Number in) + (b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (((#(a)+(b))!) with behaviour ((addition)({a:(a)b:(b)})=((#(a)+(b))?)))
is
  ((9)+(9))
```

**How it works:**

- Defines a `+` operator using the addition function
- The body `((9)+(9))` applies the `+` operator to two literal nines
- The result is always 18 regardless of the time step

**Trace:**

| Step | Output |
|------|-------:|
| 1    | 18     |
| 2    | 18     |
| 3    | 18     |

## 8. If-Then-Else

Conditional control flow using `when`/`if` patterns.

```lidl
interaction
  (test (t:Number in)):Number out
with
  interaction
    ((u:Number in)==(v:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean} out is (function isEqual)
  is
    (
      ((result of (u)==(v))!)
      with behaviour
      (apply (is equal) to ({a:(u),b:(v)}) and get ((result of (u)==(v))?))
    )

  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}} out
      is (function whenThenElse)
  is
    (
      ((activation of when (cond) then (a) else (b))?)
      with behaviour
      (
        apply (whenThenElse)
        to ({cond:(cond) source:((activation of when (cond) then (a) else (b))!)})
        and get ({a:(a) b:(b)})
      )
    )

  interaction
    (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out
  is
    (
      ((result of if (cond) then (x) else (y))?)
      with behaviour
      (
        when (cond)
        then (((result of if (cond) then (x) else (y))!) = (x))
        else (((result of if (cond) then (x) else (y))!) = (y))
      )
    )
is
  (if((t)==(1)) then (3) else (4))
```

**How it works:**

- Three building-block definitions: equality `==`, conditional activation `when/then/else`, and value selection `if/then/else`
- The `when` interaction splits activation into two branches based on a boolean condition
- The `if` interaction uses `when` to choose which value to assign
- The body tests whether argument `t` equals `1`: if so output `3`, otherwise `4`

**Trace:**

| Step | Arg `t` | Output |
|------|--------:|-------:|
| 1    | 0       | 4      |
| 2    | 1       | 3      |
| 3    | 2       | 4      |
| 4    | 3       | 4      |

## 9. Stateful Variable (Make Flow)

A pattern for maintaining mutable state across time steps.

```lidl
interaction
  (bob):{theNumber:Number in, theResult:Number out}
with
  -- ... (definitions for previous, not, is active, +, init,
  --      all, fallback, ==, when/then/else, if/then/else)

  interaction
    (make (x:Number ref) flow initially from (y:Number in)):Activation in
  is
    (
      ((x)?) = (
                  ((new (x))!)
                  fallback to
                  (if (init) then (y) else (previous ((x)!)))
                )
    )
is
  (
    ({
      theNumber:((new (y))?)
      theResult:((y)!)
    })
    with behaviour
    (make (y) flow initially from (1))
  )
```

**How it works:**

- `make (x) flow initially from (y)` is a reusable pattern for stateful variables
- On the first step, `x` takes the initial value `y`
- On subsequent steps, `x` takes either a newly provided value (`new (x)`) or falls back to its previous value
- The `init` interaction returns `true` only on the first step
- `fallback to` returns the first active value (like a null coalescing operator)

**Trace:**

| Step | theNumber (in) | theResult (out) | Explanation |
|------|---------------:|----------------:|-------------|
| 1    | null           | 1               | Initial value is 1 |
| 2    | null           | 1               | No new value, keeps 1 |
| 3    | 78             | 78              | New value provided |
| 4    | null           | 78              | Falls back to previous |
| 5    | 67             | 67              | New value provided |

## 10. Abstract UI (Increment/Decrement Widget)

A complete interactive widget with buttons, state, and display.

```lidl
interaction
  (my abstract Interface):{
    valueLabel:{text:Text out},
    valueManipulation:{
      incrementButton:{text:Text out, click:Activation in},
      decrementButton:{text:Text out, click:Activation in}
    }
  }
with
  -- ... (standard library definitions)

  interaction
    (button displaying (theText:Text in)
     triggering (action:Activation out)):{text:Text out, click:Activation in}
  is
    ({text:(theText), click:(action)})

  interaction
    (increment decrement widget setting (theOutputValue:Number out)):
      {incrementButton:..., decrementButton:...}
  is
    (
      ({
        incrementButton:(button displaying ("+") triggering (...increment logic...))
        decrementButton:(button displaying ("-") triggering (...decrement logic...))
      })
      with behaviour
      (all
        (make (theValue of ...) flow initially from (0))
        ((theOutputValue) = ((theValue of ...)!))
      )
    )

is
  ({
    valueLabel:(label displaying number ((theValue)!))
    valueManipulation:(increment decrement widget setting ((theValue)?))
  })
```

**How it works:**

- The interface describes an abstract UI with a label and two buttons
- Clicking the increment button adds 1 to a stored counter
- Clicking the decrement button subtracts 1
- The label displays the current counter value as text
- State is maintained across steps using `make ... flow initially from (0)`

**Trace:**

| Step | Label | +Click | -Click |
|------|------:|:------:|:------:|
| 1    | "0"   | --     | --     |
| 2    | "0"   | --     | --     |
| 3    | "1"   | Yes    | --     |
| 4    | "2"   | Yes    | --     |
| 5    | "2"   | --     | --     |
| 6    | "1"   | --     | Yes    |

## Summary

These examples demonstrate the key patterns in LIDL:

| Pattern | Examples | Key Mechanism |
|---------|----------|---------------|
| Data passthrough | 1, 2 | Identifiers (`!` / `?`) |
| Function application | 3, 4 | `apply ... to ... and get ...` |
| State across time | 5, 6 | `previous` |
| Conditional logic | 8 | `when`/`if` with `affectation` |
| Persistent state | 9 | `make ... flow initially from` |
| Interactive UI | 10 | All of the above combined |

Each pattern builds on simpler ones, and the composition mechanism lets you create increasingly complex systems from well-understood primitives.
