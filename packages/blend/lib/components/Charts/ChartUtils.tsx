import { NewNestedDataPoint, FlattenedDataPoint } from "./types";

export function transformNestedData(
  data: NewNestedDataPoint[],
  selectedKeys: string[] = [],
): FlattenedDataPoint[] {
  return data.map((item) => {
    const flattened: FlattenedDataPoint = { name: item.name };

    const keysToInclude =
      selectedKeys.length > 0
        ? Object.keys(item.data).filter((key) => selectedKeys.includes(key))
        : Object.keys(item.data);

    for (const key of keysToInclude) {
      flattened[key] = item.data[key].primary.val;
    }

    return flattened;
  });
}

export function lightenHexColor(hex: string, amount: number = 0.3): string {
  hex = hex.replace(/^#/, "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const [h, s, l] = rgbToHsl(r, g, b);

  const newL = Math.min(1, l + amount);

  const [newR, newG, newB] = hslToRgb(h, s, newL);

  return (
    "#" +
    [newR, newG, newB]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const formatNumber = (value: number | string): string => {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) return value;
    value = parsedValue;
  }

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value.toString();
};

export const capitaliseCamelCase = (text: string): string => {
  if (!text) return "";
  const words = text.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/);
  return words
    .map((word) => {
      if (word.toUpperCase() === word && word.length > 1) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};
