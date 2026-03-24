import type { ProgressBarV2TokenType } from './progressBarV2.tokens'
import { ProgressBarV2Size } from './progressBarV2.types'

export const clampValue = (value: number, min: number, max: number): number => {
    return Math.min(max, Math.max(min, value))
}

export const calculatePercentage = (
    value: number,
    min: number,
    max: number
): number => {
    const clamped = clampValue(value, min, max)
    return ((clamped - min) / (max - min)) * 100
}

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
    const circularSize = String(circularSizeValue ?? 48)
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
