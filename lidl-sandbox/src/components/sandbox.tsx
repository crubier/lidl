"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import _ from "lodash";
import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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

export default function Sandbox() {
  const [fileName, setFileName] = useState("autoSave");
  const [lidl, setLidl] = useState(examples.lidl[0].code);
  const [header, setHeader] = useState(examples.header);
  const [scenario, setScenario] = useState(examples.lidl[0].scenario);
  const [lidlAst, setLidlAst] = useState<any>(null);
  const [displayGraphs, setDisplayGraphs] = useState<
    Record<string, string>
  >({});
  const [selectedGraphStage, setSelectedGraphStage] = useState(
    config.graphTransformations[0],
  );
  const [cleanJs, setCleanJs] = useState<string | null>(null);
  const [jsData, setJsData] = useState<any>(null);
  const [expandedLidl, setExpandedLidl] = useState<string | null>(null);
  const [traceAst, setTraceAst] = useState<any[]>([]);
  const [trace, setTrace] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Record<string, number> | null>(
    null,
  );
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

  const doRecompile = useCallback(
    (lidlCode: string, headerCode: string, scenarioCode: string) => {
      setIsCompiling(true);
      setErrors([]);
      setTimeout(() => {
        try {
          const ast = parser.parse(lidlCode);
          setLidlAst(ast);

          const graphs: Record<string, string> = {};
          const cbs: Record<string, (graph: any, data?: any) => boolean> =
            {};

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

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 h-11 border-b shrink-0">
        <span className="font-semibold text-sm tracking-tight mr-2">
          LIDL Sandbox
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <FolderOpen className="w-3.5 h-3.5 mr-1" />
              Open
            </Button>
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

      {/* Panels */}
      <PanelGroup direction="horizontal" className="flex-1 min-h-0">
        {/* Left: Code Editors */}
        <Panel defaultSize={25} minSize={15}>
          <Tabs defaultValue="code" className="flex flex-col h-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-muted/40 h-8 px-1 shrink-0">
              <TabsTrigger value="code" className="text-xs h-6">
                LIDL Code
              </TabsTrigger>
              <TabsTrigger value="expanded" className="text-xs h-6">
                Expanded
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 min-h-0 relative">
              <TabsContent
                value="code"
                className="absolute inset-0 m-0"
              >
                <CodeEditor
                  value={lidl}
                  onChange={handleLidlChange}
                />
              </TabsContent>
              <TabsContent
                value="expanded"
                className="absolute inset-0 m-0"
              >
                <CodeEditor value={expandedLidl ?? ""} readOnly />
              </TabsContent>
            </div>
          </Tabs>
        </Panel>

        <PanelResizeHandle className="w-px bg-border hover:w-1 hover:bg-primary/50 transition-all" />

        {/* Center */}
        <Panel defaultSize={50} minSize={20}>
          <PanelGroup direction="vertical">
            {/* Center top */}
            <Panel defaultSize={50} minSize={10}>
              <Tabs
                defaultValue="scenario"
                className="flex flex-col h-full"
              >
                <TabsList className="w-full justify-start rounded-none border-b bg-muted/40 h-8 px-1 shrink-0">
                  <TabsTrigger
                    value="scenario"
                    className="text-xs h-6"
                  >
                    Scenario
                  </TabsTrigger>
                  <TabsTrigger value="header" className="text-xs h-6">
                    Header
                  </TabsTrigger>
                  <TabsTrigger value="graphs" className="text-xs h-6">
                    Graphs
                  </TabsTrigger>
                </TabsList>
                <div className="flex-1 min-h-0 relative">
                  <TabsContent
                    value="scenario"
                    className="absolute inset-0 m-0"
                  >
                    <CodeEditor
                      value={scenario}
                      onChange={handleScenarioChange}
                      language="json"
                    />
                  </TabsContent>
                  <TabsContent
                    value="header"
                    className="absolute inset-0 m-0"
                  >
                    <CodeEditor
                      value={header}
                      onChange={handleHeaderChange}
                      language="javascript"
                    />
                  </TabsContent>
                  <TabsContent
                    value="graphs"
                    className="absolute inset-0 m-0"
                  >
                    <div className="flex flex-col h-full">
                      <div className="p-1 border-b shrink-0">
                        <Select
                          value={selectedGraphStage}
                          onValueChange={setSelectedGraphStage}
                        >
                          <SelectTrigger className="h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {config.graphTransformations.map(
                              (stage: string) => (
                                <SelectItem
                                  key={stage}
                                  value={stage}
                                  className="text-xs"
                                >
                                  {_.startCase(stage)}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 min-h-0 overflow-auto">
                        <GraphvizViewer
                          dot={displayGraphs[selectedGraphStage]}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Panel>

            <PanelResizeHandle className="h-px bg-border hover:h-1 hover:bg-primary/50 transition-all" />

            {/* Center bottom */}
            <Panel defaultSize={50} minSize={10}>
              <Tabs
                defaultValue="errors"
                className="flex flex-col h-full"
              >
                <TabsList className="w-full justify-start rounded-none border-b bg-muted/40 h-8 px-1 shrink-0">
                  <TabsTrigger value="errors" className="text-xs h-6">
                    Errors
                    {errors.length > 0 ? ` (${errors.length})` : ""}
                  </TabsTrigger>
                  <TabsTrigger
                    value="generated"
                    className="text-xs h-6"
                  >
                    Generated JS
                  </TabsTrigger>
                  <TabsTrigger value="canvas" className="text-xs h-6">
                    Canvas
                  </TabsTrigger>
                </TabsList>
                <div className="flex-1 min-h-0 relative">
                  <TabsContent
                    value="errors"
                    className="absolute inset-0 m-0 overflow-auto p-3"
                  >
                    {errors.length === 0 ? (
                      <p className="text-green-600 text-center text-sm">
                        No problems
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {errors.map((e, i) => (
                          <li
                            key={i}
                            className="text-destructive text-xs font-mono"
                          >
                            {e}
                          </li>
                        ))}
                      </ul>
                    )}
                  </TabsContent>
                  <TabsContent
                    value="generated"
                    className="absolute inset-0 m-0"
                  >
                    <CodeEditor
                      value={cleanJs ?? ""}
                      readOnly
                      language="javascript"
                    />
                  </TabsContent>
                  <TabsContent
                    value="canvas"
                    className="absolute inset-0 m-0"
                  >
                    <CanvasPanel code={jsData} />
                  </TabsContent>
                </div>
              </Tabs>
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle className="w-px bg-border hover:w-1 hover:bg-primary/50 transition-all" />

        {/* Right: Trace & Analysis */}
        <Panel defaultSize={25} minSize={15}>
          <Tabs defaultValue="trace" className="flex flex-col h-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-muted/40 h-8 px-1 shrink-0">
              <TabsTrigger value="trace" className="text-xs h-6">
                Trace
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs h-6">
                Raw Trace
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs h-6">
                Analysis
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 min-h-0 relative">
              <TabsContent
                value="trace"
                className="absolute inset-0 m-0 overflow-auto"
              >
                <TraceTable lidlAst={lidlAst} traceAst={traceAst} />
              </TabsContent>
              <TabsContent
                value="advanced"
                className="absolute inset-0 m-0"
              >
                <CodeEditor
                  value={trace ?? ""}
                  readOnly
                  language="json"
                />
              </TabsContent>
              <TabsContent
                value="analysis"
                className="absolute inset-0 m-0 overflow-auto p-3"
              >
                {metrics ? (
                  <div className="space-y-1">
                    {Object.entries(metrics).map(([k, v]) => (
                      <p key={k} className="text-xs">
                        <span className="font-medium">
                          {_.startCase(k)}
                        </span>
                        : {String(v)}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center text-xs">
                    No metrics available
                  </p>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </Panel>
      </PanelGroup>
    </div>
  );
}

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
      (arg: any) => (interfaces as any).listOfAtoms(arg.interfac, arg.name),
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
