# LIDL Sandbox

An interactive IDE for the LIDL Interaction Description Language, built as a Next.js web application.

## Tech Stack

- **Runtime & package manager:** [Bun](https://bun.sh)
- **Framework:** [Next.js 16](https://nextjs.org) (App Router, webpack bundler)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **UI components:** [shadcn/ui](https://ui.shadcn.com) (tabs, select, dropdown-menu, input, button, sonner toasts)
- **Code editors:** [CodeMirror 6](https://codemirror.net) with JavaScript and JSON language support
- **Graph rendering:** [@viz-js/viz](https://github.com/nicolo-ribaudo/viz-js) (Graphviz WASM)
- **Panel layout:** [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)
- **Compiler:** `lidl-core` (local dependency at `../lidl-core`)

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start the development server |
| `bun run build` | Create a production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Run ESLint |

## Usage

The sandbox provides three input editors:

- **LIDL Code** -- the LIDL program source
- **Header** -- JavaScript helper functions linked into the compiled output
- **Scenario** -- a JSON array of test steps

The compiler processes the LIDL program, links it with the header, and produces several outputs visible across the panel layout:

- **Expanded LIDL** -- the fully expanded intermediate representation
- **Generated JS** -- the compiled JavaScript transition and initialization functions
- **Trace** -- a structured table showing the scenario execution results
- **Raw Trace** -- the full trace as JSON
- **Graphs** -- Graphviz renderings of each compiler transformation stage (selectable via dropdown)
- **Canvas** -- a live interactive preview that runs the compiled code as a WIMP application
- **Errors** -- compilation or runtime errors
- **Analysis** -- interaction metrics (identifier counts, etc.)

Files can be saved to and loaded from `localStorage` via the toolbar. Saving also triggers a `.lidl` file download.

## Details

### Scenarios and Trace

Scenarios and traces use [JSON](http://www.json.org). Each step is a record with four fields:

- `inter` -- values of the main interface of the interaction
- `args` -- values of the arguments, keyed by name
- `state` -- internal state of the LIDL system
- `memo` -- memoized values used by the runtime

Only the input parts of `inter` and `args` are required in the scenario; outputs, state, and memo are produced by the runtime.

### Canvas

The Canvas panel renders graphics produced by LIDL programs that define a `mouse`/`graphics` interface. It handles mouse, keyboard, and touch events, feeding them into the compiled transition function and drawing the resulting graphics on an HTML canvas.

### Graphs

Each compiler transformation stage (e.g. `addDefinitionToGraph`, `expandDefinitions`, `matchingCompositionReduction`, ...) produces a Graphviz DOT representation that is rendered to SVG in the browser via the @viz-js/viz WASM module.
