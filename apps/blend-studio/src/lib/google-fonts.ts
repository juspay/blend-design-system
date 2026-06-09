export interface GoogleFontStyle {
    variant: string
    weight: number
    italic: boolean
}

export interface GoogleFontFamily {
    family: string
    category: string
    variants: string[]
    styles: GoogleFontStyle[]
}

/** Standard Google Fonts API categories. */
export const GOOGLE_FONT_CATEGORIES = [
    'sans-serif',
    'serif',
    'display',
    'handwriting',
    'monospace',
] as const

export type GoogleFontCategory = (typeof GOOGLE_FONT_CATEGORIES)[number]

export function formatGoogleFontCategoryLabel(category: string): string {
    return category
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

/** Parse a Google Fonts API variant string (e.g. "700italic"). */
export function parseGoogleFontVariant(variant: string): GoogleFontStyle {
    const italic = variant.includes('italic')
    const weightPart = variant.replace('italic', '') || 'regular'
    const parsed = Number.parseInt(weightPart, 10)
    const weight =
        weightPart === 'regular' ? 400 : Number.isNaN(parsed) ? 400 : parsed

    return { variant, weight, italic }
}

/** Build a single css2 `family=` param with weights and italics. */
export function buildGoogleFontCss2FamilyParam(
    family: string,
    variants?: readonly string[]
): string {
    const name = family.trim().replace(/\s+/g, '+')
    if (!variants?.length) {
        return `family=${name}`
    }

    const hasItalic = variants.some((v) => v.includes('italic'))
    if (!hasItalic) {
        const weights = [
            ...new Set(variants.map((v) => parseGoogleFontVariant(v).weight)),
        ].sort((a, b) => a - b)
        return `family=${name}:wght@${weights.join(';')}`
    }

    const tuples = [
        ...new Set(
            variants.map((v) => {
                const { weight, italic } = parseGoogleFontVariant(v)
                return `${italic ? 1 : 0},${weight}`
            })
        ),
    ].sort()

    return `family=${name}:ital,wght@${tuples.join(';')}`
}

export function formatGoogleFontStyleLabel(style: GoogleFontStyle): string {
    const weightLabel =
        style.weight === 400 && !style.italic
            ? 'Regular'
            : style.weight === 700 && !style.italic
              ? 'Bold'
              : `${style.weight}`
    return style.italic ? `${weightLabel} Italic` : weightLabel
}
