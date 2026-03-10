"use client";

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, type Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: "text" | "javascript" | "json";
}

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  language = "text",
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const isUpdatingRef = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;

    const extensions: Extension[] = [basicSetup];

    if (language === "javascript") extensions.push(javascript());
    else if (language === "json") extensions.push(json());

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true));
      extensions.push(EditorView.editable.of(false));
    }

    extensions.push(
      EditorView.updateListener.of((update) => {
        if (update.docChanged && !isUpdatingRef.current) {
          onChangeRef.current?.(update.state.doc.toString());
        }
      }),
    );

    extensions.push(
      EditorView.theme({
        "&": { height: "100%" },
        ".cm-scroller": { overflow: "auto" },
      }),
    );

    const state = EditorState.create({ doc: value, extensions });
    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, readOnly]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const cur = view.state.doc.toString();
    if (cur !== value) {
      isUpdatingRef.current = true;
      view.dispatch({
        changes: { from: 0, to: cur.length, insert: value },
      });
      isUpdatingRef.current = false;
    }
  }, [value]);

  return <div ref={containerRef} className="h-full w-full overflow-hidden" />;
}
