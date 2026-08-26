import { parseBackground, parseDuration } from '../../adapters/cssStringAdapter'

/**
 * Pure math and token decoding for `ProgressBar` — ports of web's
 * `ProgressBarV2/utils.ts` plus the native-only segmented-pattern and
 * transition decoding. All total: bad input degrades to a sane fallback.
 */

/** Web's `normalizeRange` — reversed bounds swap so min <= max. */
export function normalizeRange(
    min: number,
    max: number
): { min: number; max: number } {
    if (!Number.isFinite(min)) min = 0
    if (!Number.isFinite(max)) max = 100
    return min <= max ? { min, max } : { min: max, max: min }
}

/** Web's `clampValue`. */
export function clampValue(value: number, min: number, max: number): number {
    if (!Number.isFinite(value)) return min
    return Math.min(max, Math.max(min, value))
}

/** Web's `calculatePercentage` — guarded against a zero-width range. */
export function calculatePercentage(
    value: number,
    min: number,
    max: number
): number {
    if (max === min) return 0
    return ((value - min) / (max - min)) * 100
}

/** Web's `parseCircularDashToken` — `'4 2'` or `'4,2'` to numbers. */
export function parseCircularDashToken(token: string | undefined): number[] {
    if (!token) return []
    const parts = token
        .split(/[\s,]+/)
        .map((p) => parseFloat(p))
        .filter((n) => Number.isFinite(n) && n >= 0)
    return parts.length >= 2 ? parts : []
}

export type CircularStroke = {
    radius: number
    circumference: number
    dashOffset: number
}

/** Web's `calculateCircularProgressStroke` — radius inset by the stroke. */
export function calculateCircularProgressStroke(
    size: number,
    strokeWidth: number,
    percentage: number
): CircularStroke {
    const radius = Math.max(0, (size - strokeWidth) / 2)
    const circumference = 2 * Math.PI * radius
    return {
        radius,
        circumference,
        dashOffset: circumference - (percentage / 100) * circumference,
    }
}

export type SegmentedPattern = {
    markColor: string | null
    markWidth: number
    period: number
}

/**
 * Decode web's segmented empty-track pattern. Web paints it with
 * `repeating-linear-gradient(to right, <color>, <color> 2px, transparent
 * 2px, transparent 8px)` sized `'10px 100%'` — unrepresentable in RN, so
 * native renders discrete tick marks with the same color, mark width and
 * period. `parseBackground` degrades the unsupported gradient to its first
 * color stop, which is exactly the mark color.
 */
export function parseSegmentedPattern(
    backgroundImage: string | undefined,
    backgroundSize: string | undefined
): SegmentedPattern {
    const parsed = parseBackground(backgroundImage)
    const markColor = parsed?.type === 'flat' ? parsed.color : null

    const firstPx = (value: string | undefined): number | null => {
        const match = value?.match(/(-?(?:\d+(?:\.\d+)?|\.\d+))px/)
        if (!match) return null
        const n = parseFloat(match[1])
        return Number.isFinite(n) && n > 0 ? n : null
    }

    return {
        markColor,
        markWidth: firstPx(backgroundImage) ?? 2,
        period: firstPx(backgroundSize) ?? 10,
    }
}

/**
 * Circular diameter for a size, healing a web token hole: the web token
 * file ships `circular.size = { sm, lg }` with no `md` entry (its md
 * circular bar renders with an undefined width — flagged upstream). Native
 * falls back down the ladder, then to web's sm default.
 */
export function getCircularDiameter(
    sizeTokens: Record<string, unknown>,
    size: string,
    parse: (v: string | number | undefined) => number | undefined
): number {
    return (
        parse(sizeTokens[size] as string | number | undefined) ??
        parse(sizeTokens.sm as string | number | undefined) ??
        40
    )
}

export type FillAnimation = { duration: number }

/**
 * Decode a CSS transition shorthand token (`'width 0.3s ease-in-out'`)
 * into the animation duration. The easing keyword maps to the motion
 * layer's standard curve at the call site.
 */
export function parseTransitionDuration(
    transition: string | undefined,
    fallback = 300
): number {
    if (!transition) return fallback
    for (const part of transition.split(/\s+/)) {
        const duration = parseDuration(part)
        if (duration !== undefined) return duration
    }
    return fallback
}
