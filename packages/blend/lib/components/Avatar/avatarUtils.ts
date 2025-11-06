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

// Color palette for A-Z avatar backgrounds
const LETTER_COLORS: Record<string, string> = {
    A: '#FF6B6B', // Red
    B: '#4ECDC4', // Teal
    C: '#45B7D1', // Sky Blue
    D: '#FFA07A', // Light Salmon
    E: '#98D8C8', // Mint
    F: '#F7DC6F', // Yellow
    G: '#BB8FCE', // Purple
    H: '#85C1E2', // Light Blue
    I: '#F8B739', // Orange
    J: '#52B788', // Green
    K: '#E85D75', // Pink
    L: '#6C5CE7', // Indigo
    M: '#00B894', // Emerald
    N: '#FDCB6E', // Amber
    O: '#E17055', // Terra Cotta
    P: '#74B9FF', // Blue
    Q: '#A29BFE', // Lavender
    R: '#FD79A8', // Rose
    S: '#00CEC9', // Cyan
    T: '#FF7675', // Coral
    U: '#55EFC4', // Aqua
    V: '#FDA7DF', // Light Pink
    W: '#6C5B7B', // Plum
    X: '#81C784', // Soft Green
    Y: '#FFB74D', // Peach
    Z: '#9575CD', // Violet
}

/**
 * Get a consistent color for an avatar based on the first letter of the name
 * @param text - The text to extract the first letter from (e.g., name or alt text)
 * @returns A hex color code
 */
export const getColorFromText = (text: string): string => {
    if (!text) return '#94A3B8' // Default gray color

    const firstLetter = text.trim()[0]?.toUpperCase()

    if (!firstLetter || !firstLetter.match(/[A-Z]/)) {
        return '#94A3B8' // Default gray for non-alphabetic characters
    }

    return LETTER_COLORS[firstLetter] || '#94A3B8'
}
