import React from 'react'
import { X } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import {
    AlertActionPlacement,
    type AlertProps,
    AlertStyle,
    AlertVariant,
} from './types'
import type { CSSObject } from 'styled-components'
import type { AlertTokenType } from './alert.tokens'
import Text from '../Text/Text'
import { forwardRef } from 'react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            heading,
            description,
            variant = AlertVariant.PRIMARY,
            style = AlertStyle.SUBTLE,
            primaryAction,
            secondaryAction,
            onClose,
            icon,
            actionPlacement = AlertActionPlacement.RIGHT,
        },
        ref
    ) => {
        const alertTokens = useResponsiveTokens<AlertTokenType>('ALERT')

        // this is to make sure that the close button is always visible if there is an onClose prop
        // but no primary or secondary actions are provided
        if (
            onClose &&
            primaryAction === undefined &&
            secondaryAction === undefined
        ) {
            actionPlacement = AlertActionPlacement.BOTTOM
        }
        return (
            <Block
                ref={ref}
                maxWidth={alertTokens.maxWidth}
                backgroundColor={alertTokens.background[variant][style]}
                padding={alertTokens.padding}
                borderRadius={alertTokens.borderRadius}
                display="flex"
                flexDirection="column"
                gap={alertTokens.gap}
                border={alertTokens.border[variant][style]}
            >
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={FOUNDATION_THEME.unit[8]}
                >
                    <Block
                        display="flex"
                        contentCentered
                        gap={FOUNDATION_THEME.unit[8]}
                    >
                        {icon && (
                            <Block
                                size={FOUNDATION_THEME.unit[16]}
                                contentCentered
                            >
                                {icon}
                            </Block>
                        )}
                        <Text
                            data-alert-heading={heading}
                            color={alertTokens.text.heading.color[variant]}
                            fontWeight={alertTokens.text.heading.fontWeight}
                            fontSize={alertTokens.text.heading.fontSize}
                            lineHeight={alertTokens.text.heading.lineHeight}
                        >
                            {heading}
                        </Text>
                    </Block>
                    {onClose &&
                        actionPlacement === AlertActionPlacement.BOTTOM && (
                            <AlertCloseButton
                                onClick={onClose}
                                $color={
                                    alertTokens.button.closeButton.color[
                                        variant
                                    ]
                                }
                            >
                                <X
                                    size={16}
                                    color={FOUNDATION_THEME.colors.gray[800]}
                                />
                            </AlertCloseButton>
                        )}
                </Block>
                <Block
                    paddingLeft={icon ? FOUNDATION_THEME.unit[24] : 0}
                    display="flex"
                    flexDirection={
                        actionPlacement === AlertActionPlacement.BOTTOM
                            ? 'column'
                            : 'row'
                    }
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap={FOUNDATION_THEME.unit[18]}
                >
                    <Text
                        data-alert-description={description}
                        fontWeight={alertTokens.text.description.fontWeight}
                        fontSize={alertTokens.text.description.fontSize}
                        lineHeight={alertTokens.text.description.lineHeight}
                        color={alertTokens.text.description.color[variant]}
                    >
                        {description}
                    </Text>
                    {(primaryAction || secondaryAction) && (
                        <Block display="flex" gap={FOUNDATION_THEME.unit[16]}>
                            {(primaryAction || secondaryAction) && (
                                <Block
                                    as="span"
                                    display="flex"
                                    gap={alertTokens.button.gap}
                                >
                                    {primaryAction && (
                                        <PrimitiveButton
                                            onClick={primaryAction.onClick}
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                cursor: 'pointer',
                                                color: alertTokens.button
                                                    .primaryAction.color[
                                                    variant
                                                ],

                                                fontWeight:
                                                    alertTokens.button
                                                        .primaryAction
                                                        .fontWeight,
                                                fontSize:
                                                    alertTokens.button
                                                        .primaryAction.fontSize,
                                                width: 'fit-content',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {primaryAction.label}
                                        </PrimitiveButton>
                                    )}
                                    {secondaryAction && (
                                        <>
                                            <PrimitiveButton
                                                onClick={
                                                    secondaryAction.onClick
                                                }
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    cursor: 'pointer',
                                                    color: alertTokens.button
                                                        .secondaryAction.color[
                                                        variant
                                                    ],

                                                    fontWeight:
                                                        alertTokens.button
                                                            .secondaryAction
                                                            .fontWeight,
                                                    fontSize:
                                                        alertTokens.button
                                                            .secondaryAction
                                                            .fontSize,
                                                    width: 'fit-content',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {secondaryAction.label}
                                            </PrimitiveButton>
                                        </>
                                    )}
                                </Block>
                            )}
                            {onClose &&
                                actionPlacement ===
                                    AlertActionPlacement.RIGHT && (
                                    <>
                                        <Block
                                            as="span"
                                            aria-hidden="true"
                                            width={'1px'}
                                            height={FOUNDATION_THEME.unit[20]}
                                            backgroundColor={
                                                FOUNDATION_THEME.colors
                                                    .gray[300]
                                            }
                                        />
                                        <AlertCloseButton
                                            onClick={onClose}
                                            $color={
                                                alertTokens.button.closeButton
                                                    .color[variant]
                                            }
                                        >
                                            <X
                                                size={16}
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[800]
                                                }
                                            />
                                        </AlertCloseButton>
                                    </>
                                )}
                        </Block>
                    )}
                </Block>
            </Block>
        )
    }
)

const AlertCloseButton = ({
    $color,
    children,
    onClick,
}: {
    $color: CSSObject['color']
    children: React.ReactNode
    onClick: () => void
}) => {
    return (
        <PrimitiveButton
            border={'none'}
            backgroundColor={'transparent'}
            className="debug"
            color={$color}
            contentCentered
            _focusVisible={{
                outline: `1px solid ${$color}`,
            }}
            onClick={onClick}
        >
            {children}
        </PrimitiveButton>
    )
}

Alert.displayName = 'Alert'

export default Alert
