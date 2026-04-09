import type { KeyboardEvent } from 'react'
import {
    decrementValue,
    getRangeErrorMessage,
    incrementValue,
    isValueOutsideRange,
} from '../utils/utils'

export type UnitInputV2NumericDerived = {
    numericMin?: number
    numericMax?: number
    stepValue: number
    currentNumericValue: number | null
    clampPreventNegative: boolean
    isUpButtonDisabled: boolean
    isDownButtonDisabled: boolean
    rangeViolation: boolean
    rangeErrorMessage?: string
    hasError: boolean
    displayErrorMessage?: string
}

export function getUnitInputV2NumericDerived(
    value: number | undefined,
    min: number | string | undefined,
    max: number | string | undefined,
    step: number | undefined,
    error: boolean,
    errorMessage: string | undefined
): UnitInputV2NumericDerived {
    const numericMin = min !== undefined ? Number(min) : undefined
    const numericMax = max !== undefined ? Number(max) : undefined
    const stepValue = step ?? 1
    const currentNumericValue =
        value !== undefined && value !== null && !Number.isNaN(Number(value))
            ? Number(value)
            : null
    const clampPreventNegative = numericMin !== undefined && numericMin >= 0

    const isUpButtonDisabled =
        numericMax !== undefined &&
        (currentNumericValue === null
            ? (numericMin ?? 0) + stepValue > numericMax
            : currentNumericValue >= numericMax ||
              currentNumericValue + stepValue > numericMax)

    const isDownButtonDisabled =
        currentNumericValue === null
            ? clampPreventNegative ||
              (numericMin !== undefined &&
                  (numericMin ?? 0) - stepValue < numericMin)
            : (numericMin !== undefined &&
                  (currentNumericValue <= numericMin ||
                      currentNumericValue - stepValue < numericMin)) ||
              (clampPreventNegative &&
                  (currentNumericValue <= 0 ||
                      currentNumericValue - stepValue < 0))

    const rangeViolation =
        value !== undefined &&
        value !== null &&
        !Number.isNaN(Number(value)) &&
        isValueOutsideRange(Number(value), numericMin, numericMax)

    const rangeErrorMessage = rangeViolation
        ? getRangeErrorMessage(numericMin, numericMax)
        : undefined

    const hasError = error || rangeViolation
    const displayErrorMessage = errorMessage ?? rangeErrorMessage

    return {
        numericMin,
        numericMax,
        stepValue,
        currentNumericValue,
        clampPreventNegative,
        isUpButtonDisabled,
        isDownButtonDisabled,
        rangeViolation,
        rangeErrorMessage,
        hasError,
        displayErrorMessage,
    }
}

export type UnitInputKeyDownHandlerArgs = {
    disabled?: boolean
    clampPreventNegative: boolean
    isUpButtonDisabled: boolean
    isDownButtonDisabled: boolean
    currentNumericValue: number | null
    stepValue: number
    numericMin?: number
    numericMax?: number
    emitNumericChange: (n: number) => void
}

export function handleUnitInputKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    {
        disabled,
        clampPreventNegative,
        isUpButtonDisabled,
        isDownButtonDisabled,
        currentNumericValue,
        stepValue,
        numericMin,
        numericMax,
        emitNumericChange,
    }: UnitInputKeyDownHandlerArgs
): void {
    if (disabled) return

    if (
        clampPreventNegative &&
        (e.key === '-' || e.key === 'Minus' || e.key === 'NumpadSubtract')
    ) {
        e.preventDefault()
        return
    }

    if (e.key === 'ArrowUp' && !isUpButtonDisabled) {
        e.preventDefault()
        emitNumericChange(
            incrementValue(
                currentNumericValue,
                stepValue,
                numericMin,
                numericMax,
                clampPreventNegative
            )
        )
        return
    }

    if (e.key === 'ArrowDown' && !isDownButtonDisabled) {
        e.preventDefault()
        emitNumericChange(
            decrementValue(
                currentNumericValue,
                stepValue,
                numericMin,
                numericMax,
                clampPreventNegative
            )
        )
    }
}
