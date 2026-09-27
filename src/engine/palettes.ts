export type RGB = {
    r: number;
    g: number;
    b: number;
};

export interface PaletteItem {
    name: string;
    colors: RGB[];
}

export const PALETTES: Record<string, PaletteItem> = {
    original: { name: 'Full Color (Posterized)', colors: [] },
    gameboy: {
        name: 'Game Boy (4 Colors)',
        colors: [
            { r: 15, g: 56, b: 15 },
            { r: 48, g: 98, b: 48 },
            { r: 139, g: 172, b: 15 },
            { r: 155, g: 188, b: 15 }
        ]
    },
    pico8: {
        name: 'PICO-8 (16 Colors)',
        colors: [
            { r: 0, g: 0, b: 0 }, { r: 29, g: 43, b: 83 }, { r: 126, g: 37, b: 83 },
            { r: 0, g: 135, b: 81 }, { r: 171, g: 82, b: 54 }, { r: 95, g: 87, b: 79 },
            { r: 194, g: 195, b: 199 }, { r: 255, g: 241, b: 232 }, { r: 255, g: 0, b: 77 },
            { r: 255, g: 163, b: 0 }, { r: 255, g: 236, b: 39 }, { r: 0, g: 228, b: 54 },
            { r: 41, g: 173, b: 255 }, { r: 131, g: 118, b: 156 }, { r: 255, g: 119, b: 168 },
            { r: 255, g: 204, b: 170 }
        ]
    },
    cyberpunk: {
        name: 'Neon Cyberpunk (8 Colors)',
        colors: [
            { r: 13, g: 2, b: 33 }, { r: 0, g: 245, b: 212 }, { r: 123, g: 44, b: 191 },
            { r: 255, g: 0, b: 110 }, { r: 255, g: 190, b: 11 }, { r: 58, g: 12, b: 163 },
            { r: 247, g: 37, b: 133 }, { r: 76, g: 201, b: 240 }
        ]
    }
};

export function findClosestColor(color: RGB, palette: RGB[]): RGB {
    let minDistance = Infinity;
    let closest = palette[0];

    for (let i = 0; i < palette.length; i++) {
        const p = palette[i];
        const dr = color.r - p.r;
        const dg = color.g - p.g;
        const db = color.b - p.b;
        const dist = dr * dr * 0.299 + dg * dg * 0.587 + db * db * 0.114;

        if (dist < minDistance) {
            minDistance = dist;
            closest = p;
        }
    }
    return closest;
}