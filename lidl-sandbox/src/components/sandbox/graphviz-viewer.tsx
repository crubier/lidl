"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface GraphvizViewerProps {
  dot?: string;
}

export default function GraphvizViewer({ dot }: GraphvizViewerProps) {
  const [svg, setSvg] = useState("");
  const vizRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    import("@viz-js/viz").then(async (mod) => {
      try {
        const init = mod.instance ?? mod.default?.create ?? mod.default;
        const viz =
          typeof init === "function" ? await init() : await mod.default;
        if (!cancelled) {
          vizRef.current = viz;
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to init Graphviz:", e);
        if (!cancelled) setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!vizRef.current || !dot) {
      setSvg("");
      return;
    }
    try {
      let result: string = vizRef.current.renderString(dot, {
        format: "svg",
        engine: "dot",
      });
      const offset = result.indexOf("<svg");
      if (offset > 0) result = result.substring(offset);
      result = result.replace(/(width="[^"]+pt")/g, 'width="100%"');
      result = result.replace(/(height="[^"]+pt")/g, '');
      setSvg(result);
    } catch (e) {
      console.error("Graphviz render error:", e);
      setSvg("");
    }
  }, [dot]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading Graphviz…
      </div>
    );
  }

  if (!dot) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No graph data
      </div>
    );
  }

  return (
    <div
      className="w-full h-full overflow-auto p-2"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
