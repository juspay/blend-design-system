import type { ViewStyle } from 'react-native'

/**
 * Shared styling for grouped controls (button groups, tag groups).
 *
 * Members join edge to edge, so each keeps its radius only on the outward
 * corners, and interior members drop the borders they would otherwise double
 * up with their neighbour. Web implements the radius half identically in
 * `ButtonV2/utils.ts` and `TagV2/utils.ts`, and the border half in
 * `ButtonV2/utils.ts` (`getButtonBorderStyles`).
 *
 * Mirrors `components/shared/` in the web package, which holds cross-component
 * internals rather than components.
 */

/** Where a control sits within its group. `undefined` means ungrouped. */
export type GroupPosition = 'center' | 'left' | 'right'

/** Every corner squared — the interior members of a group. */
const ALL_SQUARE = '0px 0px 0px 0px'

/**
 * Collapse a control's border radius for its position in a group.
 *
 * Returns a CSS string — either the untouched radius or a four-corner
 * shorthand in CSS order (top-left, top-right, bottom-right, bottom-left).
 * `parseBorderRadius` handles both forms.
 *
 * ```
 * getGroupedBorderRadius('10px', undefined) -> '10px'
 * getGroupedBorderRadius('10px', 'left')    -> '10px 0 0 10px'
 * getGroupedBorderRadius('10px', 'right')   -> '0 10px 10px 0'
 * getGroupedBorderRadius('10px', 'center')  -> '0px 0px 0px 0px'
 * ```
 */
export function getGroupedBorderRadius(
    radius: string | number,
    position: GroupPosition | undefined
): string {
    const value = String(radius)

    if (position === undefined) return value
    if (position === 'left') return `${value} 0 0 ${value}`
    if (position === 'right') return `0 ${value} ${value} 0`

    return ALL_SQUARE
}

/**
 * Border widths to overlay for a control's position in a group.
 *
 * Interior (`center`) members drop their left and right borders so a shared
 * edge is one line wide rather than two. Web does this in
 * `getButtonBorderStyles`, which sets `borderLeft`/`borderRight` to `'none'`
 * for the centre position and leaves the end caps fully bordered.
 *
 * Returned as a `ViewStyle` fragment to spread *after* the resolved surface,
 * so `borderWidth: 1` still applies to the remaining sides.
 *
 * ```
 * getGroupedBorderWidths(undefined) -> {}
 * getGroupedBorderWidths('left')    -> {}
 * getGroupedBorderWidths('right')   -> {}
 * getGroupedBorderWidths('center')  -> { borderLeftWidth: 0, borderRightWidth: 0 }
 * ```
 */
export function getGroupedBorderWidths(
    position: GroupPosition | undefined
): Pick<ViewStyle, 'borderLeftWidth' | 'borderRightWidth'> {
    if (position !== 'center') return {}
    return { borderLeftWidth: 0, borderRightWidth: 0 }
}
