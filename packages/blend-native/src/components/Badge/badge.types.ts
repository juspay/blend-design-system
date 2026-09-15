import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
    BadgeColor,
    BadgePosition,
    BadgeSize,
} from '@juspay/blend-design-system/node'

/**
 * Props for the native `Badge` — the port of web's `Badge` (V1 generation).
 *
 * Renders a dot (no count/text) or a pill (count/text), either standalone
 * or — when `children` is supplied — absolutely positioned over the child's
 * corner, like an unread counter on an Avatar.
 *
 * Deliberately omitted rather than accepted-and-ignored:
 *
 * - The DOM `HTMLAttributes` spread web's `BaseBadgeProps` carries — RN
 *   Views have no `onMouseEnter`/`aria-*` passthroughs; `accessibilityLabel`
 *   and `testID` cover the native equivalents.
 *
 * Positioning divergence (documented): web hangs the badge half its size
 * past the corner via CSS `transform: translate(±50%, ±50%)`. RN has no
 * percentage translate against own-size, so native computes the same
 * overhang as **edge insets** — see `resolvePositionInsets`.
 */
export type BadgeBaseProps = {
    /** Count to display. Overflows `maxCount` as `"99+"`. */
    count?: number
    /** Cap before the count renders as `"{maxCount}+"`. Defaults to 99. */
    maxCount?: number
    size?: BadgeSize
    color?: BadgeColor
    /** Overrides the count as the pill's content. */
    text?: string
    /** Force-hide the badge. */
    showBadge?: boolean
    /** Render even when `count` is 0. */
    showZero?: boolean
}

export type BadgeNativeProps = BadgeBaseProps & {
    /** Provide to hang the badge off the child's corner instead. */
    children?: React.ReactNode
    /** Corner to hang the badge off. Only meaningful with `children`. */
    position?: BadgePosition
    /** Extra `[x, y]` shift from the corner, in points. */
    offset?: [number, number]
    /** Treat the child as circular: badge sits on the 45° circumference. */
    isCircular?: boolean
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
