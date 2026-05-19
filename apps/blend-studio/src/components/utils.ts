import { generateColorScale } from '@juspay/blend-design-system/tokens'

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
    return isDarkTheme(theme)
        ? 'bg-slate-950 text-white'
        : 'bg-[#f8fafc] text-slate-950'
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

export function getShowcaseClassNames(theme: ShowcaseTheme = 'light') {
    return {
        surface: getShowcaseSurfaceClassNames(theme),
        card: getShowcaseCardClassNames(theme),
        mutedText: getShowcaseMutedTextClassNames(theme),
        betaNotice: getShowcaseBetaNoticeClassNames(theme),
    }
}

export const AUTHORIZATION_RATE_CHART_OPTIONS = {
    series: [
        {
            data: [9, 11, 13, 10, 12, 15, 18, 17, 19, 21, 22],
            type: 'area' as const,
            color: '#00A63E',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                },
                stops: [
                    [0, 'rgba(123, 241, 168, 0.40)'] as [number, string],
                    [1, 'rgba(123, 241, 168, 0.00)'] as [number, string],
                ],
            },
        },
    ],
}
