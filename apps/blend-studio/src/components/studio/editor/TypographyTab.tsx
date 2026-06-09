/**
 * TypographyTab
 *
 * Editor tab for customizing font family and weight.
 * System fonts (built-in + user-added from Google Fonts), Google catalog, custom input.
 */

import { useEffect, useMemo, useState } from 'react'
import {
    ArrowLeftIcon,
    CheckIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    TrashIcon,
} from '@phosphor-icons/react'
import {
    ButtonSize,
    ButtonType,
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    Card,
    CardVariant,
    Modal,
    RadioV2,
    TagV2,
    TagV2Color,
    TagV2Type,
} from '@juspay/blend-design-system'
import {
    getFontFamilyStyle,
    loadTypographyPreviewFonts,
} from '@/components/utils'
import { useAddedSystemFonts } from '@/frontend/hooks/use-added-system-fonts'
import { useGoogleFonts } from '@/frontend/hooks/use-google-fonts'
import {
    isBuiltinSystemFont,
    isInSystemFonts,
    mergeSystemFontLists,
} from '@/lib/added-system-fonts'
import {
    formatGoogleFontCategoryLabel,
    GOOGLE_FONT_CATEGORIES,
    type GoogleFontFamily,
} from '@/lib/google-fonts'
import { featureFlags } from '@/lib/feature-flags'
import {
    DEFAULT_FONT_FAMILY,
    FONT_FAMILIES,
    getEffectiveFontFamily,
    type EditorTabProps,
} from './types'

const FONT_PREVIEW_TEXT = 'The quick brown fox jumps over the lazy dog'
const GOOGLE_FONTS_PREVIEW_LIMIT = 80

const GOOGLE_FONT_CATEGORY_TAG_COLORS: Record<string, TagV2Color> = {
    'sans-serif': TagV2Color.NEUTRAL,
    serif: TagV2Color.PURPLE,
    display: TagV2Color.PRIMARY,
    handwriting: TagV2Color.SUCCESS,
    monospace: TagV2Color.WARNING,
}

function getGoogleFontCategoryTagColor(category: string): TagV2Color {
    return (
        GOOGLE_FONT_CATEGORY_TAG_COLORS[category.toLowerCase()] ??
        TagV2Color.NEUTRAL
    )
}

export interface TypographyTabProps extends EditorTabProps {
    /** Scopes added system fonts to the current branch/workspace. */
    branchId?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TypographyTab({
    brand,
    onChange,
    branchId = 'default',
}: TypographyTabProps) {
    const selectedFamily = getEffectiveFontFamily(brand)
    const [showGoogleFonts, setShowGoogleFonts] = useState(false)
    const [googleFontsReveal, setGoogleFontsReveal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
    const [deleteFontModalOpen, setDeleteFontModalOpen] = useState(false)
    const [selectedFont, setSelectedFont] = useState<GoogleFontFamily | null>(
        null
    )

    const { addedFonts, addFont, removeFont } = useAddedSystemFonts(branchId)
    const systemFontFamilies = useMemo(
        () => mergeSystemFontLists(addedFonts),
        [addedFonts]
    )

    const flags = featureFlags.get()
    const {
        fonts: googleFonts,
        loading: googleFontsLoading,
        error: googleFontsError,
        notConfigured: googleFontsNotConfigured,
        isAvailable: googleFontsAvailable,
    } = useGoogleFonts('popularity')

    useEffect(() => {
        const specs = [
            ...FONT_FAMILIES,
            ...addedFonts.map((f) => ({
                family: f.family,
                variants: f.variants,
            })),
        ]
        loadTypographyPreviewFonts(specs)
    }, [addedFonts])

    useEffect(() => {
        if (!selectedFamily) return

        const added = addedFonts.find((f) => f.family === selectedFamily)
        if (added) {
            loadTypographyPreviewFonts([
                { family: added.family, variants: added.variants },
            ])
            return
        }

        const fromGoogle = googleFonts.find((f) => f.family === selectedFamily)
        if (fromGoogle) {
            loadTypographyPreviewFonts([
                { family: fromGoogle.family, variants: fromGoogle.variants },
            ])
            return
        }

        loadTypographyPreviewFonts([selectedFamily])
    }, [selectedFamily, addedFonts, googleFonts])

    useEffect(() => {
        if (!showGoogleFonts) {
            setGoogleFontsReveal(false)
            return
        }
        if (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setGoogleFontsReveal(true)
            return
        }
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => setGoogleFontsReveal(true))
        })
        return () => cancelAnimationFrame(id)
    }, [showGoogleFonts])

    const filteredGoogleFonts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        let list = googleFonts

        if (categoryFilter) {
            list = list.filter(
                (font) =>
                    font.category.toLowerCase() === categoryFilter.toLowerCase()
            )
        }

        if (q) {
            list = list.filter(
                (font) =>
                    font.family.toLowerCase().includes(q) ||
                    font.category.toLowerCase().includes(q)
            )
        }

        return list.slice(0, GOOGLE_FONTS_PREVIEW_LIMIT)
    }, [googleFonts, searchQuery, categoryFilter])

    const handleSelectGoogleFont = (font: GoogleFontFamily) => {
        addFont(font)
        onChange((prev) => ({
            ...prev,
            font: { ...prev.font, family: font.family },
        }))
    }

    const handleSelectSystemFont = (font: string) => {
        onChange((prev) => ({
            ...prev,
            font: { ...prev.font, family: font },
        }))
    }

    const handleRemoveAddedFont = (family: string) => {
        removeFont(family)
        if (selectedFamily === family) {
            onChange((prev) => ({
                ...prev,
                font: { ...prev.font, family: DEFAULT_FONT_FAMILY },
            }))
            setDeleteFontModalOpen(false)
            return
        }
        setDeleteFontModalOpen(false)
        return
    }

    const googleFontsOpen = showGoogleFonts && googleFontsReveal

    return (
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
            {!googleFontsOpen && (
                <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-gray-200 px-[16px] py-[12px]">
                        <h3 className="inter-display text-[14px] font-medium leading-[20px] text-gray-900">
                            Added Fonts
                        </h3>
                        <p className="inter-display text-[14px] font-medium leading-[20px] text-gray-900">
                            {systemFontFamilies.length}
                        </p>
                    </div>
                    <div
                        className="flex flex-col gap-3 px-[16px] py-[24px]"
                        role="radiogroup"
                        aria-label="Font family"
                    >
                        {systemFontFamilies.map((font) => (
                            <FontFamilyOption
                                key={font}
                                font={font}
                                isSelected={selectedFamily === font}
                                isRemovable={!isBuiltinSystemFont(font)}
                                onSelect={() => handleSelectSystemFont(font)}
                                onRemove={() => {
                                    setSelectedFont({
                                        family: font,
                                        category: '',
                                        variants: [],
                                        styles: [],
                                    })
                                    setDeleteFontModalOpen(true)
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
            <Modal
                title="Delete Font"
                subtitle="Are you sure you want to delete this font?"
                isOpen={deleteFontModalOpen}
                onClose={() => setDeleteFontModalOpen(false)}
                primaryAction={{
                    text: 'Delete Font',
                    buttonType: ButtonType.DANGER,
                    size: ButtonSize.LARGE,

                    onClick: () =>
                        handleRemoveAddedFont(selectedFont?.family ?? ''),
                }}
                secondaryAction={{
                    text: 'Cancel',
                    buttonType: ButtonType.SECONDARY,
                    size: ButtonSize.LARGE,
                    onClick: () => setDeleteFontModalOpen(false),
                }}
                showDivider={false}
            >
                <div className="inter-display text-[14px] font-weight-[400] leading-[20px] text-gray-900">
                    Removing this font will discard any customisations.
                </div>
                <div className="inter-display text-[14px] font-weight-[400] leading-[20px] text-gray-900">
                    You can always re-add it later.
                </div>
            </Modal>
            {!googleFontsOpen && (
                <div className="shrink-0 border-t border-gray-200 bg-white px-[16px] py-[12px]">
                    <ButtonV2
                        buttonType={ButtonV2Type.SECONDARY}
                        size={ButtonV2Size.LARGE}
                        onClick={() => setShowGoogleFonts(true)}
                        text="Add New Font"
                        width="100%"
                        leftSlot={{
                            slot: (
                                <PlusIcon
                                    size={16}
                                    color="#222530"
                                    weight="bold"
                                />
                            ),
                        }}
                    />
                </div>
            )}

            <div
                className={`flex min-h-0 min-w-0 flex-col overflow-hidden transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                    googleFontsOpen
                        ? 'flex-1 opacity-100'
                        : 'h-0 shrink-0 opacity-0 pointer-events-none'
                }`}
            >
                <div className="flex h-full min-h-0 min-w-0 flex-col">
                    <div className="flex shrink-0 items-center gap-2  border-b border-gray-200 px-[16px] py-[12px]">
                        <ButtonV2
                            buttonType={ButtonV2Type.SECONDARY}
                            size={ButtonV2Size.LARGE}
                            subType={ButtonV2SubType.INLINE}
                            onClick={() => {
                                setShowGoogleFonts(false)
                                setSearchQuery('')
                                setCategoryFilter(null)
                            }}
                            leftSlot={{
                                slot: <ArrowLeftIcon size={20} />,
                            }}
                        />
                        <h3 className="inter-display text-[14px] font-medium leading-[20px] text-gray-900">
                            Add fonts from Google Fonts
                        </h3>
                    </div>

                    <div className="shrink-0 border-b border-gray-200 px-[16px] py-[12px]">
                        <div className="relative w-full">
                            <MagnifyingGlassIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#99A0AE]"
                                aria-hidden
                            />
                            <input
                                type="search"
                                placeholder="Search fonts"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-[10px] border border-[#E1E4EA] py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-100"
                            />
                        </div>
                    </div>

                    <div className="shrink-0 min-w-0 border-b border-gray-200 py-[12px]">
                        <div
                            className="min-w-0 overflow-x-auto overscroll-x-contain px-[16px] [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
                            role="group"
                            aria-label="Filter by category"
                        >
                            <div className="flex w-max flex-nowrap items-center gap-2">
                                <div className="shrink-0">
                                    <ButtonV2
                                        buttonType={
                                            categoryFilter === null
                                                ? ButtonV2Type.PRIMARY
                                                : ButtonV2Type.SECONDARY
                                        }
                                        subType={ButtonV2SubType.DEFAULT}
                                        onClick={() => setCategoryFilter(null)}
                                        text="All"
                                    />
                                </div>
                                {GOOGLE_FONT_CATEGORIES.map((category) => (
                                    <div key={category} className="shrink-0">
                                        <ButtonV2
                                            buttonType={
                                                categoryFilter === category
                                                    ? ButtonV2Type.PRIMARY
                                                    : ButtonV2Type.SECONDARY
                                            }
                                            subType={ButtonV2SubType.DEFAULT}
                                            onClick={() =>
                                                setCategoryFilter((current) =>
                                                    current === category
                                                        ? null
                                                        : category
                                                )
                                            }
                                            text={formatGoogleFontCategoryLabel(
                                                category
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {googleFontsLoading && (
                        <p className="shrink-0 px-[16px] py-[12px] text-sm text-gray-500">
                            Loading Google Fonts…
                        </p>
                    )}

                    {googleFontsNotConfigured && (
                        <p className="shrink-0 px-[16px] py-[12px] text-sm text-amber-700">
                            Add GOOGLE_FONTS_API_KEY to the backend .env to
                            enable the font catalog.
                        </p>
                    )}

                    {!googleFontsAvailable &&
                        googleFontsError &&
                        !googleFontsNotConfigured && (
                            <p className="shrink-0 px-[16px] py-[12px] text-sm text-red-600">
                                {googleFontsError}
                            </p>
                        )}

                    {!googleFontsAvailable && !flags.apiBaseUrl && (
                        <p className="shrink-0 px-[16px] py-[12px] text-sm text-gray-500">
                            Set VITE_API_BASE_URL to load fonts from the
                            backend.
                        </p>
                    )}

                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                        <div className="flex min-h-full flex-col gap-[28px] px-[16px] py-[16px]">
                            {filteredGoogleFonts.map((font) => (
                                <GoogleFontOption
                                    key={font.family}
                                    font={font}
                                    isSelected={selectedFamily === font.family}
                                    isAdded={isInSystemFonts(
                                        font.family,
                                        addedFonts
                                    )}
                                    onSelect={() =>
                                        handleSelectGoogleFont(font)
                                    }
                                />
                            ))}
                            {googleFontsAvailable &&
                                filteredGoogleFonts.length === 0 &&
                                !googleFontsLoading && (
                                    <p className="flex flex-1 items-center text-sm text-gray-500">
                                        {categoryFilter || searchQuery.trim()
                                            ? 'No fonts match your filters.'
                                            : 'No fonts available.'}
                                    </p>
                                )}
                            {googleFontsAvailable &&
                                searchQuery.trim() === '' &&
                                !categoryFilter &&
                                googleFonts.length >
                                    GOOGLE_FONTS_PREVIEW_LIMIT && (
                                    <p className="text-xs text-gray-400">
                                        Showing top {GOOGLE_FONTS_PREVIEW_LIMIT}{' '}
                                        by popularity. Search or filter by
                                        category to find more.
                                    </p>
                                )}
                            {googleFontsAvailable &&
                                categoryFilter &&
                                searchQuery.trim() === '' &&
                                filteredGoogleFonts.length >=
                                    GOOGLE_FONTS_PREVIEW_LIMIT && (
                                    <p className="text-xs text-gray-400">
                                        Showing first{' '}
                                        {GOOGLE_FONTS_PREVIEW_LIMIT} in this
                                        category. Search to narrow results.
                                    </p>
                                )}
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
    isRemovable: boolean
    onSelect: () => void
    onRemove: () => void
}

function FontFamilyOption({
    font,
    isSelected,
    isRemovable,
    onSelect,
    onRemove,
}: FontFamilyOptionProps) {
    const fontStyle = getFontFamilyStyle(font)

    return (
        <Card variant={CardVariant.CUSTOM}>
            <div
                className="flex w-full cursor-pointer flex-col gap-[4px] px-[16px] py-[12px] text-left"
                onClick={onSelect}
                role="presentation"
            >
                <div className="flex min-w-0 items-center justify-between">
                    <p className="title inter-display">{font}</p>

                    <div className="flex items-center gap-2">
                        {isRemovable && (
                            <span
                                role="presentation"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ButtonV2
                                    buttonType={ButtonV2Type.SECONDARY}
                                    subType={ButtonV2SubType.INLINE}
                                    onClick={() => onRemove()}
                                    aria-label={`Remove ${font} from system fonts`}
                                    leftSlot={{
                                        slot: (
                                            <TrashIcon
                                                size={16}
                                                color="#99A0AE"
                                            />
                                        ),
                                    }}
                                />
                            </span>
                        )}
                        <RadioV2
                            checked={isSelected}
                            onCheckedChange={onSelect}
                            aria-label={`Select ${font}`}
                        />
                    </div>
                </div>
                <p className="subtitle" style={fontStyle}>
                    {FONT_PREVIEW_TEXT}
                </p>
            </div>
        </Card>
    )
}

interface GoogleFontOptionProps {
    font: GoogleFontFamily
    isSelected: boolean
    isAdded: boolean
    onSelect: () => void
}

function GoogleFontOption({ font, isAdded, onSelect }: GoogleFontOptionProps) {
    const fontStyle = getFontFamilyStyle(font.family)
    return (
        <div
            className="flex w-full flex-col gap-[4px] px-[16px] text-left"
            role="presentation"
        >
            <div className="flex min-w-0 items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-2">
                        <p className="title inter-display truncate">
                            {font.family}
                        </p>
                        <TagV2
                            text={font.category}
                            color={getGoogleFontCategoryTagColor(font.category)}
                            type={TagV2Type.SUBTLE}
                        />
                    </div>
                </div>
                {isAdded ? (
                    <div className="flex items-center gap-2">
                        <CheckIcon size={16} color="#99A0AE" />
                        <p className="text-[11px] text-gray-400">Added</p>
                    </div>
                ) : (
                    <ButtonV2
                        buttonType={ButtonV2Type.SECONDARY}
                        subType={ButtonV2SubType.ICON_ONLY}
                        size={ButtonV2Size.SMALL}
                        onClick={() => onSelect()}
                        leftSlot={{
                            slot: <PlusIcon size={14} color="#99A0AE" />,
                        }}
                    />
                )}
            </div>
            <p className="subtitle truncate" style={fontStyle}>
                {FONT_PREVIEW_TEXT}
            </p>
        </div>
    )
}
