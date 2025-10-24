'use client'

import type React from 'react'
import { toast as sonnerToast, Toaster as Snackbar } from 'sonner'
import {
    X,
    Info,
    CircleCheckBig,
    TriangleAlert,
    CircleAlert,
} from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import {
    type AddToastOptions,
    type CustomToastProps,
    SnackbarVariant,
} from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SnackbarTokens } from './snackbar.tokens'

type SnackbarIconProps = {
    variant: SnackbarVariant
}

const SnackbarIcon: React.FC<SnackbarIconProps> = ({ variant }) => {
    const snackbarTokens = useResponsiveTokens<SnackbarTokens>('SNACKBAR')
    const props = {
        color: snackbarTokens.infoIcon.color[variant],
        size: snackbarTokens.infoIcon.height,
    }
    if (variant == SnackbarVariant.SUCCESS) return <CircleCheckBig {...props} />
    else if (variant == SnackbarVariant.WARNING)
        return <TriangleAlert {...props} />
    else if (variant == SnackbarVariant.ERROR) return <CircleAlert {...props} />
    return <Info {...props} />
}

export const StyledToast: React.FC<CustomToastProps> = ({
    header,
    description,
    variant,
    onClose,
    actionButton,
    toastId,
}) => {
    const snackbarTokens = useResponsiveTokens<SnackbarTokens>('SNACKBAR')

    return (
        <Block
            display="flex"
            justifyContent="space-between"
            gap={snackbarTokens.gap}
            backgroundColor={snackbarTokens.backgroundColor}
            borderRadius={snackbarTokens.borderRadius}
            padding={snackbarTokens.padding}
            maxWidth={snackbarTokens.maxWidth}
            boxShadow={snackbarTokens.boxShadow}
        >
            {' '}
            {/*  need to fix line height to remove margin */}
            <Block marginTop={4}>
                <SnackbarIcon variant={variant} />
            </Block>
            <Block display="flex" gap={snackbarTokens.gap}>
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={snackbarTokens.content.gap}
                >
                    <Block
                        display="flex"
                        gap={snackbarTokens.content.textContainer.gap}
                        flexDirection="column"
                    >
                        <Text
                            color={
                                snackbarTokens.content.textContainer.header
                                    .color[variant]
                            }
                            fontSize={
                                snackbarTokens.content.textContainer.header
                                    .fontSize
                            }
                            fontWeight={
                                snackbarTokens.content.textContainer.header
                                    .fontWeight
                            }
                        >
                            {header}
                        </Text>
                        <Text
                            color={
                                snackbarTokens.content.textContainer.description
                                    .color[variant]
                            }
                            fontSize={
                                snackbarTokens.content.textContainer.description
                                    .fontSize
                            }
                            fontWeight={
                                snackbarTokens.content.textContainer.description
                                    .fontWeight
                            }
                        >
                            {description}
                        </Text>
                    </Block>
                    {actionButton && (
                        <PrimitiveButton
                            backgroundColor="transparent"
                            color={
                                snackbarTokens.actions.primaryAction.color[
                                    variant
                                ]
                            }
                            onClick={() => {
                                actionButton.onClick()
                                if (
                                    actionButton.autoDismiss !== false &&
                                    toastId
                                ) {
                                    sonnerToast.dismiss(toastId)
                                }
                            }}
                        >
                            <Text
                                color={
                                    snackbarTokens.actions.primaryAction.color[
                                        variant
                                    ]
                                }
                                fontSize={
                                    snackbarTokens.actions.primaryAction
                                        .fontSize
                                }
                                fontWeight={
                                    snackbarTokens.actions.primaryAction
                                        .fontWeight
                                }
                            >
                                {actionButton.label}
                            </Text>
                        </PrimitiveButton>
                    )}
                </Block>
            </Block>
            <Block>
                {' '}
                <PrimitiveButton
                    backgroundColor="transparent"
                    contentCentered
                    onClick={onClose}
                >
                    <X
                        size={snackbarTokens.actions.closeButton.height}
                        color={
                            snackbarTokens.actions.closeButton.color[variant]
                        }
                    />
                </PrimitiveButton>
            </Block>
        </Block>
    )
}

export const addSnackbar = ({
    header,
    description,
    variant = SnackbarVariant.INFO,
    onClose,
    actionButton,
    duration,
}: AddToastOptions) => {
    return sonnerToast.custom(
        (t) => (
            <StyledToast
                header={header}
                description={description}
                variant={variant}
                onClose={() => {
                    sonnerToast.dismiss(t)
                    onClose?.()
                }}
                actionButton={actionButton}
                toastId={t}
            />
        ),
        {
            duration,
        }
    )
}

// Export the Toaster component
export default Snackbar
