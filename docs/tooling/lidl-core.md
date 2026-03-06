# lidl-core

`lidl-core` is the JavaScript library that provides the parser, compiler, and runtime for LIDL programs. It is the foundation used by both the [CLI compiler](lidl-cli.md) and the interactive sandbox.

## Installation

```bash
npm install lidl-core
```

Requires Node.js >= v4.0.0.

## Quick Start

```javascript
var Lidl = require('lidl-core');

var code = 'interaction (bob):Number out is (5)';
var header = Lidl.examples.header;

Lidl.compiler.simpleCompile(code, header, function(jsCode) {
  console.log(jsCode);
});
```

## API Reference

### Module Exports

```javascript
var Lidl = require('lidl-core');
```

The module exports these namespaces:

| Export | Description |
|--------|-------------|
| `Lidl.parser` | PEG.js parser for LIDL source code |
| `Lidl.compiler` | High-level compilation functions |
| `Lidl.graphCompiler` | Graph-based compilation pipeline |
| `Lidl.runner` | Runtime execution engine |
| `Lidl.interfaces` | Interface manipulation utilities |
| `Lidl.interactions` | Interaction manipulation utilities |
| `Lidl.data` | Data type utilities |
| `Lidl.identifiers` | Identifier manipulation utilities |
| `Lidl.serializer` | AST-to-string serialization |
| `Lidl.operator` | Operator pattern parser |
| `Lidl.graph` | Graph data structure |
| `Lidl.config` | Configuration constants |
| `Lidl.examples` | Built-in example programs and default header |

### Parser

```javascript
var ast = Lidl.parser.parse(sourceCode);
```

Parses a string of LIDL source code into an abstract syntax tree (AST). Returns an array of top-level definitions.

The AST uses these node types:

| Node Type | Description |
|-----------|-------------|
| `InteractionDefinition` | An interaction definition with signature, body, and sub-definitions |
| `InteractionSimple` | An interaction expression with operator and operands |
| `InteractionSignature` | The signature of an interaction definition |
| `InterfaceAtomic` | An atomic interface (data type + direction) |
| `InterfaceComposite` | A composite interface (record of interfaces) |
| `InterfaceNamed` | A reference to a named interface |
| `InterfaceOperation` | An interface operation (conjugation, etc.) |
| `DataAtomic` | An atomic data type |
| `DataComposite` | A compound data type |
| `DataArray` | An array data type |
| `DataFunction` | A function data type |
| `DataOperation` | A data type operation (union, etc.) |

### Compiler

```javascript
Lidl.compiler.simpleCompile(code, header, callback);
```

**Parameters:**

- `code` (string) -- LIDL source code
- `header` (string) -- JavaScript function definitions used by the program
- `callback` (function) -- receives the generated JavaScript source code as a string

The generated code exports two functions:

- `transitionFunction(data)` -- executes one step of the interaction
- `initializationFunction(data)` -- creates the initial state

### Graph Compiler

```javascript
var graph = Lidl.graphCompiler.compile(ast, header, callbacks);
```

The lower-level compilation API that exposes the full graph transformation pipeline. The `callbacks` object lets you inspect the graph at each stage:

```javascript
var callbacks = {
  addOperatorTypeAnnotation: function(graph, data) {
    console.log('After operator annotation:', data.stage);
    return true;  // return true to continue, false to stop
  },
  getJsCode: function(graph, data) {
    console.log('Generated code:', data.source);
    return true;
  },
  error: function(graph, data) {
    console.error('Compilation error:', data.error);
    return false;
  }
};
```

Each callback receives the current graph and metadata, and must return a boolean (`true` to continue compilation, `false` to stop).

### Runner

```javascript
var trace = Lidl.runner.run(compiledCode, scenario);
```

Executes a compiled LIDL program on a sequence of inputs (a scenario) and returns the trace.

**Parameters:**

- `compiledCode` -- the output of the graph compiler (with `partialSource`)
- `scenario` -- an array of step objects, each with `inter` (interface values) and `args` (arguments)

**Returns:** an array of trace entries, one per step, each containing:

- `inter` -- the interface values after processing
- `args` -- the arguments
- `state` -- the internal state after this step
- `memo` -- memoization data

### Interfaces

Utility functions for working with interface specifications:

```javascript
// Flip all directions (in<->out)
Lidl.interfaces.conjugateInterface(interfaceObj);

// Force all directions to 'in'
Lidl.interfaces.receptionInterface(interfaceObj);

// Force all directions to 'out'
Lidl.interfaces.emissionInterface(interfaceObj);

// Move directions outward where possible
Lidl.interfaces.globalisationInterface(interfaceObj);

// Move directions inward (expand compound types)
Lidl.interfaces.localisationInterface(interfaceObj);

// Get the flat list of atomic interfaces
Lidl.interfaces.listOfAtoms(interfaceObj, prefix);

// Check if two interfaces are compatible (complementary types)
Lidl.interfaces.isCompatible(int1, int2);

// Merge two partial interfaces into one
Lidl.interfaces.mergeInterface(int1, int2);

// Get the sub-interface for a given field name
Lidl.interfaces.subInterface(interfaceObj, fieldName);

// Check if interface is purely 'in', purely 'out', or mixed
Lidl.interfaces.madeOnlyOf(interfaceObj);
```

### Interactions

Utility functions for working with interaction expressions:

```javascript
// List all operator strings in an expression
Lidl.interactions.listOfInteractions(interaction);

// Check if an interaction is a base interaction
Lidl.interactions.isBaseInteraction(interaction);

// Check if only base interactions are used (fully expanded)
Lidl.interactions.isOnlyMadeOfBaseInteractions(interaction);

// List all non-base interactions (need expansion)
Lidl.interactions.listNonBaseInteractions(interaction);

// Compare two interactions (0 = equal)
Lidl.interactions.compare(a, b);

// Replace a target interaction with a substitute
Lidl.interactions.substituteInInteraction(interaction, target, substitute);

// Expand one definition into an interaction
Lidl.interactions.instantiate(interaction, definition);

// Fully expand all definitions
Lidl.interactions.expand(interactionDefinition);

// Find the definition matching an interaction in scope
Lidl.interactions.findMatchingDefinition(interaction, contextDefinition);
```

### Serializer

```javascript
// Convert an AST node back to LIDL source code
var source = Lidl.serializer.serialize(astNode);

// Compact single-line serialization of an interaction
var compact = Lidl.serializer.serializeInteractionSimpleRow(interaction);
```

### Operator Parser

```javascript
// Classify an operator string
var type = Lidl.operator.parse(operatorString);
// Returns: "Composition", "Behaviour", "Previous", "FunctionApplication",
//          "Affectation", "Reference", "CoReference", "Identifier",
//          "Function", "Activation", "Boolean", "Number", "Text",
//          "Custom", or "Void"
```

### Data

```javascript
// Check if a data type specification is valid
Lidl.data.isValidData(dataObj);

// Compute a data type operation (union, intersection)
Lidl.data.computeData(dataObj);

// Compare two data types for structural equality
Lidl.data.compareData(data1, data2);
```

### Examples

The `examples` namespace provides built-in example programs and the default header:

```javascript
// The default JavaScript header with standard functions
Lidl.examples.header;

// Array of example programs
Lidl.examples.lidl;
// Each entry: { name, fileName, code, scenario }
```

The default header includes functions like `isActive`, `addition`, `substraction`, `multiplication`, `division`, `boolNot`, `boolAnd`, `boolOr`, `ifThenElse`, `whenThenElse`, `all`, `identity`, `isEqual`, `fallback`, `toString`, and several UI-related functions.

## Next Steps

- Learn how to use the [CLI compiler](lidl-cli.md)
- Understand the [Compilation Pipeline](compilation-pipeline.md) in detail
- See [Examples](../examples/index.md) of LIDL programs
