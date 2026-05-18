import { useState, useCallback, useEffect } from 'react'
import { ArrowsClockwise, Eyedropper, XIcon } from '@phosphor-icons/react'
import { generateColorScale } from '@juspay/blend-design-system/tokens'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2Type,
} from '../../../../../packages/blend/lib/components/ButtonV2'
import { TextInputV2 } from '../../../../../packages/blend/lib/components/InputsV2/TextInputV2'
import { InputSizeV2 } from '../../../../../packages/blend/lib/components/InputsV2/inputV2.types'

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

function generateRandomHex(): string {
    const value = Math.floor(Math.random() * 0xffffff)
    return `#${value.toString(16).padStart(6, '0').toUpperCase()}`
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
    const [showOverrides, setShowOverrides] = useState(false)
    const [overrideListReveal, setOverrideListReveal] = useState(false)
    const [overriddenShades, setOverriddenShades] = useState<Set<ShadeKey>>(
        new Set()
    )

    useEffect(() => {
        if (!showOverrides) {
            setOverrideListReveal(false)
            return
        }
        if (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setOverrideListReveal(true)
            return
        }
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => setOverrideListReveal(true))
        })
        return () => cancelAnimationFrame(id)
    }, [showOverrides])

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

    const handleGenerateRandom = () => {
        setOverriddenShades(new Set())
        const randomBase = generateRandomHex()
        setBaseHexInput(randomBase)
        const generated = generateColorScale(randomBase) as Record<
            string,
            string
        >
        onChange(generated)
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

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col" aria-label={label}>
            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    <div>
                        <h3 className="mb-2 text-xs font-semibold text-gray-700 border-b py-[12px] px-[16px]">
                            Base Value HEX
                        </h3>
                        <div className="relative pt-[12px] px-[16px]">
                            <TextInputV2
                                type="text"
                                value={baseHexInput}
                                onChange={(e) =>
                                    handleBaseColorChange(e.target.value)
                                }
                                size={InputSizeV2.MD}
                                spellCheck={false}
                                placeholder="#3B82F6"
                                aria-label="Base hex value"
                                leftSlot={{
                                    slot: (
                                        <span
                                            className="h-3 w-3 rounded border border-gray-200"
                                            style={{
                                                backgroundColor:
                                                    normaliseHex(
                                                        baseHexInput
                                                    ) ?? '#3B82F6',
                                            }}
                                        />
                                    ),
                                }}
                            />
                            <input
                                type="color"
                                value={normaliseHex(baseHexInput) ?? '#3B82F6'}
                                onChange={(e) =>
                                    handleBaseColorChange(e.target.value)
                                }
                                className="absolute bottom-0 left-4 top-3 z-10 w-10 cursor-pointer opacity-0"
                                aria-label="Pick base colour"
                            />
                        </div>
                    </div>

                    <div className="flex gap-1 py-[12px] px-[16px]">
                        {SHADE_KEYS.map((shade) => {
                            const color = value[shade] || '#CCCCCC'
                            return (
                                <div
                                    key={shade}
                                    className="group relative h-6 flex-1 cursor-default rounded-md border border-gray-100"
                                    style={{
                                        backgroundColor: color,
                                        height: '60px',
                                    }}
                                    title={`${shade}: ${color}`}
                                >
                                    <span
                                        className={`absolute inset-0 flex items-center justify-center text-[9px] font-semibold opacity-0 transition-opacity group-hover:opacity-100 ${
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

                    <div className="flex justify-center px-[16px]">
                        <ButtonV2
                            buttonType={ButtonV2Type.SECONDARY}
                            size={ButtonV2Size.MEDIUM}
                            onClick={handleGenerateRandom}
                            text="Generate Random"
                            leftSlot={{
                                slot: <ArrowsClockwise className="h-4 w-4" />,
                            }}
                            width="100%"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-auto shrink-0 bg-white pt-4">
                {showOverrides ? (
                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={() => setShowOverrides(false)}
                            className="flex w-full items-center justify-between text-left text-xs font-semibold text-gray-700 border-t border-b py-[12px] px-[16px]"
                            aria-expanded={showOverrides}
                        >
                            <span>Override HEX Values</span>
                            <XIcon
                                size={16}
                                className="text-gray-400 transition-transform duration-300 ease-out"
                            />
                        </button>

                        <div
                            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:grid-rows-[1fr] motion-reduce:transition-none ${
                                overrideListReveal
                                    ? 'grid-rows-[1fr]'
                                    : 'grid-rows-[0fr]'
                            }`}
                        >
                            <div className="min-h-0 max-h-[min(55vh,26rem)] overflow-y-auto px-[16px]">
                                <div className="grid auto-rows-min gap-2 [grid-template-columns:repeat(auto-fill,minmax(12rem,1fr))]">
                                    {SHADE_KEYS.map((shade, index) => {
                                        const color = value[shade] || '#CCCCCC'
                                        const isOverridden =
                                            overriddenShades.has(shade)
                                        const isBase = shade === baseShade

                                        return (
                                            <div
                                                key={shade}
                                                style={{
                                                    transitionDelay:
                                                        overrideListReveal
                                                            ? `${
                                                                  Math.min(
                                                                      index,
                                                                      10
                                                                  ) * 22
                                                              }ms`
                                                            : '0ms',
                                                }}
                                                className={`grid min-w-0 grid-cols-[minmax(0,1fr)_42px] items-center rounded-lg  px-2 py-1.5 transition-[opacity,transform,background-color] duration-300 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
                                            >
                                                <div className="relative min-w-0">
                                                    <TextInputV2
                                                        type="text"
                                                        value={color}
                                                        onChange={(e) =>
                                                            handleShadeChange(
                                                                shade,
                                                                e.target.value
                                                            )
                                                        }
                                                        size={InputSizeV2.SM}
                                                        spellCheck={false}
                                                        aria-label={`${shade} hex value`}
                                                        leftSlot={{
                                                            slot: (
                                                                <span className="flex items-center gap-1">
                                                                    <span
                                                                        className="h-3 w-3 rounded"
                                                                        style={{
                                                                            backgroundColor:
                                                                                color,
                                                                        }}
                                                                    />
                                                                    <Eyedropper className="h-3 w-3 text-gray-300" />
                                                                </span>
                                                            ),
                                                        }}
                                                    />
                                                    <input
                                                        type="color"
                                                        value={
                                                            normaliseHex(
                                                                color
                                                            ) ?? '#CCCCCC'
                                                        }
                                                        onChange={(e) =>
                                                            handleShadeChange(
                                                                shade,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="absolute inset-y-0 left-0 h-full w-8 cursor-pointer opacity-0"
                                                        aria-label={`Pick ${shade} colour`}
                                                    />
                                                </div>

                                                <div
                                                    onClick={() =>
                                                        isOverridden
                                                            ? handleResetShade(
                                                                  shade
                                                              )
                                                            : undefined
                                                    }
                                                    className={`text-right text-[11px] font-medium tabular-nums mr-[10px] ${
                                                        isBase
                                                            ? 'text-blue-600'
                                                            : isOverridden
                                                              ? 'text-amber-600'
                                                              : 'text-gray-400'
                                                    }`}
                                                    title={
                                                        isOverridden
                                                            ? 'Reset this shade'
                                                            : `${shade} shade`
                                                    }
                                                >
                                                    {isBase ? 'Base' : shade}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-[16px] py-[12px] border-t border-gray-200">
                        <ButtonV2
                            buttonType={ButtonV2Type.SECONDARY}
                            size={ButtonV2Size.LARGE}
                            onClick={() => setShowOverrides(true)}
                            text="Show Override Values"
                            width="100%"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
