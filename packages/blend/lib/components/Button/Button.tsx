import { forwardRef } from 'react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import type { ButtonProps } from './types'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import Text from '../Text/Text'
import { LoaderCircle } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useRipple, RippleContainer } from '../animations/Ripple'
import { FOUNDATION_THEME } from '../../tokens'

const formatLineHeight = (
    value?: number | string | null
): string | undefined => {
    if (value === undefined || value === null) return undefined
    return typeof value === 'number' ? `${value}px` : value
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
            state = ButtonState.DEFAULT,
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
                buttonTokens.borderRadius[size][buttonType][subType].default
            if (buttonGroupPosition === undefined) return variantBorderRadius
            if (buttonGroupPosition === 'left') {
                return `${variantBorderRadius} 0 0 ${variantBorderRadius}`
            } else if (buttonGroupPosition === 'right') {
                return `0 ${variantBorderRadius} ${variantBorderRadius} 0`
            }
            return `0px 0px 0px 0px`
        }

        const lineHeight = formatLineHeight(
            FOUNDATION_THEME.font.size.body.md.lineHeight
        )

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
                color={buttonTokens.text.color[buttonType][subType].default}
                borderRadius={getBorderRadius()}
                paddingX={buttonTokens.padding[size][buttonType][subType].x}
                paddingY={buttonTokens.padding[size][buttonType][subType].y}
                border={buttonTokens.border[buttonType][subType].default}
                position="relative"
                overflow="hidden"
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
                    background:
                        buttonTokens.backgroundColor[buttonType][subType].hover,
                    color: buttonTokens.text.color[buttonType][subType].hover,
                }}
                _focusVisible={{
                    border: buttonTokens.border[buttonType][subType].default,
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
                                lineHeight={lineHeight}
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
                <RippleContainer ripples={ripples} />
            </PrimitiveButton>
        )
    }
)

Button.displayName = 'Button'

export default Button
