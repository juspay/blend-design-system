/**
 * TypographyTab
 *
 * Editor tab for customizing font family and weight.
 * Shows a font family selector grid, custom input, and live preview.
 */

import { useEffect, useState } from 'react'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    Card,
    CardVariant,
    RadioV2,
} from '@juspay/blend-design-system'
import {
    getFontFamilyStyle,
    loadTypographyPreviewFonts,
} from '@/components/utils'
import { FONT_FAMILIES, type EditorTabProps } from './types'
import { XIcon } from '@phosphor-icons/react'

const FONT_PREVIEW_TEXT = 'The quick brown fox jumps over the lazy dog'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TypographyTab({ brand, onChange }: EditorTabProps) {
    const selectedFamily = brand.font?.family
    const [showCustomFonts, setShowCustomFonts] = useState(false)
    const [customFontsReveal, setCustomFontsReveal] = useState(false)

    useEffect(() => {
        loadTypographyPreviewFonts(FONT_FAMILIES)
    }, [])

    useEffect(() => {
        if (!showCustomFonts) {
            setCustomFontsReveal(false)
            return
        }
        if (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setCustomFontsReveal(true)
            return
        }
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => setCustomFontsReveal(true))
        })
        return () => cancelAnimationFrame(id)
    }, [showCustomFonts])

    return (
        <div className="flex min-h-full flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-gray-200 px-[16px] py-[12px]">
                    <h3 className="inter-display font-medium text-[14px] leading-[20px] text-gray-900">
                        System Fonts
                    </h3>
                    <p className="inter-display font-weight-[500] font-size-[14px] line-height-[20px] text-gray-900">
                        4
                    </p>
                </div>
                <div
                    className="flex flex-col gap-3 px-[16px] py-[24px]"
                    role="radiogroup"
                    aria-label="Font family"
                >
                    {FONT_FAMILIES.map((font) => (
                        <FontFamilyOption
                            key={font}
                            font={font}
                            isSelected={selectedFamily === font}
                            onSelect={() =>
                                onChange((prev) => ({
                                    ...prev,
                                    font: { ...prev.font, family: font },
                                }))
                            }
                        />
                    ))}
                </div>
            </div>

            <div
                className={`grid shrink-0 overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    showCustomFonts
                        ? 'grid-rows-[0fr] opacity-0'
                        : 'grid-rows-[1fr] opacity-100'
                }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-gray-200 bg-white px-[16px] py-[12px]">
                        <ButtonV2
                            buttonType={ButtonV2Type.SECONDARY}
                            size={ButtonV2Size.LARGE}
                            onClick={() => setShowCustomFonts(true)}
                            text="Add Custom Font"
                            width="100%"
                        />
                    </div>
                </div>
            </div>

            <div
                className={`grid shrink-0 overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    showCustomFonts && customFontsReveal
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
                }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div
                        className={`transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                            showCustomFonts && customFontsReveal
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                        }`}
                    >
                        <div className="flex items-center justify-between border-b border-t border-gray-200 px-[16px] py-[12px]">
                            <h3 className="inter-display font-medium font-size-[14px] line-height-[20px] text-gray-900">
                                Custom Fonts
                            </h3>
                            <ButtonV2
                                buttonType={ButtonV2Type.SECONDARY}
                                size={ButtonV2Size.LARGE}
                                subType={ButtonV2SubType.INLINE}
                                onClick={() => setShowCustomFonts(false)}
                                leftSlot={{
                                    slot: <XIcon size={16} />,
                                }}
                            />
                        </div>
                        <div className="px-[16px] py-[24px]">
                            <input
                                type="text"
                                value={selectedFamily || ''}
                                onChange={(e) =>
                                    onChange((prev) => ({
                                        ...prev,
                                        font: {
                                            ...prev.font,
                                            family: e.target.value,
                                        },
                                    }))
                                }
                                placeholder="Enter font family name..."
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-xs text-gray-400">
                                Make sure the font is loaded in your app (Google
                                Fonts, etc.)
                            </p>
                        </div>

                        <div className="px-[16px] py-[24px]">
                            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Preview
                            </h3>
                            <div
                                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                                style={getFontFamilyStyle(
                                    selectedFamily || 'Inter'
                                )}
                            >
                                <div className="mb-1 text-2xl font-bold text-gray-900">
                                    The quick brown fox
                                </div>
                                <div className="mb-1 text-base text-gray-600">
                                    jumps over the lazy dog
                                </div>
                                <div className="text-sm text-gray-400">
                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Font Family Option
// ---------------------------------------------------------------------------

interface FontFamilyOptionProps {
    font: string
    isSelected: boolean
    onSelect: () => void
}

function FontFamilyOption({
    font,
    isSelected,
    onSelect,
}: FontFamilyOptionProps) {
    const fontStyle = getFontFamilyStyle(font)

    return (
        <Card variant={CardVariant.CUSTOM}>
            <div
                className="flex flex-col w-full gap-[4px] cursor-pointer text-left px-[16px] py-[12px]"
                onClick={onSelect}
                role="presentation"
            >
                <div className="min-w-0 flex items-center justify-between">
                    <p className="title inter-display">{font}</p>
                    <RadioV2
                        checked={isSelected}
                        onCheckedChange={onSelect}
                        aria-label={`Select ${font}`}
                    />
                </div>
                <p className="subtitle" style={fontStyle}>
                    {FONT_PREVIEW_TEXT}
                </p>
            </div>
        </Card>
    )
}
