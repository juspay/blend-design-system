import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type {
    TagV2Color,
    TagV2Size,
    TagV2SubType,
    TagV2Type,
} from '@juspay/blend-design-system/node'
import type { GroupPosition } from '../shared/group'

/**
 * Props for the native `Tag`.
 *
 * Mirrors web `TagV2Props` (`packages/blend/lib/components/TagV2/
 * TagV2.types.ts`) with DOM-specific pieces replaced by RN equivalents:
 *
 * - `onClick` → `onPress`, carrying a `GestureResponderEvent`.
 * - `aria-pressed` → `pressed`, surfaced as `accessibilityState.selected`.
 * - `HTMLAttributes` passthrough → RN `View`/`Pressable` props via `...rest`.
 *
 * `skeleton` is deliberately **absent** rather than accepted-and-ignored.
 * Web's `TagV2` renders a `TagSkeleton`, which has no native counterpart yet;
 * omitting the prop from the type keeps it a compile error instead of a
 * silent no-op. Same decision as `Button`.
 */

export type TagSlot = {
    slot: React.ReactNode
    /** Overrides the size-derived slot max height from tokens. */
    maxHeight?: string | number
}

export type TagNativeProps = {
    text: string
    size?: TagV2Size
    type?: TagV2Type
    subType?: TagV2SubType
    color?: TagV2Color
    leftSlot?: TagSlot
    rightSlot?: TagSlot
    /**
     * Position within a tag group. Collapses the border radius on the joined
     * edges, matching web's `getTagBorderRadius`.
     */
    tagGroupPosition?: GroupPosition
    /**
     * Providing this makes the tag interactive: it renders as a pressable
     * with `accessibilityRole="button"` instead of a static view, mirroring
     * web's `TagElement = onClick ? PrimitiveButton : Block`.
     */
    onPress?: (event: GestureResponderEvent) => void
    /**
     * Toggle state for interactive tags. Maps to web's `aria-pressed` and to
     * RN's `accessibilityState.selected`, and is folded into the accessible
     * name exactly as web's `getAccessibleName` does.
     */
    pressed?: boolean | 'mixed'
    /** Overrides the accessible name derived from `text`. */
    accessibilityLabel?: string
    testID?: string
    /** Escape hatch for RN styles the token props do not cover. */
    style?: StyleProp<ViewStyle>
}
