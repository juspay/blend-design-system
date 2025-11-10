import {
    forwardRef,
    useEffect,
    useState,
    type ForwardRefExoticComponent,
    type RefAttributes,
} from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { TagTokensType } from './tag.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { TagProps, TagWithSkeletonProps } from './types'
import { TagColor, TagShape, TagSize, TagVariant } from './types'

const TagBase = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
    const {
        text,
        variant = TagVariant.SUBTLE,
        color = TagColor.PRIMARY,
        size = TagSize.SM,
        shape = TagShape.SQUARICAL,
        leftSlot,
        rightSlot,
        splitTagPosition,
        ...rawBlockProps
    } = props

    const { width, onClick, ...blockProps } = rawBlockProps
    const tagTokens = useResponsiveTokens<TagTokensType>('TAGS')

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

    return (
        <Block
            {...blockProps}
            ref={ref}
            onClick={onClick}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={width ?? 'fit-content'}
            gap={tagTokens.gap}
            padding={tagTokens.padding[size]}
            backgroundColor={tagTokens.backgroundColor[variant][color]}
            color={tagTokens.text.color[variant][color]}
            border={tagTokens.border[variant][color]}
            borderRadius={borderRadius}
            cursor={hasClickHandler ? 'pointer' : 'default'}
        >
            {leftSlot && <Block contentCentered>{leftSlot}</Block>}
            <Text
                fontSize={tagTokens.text.fontSize[size]}
                fontWeight={tagTokens.text.fontWeight[size]}
            >
                {text}
            </Text>
            {rightSlot && <Block contentCentered>{rightSlot}</Block>}
        </Block>
    )
})

TagBase.displayName = 'TagBase'

type TagSkeletonComponent = ForwardRefExoticComponent<
    Omit<TagWithSkeletonProps, 'loading'> & RefAttributes<HTMLDivElement>
>

let skeletonComponentPromise: Promise<TagSkeletonComponent> | null = null

const loadTagSkeleton = async (): Promise<TagSkeletonComponent> => {
    if (!skeletonComponentPromise) {
        skeletonComponentPromise = import('./TagSkeleton.js').then((module) => {
            const mod = module as unknown as {
                TagSkeleton: TagSkeletonComponent
            }
            return mod.TagSkeleton
        })
    }

    return skeletonComponentPromise
}

const Tag = forwardRef<HTMLDivElement, TagWithSkeletonProps>((props, ref) => {
    const {
        loading = false,
        skeletonVariant = 'pulse',
        text,
        variant = TagVariant.SUBTLE,
        color = TagColor.PRIMARY,
        size = TagSize.SM,
        shape = TagShape.SQUARICAL,
        leftSlot,
        rightSlot,
        splitTagPosition,
        ...blockProps
    } = props

    const [SkeletonComponent, setSkeletonComponent] =
        useState<TagSkeletonComponent | null>(null)

    useEffect(() => {
        if (!loading) {
            return
        }

        let isMounted = true

        loadTagSkeleton()
            .then((component) => {
                if (!isMounted) return
                setSkeletonComponent(() => component)
            })
            .catch(() => {
                if (isMounted) {
                    setSkeletonComponent(null)
                }
            })

        return () => {
            isMounted = false
        }
    }, [loading])

    if (loading) {
        if (!SkeletonComponent) {
            return null
        }

        return (
            <SkeletonComponent
                ref={ref}
                text={text}
                variant={variant}
                color={color}
                size={size}
                shape={shape}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                splitTagPosition={splitTagPosition}
                skeletonVariant={skeletonVariant}
                {...blockProps}
            />
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
            {...blockProps}
        />
    )
})

Tag.displayName = 'Tag'

export default Tag
