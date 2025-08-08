'use client'

import type React from 'react'
import { toast as sonnerToast, Toaster as Snackbar } from 'sonner'
import { Info, X } from 'lucide-react'
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

export const StyledToast: React.FC<CustomToastProps> = ({
    header,
    description,
    variant,
    onClose,
    actionButton,
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
            minWidth={snackbarTokens.minWidth}
            maxWidth={snackbarTokens.maxWidth}
            boxShadow={snackbarTokens.boxShadow}
        >
            <Block display="flex" gap={snackbarTokens.content.gap}>
                <Block paddingTop={'4px'}>
                    <Info
                        size={snackbarTokens.content.infoIcon.size[variant]}
                        color={snackbarTokens.content.infoIcon.color[variant]}
                    />
                </Block>
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={snackbarTokens.content.container.gap}
                >
                    <Block
                        display="flex"
                        gap={snackbarTokens.content.container.textContainer.gap}
                        flexDirection="column"
                    >
                        <Text
                            color={
                                snackbarTokens.content.container.textContainer
                                    .header.color
                            }
                            fontSize={
                                snackbarTokens.content.container.textContainer
                                    .header.fontSize
                            }
                            fontWeight={
                                snackbarTokens.content.container.textContainer
                                    .header.fontWeight
                            }
                        >
                            {header}
                        </Text>
                        <Text
                            color={
                                snackbarTokens.content.container.textContainer
                                    .description.color
                            }
                            fontSize={
                                snackbarTokens.content.container.textContainer
                                    .description.fontSize
                            }
                            fontWeight={
                                snackbarTokens.content.container.textContainer
                                    .description.fontWeight
                            }
                        >
                            {description}
                        </Text>
                    </Block>
                    {actionButton && (
                        <PrimitiveButton
                            backgroundColor="transparent"
                            paddingX={
                                snackbarTokens.content.container.actionButton
                                    .layout.paddingX
                            }
                            color={
                                snackbarTokens.content.container.actionButton
                                    .text.color
                            }
                            onClick={actionButton.onClick}
                        >
                            <Text
                                color={
                                    snackbarTokens.content.container
                                        .actionButton.text.color
                                }
                                fontSize={
                                    snackbarTokens.content.container
                                        .actionButton.text.fontSize
                                }
                                fontWeight={
                                    snackbarTokens.content.container
                                        .actionButton.text.fontWeight
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
                        size={snackbarTokens.crossIcon.size}
                        color={snackbarTokens.crossIcon.color}
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
}: AddToastOptions) => {
    return sonnerToast.custom((t) => (
        <StyledToast
            header={header}
            description={description}
            variant={variant}
            onClose={() => {
                sonnerToast.dismiss(t)
                onClose?.()
            }}
            actionButton={actionButton}
        />
    ))
}

// Export the Toaster component
export default Snackbar
