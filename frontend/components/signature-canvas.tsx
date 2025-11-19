"use client";

import { useRef, useEffect } from "react";

interface SignatureCanvasProps {
  onCanvasReady?: (api: {
    clear: () => void;
    toDataURL: () => string;
    isEmpty: () => boolean;
  }) => void;
}

export function Canvas({ onCanvasReady }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasDrawnRef = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;

      const oldImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;

      ctx.scale(scale, scale);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#9334EB";

      ctx.putImageData(oldImage, 0, 0);
    };

    // Prevent clearing drawing on resize
    const savedImage = () =>
      ctx.getImageData(0, 0, canvas.width, canvas.height);

    const redraw = () => {
      // const image = savedImage();
      setupCanvas();
      // if (image) ctx.putImageData(image, 0, 0);
    };

    setupCanvas();
    window.addEventListener("resize", redraw);

    const getCoords = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const client = "touches" in e ? e.touches[0] : e;
      return {
        x: client.clientX - rect.left,
        y: client.clientY - rect.top,
      };
    };

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawingRef.current = true;
      const { x, y } = getCoords(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const { x, y } = getCoords(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      hasDrawnRef.current = true;
    };

    const end = () => {
      isDrawingRef.current = false;
      ctx.closePath();
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseleave", end);
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", end);

    // API exposed to parent
    onCanvasReady?.({
      clear: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasDrawnRef.current = false;
      },
      toDataURL: () => canvas.toDataURL("image/png"),
      isEmpty: () => !hasDrawnRef.current,
    });

    return () => {
      window.removeEventListener("resize", redraw);
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("mouseleave", end);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", end);
    };
  }, [onCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-52 cursor-crosshair bg-background border-2 border-dashed border-border rounded-lg"
    />
  );
}
