import { ReactNode } from 'react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import { TagV2TokensType } from './tagV2.tokens'
import { TagV2Color, TagV2Size, TagV2SubType, TagV2Type } from './TagV2.types'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { addPxToValue } from '../../global-utils/GlobalUtils'

const TagSkeleton = ({
    showSkeleton = false,
    skeletonVariant = 'pulse',
    text = 'TagV2',
    size = TagV2Size.SM,
    type = TagV2Type.SUBTLE,
    subType = TagV2SubType.SQUARICAL,
    color = TagV2Color.PRIMARY,
    leftSlot,
    rightSlot,
}: {
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    text?: string
    size?: TagV2Size
    type?: TagV2Type
    subType?: TagV2SubType
    color?: TagV2Color
    leftSlot?: ReactNode
    rightSlot?: ReactNode
}) => {
    const tagTokens = useResponsiveTokens<TagV2TokensType>('TAGV2')
    const skeletonRadius = tagTokens.borderRadius[size][subType]
    const skeletonWidth = 'fit-content'
    return (
        <Skeleton
            variant={skeletonVariant}
            loading
            padding="0"
            borderRadius={skeletonRadius}
            width={skeletonWidth}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            height="auto"
            pointerEvents="none"
            style={{
                width: skeletonWidth,
                height: 'auto',
                pointerEvents: 'none',
            }}
        >
            <Block
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="fit-content"
                height="fit-content"
                gap={tagTokens.gap}
                border={
                    showSkeleton ? 'transparent' : tagTokens.border[type][color]
                }
                borderRadius={tagTokens.borderRadius[size][subType]}
                backgroundColor={
                    showSkeleton
                        ? 'transparent'
                        : tagTokens.backgroundColor[type][color]
                }
                paddingTop={tagTokens.padding.top[size]}
                paddingBottom={tagTokens.padding.bottom[size]}
                paddingLeft={tagTokens.padding.left[size]}
                paddingRight={tagTokens.padding.right[size]}
                pointerEvents={showSkeleton ? 'none' : undefined}
            >
                {leftSlot && (
                    <Block style={{ opacity: showSkeleton ? 0 : 1 }}>
                        {leftSlot}
                    </Block>
                )}
                <Text
                    fontSize={tagTokens.text.fontSize[size]}
                    fontWeight={tagTokens.text.fontWeight[size]}
                    lineHeight={addPxToValue(tagTokens.text.lineHeight[size])}
                    color={
                        showSkeleton
                            ? 'transparent'
                            : tagTokens.text.color[type][color]
                    }
                    aria-hidden={showSkeleton ? true : undefined}
                >
                    {text || 'TagV2'}
                </Text>
                {rightSlot && (
                    <Block style={{ opacity: showSkeleton ? 0 : 1 }}>
                        {rightSlot}
                    </Block>
                )}
            </Block>
        </Skeleton>
    )
}

export default TagSkeleton
