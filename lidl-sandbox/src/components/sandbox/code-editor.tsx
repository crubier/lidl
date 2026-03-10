"use client";

import { useRef } from "react";
import { useTheme } from "next-themes";
import Editor, { type OnMount, type BeforeMount } from "@monaco-editor/react";
import { registerLidlLanguage } from "@/lib/lidl-monarch";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: "lidl" | "javascript" | "json";
}

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  language = "lidl",
}: CodeEditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const { resolvedTheme } = useTheme();

  const handleBeforeMount: BeforeMount = (monaco) => {
    registerLidlLanguage(monaco);
  };

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      height="100%"
      language={language}
      theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
      value={value}
      onChange={(v) => onChange?.(v ?? "")}
      beforeMount={handleBeforeMount}
      onMount={handleMount}
      options={{
        readOnly,
        minimap: { enabled: false },
        wordWrap: "on",
        fontSize: 13,
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        renderLineHighlight: "none",
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  );
}
