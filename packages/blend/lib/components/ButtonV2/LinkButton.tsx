import { forwardRef } from 'react'
import PrimitiveLink from '../Primitives/PrimitiveLink'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { getSkeletonState } from '../Skeleton/utils'
import Skeleton from '../Skeleton/Skeleton'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { LoaderCircle } from 'lucide-react'
import {
    getBorderRadius,
    getDefaultLineHeight,
    getButtonHeight,
    getIconMaxHeight,
    getButtonStatus,
    getSkeletonBorderRadius,
    getSkeletonWidth,
} from './utils'
import { getButtonAriaAttributes } from '../../utils/accessibility'
import { FOUNDATION_THEME } from '../../tokens'
import styled from 'styled-components'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
`

export interface LinkButtonProps {
    /**
     * URL to navigate to
     */
    href: string
    /**
     * Link target (e.g., '_blank', '_self')
     */
    target?: string
    /**
     * Link rel attribute
     */
    rel?: string
    /**
     * Button type variant
     */
    buttonType?: ButtonType
    /**
     * Button size
     */
    size?: ButtonSize
    /**
     * Button subtype (default, icon only, inline)
     */
    subType?: ButtonSubType
    /**
     * Button text label
     */
    text?: string
    /**
     * Leading icon element
     */
    leadingIcon?: React.ReactNode
    /**
     * Trailing icon element
     */
    trailingIcon?: React.ReactNode
    /**
     * Disabled state
     */
    disabled?: boolean
    /**
     * Click handler (optional, for tracking, etc.)
     */
    onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void
    /**
     * Loading state - shows spinner
     */
    loading?: boolean
    /**
     * Show skeleton loading state
     */
    showSkeleton?: boolean
    /**
     * Skeleton animation variant
     */
    skeletonVariant?: SkeletonVariant
    /**
     * Full width button
     */
    fullWidth?: boolean
    /**
     * Custom width
     */
    width?: string | number
    /**
     * Content justification
     */
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between'
    /**
     * Button state for styling
     */
    state?: ButtonState
}

// Forward rest of the props as native anchor attributes
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

/**
 * LinkButton Component
 *
 * A button-styled link component for navigation.
 * Uses anchor element for proper SEO and accessibility.
 *
 * @example
 * ```tsx
 * <LinkButton
 *   href="/docs"
 *   text="View Documentation"
 *   buttonType={ButtonType.PRIMARY}
 *   size={ButtonSize.MEDIUM}
 * />
 * ```
 */
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
    const { shouldShowSkeleton } = getSkeletonState(showSkeleton)

    const isLoading = loading && !shouldShowSkeleton
    const isDisabled = shouldShowSkeleton ? true : (disabled ?? false)
    const paddingTokens = buttonTokens.padding[size][buttonType][subType]
    const lineHeight = getDefaultLineHeight()
    const buttonStatus = getButtonStatus(isLoading, isDisabled)

    const borderRadius = getBorderRadius(
        size,
        buttonType,
        subType,
        undefined,
        buttonTokens
    )
    const buttonHeight = getButtonHeight(subType)
    const iconMaxHeight = getIconMaxHeight(subType, size, buttonTokens)

    // Accessibility attributes - extract aria-label for use in getButtonAriaAttributes
    const ariaLabel = restHtmlProps['aria-label']
    const ariaAttrs = getButtonAriaAttributes({
        disabled: isDisabled,
        loading: isLoading,
        ariaLabel,
    })

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (shouldShowSkeleton || isDisabled || isLoading) {
            event.preventDefault()
            return
        }
        onClick?.(event)
    }

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
        background: shouldShowSkeleton
            ? 'transparent'
            : buttonTokens.backgroundColor[buttonType][subType].default,
        color: shouldShowSkeleton
            ? 'transparent'
            : buttonTokens.text.color[buttonType][subType].default,
        borderRadius,
        border: shouldShowSkeleton
            ? 'transparent'
            : buttonTokens.border[buttonType][subType].default,
        outline: shouldShowSkeleton
            ? 'transparent'
            : buttonTokens.outline[buttonType][subType].default,
        transition: 'transform 0.15s ease-in-out',
        paddingX: paddingTokens.x,
        paddingY: paddingTokens.y,
        ...ariaAttrs,
        _active:
            shouldShowSkeleton || isDisabled
                ? undefined
                : {
                      background:
                          buttonTokens.backgroundColor[buttonType][subType]
                              .active,
                      border: buttonTokens.border[buttonType][subType].active,
                      boxShadow:
                          buttonTokens.shadow[buttonType][subType].active,
                      transform: 'scale(0.99)',
                  },
        _hover: shouldShowSkeleton
            ? undefined
            : {
                  background:
                      buttonTokens.backgroundColor[buttonType][subType].hover,
                  color: buttonTokens.text.color[buttonType][subType].hover,
                  border: buttonTokens.border[buttonType][subType].hover,
              },
        _focusVisible: shouldShowSkeleton
            ? undefined
            : {
                  border: buttonTokens.border[buttonType][subType].default,
                  outline: buttonTokens.outline[buttonType][subType].active,
                  outlineOffset: FOUNDATION_THEME.unit[2],
              },
        _disabled: shouldShowSkeleton
            ? {
                  background: 'transparent',
                  border: 'transparent',
                  cursor: 'default',
              }
            : {
                  background:
                      buttonTokens.backgroundColor[buttonType][subType]
                          .disabled,
                  border: buttonTokens.border[buttonType][subType].disabled,
                  cursor: 'not-allowed',
              },
        'data-button': text,
        'data-status': buttonStatus,
        ...restHtmlProps,
    }

    if (shouldShowSkeleton) {
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
                <PrimitiveLink {...linkProps} />
            </Skeleton>
        )
    }

    return (
        <PrimitiveLink {...linkProps}>
            {isLoading ? (
                <>
                    <LoaderCircle
                        size={16}
                        color={
                            buttonTokens.text.color[buttonType][subType].default
                        }
                        data-status="loading"
                        aria-hidden="true"
                        style={{
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                    <VisuallyHidden aria-live="polite">
                        Loading, please wait
                    </VisuallyHidden>
                </>
            ) : (
                <>
                    {leadingIcon && (
                        <Block
                            as="span"
                            contentCentered
                            data-element="leading-icon"
                            aria-hidden={text ? 'true' : undefined}
                            style={{
                                opacity: shouldShowSkeleton ? 0 : 1,
                                maxHeight: iconMaxHeight,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                color: shouldShowSkeleton
                                    ? 'transparent'
                                    : buttonTokens.text.color[buttonType][
                                          subType
                                      ][disabled ? 'disabled' : 'default'],
                            }}
                        >
                            {leadingIcon}
                        </Block>
                    )}
                    {text && (
                        <Text
                            fontSize={buttonTokens.text.fontSize[size]}
                            fontWeight={buttonTokens.text.fontWeight[size]}
                            as="span"
                            color={
                                shouldShowSkeleton
                                    ? 'transparent'
                                    : buttonTokens.text.color[buttonType][
                                          subType
                                      ][
                                          disabled || shouldShowSkeleton
                                              ? 'disabled'
                                              : state
                                      ]
                            }
                            aria-hidden={shouldShowSkeleton ? true : undefined}
                            lineHeight={lineHeight}
                            textAlign="center"
                            data-id={text}
                        >
                            {text}
                        </Text>
                    )}
                    {trailingIcon && (
                        <Block
                            as="span"
                            contentCentered
                            data-element="trailing-icon"
                            aria-hidden={text ? 'true' : undefined}
                            style={{
                                opacity: shouldShowSkeleton ? 0 : 1,
                                maxHeight: iconMaxHeight,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                color: shouldShowSkeleton
                                    ? 'transparent'
                                    : buttonTokens.text.color[buttonType][
                                          subType
                                      ][disabled ? 'disabled' : 'default'],
                            }}
                        >
                            {trailingIcon}
                        </Block>
                    )}
                </>
            )}
        </PrimitiveLink>
    )
})

LinkButton.displayName = 'LinkButton'

export default LinkButton
