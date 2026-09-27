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
    original: {
        name: 'Full Color (Posterized / No Palette)',
        colors: []
    },

    // 1. Classic Handhelds & Consoles
    gameboy: {
        name: 'Original Game Boy (DMG-01)',
        colors: [
            { r: 15, g: 56, b: 15 },
            { r: 48, g: 98, b: 48 },
            { r: 139, g: 172, b: 15 },
            { r: 155, g: 188, b: 15 }
        ]
    },
    gameboyPocket: {
        name: 'Game Boy Pocket (Monochrome LCD)',
        colors: [
            { r: 43, g: 51, b: 34 },
            { r: 94, g: 104, b: 79 },
            { r: 155, g: 165, b: 134 },
            { r: 201, g: 204, b: 186 }
        ]
    },
    nes: {
        name: 'NES / Famicom (16 Key Colors)',
        colors: [
            { r: 0, g: 0, b: 0 }, { r: 252, g: 252, b: 252 }, { r: 124, g: 124, b: 124 },
            { r: 0, g: 0, b: 252 }, { r: 0, g: 168, b: 0 }, { r: 248, g: 56, b: 0 },
            { r: 168, g: 0, b: 32 }, { r: 216, g: 40, b: 0 }, { r: 236, g: 88, b: 180 },
            { r: 252, g: 160, b: 68 }, { r: 248, g: 184, b: 0 }, { r: 184, g: 248, b: 24 },
            { r: 0, g: 168, b: 68 }, { r: 60, g: 188, b: 252 }, { r: 0, g: 120, b: 248 },
            { r: 68, g: 68, b: 68 }
        ]
    },
    cga: {
        name: 'IBM CGA (Mode 1 High-Intensity)',
        colors: [
            { r: 0, g: 0, b: 0 },
            { r: 85, g: 255, b: 255 },
            { r: 255, g: 85, b: 255 },
            { r: 255, g: 255, b: 255 }
        ]
    },
    commodore64: {
        name: 'Commodore 64 (16 Colors)',
        colors: [
            { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, { r: 136, g: 0, b: 0 },
            { r: 170, g: 255, b: 238 }, { r: 204, g: 68, b: 204 }, { r: 0, g: 204, b: 85 },
            { r: 0, g: 0, b: 170 }, { r: 238, g: 238, b: 119 }, { r: 221, g: 136, b: 85 },
            { r: 102, g: 68, b: 0 }, { r: 255, g: 119, b: 119 }, { r: 51, g: 51, b: 51 },
            { r: 119, g: 119, b: 119 }, { r: 170, g: 255, b: 102 }, { r: 0, g: 136, b: 255 },
            { r: 187, g: 187, b: 187 }
        ]
    },

    // 2. Fantasy Consoles & Modern Pixel Art Engines
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
    sweetie16: {
        name: 'Sweetie 16 (Lospec Favorite)',
        colors: [
            { r: 26, g: 28, b: 44 }, { r: 93, g: 39, b: 93 }, { r: 177, g: 62, b: 83 },
            { r: 239, g: 125, b: 87 }, { r: 255, g: 205, b: 117 }, { r: 167, g: 240, b: 112 },
            { r: 56, g: 183, b: 100 }, { r: 37, g: 113, b: 121 }, { r: 41, g: 54, b: 111 },
            { r: 59, g: 93, b: 201 }, { r: 65, g: 166, b: 246 }, { r: 115, g: 239, b: 247 },
            { r: 244, g: 244, b: 244 }, { r: 148, g: 176, b: 194 }, { r: 86, g: 108, b: 134 },
            { r: 51, g: 60, b: 87 }
        ]
    },
    endesga32: {
        name: 'EDG 32 (Rich Fantasy Palette)',
        colors: [
            { r: 190, g: 74, b: 47 }, { r: 215, g: 118, b: 67 }, { r: 234, g: 212, b: 170 },
            { r: 228, g: 166, b: 114 }, { r: 184, g: 111, b: 80 }, { r: 115, g: 62, b: 57 },
            { r: 62, g: 39, b: 49 }, { r: 162, g: 38, b: 51 }, { r: 228, g: 59, b: 68 },
            { r: 247, g: 118, b: 34 }, { r: 254, g: 174, b: 52 }, { r: 254, g: 231, b: 97 },
            { r: 99, g: 199, b: 77 }, { r: 62, g: 137, b: 72 }, { r: 38, g: 92, b: 66 },
            { r: 25, g: 60, b: 62 }, { r: 18, g: 78, b: 137 }, { r: 0, g: 153, b: 219 },
            { r: 44, g: 232, b: 245 }, { r: 255, g: 255, b: 255 }, { r: 192, g: 203, b: 220 },
            { r: 139, g: 155, b: 180 }, { r: 90, g: 105, b: 136 }, { r: 58, g: 68, b: 102 },
            { r: 38, g: 43, b: 68 }, { r: 24, g: 20, b: 37 }, { r: 255, g: 0, b: 68 },
            { r: 254, g: 231, b: 97 }, { r: 99, g: 199, b: 77 }, { r: 181, g: 80, b: 136 },
            { r: 111, g: 40, b: 98 }, { r: 73, g: 77, b: 126 }
        ]
    },

    // 3. Cinematic & Stylized
    cyberpunk: {
        name: 'Neon Cyberpunk (8 Colors)',
        colors: [
            { r: 13, g: 2, b: 33 }, { r: 0, g: 245, b: 212 }, { r: 123, g: 44, b: 191 },
            { r: 255, g: 0, b: 110 }, { r: 255, g: 190, b: 11 }, { r: 58, g: 12, b: 163 },
            { r: 247, g: 37, b: 133 }, { r: 76, g: 201, b: 240 }
        ]
    },
    vaporwave: {
        name: 'Vaporwave 80s (Aesthetic)',
        colors: [
            { r: 255, g: 113, b: 206 }, { r: 1, g: 205, b: 254 }, { r: 5, g: 255, b: 161 },
            { r: 185, g: 103, b: 255 }, { r: 255, g: 251, b: 150 }, { r: 34, g: 32, b: 52 },
            { r: 63, g: 63, b: 116 }, { r: 244, g: 244, b: 244 }
        ]
    },
    solarizedGhidli: {
        name: 'Studio Ghibli Meadow (Nature)',
        colors: [
            { r: 40, g: 54, b: 24 }, { r: 96, g: 108, b: 56 }, { r: 254, g: 250, b: 224 },
            { r: 221, g: 161, b: 94 }, { r: 188, g: 108, b: 37 }, { r: 43, g: 45, b: 66 },
            { r: 141, g: 153, b: 174 }, { r: 237, g: 242, b: 244 }
        ]
    },
    crimsonNight: {
        name: 'Crimson Monochrome (Vampiric)',
        colors: [
            { r: 26, g: 18, b: 23 },
            { r: 87, g: 10, b: 38 },
            { r: 164, g: 19, b: 60 },
            { r: 255, g: 77, b: 109 },
            { r: 255, g: 204, b: 213 }
        ]
    },
    paper1bit: {
        name: '1-Bit Print (Black & Ivory)',
        colors: [
            { r: 32, g: 30, b: 32 },
            { r: 245, g: 240, b: 225 }
        ]
    }
};

export function findClosestColor(color: RGB, palette: RGB[]): RGB {
    let minDistance = Infinity;
    let closest = palette[0];

    for (let i = 0; i < palette.length; i++) {
        const p = palette[i];
        // Perceptual luminance weighting
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