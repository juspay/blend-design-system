import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import SkeletonAvatar from './SkeletonAvatar'
import SkeletonButton from './SkeletonButton'
import SkeletonCard from './SkeletonCard'

import type { SkeletonProps } from './types'

/**
 * Enhanced Skeleton with compound component pattern
 *
 * Usage:
 * <Skeleton loading={true}>
 *   <Skeleton.Avatar size="md" />
 *   <Skeleton.Text lines={2} />
 *   <Skeleton.Button />
 * </Skeleton>
 *
 * Or traditional:
 * <Skeleton.Text loading={isLoading} lines={3} />
 */
const SkeletonCompound = Object.assign(
    forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => (
        <Skeleton {...props} ref={ref} />
    )),
    {
        /**
         * Avatar skeleton with circular or square shapes and multiple sizes
         */
        Avatar: SkeletonAvatar,

        /**
         * Button skeleton with perfect token mirroring and dynamic sizing
         */
        Button: SkeletonButton,

        /**
         * Card skeleton with default layout or custom children
         */
        Card: SkeletonCard,

        /**
         * Base skeleton component for custom shapes and layouts
         */
        Base: Skeleton,

        // Convenience aliases
        Circle: forwardRef<HTMLDivElement, Omit<SkeletonProps, 'shape'>>(
            (props, ref) => <Skeleton {...props} shape="circle" ref={ref} />
        ),

        Rectangle: forwardRef<HTMLDivElement, Omit<SkeletonProps, 'shape'>>(
            (props, ref) => <Skeleton {...props} shape="rectangle" ref={ref} />
        ),

        Rounded: forwardRef<HTMLDivElement, Omit<SkeletonProps, 'shape'>>(
            (props, ref) => <Skeleton {...props} shape="rounded" ref={ref} />
        ),
    }
)

// Display names for better debugging
SkeletonCompound.displayName = 'Skeleton'
SkeletonCompound.Avatar.displayName = 'Skeleton.Avatar'
SkeletonCompound.Button.displayName = 'Skeleton.Button'
SkeletonCompound.Card.displayName = 'Skeleton.Card'
SkeletonCompound.Base.displayName = 'Skeleton.Base'
SkeletonCompound.Circle.displayName = 'Skeleton.Circle'
SkeletonCompound.Rectangle.displayName = 'Skeleton.Rectangle'
SkeletonCompound.Rounded.displayName = 'Skeleton.Rounded'

export default SkeletonCompound
