import { PALETTES, findClosestColor } from './palettes';
import type { RGB } from './palettes';
import { applyBayerDither, applyFloydSteinberg } from './dither';
import { computeSobelEdges } from './sobel';

export interface ProcessOptions {
    pixelResolution: number;
    paletteKey: string;
    ditherType: 'none' | 'bayer' | 'floyd-steinberg';
    ditherStrength: number;
    outlineStrength: number;
}

export function processImage(
    sourceImage: HTMLImageElement,
    options: ProcessOptions
): ImageData {
    const { pixelResolution, paletteKey, ditherType, ditherStrength, outlineStrength } = options;

    const aspect = sourceImage.width / sourceImage.height;
    let targetW = pixelResolution;
    let targetH = Math.round(pixelResolution / aspect);
    if (aspect < 1) {
        targetH = pixelResolution;
        targetW = Math.round(pixelResolution * aspect);
    }

    const offscreen = document.createElement('canvas');
    offscreen.width = targetW;
    offscreen.height = targetH;
    const ctx = offscreen.getContext('2d', { willReadFrequently: true })!;

    ctx.drawImage(sourceImage, 0, 0, targetW, targetH);
    const rawData = ctx.getImageData(0, 0, targetW, targetH);

    let edgeMap: boolean[] | null = null;
    if (outlineStrength > 0) {
        const threshold = Math.max(10, 120 - outlineStrength);
        edgeMap = computeSobelEdges(rawData.data, targetW, targetH, threshold);
    }

    const palette = PALETTES[paletteKey]?.colors || [];
    const usePalette = palette.length > 0;

    let outputData: ImageData;

    if (ditherType === 'floyd-steinberg' && usePalette) {
        const floatBuf = new Float32Array(targetW * targetH * 3);
        for (let i = 0; i < targetW * targetH; i++) {
            floatBuf[i * 3] = rawData.data[i * 4];
            floatBuf[i * 3 + 1] = rawData.data[i * 4 + 1];
            floatBuf[i * 3 + 2] = rawData.data[i * 4 + 2];
        }
        const quantized = applyFloydSteinberg(floatBuf, targetW, targetH, palette);
        outputData = new ImageData(quantized, targetW, targetH);
    } else {
        outputData = ctx.createImageData(targetW, targetH);
        for (let y = 0; y < targetH; y++) {
            for (let x = 0; x < targetW; x++) {
                const idx = (y * targetW + x) * 4;
                let c: RGB = {
                    r: rawData.data[idx],
                    g: rawData.data[idx + 1],
                    b: rawData.data[idx + 2],
                };

                if (ditherType === 'bayer' && usePalette) {
                    c = applyBayerDither(c, x, y, ditherStrength);
                }

                if (usePalette) {
                    c = findClosestColor(c, palette);
                }

                outputData.data[idx] = c.r;
                outputData.data[idx + 1] = c.g;
                outputData.data[idx + 2] = c.b;
                outputData.data[idx + 3] = 255;
            }
        }
    }

    if (edgeMap) {
        for (let i = 0; i < edgeMap.length; i++) {
            if (edgeMap[i]) {
                const idx = i * 4;
                outputData.data[idx] = Math.floor(outputData.data[idx] * 0.2);
                outputData.data[idx + 1] = Math.floor(outputData.data[idx + 1] * 0.2);
                outputData.data[idx + 2] = Math.floor(outputData.data[idx + 2] * 0.2);
            }
        }
    }

    return outputData;
}