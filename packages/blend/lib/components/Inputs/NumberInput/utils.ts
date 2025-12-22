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
 * Clamps and sanitizes the value on blur
 * Similar to Chakra UI's clampValueOnBlur behavior
 *
 * @param inputValue - The input string value
 * @param allowNegative - Whether negative numbers are allowed
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped and sanitized number value or empty string
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
    if (Object.is(numValue, -0)) {
        return '0'
    }

    // Clamp to min/max
    let clampedValue = numValue
    if (min !== undefined && clampedValue < min) {
        clampedValue = min
    } else if (max !== undefined && clampedValue > max) {
        clampedValue = max
    }

    // If negative not allowed and value is negative, clamp to 0
    if (!allowNegative && clampedValue < 0) {
        clampedValue = 0
    }

    return String(clampedValue)
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
