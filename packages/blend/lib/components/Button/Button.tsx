import { forwardRef } from 'react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import type { ButtonV2Props } from './types'
import { ButtonSize, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import Text from '../Text/Text'
import { LoaderCircle } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useRipple, RippleContainer } from '../animations/Ripple'

const Button = forwardRef<HTMLButtonElement, ButtonV2Props>(
    (
        {
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
            justifyContent = 'center',
            ...htmlProps
        },
        ref
    ) => {
        const buttonTokens = useResponsiveTokens<ButtonTokensType>('BUTTON')
        const { ripples, createRipple } = useRipple()

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!disabled && !loading) {
                createRipple(event)
                onClick?.()
            }
        }

        const getBorderRadius = () => {
            const variantBorderRadius =
                buttonTokens.borderRadius[buttonType][subType].default
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
                onClick={handleClick}
                display="flex"
                alignItems="center"
                justifyContent={justifyContent}
                width={fullWidth ? '100%' : 'fit-content'}
                height={
                    subType === ButtonSubType.INLINE ? 'fit-content' : 'auto'
                }
                gap={buttonTokens.gap}
                background={
                    buttonTokens.backgroundColor[buttonType][subType].default
                }
                disabled={disabled}
                color={buttonTokens.color[buttonType][subType].default}
                borderRadius={getBorderRadius()}
                padding={buttonTokens.padding[size][subType]}
                outline={buttonTokens.border[buttonType][subType].default}
                // outline={buttonTokens.outline[buttonType][subType].default}
                position="relative"
                overflow="hidden"
                _active={
                    !disabled
                        ? {
                              background:
                                  buttonTokens.backgroundColor[buttonType][
                                      subType
                                  ].active,
                              outline:
                                  buttonTokens.border[buttonType][subType]
                                      .active,
                              boxShadow:
                                  buttonTokens.shadow[buttonType][subType]
                                      .active,
                          }
                        : undefined
                }
                _hover={{
                    // border: buttonTokens.border[buttonType][subType].hover,
                    background:
                        buttonTokens.backgroundColor[buttonType][subType].hover,
                    outline: buttonTokens.outline[buttonType][subType].hover,
                    color: buttonTokens.color[buttonType][subType].hover,
                }}
                _focusVisible={{
                    // border: buttonTokens.border[buttonType][subType].default,
                    outline: buttonTokens.outline[buttonType][subType].active,
                }}
                _disabled={{
                    background:
                        buttonTokens.backgroundColor[buttonType][subType]
                            .disabled,
                    outline: buttonTokens.border[buttonType][subType].disabled,
                    color: buttonTokens.color[buttonType][subType].disabled,
                    cursor: 'not-allowed',
                }}
                {...htmlProps}
            >
                {loading ? (
                    <LoaderCircle
                        size={16}
                        color={buttonTokens.color[buttonType][subType].default}
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
                                variant="body.md"
                                style={{
                                    fontWeight: 500,
                                }}
                                as="span"
                                color="inherit"
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
                <RippleContainer ripples={ripples} />
            </PrimitiveButton>
        )
    }
)

Button.displayName = 'Button'

export default Button
