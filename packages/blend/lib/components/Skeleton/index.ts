// ===================================
// OPTIMIZED EXPORTS FOR TREE-SHAKING
// ===================================

// Modern compound component (recommended)
export { default as Skeleton } from './SkeletonCompound'

// Individual components (for backward compatibility and tree-shaking)
export { default as SkeletonBase } from './Skeleton'
export { default as SkeletonAvatar } from './SkeletonAvatar'
export { default as SkeletonCard } from './SkeletonCard'

// Shared utilities
export { useSkeletonBase } from './hooks/useSkeletonBase'
export {
    getSkeletonState,
    mergeSkeletonProps,
    getSkeletonDefaults,
} from './utils'

// Types (tree-shakable type-only exports)
export type {
    SkeletonProps,
    SkeletonAvatarProps,
    SkeletonCardProps,
    SkeletonSize,
    BaseSkeletonProps,
    SkeletonVariant,
    SkeletonShape,
} from './types'

// Tokens (tree-shakable type-only exports)
export type {
    SkeletonTokensType,
    ResponsiveSkeletonTokens,
} from './skeleton.tokens'

export { getSkeletonTokens } from './skeleton.tokens'

// Default export as compound component
export { default } from './SkeletonCompound'
