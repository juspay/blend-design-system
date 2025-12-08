import {
    forwardRef,
    type CSSProperties,
    type MouseEvent,
    type KeyboardEvent,
} from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { TagTokensType } from './tag.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { TagProps } from './types'
import { TagColor, TagShape, TagSize, TagVariant } from './types'
import { useRipple, RippleContainer } from '../animations/Ripple'

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
    const { ripples, createRipple } = useRipple()

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
    const showRipple = !isSkeleton && hasClickHandler
    const isInteractive = hasClickHandler && !isSkeleton

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (!showRipple || !effectiveOnClick) {
            return effectiveOnClick?.(event)
        }

        createRipple(event)
        effectiveOnClick(event)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        // Handle Enter and Space keys for keyboard accessibility
        if (
            isInteractive &&
            effectiveOnClick &&
            (event.key === 'Enter' || event.key === ' ')
        ) {
            event.preventDefault()
            event.stopPropagation()
            // Create a synthetic mouse event for ripple effect
            const syntheticEvent = {
                ...event,
                currentTarget: event.currentTarget,
                clientX: 0,
                clientY: 0,
            } as unknown as MouseEvent<HTMLDivElement>
            createRipple(syntheticEvent)
            effectiveOnClick(syntheticEvent)
        }
    }

    // ARIA attributes for accessibility
    // If aria-label is provided, use it; otherwise use text as accessible name for interactive tags
    const ariaLabel = blockProps['aria-label'] as string | undefined
    const accessibleName = ariaLabel || text

    // Focus styles for interactive tags (WCAG 2.4.7 Focus Visible)
    const focusVisibleStyles =
        isInteractive && !isSkeleton
            ? {
                  outline: '2px solid #0561E2',
                  outlineOffset: '2px',
                  boxShadow: '0 0 0 3px rgba(5, 97, 226, 0.1)',
              }
            : undefined

    return (
        <Block
            {...blockProps}
            ref={ref}
            onClick={showRipple ? handleClick : effectiveOnClick}
            onKeyDown={isInteractive ? handleKeyDown : undefined}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            aria-label={isInteractive ? accessibleName : ariaLabel}
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
            position={showRipple ? 'relative' : blockProps.position}
            overflow={showRipple ? 'hidden' : blockProps.overflow}
            _focusVisible={focusVisibleStyles}
            className={className}
            style={style}
            data-tag={text}
        >
            {leftSlot && (
                <Block
                    data-element="left-slot"
                    contentCentered
                    style={{ opacity: isSkeleton ? 0 : 1 }}
                >
                    {leftSlot}
                </Block>
            )}
            <Text
                data-id={text}
                fontSize={tagTokens.text.fontSize[size]}
                fontWeight={tagTokens.text.fontWeight[size]}
                style={{ color: isSkeleton ? 'transparent' : undefined }}
                aria-hidden={isSkeleton ? true : undefined}
            >
                {text}
            </Text>
            {rightSlot && (
                <Block
                    data-element="right-slot"
                    contentCentered
                    style={{ opacity: isSkeleton ? 0 : 1 }}
                >
                    {rightSlot}
                </Block>
            )}
            {showRipple && <RippleContainer ripples={ripples} />}
        </Block>
    )
})

TagBase.displayName = 'TagBase'

export default TagBase
