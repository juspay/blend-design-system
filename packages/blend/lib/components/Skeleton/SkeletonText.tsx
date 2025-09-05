import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Skeleton from './Skeleton'
import type { SkeletonTextProps } from './types'
import { useSkeletonBase } from './hooks/useSkeletonBase'

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
    (
        {
            variant = 'pulse',
            loading = true,
            lines = 1,
            width,
            lastLineWidth,
            fontSize = 'md',
            ...rest
        },
        ref
    ) => {
        const { shouldRender, tokens: skeletonTokens } =
            useSkeletonBase(loading)

        if (!shouldRender) {
            return null
        }

        // Handle width as array for multi-line
        const getLineWidth = (
            lineIndex: number,
            totalLines: number
        ): string | number => {
            if (Array.isArray(width)) {
                return width[lineIndex] || width[width.length - 1] || '100%'
            }

            // Last line handling
            if (lineIndex === totalLines - 1 && lastLineWidth !== undefined) {
                return lastLineWidth
            }

            return width || '100%'
        }

        // Get height based on font size
        const getTextHeight = (): string => {
            switch (fontSize) {
                case 'sm':
                    return '14px'
                case 'lg':
                    return '20px'
                case 'md':
                default:
                    return (
                        (skeletonTokens?.sizes.text.height as string) || '16px'
                    )
            }
        }

        // Single line
        if (lines === 1) {
            const singleWidth = Array.isArray(width) ? width[0] : width
            return (
                <Skeleton
                    ref={ref}
                    variant={variant}
                    loading={loading}
                    width={
                        singleWidth ||
                        skeletonTokens?.sizes.text.minWidth ||
                        '100%'
                    }
                    height={getTextHeight()}
                    shape="rounded"
                    data-testid="skeleton-text"
                    {...rest}
                />
            )
        }

        // Multiple lines
        const textLines = Array.from({ length: lines }, (_, index) => (
            <Skeleton
                key={index}
                variant={variant}
                loading={loading}
                width={getLineWidth(index, lines)}
                height={getTextHeight()}
                shape="rounded"
                data-testid={`skeleton-text-line-${index}`}
            />
        ))

        return (
            <Block
                ref={ref}
                display="flex"
                flexDirection="column"
                gap={skeletonTokens?.spacing.margin || '8px'}
                data-testid="skeleton-text-container"
                {...rest}
            >
                {textLines}
            </Block>
        )
    }
)

SkeletonText.displayName = 'SkeletonText'

export default SkeletonText
