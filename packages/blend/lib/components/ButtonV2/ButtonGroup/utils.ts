import type { ButtonGroupPosition } from './types'
import { FOUNDATION_THEME } from '../../../tokens'

/**
 * Calculate button group position based on index and total count
 */
export function getButtonGroupPosition(
    index: number,
    totalCount: number
): ButtonGroupPosition | undefined {
    if (totalCount === 1) return undefined
    if (index === 0) return 'left'
    if (index === totalCount - 1) return 'right'
    return 'center'
}

/**
 * Get gap value for button group
 * Uses foundation tokens if gap is not provided
 */
export function getButtonGroupGap(
    stacked: boolean,
    providedGap?: string | number
): string | number {
    if (stacked) return 0
    if (providedGap !== undefined) return providedGap
    return String(FOUNDATION_THEME.unit[10])
}
