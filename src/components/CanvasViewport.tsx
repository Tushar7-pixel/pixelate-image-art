import React, { useRef, useState, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Grid3X3, Eye } from "lucide-react";

interface PixelInfo {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  hex: string;
}

interface CanvasViewportProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  hasImage: boolean;
}

export const CanvasViewport: React.FC<CanvasViewportProps> = ({
  canvasRef,
  hasImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(false);
  const [hoveredPixel, setHoveredPixel] = useState<PixelInfo | null>(null);

  // Reset viewport when new image loads
  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setHoveredPixel(null);
  }, [hasImage]);

  // Handle Zoom via Mouse Wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    setScale((prev) => Math.min(Math.max(0.5, prev * zoomFactor), 25));
  };

  // Pan controls
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 || e.button === 1) {
      // Left click or Middle click
      setIsPanning(true);
      setStartPan({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
      return;
    }

    // Inspect hovered pixel
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const pixelX = Math.floor((clientX / rect.width) * canvas.width);
    const pixelY = Math.floor((clientY / rect.height) * canvas.height);

    if (
      pixelX >= 0 &&
      pixelX < canvas.width &&
      pixelY >= 0 &&
      pixelY < canvas.height
    ) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const pixelData = ctx.getImageData(pixelX, pixelY, 1, 1).data;
        const hex = `#${(
          (1 << 24) +
          (pixelData[0] << 16) +
          (pixelData[1] << 8) +
          pixelData[2]
        )
          .toString(16)
          .slice(1)
          .toUpperCase()}`;

        setHoveredPixel({
          x: pixelX,
          y: pixelY,
          r: pixelData[0],
          g: pixelData[1],
          b: pixelData[2],
          hex,
        });
      }
    } else {
      setHoveredPixel(null);
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsPanning(false);
        setHoveredPixel(null);
      }}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 select-none cursor-grab active:cursor-grabbing border border-slate-800 rounded-2xl"
    >
      {/* Floating Viewport Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 shadow-lg text-slate-300">
        <button
          title="Zoom In"
          onClick={() => setScale((s) => Math.min(s * 1.25, 25))}
          className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          title="Zoom Out"
          onClick={() => setScale((s) => Math.max(s * 0.8, 0.5))}
          className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          title="Reset Zoom"
          onClick={resetView}
          className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        <button
          title="Toggle Pixel Grid"
          onClick={() => setShowGrid(!showGrid)}
          className={`p-1.5 rounded-lg transition ${
            showGrid
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              : "hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono px-2 text-slate-400">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Floating Pixel Inspector HUD */}
      {hoveredPixel && (
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60 shadow-xl flex items-center gap-3 text-xs font-mono text-slate-200">
          <div
            className="w-4 h-4 rounded border border-white/20 shadow-inner"
            style={{ backgroundColor: hoveredPixel.hex }}
          />
          <span>{hoveredPixel.hex}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">
            RGB({hoveredPixel.r}, {hoveredPixel.g}, {hoveredPixel.b})
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400">
            [{hoveredPixel.x}, {hoveredPixel.y}]
          </span>
        </div>
      )}

      {/* Canvas Layer */}
      {/* Canvas Layer */}
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: isPanning ? "none" : "transform 0.05s ease-out",
        }}
        className="relative flex items-center justify-center"
      >
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="shadow-2xl rounded-xl block"
            style={{
              imageRendering: "pixelated",
              display: hasImage ? "block" : "none",
              width: "auto",
              height: "min(70vh, 520px)",
              aspectRatio: canvasRef.current
                ? `${canvasRef.current.width} / ${canvasRef.current.height}`
                : "auto",
            }}
          />

          {/* Optional Pixel Grid Overlay matching exact CSS dimensions */}
          {showGrid && scale >= 3 && canvasRef.current && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
              style={{
                backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.18) 1px, transparent 1px)
          `,
                backgroundSize: `${100 / canvasRef.current.width}% ${100 / canvasRef.current.height}%`,
              }}
            />
          )}
        </div>
      </div>

      {!hasImage && (
        <div className="flex flex-col items-center justify-center text-slate-600 gap-2 pointer-events-none">
          <Eye className="w-10 h-10 stroke-1" />
          <p className="text-sm font-medium">No image loaded</p>
        </div>
      )}
    </div>
  );
};
