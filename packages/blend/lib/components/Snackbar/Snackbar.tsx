'use client'

import type React from 'react'
import { toast as sonnerToast, Toaster as Snackbar } from 'sonner'
import { X, Info, CircleCheckBig, TriangleAlert, CircleAlert } from 'lucide-react'
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
        color: snackbarTokens.container.infoIcon[variant].color,
        size: snackbarTokens.container.infoIcon[variant].size as number
    }
    if (variant == SnackbarVariant.SUCCESS) return <CircleCheckBig {...props} />
    else if (variant == SnackbarVariant.WARNING) return <TriangleAlert {...props} />
    else if (variant == SnackbarVariant.ERROR) return <CircleAlert {...props} />
    return <Info {...props} />
}

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
            <Block display="flex" gap={snackbarTokens.container.gap}>
                <Block paddingTop={'4px'}>
                    <SnackbarIcon variant={variant} />
                </Block>
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={snackbarTokens.container.content.gap}
                >
                    <Block
                        display="flex"
                        gap={snackbarTokens.container.content.textContainer.gap}
                        flexDirection="column"
                    >
                        <Text
                            color={
                                snackbarTokens.container.content.textContainer
                                    .header.color
                            }
                            fontSize={
                                snackbarTokens.container.content.textContainer
                                    .header.fontSize
                            }
                            fontWeight={
                                snackbarTokens.container.content.textContainer
                                    .header.fontWeight
                            }
                        >
                            {header}
                        </Text>
                        <Text
                            color={
                                snackbarTokens.container.content.textContainer
                                    .description.color
                            }
                            fontSize={
                                snackbarTokens.container.content.textContainer
                                    .description.fontSize
                            }
                            fontWeight={
                                snackbarTokens.container.content.textContainer
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
                                snackbarTokens.container.content.actionButton
                                    .padding
                            }
                            color={
                                snackbarTokens.container.content.actionButton
                                    .color
                            }
                            onClick={actionButton.onClick}
                        >
                            <Text
                                color={
                                    snackbarTokens.container.content
                                        .actionButton.color
                                }
                                fontSize={
                                    snackbarTokens.container.content
                                        .actionButton.fontSize
                                }
                                fontWeight={
                                    snackbarTokens.container.content
                                        .actionButton.fontWeight
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
