'use client'

import type React from 'react'
import { useId, useEffect } from 'react'
import { toast as sonnerToast, Toaster } from 'sonner'
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
    SnackbarPosition,
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
        'aria-hidden': 'true' as const,
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
    ...props
}) => {
    const snackbarTokens = useResponsiveTokens<SnackbarTokens>('SNACKBAR')
    const baseId = useId()
    const role =
        variant === SnackbarVariant.ERROR || variant === SnackbarVariant.WARNING
            ? 'alert'
            : 'status'
    const idPrefix = toastId ? `snackbar-${toastId}` : baseId
    const headerId = `${idPrefix}-header`
    const descriptionId = description ? `${idPrefix}-description` : undefined

    return (
        <Block
            role={role}
            aria-labelledby={headerId}
            aria-describedby={descriptionId}
            data-snackbar={header ?? 'snackbar'}
            data-status={variant}
            display="flex"
            justifyContent="space-between"
            gap={snackbarTokens.gap}
            backgroundColor={snackbarTokens.backgroundColor}
            borderRadius={snackbarTokens.borderRadius}
            padding={snackbarTokens.padding}
            maxWidth={snackbarTokens.maxWidth}
            boxShadow={snackbarTokens.boxShadow}
            {...props}
        >
            <Block marginTop={4} data-element="icon" aria-hidden="true">
                <SnackbarIcon variant={variant} />
            </Block>
            <Block
                display="flex"
                gap={snackbarTokens.gap}
                data-element="content"
            >
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
                            id={headerId}
                            as="p"
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
                            data-element="header"
                            data-id={header}
                        >
                            {header}
                        </Text>
                        {description && (
                            <Text
                                id={descriptionId}
                                as="p"
                                color={
                                    snackbarTokens.content.textContainer
                                        .description.color[variant]
                                }
                                fontSize={
                                    snackbarTokens.content.textContainer
                                        .description.fontSize
                                }
                                fontWeight={
                                    snackbarTokens.content.textContainer
                                        .description.fontWeight
                                }
                                data-element="description"
                                data-id={description}
                            >
                                {description}
                            </Text>
                        )}
                    </Block>
                    {actionButton && (
                        <PrimitiveButton
                            backgroundColor="transparent"
                            color={
                                snackbarTokens.actions.primaryAction.color[
                                    variant
                                ]
                            }
                            aria-label={actionButton.label}
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
                <PrimitiveButton
                    backgroundColor="transparent"
                    contentCentered
                    onClick={onClose}
                    aria-label="Close notification"
                    data-element="close-button"
                >
                    <X
                        size={snackbarTokens.actions.closeButton.height}
                        color={
                            snackbarTokens.actions.closeButton.color[variant]
                        }
                        aria-hidden="true"
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
    position,
}: AddToastOptions) => {
    // Determine if position includes "center" for proper alignment
    const isCenter = position?.includes('center')

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
            position,
            unstyled: true,
            style: {
                display: 'flex',
                justifyContent: 'center',
                width: isCenter ? '100%' : 'fit-content',
                maxWidth: 'calc(100vw - 32px)',
                margin: 0,
                padding: 0,
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
            },
        }
    )
}

type SnackbarProps = {
    position?: SnackbarPosition
    dismissOnClickAway?: boolean
}

const Snackbar: React.FC<SnackbarProps> = ({
    position = SnackbarPosition.BOTTOM_RIGHT,
    dismissOnClickAway = false,
}) => {
    const isCenter = position?.includes('center')

    // Handle click away to dismiss all snackbars
    useEffect(() => {
        if (!dismissOnClickAway) {
            return
        }

        const handleClickAway = (event: MouseEvent) => {
            const target = event.target as Node

            // Check if click is on a snackbar element
            const clickedSnackbar = (target as Element)?.closest(
                '[data-snackbar]'
            )

            // If click is not on a snackbar, dismiss all snackbars
            if (!clickedSnackbar) {
                sonnerToast.dismiss()
            }
        }

        document.addEventListener('mousedown', handleClickAway)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
        }
    }, [dismissOnClickAway])

    return (
        <Toaster
            position={position}
            toastOptions={{
                unstyled: true,
                style: {
                    display: 'flex',
                    justifyContent: 'center',
                    width: isCenter ? '100%' : 'fit-content',
                    maxWidth: 'calc(100vw - 32px)',
                    margin: 0,
                    padding: 0,
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                },
            }}
        />
    )
}

export default Snackbar
