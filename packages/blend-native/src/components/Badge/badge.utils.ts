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
    const direction = directionFor(position)
    const badgeExtent = hasContent
        ? parseDimension(tokens.pill.height[size] as string | number)
        : parseDimension(tokens.dot.width[size] as string | number)
    const half = (badgeExtent ?? 0) / 2

    // Web's circular branch uses `translate(..., -0.5*W)` — a centered
    // coordinate, not an inset from the edge. With the wrapper's measured
    // size we place the badge's circumference point exactly. Without it the
    // badge falls back to the corner, `-half` outside it (first frame only).
    if (isCircular) {
        if (parentSize) {
            // The offset always moves the badge outward (away from the
            // child's center), which decreases whichever inset it's applied
            // to — independent of which corner. Web parity.
            const horizontal =
                parentSize.width * CIRCULAR_INSET_RATIO -
                Math.abs(customOffset?.[0] ?? 0) -
                half
            const vertical =
                parentSize.height * CIRCULAR_INSET_RATIO -
                Math.abs(customOffset?.[1] ?? 0) -
                half
            return direction.apply(vertical, horizontal)
        }
        return direction.apply(-half, -half)
    }

    // Web: a dot defaults to no offset, a pill to the token offset; a
    // custom offset replaces both components. Then the `translate(±50%)`
    // overhang converts to `-half` on the chosen corner's inset.
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
    return direction.apply(yBase - half, xBase - half)
}

/**
 * Per-corner direction: how the vertical/horizontal values land on the
 * inset keys for the chosen corner.
 */
function directionFor(position: BadgePosition): {
    apply: (vertical: number, horizontal: number) => BadgePositionInsets
} {
    switch (position) {
        case 'top-right':
            return {
                apply: (vertical, horizontal) => ({
                    top: vertical,
                    right: horizontal,
                }),
            }
        case 'top-left':
            return {
                apply: (vertical, horizontal) => ({
                    top: vertical,
                    left: horizontal,
                }),
            }
        case 'bottom-right':
            return {
                apply: (vertical, horizontal) => ({
                    bottom: vertical,
                    right: horizontal,
                }),
            }
        case 'bottom-left':
            return {
                apply: (vertical, horizontal) => ({
                    bottom: vertical,
                    left: horizontal,
                }),
            }
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
