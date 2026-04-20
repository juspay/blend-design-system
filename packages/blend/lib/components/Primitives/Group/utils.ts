import { GroupPosition, GroupOrientation } from './types'
import { FOUNDATION_THEME } from '../../../tokens'

/**
 * Calculate element position within a group based on index and total count
 *
 * @param index - Current element index (0-based)
 * @param totalCount - Total number of elements in group
 * @param orientation - Group orientation (horizontal or vertical)
 * @returns Position enum value or undefined if single element
 */
export function getGroupPosition(
    index: number,
    totalCount: number,
    orientation: GroupOrientation = GroupOrientation.HORIZONTAL
): GroupPosition | undefined {
    if (totalCount === 1) return undefined

    if (orientation === GroupOrientation.VERTICAL) {
        if (index === 0) return GroupPosition.TOP
        if (index === totalCount - 1) return GroupPosition.BOTTOM
        return GroupPosition.MIDDLE
    }

    // horizontal orientation
    if (index === 0) return GroupPosition.LEFT
    if (index === totalCount - 1) return GroupPosition.RIGHT
    return GroupPosition.CENTER
}

/**
 * Get gap value for group based on stacked mode and orientation
 * Uses foundation tokens if gap is not provided
 *
 * @param stacked - Whether group is in stacked mode (no gap)
 * @param providedGap - User-provided gap value
 * @param orientation - Group orientation enum
 * @returns Gap value as string or number
 */
export function getGroupGap(
    stacked: boolean,
    providedGap?: string | number,
    orientation: GroupOrientation = GroupOrientation.HORIZONTAL
): string | number {
    // Stacked mode has no gap
    if (stacked) return 0

    // Use provided gap if available
    if (providedGap !== undefined) return providedGap

    // Default to foundation token
    // Vertical groups typically use slightly more spacing
    return orientation === GroupOrientation.VERTICAL
        ? String(FOUNDATION_THEME.unit[12])
        : String(FOUNDATION_THEME.unit[10])
}

/**
 * Helper to convert position prop name to match component's expected prop
 * This allows the Group to work with different component APIs
 *
 * @example
 * // For ButtonV2
 * getPositionPropName('buttonGroupPosition') // 'buttonGroupPosition'
 *
 * // For Tag
 * getPositionPropName('splitTagPosition') // 'splitTagPosition'
 *
 * @param propName - Name of the position prop
 * @returns The same prop name (identity function for type safety)
 */
export function getPositionPropName(
    propName: string = 'groupPosition'
): string {
    return propName
}
