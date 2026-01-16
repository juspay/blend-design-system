import { forwardRef } from 'react'
import PrimitiveLink from '../Primitives/PrimitiveLink'
import {
    ButtonSize,
    ButtonState,
    ButtonSubType,
    ButtonType,
} from './buttonV2.types'
import type { ButtonV2TokensType } from './buttonV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Skeleton from '../Skeleton/Skeleton'
import { renderButtonContent } from './ButtonV2'
import {
    getBorderRadius,
    getButtonHeight,
    getButtonStatus,
    getSkeletonBorderRadius,
    getSkeletonWidth,
    getButtonStyles,
    getButtonPadding,
} from './utils'
import { getButtonAriaAttributes } from '../../utils/accessibility'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

export type LinkButtonProps = {
    href: string
    target?: string
    rel?: string
    buttonType?: ButtonType
    size?: ButtonSize
    subType?: ButtonSubType
    text?: string
    leftSlot?: {
        slot: React.ReactNode
        maxHeight?: string | number
    }
    rightSlot?: {
        slot: React.ReactNode
        maxHeight?: string | number
    }
    loading?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    state?: ButtonState
}
export type LinkButtonNativeProps = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    | 'href'
    | 'target'
    | 'rel'
    | 'children'
    | 'className'
    | 'style'
    | 'dangerouslySetInnerHTML'
> & {
    disabled?: boolean
}

const LinkButton = forwardRef<
    HTMLAnchorElement,
    LinkButtonProps & LinkButtonNativeProps
>((props, ref) => {
    const {
        showSkeleton = false,
        skeletonVariant = 'pulse',
        buttonType = ButtonType.PRIMARY,
        size = ButtonSize.SMALL,
        subType = ButtonSubType.DEFAULT,
        text,
        leftSlot,
        rightSlot,
        loading,
        width,
        minWidth,
        maxWidth,
        state = ButtonState.DEFAULT,
        href,
        target,
        rel,
        disabled,
        onClick,
        ...restHtmlProps
    } = props as LinkButtonProps & LinkButtonNativeProps

    const buttonTokens = useResponsiveTokens<ButtonV2TokensType>('BUTTONV2')
    const isSkeleton = showSkeleton ?? false
    const isLoading = (loading ?? false) && !isSkeleton
    const isDisabled = isSkeleton ? true : (disabled ?? false)
    const paddingTokens = getButtonPadding(
        size,
        buttonType,
        subType,
        buttonTokens
    )
    const buttonStatus = getButtonStatus(isLoading, isDisabled)

    const borderRadius = getBorderRadius(
        size,
        buttonType,
        subType,
        undefined,
        buttonTokens
    )
    const buttonHeight = getButtonHeight(subType)

    const ariaLabel = restHtmlProps['aria-label']
    const ariaAttrs = getButtonAriaAttributes({
        disabled: isDisabled,
        loading: isLoading,
        ariaLabel,
    })

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (isSkeleton || isDisabled || isLoading) {
            event.preventDefault()
            return
        }
        onClick?.(event)
    }

    const buttonStyles = getButtonStyles(
        isSkeleton,
        isDisabled,
        buttonType,
        subType,
        buttonTokens,
        undefined
    )

    const linkProps = {
        ref,
        href: isDisabled ? undefined : href,
        target,
        rel,
        onClick: handleClick,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width ?? 'fit-content',
        minWidth,
        maxWidth,
        gap: buttonTokens.gap,
        ...(buttonHeight !== undefined && { height: buttonHeight }),
        background: buttonStyles.background,
        color: buttonStyles.color,
        borderRadius,
        border: buttonStyles.border,
        outline: buttonStyles.outline,
        transition: 'transform 0.15s ease-in-out',
        paddingTop: paddingTokens.top,
        paddingX: paddingTokens.right,
        paddingBottom: paddingTokens.bottom,
        ...ariaAttrs,
        _active: buttonStyles._active,
        _hover: buttonStyles._hover,
        _focusVisible: buttonStyles._focusVisible,
        _disabled: buttonStyles._disabled,
        'data-button': text,
        'data-status': buttonStatus,
        ...restHtmlProps,
    }

    const linkElement = (
        <PrimitiveLink {...linkProps}>
            {renderButtonContent({
                isLoading,
                isSkeleton,
                disabled: isDisabled,
                state,
                buttonType,
                subType,
                size,
                text,
                leftSlot,
                rightSlot,
                tokens: buttonTokens,
            })}
        </PrimitiveLink>
    )

    if (isSkeleton) {
        const skeletonRadius = getSkeletonBorderRadius(
            size,
            buttonType,
            subType,
            undefined,
            buttonTokens
        )
        const skeletonWidth = getSkeletonWidth(width)

        return (
            <Skeleton
                variant={skeletonVariant}
                loading
                padding="0"
                borderRadius={skeletonRadius}
                width={skeletonWidth}
                display="inline-flex"
                alignItems="stretch"
                justifyContent="center"
                pointerEvents="none"
            >
                {linkElement}
            </Skeleton>
        )
    }

    return linkElement
})

LinkButton.displayName = 'LinkButton'

export default LinkButton
