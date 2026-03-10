"use client";

import { useEffect, useRef } from "react";

function draw(ctx: CanvasRenderingContext2D, object: any) {
  if (!object) return;
  switch (object.type) {
    case "move":
      ctx.moveTo(object.x, object.y);
      break;
    case "line":
      ctx.lineTo(object.x, object.y);
      break;
    case "cubic":
      ctx.bezierCurveTo(
        object.cp1x,
        object.cp1y,
        object.cp2x,
        object.cp2y,
        object.x,
        object.y,
      );
      break;
    case "quadratic":
      ctx.quadraticCurveTo(object.cpx, object.cpy, object.x, object.y);
      break;
    case "arc":
      ctx.arcTo(object.x1, object.y1, object.x2, object.y2, object.radius);
      break;
    case "begin":
      ctx.beginPath();
      break;
    case "close":
      ctx.closePath();
      break;
    case "path":
      for (const item of object.content) draw(ctx, item);
      break;
    case "rect":
      ctx.beginPath();
      ctx.rect(object.x, object.y, object.width, object.height);
      break;
    case "shadow":
      ctx.save();
      ctx.shadowBlur = object.blur;
      ctx.shadowColor = object.color;
      ctx.shadowOffsetX = object.offset.x;
      ctx.shadowOffsetY = object.offset.y;
      draw(ctx, object.content);
      ctx.restore();
      break;
    case "fill":
      ctx.save();
      ctx.fillStyle = object.style;
      draw(ctx, object.content);
      ctx.fill();
      ctx.restore();
      break;
    case "stroke":
      ctx.save();
      ctx.strokeStyle = object.style;
      draw(ctx, object.content);
      ctx.stroke();
      ctx.restore();
      break;
    case "clip":
      ctx.save();
      draw(ctx, object.region);
      ctx.clip();
      draw(ctx, object.content);
      ctx.restore();
      break;
    case "transform":
      ctx.save();
      ctx.transform(
        object.a,
        object.b,
        object.c,
        object.d,
        object.e,
        object.f,
      );
      draw(ctx, object.content);
      ctx.restore();
      break;
    case "scale":
      ctx.save();
      ctx.scale(object.width, object.height);
      draw(ctx, object.content);
      ctx.restore();
      break;
    case "translate":
      ctx.save();
      ctx.translate(object.x, object.y);
      draw(ctx, object.content);
      ctx.restore();
      break;
    case "rotate":
      ctx.save();
      ctx.rotate(object.angle);
      draw(ctx, object.content);
      ctx.restore();
      break;
    case "group":
      for (const item of object.content) draw(ctx, item);
      break;
    case "text":
      ctx.textAlign = object.textAlign;
      ctx.textBaseline = object.textBaseline;
      ctx.font = object.font;
      ctx.beginPath();
      ctx.fillText(object.text, object.x, object.y);
      break;
  }
}

interface CanvasPanelProps {
  code: any;
}

export default function CanvasPanel({ code }: CanvasPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transitionFnRef = useRef<((data: any) => any) | null>(null);
  const interfaceStateRef = useRef<any>({
    layout: { width: 800, height: 600, x: 0, y: 0 },
    time: 0,
    mouse: {
      buttons: 0,
      position: { x: 0, y: 0 },
      wheel: { x: 0, y: 0, z: 0 },
    },
    keyboard: {},
    touch: [],
    graphics: { type: "group", content: [] },
  });
  const lidlOutRef = useRef<any>({
    memo: {},
    state: {},
    inter: {},
    args: {},
  });

  useEffect(() => {
    if (!code?.partialSource) {
      transitionFnRef.current = null;
      return;
    }
    try {
      transitionFnRef.current = new Function(
        "data",
        code.partialSource.transitionFunction,
      ) as any;
      const initFn = new Function(
        "data",
        code.partialSource.initializationFunction,
      ) as any;
      const initial = initFn();
      lidlOutRef.current = initial;
      if (initial?.inter) interfaceStateRef.current = initial.inter;
    } catch (e) {
      console.error("Canvas init error:", e);
    }
  }, [code]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    function runStep() {
      if (!transitionFnRef.current || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      try {
        const lidlIn = {
          memo: lidlOutRef.current.memo,
          state: lidlOutRef.current.state,
          args: lidlOutRef.current.args,
          inter: interfaceStateRef.current,
        };
        const result = transitionFnRef.current(lidlIn);
        ctx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        if (result?.inter?.graphics) draw(ctx, result.inter.graphics);
        lidlOutRef.current = result;
        if (result?.inter) interfaceStateRef.current = result.inter;
      } catch (e) {
        console.error("Canvas step error:", e);
      }
    }

    function handleMouse(e: MouseEvent) {
      const cvs = canvasRef.current;
      const ctr = containerRef.current;
      if (!cvs || !ctr) return;
      const rect = cvs.getBoundingClientRect();
      const st = interfaceStateRef.current;

      interfaceStateRef.current = {
        ...st,
        layout: {
          width: ctr.offsetWidth,
          height: ctr.offsetHeight,
          x: 0,
          y: 0,
        },
        time: e.timeStamp,
        mouse: {
          buttons: e.buttons,
          position: {
            x:
              (e.clientX - rect.left) *
              ((st.layout?.width || rect.width) / rect.width),
            y:
              (e.clientY - rect.top) *
              ((st.layout?.height || rect.height) / rect.height),
          },
          wheel: {
            x: (e as any).deltaX ?? 0,
            y: (e as any).deltaY ?? 0,
            z: (e as any).deltaZ ?? 0,
          },
        },
      };
      runStep();
    }

    function handleKeydown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const st = interfaceStateRef.current;
      if (st.keyboard?.[key] !== true) {
        interfaceStateRef.current = {
          ...st,
          keyboard: { ...st.keyboard, [key]: true },
        };
        runStep();
      }
    }

    function handleKeyup(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const st = interfaceStateRef.current;
      interfaceStateRef.current = {
        ...st,
        keyboard: { ...st.keyboard, [key]: false },
      };
      runStep();
    }

    function handleTouch(e: TouchEvent) {
      const cvs = canvasRef.current;
      const ctr = containerRef.current;
      if (!cvs || !ctr) return;
      const rect = cvs.getBoundingClientRect();
      const touches: any[] = [];
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        touches.push({
          position: { x: t.clientX - rect.left, y: t.clientY - rect.top },
          identifier: t.identifier,
          radius: { x: t.radiusX, y: t.radiusY },
          rotationAngle: t.rotationAngle,
          force: t.force,
        });
      }
      const st = interfaceStateRef.current;
      interfaceStateRef.current = {
        ...st,
        layout: {
          width: ctr.offsetWidth,
          height: ctr.offsetHeight,
          x: 0,
          y: 0,
        },
        time: e.timeStamp,
        touch: touches,
      };
      runStep();
    }

    function handleContextMenu(e: Event) {
      e.preventDefault();
      e.stopPropagation();
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (canvasRef.current) {
          canvasRef.current.width = width;
          canvasRef.current.height = height;
        }
        interfaceStateRef.current = {
          ...interfaceStateRef.current,
          layout: { width, height, x: 0, y: 0 },
        };
      }
    });
    resizeObserver.observe(container);

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mousedown", handleMouse);
    canvas.addEventListener("mouseup", handleMouse);
    canvas.addEventListener("wheel", handleMouse);
    canvas.addEventListener("keydown", handleKeydown);
    canvas.addEventListener("keyup", handleKeyup);
    canvas.addEventListener("touchstart", handleTouch);
    canvas.addEventListener("touchmove", handleTouch);
    canvas.addEventListener("touchend", handleTouch);
    canvas.addEventListener("touchcancel", handleTouch);
    canvas.addEventListener("contextmenu", handleContextMenu);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mousedown", handleMouse);
      canvas.removeEventListener("mouseup", handleMouse);
      canvas.removeEventListener("wheel", handleMouse);
      canvas.removeEventListener("keydown", handleKeydown);
      canvas.removeEventListener("keyup", handleKeyup);
      canvas.removeEventListener("touchstart", handleTouch);
      canvas.removeEventListener("touchmove", handleTouch);
      canvas.removeEventListener("touchend", handleTouch);
      canvas.removeEventListener("touchcancel", handleTouch);
      canvas.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {!code?.partialSource && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm z-10">
          No compiled code
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ backgroundColor: "rgb(217, 217, 217)", cursor: "none" }}
        tabIndex={1}
        width={800}
        height={600}
      />
    </div>
  );
}
