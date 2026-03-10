# LIDL changelog

# 0.9.0 (2026-03-09)

Major modernization and performance overhaul of the LIDL compiler.

### Infrastructure
- Replaced Node.js + Babel + Jest with Bun (runtime, bundler, and test runner)
- Converted entire codebase from JavaScript to TypeScript with ESM modules
- Migrated parsers from PEG.js → Peggy → Ohm (grammar/semantics separation, no code generation)
- Upgraded lodash from 3.x to 4.x

### Performance
- Rewrote `Graph` class with `Map`/`Set` indexes and immediate removal on `finish()` (was: plain arrays with soft-deletion and periodic `clean()`)
- Replaced hard-coded 3× pass repetition with fixed-point loops that converge in 1–2 iterations
- Removed redundant `createDataFlowDirection` call from inside `resolveMultiplePorts` loop (was O(E²), now O(E))
- Eliminated `_.cloneDeep` in `createDataFlowDirection` (pure functions don't need defensive copies)
- Built operator hash indexes and Set-based children comparison in `referentialTransparency` passes (was O(N²×E²))
- Replaced `_.includes` / `_.findIndex` with `Set` / `Map` in `expandDefinitions`
- Added `firstOnly` option to SAT solver to short-circuit after first solution

### Developer Experience
- Added `bun run test-lite` (skips file output for fast iteration)
- Added Prettier formatting scripts

# 0.8.9 (2015-12-16)

- Interfaces taken into account when compiling

# 0.8.8 (2015-12-10)

- Fixed a bug during the interface instantiation phase

# 0.8.7 (2015-12-10)

- Ten-fold increase in compilation speed thanks to improved graph library

# 0.8.6 (2015-12-07)

- Changed the active value from `1`to `"lidl_active_value"`;

# 0.8.5 (2015-12-06)

- Small fix on simple compiler

# 0.8.4 (2015-12-06)

- Small fix on simple compiler

# 0.8.3 (2015-12-06)

- ES5 compatiblity

# 0.8.2 (2015-12-06)

- Small Changes

# 0.8.1 (2015-12-06)

- Removed old Readme

# 0.8.0 (2015-12-06)

- Major breaking Changes
- Using the graph based compiler
- Big refactoring, compiler working

# 0.1.8 (2015-10-14)

- Fixed dependencies

# 0.1.7 (2015-10-14)

- Changed name to LIDL

# 0.1.6 (2015-10-14)

- Added example compilation result WIMP hello world

# 0.1.5 (2015-10-14)

- Fixed incomplete expanding of definitions

# 0.1.4 (2015-10-14)

- Add iii.operator.parse()

# 0.1.3 (2015-10-14)

- Fix

# 0.1.2 (2015-10-14)

- Added the iii.compiler.compileToIii() function

# 0.1.1 (2015-10-14)

- Quick fix in index.js causing problems

# 0.1.0 (2015-10-14)

- Added iii.compiler.compileToIii()

# 0.0.11 (2015-10-14)

- Added iii.serializer
- Added iii.interactions

# 0.0.10 (2015-10-14)

- Added iii.interfaces.emissionInterface()
- Added iii.interfaces.receptionInterface()

# 0.0.9 (2015-10-14)

- Added iii.interfaces.listOfAtoms()

# 0.0.8 (2015-10-14)

- Fixes

# 0.0.7 (2015-10-14)

- Add various parsing start rules

# 0.0.6 (2015-10-14)

- Change The parser stating rule

# 0.0.5 (2015-10-14)

- Quick fix again

# 0.0.4 (2015-10-14)

- Quick fix

# 0.0.3 (2015-10-14)

- Quick fix

# 0.0.2 (2015-10-14)

- Change lots of things...

# 0.0.1 (2015-10-14)

- Initial Release
