/**
 * RadiusTab
 *
 * Editor tab for customizing border radius values.
 * Includes preset buttons and individual radius fine-tuning.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    NumberInputV2,
} from '@juspay/blend-design-system'
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react'

function resolveRadiusValue(
    radius: EditorTabProps['brand']['radius'],
    key: RadiusKey
): string {
    const stored = radius?.[key]
    if (stored !== undefined && stored !== '') return stored
    return RADIUS_DEFAULTS[key]
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
    const [isPresetsOpen, setIsPresetsOpen] = useState(false)
    const [isScaleTokensOpen, setIsScaleTokensOpen] = useState(false)
    const [scaleTokensReveal, setScaleTokensReveal] = useState(false)

    useEffect(() => {
        if (!isScaleTokensOpen) {
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
    }, [isScaleTokensOpen])

    const current8 = resolveRadiusValue(brand.radius, '8')

    return (
        <div>
            {/* Presets */}
            <div className="flex flex-col items-center justify-between px-[16px] py-[12px] gap-[12px]">
                <div className="w-full flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 font-size-[14px] line-height-[20px] inter-display">
                        Scale Presets
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
                {isPresetsOpen && (
                    <div className="w-full overflow-x-auto">
                        <div className="flex min-w-[500px] w-full justify-between gap-2">
                            {RADIUS_PRESETS.map((preset) => {
                                const previewRadius = preset.values['8']
                                const isActive = current8 === previewRadius

                                return (
                                    <ButtonV2
                                        key={preset.name}
                                        onClick={() => applyPreset(preset)}
                                        buttonType={ButtonV2Type.SECONDARY}
                                        size={ButtonV2Size.MEDIUM}
                                        state={
                                            isActive
                                                ? ButtonV2State.ACTIVE
                                                : ButtonV2State.DEFAULT
                                        }
                                        text={preset.name}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-t border-gray-200">
                <h3 className="font-medium text-gray-900 font-size-[14px] line-height-[20px] inter-display">
                    Scale Tokens
                </h3>
                <ButtonV2
                    onClick={() => setIsScaleTokensOpen(!isScaleTokensOpen)}
                    buttonType={ButtonV2Type.SECONDARY}
                    size={ButtonV2Size.MEDIUM}
                    subType={ButtonV2SubType.INLINE}
                    leftSlot={{
                        slot: isScaleTokensOpen ? (
                            <CaretUpIcon size={16} />
                        ) : (
                            <CaretDownIcon size={16} />
                        ),
                    }}
                />
            </div>
            {/* Fine-tune */}
            <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isScaleTokensOpen && scaleTokensReveal
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
                }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div
                        className={`px-[16px] py-[24px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                            isScaleTokensOpen && scaleTokensReveal
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                        }`}
                    >
                        {RADIUS_KEYS.map((key) => (
                            <RadiusRow
                                key={key}
                                radiusKey={key}
                                value={resolveRadiusValue(brand.radius, key)}
                                onChange={(value) =>
                                    onChange((prev) => ({
                                        ...prev,
                                        radius: {
                                            ...prev.radius,
                                            [key]: value,
                                        },
                                    }))
                                }
                            />
                        ))}
                    </div>
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

const ROW_STACK_MIN_WIDTH = 360

function RadiusRow({ radiusKey, value, onChange }: RadiusRowProps) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isStacked, setIsStacked] = useState(false)
    const numericValue = Number.parseFloat(value)
    const parsedValue = Number.isNaN(numericValue) ? null : numericValue

    useLayoutEffect(() => {
        const row = rowRef.current
        if (!row) return

        const updateLayout = () => {
            setIsStacked(
                row.getBoundingClientRect().width < ROW_STACK_MIN_WIDTH
            )
        }

        updateLayout()
        const observer = new ResizeObserver(updateLayout)
        observer.observe(row)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={rowRef}
            className={`flex w-full justify-between gap-3 ${
                isStacked ? 'flex-col' : 'flex-row items-center'
            }`}
            style={{ marginBottom: '24px' }}
        >
            <div className="w-[140px] shrink-0 text-xs font-mono text-gray-500 text-left font-size-[12px] line-height-[18px] inter-display font-weight-[600]">
                {radiusKey} (--radius-xs)
            </div>
            <div
                className={`flex min-w-0 items-center gap-[12px] ${
                    isStacked ? 'w-full' : 'flex-1'
                }`}
            >
                <div className="min-w-0 flex-1">
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
                <div
                    className="h-8 w-8 shrink-0 border border-[#E1E4EA] bg-[#F5F7FA]"
                    style={{ borderRadius: value || '0px' }}
                />
            </div>
        </div>
    )
}
