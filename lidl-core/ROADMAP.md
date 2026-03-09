# LIDL Compiler Optimization Roadmap

This document outlines a prioritized plan for improving the performance of the LIDL compiler, based on a thorough analysis of the compilation pipeline, graph data structure, and transformation passes.

## Overview

The LIDL compiler works by converting an AST into a graph, running ~29 transformation passes over it, and generating JavaScript. The pipeline currently suffers from several structural performance issues that compound on larger programs. The improvements below are ordered by expected impact relative to implementation effort.

> **Verification rule:** After completing each step, run the full test suite (`npm test` or `bun test` after the Bun migration). Do not proceed to the next step until all tests pass. This ensures no regressions are introduced along the way.

---

## Phase -1: Update Dependencies (Low Effort, Prerequisite) — DONE

### -1.1 Upgrade lodash from 3.x to 4.x — DONE

**File:** `package.json` — updated from `lodash ^3.10.1` to `^4.17.21`

Breaking API changes fixed:
- `_.pluck` → `_.map`
- `_.contains` → `_.includes`
- `_.any` → `_.some`
- `_.unique` → `_.uniqBy`
- `_.rest` → `_.tail`
- `_.every` 3-argument shorthand → matches-pair shorthand
- Chaining: added compatibility shims for `_.prototype.forEach` (auto-unwrap) and `_.prototype.commit` (removed in v4) in `g.js`
- `_(string).words(regex)` → `_.words(string, regex)` (static call) in `tagCompositionElementEdges.js`

**Checkpoint:** `npm test` — all 316 tests pass. ✓

---

## Phase 0: Port to Bun + TypeScript (Medium Effort, Foundation for Everything Else) — DONE

### 0.1 Replace Node.js + Babel with Bun — DONE

Removed all Babel/Jest infrastructure and switched to Bun:
- Removed `babel-jest`, `babel-preset-es2015`, `babel-preset-react`, `babel-preset-stage-0`, `jest-cli` dev dependencies
- Removed `babel`, `browserify`, `jest` configuration blocks from `package.json`
- Updated `main` entry to point to `src/` instead of `lib/` (no more transpilation step)
- Updated all `npm` scripts to `bun` equivalents (`bun test`, `bun run build`)
- Removed `jest.dontMock()` and `jest.autoMockOff()` calls from all 10 test files (Bun doesn't automock)
- Fixed `toContain` → `toContainEqual` for deep-equality assertions (Bun's `toContain` uses reference equality)
- Fixed ESM/CJS conflicts: files mixing `import` statements with `module.exports` were made consistently CJS
- Renamed test files to `*.test.js` naming convention for Bun test discovery

**Checkpoint:** `bun test` — all 316 tests pass. ✓

### 0.2 Convert all `.js` files to TypeScript — DONE

Converted the entire `src/` directory to TypeScript:
- Added `tsconfig.json` with `moduleResolution: "bundler"`, `allowJs: true`, `strict: false`
- Renamed all 56 source files from `.js` → `.ts` (except 3 generated files: `parser.js`, `operator.js`, `examples.js`)
- Renamed all 10 test files from `.test.js` → `.test.ts`
- Converted all `require()`/`module.exports` patterns to ESM `import`/`export`
- Added basic type annotations to function signatures in core modules (`g.ts`, `serializer.ts`, `interactions.ts`, `identifiers.ts`, `satSolver.ts`, `config.ts`, `resolver.ts`, `exportGraph.ts`)
- Fixed import of `satSolver` in `matchingCompositionReduction.ts` (default → namespace import)
- Removed unused `import interactions from "../interfaces"` in `expandInterfaces.ts`

**Checkpoint:** `bun test` — all 316 tests pass. ✓

### 0.3 Replace PEG.js with Peggy — DONE

- Replaced `pegjs ^0.9.0` with `peggy ^5.1.0` in dev dependencies
- Updated `build.js`: `peg.buildParser()` → `peggy.generate()`
- Grammar syntax is fully compatible — no grammar changes needed
- Regenerated `parser.js` and `operator.js` with Peggy

**Checkpoint:** `bun test` — all 316 tests pass. ✓

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

| Priority | Change | Expected Impact | Effort | Status |
|----------|--------|-----------------|--------|--------|
| -1.1 | Upgrade lodash 3.x → 4.x | 1.5–2× overall | Low | DONE |
| 0.1 | Replace Node.js + Babel with Bun | Faster startup, tests, and runtime | Low–Medium | DONE |
| 0.2 | Convert all `.js` to TypeScript | Safety, DX, foundation for later phases | Medium | DONE |
| 0.3 | Replace PEG.js with Peggy | Maintained tooling, TS types | Low | DONE |
| 1.1 | Remove `createDataFlowDirection` from `resolveMultiplePorts` loop | 2–5× on large programs | Low | |
| 1.2 | Fixed-point loops instead of hard-coded repetition | Variable (avoids wasted passes) | Low | |
| 1.3 | `Set` instead of `_.includes` in `expandDefinitions` | 2× on this pass | Low | |
| 1.4 | Stop SAT solver after first solution | Variable | Low | |
| 2.1 | Eliminate `_.cloneDeep` in `createDataFlowDirection` | 2–3× on this pass (×15) | Medium | |
| 2.2 | Hash indexes for `referentialTransparency` | 3–5× on this pass | Medium | |
| 3.1 | Rewrite Graph with `Map`/`Set` and adjacency lists | 5–10× overall | High | |
| 3.2 | Immediate removal instead of soft-delete + `clean()` | 1.2–1.5× | Medium–High | |
| 4.1 | Incremental compilation | Orders of magnitude | Very High | |
| 4.2 | Compiled-language graph backend (WASM) | 10×+ graph layer | Very High | |
