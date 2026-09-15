import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
    AvatarV2Shape,
    AvatarV2Size,
    AvatarV2Status,
    AvatarV2StatusPosition,
    SkeletonVariant,
} from '@juspay/blend-design-system/node'

/**
 * Props for the native `Avatar` — the port of web's `AvatarV2`.
 *
 * DOM pieces swapped for RN ones: the `<img>` becomes RN `Image` with its
 * error event driving the initials fallback, and the fallback color comes
 * from the same hash palette (`getColorFromText`, imported from `/node` so
 * both platforms hash identically).
 *
 * Deliberately omitted rather than accepted-and-ignored (the `skeleton`
 * precedent — a compile error, not a no-op):
 *
 * - Interactive click/keyboard behaviour — web's core AvatarV2 has no
 *   `onClick` prop either (it arrives via the HTMLAttributes spread);
 *   wrap in a `Pressable` when needed.
 * - `onImageLoad` — RN's load event carries no web-compatible payload;
 *   add when a consumer needs it.
 */
export type AvatarStatus = {
    type: AvatarV2Status
    position?: AvatarV2StatusPosition
}

export type AvatarNativeProps = {
    /** Image URI. On load failure the initials fallback renders. */
    src?: string
    /** Accessible name, and the source of the fallback initials. */
    alt?: string
    /** Overrides the initials derived from `alt` (first two characters). */
    fallbackText?: string
    size?: AvatarV2Size
    shape?: AvatarV2Shape
    status?: AvatarStatus
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    skeleton?: { show: boolean; variant?: SkeletonVariant }
    /** Overrides the hash-palette fallback background. */
    backgroundColor?: string
    /** Override the size tokens (web's AvatarV2Dimensions). */
    width?: string | number
    height?: string | number
    /** Called when the image fails and the fallback takes over. */
    onImageError?: () => void
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
