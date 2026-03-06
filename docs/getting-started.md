# Getting Started

This guide walks you through installing the LIDL toolchain, writing your first program, and compiling it to JavaScript.

## Prerequisites

LIDL requires **Node.js v4.0.0 or later**. Download it from [nodejs.org](https://nodejs.org/en/download/stable/) if you don't have it installed.

Verify your installation:

```bash
node --version
```

## Installation

### Command-Line Compiler

Install the LIDL CLI globally to get the `lidl` command:

```bash
npm install lidl-cli -g
```

### Library

To use LIDL programmatically in a Node.js project:

```bash
npm install lidl-core
```

## Your First LIDL Program

Create a file called `hello.lidl`:

```lidl
interaction
  (hello):Number out
is
  (5)
```

This defines an interaction named `hello` that outputs the number `5`.

Compile it to JavaScript:

```bash
lidl -i hello.lidl -o hello.js
```

The generated `hello.js` file contains a `transitionFunction` and an `initializationFunction` that implement your interaction as a step-based system.

## A More Interesting Example

Create `addone.lidl`:

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

This interaction:

1. Declares an interface with a `Number` input (`theNumber`) and a `Number` output (`theResult`)
2. Defines a native JavaScript function `addOne` (provided in the header file)
3. Wires the input through the function to produce the output

Compile it:

```bash
lidl -i addone.lidl -o addone.js
```

### Custom Header Files

Native JavaScript functions referenced in LIDL code (like `addOne` above) must be defined in a **header file**. LIDL ships with a default header containing common functions. To use your own:

```bash
lidl -i addone.lidl -o addone.js -h myheader.js
```

The header file is plain JavaScript that defines functions used by your LIDL program. For example:

```javascript
var addOne = function(_) {
  if (_ !== null && _ !== undefined)
    return _ + 1;
  else
    return null;
};
```

## Using the Library API

You can also compile LIDL programmatically:

```javascript
var Lidl = require('lidl-core');

var code = 'interaction (hello):Number out is (5)';
var header = Lidl.examples.header;

Lidl.compiler.simpleCompile(code, header, function(jsCode) {
  console.log(jsCode);
});
```

The `simpleCompile` function takes three arguments:

1. **code** -- a string of LIDL source code
2. **header** -- a string of JavaScript function definitions
3. **callback** -- a function that receives the generated JavaScript

## Next Steps

- Learn about [Interactions](concepts/interactions.md), the central concept of LIDL
- Explore the [type system](concepts/data-types.md) and [interfaces](concepts/interfaces.md)
- See more [examples](examples/index.md) of increasing complexity
- Read the full [language reference](language-reference/syntax.md)
