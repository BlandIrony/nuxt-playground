const map = (x: number, a: number, b: number, c: number, d: number): number => (x - a) * (d - c) / (b - a) + c;

const clamp = (num: number, min: number, max: number): number => num <= min ? min : num >= max ? max : num;

export { clamp, map };
