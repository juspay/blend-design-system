import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type {
    CardV2Orientation,
    CardV2Padding,
    CardV2Variant,
    SkeletonVariant,
} from '@juspay/blend-design-system/node'

/**
 * Props for the native `Card` — the port of web's `CardV2`, as a props API
 * with ReactNode slots (locked scope decision; the compound sub-components
 * can layer on later without breaking).
 *
 * Divergences from web, by design:
 *
 * - `media` / `leadingSlot` / `trailingSlot` / `footer` / `actions` take
 *   ReactNode — the consumer composes Buttons rather than passing
 *   `ButtonV2Props[]`.
 * - `interactive` is replaced by **`onPress`** — providing it renders a
 *   `Pressable` card (web's core CardV2 has no onClick prop; its handler
 *   arrives via the HTMLAttributes spread with no keyboard support).
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 *
 * - `scrollable` — needs a ScrollView policy; wrap the card in one.
 * - hover/focus chrome (`state.hover`, `state.focus.outline*`) — no hover
 *   or focus ring on touch.
 * - `actionPlacement` — actions render after the body; put them in
 *   `footer` for footer placement.
 */
export type CardNativeProps = {
    variant?: CardV2Variant
    orientation?: CardV2Orientation
    /** Ghost cards default to `none`, web parity. */
    padding?: CardV2Padding
    eyebrow?: string
    title?: string
    /** Cap the title at one line. */
    truncateTitle?: boolean
    subtitle?: string
    description?: string
    media?: React.ReactNode
    leadingSlot?: React.ReactNode
    trailingSlot?: React.ReactNode
    actions?: React.ReactNode
    footer?: React.ReactNode
    centered?: boolean
    /** Renders the card as a Pressable with a button role. */
    onPress?: (event: GestureResponderEvent) => void
    /** Selected chrome + `accessibilityState.selected` (needs `onPress`). */
    selected?: boolean
    skeleton?: { show: boolean; variant?: SkeletonVariant }
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    minHeight?: string | number
    children?: React.ReactNode
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
