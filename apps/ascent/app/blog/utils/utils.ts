/**
 * Essential blog utility functions
 * Simplified to include only actively used utilities
 */

import { BLOG_CONSTANTS } from './constants'

/**
 * Sanitizes a slug to ensure it's safe for URL usage
 * @param slug - Raw slug string
 * @returns Sanitized URL-safe slug
 */
export function sanitizeSlug(slug: string): string {
    if (!slug || typeof slug !== 'string') {
        return ''
    }

    return (
        slug
            .trim()
            .toLowerCase()
            // Remove any characters that aren't alphanumeric, hyphens, or underscores
            .replace(/[^a-z0-9\-_]/g, '')
            // Replace multiple consecutive hyphens/underscores with single hyphen
            .replace(/[-_]+/g, '-')
            // Remove leading/trailing hyphens
            .replace(/^-+|-+$/g, '')
            // Limit length to prevent extremely long URLs
            .substring(0, 100)
    )
}

/**
 * Generates a consistent gradient background based on the post slug
 * @param slug - Unique identifier for the blog post
 * @returns CSS gradient string
 */
export const getCoverGradient = (slug: string): string => {
    const COVER_GRADIENTS = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
        'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        'linear-gradient(135deg, #fd7043 0%, #ff8a65 100%)',
        'linear-gradient(135deg, #26c6da 0%, #00838f 100%)',
    ]

    let hash = 0
    for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash)
    }
    return COVER_GRADIENTS[Math.abs(hash) % COVER_GRADIENTS.length]
}

/**
 * Formats a date string to a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(
        BLOG_CONSTANTS.DATE_FORMAT.LOCALE,
        BLOG_CONSTANTS.DATE_FORMAT.OPTIONS
    )
}
