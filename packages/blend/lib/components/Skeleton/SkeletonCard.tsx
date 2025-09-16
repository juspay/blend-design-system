import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Skeleton from './Skeleton'
import SkeletonAvatar from './SkeletonAvatar'
import { AvatarSize } from '../Avatar/types'
import SkeletonButton from './SkeletonButton'
import type { SkeletonCardProps } from './types'
import { ButtonSize } from '../Button/types'
import { useSkeletonBase } from './hooks/useSkeletonBase'
import FOUNDATION_THEME from '../../tokens/theme.token'

const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
    (
        {
            variant = 'pulse',
            loading = true,
            padding = '16px',
            children,
            ...rest
        },
        ref
    ) => {
        const { shouldRender, tokens: skeletonTokens } =
            useSkeletonBase(loading)

        // If not loading, render children or nothing
        if (!shouldRender) {
            return children ? <>{children}</> : null
        }

        // Default card skeleton layout if no children provided
        const defaultContent = (
            <>
                {/* Header with avatar and text */}
                <Block
                    display="flex"
                    alignItems="center"
                    gap={skeletonTokens!.spacing.gap}
                >
                    <SkeletonAvatar
                        variant={variant}
                        size={AvatarSize.MD}
                        loading={loading}
                    />
                    <Block flexGrow={1}>
                        <Skeleton
                            variant={variant}
                            loading={loading}
                            width="60%"
                            height="16px"
                            shape="rounded"
                        />
                        <Skeleton
                            variant={variant}
                            loading={loading}
                            width="40%"
                            height="14px"
                            shape="rounded"
                            marginTop="4px"
                        />
                    </Block>
                </Block>

                {/* Content area */}
                <Block marginTop="16px">
                    <Skeleton
                        variant={variant}
                        loading={loading}
                        width="100%"
                        height="16px"
                        shape="rounded"
                        marginBottom="8px"
                    />
                    <Skeleton
                        variant={variant}
                        loading={loading}
                        width="90%"
                        height="16px"
                        shape="rounded"
                        marginBottom="8px"
                    />
                    <Skeleton
                        variant={variant}
                        loading={loading}
                        width="75%"
                        height="16px"
                        shape="rounded"
                    />
                </Block>

                {/* Footer with buttons */}
                <Block
                    display="flex"
                    justifyContent="flex-end"
                    gap={skeletonTokens!.spacing.gap}
                    marginTop="16px"
                >
                    <SkeletonButton
                        variant={variant}
                        loading={loading}
                        size={ButtonSize.SMALL}
                    />
                    <SkeletonButton
                        variant={variant}
                        loading={loading}
                        size={ButtonSize.SMALL}
                        width="80px"
                    />
                </Block>
            </>
        )

        return (
            <Skeleton
                ref={ref}
                variant="pulse" // Card wrapper doesn't animate, only contents do
                loading={loading}
                animate={false} // Disable wrapper animation
                shape="rounded"
                padding={padding}
                border="1px solid #e5e7eb"
                backgroundColor="white"
                boxShadow={FOUNDATION_THEME.shadows.sm}
                data-testid="skeleton-card"
                {...rest}
            >
                {children || defaultContent}
            </Skeleton>
        )
    }
)

SkeletonCard.displayName = 'SkeletonCard'

export default SkeletonCard
