/**
 * WCAG Contrast Ratio Utilities
 *
 * Calculates contrast ratios between two colors per WCAG 2.1 guidelines.
 * Used by the Studio to warn/enforce accessibility compliance.
 *
 * References:
 *   - https://www.w3.org/TR/WCAG21/#contrast-minimum
 *   - https://www.w3.org/TR/WCAG21/#contrast-enhanced
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WCAGLevel = 'AA' | 'AAA'

export type WCAGContext = 'normal' | 'large'

export interface ContrastResult {
    ratio: number
    /** Rounded to 2 decimal places for display */
    display: string
    aa: { normal: boolean; large: boolean }
    aaa: { normal: boolean; large: boolean }
}

export interface ContrastViolation {
    foreground: string
    background: string
    ratio: number
    required: number
    level: WCAGLevel
    context: WCAGContext
    path?: string
}

// ---------------------------------------------------------------------------
// WCAG Thresholds
// ---------------------------------------------------------------------------

const WCAG_THRESHOLDS = {
    AA: { normal: 4.5, large: 3.0 },
    AAA: { normal: 7.0, large: 4.5 },
} as const

// ---------------------------------------------------------------------------
// Color Parsing
// ---------------------------------------------------------------------------

interface RGB {
    r: number
    g: number
    b: number
}

/**
 * Parse a hex color string into RGB components (0-255).
 * Supports #RGB and #RRGGBB formats.
 */
export function hexToRgb(hex: string): RGB | null {
    const cleaned = hex.replace(/^#/, '')

    // Validate hex characters
    if (!/^[0-9A-Fa-f]+$/.test(cleaned)) return null

    if (cleaned.length === 3) {
        return {
            r: parseInt(cleaned[0] + cleaned[0], 16),
            g: parseInt(cleaned[1] + cleaned[1], 16),
            b: parseInt(cleaned[2] + cleaned[2], 16),
        }
    }

    if (cleaned.length === 6) {
        return {
            r: parseInt(cleaned.slice(0, 2), 16),
            g: parseInt(cleaned.slice(2, 4), 16),
            b: parseInt(cleaned.slice(4, 6), 16),
        }
    }

    return null
}

// ---------------------------------------------------------------------------
// Relative Luminance (WCAG 2.1 definition)
// ---------------------------------------------------------------------------

/**
 * Convert a single sRGB channel value (0-255) to its linear value.
 */
function linearize(channel: number): number {
    const srgb = channel / 255
    return srgb <= 0.04045
        ? srgb / 12.92
        : Math.pow((srgb + 0.055) / 1.055, 2.4)
}

/**
 * Calculate relative luminance of a color per WCAG 2.1.
 * Returns a value between 0 (darkest) and 1 (lightest).
 */
export function relativeLuminance(rgb: RGB): number {
    const r = linearize(rgb.r)
    const g = linearize(rgb.g)
    const b = linearize(rgb.b)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// ---------------------------------------------------------------------------
// Contrast Ratio
// ---------------------------------------------------------------------------

/**
 * Calculate the contrast ratio between two colors.
 * Returns a value between 1 (no contrast) and 21 (max contrast, black/white).
 */
export function getContrastRatio(color1: RGB, color2: RGB): number {
    const l1 = relativeLuminance(color1)
    const l2 = relativeLuminance(color2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Calculate contrast ratio from two hex color strings.
 * Returns null if either color is invalid.
 */
export function getContrastRatioHex(hex1: string, hex2: string): number | null {
    const rgb1 = hexToRgb(hex1)
    const rgb2 = hexToRgb(hex2)
    if (!rgb1 || !rgb2) return null
    return getContrastRatio(rgb1, rgb2)
}

// ---------------------------------------------------------------------------
// WCAG Compliance Checks
// ---------------------------------------------------------------------------

/**
 * Check if a contrast ratio meets a specific WCAG level and context.
 */
export function meetsWCAG(
    ratio: number,
    level: WCAGLevel,
    context: WCAGContext
): boolean {
    return ratio >= WCAG_THRESHOLDS[level][context]
}

/**
 * Get a full contrast analysis between two hex colors.
 */
export function analyzeContrast(
    foreground: string,
    background: string
): ContrastResult | null {
    const fgRgb = hexToRgb(foreground)
    const bgRgb = hexToRgb(background)
    if (!fgRgb || !bgRgb) return null

    const ratio = getContrastRatio(fgRgb, bgRgb)

    return {
        ratio,
        display: ratio.toFixed(2) + ':1',
        aa: {
            normal: ratio >= WCAG_THRESHOLDS.AA.normal,
            large: ratio >= WCAG_THRESHOLDS.AA.large,
        },
        aaa: {
            normal: ratio >= WCAG_THRESHOLDS.AAA.normal,
            large: ratio >= WCAG_THRESHOLDS.AAA.large,
        },
    }
}

// ---------------------------------------------------------------------------
// Palette Validation
// ---------------------------------------------------------------------------

/**
 * Validate a color scale against common background colors for WCAG compliance.
 *
 * Checks each shade against white (#FFFFFF) and dark (#1A1A2E) backgrounds
 * to identify which shades are safe for text usage.
 *
 * Returns an array of violations (empty = all good).
 */
export function validatePaletteContrast(
    colorScale: Record<string, string>,
    options: {
        level?: WCAGLevel
        backgrounds?: { name: string; hex: string }[]
    } = {}
): ContrastViolation[] {
    const level = options.level ?? 'AA'
    const backgrounds = options.backgrounds ?? [
        { name: 'white', hex: '#FFFFFF' },
        { name: 'dark', hex: '#1A1A2E' },
    ]

    const violations: ContrastViolation[] = []

    for (const [shade, hex] of Object.entries(colorScale)) {
        if (!hex || typeof hex !== 'string') continue

        for (const bg of backgrounds) {
            const ratio = getContrastRatioHex(hex, bg.hex)
            if (ratio === null) continue

            const required = WCAG_THRESHOLDS[level].normal

            if (ratio < required) {
                violations.push({
                    foreground: hex,
                    background: bg.hex,
                    ratio,
                    required,
                    level,
                    context: 'normal',
                    path: `${shade} on ${bg.name}`,
                })
            }
        }
    }

    return violations
}

/**
 * Suggest the best foreground color (black or white) for a given background.
 */
export function suggestForeground(background: string): '#000000' | '#FFFFFF' {
    const rgb = hexToRgb(background)
    if (!rgb) return '#000000'

    const lum = relativeLuminance(rgb)
    // If background is light, use black text; if dark, use white text.
    return lum > 0.179 ? '#000000' : '#FFFFFF'
}