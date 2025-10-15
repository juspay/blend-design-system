import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import type { SkeletonTagProps } from './types'
import type { TagTokensType } from '../Tags/tag.tokens'
import { TagVariant, TagSize, TagShape, TagColor } from '../Tags/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const SkeletonTag = forwardRef<HTMLDivElement, SkeletonTagProps>(
    (
        {
            skeletonVariant = 'pulse',
            loading = true,
            text,
            variant = TagVariant.SUBTLE,
            color = TagColor.PRIMARY,
            size = TagSize.SM,
            shape = TagShape.SQUARICAL,
            leftSlot,
            rightSlot,
            splitTagPosition,
            width,
            ...rest
        },
        ref
    ) => {
        const tagTokens = useResponsiveTokens<TagTokensType>('TAGS')

        // If not loading, don't render anything
        if (!loading) {
            return null
        }

        const getMirroredTagStyles = () => {
            const isSplitTag = splitTagPosition !== undefined
            let borderRadius = tagTokens.borderRadius[shape][size]
            if (isSplitTag) {
                const radius = tagTokens.borderRadius[shape][size]
                borderRadius =
                    splitTagPosition === 'left'
                        ? `${radius} 0 0 ${radius}`
                        : `0 ${radius} ${radius} 0`
            }

            return {
                padding: tagTokens.padding[size],
                borderRadius,
                gap: tagTokens.gap[size],
                height: tagTokens.height[size],
                borderWidth: `${tagTokens.borderWidth[variant][color]}px`,
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

            // Get more accurate character width based on font size from tokens
            const getCharacterWidth = () => {
                const fontSize =
                    tagTokens.font[size as keyof typeof tagTokens.font].fontSize
                const fontSizeNum = parseInt(String(fontSize).replace('px', ''))
                // More accurate character width estimation based on actual font size
                // Using a ratio of ~0.6 (average character width to font size ratio for most fonts)
                return fontSizeNum * 0.6
            }

            // Get actual slot size from tokens and icon size based on tag size (matching TagDemo)
            const getSlotWidth = () => {
                const baseSlotSize = parseInt(
                    String(
                        tagTokens.slot.size[
                            size as keyof typeof tagTokens.slot.size
                        ]
                    ).replace('px', '')
                )
                // Use icon sizes that match TagDemo: XS=10, SM=12, MD=14, LG=16
                const iconSizes = {
                    [TagSize.XS]: 10,
                    [TagSize.SM]: 12,
                    [TagSize.MD]: 14,
                    [TagSize.LG]: 16,
                }
                return iconSizes[size] || baseSlotSize
            }

            const slotWidth = getSlotWidth()
            const slotGap =
                leftSlot || rightSlot
                    ? parseInt(
                          String(
                              tagTokens.gap[size as keyof typeof tagTokens.gap]
                          ).replace('px', '')
                      )
                    : 0

            // Calculate text width
            let estimatedWidth = text.length * getCharacterWidth()

            // Add slot widths and gaps (more accurate calculation)
            if (leftSlot) estimatedWidth += slotWidth + slotGap
            if (rightSlot) estimatedWidth += slotWidth + slotGap

            // Extract horizontal padding from padding string
            const paddingValues = String(tagStyles.padding).split(' ')
            const horizontalPadding =
                paddingValues.length > 1
                    ? parseInt(paddingValues[1].replace('px', '')) * 2
                    : parseInt(paddingValues[0].replace('px', '')) * 2

            // Add padding to the estimated width
            estimatedWidth += horizontalPadding

            // Dynamic minimum width based on tag size
            const getMinWidth = () => {
                switch (size) {
                    case TagSize.XS:
                        return 32
                    case TagSize.SM:
                        return 36
                    case TagSize.MD:
                        return 40
                    case TagSize.LG:
                        return 48
                    default:
                        return 40
                }
            }

            const minWidth = getMinWidth()

            return Math.max(Math.round(estimatedWidth), minWidth) + 'px'
        }

        const calculatedWidth = calculateDynamicWidth()

        return (
            <Skeleton
                ref={ref}
                variant={skeletonVariant}
                loading={loading}
                width={calculatedWidth}
                height={tagStyles.height}
                padding={tagStyles.padding}
                borderRadius={tagStyles.borderRadius}
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
