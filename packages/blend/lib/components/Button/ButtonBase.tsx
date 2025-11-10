import { forwardRef } from 'react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { ButtonProps } from './types'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import { LoaderCircle } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

export type ButtonBaseProps = Omit<
    ButtonProps,
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

        const getBorderRadius = () => {
            const variantBorderRadius =
                buttonTokens.borderRadius[size][buttonType][subType].default
            if (buttonGroupPosition === undefined) return variantBorderRadius
            if (buttonGroupPosition === 'left') {
                return `${variantBorderRadius} 0 0 ${variantBorderRadius}`
            } else if (buttonGroupPosition === 'right') {
                return `0 ${variantBorderRadius} ${variantBorderRadius} 0`
            }
            return `0px 0px 0px 0px`
        }

        const isLoading = loading && !isSkeleton
        const isDisabled = isSkeleton ? true : disabled

        return (
            <PrimitiveButton
                ref={ref}
                onClick={isSkeleton ? undefined : onClick}
                display="flex"
                alignItems="center"
                justifyContent={justifyContent}
                width={fullWidth ? '100%' : (width ?? 'fit-content')}
                height={
                    subType === ButtonSubType.INLINE ? 'fit-content' : 'auto'
                }
                gap={buttonTokens.gap}
                background={
                    isSkeleton
                        ? 'transparent'
                        : buttonTokens.backgroundColor[buttonType][subType]
                              .default
                }
                disabled={isDisabled}
                color={
                    isSkeleton
                        ? 'transparent'
                        : buttonTokens.text.color[buttonType][subType].default
                }
                borderRadius={getBorderRadius()}
                padding={buttonTokens.padding[size][buttonType][subType]}
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
                _active={
                    isSkeleton || isDisabled
                        ? undefined
                        : {
                              background:
                                  buttonTokens.backgroundColor[buttonType][
                                      subType
                                  ].active,
                              border: buttonTokens.border[buttonType][subType]
                                  .active,
                              boxShadow:
                                  buttonTokens.shadow[buttonType][subType]
                                      .active,
                          }
                }
                _hover={
                    isSkeleton
                        ? undefined
                        : {
                              border: buttonTokens.border[buttonType][subType]
                                  .hover,
                              background:
                                  buttonTokens.backgroundColor[buttonType][
                                      subType
                                  ].hover,
                              outline:
                                  buttonTokens.outline[buttonType][subType]
                                      .hover,
                              color: buttonTokens.text.color[buttonType][
                                  subType
                              ].hover,
                          }
                }
                _focusVisible={
                    isSkeleton
                        ? undefined
                        : {
                              border: buttonTokens.border[buttonType][subType]
                                  .default,
                              outline:
                                  buttonTokens.outline[buttonType][subType]
                                      .active,
                          }
                }
                _disabled={
                    isSkeleton
                        ? {
                              background: 'transparent',
                              border: 'transparent',
                              cursor: 'default',
                          }
                        : {
                              background:
                                  buttonTokens.backgroundColor[buttonType][
                                      subType
                                  ].disabled,
                              border: buttonTokens.border[buttonType][subType]
                                  .disabled,
                              cursor: 'not-allowed',
                          }
                }
                {...htmlProps}
            >
                {isLoading ? (
                    <LoaderCircle
                        size={16}
                        color={
                            buttonTokens.text.color[buttonType][subType].default
                        }
                        style={{
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                ) : (
                    <>
                        {leadingIcon && (
                            <Block
                                as="span"
                                contentCentered
                                data-button-left-slot
                                style={{ opacity: isSkeleton ? 0 : 1 }}
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
                                    isSkeleton
                                        ? 'transparent'
                                        : buttonTokens.text.color[buttonType][
                                              subType
                                          ][state]
                                }
                                aria-hidden={isSkeleton ? true : undefined}
                            >
                                {text}
                            </Text>
                        )}
                        {trailingIcon && (
                            <Block
                                as="span"
                                contentCentered
                                data-button-right-slot
                                style={{ opacity: isSkeleton ? 0 : 1 }}
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
