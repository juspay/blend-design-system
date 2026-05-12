import FOUNDATION_THEME from '../../tokens/theme.token'
import {
    SliderV2CSSProperties,
    SliderV2ValueFormatConfig,
    SliderV2ValueType,
} from './SliderV2.types'

/**
 * Formats a slider value according to the specified format configuration
 */
export const formatSliderValue = (
    value: number,
    format?: SliderV2ValueFormatConfig
): string => {
    if (!format) return value.toString()

    if (format.formatter) {
        return format.formatter(value)
    }

    const { type, decimalPlaces = 0, prefix = '', suffix = '' } = format

    let formattedValue: string

    switch (type) {
        case SliderV2ValueType.PERCENTAGE:
            formattedValue =
                value >= 1
                    ? value.toFixed(decimalPlaces)
                    : `${(value * 100).toFixed(decimalPlaces)}`
            break

        case SliderV2ValueType.DECIMAL:
            formattedValue = value.toFixed(decimalPlaces)
            break

        case SliderV2ValueType.NUMBER:
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
    format?: SliderV2ValueFormatConfig
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
        case SliderV2ValueType.PERCENTAGE:
            return numericValue / 100

        case SliderV2ValueType.DECIMAL:
        case SliderV2ValueType.NUMBER:
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
    type: SliderV2ValueType,
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
    valueFormat: SliderV2ValueFormatConfig
} => {
    const configs = {
        [SliderV2ValueType.NUMBER]: {
            step: 1,
            valueFormat: {
                type: SliderV2ValueType.NUMBER,
                showLabels: true,
            },
        },
        [SliderV2ValueType.PERCENTAGE]: {
            step: 0.01,
            valueFormat: {
                type: SliderV2ValueType.PERCENTAGE,
                decimalPlaces: 0,
                showLabels: true,
            },
        },
        [SliderV2ValueType.DECIMAL]: {
            step: 0.1,
            valueFormat: {
                type: SliderV2ValueType.DECIMAL,
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
        } as SliderV2ValueFormatConfig,
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
    position: 'top' | 'bottom' | 'inline' = 'top'
): SliderV2CSSProperties => {
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
