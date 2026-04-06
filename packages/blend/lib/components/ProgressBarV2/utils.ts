import type { CSSObject } from 'styled-components'
import type { ProgressBarV2TokenType } from './progressBarV2.tokens'
import { ProgressBarV2Size } from './progressBarV2.types'

/**
 * Returns ordered bounds so `min` ≤ `max` (swaps when the caller passes a reversed range).
 * Use this for progressbar ARIA (`aria-valuemin` must be ≤ `aria-valuemax`) and for math.
 */
export const normalizeRange = (
    min: number,
    max: number
): { min: number; max: number } => {
    if (max < min) {
        return { min: max, max: min }
    }
    return { min, max }
}

export const clampValue = (value: number, min: number, max: number): number => {
    const { min: lo, max: hi } = normalizeRange(min, max)
    return Math.min(hi, Math.max(lo, value))
}
export const getProgressBarValueState = (
    value: number,
    min: number,
    max: number
): {
    rangeMin: number
    rangeMax: number
    clampedValue: number
    percentage: number
} => {
    const { min: rangeMin, max: rangeMax } = normalizeRange(min, max)
    const clampedValue = clampValue(value, rangeMin, rangeMax)
    const percentage =
        rangeMax === rangeMin
            ? 0
            : ((clampedValue - rangeMin) / (rangeMax - rangeMin)) * 100
    return { rangeMin, rangeMax, clampedValue, percentage }
}

export const calculatePercentage = (
    value: number,
    min: number,
    max: number
): number => getProgressBarValueState(value, min, max).percentage

export const parseTokenValue = (
    tokenValue: string | number | undefined,
    fallback: number
): number => {
    if (typeof tokenValue === 'number') return tokenValue
    if (!tokenValue) return fallback
    const parsed = parseFloat(String(tokenValue))
    return isNaN(parsed) ? fallback : parsed
}

export const extractAriaProps = (
    rest: Record<string, unknown> | undefined
): {
    'aria-label'?: string
    'aria-labelledby'?: string
    restProps: Record<string, unknown>
} => {
    if (!rest) {
        return { restProps: {} }
    }

    const {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        ...restProps
    } = rest as {
        'aria-label'?: string
        'aria-labelledby'?: string
        [key: string]: unknown
    }

    return {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        restProps,
    }
}

export const generateDefaultAriaLabel = (
    value: number,
    min: number,
    max: number
): string => {
    const percentage = Math.round(calculatePercentage(value, min, max))
    return `Progress: ${percentage}%`
}

export const getCircularDimensions = (
    size: ProgressBarV2Size,
    tokens: ProgressBarV2TokenType
) => {
    const circularSizeValue = tokens.circular.size[size]
    // Preserve token type for width/height: numeric tokens stay numbers; avoid String(n) → unitless "n" in CSS.
    const circularSize: CSSObject['width'] =
        circularSizeValue === undefined || circularSizeValue === null
            ? 48
            : circularSizeValue
    const sizeNum = parseTokenValue(circularSizeValue, 48)
    const strokeWidth = parseTokenValue(tokens.circular.strokeWidth[size], 4)
    const radius = (sizeNum - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const center = sizeNum / 2

    return {
        circularSize,
        sizeNum,
        strokeWidth,
        radius,
        circumference,
        center,
    }
}

/** Parse token like `"4 2"` or `"8 4"` into [dashLen, gapLen]. */
export const parseCircularDashToken = (
    token: string | undefined,
    fallbackDash = 8,
    fallbackGap = 4
): [number, number] => {
    if (!token || !String(token).trim()) {
        return [fallbackDash, fallbackGap]
    }
    const parts = String(token)
        .trim()
        .split(/[\s,]+/)
        .map((x) => parseFloat(x))
        .filter((n) => Number.isFinite(n) && n > 0)
    if (parts.length >= 2) {
        return [parts[0], parts[1]]
    }
    return [fallbackDash, fallbackGap]
}

export const calculateCircularProgressStroke = (
    circumference: number,
    percentage: number
) => ({
    strokeDasharray: String(circumference),
    strokeDashoffset: circumference - (percentage / 100) * circumference,
})
