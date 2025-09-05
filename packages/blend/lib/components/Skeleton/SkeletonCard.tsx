import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Skeleton from './Skeleton'
import SkeletonText from './SkeletonText'
import SkeletonAvatar from './SkeletonAvatar'
import SkeletonButton from './SkeletonButton'
import type { SkeletonCardProps } from './types'
import { ButtonSize } from '../Button/types'
import { useSkeletonBase } from './hooks/useSkeletonBase'

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
                        size="md"
                        loading={loading}
                    />
                    <Block flexGrow={1}>
                        <SkeletonText
                            variant={variant}
                            loading={loading}
                            width="60%"
                        />
                        <SkeletonText
                            variant={variant}
                            loading={loading}
                            width="40%"
                            fontSize="sm"
                        />
                    </Block>
                </Block>

                {/* Content area */}
                <Block marginTop="16px">
                    <SkeletonText
                        variant={variant}
                        loading={loading}
                        lines={3}
                        width={['100%', '90%', '75%']}
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
                boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
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
