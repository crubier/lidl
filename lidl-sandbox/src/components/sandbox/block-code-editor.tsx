"use client";

import { useTheme } from "next-themes";
import { interactions } from "lidl-core";
import _ from "lodash";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

interface InteractionNode {
  type: string;
  operator: string;
  formating?: string;
  operand: InteractionNode[];
  lang?: string;
  code?: string;
}

function InteractionBlock({
  node,
  isDark,
  depth,
}: {
  node: InteractionNode;
  isDark: boolean;
  depth: number;
}) {
  if (node.type === "InteractionNative") {
    return (
      <span
        className="inline-block rounded border px-1 font-mono text-xs"
        style={{
          backgroundColor: isDark
            ? "hsla(200, 30%, 25%, 1)"
            : "hsla(200, 100%, 94%, 1)",
          borderColor: isDark
            ? "hsla(200, 30%, 35%, 0.6)"
            : "hsla(200, 100%, 80%, 0.6)",
        }}
      >
        {node.lang ?? "native"}`{node.code ?? "..."}`
      </span>
    );
  }

  const hue = Math.abs(hashCode(node.operator)) % 360;
  const bgColor = isDark
    ? `hsla(${hue}, 30%, ${18 + (depth % 3) * 4}%, 1)`
    : `hsla(${hue}, 100%, ${94 - (depth % 3) * 3}%, 1)`;
  const borderColor = isDark
    ? `hsla(${hue}, 40%, 35%, 0.6)`
    : `hsla(${hue}, 60%, 75%, 0.6)`;

  let elements: (string | InteractionNode)[];
  try {
    elements = interactions.toShallowListOfElements(node);
  } catch {
    return (
      <span className="text-xs text-muted-foreground italic">
        {node.operator || "(empty)"}
      </span>
    );
  }

  if (elements.length === 0 && node.operand.length === 0) {
    const text = node.formating || node.operator || "";
    return (
      <span
        className="inline-block rounded border px-1 align-middle text-sm"
        style={{ backgroundColor: bgColor, borderColor }}
      >
        {text || "\u00A0"}
      </span>
    );
  }

  return (
    <span
      className="inline-block rounded border px-0.5 align-middle"
      style={{ backgroundColor: bgColor, borderColor }}
    >
      {elements.map((el, i) => {
        if (typeof el === "string") {
          const lines = el.split("\n");
          return (
            <span key={i} className="whitespace-pre-wrap text-sm align-middle">
              {lines.map((line, li) => (
                <span key={li}>
                  {li > 0 && <br />}
                  {line.replace(/ /g, "\u00A0")}
                </span>
              ))}
            </span>
          );
        }
        return (
          <InteractionBlock
            key={i}
            node={el}
            isDark={isDark}
            depth={depth + 1}
          />
        );
      })}
    </span>
  );
}

export default function BlockCodeEditor({
  lidlAst,
}: {
  lidlAst: any;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (!lidlAst || !Array.isArray(lidlAst) || lidlAst.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No AST available
      </div>
    );
  }

  const interaction = lidlAst[0]?.interaction;
  if (!interaction) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No interaction found in AST
      </div>
    );
  }

  return (
    <div className="overflow-auto h-full w-full p-3">
      <InteractionBlock node={interaction} isDark={isDark} depth={0} />
    </div>
  );
}
