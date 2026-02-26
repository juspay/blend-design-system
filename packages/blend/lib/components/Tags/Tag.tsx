import { forwardRef, type CSSProperties } from 'react'
import type { TagTokensType } from './tag.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { TagWithSkeletonProps } from './types'
import { TagColor, TagShape, TagSize, TagVariant } from './types'
import { getSkeletonState } from '../Skeleton/utils'
import Skeleton from '../Skeleton/Skeleton'
import TagBase from './TagBase'

const Tag = forwardRef<HTMLDivElement, TagWithSkeletonProps>((props, ref) => {
    const {
        showSkeleton = false,
        skeletonVariant = 'pulse',
        text,
        variant = TagVariant.SUBTLE,
        color = TagColor.PRIMARY,
        size = TagSize.SM,
        shape = TagShape.SQUARICAL,
        leftSlot,
        rightSlot,
        splitTagPosition,
        style: inlineStyle,
        className,
        maxWidth,
        minWidth,
        width,
        ...blockProps
    } = props

    const tagTokens = useResponsiveTokens<TagTokensType>('TAGS')
    const { shouldShowSkeleton } = getSkeletonState(showSkeleton)

    const { ...restBlockProps } = blockProps as {
        width?: string | number
        pointerEvents?: CSSProperties['pointerEvents']
        [key: string]: unknown
    }
    const { pointerEvents, ...layoutBlockProps } = restBlockProps

    const baseRadius = tagTokens.borderRadius[size][shape]
    const skeletonRadius =
        splitTagPosition === undefined
            ? baseRadius
            : splitTagPosition === 'left'
              ? `${baseRadius} 0 0 ${baseRadius}`
              : `0 ${baseRadius} ${baseRadius} 0`

    const skeletonWidth = width ?? inlineStyle?.width ?? 'fit-content'

    if (shouldShowSkeleton) {
        return (
            <Skeleton
                ref={ref}
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
                className={className}
                style={{
                    ...inlineStyle,
                    width: skeletonWidth,
                    height: 'auto',
                    pointerEvents: 'none',
                }}
                {...layoutBlockProps}
            >
                <TagBase
                    text={text ?? ''}
                    variant={variant}
                    color={color}
                    size={size}
                    shape={shape}
                    leftSlot={leftSlot}
                    rightSlot={rightSlot}
                    splitTagPosition={splitTagPosition}
                    width={skeletonWidth}
                    tokens={tagTokens}
                    isSkeleton
                />
            </Skeleton>
        )
    }

    return (
        <TagBase
            ref={ref}
            text={text}
            variant={variant}
            color={color}
            size={size}
            shape={shape}
            leftSlot={leftSlot}
            rightSlot={rightSlot}
            splitTagPosition={splitTagPosition}
            tokens={tagTokens}
            style={inlineStyle}
            className={className}
            pointerEvents={pointerEvents}
            maxWidth={maxWidth}
            minWidth={minWidth}
            width={width}
            {...layoutBlockProps}
        />
    )
})

Tag.displayName = 'Tag'

export default Tag
