# lidl-cli

`lidl-cli` is the command-line compiler for LIDL. It reads a `.lidl` source file and produces a JavaScript file containing the compiled transition and initialization functions.

## Installation

Install globally to get the `lidl` command:

```bash
npm install lidl-cli -g
```

Requires Node.js >= v4.0.0.

## Usage

```bash
lidl -i <input.lidl> -o <output.js> [-h <header.js>]
```

### Options

| Option | Alias | Required | Description |
|--------|-------|:--------:|-------------|
| `-i` | `--input` | Yes | Path to the input LIDL source file |
| `-o` | `--output` | Yes | Path for the generated JavaScript output file |
| `-h` | `--header` | No | Path to a custom JavaScript header file |
| `--help` | | No | Show help information |

### Basic Compilation

```bash
lidl -i myProgram.lidl -o myProgram.js
```

This compiles `myProgram.lidl` using the **default header** (which includes standard functions like `addition`, `isActive`, `boolNot`, etc.) and writes the result to `myProgram.js`.

### Custom Header

```bash
lidl -i myProgram.lidl -o myProgram.js -h myFunctions.js
```

Use a custom header file when your LIDL program references native JavaScript functions beyond the standard set. The header file is plain JavaScript that defines any functions used in `(function name)` interactions.

## Output Format

The generated JavaScript file contains two functions:

### `transitionFunction(data)`

Executes one step of the LIDL interaction. The `data` parameter is an object with:

- `inter` -- the interface values (inputs from the environment)
- `state` -- the internal state (from the previous step)
- `memo` -- memoization data
- `args` -- arguments passed to the interaction

Returns an object with the same structure, containing the updated values after processing.

### `initializationFunction(data)`

Creates the initial state for the interaction. Returns an object with empty `memo`, initial `state` (all state variables set to `null`), empty `args`, and empty `inter`.

### Using the Output

```javascript
var program = require('./myProgram.js');

// Initialize
var data = program.initializationFunction();

// Run steps
data.inter = { theNumber: 42 };  // provide inputs
data = program.transitionFunction(data);
console.log(data.inter.theResult);  // read outputs

// Next step
data.inter = { theNumber: 78 };
data = program.transitionFunction(data);
console.log(data.inter.theResult);
```

## The Default Header

When no `-h` option is provided, the compiler uses a built-in header that defines these standard functions:

| Function | Type | Description |
|----------|------|-------------|
| `isActive` | `Any -> Boolean` | Checks if a value is not null/undefined |
| `identity` | `Any -> Any` | Returns the input unchanged |
| `addition` | `{a:Number, b:Number} -> Number` | Sum of two numbers |
| `substraction` | `{a:Number, b:Number} -> Number` | Difference of two numbers |
| `multiplication` | `{a:Number, b:Number} -> Number` | Product of two numbers |
| `division` | `{a:Number, b:Number} -> Number` | Quotient of two numbers |
| `remainder` | `{a:Number, b:Number} -> Number` | Modulo of two numbers |
| `power` | `{a:Number, b:Number} -> Number` | Power of two numbers |
| `addOne` | `Number -> Number` | Adds 1 to a number |
| `isEqual` | `{a:Number, b:Number} -> Boolean` | Equality comparison |
| `boolNot` | `Boolean -> Boolean` | Boolean negation |
| `boolAnd` | `{a:Boolean, b:Boolean} -> Boolean` | Boolean AND |
| `boolOr` | `{a:Boolean, b:Boolean} -> Boolean` | Boolean OR |
| `boolXor` | `{a:Boolean, b:Boolean} -> Boolean` | Boolean XOR |
| `ifThenElse` | `{cond:Boolean, a:T, b:T} -> T` | Conditional value selection |
| `whenThenElse` | `{cond:Boolean, ...} -> {a:Activation, b:Activation}` | Conditional activation split |
| `all` | `T -> {a:T, b:T, ...}` | Broadcast value to multiple outputs |
| `fallback` | `{a:T, b:T} -> T` | Return first active value |
| `toString` | `Any -> Text` | Convert to string |

All standard functions handle inactive (null) inputs by returning inactive outputs.

## Writing Custom Header Functions

A header function should:

1. Accept a single argument (use a record for multiple inputs)
2. Handle inactive (null/undefined) inputs gracefully
3. Return inactive (null) when inputs are inactive

Example:

```javascript
var myFunction = function(_) {
  if (_ !== null && _ !== undefined) {
    return _.a * _.a + _.b * _.b;
  } else {
    return null;
  }
};
```

Reference this function in LIDL as:

```lidl
interaction (myFunction):{{a:Number, b:Number}->Number} out
  is (function myFunction)
```

## Error Handling

If compilation fails, the CLI prints an error message in red and exits:

```
Lidl Compiler
Compiling input.lidl
Error: cannot find definition of interaction ...
```

Common errors include:

- Missing definition for a custom interaction
- Incompatible interfaces being connected
- Invalid syntax in the LIDL source

## Next Steps

- Learn about the [lidl-core library API](lidl-core.md) for programmatic usage
- Understand the [Compilation Pipeline](compilation-pipeline.md) that runs behind the scenes
- See [Examples](../examples/index.md) of LIDL programs to compile
