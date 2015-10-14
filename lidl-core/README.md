
[![Travis](https://img.shields.io/travis/crubier/iii.svg?style=flat-square)]()
[![Gemnasium](https://img.shields.io/gemnasium/crubier/iii.svg?style=flat-square)]()
[![Code Climate](https://img.shields.io/codeclimate/github/crubier/iii.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/iii.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dm/iii.svg?style=flat-square)]()



# III.js




A simple language to describe interactive systems.

http://crubier.github.io/iii

Programming languages are nice for **computations**. However, describing interactions with programming languages is **painful**. We need a language for **interactions**. That is what III is for.

Forget about programming, just describe interactions and let III do the rest.

This document contains the following sections:

- [Tutorial](#tutorial)
- [Base Interactions semantics](#base-interactions-semantics)
- [Advanced Interactions semantics](#advanced-interactions-semantics)
- [Example](#example)

## Tutorial

This tutorial will cover the basic features of the III Language:

- [Focus on interactions](#focus-on-interactions)
- [Simple syntax](#simple-syntax)
- [Synchronous execution](#synchronous-execution)
- [Interaction activation](#interaction-activation)  
- [Emissions and Receptions](#emissions-and-receptions)
- [Base data types](#base-data-types)
- [Complex data types](#complex-data-types)

### Focus on interactions

A III system represent one *interaction*. An *interaction* can be composed of several simpler *interactions*. This means that any III system is a composition of *interactions*. In fact, in III, pretty much everything is an interaction. Conditionals, assignments, variables... Everything is represented as *interactions*.

#### Rationale

Since we want to describe interactive systems, the only entity that adds value to the description is the interaction. We are interested only in aspects relevant to the *interaction* of systems. The details of the *computations* are not relevant for our purpose, so they are defered to other languages.

### Simple syntax

Thanks to the over-use of parentheses, the expression grammar of III is really simple:

expression  :=   '(' element* ')'
element     :=   expression | identifier
identifier  :=   anything without parentheses

Said simply, an expression is a sequence of identifiers and sub-expressions, enclosed in parentheses. Here is an example expression in III:

( when (anEvent) do ( (this) and (that) ) )

But, you ask, how do we know which operator an expression refers to? Well, this is simple: the name of the operator of an expression is the concatenation of its identifiers, with sub-expressions replaced by `$`. `$` stands for *"something"*. For example the expression `((a)+(b))` uses the operator `$+$`, pronounced *"something plus something"*.

To make a parallel with a more classical way to represent expressions, the above expression would usually be represented as :

```
when$do$(anEvent,$and$(this,that))
```

#### Rationale

Why such an unusual syntax ?

First, the resulting syntax is very general, and similar to natural language, just with a lot of additional parentheses. These parentheses are made invisible when editing the code in an appropriate IDE, which makes reading III as easy as reading natural language.

There is only one syntax for all: All these *prefix* operators like `!a`, *infix* operators like `a + b`, *postfix* operators like `i++`, *named* operators like `sin(x)` are represented the same way. This should hopefully make III easier to understand for beginnners.

Finally, this syntax takes the current evolution of programming languages to its logical conclusion. For example, it generalizes the notion of *Named function parameters* as used in Apple's *Swift Programming Language*, and in Microsoft's *C#*. Javascript developpers also use *argument maps* instead of *positional arguments*. Here is a table comparing different programming languages:

| Language      | Expression                                                              |
|:--------------|:------------------------------------------------------------------------|
| C, Java       | `CalculateBMI(83,185)`                                                  |
| Javascript    | `CalculateBMI({weight:83,height:185})`                                  |
| C#, Swift     | `CalculateBMI(weigth:83,height:185)`                                    |
| III (Simple)  | `(BMI (83)kg (185)cm)`                                                  |
| III (Verbose) | `(Body Mass Index of someone who weights (83) kg and is (185) cm high)` |

Note how III's syntax allows expressions to be much clearer on their semantics. For example, expected units of parameters are only expressed in III.

### Synchronous execution

III systems are synchronous. This means that interactions are evaluated at discrete points in time, all at once. For example, the expression:

( when (anEvent) do ( (output) = (5) ) )

Will be evaluated at discrete points in time, called steps. Every expression of this composed expression will be evaluated at every step. For instance, here is a simplified execution, which does **not** actually comply to the actual semantics of the language:

| Step | anEvent | output |
|:----:|:-------:|:------:|
|  0   |  `no`   |  `~`   |
|  1   |  `yes`  |  `5`   |
|  2   |  `no`   |  `~`   |
|  3   |  `yes`  |  `5`   |

#### Rationale

Synchronous execution avoids spaghetti behaviours. The state of the system is explicitly defined for each execution step. This makes reasoning about code much simpler.

Synchronous execution also makes verification much easier.

### Interaction activation

Behind the scenes, data is represented as a couples _< activation, value >_, where:

- _activation_ is a boolean.
- _value_ has a type. We will explain values and types later.

This means that every expression, every sub-expression is  actually a couple _< activation, value > _. Even the assignment, `$=$`, is a couple _< activation, value>_.

An interaction's _activation_ represents the fact that the interaction exists and is active at a point in time, or not. For example, if an interaction represents an event, then it will only be activated when the event happens. As another example, the assignment interaction `$=$` is only effective when its _activation_ is _true_. If an interaction's _value_ is not defined anywhere, then its _activation_ is _false_.

If an interaction activation is false, we write its value as **~**. Here is a table showing a few examples:


| Couple                           | Notation |
|:---------------------------------|:---------|
| $ \langle \top, 0 \rangle$       | `0`      |
| $ \langle \top, 1 \rangle $      | `1`      |
| $ \langle \top, \top \rangle $   | `true`   |
| $ \langle \top, "text" \rangle $ | `"text"` |
| $ \langle \bot, 0 \rangle $      | `~`      |
| $ \langle \bot, 3 \rangle $      | `~`      |
| $ \langle \bot, "text" \rangle $ | `~`      |
| $ \langle \bot, \top \rangle $   | `~`      |


#### Rationale

In previous approaches, and in some other languages, a difference is made between *events* and *flows*, which are considered as two different first-class entities.

In these approaches, *events* represent data defined at discrete points in time, while *flows* represent data defined on continuous time intervals. But when we think about it, the only difference between an *event* and a *flow* lies in the domain of the *time → value* function. For *events* this set is discrete. For *flows* this set is continuous.

The logical conclusion of this remark is that the merger of these two concepts needs to include the indicator function of the domain of the *time → value* function. This indicator function is the `activation`, while the *time → value* function is the `value`.

### Emissions and Receptions

Interactions can represent *reception* of data, they are then called `reception`. Receptions are really similar to functions in other programming languages. Like functions, they take data in, compute and *return* a value, without side effect. Receptions are the things which are on the right-hand side of assignments.

Interactions can also represent *emission* of data, they are then called `emission`. Emissions are the opposite of receptions. As a consequence, experienced coders struggle to understand emissions at first. The data flow in emissions is the exact opposite of the data flow in receptions. Instead of *returning* a value, receptions are *given* a value; instead of being *given* arguments values, emissions *return* values for their arguments. Emissions are the things which are on the left-hand side of assignments.

Some interactions represent both *reception* and *emission* are just called `interaction`. They can emit and receive data. Typically, only state variables are `interactions`. Inputs of the system are `receptions` and outputs are `emissions`. But `emissions` are not necessarily `outputs`, and `receptions` are not necessarily `inputs`. They can be internal.

As a first example, look at the following interaction:

( when (anEvent) : ( (theOutput) = (5) ) )

In this interaction, `anEvent` is a `reception`, while `theOutput` is an `emission`. But that is not all ! Remember, everything is an interaction ! Here is the complete table of interactions of this example:

|                 Interaction                  |   Type   |    Kind     |  Operator   |
|:--------------------------------------------:|:--------:|:-----------:|:-----------:|
|                 `(anEvent)`                  |  `void`  | `reception` |  `anEvent`  |
|                    `(5)`                     | `number` | `reception` |     `5`     |
|                `(theOutput)`                 | `number` | `emission`  | `theOutput` |
|            `((theOutput) = (5))`             |  `void`  | `emission`  |    `$=$`    |
| `( when (anEvent) : ( (theOutput) = (5) ) )` |  `void`  | `emission`  |  `when$:$`  |

#### Rationale

Again, this language feature is taking evolutions of languages to its natural conclusion.
Here is a table presenting the evolution of how different programming languages treat assignments:

| Language |              Expression              |                                                       Remark                                                       |
|:--------:|:------------------------------------:|:------------------------------------------------------------------------------------------------------------------:|
| Assembly |      `cpy res, a; add res, b;`       |                                        Expressions cannot be nested at all                                         |
| C, Java  |        `res = a + ( b * c );`        |       Arbitrary expressions on the right hand side of assignment, only variable names on the left hand side        |
|  JS ES6  |       `{ x, y } = f(a,(b+c));`       | Arbitrary expressions on the right hand side of assignment, restricted subset of expressions on the left hand side |
|   III    | `( ( (x) or (y) ) = ( (a) + (b) ) )` |                               Arbitrary expressions on both sides of the assignment                                |

This shows that the *emission* / *reception* paradigm is a generalisation of current evolutions of programming languages, such as the destructuring assignment.

### Base data types

There are few different base types:

| Type      | Description                                                | Example literals                 |
|:----------|:-----------------------------------------------------------|:---------------------------------|
| `void`    | Bottom type, carries no data except activation information | `active`, `~`                    |
| `boolean` | When active it can be either true or false                 | `true`,`false`, `~`              |
| `number`  | Can be an integer or a float                               | `0`,`1.`,`13.37`,`-42`, `~`      |
| `text`    | Any sequence of unicode characters                         | `"foo"`, `"this is a text"`, `~` |

#### Rationale

Do we need more ? The user can always define custom enumerated types, so we should be ok like that. Booleans are not even necessary.

### Complex data types

There are different constructions for complex types:

| Type                               | Description                                                                     | Example type                                   |
|:-----------------------------------|:--------------------------------------------------------------------------------|:-----------------------------------------------|
| `[ <type1>, <type2> ]`             | Tuples are combinations of a fixed number of different types in a certain order | `[boolean,number,number]`, `[number,text]`     |
| `{ name1:<type1>, name2:<type2> }` | Objects are tuples whose elements are identified by name instead of position    | `{x:number,y:number}`,`{id:text,value:number}` |

The following complex data types may one day be implemented in III:

| Type                           | Description                                                                                     | Example type                                               |
|:-------------------------------|:------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|
| `[ <type1>... ]`               | **(Not implemented)** Arrays are combinations of variable number of identical types             | `[number...]`,`[text...]`                                  |
| `{ <typekey>:<typevalue>... }` | **(Not implemented)** Maps are arrays whose elements are identified by name instead of position | `{text:number...}`,`{number:text...}`                      |
| `[ <type1> or <type2> ]`       | **(Not implemented)** Unions are tuples with only one value active at a time                    | `[ text or number ]`, `[ {x:number, y:number} or number ]` |
| `[  <type1> → <type2> ]`       | **(Not implemented)** Pure functions with domain type1, codomain type2, and no side effects     | `[number → text]`, `[void → number]`                       |

#### Tuples

For each Tuple type, a set of emissions and receptions are defined. For example, the type:

data myType : [ <type1>, <type2> ]

Will generate the following emissions and receptions, lazily at compile-time:

- Decomposing receptions (example use: `x = a[1]`)
- `<type1> reception ( (myType reception x) [1] )`
- `<type2> reception ( (myType reception y) [2] )`
- Decomposing emissions (example use: `a[1] = x`)
- `<type1> emission ( (myType emission x) [1] )`
- `<type2> emission ( (myType emission y) [2] )`
- Composing receptions : (example use: `a = [x,y]`)
- `myType reception ( [ (<type1> reception x) , (<type2> reception y) ] )`
- Composing emissions : (example use: `[x,y] = a`)
- `myType emission ( [ (<type1> emission x) , (<type2> emission y) ] )`

These definitions allow to write such things:

[ a, [b, c] ] = [ 3, [4, 5] ]

Which is equivalent to:

a = 3; b = 4; c = 5;

#### Objects

Similarly, objects are interactions, so they can be received and emitted

{ weight:a, height:b } = { weight:83, height:184 }

is equivalent to:

a = 83; b = 184;

Any composition of complex types is an interaction, so this is possible:

[{name:nameOfTheHeaviest,weight:maxWeight},...] = ( sort by weight ([{name:"toto",weight:50},{name:"titi",weight:75}]) )

is equivalent to:

nameOfTheHeaviest="titi"; maxWeight=75;

#### Rationale

Interaction involve exchange of complex data. Complex data should be part of the language.

In combination with other languages features, complex data types enable very expressive code.


### Data type vs Interface

Types :

- bottom type : `activation` = `{}` = `()` = `[]`
  - enumeration : `enum(literal1,literal2,literal3)`
  - boolean : `boolean`
  - number : `number`
  - text : `text`
  - tuples : `(<type1>,<type2>)`
  - structures : `{field1:<type1>,field2:<type2>}`
  - arrays : `[<type1>]`
  - unions : `|<type1>,<type2>|`
  - top type : `any` = `|<firsttype>,<secondtype>,...,<lasttype>|`


  The classical notion of data type encompass two different notions :

  - Data type of a function declaration (e.g. `float sin(float x);`) : We call it **interface** because it is the specification of the type of data that *can* be received or sent by an interaction. It does not specify the type of any actual data, but it merely gives the shape of the channel the data flows through. Channel types are not specified in most weakly typed languages. They are specified explicitely in III.
  - Data type of a variable instantiation (e.g. `int x = 2;`) : We call it **data type** because it is the specification of the type of the actual data. Data types are often specified as `var` in weakly typed languages, and redundantly declared in strongly typed language. They are specified implicitely and infered automatically in III.

  In III, data types are specified implicitely, through instantiation, while channel types are specified explicitely.

  A data type is a simple type expression.

  A channel type is a type expression, with additional information about the flow direction using `in` and `out` keywordds. Channel type is a type expression tree where the only path going from the root to any leaf crosses one and only one "in" or "out".


  #### Rationale

  Basically, don't fix the direction of dataflow ! Restrict it to AST edges to enable compositional verification, but allow it to go in both direction at the same time instead of only down (classical languages) or only up or down (iii with simple types)

  ----------------------------------------------------------------------------------------

  ## Base Interactions semantics

  ### Assignment

  #### Signature

  void emission ( (<type1> emission a) = (<type1> reception b) )

  #### Example of use

  ( (a) = (b) )

  #### Semantics

  When the assignment (`(a)=(b)`) is active, the emission (`a`) on the left is given the value returned by the reception (`b`) on the right.

  #### Truth table

| `((a)=(b))` |    `(b)`    |  `(a)`  |
|:-----------:|:-----------:|:-------:|
| **active**  | **_value_** | _value_ |
| **active**  |    **~**    |    ~    |
|    **~**    | **_value_** |    ~    |
|    **~**    |    **~**    |    ~    |

  #### Example chronogram

  | Step | `((a)=(b))` | `(b)` | `(a)`|
  |:-:|:----------:|:-----:|:-:|
| 0 |   **~**    | **4** | ~ |
| 1 |   **~**    | **5** | ~ |
| 2 | **active** | **6** | 6 |
| 3 | **active** | **7** | 7 |
| 4 | **active** | **~** | ~ |
| 5 |   **~**    | **9** | ~ |

  ### All

  #### Signature

  <type1> emission ( all (<type1> emission a) (<type1> emission b) )

  #### Example of use

  ( all (a) (b) )

  #### Semantics

  The value given to `(all(a)(b))` is given to both `(a)` and `(b)`

  #### Truth table

  | `(all(a)(b))` | `(b)` | `(a)` |
  |:-----------:|:-------:|:-------:|
| **_value_** | _value_ | _value_ |
|    **~**    |    ~    |    ~    |

  #### Example chronogram

  | Step | `(all(a)(b))` | `(a)` | `(b)`|
  |:-:|:-----:|:-:|:-:|
| 0 | **~** | ~ | ~ |
| 1 | **~** | ~ | ~ |
| 2 | **6** | 6 | 6 |
| 3 | **7** | 7 | 7 |
| 4 | **~** | ~ | ~ |
| 5 | **8** | 8 | 8 |

  ### Either

  #### Signature

  <type1> emission ( either (<type1> emission a) (<type1> emission b) )

  #### Example of use

  ( either (a) (b) )

  #### Semantics

  The value given to `(either(a)(b))` is given to either `(a)` or `(b)`

  #### Truth table

  Non deterministically choosen between the two following tables:

  | `(either(a)(b))` | `(b)` | `(a)` |
  |:-----------:|:-------:|:-:|
| **_value_** | _value_ | ~ |
|    **~**    |    ~    | ~ |


  | `(either(a)(b))` | `(b)` | `(a)` |
  |:-----------:|:-:|:-------:|
| **_value_** | ~ | _value_ |
|    **~**    | ~ |    ~    |

  #### Example chronogram

  | Step | `(either(a)(b))` | `(a)` | `(b)`|
  |:-:|:-----:|:-:|:-:|
| 0 | **~** | ~ | ~ |
| 1 | **5** | 5 | ~ |
| 2 | **6** | ~ | 6 |
| 3 | **7** | ~ | 7 |
| 4 | **~** | ~ | ~ |
| 5 | **8** | 8 | ~ |

  ### When

  #### Signature

  void emission ( when (void reception a) : (void emission b) )

  #### Example of use

  ( when (a) : (b) )

  #### Semantics

  When `(when(a):(b))` is active and `(a)` returns the active value then `(b)` is given the active value. Note how this is similar to the assignment `((b)=(a))` with `void` values.

  #### Truth table

  | `(when(a):(b))` | `(a)` | `(b)` |
  |:----------:|:----------:|:------:|
| **active** | **active** | active |
| **active** |   **~**    |   ~    |
|   **~**    | **active** |   ~    |
|   **~**    |   **~**    |   ~    |

  #### Example chronogram

  | Step | `(when(a):(b))` | `(a)` | `(b)` |
  |:-:|:----------:|:----------:|:------:|
| 0 |   **~**    | **active** |   ~    |
| 1 |   **~**    | **active** |   ~    |
| 2 | **active** | **active** | active |
| 3 | **active** | **active** | active |
| 4 | **active** |   **~**    |   ~    |
| 5 |   **~**    | **active** |   ~    |

  ### Always

  #### Signature

  void emission ( always : (void emission b) )

  #### Example of use

  ( always : (a) )

  #### Semantics

  `(always:(a))` forces `(a)` to be active, even when `(always:(a))` is given the inactive value `~`.

  #### Truth table

  | `(always:(a))` | `(a)` |
  |:----------:|:------:|::|
| **active** | active |  |
|   **~**    | active |  |

  #### Example chronogram

  | Step | `(always(a))` | `(a)` |
  |:-:|:----------:|:------:|
| 0 |   **~**    | active |
| 1 |   **~**    | active |
| 2 | **active** | active |
| 3 | **active** | active |

  ### Active

  #### Signature

  boolean reception ( active ( <type1> reception a ) )

  #### Example of use

  ( active (a) )

  #### Semantics

  When `(a)` is active, `(active(a))` returns `true`, and when `(a)` is not active, `(active(a))` returns `false`. `(active(a))` itself is always active, even when `(a)` is not.

  #### Truth table

  | `(a)` |`(active(a))` |
  |:-----------:|:-----:|
| **_value_** | true  |
|    **~**    | false |

  #### Example chronogram

  | Step | `(a)` | `(active(a))` |
  |:-:|:-----:|:-----:|
| 0 | **~** | false |
| 1 | **3** | true  |
| 2 | **4** | true  |
| 3 | **~** | false |
| 4 | **5** | true  |
| 5 | **~** | false |

  ### Previous

  #### Signature

  <type1> reception ( previous ( <type1> reception a ) )

  #### Example of use

  ( previous (a) )

  #### Semantics

  Go back in time by one step. `(previous(a))` returns what  `(a)` returned on the previous execution step.

  #### Example chronogram

  | Step | `(a)` | `(previous(a))` |
  |:-:|:-----:|:-:|
| 0 | **~** | ~ |
| 1 | **5** | ~ |
| 2 | **6** | 5 |
| 3 | **~** | 6 |
| 4 | **8** | ~ |
| 5 | **~** | 8 |

  ### Init

  #### Signature

  void reception ( init )

  #### Example of use

  ( init )

  #### Semantics

  Active only on the first step, inactive the rest of the time.

  #### Example chronogram

  | Step | `(init)` |
  |:-:|:------:|
| 0 | active |
| 1 |   ~    |
| 2 |   ~    |
| 3 |   ~    |
| 4 |   ~    |
| 5 |   ~    |

  ### Default

  #### Signature

  <type1> reception ( ( <type1> reception a ) default ( <type1> reception b ) )

  #### Example of use

  ( (a) default (b) )

  #### Semantics

  If `(a)` is active, `((a)default(b))` returns `(a)`, else it returns `(b)`.

  #### Truth table

  | `(a)` | `(b)` | `((a)default(b))` |
  |:-------------:|:-------------:|:---------:|
| **_value a_** | **_value b_** | _value a_ |
| **_value a_** |     **~**     | _value a_ |
|     **~**     | **_value b_** | _value b_ |
|     **~**     |     **~**     |     ~     |

  #### Example chronogram

  | Step |  `(a)` | `(b)` | `((a)default(b))` |
  |:-:|:-----:|:-----:|:-:|
| 0 | **~** | **0** | 0 |
| 1 | **~** | **~** | ~ |
| 2 | **3** | **~** | 3 |
| 3 | **4** | **5** | 4 |
| 5 | **~** | **2** | 2 |

  ### Flow

  #### Signature

  void emission ( flow ( <type1> interaction a ) change ( <type1> reception b ) )

  #### Example of use

  ( flow (a) change (b) )

  #### Semantics

  Flow `(a)` from time step to time step, but give it value `(b)` when `(b)` is active.

  #### Equivalent to

  (  (a) = ( (b) default (previous(a)) ) )

  #### Example chronogram

  | Step | `(flow(a)change(b))` | `(b)` | `(a)`|
  |:-:|:----------:|:-----:|:-:|
| 0 |   **~**    | **~** | ~ |
| 1 | **active** | **5** | 5 |
| 2 | **active** | **~** | 5 |
| 3 | **active** | **~** | 5 |
| 4 | **active** | **3** | 3 |
| 5 | **active** | **~** | 3 |
| 6 | **active** | **~** | 3 |
| 7 |   **~**    | **~** | ~ |

  ## Advanced Interactions semantics

  ### Apply

  Signature

  <type1> reception ( apply ( [<type2> →  <type1>] reception func ) on ( <type2> reception data ) )

  Example of use

  ( apply (func) on (a) )

  Semantic

  Returns the result of the application of a function `(func)` to data `(a)`

  Associated chronogram

  | Step | `(func)` | `(data)`| `(apply(func)on(a))` |
  |:-:|:-------:|:-----:|:------:|
| 0 |  **~**  | **0** |   ~    |
| 1 | **sin** | **0** |   0.   |
| 2 | **sin** | **2** | 0.909  |
| 3 | **sin** | **~** |   ~    |
| 4 |  **~**  | **3** |   ~    |
| 5 | **cos** | **4** | -0.653 |
| 6 | **cos** | **5** | 0.283  |
| 7 |  **~**  | **6** |   ~    |






  ----------------------------------------------------------------------------------------




  ## Example


  The speed controller application :

  (speedcontroller (alarm:boolean out) (displayedspeed:number out) (targetspeed: number out) (actualspeed:number in) (increment: activation in) (decrement: activation out) ):
  activation in :
  (all
    ((displayedspeed) = (actualspeed)),
    ((alarm)=((actualspeed)>(targetspeed))),
    ((targetspeed)=(incdec behavior(increment)(decrement)(actualspeed)(5)(30)(150)))
    )
    )



    Increment Decrement behaviour :

    (incdec behavior (inc: activation in) (dec:activation in) (actual:number in) (step:number in) (min:number in) (max:number in) ):
    number out:
    (restrict
      (
        (previous(this))
        + (step) * (1 if (inc) is active)
        - (step) * (1 if (dec) is active)
        )
        to range (min) (max)
        )


        Just a small utility function :

        (1 if (theSignal:<type> in) is active):
        number out :
        (if (active(a)) then (1) else (0))


        Ensure a value is in a range  :

        (restrict (value:number in) to range (min:number in) (max:number in)):
        number out:
        ( if ((value)>(max))
        then (max)
        else ( if ((value)<(min))
        then (min)
        else (value)
        )
        )





























        <!--





        ## Examples

        This piece of III code will be the running example of this document. It is an implementation of the TodoMVC example used to benchmark UI frameworks at [todomvc.com](todomvc.com).

        Prerequisites:

        html data: htmlelement

        htmlelement data:
        {name:text,attributes:[htmlattribute],content:[htmlelement]}

        htmlattribute data:
        {name:text,value:text}

        htmlevent data:
        {source:text,event:text,value:text}

        htmlelement reception (<(text reception name)([htmlattribute] reception attr)>()</>)

        html reception (buttonDown) : "image of a button down"
        html reception (buttonUp) : "image of a button up"

        void emission (toggle button (html emission scene) (boolean data model) (void reception click)) :
        (
        (when(click):((model)=(not(previous(model)))));
        (always:((scene)=(if(model)then(buttonDown)else(buttonUp))))
        )

        void emission (simple button (html emission scene) (void reception click)) :
        (
        (when(click):((scene)=(buttonDown)))
        (when(no(click))):((scene)=(buttonUp)))
        )

        Code:

        mode data:
        enum(all,active,completed)

        todo data:
        {name:text,completed:boolean}

        void emission (todoItem
        (todo data model)
        (html emission scene)
        (void reception changeCompletion)
        (text reception changeName)
        (void reception remove)
        ) :

        (
        (simple button (removeButton) (clickRemoveButton))
        (toggle button (completedButton) (model.completed))

        (scene=(<(div) ()> () </>));
        (when(changeCompletion):(negate ((theModel).completed)))
        (when(remove):(negate ((theModel).completed)))

        )

        html reception (todoApp
        ([todo...] interaction model)
        ):



        void emission (main (html emission scene) (event reception event)) :


        (
        ((scene) = (todoApp));
        )




        Ok test :


        // Signature are :<argument type>:<this type>:<local type>:
        // Syntax interactionName:<argument type>:<this type>:<local type>:behavior


        //WIMP component : signature is :<argtype>:{scene:out scene,event:in event}:<localtype>:

        incrementDecrement:
        {step:in number,range:in range}: // argument
        {scene:out scene, event:in event, value:out number}: //this
        {inc: event, incbutton:buton,decbutton:button }: //local
        all [
        flow  {variable:this.value,
        switch: this.value + step * 1IfActive this.event.increment - step * 1IfActive this.event.increment)
        },
        affect (this.scene,
        {name:div,content[incbutton.scene,incbutton.scene]}
        )
        ];




        button:
        {}:
        {scene:out scene, event:in event,clicked:out void}:
        {}:
        all [
        this.scene = [rectangle(...),text(...)];
        this.clicked = if {condition:this.event.type=="click",then:active,else:inactive};
        ]



        // Util

        1IfActive:
        in <type1>:

        out number:
        {}:
        when {active:argument,then:affect(this,1),else:affect(this,0)}



        //Behaviors : signature is  :<argtype>:in activation:<localtype>:

        flow:
        {variable:out <type>,switch:in <type>}:
        in activation:
        {}:
        when {active:this,
        then:when{ active:switch,
        then:affect(argument.flow,argument.switch),
        else:affect(argument.flow,previous argument.flow)
        },
        else:affect(argument.flow,inactive)
      };


      all:
      [out activation]: //argument
      in activation: //this
      {}: //local
      native

      when:
      {active:in activation, then:out activation:toVoid,dont:out activation:toVoid}:
      in activation:
      void:
      native

      toVoid:void:in activation:void:;




      incrementDecrement (
      button("increment"),
      button("decrement")
      )






      todoListWimp:
      [in todo]:
      {scene:out scene,event:in event}:
      {}:

      local.content=map(argument,);



      in activation (todoWIMP (in todo)):
      {buttonCompleted: toggleButton,nameLabel: label,buttonDelete: button}:
      {}:

      {}

      this.scene=div({},[
      local.buttonCompleted.scene,
      local.nameLabel.scene,
      local.buttonDelete.scene
      ])





      TodoMVC

      todo Data :
      {key:uuid,name:text,completed:boolean}

      event Data :
      |
      addTodo {name:text},
      updateTodo {key:text,name:text}
      completeTodo {key:uuid},
      completeAll,
      removeTodo {key:uuid}
      removeComplete {}
      |


      (todoApp) :


      {html:html out, action:action out, even:event in, todoList:todoList in} (todoListDisplay) :
      [todoDisplay] : (map (argument.todoList)          )
      {html : }


      (todoDisplay) :
      {html:html out, action:action out, even:event in, todo:todo in} : -->


      ## Project setup

      install with `npm install`

      make with `gulp`

      Locations:
      - sources in `src/`
      - tests using mocha in `test/`
      - precompiled external libraries in `lib`
      - compiled artifacts in `bin`
      - browserified stuff in `dist`
