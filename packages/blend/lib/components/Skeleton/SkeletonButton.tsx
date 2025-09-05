import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import type { SkeletonButtonProps } from './types'
import type { SkeletonTokensType } from './skeleton.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
    (
        {
            variant = 'pulse',
            loading = true,
            size = 'md',
            width,
            fullWidth = false,
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

        // Get dimensions from tokens
        const buttonDimensions = skeletonTokens.sizes.button[size]

        // Determine width
        const buttonWidth = fullWidth
            ? '100%'
            : width || buttonDimensions.minWidth

        return (
            <Skeleton
                ref={ref}
                variant={variant}
                loading={loading}
                width={buttonWidth}
                height={buttonDimensions.height}
                shape="rounded"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                data-testid="skeleton-button"
                {...rest}
            />
        )
    }
)

SkeletonButton.displayName = 'SkeletonButton'

export default SkeletonButton
