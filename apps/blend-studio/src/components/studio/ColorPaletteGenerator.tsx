import { useState, useCallback, useEffect } from 'react'
import { Copy, ArrowsClockwise, Check, Eyedropper } from '@phosphor-icons/react'
import { generateColorScale } from '@juspay/blend-design-system/tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SHADE_KEYS = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
] as const

type ShadeKey = (typeof SHADE_KEYS)[number]

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ColorPaletteGeneratorProps {
    label: string
    value: Record<string, string>
    onChange: (shades: Record<string, string>) => void
    /** Which shade to treat as the "base" for generation (defaults to "500") */
    baseShade?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalise a hex string to uppercase 6-char form, or return null. */
function normaliseHex(raw: string): string | null {
    let hex = raw.trim()
    if (!hex.startsWith('#')) hex = `#${hex}`
    if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
        const [, r, g, b] = hex
        hex = `#${r}${r}${g}${g}${b}${b}`
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) return hex.toUpperCase()
    return null
}

/** Determine whether a colour is "light" (needs dark text) or "dark". */
function isLightColor(hex: string): boolean {
    const clean = hex.replace('#', '')
    const r = parseInt(clean.slice(0, 2), 16)
    const g = parseInt(clean.slice(2, 4), 16)
    const b = parseInt(clean.slice(4, 6), 16)
    // Perceived luminance
    return r * 0.299 + g * 0.587 + b * 0.114 > 160
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ColorPaletteGenerator({
    label,
    value,
    onChange,
    baseShade = '500',
}: ColorPaletteGeneratorProps) {
    // ------------------------------------------------------------------
    // Local state
    // ------------------------------------------------------------------
    const [baseHexInput, setBaseHexInput] = useState(
        () => value[baseShade] || '#3B82F6'
    )
    const [copied, setCopied] = useState(false)
    const [overriddenShades, setOverriddenShades] = useState<Set<ShadeKey>>(
        new Set()
    )

    // Keep the base input in sync when the value prop changes externally
    useEffect(() => {
        const incoming = value[baseShade]
        if (incoming) {
            const n = normaliseHex(incoming)
            if (n) setBaseHexInput(n)
        }
    }, [value, baseShade])

    // ------------------------------------------------------------------
    // Generation
    // ------------------------------------------------------------------

    const regenerateFromBase = useCallback(
        (
            hex: string,
            currentOverrides: Set<ShadeKey>,
            currentValues: Record<string, string>
        ) => {
            const n = normaliseHex(hex)
            if (!n) return
            const generated = generateColorScale(n) as Record<string, string>
            // Preserve manually-overridden shades
            const merged: Record<string, string> = {}
            for (const key of SHADE_KEYS) {
                if (currentOverrides.has(key) && currentValues[key]) {
                    merged[key] = currentValues[key]
                } else {
                    merged[key] = generated[key] ?? n
                }
            }
            onChange(merged)
        },
        [onChange]
    )

    // ------------------------------------------------------------------
    // Handlers
    // ------------------------------------------------------------------

    const handleBaseColorChange = (hex: string) => {
        setBaseHexInput(hex)
        const n = normaliseHex(hex)
        if (n) {
            // Use latest state values to avoid stale closure
            regenerateFromBase(n, overriddenShades, value)
        }
    }

    const handleShadeChange = (shade: ShadeKey, hex: string) => {
        const n = normaliseHex(hex)
        if (!n) return
        setOverriddenShades((prev) => new Set(prev).add(shade))
        onChange({ ...value, [shade]: n })
    }

    const handleResetAll = () => {
        setOverriddenShades(new Set())
        // Use value from props (latest) instead of baseHexInput state
        const base = normaliseHex(value[baseShade] || baseHexInput)
        if (base) {
            const generated = generateColorScale(base) as Record<string, string>
            onChange(generated)
        }
    }

    const handleResetShade = (shade: ShadeKey) => {
        setOverriddenShades((prev) => {
            const next = new Set(prev)
            next.delete(shade)
            return next
        })
        // Use value from props (latest) instead of baseHexInput state
        const base = normaliseHex(value[baseShade] || baseHexInput)
        if (base) {
            const generated = generateColorScale(base) as Record<string, string>
            onChange({ ...value, [shade]: generated[shade] ?? base })
        }
    }

    const handleCopyPalette = () => {
        const palette: Record<string, string> = {}
        for (const key of SHADE_KEYS) {
            if (value[key]) palette[key] = value[key]
        }
        navigator.clipboard.writeText(JSON.stringify(palette, null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------

    return (
        <div className="space-y-5">
            {/* ---- Header ---- */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800 tracking-wide">
                    {label}
                </h3>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={handleResetAll}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        title="Reset all shades to generated values"
                    >
                        <ArrowsClockwise className="w-3.5 h-3.5" />
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleCopyPalette}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        title="Copy palette as JSON"
                    >
                        {copied ? (
                            <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                            <Copy className="w-3.5 h-3.5" />
                        )}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>

            {/* ---- Base Color Picker ---- */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="relative shrink-0">
                    <input
                        type="color"
                        value={normaliseHex(baseHexInput) ?? '#3B82F6'}
                        onChange={(e) => handleBaseColorChange(e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 bg-transparent p-0.5"
                    />
                    <Eyedropper className="pointer-events-none absolute bottom-0.5 right-0.5 w-3 h-3 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase tracking-wider">
                        Base Color ({baseShade})
                    </label>
                    <input
                        type="text"
                        value={baseHexInput}
                        onChange={(e) => handleBaseColorChange(e.target.value)}
                        spellCheck={false}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-md font-mono text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-shadow"
                        placeholder="#3B82F6"
                    />
                </div>
            </div>

            {/* ---- Shade Scale Preview (compact strip) ---- */}
            <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                {SHADE_KEYS.map((shade) => {
                    const color = value[shade] || '#CCCCCC'
                    return (
                        <div
                            key={shade}
                            className="flex-1 h-10 relative group cursor-default"
                            style={{ backgroundColor: color }}
                            title={`${shade}: ${color}`}
                        >
                            <span
                                className={`absolute inset-0 flex items-center justify-center text-[9px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity ${
                                    isLightColor(color)
                                        ? 'text-gray-800'
                                        : 'text-white'
                                }`}
                            >
                                {shade}
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* ---- Individual Shade Editors ---- */}
            <div className="space-y-1">
                <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Shade Editor
                </div>
                <div className="grid gap-1.5">
                    {SHADE_KEYS.map((shade) => {
                        const color = value[shade] || '#CCCCCC'
                        const isOverridden = overriddenShades.has(shade)
                        const isBase = shade === baseShade

                        return (
                            <div
                                key={shade}
                                className={`flex items-center gap-3 px-3 py-1.5 rounded-md border transition-colors ${
                                    isBase
                                        ? 'border-blue-200 bg-blue-50/50'
                                        : isOverridden
                                          ? 'border-amber-200 bg-amber-50/30'
                                          : 'border-gray-100 bg-white hover:bg-gray-50'
                                }`}
                            >
                                {/* Shade label */}
                                <span
                                    className={`w-8 text-xs font-semibold tabular-nums ${
                                        isBase
                                            ? 'text-blue-600'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    {shade}
                                </span>

                                {/* Color swatch + picker */}
                                <label className="relative shrink-0 cursor-pointer">
                                    <span
                                        className="block w-7 h-7 rounded-md border border-gray-200 shadow-inner"
                                        style={{ backgroundColor: color }}
                                    />
                                    <input
                                        type="color"
                                        value={normaliseHex(color) ?? '#CCCCCC'}
                                        onChange={(e) =>
                                            handleShadeChange(
                                                shade,
                                                e.target.value
                                            )
                                        }
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </label>

                                {/* Hex input */}
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) =>
                                        handleShadeChange(shade, e.target.value)
                                    }
                                    spellCheck={false}
                                    className="flex-1 min-w-0 px-2 py-1 text-xs font-mono text-gray-700 bg-transparent border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-shadow"
                                />

                                {/* Indicators / reset */}
                                <div className="flex items-center gap-1 w-16 justify-end">
                                    {isBase && (
                                        <span className="text-[10px] font-medium text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">
                                            base
                                        </span>
                                    )}
                                    {isOverridden && !isBase && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleResetShade(shade)
                                            }
                                            className="text-[10px] font-medium text-amber-600 hover:text-amber-700 bg-amber-100 hover:bg-amber-200 px-1.5 py-0.5 rounded transition-colors"
                                            title="Reset this shade to generated value"
                                        >
                                            reset
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
