// Base Skeleton component
export { default as Skeleton } from './Skeleton'

// Primitive Skeleton components
export { default as SkeletonText } from './SkeletonText'
export { default as SkeletonAvatar } from './SkeletonAvatar'
export { default as SkeletonButton } from './SkeletonButton'
export { default as SkeletonCard } from './SkeletonCard'

// Types
export type {
    SkeletonProps,
    SkeletonTextProps,
    SkeletonAvatarProps,
    SkeletonButtonProps,
    SkeletonCardProps,
    SkeletonSize,
    BaseSkeletonProps,
    SkeletonVariant,
    SkeletonShape,
} from './types'

// Tokens
export type {
    SkeletonTokensType,
    ResponsiveSkeletonTokens,
} from './skeleton.tokens'

export { getSkeletonTokens } from './skeleton.tokens'

// Default export as main Skeleton component
export { default } from './Skeleton'
