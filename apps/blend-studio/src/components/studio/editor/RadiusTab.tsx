/**
 * RadiusTab
 *
 * Editor tab for customizing border radius values.
 * Includes preset buttons and individual radius fine-tuning.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
    RADIUS_KEYS,
    RADIUS_PRESETS,
    RADIUS_DEFAULTS,
    type EditorTabProps,
    type RadiusKey,
} from './types'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    Card,
    CardVariant,
    NumberInputV2,
    RadioV2,
} from '@juspay/blend-design-system'
import { CaretDownIcon, CaretUpIcon, XIcon } from '@phosphor-icons/react'
import { TemplatesIcon } from '@/components/svg/Templates'

const SCALE_TOKENS_PANEL_TRANSITION_MS = 480
const SCALE_TOKENS_PANEL_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SCALE_TOKENS_LIST_OPEN_MS = 420

function getScaleTokensPanelTransitionMs() {
    if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        return 0
    }
    return SCALE_TOKENS_PANEL_TRANSITION_MS
}

function resolveRadiusValue(
    radius: EditorTabProps['brand']['radius'],
    key: RadiusKey
): string {
    const stored = radius?.[key]
    if (stored !== undefined && stored !== '') return stored
    return RADIUS_DEFAULTS[key]
}

function getRadiusPresetSubtitle(presetName: string): {
    text: string
    color: string
} {
    switch (presetName) {
        case 'Sharp':
            return { text: 'Clean edges, no curves.', color: '#E9D4FF' }
        case 'Subtle':
            return { text: 'Soften the corners.', color: '#BEDBFF' }
        case 'Default':
            return {
                text: 'Balanced choice. Works everywhere.',
                color: '#FFD6A8',
            }
        case 'Rounded':
            return { text: 'Friendly and approachable.', color: '#FFC9C9' }
        case 'Pill':
            return { text: 'Fully rounded ends.', color: '#FFF085' }
        default:
            return { text: '', color: '' }
    }
}

function useCollapsibleReveal(isOpen: boolean) {
    const [reveal, setReveal] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            setReveal(false)
            return
        }
        if (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setReveal(true)
            return
        }
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => setReveal(true))
        })
        return () => cancelAnimationFrame(id)
    }, [isOpen])

    return reveal
}

interface CollapsibleSectionProps {
    isOpen: boolean
    reveal: boolean
    children: ReactNode
}

function CollapsibleSection({
    isOpen,
    reveal,
    children,
}: CollapsibleSectionProps) {
    const isVisible = isOpen && reveal

    return (
        <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:grid-rows-[1fr] motion-reduce:transition-none ${
                isVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
        >
            <div className="min-h-0 overflow-hidden">
                <div
                    className={`transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                        isVisible
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    }`}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RadiusTab({ brand, onChange }: EditorTabProps) {
    const applyPreset = (preset: (typeof RADIUS_PRESETS)[number]) => {
        onChange((prev) => ({
            ...prev,
            radius: { ...prev.radius, ...preset.values },
        }))
    }
    const [isPresetsOpen, setIsPresetsOpen] = useState(true)
    const [showScaleTokens, setShowScaleTokens] = useState(false)
    const [scaleTokensMounted, setScaleTokensMounted] = useState(false)
    const [scaleTokensReveal, setScaleTokensReveal] = useState(false)
    const closeScaleTokensTimerRef = useRef<ReturnType<
        typeof setTimeout
    > | null>(null)
    const presetsReveal = useCollapsibleReveal(isPresetsOpen)
    const current8 = resolveRadiusValue(brand.radius, '8')

    useEffect(() => {
        return () => {
            if (closeScaleTokensTimerRef.current) {
                clearTimeout(closeScaleTokensTimerRef.current)
            }
        }
    }, [])

    const openScaleTokens = () => {
        if (closeScaleTokensTimerRef.current) {
            clearTimeout(closeScaleTokensTimerRef.current)
            closeScaleTokensTimerRef.current = null
        }
        setScaleTokensMounted(true)
        setShowScaleTokens(true)
    }

    const closeScaleTokens = () => {
        setScaleTokensReveal(false)
        setShowScaleTokens(false)
        if (closeScaleTokensTimerRef.current) {
            clearTimeout(closeScaleTokensTimerRef.current)
        }
        closeScaleTokensTimerRef.current = setTimeout(() => {
            setScaleTokensMounted(false)
            closeScaleTokensTimerRef.current = null
        }, getScaleTokensPanelTransitionMs())
    }

    useEffect(() => {
        if (!showScaleTokens) {
            setScaleTokensReveal(false)
            return
        }
        if (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setScaleTokensReveal(true)
            return
        }
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => setScaleTokensReveal(true))
        })
        return () => cancelAnimationFrame(id)
    }, [showScaleTokens])

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col">
            <div
                className="grid min-h-0 flex-1 motion-reduce:transition-none"
                style={{
                    gridTemplateRows: showScaleTokens
                        ? 'auto minmax(0, 1fr)'
                        : 'minmax(0, 1fr) auto',
                    transition: `grid-template-rows ${SCALE_TOKENS_PANEL_TRANSITION_MS}ms ${SCALE_TOKENS_PANEL_EASING}`,
                }}
            >
                <div className="min-h-0 overflow-y-auto">
                    {/* Presets */}
                    <div
                        className={`w-full flex items-center justify-between px-[16px] py-[12px] ${isPresetsOpen && 'border-b'} border-gray-200`}
                    >
                        <h3 className="font-medium text-gray-900 text-[14px] leading-[20px] inter-display">
                            Templates
                        </h3>
                        <ButtonV2
                            onClick={() => setIsPresetsOpen(!isPresetsOpen)}
                            buttonType={ButtonV2Type.SECONDARY}
                            size={ButtonV2Size.MEDIUM}
                            subType={ButtonV2SubType.INLINE}
                            leftSlot={{
                                slot: isPresetsOpen ? (
                                    <CaretUpIcon size={16} />
                                ) : (
                                    <CaretDownIcon size={16} />
                                ),
                            }}
                        />
                    </div>
                    <CollapsibleSection
                        isOpen={isPresetsOpen}
                        reveal={presetsReveal}
                    >
                        <div className="w-full overflow-x-auto px-[16px] py-[12px]">
                            <div className="flex w-full flex-col justify-between gap-2">
                                {RADIUS_PRESETS.map((preset) => {
                                    const previewRadius = preset.values['8']
                                    const isActive = current8 === previewRadius
                                    return (
                                        <Card
                                            variant={CardVariant.CUSTOM}
                                            key={preset.name}
                                        >
                                            <div
                                                className="flex w-full cursor-pointer items-center justify-between p-[12px]"
                                                onClick={() =>
                                                    applyPreset(preset)
                                                }
                                            >
                                                <div className="flex w-full min-w-0 items-center gap-2">
                                                    <TemplatesIcon
                                                        className="shrink-0"
                                                        width={75}
                                                        height={48}
                                                        color={
                                                            getRadiusPresetSubtitle(
                                                                preset.name
                                                            ).color
                                                        }
                                                    />
                                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                                        <div className="flex items-center justify-between text-[16px] font-semibold text-[#222530]">
                                                            {preset.name}
                                                            <RadioV2
                                                                checked={
                                                                    isActive
                                                                }
                                                            />
                                                        </div>
                                                        <span className="text-[14px] font-medium text-[#717784]">
                                                            {
                                                                getRadiusPresetSubtitle(
                                                                    preset.name
                                                                ).text
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>
                    </CollapsibleSection>
                </div>

                <div
                    className={`min-h-0 bg-white ${scaleTokensMounted ? '' : 'pt-4'}`}
                >
                    {scaleTokensMounted && showScaleTokens ? (
                        <div className="flex h-full min-h-0 flex-col">
                            <button
                                type="button"
                                onClick={closeScaleTokens}
                                className="flex w-full shrink-0 items-center justify-between border-b border-t px-[16px] py-[12px] text-left text-xs font-semibold text-gray-700"
                                aria-expanded={showScaleTokens}
                            >
                                <span>Custom Values</span>
                                <XIcon
                                    size={16}
                                    className="text-gray-400 transition-transform duration-300 ease-out"
                                />
                            </button>

                            <div
                                className={`grid min-h-0 flex-1 overflow-hidden motion-reduce:grid-rows-[1fr] motion-reduce:transition-none ${
                                    scaleTokensReveal
                                        ? 'grid-rows-[1fr]'
                                        : 'grid-rows-[0fr]'
                                }`}
                                style={{
                                    transition: `grid-template-rows ${SCALE_TOKENS_LIST_OPEN_MS}ms ${SCALE_TOKENS_PANEL_EASING}`,
                                }}
                            >
                                <div className="min-h-0 h-full overflow-y-auto px-[16px] py-[12px]">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3 py-[20px]">
                                        {RADIUS_KEYS.map((key, index) => {
                                            const staggerIndex = Math.min(
                                                RADIUS_KEYS.length - 1 - index,
                                                12
                                            )

                                            return (
                                                <div
                                                    key={key}
                                                    style={{
                                                        transitionDelay:
                                                            scaleTokensReveal
                                                                ? `${staggerIndex * 24}ms`
                                                                : '0ms',
                                                        transitionDuration: `${SCALE_TOKENS_LIST_OPEN_MS}ms`,
                                                        transitionTimingFunction:
                                                            SCALE_TOKENS_PANEL_EASING,
                                                    }}
                                                    className={`transition-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                                                        scaleTokensReveal
                                                            ? 'translate-y-0 opacity-100'
                                                            : 'translate-y-4 opacity-0'
                                                    }`}
                                                >
                                                    <RadiusRow
                                                        radiusKey={key}
                                                        value={resolveRadiusValue(
                                                            brand.radius,
                                                            key
                                                        )}
                                                        onChange={(value) =>
                                                            onChange(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    radius: {
                                                                        ...prev.radius,
                                                                        [key]: value,
                                                                    },
                                                                })
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : scaleTokensMounted ? (
                        <div className="min-h-0 overflow-hidden" aria-hidden />
                    ) : (
                        <div className="border-t border-gray-200 px-[16px] py-[12px]">
                            <ButtonV2
                                buttonType={ButtonV2Type.SECONDARY}
                                size={ButtonV2Size.LARGE}
                                onClick={openScaleTokens}
                                text="Show Override Values"
                                width="100%"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Radius Row
// ---------------------------------------------------------------------------

interface RadiusRowProps {
    radiusKey: RadiusKey
    value: string
    onChange: (value: string) => void
}
function RadiusRow({ radiusKey, value, onChange }: RadiusRowProps) {
    const rowRef = useRef<HTMLDivElement>(null)
    const numericValue = Number.parseFloat(value)
    const parsedValue = Number.isNaN(numericValue) ? null : numericValue

    return (
        <div
            ref={rowRef}
            className="flex  w-[90px] flex-col items-center justify-center gap-3 mx-[16px]"
        >
            <div
                className="h-[90px] w-[90px] shrink-0 border border-[#E1E4EA] bg-[#F5F7FA] flex items-center justify-center"
                style={{ borderRadius: value || '0px' }}
            >
                <div className="w-[66px] text-center shrink-0 text-xs font-mono text-gray-500 text-left font-size-[12px] line-height-[18px] inter-display font-weight-[600]">
                    {radiusKey}
                    {`(--radius-${radiusKey})`}
                </div>
            </div>
            <NumberInputV2
                value={parsedValue}
                onChange={(e) =>
                    onChange(
                        e.target.value === ''
                            ? RADIUS_DEFAULTS[radiusKey]
                            : `${e.target.value}px`
                    )
                }
                placeholder={radiusKey}
                unit="px"
            />
        </div>
    )
}
