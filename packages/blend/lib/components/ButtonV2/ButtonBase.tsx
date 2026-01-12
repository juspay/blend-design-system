import { forwardRef } from 'react'
import styled from 'styled-components'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { ButtonV2Props } from './types'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import { LoaderCircle } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    getBorderRadius,
    getDefaultLineHeight,
    createButtonClickHandler,
    getButtonHeight,
    getIconMaxHeight,
    getButtonStatus,
    getButtonTabIndex,
    getButtonLayoutProps,
    getButtonActiveStyles,
    getButtonHoverStyles,
    getButtonFocusVisibleStyles,
    getButtonDisabledStyles,
    getIconColor,
    getTextColor,
    getButtonAriaLabel,
} from './utils'
import {
    getButtonAriaAttributes,
    createButtonKeyboardHandler,
} from '../../utils/accessibility'

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

export type ButtonBaseProps = Omit<
    ButtonV2Props,
    'showSkeleton' | 'skeletonVariant'
> & {
    isSkeleton?: boolean
    tokens?: ButtonTokensType
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
    (props, ref) => {
        const {
            buttonType = ButtonType.PRIMARY,
            size = ButtonSize.SMALL,
            subType = ButtonSubType.DEFAULT,
            text,
            leadingIcon,
            trailingIcon,
            disabled,
            onClick,
            loading,
            buttonGroupPosition,
            fullWidth,
            width,
            justifyContent = 'center',
            state = ButtonState.DEFAULT,
            isSkeleton = false,
            tokens,
            ...htmlProps
        } = props

        const defaultButtonTokens =
            useResponsiveTokens<ButtonTokensType>('BUTTON')
        const buttonTokens = tokens ?? defaultButtonTokens

        const isLoading = loading && !isSkeleton
        const isDisabled = isSkeleton ? true : (disabled ?? false)
        const paddingTokens = buttonTokens.padding[size][buttonType][subType]
        const lineHeight = getDefaultLineHeight()
        const buttonStatus = getButtonStatus(isLoading, isDisabled)
        const handleClick = createButtonClickHandler(
            onClick,
            isSkeleton ?? false,
            isDisabled,
            isLoading
        )

        const borderRadius = getBorderRadius(
            size,
            buttonType,
            subType,
            buttonGroupPosition,
            buttonTokens
        )
        const buttonHeight = getButtonHeight(subType)
        const iconMaxHeight = getIconMaxHeight(subType, size, buttonTokens)

        // Get aria label
        const ariaLabel = getButtonAriaLabel(
            isSkeleton,
            text,
            htmlProps['aria-label']
        )

        // Accessibility attributes
        const ariaAttrs = getButtonAriaAttributes({
            disabled: isDisabled,
            loading: isLoading,
            ariaLabel,
        })

        // Keyboard handler
        const keyboardHandler = createButtonKeyboardHandler(
            () => onClick?.(undefined as any),
            isDisabled ?? false
        )

        // Get layout props
        const buttonProps = getButtonLayoutProps(
            fullWidth,
            width,
            justifyContent,
            buttonHeight,
            buttonTokens.gap
        )

        // Get state styles
        const activeStyles = getButtonActiveStyles(
            isSkeleton,
            isDisabled,
            buttonType,
            subType,
            buttonTokens
        )
        const hoverStyles = getButtonHoverStyles(
            isSkeleton,
            buttonType,
            subType,
            buttonTokens
        )
        const focusVisibleStyles = getButtonFocusVisibleStyles(
            isSkeleton,
            buttonType,
            subType,
            buttonTokens
        )
        const disabledStyles = getButtonDisabledStyles(
            isSkeleton,
            buttonType,
            subType,
            buttonTokens
        )

        // Get icon and text colors
        const iconColor = getIconColor(
            isSkeleton,
            disabled,
            buttonType,
            subType,
            buttonTokens
        )
        const textColor = getTextColor(
            isSkeleton,
            disabled,
            state,
            buttonType,
            subType,
            buttonTokens
        )

        return (
            <PrimitiveButton
                {...buttonProps}
                ref={ref}
                onClick={handleClick}
                {...keyboardHandler}
                background={
                    isSkeleton
                        ? 'transparent'
                        : buttonTokens.backgroundColor[buttonType][subType]
                              .default
                }
                disabled={isDisabled}
                tabIndex={getButtonTabIndex(isDisabled, htmlProps.tabIndex)}
                color={
                    isSkeleton
                        ? 'transparent'
                        : buttonTokens.text.color[buttonType][subType].default
                }
                borderRadius={borderRadius}
                border={
                    isSkeleton
                        ? 'transparent'
                        : buttonTokens.border[buttonType][subType].default
                }
                outline={
                    isSkeleton
                        ? 'transparent'
                        : buttonTokens.outline[buttonType][subType].default
                }
                transition="transform 0.15s ease-in-out"
                {...ariaAttrs}
                _active={activeStyles}
                _hover={hoverStyles}
                _focusVisible={focusVisibleStyles}
                _disabled={disabledStyles}
                paddingX={paddingTokens.x}
                paddingY={paddingTokens.y}
                data-button={text}
                data-status={buttonStatus}
                {...htmlProps}
            >
                {isLoading ? (
                    <>
                        <LoaderCircle
                            size={16}
                            color={
                                buttonTokens.text.color[buttonType][subType]
                                    .default
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
                                    opacity: isSkeleton ? 0 : 1,
                                    maxHeight: iconMaxHeight,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    color: iconColor,
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
                                color={textColor}
                                aria-hidden={isSkeleton ? true : undefined}
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
                                    opacity: isSkeleton ? 0 : 1,
                                    maxHeight: iconMaxHeight,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    color: iconColor,
                                }}
                            >
                                {trailingIcon}
                            </Block>
                        )}
                    </>
                )}
            </PrimitiveButton>
        )
    }
)

ButtonBase.displayName = 'ButtonBase'

export default ButtonBase
