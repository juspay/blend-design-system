import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import type { SkeletonAvatarProps } from './types'
import { useSkeletonBase } from './hooks/useSkeletonBase'
import { AvatarSize, AvatarShape } from '../Avatar/types'
import avatarTokens from '../Avatar/avatar.tokens'

const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
    (
        {
            variant = 'pulse',
            loading = true,
            size = AvatarSize.MD,
            shape = AvatarShape.CIRCULAR,
            ...rest
        },
        ref
    ) => {
        const { shouldRender } = useSkeletonBase(loading)

        if (!shouldRender) {
            return null
        }

        // Perfect token mirroring - use exact Avatar token values
        const getMirroredAvatarStyles = () => ({
            width: avatarTokens.sizes[size].width,
            height: avatarTokens.sizes[size].height,
            borderRadius: avatarTokens.shapes[shape].borderRadius,
            border: `1px solid ${avatarTokens.container.border.withoutImage}`,
            backgroundColor: avatarTokens.container.background.default,
            flexShrink: 0,
            position: 'relative',
        })

        const avatarStyles = getMirroredAvatarStyles()

        return (
            <Skeleton
                ref={ref}
                variant={variant}
                loading={loading}
                width={avatarStyles.width}
                height={avatarStyles.height}
                borderRadius={avatarStyles.borderRadius}
                border={avatarStyles.border}
                backgroundColor={avatarStyles.backgroundColor}
                flexShrink={avatarStyles.flexShrink}
                position="relative"
                shape={shape === AvatarShape.CIRCULAR ? 'circle' : 'rounded'}
                data-testid="skeleton-avatar"
                {...rest}
            />
        )
    }
)

SkeletonAvatar.displayName = 'SkeletonAvatar'

export default SkeletonAvatar
