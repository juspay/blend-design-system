import { forwardRef, type CSSProperties } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { TagTokensType } from './tag.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { TagProps } from './types'
import { TagColor, TagShape, TagSize, TagVariant } from './types'

export type TagBaseProps = TagProps & {
    isSkeleton?: boolean
    tokens?: TagTokensType
}

const TagBase = forwardRef<HTMLDivElement, TagBaseProps>((props, ref) => {
    const {
        text,
        variant = TagVariant.SUBTLE,
        color = TagColor.PRIMARY,
        size = TagSize.SM,
        shape = TagShape.SQUARICAL,
        leftSlot,
        rightSlot,
        splitTagPosition,
        isSkeleton = false,
        tokens,
        ...rawBlockProps
    } = props

    const { width, onClick, style, className, pointerEvents, ...blockProps } =
        rawBlockProps as typeof rawBlockProps & {
            style?: CSSProperties
            className?: string
            pointerEvents?: CSSProperties['pointerEvents']
        }
    const defaultTagTokens = useResponsiveTokens<TagTokensType>('TAGS')
    const tagTokens = tokens ?? defaultTagTokens

    const isSplitTag = splitTagPosition !== undefined
    let borderRadius = tagTokens.borderRadius[size][shape]
    if (isSplitTag) {
        const radius = tagTokens.borderRadius[size][shape]
        borderRadius =
            splitTagPosition === 'left'
                ? `${radius} 0 0 ${radius}`
                : `0 ${radius} ${radius} 0`
    }

    const hasClickHandler = typeof onClick === 'function'
    const effectiveOnClick = isSkeleton ? undefined : onClick
    const effectiveCursor =
        !isSkeleton && hasClickHandler ? 'pointer' : 'default'

    return (
        <Block
            {...blockProps}
            ref={ref}
            onClick={effectiveOnClick}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={width ?? 'fit-content'}
            gap={tagTokens.gap}
            padding={tagTokens.padding[size]}
            backgroundColor={
                isSkeleton
                    ? 'transparent'
                    : tagTokens.backgroundColor[variant][color]
            }
            color={
                isSkeleton
                    ? 'transparent'
                    : tagTokens.text.color[variant][color]
            }
            border={
                isSkeleton ? 'transparent' : tagTokens.border[variant][color]
            }
            borderRadius={borderRadius}
            cursor={effectiveCursor}
            pointerEvents={isSkeleton ? 'none' : pointerEvents}
            className={className}
            style={style}
        >
            {leftSlot && (
                <Block contentCentered style={{ opacity: isSkeleton ? 0 : 1 }}>
                    {leftSlot}
                </Block>
            )}
            <Text
                fontSize={tagTokens.text.fontSize[size]}
                fontWeight={tagTokens.text.fontWeight[size]}
                style={{ color: isSkeleton ? 'transparent' : undefined }}
                aria-hidden={isSkeleton ? true : undefined}
            >
                {text}
            </Text>
            {rightSlot && (
                <Block contentCentered style={{ opacity: isSkeleton ? 0 : 1 }}>
                    {rightSlot}
                </Block>
            )}
        </Block>
    )
})

TagBase.displayName = 'TagBase'

export default TagBase
