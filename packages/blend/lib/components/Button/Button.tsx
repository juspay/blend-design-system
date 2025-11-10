import { forwardRef } from 'react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ButtonSkeleton } from './ButtonSkeleton'
import type { ButtonProps } from './types'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import { LoaderCircle } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { getSkeletonState } from '../Skeleton/utils'

type ButtonBaseProps = Omit<ButtonProps, 'showSkeleton' | 'skeletonVariant'>

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
            ...htmlProps
        } = props

        const buttonTokens = useResponsiveTokens<ButtonTokensType>('BUTTON')

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

        return (
            <PrimitiveButton
                ref={ref}
                onClick={onClick}
                display="flex"
                alignItems="center"
                justifyContent={justifyContent}
                width={fullWidth ? '100%' : (width ?? 'fit-content')}
                height={
                    subType === ButtonSubType.INLINE ? 'fit-content' : 'auto'
                }
                gap={buttonTokens.gap}
                background={
                    buttonTokens.backgroundColor[buttonType][subType].default
                }
                disabled={disabled}
                color={buttonTokens.text.color[buttonType][subType].default}
                borderRadius={getBorderRadius()}
                padding={buttonTokens.padding[size][buttonType][subType]}
                border={buttonTokens.border[buttonType][subType].default}
                outline={buttonTokens.outline[buttonType][subType].default}
                _active={
                    !disabled
                        ? {
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
                        : undefined
                }
                _hover={{
                    border: buttonTokens.border[buttonType][subType].hover,
                    background:
                        buttonTokens.backgroundColor[buttonType][subType].hover,
                    outline: buttonTokens.outline[buttonType][subType].hover,
                    color: buttonTokens.text.color[buttonType][subType].hover,
                }}
                _focusVisible={{
                    border: buttonTokens.border[buttonType][subType].default,
                    outline: buttonTokens.outline[buttonType][subType].active,
                }}
                _disabled={{
                    background:
                        buttonTokens.backgroundColor[buttonType][subType]
                            .disabled,
                    border: buttonTokens.border[buttonType][subType].disabled,
                    cursor: 'not-allowed',
                }}
                {...htmlProps}
            >
                {loading ? (
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
                                    buttonTokens.text.color[buttonType][
                                        subType
                                    ][state]
                                }
                                data-button-text={text}
                            >
                                {text}
                            </Text>
                        )}
                        {trailingIcon && (
                            <Block
                                as="span"
                                contentCentered
                                data-button-right-slot
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        showSkeleton = false,
        skeletonVariant = 'pulse',
        ...buttonProps
    } = props

    const { shouldShowSkeleton } = getSkeletonState(showSkeleton)

    if (shouldShowSkeleton) {
        return (
            <ButtonSkeleton
                skeletonVariant={skeletonVariant}
                {...buttonProps}
            />
        )
    }

    return <ButtonBase ref={ref} {...buttonProps} />
})

Button.displayName = 'Button'

export default Button
