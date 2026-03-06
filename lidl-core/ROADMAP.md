# LIDL Compiler Optimization Roadmap

This document outlines a prioritized plan for improving the performance of the LIDL compiler, based on a thorough analysis of the compilation pipeline, graph data structure, and transformation passes.

## Overview

The LIDL compiler works by converting an AST into a graph, running ~29 transformation passes over it, and generating JavaScript. The pipeline currently suffers from several structural performance issues that compound on larger programs. The improvements below are ordered by expected impact relative to implementation effort.

> **Verification rule:** After completing each step, run the full test suite (`npm test` or `bun test` after the Bun migration). Do not proceed to the next step until all tests pass. This ensures no regressions are introduced along the way.

---

## Phase -1: Update Dependencies (Low Effort, Prerequisite)

### -1.1 Upgrade lodash from 3.x to 4.x

**File:** `package.json` — currently depends on `lodash ^3.10.1` (from 2015)

Lodash 3 → 4 has breaking changes that must be addressed before any other work. Key migration items:

- **Removed `_.pluck`** — replace with `_.map(collection, property)`
- **Removed `_.where`** — replace with `_.filter(collection, predicate)`
- **`_.first` / `_.last`** no longer accept a count argument
- **`_.flatten`** is now shallow by default — use `_.flattenDeep` for recursive
- **`_.pairs`** → `_.toPairs`
- **`_.rest`** → `_.tail`
- **`_.sortByOrder`** → `_.orderBy`
- **Chaining** — `_(arr).method().value()` still works, but some method names changed
- **`_.isMatch`** behavior changed — verify all pattern-matching uses in graph queries
- **`_.callback` / `_.iteratee`** changes — affects any custom iteratee shorthand

**Strategy:**
1. Update `package.json` to `lodash ^4.17.21`
2. Run `npm test` — note all failures
3. Fix each breaking API usage
4. Run `npm test` — all tests must pass

**Expected impact:** 1.5–2× performance from lodash internals alone. Unblocks future native ES6 replacements.

**Checkpoint:** `npm test` — all tests pass.

---

## Phase 0: Port to Bun + TypeScript (Medium Effort, Foundation for Everything Else)

### 0.1 Replace Node.js + Babel with Bun

The current toolchain relies on Node.js with Babel (es2015 + stage-0 presets) to transpile ES6 modules and modern syntax. Bun natively supports ES modules, modern JavaScript, and TypeScript out of the box — no transpilation step needed.

**What to remove:**
- `babel-jest`, `babel-preset-es2015`, `babel-preset-react`, `babel-preset-stage-0` dev dependencies
- `babel` and `browserify` configuration blocks in `package.json`
- The `build.js` script (PEG.js grammar compilation should move to a Bun-compatible build step)
- The `lib/` transpilation output directory

**What to replace:**
- `jest` / `jest-cli` → `bun test` (Bun has a built-in Jest-compatible test runner)
- `node ./build.js` → a Bun script or `bun run` task
- `npm` scripts → `bun` equivalents

**Expected impact:** Faster startup, faster test runs, zero transpilation overhead. Bun's runtime is also significantly faster than Node.js for CPU-bound work like graph transformations.

**Checkpoint:** `bun test` — all tests pass.

### 0.2 Convert all `.js` files to TypeScript

The entire `src/` directory (~40 source files, ~30 graph transformation files, ~10 test files) is untyped JavaScript. Converting to TypeScript provides:

- **Compile-time safety** for the complex graph operations, port types, and interface algebra — catching bugs that currently only surface at runtime
- **Self-documenting code** — the graph node/edge structures, operator types, and interface shapes become explicit instead of implicit
- **Better IDE support** — autocompletion, refactoring, and navigation across the compilation pipeline
- **Foundation for future optimization** — typed code is easier to reason about when rewriting data structures (Phase 3)

**Conversion strategy:**
1. Add a `tsconfig.json` (Bun supports TypeScript natively, no `tsc` compilation step needed for execution)
2. Rename `.js` → `.ts` files incrementally, starting with leaf modules (`data.ts`, `interfaces.ts`, `serializer.ts`) and working inward
3. Define core types first: `Graph`, `Node`, `Edge`, `Port`, `Interface`, `Interaction`, `Operator` — these structures are used everywhere
4. The PEG.js grammar (`parser.pegjs`, `operator.pegjs`) stays as-is, but the generated parser gets a `.d.ts` type declaration
5. Convert test files to `.test.ts` (Bun's test runner supports TypeScript directly)

**Key types to define:**

```ts
interface GraphNode {
  id: string;
  type: string;
  finished: boolean;
  content: Record<string, unknown>;
  ports: Port[];
  incomingEdges: GraphEdge[];
  outgoingEdges: GraphEdge[];
}

interface GraphEdge {
  id: string;
  type: string;
  finished: boolean;
  from: { node: GraphNode; index: number };
  to: { node: GraphNode; index: number };
}

interface Port {
  name: string;
  type: DataType;
  direction: "in" | "out" | "ref";
}
```

**Expected impact:** No direct runtime speedup, but dramatically reduces debugging time and makes every subsequent optimization safer and faster to implement.

**Checkpoint:** `bun test` — all tests pass, no type errors.

### 0.3 Replace PEG.js with a maintained alternative

PEG.js (`^0.9.0`) has been unmaintained since 2020. The successor **Peggy** is a drop-in replacement with active maintenance, bug fixes, and TypeScript type definitions.

**Fix:** Replace `pegjs` with `peggy` in dev dependencies. Update the grammar build step. The grammar syntax is fully compatible.

**Expected impact:** Maintained tooling, TypeScript support for generated parsers, minor parser performance improvements.

**Checkpoint:** `bun test` — all tests pass.

---

## Phase 1: Quick Wins (Low Effort, High Impact)

### 1.1 Remove `createDataFlowDirection` from inside `resolveMultiplePorts` loop

**File:** `src/graphTransformations/resolveMultiplePorts.js`

`resolveMultiplePorts` calls `createDataFlowDirection(graph)` inside its `reduceUndirectedEdges` loop — meaning a full graph-wide dataflow pass runs for **every single edge** being processed. For E edges, total cost is O(E²).

**Fix:** Batch the changes and run `createDataFlowDirection` once at the end of `resolveMultiplePorts`.

**Expected impact:** 2–5× on large programs.

**Checkpoint:** `bun test` — all tests pass.

### 1.2 Replace hard-coded pass repetition with fixed-point loops

**File:** `src/graphCompiler.js`

The pipeline repeats several passes a fixed number of times (usually 3), as acknowledged by TODO comments in the source:

```
//TODO Should loop that, either in the method or here ... until fixed point
```

The affected pass groups:
- `matchingCompositionReduction` + `createDataFlowDirection` (×3 before `linkIdentifiers`, ×3 after)
- `nonMatchingCompositionCompilation` + `affectationLinking` + `createDataFlowDirection` (×3)

**Fix:** Implement fixed-point iteration — loop until no graph changes occur. Add a dirty flag or change counter to the `Graph` class so passes can report whether they made modifications.

**Expected impact:** Avoids wasted passes when convergence happens early (common case). Guarantees correctness when 3 iterations aren't enough (edge cases).

**Checkpoint:** `bun test` — all tests pass.

### 1.3 Replace `_.includes` with `Set` in `expandDefinitions`

**File:** `src/graphTransformations/expandDefinitions.js`

The `copy()` function uses `_.includes(defInteractionInstanceNodes, edge.from.node)` to filter edges. This is O(N) per check. For M edges and N nodes, the total is O(M × N).

**Fix:** Convert the node arrays to `Set` objects for O(1) membership testing.

**Expected impact:** 2× on this pass.

**Checkpoint:** `bun test` — all tests pass.

### 1.4 Stop SAT solver after first solution (when sufficient)

**File:** `src/satSolver.js`

`solvePath` finds **all** satisfying assignments by restarting the solver with accumulated negation clauses. For N solutions this is O(N × SAT_cost). Many callers only need one solution.

**Fix:** Add an option to stop after the first satisfying assignment. Use it where all-solutions enumeration isn't required.

**Expected impact:** Variable — significant when many solutions exist.

**Checkpoint:** `bun test` — all tests pass.

---

## Phase 2: Targeted Algorithmic Improvements (Medium Effort, High Impact)

### 2.1 Eliminate `_.cloneDeep` in `createDataFlowDirection`

**File:** `src/graphTransformations/createDataFlowDirection.js`

This pass runs ~15 times during compilation. Each invocation calls `_.cloneDeep()` on every edge's port data:

```js
let portOnOrigin = _.cloneDeep(theEdge.from.node.ports[theEdge.from.index]);
let portOnDestination = _.cloneDeep(theEdge.to.node.ports[theEdge.to.index]);
```

**Fix:** Use structural sharing or immutable data for port types so "copying" is free. Alternatively, track which edges actually changed and only reprocess those (incremental dataflow).

**Expected impact:** 2–3× on this pass (compounded across ~15 invocations).

**Checkpoint:** `bun test` — all tests pass.

### 2.2 Build hash indexes for `referentialTransparency` node grouping

**Files:** `src/graphTransformations/referentialTransparency.js`, `referentialTransparencyInstances.js`

For each "solvable" node, the pass searches all nodes with the same operator, then for each candidate compares all children edges bidirectionally — yielding O(N² × E²) complexity.

**Fix:** Build a hash index of nodes keyed by operator string. Group them, then compare children using sorted edge lists or hash-based set comparison.

**Expected impact:** 3–5× on this pass.

**Checkpoint:** `bun test` — all tests pass.

---

## Phase 3: Graph Data Structure Rewrite (High Effort, Highest Impact)

### 3.1 Replace graph arrays with `Map`/`Set` and proper adjacency lists

**File:** `src/g.js`

The `Graph` class is the root bottleneck. It stores nodes and edges in **plain arrays** and uses `finished` flags for soft-deletion. Nearly every operation suffers:

- **`matchNodes` / `matchDirectedEdges`** do linear scans through full arrays, filtering out `finished` elements on every call. As compilation progresses, the array grows while the ratio of active elements shrinks.

- **`reduceNodes` / `reduceDirectedEdges`** call `findNode` in a loop, which rescans the entire array from the beginning for each element — making processing N matching nodes O(N × total_nodes) instead of O(total_nodes).

- **`graph.clean()`** is called between every pipeline step (~50 times), doing `_.remove()` on the full arrays each time.

- **Pattern matching with lodash** performs deep property comparisons on every element, which is slow for complex patterns.

The graph already has `nodeTypeIndex` / `edgeTypeIndex` (Maps of arrays by type) and per-node `incomingEdges` / `outgoingEdges` arrays with type indexes. However, these secondary indexes are not consistently used by `matchNodes` and suffer from the same soft-deletion pollution.

**Fix:** Rewrite `Graph` to use:
- `Map<id, node>` for O(1) node/edge lookup by ID
- Type-keyed `Map<type, Set<node>>` indexes for O(matched) type queries instead of O(total)
- Proper adjacency `Set`s instead of arrays with `finished` filtering
- Immediate removal instead of soft-delete + periodic `clean()`

**Expected impact:** 5–10× overall. Every transformation pass benefits.

**Checkpoint:** `bun test` — all tests pass.

### 3.2 Eliminate `graph.clean()` — remove elements immediately

**File:** `src/g.js`

Currently, "deleting" a node or edge sets `finished = true`. The actual removal happens in `clean()`, which is called ~50 times (once per pipeline step via `callCallback`). Each `clean()` call does `_.remove()` on the full arrays.

This is part of the Phase 3 rewrite — when using `Map`/`Set`, elements can be deleted in O(1) with no need for a deferred cleanup pass.

**Expected impact:** 1.2–1.5× (subsumed by 3.1 if done together).

**Checkpoint:** `bun test` — all tests pass.

---

## Phase 4: Architectural Changes (Very High Effort, Transformative Impact)

### 4.1 Incremental compilation

Instead of running all ~29 passes from scratch on every compilation, track which parts of the graph changed and only re-run affected passes. This requires a dependency graph between transformation passes and fine-grained change tracking.

**Expected impact:** Orders of magnitude for iterative development workflows.

**Checkpoint:** `bun test` — all tests pass.

### 4.2 Compiled-language graph backend

Consider rewriting the graph engine in Rust or C++ and exposing it to JavaScript via WASM or native bindings. The graph operations are the hot path and would benefit enormously from compiled-language data structures and memory layout.

**Expected impact:** 10×+ for the graph layer.

**Checkpoint:** `bun test` — all tests pass.

---

## Summary Table

| Priority | Change | Expected Impact | Effort |
|----------|--------|-----------------|--------|
| -1.1 | Upgrade lodash 3.x → 4.x | 1.5–2× overall | Low |
| 0.1 | Replace Node.js + Babel with Bun | Faster startup, tests, and runtime | Low–Medium |
| 0.2 | Convert all `.js` to TypeScript | Safety, DX, foundation for later phases | Medium |
| 0.3 | Replace PEG.js with Peggy | Maintained tooling, TS types | Low |
| 1.1 | Remove `createDataFlowDirection` from `resolveMultiplePorts` loop | 2–5× on large programs | Low |
| 1.2 | Fixed-point loops instead of hard-coded repetition | Variable (avoids wasted passes) | Low |
| 1.3 | `Set` instead of `_.includes` in `expandDefinitions` | 2× on this pass | Low |
| 1.4 | Stop SAT solver after first solution | Variable | Low |
| 2.1 | Eliminate `_.cloneDeep` in `createDataFlowDirection` | 2–3× on this pass (×15) | Medium |
| 2.2 | Hash indexes for `referentialTransparency` | 3–5× on this pass | Medium |
| 3.1 | Rewrite Graph with `Map`/`Set` and adjacency lists | 5–10× overall | High |
| 3.2 | Immediate removal instead of soft-delete + `clean()` | 1.2–1.5× | Medium–High |
| 4.1 | Incremental compilation | Orders of magnitude | Very High |
| 4.2 | Compiled-language graph backend (WASM) | 10×+ graph layer | Very High |
