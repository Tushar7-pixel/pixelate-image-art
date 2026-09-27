import { findClosestColor } from './palettes';
import type { RGB } from './palettes';

export const BAYER_4X4 = [
    [0 / 16, 8 / 16, 2 / 16, 10 / 16],
    [12 / 16, 4 / 16, 14 / 16, 6 / 16],
    [3 / 16, 11 / 16, 1 / 16, 9 / 16],
    [15 / 16, 7 / 16, 13 / 16, 5 / 16]
].map(row => row.map(v => v - 0.5));

export function applyBayerDither(color: RGB, x: number, y: number, spread = 32): RGB {
    const threshold = BAYER_4X4[y % 4][x % 4];
    const delta = threshold * spread;
    return {
        r: Math.min(255, Math.max(0, color.r + delta)),
        g: Math.min(255, Math.max(0, color.g + delta)),
        b: Math.min(255, Math.max(0, color.b + delta)),
    };
}

export function applyFloydSteinberg(
    buffer: Float32Array,
    width: number,
    height: number,
    palette: RGB[]
): Uint8ClampedArray {
    const output = new Uint8ClampedArray(width * height * 4);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx3 = (y * width + x) * 3;
            const curColor: RGB = {
                r: Math.min(255, Math.max(0, buffer[idx3])),
                g: Math.min(255, Math.max(0, buffer[idx3 + 1])),
                b: Math.min(255, Math.max(0, buffer[idx3 + 2]))
            };

            const matched = findClosestColor(curColor, palette);
            const outIdx = (y * width + x) * 4;
            output[outIdx] = matched.r;
            output[outIdx + 1] = matched.g;
            output[outIdx + 2] = matched.b;
            output[outIdx + 3] = 255;

            const errR = curColor.r - matched.r;
            const errG = curColor.g - matched.g;
            const errB = curColor.b - matched.b;

            const distribute = (dx: number, dy: number, factor: number) => {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    const nIdx = (ny * width + nx) * 3;
                    buffer[nIdx] += errR * factor;
                    buffer[nIdx + 1] += errG * factor;
                    buffer[nIdx + 2] += errB * factor;
                }
            };

            distribute(1, 0, 7 / 16);
            distribute(-1, 1, 3 / 16);
            distribute(0, 1, 5 / 16);
            distribute(1, 1, 1 / 16);
        }
    }

    return output;
}