import type { ProgressBarTokenType } from './progressbar.tokens'
import { ProgressBarSize } from './types'

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
    size: ProgressBarSize,
    tokens: ProgressBarTokenType
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

export const calculateCircularStroke = (
    type: 'solid' | 'segmented',
    circumference: number,
    percentage: number
) => {
    const segmentLength = 8
    const gapLength = 4
    const dashArray = `${segmentLength} ${gapLength}`
    const totalDashLength = segmentLength + gapLength
    const totalSegments = Math.floor(circumference / totalDashLength)
    const progressSegments = Math.floor((percentage / 100) * totalSegments)
    const progressLength = progressSegments * totalDashLength

    const strokeDasharray =
        type === 'segmented' ? dashArray : String(circumference)
    const strokeDashoffset =
        type === 'segmented'
            ? circumference - progressLength
            : circumference - (percentage / 100) * circumference

    return {
        strokeDasharray,
        strokeDashoffset,
        dashArray,
    }
}
