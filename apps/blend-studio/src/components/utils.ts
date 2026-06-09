import type { CSSProperties } from 'react'
import { generateColorScale } from '@juspay/blend-design-system/tokens'
import { buildGoogleFontCss2FamilyParam } from '@/lib/google-fonts'

export const TYPOGRAPHY_PREVIEW_FONTS_LINK_ID =
    'typography-preview-google-fonts'

/** Build a CSS font-family value with proper quoting and fallbacks. */
export function getFontFamilyStyle(family: string): CSSProperties {
    const trimmed = family.trim()
    if (!trimmed) return { fontFamily: 'sans-serif' }

    if (trimmed.toLowerCase() === 'system ui') {
        return { fontFamily: 'system-ui, sans-serif' }
    }

    return { fontFamily: `"${trimmed}", sans-serif` }
}

export type TypographyPreviewFontSpec =
    | string
    | { family: string; variants?: readonly string[] }

/** Load Google Fonts used by the typography editor preview. */
export function loadTypographyPreviewFonts(
    fonts: readonly TypographyPreviewFontSpec[]
): void {
    if (typeof document === 'undefined') return

    const specs = fonts
        .map((entry) =>
            typeof entry === 'string'
                ? { family: entry, variants: undefined }
                : entry
        )
        .filter((spec) => spec.family.trim().toLowerCase() !== 'system ui')

    if (specs.length === 0) return

    const href = `https://fonts.googleapis.com/css2?${specs
        .map((spec) =>
            buildGoogleFontCss2FamilyParam(spec.family, spec.variants)
        )
        .join('&')}&display=swap`

    let link = document.getElementById(
        TYPOGRAPHY_PREVIEW_FONTS_LINK_ID
    ) as HTMLLinkElement | null

    if (!link) {
        link = document.createElement('link')
        link.id = TYPOGRAPHY_PREVIEW_FONTS_LINK_ID
        link.rel = 'stylesheet'
        document.head.appendChild(link)
    }

    if (link.href !== href) {
        link.href = href
    }
}

export const SHADE_KEYS = [
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

export type ShadeKey = (typeof SHADE_KEYS)[number]

/** Normalise a hex string to uppercase 6-char form, or return null. */
export function normaliseHex(raw: string): string | null {
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
export function isLightColor(hex: string): boolean {
    const clean = hex.replace('#', '')
    const r = parseInt(clean.slice(0, 2), 16)
    const g = parseInt(clean.slice(2, 4), 16)
    const b = parseInt(clean.slice(4, 6), 16)
    // Perceived luminance
    return r * 0.299 + g * 0.587 + b * 0.114 > 160
}

export function generateRandomHex(): string {
    const value = Math.floor(Math.random() * 0xffffff)
    return `#${value.toString(16).padStart(6, '0').toUpperCase()}`
}

export function mergeColorScaleFromBase(
    hex: string,
    currentOverrides: Set<ShadeKey>,
    currentValues: Record<string, string>
): Record<string, string> | null {
    const base = normaliseHex(hex)
    if (!base) return null

    const generated = generateColorScale(base) as Record<string, string>
    const merged: Record<string, string> = {}

    for (const key of SHADE_KEYS) {
        if (currentOverrides.has(key) && currentValues[key]) {
            merged[key] = currentValues[key]
        } else {
            merged[key] = generated[key] ?? base
        }
    }

    return merged
}

export function generateRandomColorScale(): {
    baseHex: string
    scale: Record<string, string>
} {
    const baseHex = generateRandomHex()
    const scale = generateColorScale(baseHex) as Record<string, string>
    return { baseHex, scale }
}

export function resetShadeInScale(
    shade: ShadeKey,
    currentValues: Record<string, string>,
    baseShade: string,
    baseHexInput: string
): Record<string, string> | null {
    const base = normaliseHex(currentValues[baseShade] || baseHexInput)
    if (!base) return null

    const generated = generateColorScale(base) as Record<string, string>
    return { ...currentValues, [shade]: generated[shade] ?? base }
}

// ---------------------------------------------------------------------------
// Component showcase
// ---------------------------------------------------------------------------

export type ShowcaseTheme = 'light' | 'dark'

export function isDarkTheme(theme: ShowcaseTheme = 'light'): boolean {
    return theme === 'dark'
}

export function getShowcaseSurfaceClassNames(
    theme: ShowcaseTheme = 'light'
): string {
    return isDarkTheme(theme) ? 'text-white' : 'bg-[#f8fafc] text-slate-950'
}

export function getShowcaseCardClassNames(
    theme: ShowcaseTheme = 'light'
): string {
    return isDarkTheme(theme)
        ? 'border-slate-800 bg-slate-900/92 shadow-black/20'
        : 'border-slate-200/80 bg-white shadow-slate-200/70'
}

export function getShowcaseMutedTextClassNames(
    theme: ShowcaseTheme = 'light'
): string {
    return isDarkTheme(theme) ? 'text-slate-400' : 'text-slate-500'
}

export function getShowcaseGridClassNames(isMobile: boolean): string {
    return `mx-auto grid grid-cols-1 gap-7 p-2 ${
        isMobile
            ? 'max-w-[375px] sm:grid-cols-1'
            : 'max-w-[1120px] sm:grid-cols-2'
    }`
}

export function getShowcaseBetaNoticeClassNames(
    theme: ShowcaseTheme = 'light'
) {
    return {
        container: isDarkTheme(theme)
            ? 'border-slate-800 bg-slate-950/70 text-slate-400'
            : 'border-slate-200 bg-slate-50 text-slate-500',
        strong: isDarkTheme(theme) ? 'text-slate-200' : 'text-slate-700',
    }
}

export function getShowcaseCardHeaderClassNames(
    theme: ShowcaseTheme = 'light'
): string {
    return isDarkTheme(theme) ? 'border-slate-800' : 'border-slate-200/80'
}

export function getShowcaseTitleClassNames(
    theme: ShowcaseTheme = 'light'
): string {
    return isDarkTheme(theme) ? 'text-slate-100' : 'text-gray-800'
}

export function getShowcaseSubtitleClassNames(
    theme: ShowcaseTheme = 'light'
): string {
    return isDarkTheme(theme) ? 'text-slate-400' : 'text-gray-500'
}

export function getShowcaseClassNames(theme: ShowcaseTheme = 'light') {
    return {
        surface: getShowcaseSurfaceClassNames(theme),
        card: getShowcaseCardClassNames(theme),
        cardHeader: getShowcaseCardHeaderClassNames(theme),
        title: getShowcaseTitleClassNames(theme),
        subtitle: getShowcaseSubtitleClassNames(theme),
        mutedText: getShowcaseMutedTextClassNames(theme),
        betaNotice: getShowcaseBetaNoticeClassNames(theme),
    }
}

export const AUTHORIZATION_RATE_CHART_DATA = [
    { value: 9, name: '1' },
    { value: 11, name: '2' },
    { value: 13, name: '3' },
    { value: 10, name: '4' },
    { value: 12, name: '5' },
    { value: 15, name: '6' },
    { value: 18, name: '7' },
    { value: 17, name: '8' },
    { value: 19, name: '9' },
    { value: 21, name: '10' },
    { value: 22, name: '11' },
]
