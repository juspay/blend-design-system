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
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react'
import { TemplatesIcon } from '@/components/svg/Templates'

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
    const [isPresetsOpen, setIsPresetsOpen] = useState(false)
    const [isScaleTokensOpen, setIsScaleTokensOpen] = useState(false)
    const presetsReveal = useCollapsibleReveal(isPresetsOpen)
    const scaleTokensReveal = useCollapsibleReveal(isScaleTokensOpen)
    const current8 = resolveRadiusValue(brand.radius, '8')

    return (
        <div>
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
            <CollapsibleSection isOpen={isPresetsOpen} reveal={presetsReveal}>
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
                                        onClick={() => applyPreset(preset)}
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
                                                        checked={isActive}
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

            <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-t border-gray-200">
                <h3 className="font-medium text-gray-900 text-[14px] leading-[20px] inter-display">
                    Custom Values
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
            <CollapsibleSection
                isOpen={isScaleTokensOpen}
                reveal={scaleTokensReveal}
            >
                <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3 px-[16px] py-[32px]">
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
            </CollapsibleSection>
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
