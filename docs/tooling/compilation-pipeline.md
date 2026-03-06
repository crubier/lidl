# Compilation Pipeline

LIDL uses a **graph-based compilation** strategy. The source code is parsed into an AST, converted to a graph, transformed through a series of passes, and finally compiled into executable JavaScript. This page describes each stage of the pipeline.

## Overview

```
LIDL Source Code
      |
      v
  [Parser]           -- PEG.js grammar -> AST
      |
      v
  [AST to Graph]     -- Definitions, interactions, interfaces become graph nodes
      |
      v
  [Graph Transforms] -- ~29 transformation passes
      |
      v
  [Code Generation]  -- Graph -> JavaScript source code
      |
      v
JavaScript Output
```

## Stage 1: Parsing

The PEG.js parser transforms LIDL source code into an abstract syntax tree. The grammar handles:

- Interaction definitions with signatures, sub-definitions, and bodies
- Interface specifications (atomic, composite, named, operations)
- Data type specifications (atomic, composite, array, function, operations)
- Import statements

The parser output is an array of top-level definition nodes.

## Stage 2: AST to Graph

The AST is converted into a directed graph where:

- **Nodes** represent definitions, interactions, interfaces, and data types
- **Edges** represent relationships: containment (definition contains sub-definitions), operand relationships (interaction has operands), and type annotations

The `addDefinitionToGraph` function recursively adds the entire AST to the graph, preserving the hierarchical structure.

## Stage 3: Graph Transformations

The compiler applies a sequence of transformation passes to the graph. Each pass modifies the graph in place, progressively lowering the high-level LIDL constructs into a form suitable for code generation.

### Pass 1: Operator Type Annotation

**`addOperatorTypeAnnotation`**

Classifies every interaction's operator string into its category (Composition, Behaviour, Affectation, Previous, FunctionApplication, Reference, CoReference, Identifier, Function, Activation, Boolean, Number, Text, Void, or Custom). This annotation drives subsequent passes.

### Pass 2: Referential Transparency

**`referentialTransparency`**

Resolves scoping for identifier interactions. When the same identifier name appears in different scopes, this pass disambiguates them by adding scope-specific prefixes, ensuring each identifier refers to the correct variable.

### Pass 3: Link Interactions to Definitions

**`linkInteractionsToDefinitions`**

For each custom interaction (non-base), finds the matching definition in the scope chain. Creates edges linking each interaction to its definition, which will be used during expansion.

### Pass 4: Interface Information

**`addInterfaceInformationToInteractions`**

Propagates interface type information from definitions to their interaction instances. Each interaction node receives its expected interface specification.

### Pass 5: Expand Definitions

**`expandDefinitions`**

Inlines (expands) custom interaction definitions. Each custom interaction is replaced by the body of its matching definition, with formal parameters substituted by actual operands. This is applied recursively until only base interactions remain.

### Pass 6: Remove Non-Root Definitions

**`removeNonRootDefinitions`**

Cleans up the graph by removing definition nodes that are no longer needed after expansion. Only the root definition is preserved.

### Pass 7: Clear Sub-Information

**`clearSubInformation`**

Removes intermediate metadata from earlier passes that is no longer relevant.

### Pass 8: Instantiate Interfaces

**`instantiateInterfaces`**

Creates concrete interface instances for the root interaction. Resolves named interfaces, applies interface operations, and produces fully specified interface types.

*Side effect: Emits the expanded LIDL code (before lowering to base interactions).*

### Pass 9: Link Arguments

**`linkArguments`**

Connects interaction arguments to their sources. When a definition uses a parameter, this pass creates edges linking the parameter usage to the actual value provided at the call site.

### Pass 10: Link Interface

**`linkInterface`**

Connects the root interaction's interface to the external data flow. Creates edges between the graph's internal ports and the external interface (the boundary between the system and its environment).

### Pass 11: Keep Only Interactions

**`keepOnlyInteractions`**

Strips the graph down to only interaction instance nodes and their relationships, removing definition and interface nodes that have been fully processed.

### Pass 12: Referential Transparency (Instances)

**`referentialTransparencyInstances`**

A second pass of referential transparency resolution, now operating on the expanded (inlined) graph where multiple instances of the same definition may exist with different scopes.

*Side effect: Emits interaction metrics (counts of interactions by type).*

### Pass 13-14: Data Flow Direction + Void Creation

**`createDataFlowDirection`** (repeated throughout)

Infers the direction of data flow on each edge by examining the interfaces of connected nodes. Edges are annotated as input-to-output flows.

**`voidInteractionCreation`**

Inserts void interactions where needed to complete the graph's data flow topology.

### Pass 15: Behaviour Separation

**`behaviourSeparation`**

Processes `$ with behaviour $` interactions by separating the value component from the behaviour component. The behaviour's effects are integrated into the graph while the value flows through unchanged.

### Pass 16-18: Literal Linking

**`functionLiteralLinking`** -- Connects function literal interactions (`function name`) to their JavaScript implementations.

**`dataLiteralLinking`** -- Connects data literal interactions (numbers, booleans, text, activations) to their values.

**`functionApplicationLinking`** -- Processes `apply $ to $ and get $` interactions by creating the appropriate data flow edges between function, input, and output.

### Pass 19: Previous/Next Linking

**`previousNextLinking`**

Compiles `$ = previous $` interactions into state read/write operations. Creates state variables in the generated code and the logic to save values at the end of a step and restore them at the beginning of the next.

### Pass 20-23: Composition Compilation

**`tagCompositionElementEdges`** -- Annotates edges within composition interactions with their field keys.

**`matchingCompositionReduction`** (applied multiple times) -- When two compositions are connected and their field keys match, this pass wires the corresponding fields directly, eliminating the intermediate composition nodes. This is applied iteratively until a fixed point is reached.

**`linkIdentifiers`** -- Connects Reference (`!`) and CoReference (`?`) interactions that share the same identifier.

**`removeOneSidedAffectation`** -- Removes affectation interactions that have only one connected side (dead assignments).

**`nonMatchingCompositionCompilation`** -- Handles compositions where fields don't perfectly match, creating the necessary routing logic.

**`affectationLinking`** -- Compiles `$ = $` interactions into direct data-flow connections.

### Pass 24-26: Finalization

**`removeDuplicateEdge`** -- Removes redundant edges in the graph.

**`resolveMultiplePorts`** -- When a node has multiple inputs or outputs on the same port, resolves them into a single connection (typically using the `fallback` pattern for multiple inputs).

**`instantiateTemplates`** -- Generates the actual JavaScript code for each interaction instance node in the graph.

### Pass 27-28: Ordering

**`orderGraph`** -- Performs a topological sort on the graph to determine execution order. Nodes that depend on other nodes must execute after their dependencies.

*Side effect: Emits the generated JavaScript code.*

**`keepOnlyOrdering`** -- Strips the graph to just the execution ordering information.

## Stage 4: Code Generation

The `getJsCode` module assembles the final JavaScript from:

1. **Standard header** -- Runtime utilities (`clone`, `active`/`inactive` constants, state management)
2. **Custom header** -- User-provided JavaScript function definitions
3. **Edge declarations** -- Variable declarations for each data-flow edge
4. **Node code** -- The computation for each interaction instance, in topological order
5. **Return statement** -- Packages the results into `{memo, state, args, inter}`

The output contains two functions:

```javascript
function transitionFunction(data) {
  // Standard header (clone, active/inactive, state management)
  // Custom header (user functions)
  // Edge variable declarations
  // Node computations (in topological order)
  // Return {memo, state, args, inter}
}

function initializationFunction(data) {
  // Return {memo:{}, state:{...initial states...}, args:{}, inter:{}}
}
```

## Execution Model

The compiled LIDL program follows a step-based execution model:

```
                    +------------------+
                    |  initFunction()  |
                    |  -> initial data |
                    +--------+---------+
                             |
                             v
                 +-----------+----------+
            +--->| transFunction(data)  |<---+
            |    | 1. Read inputs       |    |
            |    | 2. Read prev state   |    |
            |    | 3. Compute (topo)    |    |
            |    | 4. Write outputs     |    |
            |    | 5. Write next state  |    |
            |    +-----------+----------+    |
            |                |               |
            +--state/memo----+               |
                             |               |
                     updated data            |
                     (with new inter)--------+
```

Each step:

1. The environment provides input values via `data.inter`
2. The transition function reads the previous state from `data.state`
3. Each node's code executes in topological order
4. Output values are written to `data.inter`
5. New state is written to `data.state` for the next step

## Inspecting the Pipeline

You can inspect intermediate results by providing callbacks to the graph compiler:

```javascript
var Lidl = require('lidl-core');

var ast = Lidl.parser.parse(code);
var graph = Lidl.graphCompiler.compile(ast[0], header, {
  addOperatorTypeAnnotation: function(graph, data) {
    console.log('Step:', data.step, 'Stage:', data.stage);
    return true;
  },
  expandDefinitions: function(graph, data) {
    console.log('After expansion, nodes:', graph.nodes().length);
    return true;
  },
  getJsCode: function(graph, data) {
    console.log('Generated JS length:', data.source.length);
    return true;
  },
  getExpandedLidlCode: function(graph, data) {
    console.log('Expanded LIDL:', data);
    return true;
  },
  getInteractionMetrics: function(graph, data) {
    console.log('Metrics:', data);
    return true;
  },
  error: function(graph, data) {
    console.error('Error at step', data.step, ':', data.error.message);
    return false;
  }
});
```

## Next Steps

- See the [lidl-core API](lidl-core.md) for programmatic access to the compiler
- Use the [CLI](lidl-cli.md) for straightforward compilation
- Study [Examples](../examples/index.md) to understand what the compiler produces
