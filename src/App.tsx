import React, { useState, useRef, useEffect, useCallback } from "react";
import type { ProcessOptions } from "./engine/processor";
import { CanvasViewport } from "./components/CanvasViewport";
import { Controls } from "./components/Controls";
import { Download, Wand2 } from "lucide-react";
import { processImage } from "./engine/processor";

export default function App() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [options, setOptions] = useState<ProcessOptions>({
    pixelResolution: 96,
    paletteKey: "pico8",
    ditherType: "floyd-steinberg",
    ditherStrength: 32,
    outlineStrength: 25,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);

  const executePipeline = useCallback(() => {
    if (!sourceImageRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const processed = processImage(sourceImageRef.current, options);

    canvas.width = processed.width;
    canvas.height = processed.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.putImageData(processed, 0, 0);
    }
  }, [options]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        sourceImageRef.current = img;
        setImageLoaded(true);
        executePipeline();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (imageLoaded) {
      executePipeline();
    }
  }, [options, imageLoaded, executePipeline]);

  const handleExport = () => {
    if (!canvasRef.current) return;
    const exportCanvas = document.createElement("canvas");
    // Scale up to crisp 1024px minimum export
    const scale = Math.max(1, Math.floor(1024 / canvasRef.current.width));
    exportCanvas.width = canvasRef.current.width * scale;
    exportCanvas.height = canvasRef.current.height * scale;

    const ctx = exportCanvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      canvasRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
      0,
      0,
      exportCanvas.width,
      exportCanvas.height,
    );

    const a = document.createElement("a");
    a.download = `pixel-art-${options.paletteKey}.png`;
    a.href = exportCanvas.toDataURL("image/png");
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 p-4 px-8 flex justify-between items-center bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Wand2 className="text-emerald-400 w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
              Pixel Art Studio
            </h1>
            <p className="text-xs text-slate-400">
              Canvas 2D Image Processing Pipeline
            </p>
          </div>
        </div>

        {imageLoaded && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-emerald-950"
          >
            <Download className="w-4 h-4" /> Export PNG
          </button>
        )}
      </header>

      {/* Main Studio Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-1">
          <Controls
            options={options}
            onChange={setOptions}
            onFileUpload={handleFileUpload}
          />
        </div>
        <div className="lg:col-span-3 min-h-[500px]">
          <CanvasViewport canvasRef={canvasRef} hasImage={imageLoaded} />
        </div>
      </div>
    </div>
  );
}
