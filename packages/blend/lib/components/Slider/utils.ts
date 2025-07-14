import React from 'react'
import { FOUNDATION_THEME } from '../../tokens'
import {
    SliderVariant,
    SliderSize,
    SliderValueType,
    SliderValueFormatConfig,
} from './types'

type SliderCSSProperties = React.CSSProperties & {
    '&:hover'?: {
        boxShadow?: string
    }
    '&:focus'?: {
        outline?: string
        boxShadow?: string
    }
    '&:active'?: {
        cursor?: string
    }
    '&:disabled'?: {
        cursor?: string
        opacity?: string | number
    }
}

interface SliderTokenStyles {
    root: SliderCSSProperties
    track: SliderCSSProperties
    range: SliderCSSProperties
    thumb: SliderCSSProperties
}

export const getSliderTokenStyles = (
    variant: SliderVariant,
    size: SliderSize
): SliderTokenStyles => {
    // Size-based dimensions
    const sizeTokens = {
        [SliderSize.SMALL]: {
            height: FOUNDATION_THEME.unit[20],
            trackHeight: FOUNDATION_THEME.unit[4],
            thumbSize: FOUNDATION_THEME.unit[16],
            thumbBorder: FOUNDATION_THEME.unit[2],
        },
        [SliderSize.MEDIUM]: {
            height: FOUNDATION_THEME.unit[24],
            trackHeight: FOUNDATION_THEME.unit[6],
            thumbSize: FOUNDATION_THEME.unit[20],
            thumbBorder: FOUNDATION_THEME.unit[2],
        },
        [SliderSize.LARGE]: {
            height: FOUNDATION_THEME.unit[28],
            trackHeight: FOUNDATION_THEME.unit[8],
            thumbSize: FOUNDATION_THEME.unit[24],
            thumbBorder: FOUNDATION_THEME.unit[2],
        },
    }

    // Variant-based colors
    const variantTokens = {
        [SliderVariant.PRIMARY]: {
            trackBackground: FOUNDATION_THEME.colors.gray[200],
            rangeBackground: FOUNDATION_THEME.colors.primary[500],
            thumbBackground: FOUNDATION_THEME.colors.gray[0],
            thumbBorder: FOUNDATION_THEME.colors.primary[500],
            thumbFocusRing: FOUNDATION_THEME.colors.primary[500],
        },
        [SliderVariant.SECONDARY]: {
            trackBackground: FOUNDATION_THEME.colors.gray[200],
            rangeBackground: FOUNDATION_THEME.colors.gray[600],
            thumbBackground: FOUNDATION_THEME.colors.gray[0],
            thumbBorder: FOUNDATION_THEME.colors.gray[600],
            thumbFocusRing: FOUNDATION_THEME.colors.gray[600],
        },
    }

    const currentSize = sizeTokens[size]
    const currentVariant = variantTokens[variant]

    return {
        root: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            touchAction: 'none',
            width: '100%',
            height: currentSize.height,
            cursor: 'pointer',
        },
        track: {
            position: 'relative',
            flexGrow: 1,
            backgroundColor: currentVariant.trackBackground,
            height: currentSize.trackHeight,
            borderRadius: FOUNDATION_THEME.border.radius[8],
        },
        range: {
            position: 'absolute',
            backgroundColor: currentVariant.rangeBackground,
            height: currentSize.trackHeight,
            borderRadius: FOUNDATION_THEME.border.radius[8],
        },
        thumb: {
            display: 'block',
            width: currentSize.thumbSize,
            height: currentSize.thumbSize,
            backgroundColor: currentVariant.thumbBackground,
            border: `${currentSize.thumbBorder} solid ${currentVariant.thumbBorder}`,
            borderRadius: FOUNDATION_THEME.border.radius.full,
            boxShadow: FOUNDATION_THEME.shadows.sm,
            cursor: 'grab',
            '&:hover': {
                boxShadow: FOUNDATION_THEME.shadows.md,
            },
            '&:focus': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${currentVariant.thumbFocusRing}20`,
            },
            '&:active': {
                cursor: 'grabbing',
            },
            '&:disabled': {
                cursor: 'not-allowed',
                opacity: FOUNDATION_THEME.opacity[50],
            },
        },
    }
}

/**
 * Formats a slider value according to the specified format configuration
 */
export const formatSliderValue = (
    value: number,
    format?: SliderValueFormatConfig
): string => {
    if (!format) return value.toString()

    if (format.formatter) {
        return format.formatter(value)
    }

    const { type, decimalPlaces = 0, prefix = '', suffix = '' } = format

    let formattedValue: string

    switch (type) {
        case SliderValueType.PERCENTAGE:
            formattedValue = `${(value * 100).toFixed(decimalPlaces)}`
            break

        case SliderValueType.DECIMAL:
            formattedValue = value.toFixed(decimalPlaces)
            break

        case SliderValueType.NUMBER:
        default:
            formattedValue = Math.round(value).toString()
            break
    }

    return `${prefix}${formattedValue}${suffix}`
}

/**
 * Parse a formatted string value back to a number
 */
export const parseSliderValue = (
    formattedValue: string,
    format?: SliderValueFormatConfig
): number => {
    if (!format) {
        return parseFloat(formattedValue) || 0
    }

    // Remove prefix and suffix
    let cleanValue = formattedValue
    if (format.prefix) {
        cleanValue = cleanValue.replace(format.prefix, '')
    }
    if (format.suffix) {
        cleanValue = cleanValue.replace(format.suffix, '')
    }

    const numericValue = parseFloat(cleanValue) || 0

    switch (format.type) {
        case SliderValueType.PERCENTAGE:
            return numericValue / 100

        case SliderValueType.DECIMAL:
        case SliderValueType.NUMBER:
        default:
            return numericValue
    }
}

export const createSliderRange = (
    min: number,
    max: number,
    step: number,
    initialStart: number,
    initialEnd: number,
    type: SliderValueType,
    options?: {
        prefix?: string
        suffix?: string
        decimalPlaces?: number
    }
): {
    min: number
    max: number
    step: number
    defaultValue: number[]
    valueFormat: SliderValueFormatConfig
} => {
    const configs = {
        [SliderValueType.NUMBER]: {
            step: 1,
            valueFormat: {
                type: SliderValueType.NUMBER,
                showLabels: true,
            },
        },
        [SliderValueType.PERCENTAGE]: {
            step: 0.01,
            valueFormat: {
                type: SliderValueType.PERCENTAGE,
                decimalPlaces: 0,
                showLabels: true,
            },
        },
        [SliderValueType.DECIMAL]: {
            step: 0.1,
            valueFormat: {
                type: SliderValueType.DECIMAL,
                decimalPlaces: 1,
                showLabels: true,
            },
        },
    }

    const config = configs[type]

    return {
        min,
        max,
        step: step || config.step,
        defaultValue: [initialStart, initialEnd],
        valueFormat: {
            ...config.valueFormat,
            ...options,
        } as SliderValueFormatConfig,
    }
}

/**
 * Get label styles for value display
 */
export const getSliderLabelStyles = (
    position: 'top' | 'bottom' | 'inline' = 'top'
): SliderCSSProperties => {
    const baseStyles = {
        position: 'absolute' as const,
        fontSize: FOUNDATION_THEME.font.size.body.xs.fontSize,
        color: FOUNDATION_THEME.colors.gray[600],
        fontWeight: 500,
        whiteSpace: 'nowrap' as const,
        pointerEvents: 'none' as const,
        transform: 'translateX(-50%)',
    }

    const positionStyles = {
        top: {
            bottom: '100%',
            marginBottom: FOUNDATION_THEME.unit[4],
        },
        bottom: {
            top: '100%',
            marginTop: FOUNDATION_THEME.unit[4],
        },
        inline: {
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: FOUNDATION_THEME.colors.gray[0],
            padding: `${FOUNDATION_THEME.unit[2]} ${FOUNDATION_THEME.unit[4]}`,
            borderRadius: FOUNDATION_THEME.border.radius[4],
            boxShadow: FOUNDATION_THEME.shadows.sm,
            border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        },
    }

    return {
        ...baseStyles,
        ...positionStyles[position],
    }
}
