"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import _ from "lodash";
import { DockviewReact, type DockviewReadyEvent, type DockviewTheme } from "dockview";

const themeLidl: DockviewTheme = {
  name: "lidl",
  className: "dockview-theme-lidl",
  gap: 0,
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, Save, Play, FolderOpen } from "lucide-react";

import {
  graphCompiler,
  parser,
  runner,
  config,
  examples,
  interfaces,
} from "lidl-core";

import CodeEditor from "@/components/sandbox/code-editor";
import GraphvizViewer from "@/components/sandbox/graphviz-viewer";
import CanvasPanel from "@/components/sandbox/canvas-panel";

const BUILD_KEY = "lidl-sandbox-next-v1";

// ---------------------------------------------------------------------------
// Context shared by all dockview panel components
// ---------------------------------------------------------------------------

interface SandboxContextType {
  lidl: string;
  header: string;
  scenario: string;
  lidlAst: any;
  displayGraphs: Record<string, string>;
  selectedGraphStage: string;
  setSelectedGraphStage: (stage: string) => void;
  cleanJs: string | null;
  jsData: any;
  expandedLidl: string | null;
  traceAst: any[];
  trace: string | null;
  metrics: Record<string, number> | null;
  errors: string[];
  handleLidlChange: (v: string) => void;
  handleHeaderChange: (v: string) => void;
  handleScenarioChange: (v: string) => void;
}

const SandboxContext = createContext<SandboxContextType>(null!);

// ---------------------------------------------------------------------------
// Dockview panel components
// ---------------------------------------------------------------------------

function LidlCodePanel() {
  const { lidl, handleLidlChange } = useContext(SandboxContext);
  return <CodeEditor value={lidl} onChange={handleLidlChange} />;
}

function ExpandedPanel() {
  const { expandedLidl } = useContext(SandboxContext);
  return <CodeEditor value={expandedLidl ?? ""} readOnly />;
}

function ScenarioPanel() {
  const { scenario, handleScenarioChange } = useContext(SandboxContext);
  return (
    <CodeEditor value={scenario} onChange={handleScenarioChange} language="json" />
  );
}

function HeaderPanel() {
  const { header, handleHeaderChange } = useContext(SandboxContext);
  return (
    <CodeEditor value={header} onChange={handleHeaderChange} language="javascript" />
  );
}

function GraphsPanel() {
  const { displayGraphs, selectedGraphStage, setSelectedGraphStage } =
    useContext(SandboxContext);
  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-1 border-b shrink-0">
        <Select value={selectedGraphStage} onValueChange={(v) => v && setSelectedGraphStage(v)}>
          <SelectTrigger className="h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {config.graphTransformations.map((stage: string) => (
              <SelectItem key={stage} value={stage} className="text-xs">
                {_.startCase(stage)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <GraphvizViewer dot={displayGraphs[selectedGraphStage]} />
      </div>
    </div>
  );
}

function ErrorsPanel() {
  const { errors } = useContext(SandboxContext);
  return (
    <div className="overflow-auto p-3 h-full">
      {errors.length === 0 ? (
        <p className="text-green-600 text-center text-sm">No problems</p>
      ) : (
        <ul className="space-y-1">
          {errors.map((e, i) => (
            <li key={i} className="text-destructive text-xs font-mono">
              {e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GeneratedPanel() {
  const { cleanJs } = useContext(SandboxContext);
  return <CodeEditor value={cleanJs ?? ""} readOnly language="javascript" />;
}

function CanvasTab() {
  const { jsData } = useContext(SandboxContext);
  return <CanvasPanel code={jsData} />;
}

function TracePanel() {
  const { lidlAst, traceAst } = useContext(SandboxContext);
  return (
    <div className="overflow-auto h-full">
      <TraceTable lidlAst={lidlAst} traceAst={traceAst} />
    </div>
  );
}

function RawTracePanel() {
  const { trace } = useContext(SandboxContext);
  return <CodeEditor value={trace ?? ""} readOnly language="json" />;
}

function AnalysisPanel() {
  const { metrics } = useContext(SandboxContext);
  return (
    <div className="overflow-auto p-3 h-full">
      {metrics ? (
        <div className="space-y-1">
          {Object.entries(metrics).map(([k, v]) => (
            <p key={k} className="text-xs">
              <span className="font-medium">{_.startCase(k)}</span>: {String(v)}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center text-xs">
          No metrics available
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Components map (stable reference for DockviewReact)
// ---------------------------------------------------------------------------

const dockviewComponents: Record<string, React.FC> = {
  lidlCode: LidlCodePanel,
  expanded: ExpandedPanel,
  scenario: ScenarioPanel,
  header: HeaderPanel,
  graphs: GraphsPanel,
  errors: ErrorsPanel,
  generated: GeneratedPanel,
  canvas: CanvasTab,
  trace: TracePanel,
  rawTrace: RawTracePanel,
  analysis: AnalysisPanel,
};

// ---------------------------------------------------------------------------
// Main sandbox component
// ---------------------------------------------------------------------------

export default function Sandbox() {
  const [fileName, setFileName] = useState("autoSave");
  const [lidl, setLidl] = useState(examples.lidl[0].code);
  const [header, setHeader] = useState(examples.header);
  const [scenario, setScenario] = useState(examples.lidl[0].scenario);
  const [lidlAst, setLidlAst] = useState<any>(null);
  const [displayGraphs, setDisplayGraphs] = useState<Record<string, string>>(
    {},
  );
  const [selectedGraphStage, setSelectedGraphStage] = useState(
    config.graphTransformations[0],
  );
  const [cleanJs, setCleanJs] = useState<string | null>(null);
  const [jsData, setJsData] = useState<any>(null);
  const [expandedLidl, setExpandedLidl] = useState<string | null>(null);
  const [traceAst, setTraceAst] = useState<any[]>([]);
  const [trace, setTrace] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Record<string, number> | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [listOfFiles, setListOfFiles] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);

  const lidlRef = useRef(lidl);
  const headerRef = useRef(header);
  const scenarioRef = useRef(scenario);
  const jsDataRef = useRef<any>(null);
  lidlRef.current = lidl;
  headerRef.current = header;
  scenarioRef.current = scenario;

  // ---- Compilation --------------------------------------------------------

  const doRecompile = useCallback(
    (lidlCode: string, headerCode: string, scenarioCode: string) => {
      setIsCompiling(true);
      setErrors([]);
      setTimeout(() => {
        try {
          const ast = parser.parse(lidlCode);
          setLidlAst(ast);

          const graphs: Record<string, string> = {};
          const cbs: Record<string, (graph: any, data?: any) => boolean> = {};

          for (const stage of config.graphTransformations) {
            cbs[stage] = (graph: any) => {
              try {
                graphs[stage] = graph.toDot();
              } catch {}
              return true;
            };
          }

          let compiledJs: any = null;

          cbs.getJsCode = (_g: any, data: any) => {
            setCleanJs(data.source);
            compiledJs = data;
            setJsData(data);
            jsDataRef.current = data;
            return true;
          };

          cbs.getExpandedLidlCode = (_g: any, data: any) => {
            setExpandedLidl(data.source);
            return true;
          };

          cbs.getInteractionMetrics = (_g: any, data: any) => {
            setMetrics(data.metrics);
            return true;
          };

          cbs.error = (graph: any, data: any) => {
            try {
              graphs.error = graph.toDot();
            } catch {}
            setErrors((prev) => [
              ...prev,
              data?.error?.message || "Compilation error",
            ]);
            return true;
          };

          graphCompiler.compile(ast[0], headerCode, cbs);
          setDisplayGraphs(graphs);

          if (compiledJs) {
            try {
              const parsed = JSON.parse(scenarioCode);
              const result = runner.run(compiledJs, parsed);
              setTraceAst(result);
              setTrace(JSON.stringify(result, null, 2));
            } catch (e: any) {
              setErrors((prev) => [...prev, `Scenario: ${e.message}`]);
            }
          }
        } catch (e: any) {
          setErrors((prev) => [
            ...prev,
            e.message || "Unknown compilation error",
          ]);
        } finally {
          setIsCompiling(false);
        }
      }, 0);
    },
    [],
  );

  const debouncedRecompile = useMemo(
    () =>
      _.debounce(
        (l: string, h: string, s: string) => doRecompile(l, h, s),
        1000,
      ),
    [doRecompile],
  );

  const debouncedRunScenario = useMemo(
    () =>
      _.debounce((js: any, s: string) => {
        if (!js) return;
        try {
          const parsed = JSON.parse(s);
          const result = runner.run(js, parsed);
          setTraceAst(result);
          setTrace(JSON.stringify(result, null, 2));
        } catch (e: any) {
          setErrors((prev) => [...prev, `Scenario: ${e.message}`]);
        }
      }, 100),
    [],
  );

  // ---- Handlers -----------------------------------------------------------

  const handleLidlChange = useCallback(
    (v: string) => {
      setLidl(v);
      debouncedRecompile(v, headerRef.current, scenarioRef.current);
    },
    [debouncedRecompile],
  );

  const handleHeaderChange = useCallback(
    (v: string) => {
      setHeader(v);
      debouncedRecompile(lidlRef.current, v, scenarioRef.current);
    },
    [debouncedRecompile],
  );

  const handleScenarioChange = useCallback(
    (v: string) => {
      setScenario(v);
      debouncedRunScenario(jsDataRef.current, v);
    },
    [debouncedRunScenario],
  );

  const handleRecompileAll = useCallback(() => {
    debouncedRecompile.cancel();
    doRecompile(lidlRef.current, headerRef.current, scenarioRef.current);
  }, [doRecompile, debouncedRecompile]);

  const updateListOfFiles = useCallback(() => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("LidlSandbox.")) {
        keys.push(key.substring("LidlSandbox.".length));
      }
    }
    setListOfFiles(keys);
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem(
      `LidlSandbox.${fileName}`,
      JSON.stringify({ lidl, header, scenario }),
    );
    updateListOfFiles();
    toast.success(`Saved ${fileName}`);

    const blob = new Blob([lidl], { type: "text/x-lidl" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.lidl`;
    a.click();
    URL.revokeObjectURL(url);
  }, [fileName, lidl, header, scenario, updateListOfFiles]);

  const handleLoad = useCallback(
    (name: string) => {
      const raw = localStorage.getItem(`LidlSandbox.${name}`);
      if (!raw) return;
      const data = JSON.parse(raw);
      setFileName(name);
      setLidl(data.lidl);
      setHeader(data.header);
      setScenario(data.scenario);
      doRecompile(data.lidl, data.header, data.scenario);
      toast.info(`Loaded ${name}`);
    },
    [doRecompile],
  );

  // ---- Dockview setup -----------------------------------------------------

  const handleDockviewReady = useCallback((event: DockviewReadyEvent) => {
    const api = event.api;

    // Column 1: LIDL Code + Expanded (tabbed)
    api.addPanel({
      id: "lidl-code",
      component: "lidlCode",
      title: "LIDL Code",
    });
    api.addPanel({
      id: "expanded",
      component: "expanded",
      title: "Expanded",
      position: { referencePanel: "lidl-code", direction: "within" },
    });

    // Column 2 top: Scenario + Header + Graphs (tabbed, right of column 1)
    api.addPanel({
      id: "scenario",
      component: "scenario",
      title: "Scenario",
      position: { referencePanel: "lidl-code", direction: "right" },
    });
    api.addPanel({
      id: "header",
      component: "header",
      title: "Header",
      position: { referencePanel: "scenario", direction: "within" },
    });
    api.addPanel({
      id: "graphs",
      component: "graphs",
      title: "Graphs",
      position: { referencePanel: "scenario", direction: "within" },
    });

    // Column 3: Trace + Raw Trace + Analysis (tabbed, right of column 2)
    api.addPanel({
      id: "trace",
      component: "trace",
      title: "Trace",
      position: { referencePanel: "scenario", direction: "right" },
    });
    api.addPanel({
      id: "raw-trace",
      component: "rawTrace",
      title: "Raw Trace",
      position: { referencePanel: "trace", direction: "within" },
    });
    api.addPanel({
      id: "analysis",
      component: "analysis",
      title: "Analysis",
      position: { referencePanel: "trace", direction: "within" },
    });

    // Column 2 bottom: Errors + Generated JS + Canvas (tabbed, below Scenario)
    api.addPanel({
      id: "errors",
      component: "errors",
      title: "Errors",
      position: { referencePanel: "scenario", direction: "below" },
    });
    api.addPanel({
      id: "generated",
      component: "generated",
      title: "Generated JS",
      position: { referencePanel: "errors", direction: "within" },
    });
    api.addPanel({
      id: "canvas",
      component: "canvas",
      title: "Canvas",
      position: { referencePanel: "errors", direction: "within" },
    });

    // Activate the primary tabs
    api.getPanel("lidl-code")?.api.setActive();
    api.getPanel("scenario")?.api.setActive();
    api.getPanel("errors")?.api.setActive();
    api.getPanel("trace")?.api.setActive();
  }, []);

  // ---- Initialization -----------------------------------------------------

  useEffect(() => {
    if (localStorage.getItem("LidlSandboxImportedDefaults") !== BUILD_KEY) {
      for (const ex of examples.lidl) {
        localStorage.setItem(
          `LidlSandbox.${ex.name}`,
          JSON.stringify({
            lidl: ex.code,
            header: examples.header,
            scenario: ex.scenario,
          }),
        );
      }
      localStorage.setItem("LidlSandboxImportedDefaults", BUILD_KEY);
    }
    updateListOfFiles();
    doRecompile(lidlRef.current, headerRef.current, scenarioRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Context value ------------------------------------------------------

  const contextValue = useMemo<SandboxContextType>(
    () => ({
      lidl,
      header,
      scenario,
      lidlAst,
      displayGraphs,
      selectedGraphStage,
      setSelectedGraphStage,
      cleanJs,
      jsData,
      expandedLidl,
      traceAst,
      trace,
      metrics,
      errors,
      handleLidlChange,
      handleHeaderChange,
      handleScenarioChange,
    }),
    [
      lidl,
      header,
      scenario,
      lidlAst,
      displayGraphs,
      selectedGraphStage,
      cleanJs,
      jsData,
      expandedLidl,
      traceAst,
      trace,
      metrics,
      errors,
      handleLidlChange,
      handleHeaderChange,
      handleScenarioChange,
    ],
  );

  // ---- Render -------------------------------------------------------------

  return (
    <SandboxContext.Provider value={contextValue}>
      <div className="flex flex-col h-screen bg-background">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-3 h-11 border-b shrink-0">
          <span className="font-semibold text-sm tracking-tight mr-2">
            LIDL Sandbox
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-background px-2.5 h-7 text-xs font-medium hover:bg-muted hover:text-foreground transition-all outline-none">
              <FolderOpen className="w-3.5 h-3.5 mr-1" />
              Open
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {listOfFiles.map((name) => (
                <DropdownMenuItem
                  key={name}
                  onClick={() => handleLoad(name)}
                >
                  {name}
                </DropdownMenuItem>
              ))}
              {listOfFiles.length === 0 && (
                <DropdownMenuItem disabled>No saved files</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            className="w-40 h-7 text-xs"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />

          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={handleSave}
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            Save
          </Button>

          <Separator orientation="vertical" className="h-5" />

          <Button
            size="sm"
            className="h-7 text-xs"
            onClick={handleRecompileAll}
            disabled={isCompiling}
          >
            {isCompiling ? (
              <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 mr-1" />
            )}
            Recompile
          </Button>

          {errors.length > 0 && (
            <span className="text-destructive text-xs ml-auto font-medium">
              {errors.length} error{errors.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Dockview */}
        <div className="flex-1 min-h-0">
          <DockviewReact
            theme={themeLidl}
            components={dockviewComponents}
            onReady={handleDockviewReady}
          />
        </div>
      </div>
    </SandboxContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Trace helpers
// ---------------------------------------------------------------------------

function TraceTable({
  lidlAst,
  traceAst,
}: {
  lidlAst: any;
  traceAst: any[];
}) {
  if (!lidlAst?.[0]?.signature || !traceAst?.length) {
    return (
      <p className="text-muted-foreground text-center text-xs p-4">
        No trace data
      </p>
    );
  }

  try {
    const inter = (interfaces as any).listOfAtoms(
      lidlAst[0].signature.interfac,
      "",
    );
    const args = _.flatMap(
      lidlAst[0].signature.operand || [],
      (arg: any) =>
        (interfaces as any).listOfAtoms(arg.interfac, arg.name),
    );

    type Col = { name: string; path: string; dir: string };
    const columns: Col[] = _.sortBy(
      [
        ...inter.map((x: any) => ({
          name: `interface${x.name}`,
          path: `inter${x.name}`,
          dir: x.direction,
        })),
        ...args.map((x: any) => ({
          name: x.name,
          path: `args.${x.name}`,
          dir: x.direction,
        })),
      ],
      "dir",
    );

    return (
      <table className="w-full text-xs border-collapse">
        <thead className="sticky top-0 bg-muted">
          <tr>
            {columns.map((col) => (
              <th
                key={col.name}
                className="px-2 py-1 text-left font-medium border-b"
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {traceAst.map((row: any, i: number) => (
            <tr key={i} className="border-b hover:bg-muted/50">
              {columns.map((col) => (
                <td
                  key={`${i}-${col.path}`}
                  className="px-2 py-1 font-mono"
                >
                  {fmtTrace(_.get(row, col.path))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } catch {
    return (
      <p className="text-muted-foreground text-center text-xs p-4">
        Unable to display trace
      </p>
    );
  }
}

function fmtTrace(v: any): string {
  if (v === null || v === undefined) return "inactive";
  return JSON.stringify(v)
    .replace(/"lidl_active_value"/g, "active")
    .replace(/null/g, "inactive");
}
