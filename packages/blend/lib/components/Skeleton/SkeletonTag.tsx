import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import type { SkeletonTagProps, SkeletonVariant } from './types'
import type { TagTokensType } from '../Tags/tag.tokens'
import { TagSize, TagShape } from '../Tags/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const SkeletonTag = forwardRef<HTMLDivElement, SkeletonTagProps>(
    (
        {
            skeletonVariant = 'pulse' as SkeletonVariant,
            loading = true,
            text,
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

        if (!loading) {
            return null
        }

        const getMirroredTagStyles = () => {
            const isSplitTag = splitTagPosition !== undefined
            let borderRadius = tagTokens.borderRadius[size][shape]
            if (isSplitTag) {
                const radius = tagTokens.borderRadius[size][shape]
                borderRadius =
                    splitTagPosition === 'left'
                        ? `${radius} 0 0 ${radius}`
                        : `0 ${radius} ${radius} 0`
            }

            const calculateHeight = () => {
                const paddingValues = String(tagTokens.padding[size]).split(' ')
                const verticalPadding =
                    paddingValues.length > 1
                        ? parseInt(paddingValues[0].replace('px', '')) * 2 // top + bottom
                        : parseInt(paddingValues[0].replace('px', '')) * 2

                const fontSize = tagTokens.text.fontSize[size]
                const fontSizeNum = parseInt(String(fontSize).replace('px', ''))

                const totalHeight = fontSizeNum + verticalPadding + 2 // 2px buffer for line height

                return `${totalHeight}px`
            }

            const calculatedHeight = calculateHeight()

            return {
                padding: tagTokens.padding[size],
                borderRadius,
                gap: tagTokens.gap,
                height: calculatedHeight,
            }
        }

        const tagStyles = getMirroredTagStyles()

        const calculateDynamicWidth = () => {
            if (width) return width

            if (!text) {
                return 'fit-content'
            }

            const getCharacterWidth = () => {
                const fontSize = tagTokens.text.fontSize[size]
                const fontSizeNum = parseInt(String(fontSize).replace('px', ''))
                return fontSizeNum * 0.6
            }

            const getSlotWidth = () => {
                const iconSizes = {
                    [TagSize.XS]: 10,
                    [TagSize.SM]: 12,
                    [TagSize.MD]: 14,
                    [TagSize.LG]: 16,
                }
                return iconSizes[size] || 12
            }

            const slotWidth = getSlotWidth()
            const slotGap =
                leftSlot || rightSlot
                    ? parseInt(String(tagTokens.gap).replace('px', ''))
                    : 0

            let estimatedWidth = text.length * getCharacterWidth()

            if (leftSlot) estimatedWidth += slotWidth + slotGap
            if (rightSlot) estimatedWidth += slotWidth + slotGap

            const paddingValues = String(tagStyles.padding).split(' ')
            const horizontalPadding =
                paddingValues.length > 1
                    ? parseInt(paddingValues[1].replace('px', '')) * 2
                    : parseInt(paddingValues[0].replace('px', '')) * 2

            estimatedWidth += horizontalPadding

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
                flexShrink={0}
                data-testid="skeleton-tag"
                {...rest}
            />
        )
    }
)

SkeletonTag.displayName = 'SkeletonTag'

export default SkeletonTag
