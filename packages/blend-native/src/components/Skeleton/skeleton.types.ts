import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
    SkeletonShape,
    SkeletonVariant,
} from '@juspay/blend-design-system/node'

/**
 * Props for the native `Skeleton`.
 *
 * Either a placeholder box (`width`/`height`) or a wrapper
 * (`children` size the box and render invisible underneath the surface).
 */
export type SkeletonNativeProps = {
    /** `pulse` (default) breathes; `wave`/`shimmer` sweep a gradient. */
    variant?: SkeletonVariant
    /** Drives the token border radius; `circle` resolves a numeric half. */
    shape?: SkeletonShape
    /** Box width for standalone use. Token strings (`"120px"`) accepted. */
    width?: string | number
    height?: string | number
    /** Explicit radius override (wins over `shape`). */
    borderRadius?: number
    /** Wrap mode: content keeps its layout, renders invisible. */
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
    testID?: string
}
