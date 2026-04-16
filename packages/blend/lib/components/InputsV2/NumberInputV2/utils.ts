import { toPixels } from '../../../global-utils/GlobalUtils'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import type { NumberInputV2TokensType } from './numberInputV2.tokens'
import { NumberInputV2Direction } from './numberInputV2.types'

export const sanitizeNumberInput = (
    inputValue: string,
    allowNegative: boolean = true
): string => {
    if (inputValue === '') {
        return ''
    }

    if (inputValue === '-' && allowNegative) {
        return '-'
    }

    let sanitized = inputValue.replace(/[^\d.-]/g, '')

    if (!allowNegative) {
        sanitized = sanitized.replace(/-/g, '')
    } else {
        const firstMinusIndex = sanitized.indexOf('-')
        if (firstMinusIndex !== -1) {
            if (firstMinusIndex === 0) {
                sanitized = '-' + sanitized.substring(1).replace(/-/g, '')
            } else {
                sanitized = sanitized.replace(/-/g, '')
            }
        }
    }

    const firstDotIndex = sanitized.indexOf('.')
    if (firstDotIndex !== -1) {
        const beforeDot = sanitized.substring(0, firstDotIndex + 1)
        const afterDot = sanitized
            .substring(firstDotIndex + 1)
            .replace(/\./g, '')
        sanitized = beforeDot + afterDot
    }

    if (sanitized.startsWith('-0')) {
        const afterZero = sanitized.substring(2)
        if (/^\.0+$/.test(afterZero)) {
            sanitized = '0'
        }
    }

    return sanitized
}

export const clampToBoundary = (
    value: number,
    min?: number,
    max?: number
): number => {
    if (min !== undefined && value < min) {
        return min
    }
    if (max !== undefined && value > max) {
        return max
    }
    return value
}

export const getEffectiveNumericValue = (
    rawNumericValue: number | null,
    preventNegative: boolean,
    min?: number,
    max?: number
): number | null => {
    if (rawNumericValue === null || isNaN(rawNumericValue)) return null
    let n = rawNumericValue
    if (preventNegative && n < 0) n = 0
    return clampToBoundary(n, min, max)
}

const adjustByStep = (
    currentValue: number | null,
    step: number,
    min: number | undefined,
    max: number | undefined,
    preventNegative: boolean,
    direction: 1 | -1
): number => {
    const baseValue = currentValue ?? min ?? 0
    let next = clampToBoundary(baseValue + direction * step, min, max)
    if (preventNegative && next < 0) next = 0
    return next
}

export const incrementValue = (
    currentValue: number | null,
    step: number = 1,
    min?: number,
    max?: number,
    preventNegative: boolean = false
): number => adjustByStep(currentValue, step, min, max, preventNegative, 1)

export const decrementValue = (
    currentValue: number | null,
    step: number = 1,
    min?: number,
    max?: number,
    preventNegative: boolean = false
): number => adjustByStep(currentValue, step, min, max, preventNegative, -1)

export const clampValueOnBlur = (
    inputValue: string,
    allowNegative: boolean = true,
    min?: number,
    max?: number
): string => {
    if (inputValue === '' || inputValue === '-') {
        return ''
    }

    const sanitized = sanitizeNumberInput(inputValue, allowNegative)

    if (sanitized === '' || sanitized === '-') {
        return ''
    }

    const numValue = Number(sanitized)

    if (isNaN(numValue)) {
        return ''
    }

    const normalizedValue = Object.is(numValue, -0) ? 0 : numValue

    let clampedValue = normalizedValue
    if (!allowNegative && clampedValue < 0) {
        clampedValue = 0
    }

    clampedValue = clampToBoundary(clampedValue, min, max)

    return String(clampedValue)
}

export const isValueOutsideRange = (
    value: number,
    min?: number,
    max?: number
): boolean => {
    if (min !== undefined && value < min) return true
    if (max !== undefined && value > max) return true
    return false
}

export const getRangeErrorMessage = (min?: number, max?: number): string => {
    if (min !== undefined && max !== undefined) {
        return `Value must be between ${min} and ${max}`
    }
    if (min !== undefined) {
        return `Value must be at least ${min}`
    }
    if (max !== undefined) {
        return `Value must be at most ${max}`
    }
    return 'Invalid value'
}

/** Stepping base: raw controlled number with only `preventNegative` applied (min/max handled in increment/decrement). */
export const getSteppingBaseValue = (
    rawNumericValue: number | null,
    preventNegative: boolean
): number | null => {
    if (rawNumericValue === null || isNaN(rawNumericValue)) return null
    let n = rawNumericValue
    if (preventNegative && n < 0) n = 0
    return n
}

export const getNumberInputDisplayValue = (
    isFocused: boolean,
    internalValue: string,
    value: number | null,
    effectiveNumericValue: number | null
): string => {
    if (isFocused) return internalValue
    if (value == null) return ''
    if (effectiveNumericValue !== null) return String(effectiveNumericValue)
    return ''
}

export const getInputFocusedOrWithValue = (
    isFocused: boolean,
    displayValue: string
): boolean => isFocused || displayValue !== ''

export const isSmallScreenWithLargeSize = (
    isSmallScreen: boolean,
    size: InputSizeV2
): boolean => isSmallScreen && size === InputSizeV2.LG

export const getRangeErrorMessageIfOutside = (
    rawNumericValue: number | null,
    numericMin: number | undefined,
    numericMax: number | undefined
): string | undefined => {
    if (rawNumericValue === null || isNaN(rawNumericValue)) {
        return undefined
    }
    if (isValueOutsideRange(rawNumericValue, numericMin, numericMax)) {
        return getRangeErrorMessage(numericMin, numericMax)
    }
    return undefined
}

export const getNumberInputHasError = (
    errorShow: boolean | undefined,
    errorMessage: string | undefined,
    rangeErrorMessage: string | undefined
): boolean => Boolean(errorShow && errorMessage) || Boolean(rangeErrorMessage)

export const getNumberInputDisplayErrorMessage = (
    errorShow: boolean | undefined,
    errorMessage: string | undefined,
    rangeErrorMessage: string | undefined
): string | undefined => (errorShow && errorMessage) || rangeErrorMessage

export const buildNumberInputAriaDescribedBy = (
    hintText: string | undefined,
    hasError: boolean,
    hintId: string,
    errorId: string,
    displayErrorMessage: string | undefined
): string | undefined => {
    const parts = [
        hintText && !hasError ? hintId : null,
        displayErrorMessage ? errorId : null,
    ].filter(Boolean) as string[]
    return parts.length > 0 ? parts.join(' ') : undefined
}

export const getNumberInputLabelState = (
    disabled: boolean | undefined,
    hasError: boolean,
    isFocused: boolean
): InputStateV2 => {
    if (disabled) return InputStateV2.DISABLED
    if (hasError) return InputStateV2.ERROR
    if (isFocused) return InputStateV2.FOCUS
    return InputStateV2.DEFAULT
}

export const computeIsUpButtonDisabled = (
    numericMax: number | undefined,
    steppingBaseValue: number | null,
    numericMin: number | undefined,
    stepValue: number
): boolean =>
    numericMax !== undefined &&
    (steppingBaseValue === null
        ? (numericMin ?? 0) + stepValue > numericMax
        : steppingBaseValue >= numericMax ||
          steppingBaseValue + stepValue > numericMax)

export const computeIsDownButtonDisabled = (
    steppingBaseValue: number | null,
    preventNegative: boolean,
    numericMin: number | undefined,
    stepValue: number
): boolean =>
    steppingBaseValue === null
        ? preventNegative ||
          (numericMin !== undefined &&
              (numericMin ?? 0) - stepValue < numericMin)
        : (numericMin !== undefined &&
              (steppingBaseValue <= numericMin ||
                  steppingBaseValue - stepValue < numericMin)) ||
          (preventNegative &&
              (steppingBaseValue <= 0 || steppingBaseValue - stepValue < 0))

/** Parsed numeric string for controlled onChange, or empty string when incomplete/invalid. */
export const sanitizedToCommittedValueString = (sanitized: string): string => {
    const numValue =
        sanitized === '' || sanitized === '-' ? null : Number(sanitized)
    return numValue !== null && !isNaN(numValue) ? String(numValue) : ''
}

export const rawNumericToComparableString = (
    rawNumericValue: number | null
): string =>
    rawNumericValue !== null && !isNaN(rawNumericValue)
        ? String(rawNumericValue)
        : ''

export const shouldSkipControlledChange = (
    valueString: string,
    currentValueString: string
): boolean => valueString === currentValueString

export const shouldEmitBlurChange = (
    clamped: string,
    eventValue: string,
    clampedNumValue: number | null,
    rawNumericValue: number | null
): boolean => clamped !== eventValue && clampedNumValue !== rawNumericValue

type NumberInputV2InputContainerTokens =
    NumberInputV2TokensType['inputContainer']

/** Subscribes to `element` width changes; calls `setWidth` with `offsetWidth`. Returns unsubscribe. */
export const subscribeElementOffsetWidth = (
    element: HTMLElement,
    setWidth: (width: number) => void
): (() => void) => {
    const measure = (): void => {
        setWidth(element.offsetWidth)
    }
    measure()
    if (typeof ResizeObserver === 'undefined') {
        return () => {}
    }
    const ro = new ResizeObserver(measure)
    if (typeof ro.observe !== 'function') {
        return () => {}
    }
    ro.observe(element)
    return () => {
        if (typeof ro.disconnect === 'function') {
            ro.disconnect()
        }
    }
}

/**
 * Horizontal padding so input text clears absolutely positioned adornments on the **left**:
 * - **Unit left**: unit width + left-slot margin + left-slot width + `paddingLeft` token.
 * - **Unit right**: left-slot margin + left-slot width + `paddingLeft` only (unit and right
 *   adornments do not affect left inset).
 */
export const getNumberInputV2PaddingLeft = (
    inputContainerTokens: NumberInputV2InputContainerTokens,
    size: InputSizeV2,
    showUnit: boolean,
    unitDirection: NumberInputV2Direction,
    measuredUnitWidth: number,
    measuredLeftSlotWidth: number,
    _measuredRightSlotWidth: number
): string => {
    const pl = inputContainerTokens.paddingLeft[size]
    const ml = toPixels(inputContainerTokens.slot.left.margin[size] ?? 0)
    if (showUnit && unitDirection === NumberInputV2Direction.LEFT) {
        return `${measuredUnitWidth + ml + measuredLeftSlotWidth + toPixels(pl)}px`
    }
    if (showUnit && unitDirection === NumberInputV2Direction.RIGHT) {
        return `${ml + measuredLeftSlotWidth + toPixels(pl)}px`
    }
    return pl as string
}

/**
 * Horizontal padding so input text clears absolutely positioned adornments on the **right**:
 * - **Unit right**: unit width + `paddingRight` + right-slot width (matches slot `marginRight`
 *   layout: unit + padding strip, then the right slot).
 * - **Unit left**: right-slot margin + right-slot width + `paddingRight` only.
 */
export const getNumberInputV2PaddingRight = (
    inputContainerTokens: NumberInputV2InputContainerTokens,
    size: InputSizeV2,
    showUnit: boolean,
    unitDirection: NumberInputV2Direction,
    measuredUnitWidth: number,
    _measuredLeftSlotWidth: number,
    measuredRightSlotWidth: number
): string => {
    const pr = inputContainerTokens.paddingRight[size]
    const mr = toPixels(inputContainerTokens.slot.right.margin[size] ?? 0)
    if (showUnit && unitDirection === NumberInputV2Direction.RIGHT) {
        return `${measuredUnitWidth + toPixels(pr) + measuredRightSlotWidth}px`
    }
    if (showUnit && unitDirection === NumberInputV2Direction.LEFT) {
        return `${mr + measuredRightSlotWidth + toPixels(pr)}px`
    }
    return pr as string
}
