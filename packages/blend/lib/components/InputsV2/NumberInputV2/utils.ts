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
