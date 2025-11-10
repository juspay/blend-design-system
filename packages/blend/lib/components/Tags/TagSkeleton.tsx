import { forwardRef } from 'react'
import Skeleton from '../Skeleton/Skeleton'
import type { TagWithSkeletonProps } from './types'
import type { TagTokensType } from './tag.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TagShape, TagSize } from './types'
import { useSkeletonBase } from '../Skeleton/hooks/useSkeletonBase'

export type TagSkeletonProps = Omit<TagWithSkeletonProps, 'showSkeleton'>

const TagSkeleton = forwardRef<HTMLDivElement, TagSkeletonProps>(
    (props, ref) => {
        const {
            size = TagSize.SM,
            shape = TagShape.SQUARICAL,
            splitTagPosition,
            skeletonVariant = 'pulse',
            style,
            ...rawBlockProps
        } = props

        const { width, ...blockProps } = rawBlockProps as {
            width?: string | number
            [key: string]: unknown
        }

        const tagTokens = useResponsiveTokens<TagTokensType>('TAGS')
        const { shouldRender, tokens: skeletonTokens } = useSkeletonBase(true)

        if (!shouldRender || !skeletonTokens) {
            return null
        }

        const baseRadius = tagTokens.borderRadius[size][shape]
        const borderRadius =
            splitTagPosition === undefined
                ? baseRadius
                : splitTagPosition === 'left'
                  ? `${baseRadius} 0 0 ${baseRadius}`
                  : `0 ${baseRadius} ${baseRadius} 0`

        const resolvedWidth = width ?? style?.width ?? 'fit-content'

        return (
            <Skeleton
                ref={ref}
                variant={skeletonVariant}
                width={resolvedWidth}
                padding={tagTokens.padding[size]}
                borderRadius={borderRadius}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                gap={tagTokens.gap}
                flexShrink={0}
                aria-label="Loading tag"
                data-testid="skeleton-tag"
                {...blockProps}
                style={{ ...style, width: resolvedWidth }}
            />
        )
    }
)

TagSkeleton.displayName = 'TagSkeleton'

export { TagSkeleton }
