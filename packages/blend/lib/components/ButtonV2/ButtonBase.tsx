import { forwardRef, type MouseEvent } from 'react'
import styled from 'styled-components'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { ButtonV2Props } from './types'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    getBorderRadius,
    getDefaultLineHeight,
    getButtonHeight,
    getIconMaxHeight,
    getButtonStatus,
    getButtonTabIndex,
    getButtonStyles,
    getIconColor,
    getTextColor,
} from './utils'
import {
    getButtonAriaAttributes,
    createButtonKeyboardHandler,
} from '../../utils/accessibility'
import { LoadingSpinner } from './LoadingSpinner'

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

        const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            if (isSkeleton || isDisabled || isLoading) return
            onClick?.(event)
        }

        const borderRadius = getBorderRadius(
            size,
            buttonType,
            subType,
            buttonGroupPosition,
            buttonTokens
        )
        const buttonHeight = getButtonHeight(subType)
        const iconMaxHeight = getIconMaxHeight(subType, size, buttonTokens)

        const ariaLabel =
            isSkeleton && text && !htmlProps['aria-label']
                ? text
                : htmlProps['aria-label']

        const ariaAttrs = getButtonAriaAttributes({
            disabled: isDisabled,
            loading: isLoading,
            ariaLabel,
        })

        const keyboardHandler = createButtonKeyboardHandler(() => {
            if (!isDisabled && !isLoading && onClick) {
                const syntheticEvent = {
                    preventDefault: () => {},
                    stopPropagation: () => {},
                } as MouseEvent<HTMLButtonElement>
                onClick(syntheticEvent)
            }
        }, isDisabled)

        const buttonStyles = getButtonStyles(
            isSkeleton,
            isDisabled,
            buttonType,
            subType,
            buttonTokens
        )

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
                ref={ref}
                onClick={handleClick}
                {...keyboardHandler}
                display="flex"
                alignItems="center"
                justifyContent={justifyContent}
                width={fullWidth ? '100%' : (width ?? 'fit-content')}
                height={buttonHeight}
                gap={buttonTokens.gap}
                background={buttonStyles.background}
                disabled={isDisabled}
                tabIndex={getButtonTabIndex(isDisabled, htmlProps.tabIndex)}
                color={buttonStyles.color}
                borderRadius={borderRadius}
                border={buttonStyles.border}
                outline={buttonStyles.outline}
                transition="transform 0.15s ease-in-out"
                {...ariaAttrs}
                _active={buttonStyles._active}
                _hover={buttonStyles._hover}
                _focusVisible={buttonStyles._focusVisible}
                _disabled={buttonStyles._disabled}
                paddingX={paddingTokens.x}
                paddingY={paddingTokens.y}
                data-button={text}
                data-status={buttonStatus}
                {...htmlProps}
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner
                            size={16}
                            color={String(
                                buttonTokens.text.color[buttonType][subType]
                                    .default
                            )}
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
