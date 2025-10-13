import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import type { SkeletonTagProps } from './types'
import type { TagTokensType } from '../Tags/tag.tokens'
import { TagVariant, TagSize, TagShape, TagColor } from '../Tags/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const SkeletonTag = forwardRef<HTMLDivElement, SkeletonTagProps>(
    (
        {
            variant = 'pulse',
            loading = true,
            tagVariant = TagVariant.SUBTLE,
            color = TagColor.PRIMARY,
            size = TagSize.SM,
            shape = TagShape.SQUARICAL,
            width,
            text,
            hasLeftSlot = false,
            hasRightSlot = false,
            splitTagPosition,
            ...rest
        },
        ref
    ) => {
        const tagTokens = useResponsiveTokens<TagTokensType>('TAGS')

        // If not loading, don't render anything
        if (!loading) {
            return null
        }

        // Perfect token mirroring - use exact tag token values
        const getMirroredTagStyles = () => {
            // Get exact padding from tag tokens
            const padding =
                tagTokens.padding[size as keyof typeof tagTokens.padding]

            // Get exact border radius from tag tokens based on shape and split position
            const getBorderRadius = () => {
                const baseRadius =
                    tagTokens.borderRadius[
                        shape as keyof typeof tagTokens.borderRadius
                    ][size as keyof typeof tagTokens.borderRadius.squarical]

                if (splitTagPosition !== undefined) {
                    // Handle split tag border radius (same logic as real Tag component)
                    return splitTagPosition === 'left'
                        ? `${baseRadius} 0 0 ${baseRadius}`
                        : `0 ${baseRadius} ${baseRadius} 0`
                }

                return baseRadius
            }

            return {
                padding,
                borderRadius: getBorderRadius(),
                // Use tag gap for internal spacing
                gap: tagTokens.gap[size as keyof typeof tagTokens.gap],
                height: tagTokens.height[size as keyof typeof tagTokens.height],
                // Mirror border styling
                borderWidth: `${tagTokens.borderWidth[tagVariant as keyof typeof tagTokens.borderWidth][color as keyof typeof tagTokens.borderWidth.subtle]}px`,
            }
        }

        const tagStyles = getMirroredTagStyles()

        // Calculate dynamic width based on content (like real tag)
        const calculateDynamicWidth = () => {
            if (width) return width

            // If no text provided, use fit-content (minimal size)
            if (!text) {
                return 'fit-content'
            }

            // Estimate width based on text length and tag size
            const getCharacterWidth = () => {
                switch (size) {
                    case TagSize.XS:
                        return 6 // ~6px per character for xs
                    case TagSize.SM:
                        return 6 // ~6px per character for sm
                    case TagSize.MD:
                        return 7 // ~7px per character for md
                    case TagSize.LG:
                        return 7 // ~7px per character for lg
                    default:
                        return 6
                }
            }

            const slotWidth = 12 // Standard slot width from tokens
            const slotGap =
                hasLeftSlot || hasRightSlot
                    ? parseInt(
                          String(
                              tagTokens.gap[size as keyof typeof tagTokens.gap]
                          )
                      )
                    : 0

            let estimatedWidth = text.length * getCharacterWidth()

            // Add slot widths and gaps
            if (hasLeftSlot) estimatedWidth += slotWidth + slotGap
            if (hasRightSlot) estimatedWidth += slotWidth + slotGap

            // Extract horizontal padding from padding string
            const paddingValues = String(tagStyles.padding).split(' ')
            const horizontalPadding =
                paddingValues.length > 1
                    ? parseInt(paddingValues[1].replace('px', '')) * 2
                    : parseInt(paddingValues[0].replace('px', '')) * 2

            // Add padding to the estimated width
            estimatedWidth += horizontalPadding

            // Ensure minimum width
            const minWidth = 40 // Minimum tag width

            return Math.max(estimatedWidth, minWidth) + 'px'
        }

        const calculatedWidth = calculateDynamicWidth()

        return (
            <Skeleton
                ref={ref}
                variant={variant}
                loading={loading}
                width={calculatedWidth}
                height={tagStyles.height}
                padding={tagStyles.padding}
                borderRadius={tagStyles.borderRadius}
                shape="rectangle"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                gap={tagStyles.gap}
                flexShrink={0} // Prevent tag from shrinking
                data-testid="skeleton-tag"
                {...rest}
            />
        )
    }
)

SkeletonTag.displayName = 'SkeletonTag'

export default SkeletonTag
