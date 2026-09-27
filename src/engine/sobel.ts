export function computeSobelEdges(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    threshold = 60
): boolean[] {
    const edges = new Array<boolean>(width * height).fill(false);

    // Convert to grayscale helper
    const getLum = (x: number, y: number) => {
        const idx = (y * width + x) * 4;
        return 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
    };

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            // Horizontal gradient Gx
            const gx =
                -1 * getLum(x - 1, y - 1) + 1 * getLum(x + 1, y - 1) +
                -2 * getLum(x - 1, y) + 2 * getLum(x + 1, y) +
                -1 * getLum(x - 1, y + 1) + 1 * getLum(x + 1, y + 1);

            // Vertical gradient Gy
            const gy =
                -1 * getLum(x - 1, y - 1) - 2 * getLum(x, y - 1) - 1 * getLum(x + 1, y - 1) +
                1 * getLum(x - 1, y + 1) + 2 * getLum(x, y + 1) + 1 * getLum(x + 1, y + 1);

            const magnitude = Math.sqrt(gx * gx + gy * gy);
            if (magnitude > threshold) {
                edges[y * width + x] = true;
            }
        }
    }

    return edges;
}