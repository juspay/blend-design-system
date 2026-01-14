import { forwardRef } from 'react'
import PrimitiveLink from '../Primitives/PrimitiveLink'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Skeleton from '../Skeleton/Skeleton'
import { renderButtonContent } from './Button'
import {
    getBorderRadius,
    getButtonHeight,
    getButtonStatus,
    getSkeletonBorderRadius,
    getSkeletonWidth,
    getButtonStyles,
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
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    disabled?: boolean
    onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void
    loading?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    fullWidth?: boolean
    width?: string | number
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between'
    state?: ButtonState
}
export type LinkButtonNativeProps = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    | 'href'
    | 'target'
    | 'rel'
    | 'onClick'
    | 'children'
    | 'className'
    | 'style'
    | 'dangerouslySetInnerHTML'
>

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
        leadingIcon,
        trailingIcon,
        disabled,
        onClick,
        loading,
        fullWidth,
        width,
        justifyContent = 'center',
        state = ButtonState.DEFAULT,
        href,
        target,
        rel,
        ...restHtmlProps
    } = props as LinkButtonProps & LinkButtonNativeProps

    const buttonTokens = useResponsiveTokens<ButtonTokensType>('BUTTON')
    const isSkeleton = showSkeleton ?? false
    const isLoading = (loading ?? false) && !isSkeleton
    const isDisabled = isSkeleton ? true : (disabled ?? false)
    const paddingTokens = buttonTokens.padding[size][buttonType][subType]
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
        buttonTokens
    )

    const linkProps = {
        ref,
        href: isDisabled ? undefined : href,
        target,
        rel,
        onClick: handleClick,
        display: 'flex',
        alignItems: 'center',
        justifyContent,
        width: fullWidth ? '100%' : (width ?? 'fit-content'),
        gap: buttonTokens.gap,
        ...(buttonHeight !== undefined && { height: buttonHeight }),
        background: buttonStyles.background,
        color: buttonStyles.color,
        borderRadius,
        border: buttonStyles.border,
        outline: buttonStyles.outline,
        transition: 'transform 0.15s ease-in-out',
        paddingX: paddingTokens.x,
        paddingY: paddingTokens.y,
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
                disabled,
                state,
                buttonType,
                subType,
                size,
                text,
                leadingIcon,
                trailingIcon,
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
        const skeletonWidth = getSkeletonWidth(fullWidth, width)

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
