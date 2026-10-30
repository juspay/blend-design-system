import type { StyleProp, ViewStyle } from 'react-native'
import type { TagV2Size, TagV2SubType } from '@juspay/blend-design-system/node'
import type { TagNativeProps } from '../Tag/tag.types'

/** One half of the tag. `size` is shared, and the group position is set for you. */
export type SplitTagSide = Omit<
    TagNativeProps,
    'size' | 'subType' | 'tagGroupPosition'
>

export type SplitTagNativeProps = {
    primaryTag: SplitTagSide
    secondaryTag?: SplitTagSide
    size?: TagV2Size
    /** Corner style for both halves — web's `shape`. */
    subType?: TagV2SubType
    /** Overrides the label derived from the two tags' text. */
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
