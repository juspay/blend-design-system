import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import type { SkeletonAvatarProps } from './types'
import type { SkeletonTokensType } from './skeleton.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
    (
        {
            variant = 'pulse',
            loading = true,
            size = 'md',
            shape = 'circle',
            ...rest
        },
        ref
    ) => {
        const skeletonTokens =
            useResponsiveTokens<SkeletonTokensType>('SKELETON')

        // If not loading, don't render anything
        if (!loading) {
            return null
        }

        // Get size from tokens
        const avatarSize = skeletonTokens.sizes.avatar[size] as string

        return (
            <Skeleton
                ref={ref}
                variant={variant}
                loading={loading}
                width={avatarSize}
                height={avatarSize}
                shape={shape === 'circle' ? 'circle' : 'rounded'}
                flexShrink={0} // Prevent avatar from shrinking
                data-testid="skeleton-avatar"
                {...rest}
            />
        )
    }
)

SkeletonAvatar.displayName = 'SkeletonAvatar'

export default SkeletonAvatar
