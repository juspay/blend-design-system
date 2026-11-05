import type { StyleProp, ViewStyle } from 'react-native'
import type {
    AvatarV2Shape,
    AvatarV2Size,
    SkeletonVariant,
} from '@juspay/blend-design-system/node'

/**
 * One avatar in the group. Web's `AvatarData` also accepts a ReactNode
 * `fallback`; native takes `fallbackText` like the native `Avatar`.
 */
export type AvatarGroupItem = {
    id: string | number
    src?: string
    alt?: string
    fallbackText?: string
}

export type AvatarGroupNativeProps = {
    avatars: AvatarGroupItem[]
    /** Avatars shown before the rest collapse into a "+N" counter. */
    maxCount?: number
    size?: AvatarV2Size
    shape?: AvatarV2Shape
    /** Controlled selection. The group re-syncs whenever this changes. */
    selectedAvatarIds?: (string | number)[]
    onSelectionChange?: (selectedIds: (string | number)[]) => void
    skeleton?: { show: boolean; variant?: SkeletonVariant }
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
