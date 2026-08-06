import React from 'react'
import { FOUNDATION_THEME } from '../../tokens'
import {
    SliderVariant,
    SliderSize,
    SliderValueType,
    SliderValueFormatConfig,
} from './types'
import type { SliderTokensType } from './slider.tokens.types'
import { getSliderTokens } from './slider.tokens'

const defaultSliderTokens = getSliderTokens(FOUNDATION_THEME).sm

const getFocusRingColor = (color: string | undefined, opacity: number) =>
    color
        ? `color-mix(in srgb, ${color} ${opacity}%, transparent)`
        : 'transparent'

type SliderCSSProperties = React.CSSProperties & {
    '&:hover'?: {
        boxShadow?: string
    }
    '&:focus'?: {
        outline?: string
        outlineOffset?: string
        boxShadow?: string
    }
    '&:focus-visible'?: {
        outline?: string
        outlineOffset?: string
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

type SliderTokenStyles = {
    root: SliderCSSProperties
    track: SliderCSSProperties
    range: SliderCSSProperties
    thumb: SliderCSSProperties
}

export const getSliderTokenStyles = (
    variant: SliderVariant,
    size: SliderSize,
    tokens: SliderTokensType = defaultSliderTokens
): SliderTokenStyles => {
    const currentSize = tokens[size]
    const currentVariant = tokens[variant]

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
            borderRadius: tokens.borderRadius,
        },
        range: {
            position: 'absolute',
            backgroundColor: currentVariant.rangeBackground,
            height: currentSize.trackHeight,
            borderRadius: tokens.borderRadius,
        },
        thumb: {
            display: 'block',
            width: currentSize.thumbSize,
            height: currentSize.thumbSize,
            backgroundColor: currentVariant.thumbBackground,
            border: `${currentSize.thumbBorder} solid ${currentVariant.thumbBorder}`,
            borderRadius: tokens.thumbBorderRadius,
            boxShadow: tokens.thumbBoxShadow,
            cursor: 'grab',
            '&:hover': {
                boxShadow: tokens.thumbHoverBoxShadow,
            },
            '&:focus': {
                outline: currentVariant.thumbFocusRing
                    ? `2px solid ${currentVariant.thumbFocusRing}`
                    : '2px solid currentColor',
                outlineOffset: '2px',
                boxShadow: `0 0 0 2px ${getFocusRingColor(currentVariant.thumbFocusRing, 12)}, 0 0 0 4px ${getFocusRingColor(currentVariant.thumbFocusRing, 6)}`,
            },
            '&:focus-visible': {
                outline: currentVariant.thumbFocusRing
                    ? `2px solid ${currentVariant.thumbFocusRing}`
                    : '2px solid currentColor',
                outlineOffset: '2px',
                boxShadow: `0 0 0 2px ${getFocusRingColor(currentVariant.thumbFocusRing, 12)}, 0 0 0 4px ${getFocusRingColor(currentVariant.thumbFocusRing, 6)}`,
            },
            '&:active': {
                cursor: 'grabbing',
            },
            '&:disabled': {
                cursor: 'not-allowed',
                opacity: tokens.disabledOpacity,
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
            formattedValue =
                value >= 1
                    ? value.toFixed(decimalPlaces)
                    : `${(value * 100).toFixed(decimalPlaces)}`
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
/**
 * Builds ARIA attributes for slider thumb elements
 */
export const buildThumbAriaAttributes = (options: {
    min: number
    max: number
    value: number
    formattedValue: string
    disabled?: boolean
    ariaLabel?: string
    ariaLabelledBy?: string
    ariaDescribedBy?: string
    thumbIndex: number
    thumbCount: number
}): Record<string, string | undefined> => {
    const {
        min,
        max,
        value,
        formattedValue,
        disabled,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        thumbIndex,
        thumbCount,
    } = options

    const ariaProps: Record<string, string | undefined> = {
        'aria-valuemin': String(min),
        'aria-valuemax': String(max),
        'aria-valuenow': String(value),
        'aria-valuetext': formattedValue,
        'aria-disabled': disabled ? 'true' : undefined,
    }

    if (ariaLabelledBy) {
        ariaProps['aria-labelledby'] = ariaLabelledBy
    } else if (ariaLabel) {
        ariaProps['aria-label'] =
            thumbCount > 1
                ? `${ariaLabel}, value ${thumbIndex + 1}: ${formattedValue}`
                : ariaLabel
    } else {
        ariaProps['aria-label'] =
            thumbCount > 1
                ? `Slider value ${thumbIndex + 1}: ${formattedValue}`
                : `Slider, current value: ${formattedValue}`
    }

    if (ariaDescribedBy) {
        ariaProps['aria-describedby'] = ariaDescribedBy
    }

    return ariaProps
}

/**
 * Get label styles for value display
 */
export const getSliderLabelStyles = (
    position: 'top' | 'bottom' | 'inline' = 'top',
    tokens: SliderTokensType = defaultSliderTokens
): SliderCSSProperties => {
    const baseStyles = {
        position: 'absolute' as const,
        fontSize: tokens.label.fontSize,
        color: tokens.label.color,
        fontWeight: tokens.label.fontWeight,
        whiteSpace: 'nowrap' as const,
        pointerEvents: 'none' as const,
        transform: 'translateX(-50%)',
    }

    const positionStyles = {
        top: {
            bottom: '100%',
            marginBottom: tokens.label.margin,
        },
        bottom: {
            top: '100%',
            marginTop: tokens.label.margin,
        },
        inline: {
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: tokens.label.backgroundColor,
            padding: tokens.label.padding,
            borderRadius: tokens.label.borderRadius,
            boxShadow: tokens.label.boxShadow,
            border: tokens.label.border,
        },
    }

    return {
        ...baseStyles,
        ...positionStyles[position],
    }
}
