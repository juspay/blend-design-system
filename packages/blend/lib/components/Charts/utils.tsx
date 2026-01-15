const GREEN = '#00C951' // jp-green-500
const BLUE = '#2B7FFF' // jp-primary-500
const RED = '#FB2C36' // jp-red-500
const YELLOW = '#FF8904' // jp-orange-400
const PURPLE = '#AD46FF' // jp-purple-500
const CYAN = '#00D492' // jp-green-400

export const DEFAULT_COLORS = [
    { key: '0', color: GREEN },
    { key: '1', color: BLUE },
    { key: '2', color: RED },
    { key: '3', color: YELLOW },
    { key: '4', color: PURPLE },
    { key: '5', color: CYAN },
]
/**
 * Gets the color value for a given key from the colors array
 * Tries to match by key first, then falls back to index-based lookup
 * @param dataKey - The key to match against color objects
 * @param colors - Array of color objects or strings
 * @param index - Fallback index if key match is not found
 * @returns The color string value
 */
export const getColorByKey = (
    dataKey: string,
    colors: Array<{ key: string; color: string } | string>,
    index: number
): string => {
    // Try to find color by matching key first
    const colorByKey = colors.find(
        (color) =>
            typeof color === 'object' &&
            color !== null &&
            'key' in color &&
            color.key === dataKey
    )

    if (colorByKey && typeof colorByKey !== 'string') {
        return colorByKey.color
    }

    // Fallback to index-based lookup
    const fallbackColor = colors[index]
    if (typeof fallbackColor === 'string') {
        return fallbackColor
    }

    if (
        fallbackColor &&
        typeof fallbackColor === 'object' &&
        'color' in fallbackColor &&
        fallbackColor.color &&
        typeof fallbackColor.color === 'string'
    ) {
        return fallbackColor.color
    }

    // Final fallback to default color from DEFAULT_COLORS
    return DEFAULT_COLORS[0]?.color || GREEN
}
