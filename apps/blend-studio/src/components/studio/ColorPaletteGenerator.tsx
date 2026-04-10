import { useState, useCallback } from 'react'
import { Copy, RefreshCw, Check } from 'lucide-react'

interface ColorPaletteGeneratorProps {
    value: Record<string, string> | Partial<Record<string, string>>
    onChange: (shades: Record<string, string>) => void
    label?: string
}

export function ColorPaletteGenerator({
    value,
    onChange,
    label = 'Primary Color',
}: ColorPaletteGeneratorProps) {
    const [baseColor, setBaseColor] = useState(value['500'] || '#3B82F6')
    const [copied, setCopied] = useState(false)

    // Generate color scale using OKLCH-like algorithm
    const generateShades = useCallback(
        (hex: string): Record<string, string> => {
            const shades: Record<string, string> = {}
            const levels = [
                50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
            ]

            // Convert hex to RGB
            const rgb = hexToRgb(hex)
            if (!rgb) return shades

            // Convert to HSL for easier manipulation
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

            levels.forEach((level) => {
                let lightness: number

                if (level < 500) {
                    // Lighter shades - interpolate towards white
                    const factor = (500 - level) / 450 // 0 to 1
                    lightness = hsl.l + (95 - hsl.l) * factor * 0.85
                } else if (level === 500) {
                    // Base color
                    lightness = hsl.l
                } else {
                    // Darker shades - interpolate towards black
                    const factor = (level - 500) / 450 // 0 to 1
                    lightness = hsl.l * (1 - factor * 0.7)
                }

                // Clamp lightness
                lightness = Math.max(5, Math.min(98, lightness))

                // Convert back to hex
                const newRgb = hslToRgb(hsl.h, hsl.s, lightness)
                shades[level] = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
            })

            return shades
        },
        []
    )

    const handleBaseColorChange = (newColor: string) => {
        setBaseColor(newColor)
        const shades = generateShades(newColor)
        onChange(shades)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(value, null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleRegenerate = () => {
        const shades = generateShades(baseColor)
        onChange(shades)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="flex gap-2">
                    <button
                        onClick={handleRegenerate}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Regenerate from base color"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Copy palette JSON"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Base Color Input */}
            <div className="flex items-center gap-3">
                <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => handleBaseColorChange(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-0"
                />
                <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => handleBaseColorChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder="#3B82F6"
                />
            </div>

            {/* Generated Shades */}
            <div className="space-y-2">
                <div className="text-xs text-gray-500">Generated Palette</div>
                <div className="grid grid-cols-11 gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                        (shade) => (
                            <div key={shade} className="group relative">
                                <div
                                    className="aspect-square rounded cursor-pointer transition-transform hover:scale-110"
                                    style={{
                                        backgroundColor: value[shade] || '#ccc',
                                    }}
                                    title={`${shade}: ${value[shade] || ''}`}
                                />
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {shade}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Individual Shade Editors */}
            <div className="grid grid-cols-4 gap-2 pt-2">
                {Object.entries(value).map(([shade, color]) => (
                    <div key={shade} className="flex items-center gap-2">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) =>
                                onChange({
                                    ...(value || {}),
                                    [shade]: e.target.value,
                                } as Record<string, string>)
                            }
                            className="w-8 h-8 rounded cursor-pointer border-0"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500">{shade}</div>
                            <div className="text-[10px] font-mono text-gray-400 truncate">
                                {color}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Color utility functions
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null
}

function rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

function rgbToHsl(
    r: number,
    g: number,
    b: number
): { h: number; s: number; l: number } {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6
                break
            case g:
                h = ((b - r) / d + 2) / 6
                break
            case b:
                h = ((r - g) / d + 4) / 6
                break
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToRgb(
    h: number,
    s: number,
    l: number
): { r: number; g: number; b: number } {
    h /= 360
    s /= 100
    l /= 100

    let r: number, g: number, b: number

    if (s === 0) {
        r = g = b = l
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q

        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    }
}
