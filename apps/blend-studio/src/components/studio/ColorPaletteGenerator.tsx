import { useState, useEffect, useRef } from 'react'
import { ArrowsClockwiseIcon, CopyIcon, XIcon } from '@phosphor-icons/react'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2Type,
    TextInputV2,
    InputSizeV2,
    SnackbarV2,
    SnackbarV2Position,
    SnackbarV2Variant,
    addSnackbarV2,
} from '@juspay/blend-design-system'
import {
    SHADE_KEYS,
    type ShadeKey,
    normaliseHex,
    isLightColor,
    mergeColorScaleFromBase,
    generateRandomColorScale,
    resetShadeInScale,
} from '@/components/utils'

const OVERRIDE_PANEL_TRANSITION_MS = 480
const OVERRIDE_PANEL_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const OVERRIDE_LIST_OPEN_MS = 420

function getOverridePanelTransitionMs() {
    if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        return 0
    }
    return OVERRIDE_PANEL_TRANSITION_MS
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ColorPaletteGeneratorProps {
    label: string
    value: Record<string, string>
    /** Saved palette for this group — reset restores to this */
    initialValue: Record<string, string>
    onChange: (shades: Record<string, string>) => void
    onReset: (shades: Record<string, string>) => void
    /** Which shade to treat as the "base" for generation (defaults to "500") */
    baseShade?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ColorPaletteGenerator({
    label,
    value,
    initialValue,
    onChange,
    onReset,
    baseShade = '500',
}: ColorPaletteGeneratorProps) {
    // ------------------------------------------------------------------
    // Local state
    // ------------------------------------------------------------------
    const [baseHexInput, setBaseHexInput] = useState(
        () => value[baseShade] || '#3B82F6'
    )
    const [showOverrides, setShowOverrides] = useState(false)
    /** Keeps override UI mounted until the close animation finishes */
    const [overridesMounted, setOverridesMounted] = useState(false)
    const [overrideListReveal, setOverrideListReveal] = useState(false)
    const closeOverridesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    )
    const [overriddenShades, setOverriddenShades] = useState<Set<ShadeKey>>(
        new Set()
    )

    useEffect(() => {
        setOverriddenShades(new Set())
    }, [label, baseShade])

    useEffect(() => {
        return () => {
            if (closeOverridesTimerRef.current) {
                clearTimeout(closeOverridesTimerRef.current)
            }
        }
    }, [])

    const openOverrides = () => {
        if (closeOverridesTimerRef.current) {
            clearTimeout(closeOverridesTimerRef.current)
            closeOverridesTimerRef.current = null
        }
        setOverridesMounted(true)
        setShowOverrides(true)
    }

    const closeOverrides = () => {
        setOverrideListReveal(false)
        setShowOverrides(false)
        if (closeOverridesTimerRef.current) {
            clearTimeout(closeOverridesTimerRef.current)
        }
        closeOverridesTimerRef.current = setTimeout(() => {
            setOverridesMounted(false)
            closeOverridesTimerRef.current = null
        }, getOverridePanelTransitionMs())
    }

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
    // Handlers
    // ------------------------------------------------------------------

    const handleBaseColorChange = (hex: string) => {
        setBaseHexInput(hex)
        const merged = mergeColorScaleFromBase(hex, overriddenShades, value)
        if (merged) onChange(merged)
    }

    const handleShadeChange = (shade: ShadeKey, hex: string) => {
        const n = normaliseHex(hex)
        if (!n) return
        setOverriddenShades((prev) => new Set(prev).add(shade))
        onChange({ ...value, [shade]: n })
    }

    const handleGenerateRandom = () => {
        setOverriddenShades(new Set())
        const { baseHex, scale } = generateRandomColorScale()
        setBaseHexInput(baseHex)
        onChange(scale)
    }

    const handleResetRandom = () => {
        const restored = { ...initialValue }
        const baseHex =
            normaliseHex(restored[baseShade] || '#3B82F6') ?? '#3B82F6'
        setOverriddenShades(new Set())
        setBaseHexInput(baseHex)
        onReset(restored)
    }

    const handleResetShade = (shade: ShadeKey) => {
        setOverriddenShades((prev) => {
            const next = new Set(prev)
            next.delete(shade)
            return next
        })
        const updated = resetShadeInScale(shade, value, baseShade, baseHexInput)
        if (updated) onChange(updated)
    }

    const handleCopyPalette = async () => {
        const palette = SHADE_KEYS.reduce<Record<string, string>>(
            (acc, shade) => {
                const hex = normaliseHex(value[shade] ?? '')
                if (hex) acc[shade] = hex
                return acc
            },
            {}
        )

        try {
            await navigator.clipboard.writeText(
                JSON.stringify(palette, null, 2)
            )
        } catch {
            // Clipboard unavailable (e.g. non-secure context)
        }
    }

    const copyColorToClipboard = async (color: string) => {
        const hex = normaliseHex(color)
        if (!hex) return

        try {
            await navigator.clipboard.writeText(hex)
            addSnackbarV2({
                header: 'Color copied',
                description: hex,
                variant: SnackbarV2Variant.SUCCESS,
                position: SnackbarV2Position.BOTTOM_RIGHT,
                duration: 2000,
            })
        } catch {
            addSnackbarV2({
                header: 'Could not copy color',
                variant: SnackbarV2Variant.ERROR,
                position: SnackbarV2Position.BOTTOM_RIGHT,
            })
        }
    }

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------

    const isPrimaryColorTab = label.startsWith('Primary')

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col" aria-label={label}>
            <div
                className="grid min-h-0 flex-1 motion-reduce:transition-none"
                style={{
                    gridTemplateRows: showOverrides
                        ? 'auto minmax(0, 1fr)'
                        : 'minmax(0, 1fr) auto',
                    transition: `grid-template-rows ${OVERRIDE_PANEL_TRANSITION_MS}ms ${OVERRIDE_PANEL_EASING}`,
                }}
            >
                <div className="min-h-0 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        <div className="px-[16px] flex flex-col gap-2 my-[24px]">
                            <h3 className="text-xs font-semibold text-gray-700">
                                Base Value HEX
                            </h3>
                            <button type="button" className="relative  w-full">
                                <TextInputV2
                                    type="text"
                                    value={baseHexInput}
                                    onChange={(e) =>
                                        handleBaseColorChange(e.target.value)
                                    }
                                    size={InputSizeV2.LG}
                                    spellCheck={false}
                                    placeholder="#3B82F6"
                                    aria-label="Base hex value"
                                    leftSlot={{
                                        slot: (
                                            <span
                                                className="h-3 w-3 rounded-sm"
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
                                    value={
                                        normaliseHex(baseHexInput) ?? '#3B82F6'
                                    }
                                    onChange={(e) =>
                                        handleBaseColorChange(e.target.value)
                                    }
                                    className="absolute bottom-0 left-4 top-3 z-10 w-10 cursor-pointer opacity-0"
                                    aria-label="Pick base colour"
                                />
                            </button>
                            <div className="flex gap-1">
                                {SHADE_KEYS.map((shade) => {
                                    const color = value[shade] || '#CCCCCC'
                                    return (
                                        <div
                                            key={shade}
                                            role="button"
                                            tabIndex={0}
                                            className="group relative h-6 flex-1 cursor-pointer rounded-lg border border-gray-100"
                                            style={{
                                                backgroundColor: color,
                                                height: '48px',
                                            }}
                                            title={`${shade}: ${color}`}
                                            onClick={() =>
                                                void copyColorToClipboard(color)
                                            }
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Enter' ||
                                                    e.key === ' '
                                                ) {
                                                    e.preventDefault()
                                                    void copyColorToClipboard(
                                                        color
                                                    )
                                                }
                                            }}
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
                        </div>

                        {isPrimaryColorTab ? (
                            <div className="flex justify-center px-[16px] gap-2">
                                <ButtonV2
                                    buttonType={ButtonV2Type.SECONDARY}
                                    size={ButtonV2Size.MEDIUM}
                                    onClick={handleGenerateRandom}
                                    text="Generate Random"
                                    width="100%"
                                />
                                <ButtonV2
                                    buttonType={ButtonV2Type.SECONDARY}
                                    size={ButtonV2Size.MEDIUM}
                                    onClick={handleResetRandom}
                                    aria-label="Reset palette"
                                    leftSlot={{
                                        slot: (
                                            <ArrowsClockwiseIcon
                                                className="h-4 w-4"
                                                weight="bold"
                                            />
                                        ),
                                    }}
                                    width={36}
                                />
                                <ButtonV2
                                    buttonType={ButtonV2Type.SECONDARY}
                                    size={ButtonV2Size.MEDIUM}
                                    onClick={handleCopyPalette}
                                    aria-label="Copy palette"
                                    leftSlot={{
                                        slot: (
                                            <CopyIcon
                                                className="h-4 w-4"
                                                weight="bold"
                                            />
                                        ),
                                    }}
                                    width={36}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center px-[16px] gap-2">
                                <ButtonV2
                                    text="Reset"
                                    buttonType={ButtonV2Type.SECONDARY}
                                    size={ButtonV2Size.MEDIUM}
                                    onClick={handleResetRandom}
                                    aria-label="Reset palette"
                                    leftSlot={{
                                        slot: (
                                            <ArrowsClockwiseIcon
                                                className="h-4 w-4"
                                                weight="bold"
                                            />
                                        ),
                                    }}
                                    width="100%"
                                />
                                <ButtonV2
                                    text="Copy HEX"
                                    buttonType={ButtonV2Type.SECONDARY}
                                    size={ButtonV2Size.MEDIUM}
                                    onClick={handleCopyPalette}
                                    aria-label="Copy palette"
                                    leftSlot={{
                                        slot: (
                                            <CopyIcon
                                                className="h-4 w-4"
                                                weight="bold"
                                            />
                                        ),
                                    }}
                                    width="100%"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={`min-h-0 bg-white ${overridesMounted ? '' : 'pt-4'}`}
                >
                    {overridesMounted && showOverrides ? (
                        <div className="flex h-full min-h-0 flex-col mt-[24px]">
                            <button
                                type="button"
                                onClick={closeOverrides}
                                className="flex w-full shrink-0 items-center justify-between border-b border-t px-[16px] py-[12px] text-left text-xs font-semibold text-gray-700"
                                aria-expanded={showOverrides}
                            >
                                <span>Override HEX Values</span>
                                <XIcon
                                    size={16}
                                    className="text-gray-400 transition-transform duration-300 ease-out"
                                />
                            </button>

                            <div
                                className={`grid min-h-0 flex-1 overflow-hidden motion-reduce:grid-rows-[1fr] motion-reduce:transition-none ${
                                    overrideListReveal
                                        ? 'grid-rows-[1fr]'
                                        : 'grid-rows-[0fr]'
                                }`}
                                style={{
                                    transition: `grid-template-rows ${OVERRIDE_LIST_OPEN_MS}ms ${OVERRIDE_PANEL_EASING}`,
                                }}
                            >
                                <div className="min-h-0 h-full overflow-y-auto px-[16px] py-[12px]">
                                    <div className="">
                                        {SHADE_KEYS.map((shade, index) => {
                                            const color =
                                                value[shade] || '#CCCCCC'
                                            const isOverridden =
                                                overriddenShades.has(shade)
                                            const isBase = shade === baseShade
                                            const staggerIndex = Math.min(
                                                SHADE_KEYS.length - 1 - index,
                                                12
                                            )

                                            return (
                                                <div
                                                    key={shade}
                                                    style={{
                                                        transitionDelay:
                                                            overrideListReveal
                                                                ? `${staggerIndex * 24}ms`
                                                                : '0ms',
                                                        transitionDuration: `${OVERRIDE_LIST_OPEN_MS}ms`,
                                                        transitionTimingFunction:
                                                            OVERRIDE_PANEL_EASING,
                                                    }}
                                                    className={`grid min-w-0 grid-cols-[minmax(0,1fr)_42px] items-center rounded-lg px-2 py-1.5 transition-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                                                        overrideListReveal
                                                            ? 'translate-y-0 opacity-100'
                                                            : 'translate-y-4 opacity-0'
                                                    }`}
                                                >
                                                    <button
                                                        type="button"
                                                        className="relative flex min-w-0 items-stretch"
                                                    >
                                                        <div className="relative w-[36px] shrink-0 self-stretch mr-[12px]">
                                                            <span
                                                                className="absolute inset-0 rounded-[8px]"
                                                                style={{
                                                                    backgroundColor:
                                                                        normaliseHex(
                                                                            color
                                                                        ) ??
                                                                        color,
                                                                }}
                                                            />
                                                        </div>
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
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="absolute inset-y-0 left-0 h-full w-8 cursor-pointer opacity-0"
                                                            aria-label={`Pick ${shade} colour`}
                                                        />
                                                        <TextInputV2
                                                            type="text"
                                                            value={color}
                                                            onChange={(e) =>
                                                                handleShadeChange(
                                                                    shade,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            size={
                                                                InputSizeV2.MD
                                                            }
                                                            spellCheck={false}
                                                            aria-label={`${shade} hex value`}
                                                            rightSlot={{
                                                                slot: isBase ? (
                                                                    <span className="text-[#0E121B] bg-[#F5F7FA] px-[6px] py-[2px] rounded-[4px] text-[12px] weight-[500] font-medium outline-dashed outline-1 outline-[#ECEFF3]">
                                                                        BASE
                                                                    </span>
                                                                ) : (
                                                                    <></>
                                                                ),
                                                            }}
                                                        />
                                                    </button>

                                                    <div
                                                        onClick={() =>
                                                            isOverridden
                                                                ? handleResetShade(
                                                                      shade
                                                                  )
                                                                : undefined
                                                        }
                                                        className="mr-[10px] text-right font-['JetBrains_Mono',ui-monospace,monospace] text-[12px] font-semibold tabular-nums text-[#717784]"
                                                        title={
                                                            isOverridden
                                                                ? 'Reset this shade'
                                                                : `${shade} shade`
                                                        }
                                                    >
                                                        {shade}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : overridesMounted ? (
                        <div className="min-h-0 overflow-hidden" aria-hidden />
                    ) : (
                        <div className="border-t border-gray-200 px-[16px] py-[12px]">
                            <ButtonV2
                                buttonType={ButtonV2Type.SECONDARY}
                                size={ButtonV2Size.LARGE}
                                onClick={openOverrides}
                                text="Show Override Values"
                                width="100%"
                            />
                        </div>
                    )}
                </div>
            </div>
            <SnackbarV2 position={SnackbarV2Position.BOTTOM_RIGHT} />
        </div>
    )
}
