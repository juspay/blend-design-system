import type {
    BadgePosition,
    BadgeSize,
    BadgeTokensType,
} from '@juspay/blend-design-system/node'
import { parseDimension } from '../../adapters/cssStringAdapter'

/**
 * Edge insets for the absolutely-positioned badge over its `children`.
 *
 * This is the native equivalent of web's `getPositionStyles`, and the
 * documented divergence: web hangs the badge half its own size past the
 * corner with CSS `transform: translate(±50%, ±50%)`. RN cannot translate
 * by a percentage of the element's own size, so the same overhang is
 * computed up front as a **negative inset** — the badge's rendered
 * half-extent subtracted from the token offset, applied to the two edges
 * of the chosen corner. The visual result (badge center sitting
 * `offset` points inside the corner) matches web.
 */
export type BadgePositionInsets = {
    top?: number
    right?: number
    bottom?: number
    left?: number
}

export type ResolvePositionInsetsOptions = {
    /** `[x, y]` shift from the corner, in points. */
    customOffset?: [number, number]
    /** Pill (count/text) vs dot — picks which token sizes apply. */
    hasContent?: boolean
    /** Position on a circular child's 45° circumference, web parity. */
    isCircular?: boolean
    /**
     * Size of the wrapped child, for `isCircular` — web's `14%` inset is a
     * percentage of the containing block, which native can only compute
     * once the wrapper has laid out.
     */
    parentSize?: { width: number; height: number }
}

/**
 * Web's circular inset: `(100% - 70.71%) / 2`, the offset along each axis
 * that places the badge on the 45° circumference of a circle.
 */
const CIRCULAR_INSET_RATIO = 0.14

export function resolvePositionInsets(
    position: BadgePosition,
    size: BadgeSize,
    tokens: BadgeTokensType,
    {
        customOffset,
        hasContent = false,
        isCircular = false,
        parentSize,
    }: ResolvePositionInsetsOptions = {}
): BadgePositionInsets {
    // Half the badge's rendered extent. A dot is square; a pill's width
    // depends on its text, which is not knowable without measuring, so the
    // pill height stands in as the conservative half-extent on both axes.
    const badgeExtent = hasContent
        ? parseDimension(tokens.pill.height[size] as string | number)
        : parseDimension(tokens.dot.width[size] as string | number)
    const half = (badgeExtent ?? 0) / 2

    // Web's circular branch applies the custom offset with outward signs
    // on every corner (the non-circular branch applies it inward), and
    // bases the inset on 14% of the containing block's size.
    if (isCircular) {
        const x = customOffset?.[0] ?? 0
        const y = customOffset?.[1] ?? 0
        const horizontal =
            (parentSize ? parentSize.width * CIRCULAR_INSET_RATIO : 0) -
            x -
            half
        const vertical =
            (parentSize ? parentSize.height * CIRCULAR_INSET_RATIO : 0) -
            y -
            half
        return applyToCorner(position, vertical, horizontal)
    }

    // Web: a dot defaults to no offset, a pill to the token offset; a
    // custom offset replaces both components.
    const tokenOffset = parseDimension(
        tokens.position.offset[size] as string | number
    )
    const xBase = customOffset
        ? customOffset[0]
        : hasContent
          ? (tokenOffset ?? 0)
          : 0
    const yBase = customOffset
        ? customOffset[1]
        : hasContent
          ? (tokenOffset ?? 0)
          : 0

    return applyToCorner(position, yBase - half, xBase - half)
}

function applyToCorner(
    position: BadgePosition,
    vertical: number,
    horizontal: number
): BadgePositionInsets {
    switch (position) {
        case 'top-right':
            return { top: vertical, right: horizontal }
        case 'top-left':
            return { top: vertical, left: horizontal }
        case 'bottom-right':
            return { bottom: vertical, right: horizontal }
        case 'bottom-left':
            return { bottom: vertical, left: horizontal }
    }
}

/**
 * Format the count to display, handling max overflow. Ported verbatim from
 * web's `badge.utils.ts` — pure, no DOM.
 */
export const formatCount = (count: number, maxCount: number = 99): string => {
    if (count > maxCount) {
        return `${maxCount}+`
    }
    return count.toString()
}

/**
 * Accessible label for the badge. Ported verbatim from web's
 * `getAccessibleLabel`.
 */
export const getBadgeAccessibleLabel = (
    count: number | undefined,
    text: string | undefined,
    maxCount: number,
    showBadge: boolean
): string | undefined => {
    if (!showBadge) return undefined
    if (text) return text
    if (count !== undefined) {
        if (count > maxCount) {
            return `More than ${maxCount}`
        }
        return count.toString()
    }
    return 'Notification'
}
