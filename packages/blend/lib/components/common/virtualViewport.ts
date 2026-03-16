export const VIRTUAL_MIN_VIEWPORT = 120
export const VIRTUAL_DEFAULT_VIEWPORT = 340

/**
 * Base viewport height for virtualized menus/lists.
 * Ensures a reasonable minimum height even when maxHeight is small.
 */
export const getBaseVirtualViewportHeight = (maxHeight?: number): number => {
    if (maxHeight == null) return VIRTUAL_DEFAULT_VIEWPORT
    return Math.max(maxHeight, VIRTUAL_MIN_VIEWPORT)
}

/**
 * Adjusted viewport height when some vertical space is reserved
 * (e.g. search header, footer). Always enforces a minimum.
 */
export const getAdjustedVirtualViewportHeight = (
    maxHeight: number | undefined,
    reserved: number
): number => {
    if (maxHeight == null) return VIRTUAL_DEFAULT_VIEWPORT
    return Math.max(maxHeight - reserved, VIRTUAL_MIN_VIEWPORT)
}
