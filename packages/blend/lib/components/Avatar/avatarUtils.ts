export const getInitialsFromText = (text: string): string => {
    if (!text) return ''

    return text
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
}

export const isValidImageUrl = (url: string): Promise<boolean> => {
    if (!url) return Promise.resolve(false)

    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = url
    })
}

export const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result && result[1] && result[2] && result[3]
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null
}

// Color palette for avatars (expanded for better variety)
const AVATAR_COLORS = [
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
    '#55EFC4', // Aqua
    '#FDA7DF', // Light Pink
    '#6C5B7B', // Plum
    '#81C784', // Soft Green
    '#FFB74D', // Peach
    '#9575CD', // Violet
    '#E74C3C', // Crimson
    '#3498DB', // Ocean Blue
    '#2ECC71', // Emerald Green
    '#F39C12', // Carrot Orange
]

/**
 * Simple hash function to convert a string into a number
 * @param str - The string to hash
 * @returns A hash number
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
 * Get a consistent color for an avatar based on the full name/text
 * Uses hash of the entire text to ensure unique colors for different names
 * @param text - The text to generate color from (e.g., name or alt text)
 * @returns A hex color code
 */
export const getColorFromText = (text: string): string => {
    if (!text || !text.trim()) {
        return '#94A3B8' // Default gray color
    }

    // Normalize the text (trim and lowercase for consistency)
    const normalizedText = text.trim().toLowerCase()

    // Hash the full text and map to a color index
    const hash = hashString(normalizedText)
    const colorIndex = hash % AVATAR_COLORS.length

    return AVATAR_COLORS[colorIndex]
}
