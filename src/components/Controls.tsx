import React from "react";
import type { ProcessOptions } from "../engine/processor";
import { PALETTES } from "../engine/palettes";
import { Upload, Palette, Sliders, Layers, Sparkles } from "lucide-react";

interface ControlsProps {
  options: ProcessOptions;
  onChange: (options: ProcessOptions) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  options,
  onChange,
  onFileUpload,
}) => {
  const updateOption = <K extends keyof ProcessOptions>(
    key: K,
    value: ProcessOptions[K],
  ) => {
    onChange({
      ...options,
      [key]: value,
    });
  };

  const activePalette = PALETTES[options.paletteKey];

  return (
    <aside className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-6 shadow-xl w-full">
      {/* File Upload Section */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">
          <Upload className="w-4 h-4 text-emerald-400" /> Source Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileUpload}
          className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-slate-800 file:text-emerald-400 file:font-semibold hover:file:bg-slate-700 cursor-pointer border border-slate-800 rounded-xl bg-slate-950/40 p-1"
        />
      </div>

      <hr className="border-slate-800/80" />

      {/* Grid Resolution Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-500" /> Grid Size (Resolution)
          </span>
          <span className="font-mono text-emerald-400 font-medium">
            {options.pixelResolution}px
          </span>
        </div>
        <input
          type="range"
          min="16"
          max="256"
          step="8"
          value={options.pixelResolution}
          onChange={(e) =>
            updateOption("pixelResolution", Number(e.target.value))
          }
          className="accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>16px (Chunky)</span>
          <span>128px</span>
          <span>256px (Fine)</span>
        </div>
      </div>

      {/* Palette Selection & Preview */}
      <div className="flex flex-col gap-2.5">
        <label className="text-sm text-slate-400 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-slate-500" /> Color Palette
        </label>
        <select
          value={options.paletteKey}
          onChange={(e) => updateOption("paletteKey", e.target.value)}
          className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition"
        >
          {Object.entries(PALETTES).map(([key, item]) => (
            <option key={key} value={key}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Color Swatch Preview Strip */}
        {activePalette && activePalette.colors.length > 0 && (
          <div className="flex flex-wrap gap-1 p-2 bg-slate-950/60 rounded-xl border border-slate-800">
            {activePalette.colors.map((c, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-md shadow-sm border border-white/10"
                style={{ backgroundColor: `rgb(${c.r}, ${c.g}, ${c.b})` }}
                title={`rgb(${c.r}, ${c.g}, ${c.b})`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dithering Mode */}
      <div className="flex flex-col gap-2.5">
        <label className="text-sm text-slate-400 flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-slate-500" /> Dithering Technique
        </label>
        <select
          value={options.ditherType}
          onChange={(e) => updateOption("ditherType", e.target.value as any)}
          className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition"
        >
          <option value="none">None (Direct Nearest Match)</option>
          <option value="bayer">Ordered (4x4 Bayer Matrix)</option>
          <option value="floyd-steinberg">
            Error Diffusion (Floyd-Steinberg)
          </option>
        </select>

        {/* Dither strength slider (only relevant if Bayer is selected) */}
        {options.ditherType === "bayer" && (
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Bayer Pattern Intensity</span>
              <span className="font-mono text-emerald-400">
                {options.ditherStrength}
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              step="4"
              value={options.ditherStrength}
              onChange={(e) =>
                updateOption("ditherStrength", Number(e.target.value))
              }
              className="accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        )}
      </div>

      {/* Sobel Outlines */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-slate-500" /> Edge Outlines
            (Sobel)
          </span>
          <span className="font-mono text-emerald-400 font-medium">
            {options.outlineStrength}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="80"
          step="5"
          value={options.outlineStrength}
          onChange={(e) =>
            updateOption("outlineStrength", Number(e.target.value))
          }
          className="accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
        />
        <span className="text-[10px] text-slate-500">
          Adds dark silhouette outlines around objects
        </span>
      </div>
    </aside>
  );
};
