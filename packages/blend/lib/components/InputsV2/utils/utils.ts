/**
 * Sanitizes a number input string to ensure it's a valid number format
 * Similar to Chakra UI's number input sanitization behavior
 *
 * @param inputValue - The raw input string value
 * @param allowNegative - Whether negative numbers are allowed
 * @returns Sanitized string value
 */
export const sanitizeNumberInput = (
    inputValue: string,
    allowNegative: boolean = true
): string => {
    // Allow empty string for intermediate editing states
    if (inputValue === '') {
        return ''
    }

    // Allow lone minus for intermediate typing (e.g., user is typing "-5")
    if (inputValue === '-' && allowNegative) {
        return '-'
    }

    // Remove all characters except: digits, decimal point, and minus sign
    let sanitized = inputValue.replace(/[^\d.-]/g, '')

    // Handle negative sign restrictions
    if (!allowNegative) {
        // Remove all minus signs
        sanitized = sanitized.replace(/-/g, '')
    } else {
        // Only allow minus at the start
        const firstMinusIndex = sanitized.indexOf('-')
        if (firstMinusIndex !== -1) {
            // Keep only the first minus and only if it's at position 0
            if (firstMinusIndex === 0) {
                // Remove all other minus signs
                sanitized = '-' + sanitized.substring(1).replace(/-/g, '')
            } else {
                // Minus not at start - remove all minus signs
                sanitized = sanitized.replace(/-/g, '')
            }
        }
    }

    // Handle multiple decimal points - keep only the first one
    const firstDotIndex = sanitized.indexOf('.')
    if (firstDotIndex !== -1) {
        const beforeDot = sanitized.substring(0, firstDotIndex + 1)
        const afterDot = sanitized
            .substring(firstDotIndex + 1)
            .replace(/\./g, '')
        sanitized = beforeDot + afterDot
    }

    // Prevent -0, -0., -0.0, -0.00, etc.
    if (sanitized.startsWith('-0')) {
        const afterZero = sanitized.substring(2)
        // Check if it's exactly -0 or -0. or -0.000...
        if (afterZero === '' || afterZero === '.' || /^\.0+$/.test(afterZero)) {
            sanitized = '0'
        }
    }

    return sanitized
}

/**
 * Clamps a numeric value to the nearest valid boundary (min or max)
 * If value is less than min, returns min
 * If value is greater than max, returns max
 * Otherwise returns the value unchanged
 *
 * @param value - The numeric value to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped numeric value
 */
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

/**
 * Increments a value by step, respecting min/max constraints
 *
 * @param currentValue - Current numeric value (can be null)
 * @param step - Step size
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param preventNegative - Whether to prevent negative values
 * @returns New incremented value, clamped to boundaries
 */
export const incrementValue = (
    currentValue: number | null,
    step: number = 1,
    min?: number,
    max?: number,
    preventNegative: boolean = false
): number => {
    const baseValue = currentValue ?? min ?? 0
    const newValue = baseValue + step
    let clampedValue = clampToBoundary(newValue, min, max)

    if (preventNegative && clampedValue < 0) {
        clampedValue = 0
    }

    return clampedValue
}

/**
 * Decrements a value by step, respecting min/max constraints
 *
 * @param currentValue - Current numeric value (can be null)
 * @param step - Step size
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param preventNegative - Whether to prevent negative values
 * @returns New decremented value, clamped to boundaries
 */
export const decrementValue = (
    currentValue: number | null,
    step: number = 1,
    min?: number,
    max?: number,
    preventNegative: boolean = false
): number => {
    const baseValue = currentValue ?? min ?? 0
    const newValue = baseValue - step
    let clampedValue = clampToBoundary(newValue, min, max)

    if (preventNegative && clampedValue < 0) {
        clampedValue = 0
    }

    return clampedValue
}

/**
 * Clamps and sanitizes the value on blur
 * Similar to Chakra UI's clampValueOnBlur behavior
 *
 * @param inputValue - The input string value
 * @param allowNegative - Whether negative numbers are allowed
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped and sanitized value string
 */
export const clampValueOnBlur = (
    inputValue: string,
    allowNegative: boolean = true,
    min?: number,
    max?: number
): string => {
    if (inputValue === '' || inputValue === '-') {
        return ''
    }

    // Sanitize first
    const sanitized = sanitizeNumberInput(inputValue, allowNegative)

    // If still empty or just minus, return empty
    if (sanitized === '' || sanitized === '-') {
        return ''
    }

    const numValue = Number(sanitized)

    // If not a valid number, return empty
    if (isNaN(numValue)) {
        return ''
    }

    // Prevent -0
    const normalizedValue = Object.is(numValue, -0) ? 0 : numValue

    let clampedValue = normalizedValue
    if (!allowNegative && clampedValue < 0) {
        clampedValue = 0
    }

    clampedValue = clampToBoundary(clampedValue, min, max)

    return String(clampedValue)
}

/**
 * Checks if a numeric value is outside the valid range
 *
 * @param value - The numeric value to check
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns True if value is outside the valid range
 */
export const isValueOutsideRange = (
    value: number,
    min?: number,
    max?: number
): boolean => {
    if (min !== undefined && value < min) return true
    if (max !== undefined && value > max) return true
    return false
}

/**
 * Checks if incrementing would exceed max
 *
 * @param currentValue - Current numeric value (can be null)
 * @param step - Step size
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns True if incrementing would exceed max
 */
export const wouldExceedMax = (
    currentValue: number | null,
    step: number,
    min?: number,
    max?: number
): boolean => {
    if (max === undefined) return false
    const baseValue = currentValue ?? min ?? 0
    return baseValue + step > max
}

/**
 * Checks if decrementing would go below min
 *
 * @param currentValue - Current numeric value (can be null)
 * @param step - Step size
 * @param min - Minimum allowed value
 * @param preventNegative - Whether to prevent negative values
 * @returns True if decrementing would go below min
 */
export const wouldGoBelowMin = (
    currentValue: number | null,
    step: number,
    min?: number,
    preventNegative: boolean = false
): boolean => {
    if (currentValue === null) {
        if (preventNegative) return true
        if (min !== undefined) {
            const startValue = min ?? 0
            return startValue - step < min
        }
        return false
    }

    if (min !== undefined) {
        return currentValue <= min || currentValue - step < min
    }

    if (preventNegative) {
        return currentValue <= 0 || currentValue - step < 0
    }

    return false
}

/**
 * Generates an error message for a value outside the valid range
 *
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Error message string
 */
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

/**
 * Validates if a number value is within min/max bounds
 *
 * @param value - The number value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns True if value is within bounds, false otherwise
 */
export const isValueInRange = (
    value: number | null | undefined,
    min?: number,
    max?: number
): boolean => {
    if (value === null || value === undefined) {
        return true
    }

    if (min !== undefined && value < min) {
        return false
    }

    if (max !== undefined && value > max) {
        return false
    }

    return true
}

/**
 * Validates if a string represents a valid number
 *
 * @param value - The string value to validate
 * @returns True if valid number, false otherwise
 */
export const isValidNumber = (value: string): boolean => {
    if (value === '' || value === '-') {
        return false
    }
    const num = Number(value)
    return !isNaN(num) && isFinite(num)
}
