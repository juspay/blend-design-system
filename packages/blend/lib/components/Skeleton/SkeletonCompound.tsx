import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import SkeletonAvatar from './SkeletonAvatar'
import SkeletonCard from './SkeletonCard'

import type { SkeletonProps } from './types'

const SkeletonRoot = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => (
    <Skeleton {...props} ref={ref} />
))

// Convenience aliases (no flat export — they exist only as compound statics)
const SkeletonCircle = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'shape'>>(
    (props, ref) => <Skeleton {...props} shape="circle" ref={ref} />
)

const SkeletonRectangle = forwardRef<
    HTMLDivElement,
    Omit<SkeletonProps, 'shape'>
>((props, ref) => <Skeleton {...props} shape="rectangle" ref={ref} />)

const SkeletonRounded = forwardRef<
    HTMLDivElement,
    Omit<SkeletonProps, 'shape'>
>((props, ref) => <Skeleton {...props} shape="rounded" ref={ref} />)

/**
 * Enhanced Skeleton with compound component pattern
 *
 * Usage:
 * <Skeleton loading={true}>
 *   <Skeleton.Avatar size="md" />
 *   <Skeleton.Text lines={2} />
 * </Skeleton>
 *
 * Or traditional:
 * <Skeleton.Text loading={isLoading} lines={3} />
 */
// Statics that reuse a flat export are typed as `typeof` that export so the
// emitted declarations state the value identity instead of re-declaring props.
const SkeletonCompound: typeof SkeletonRoot & {
    /**
     * Avatar skeleton with circular or square shapes and multiple sizes
     */
    Avatar: typeof SkeletonAvatar

    /**
     * Card skeleton with default layout or custom children
     */
    Card: typeof SkeletonCard

    /**
     * Base skeleton component for custom shapes and layouts
     */
    Base: typeof Skeleton

    Circle: typeof SkeletonCircle
    Rectangle: typeof SkeletonRectangle
    Rounded: typeof SkeletonRounded
} = Object.assign(SkeletonRoot, {
    Avatar: SkeletonAvatar,
    Card: SkeletonCard,
    Base: Skeleton,
    Circle: SkeletonCircle,
    Rectangle: SkeletonRectangle,
    Rounded: SkeletonRounded,
})

// Display names for better debugging
SkeletonCompound.displayName = 'Skeleton'
SkeletonCompound.Avatar.displayName = 'Skeleton.Avatar'
SkeletonCompound.Card.displayName = 'Skeleton.Card'
SkeletonCompound.Base.displayName = 'Skeleton.Base'
SkeletonCompound.Circle.displayName = 'Skeleton.Circle'
SkeletonCompound.Rectangle.displayName = 'Skeleton.Rectangle'
SkeletonCompound.Rounded.displayName = 'Skeleton.Rounded'

export default SkeletonCompound
