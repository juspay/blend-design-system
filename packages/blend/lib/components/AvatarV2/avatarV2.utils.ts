import type { ReactNode } from 'react'
import { isValidElement } from 'react'
import {
    AvatarV2Status,
    AvatarV2StatusPosition,
    AvatarV2Shape,
    AvatarV2Size,
} from './avatarV2.types'

export const DEFAULT_AVATAR_ALT = 'Avatar'

const AVATAR_COLOR_PALETTE: readonly string[] = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Sky Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE', // Purple
    '#85C1E2', // Light Blue
    '#F8B739', // Orange
    '#52B788', // Green
    '#E85D75', // Pink
    '#6C5CE7', // Indigo
    '#00B894', // Emerald
    '#FDCB6E', // Amber
    '#E17055', // Terra Cotta
    '#74B9FF', // Blue
    '#A29BFE', // Lavender
    '#FD79A8', // Rose
    '#00CEC9', // Cyan
    '#FF7675', // Coral
] as const

/**
 * Default fallback color when no text is provided
 */
export const DEFAULT_FALLBACK_COLOR = '#94A3B8'

// ============================================================================
// TEXT UTILITIES
// ============================================================================

/**
 * Extract initials from text
 * Returns up to 2 uppercase letters from the beginning of words
 *
 * @example
 * getInitialsFromText('John Doe') // 'JD'
 * getInitialsFromText('Alice') // 'A'
 * getInitialsFromText('john doe') // 'JD'
 *
 * @param text - Input text to extract initials from
 * @returns Uppercase initials (max 2 characters)
 */
export const getInitialsFromText = (text: string): string => {
    if (!text || text.trim() === '') {
        return ''
    }

    return text
        .trim()
        .split(/\s+/) // Split by whitespace
        .map((word) => word.charAt(0).toUpperCase()) // Get first char of each word
        .slice(0, 2) // Take first 2 initials
        .join('')
}

/**
 * Sanitize text for accessibility label generation
 * Removes extra whitespace and normalizes format
 *
 * @param text - Text to sanitize
 * @returns Sanitized text
 */
export const sanitizeTextForLabel = (text: string): string => {
    if (!text) {
        return ''
    }

    return text.trim().replace(/\s+/g, ' ')
}

// ============================================================================
// COLOR UTILITIES
// ============================================================================

/**
 * Hash function for deterministic color selection
 * Uses DJB2 algorithm for consistent hashing
 *
 * @param str - String to hash
 * @returns Numeric hash value
 */
const hashString = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
}

/**
 * Get a consistent color for an avatar based on text
 * Uses hashing to ensure the same text always produces the same color
 *
 * @example
 * getColorFromText('John Doe') // Returns a consistent color
 * getColorFromText('John Doe') // Same color as above
 * getColorFromText('Jane Smith') // Different color
 *
 * @param text - Text to generate color from (e.g., name or alt text)
 * @returns Hex color code from the palette
 */
export const getColorFromText = (text: string): string => {
    if (!text || text.trim() === '') {
        return DEFAULT_FALLBACK_COLOR
    }

    const normalizedText = text.trim().toLowerCase()
    const hash = hashString(normalizedText)
    const colorIndex = hash % AVATAR_COLOR_PALETTE.length

    return AVATAR_COLOR_PALETTE[colorIndex]
}

/**
 * Calculate luminance of a hex color
 * Used for determining appropriate text color (black or white)
 *
 * @param hex - Hex color code
 * @returns Luminance value (0-1)
 */
export const calculateLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex)
    if (!rgb) return 0

    const { r, g, b } = rgb

    // Convert RGB to linear RGB
    const rLinear = r / 255
    const gLinear = g / 255
    const bLinear = b / 255

    const rLum =
        rLinear <= 0.03928
            ? rLinear / 12.92
            : Math.pow((rLinear + 0.055) / 1.055, 2.4)
    const gLum =
        gLinear <= 0.03928
            ? gLinear / 12.92
            : Math.pow((gLinear + 0.055) / 1.055, 2.4)
    const bLum =
        bLinear <= 0.03928
            ? bLinear / 12.92
            : Math.pow((bLinear + 0.055) / 1.055, 2.4)

    return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum
}

/**
 * Determine appropriate text color (black or white) based on background
 *
 * @param backgroundColor - Background hex color
 * @returns 'black' or 'white' based on luminance threshold
 */
export const getAppropriateTextColor = (
    backgroundColor: string
): 'black' | 'white' => {
    const luminance = calculateLuminance(backgroundColor)
    return luminance > 0.5 ? 'black' : 'white'
}

/**
 * Convert hex color to RGB object
 *
 * @param hex - Hex color string (with or without #)
 * @returns RGB object or null if invalid
 */
export const hexToRgb = (
    hex: string
): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result && result[1] && result[2] && result[3]
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null
}

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

/**
 * Asynchronously validate if an image URL is loadable
 *
 * @param url - Image URL to validate
 * @returns Promise resolving to boolean indicating validity
 */
export const isValidImageUrl = (url: string): Promise<boolean> => {
    if (!url || url.trim() === '') {
        return Promise.resolve(false)
    }

    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = url
    })
}

/**
 * Generate image loading error
 *
 * @param src - Source URL that failed to load
 * @returns Error object
 */
export const createImageError = (src: string): Error => {
    return new Error(`Failed to load image: ${src}`)
}

// ============================================================================
// ACCESSIBILITY UTILITIES
// ============================================================================

/**
 * Generate accessible label for avatar
 * Combines name/status information for screen readers
 *
 * @example
 * getAccessibleLabel('John Doe', AvatarV2Status.ONLINE) // 'John Doe, online'
 * getAccessibleLabel('Jane', AvatarV2Status.OFFLINE) // 'Jane, offline'
 *
 * @param alt - Alt text or fallback text
 * @param status - Avatar status
 * @returns Formatted accessible label
 */
export const getAccessibleLabel = (alt: string, status: string): string => {
    const sanitizedAlt = sanitizeTextForLabel(alt) || DEFAULT_AVATAR_ALT

    if (!status || status === AvatarV2Status.NONE) {
        return sanitizedAlt
    }

    const statusText = status
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase()

    return `${sanitizedAlt}, ${statusText}`
}

/**
 * Generate aria-live region value based on status
 * Returns polite if status changes, undefined otherwise
 *
 * @param status - Avatar status
 * @returns ARIA live value or undefined
 */
export const getAriaLiveValue = (status: string): 'polite' | undefined => {
    if (status && status !== AvatarV2Status.NONE) {
        return 'polite'
    }
    return undefined
}

// ============================================================================
// STATUS INDICATOR UTILITIES
// ============================================================================

/**
 * Status indicator position lookup table
 * Matches the original Avatar component's precise positioning
 * Based on size, shape, and responsive breakpoint (sm/lg)
 */
const INDICATOR_POSITIONS = {
    sm: {
        [AvatarV2Shape.CIRCLE]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.MD]: { top: '-3px', right: '-4px', bottom: '0px' },
            [AvatarV2Size.LG]: { top: '0.2px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XL]: { top: '1.167px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XXL]: { top: '2px', right: '-2px', bottom: '0px' },
        },
        [AvatarV2Shape.ROUNDED]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '-1px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-3px', bottom: '-1px' },
            [AvatarV2Size.MD]: {
                top: '-3.667px',
                right: '-5px',
                bottom: '-3px',
            },
            [AvatarV2Size.LG]: {
                top: '-3.111px',
                right: '-8.222px',
                bottom: '-3px',
            },
            [AvatarV2Size.XL]: {
                top: '-3.111px',
                right: '-10.222px',
                bottom: '-4px',
            },
            [AvatarV2Size.XXL]: { top: '-3px', right: '-12px', bottom: '-4px' },
        },
        [AvatarV2Shape.SQUARE]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.MD]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.LG]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XL]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XXL]: { top: '-4px', right: '-4px', bottom: '0px' },
        },
    },
    lg: {
        [AvatarV2Shape.CIRCLE]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.MD]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.LG]: { top: '0px', right: '2px', bottom: '0px' },
            [AvatarV2Size.XL]: { top: '8px', right: '3px', bottom: '0px' },
            [AvatarV2Size.XXL]: { top: '10px', right: '4px', bottom: '0px' },
        },
        [AvatarV2Shape.ROUNDED]: {
            [AvatarV2Size.XS]: { top: '-3px', right: '-3px', bottom: '-3px' },
            [AvatarV2Size.SM]: { top: '-3px', right: '-3px', bottom: '-3px' },
            [AvatarV2Size.MD]: { top: '-3px', right: '-3px', bottom: '-3px' },
            [AvatarV2Size.LG]: { top: '-5px', right: '-5px', bottom: '-5px' },
            [AvatarV2Size.XL]: { top: '-8px', right: '-8px', bottom: '-8px' },
            [AvatarV2Size.XXL]: {
                top: '-10px',
                right: '-10px',
                bottom: '-10px',
            },
        },
        [AvatarV2Shape.SQUARE]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.MD]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.LG]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XL]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XXL]: { top: '-4px', right: '-4px', bottom: '0px' },
        },
    },
}

/**
 * Get status indicator position styles
 * Returns position values based on avatar size, shape, indicator position, and breakpoint
 * Matches the original Avatar component's precise positioning
 *
 * @param position - Indicator position relative to avatar
 * @param size - Avatar size
 * @param shape - Avatar shape
 * @param breakpoint - Current breakpoint (sm or lg)
 * @returns Position object with top/right/bottom/left values
 */
export const getStatusPositionStyles = (
    position: AvatarV2StatusPosition,
    size: AvatarV2Size,
    shape: AvatarV2Shape,
    breakpoint: 'sm' | 'lg' = 'lg'
): { top?: string; right?: string; bottom?: string; left?: string } => {
    const basePosition = INDICATOR_POSITIONS[breakpoint]?.[shape]?.[size] || {
        top: '0',
        right: '0',
        bottom: '0',
    }

    switch (position) {
        case AvatarV2StatusPosition.TOP_RIGHT:
            return { top: basePosition.top, right: basePosition.right }
        case AvatarV2StatusPosition.TOP_LEFT:
            return { top: basePosition.top, left: basePosition.right }
        case AvatarV2StatusPosition.BOTTOM_RIGHT:
            return { bottom: basePosition.bottom, right: basePosition.right }
        case AvatarV2StatusPosition.BOTTOM_LEFT:
            return { bottom: basePosition.bottom, left: basePosition.right }
        default:
            return { top: basePosition.top, right: basePosition.right }
    }
}

// ============================================================================
// FALLBACK UTILITIES
// ============================================================================

/**
 * Render fallback content
 * Determines whether to show initials or custom fallback
 *
 * @param fallback - Custom fallback or string for initials
 * @param alt - Alt text for automatic initials
 * @returns ReactNode to render as fallback
 */
export const renderFallbackContent = (
    fallback: React.ReactNode,
    alt: string
): ReactNode => {
    if (fallback !== undefined) {
        // If fallback is a string, limit to 2 characters
        if (typeof fallback === 'string') {
            return fallback.substring(0, 2).toUpperCase()
        }
        // Otherwise return as-is (icon, component, etc.)
        return fallback
    }

    // Generate initials from alt text
    return getInitialsFromText(alt)
}

/**
 * Determine if custom fallback is an icon (React element)
 *
 * @param fallback - Fallback content
 * @returns True if fallback is a React element
 */
export const isIconFallback = (fallback: React.ReactNode): boolean => {
    return isValidElement(fallback)
}

// ============================================================================
// KEYBOARD NAVIGATION UTILITIES
// ============================================================================

/**
 * Create keyboard handler for interactive avatars
 * Handles Enter and Space keys to trigger onClick
 * Matches the original Avatar component's keyboard handling
 *
 * @param onClick - Click handler callback
 * @returns Keyboard event handler
 */
export const createKeyboardHandler = (
    onClick: ((event: React.MouseEvent<HTMLDivElement>) => void) | undefined
) => {
    if (!onClick) {
        return undefined
    }

    return (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            // Create a synthetic mouse event for onClick handler
            const syntheticEvent = {
                ...e,
                currentTarget: e.currentTarget,
                target: e.target,
                button: 0,
                buttons: 0,
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                screenX: 0,
                screenY: 0,
                relatedTarget: null,
                movementX: 0,
                movementY: 0,
                nativeEvent: e.nativeEvent,
                bubbles: true,
                cancelable: true,
                defaultPrevented: false,
                eventPhase: 0,
                isTrusted: false,
                timeStamp: Date.now(),
                type: 'click',
            } as unknown as React.MouseEvent<HTMLDivElement>
            onClick(syntheticEvent)
        }
    }
}

/**
 * Determine if avatar is interactive
 *
 * @param onClick - Click handler
 * @returns True if avatar has click handler
 */
export const isInteractive = (
    onClick: ((event: React.MouseEvent<HTMLDivElement>) => void) | undefined
): boolean => {
    return onClick !== undefined
}
