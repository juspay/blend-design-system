import type React from 'react'
import { useId, useEffect, forwardRef } from 'react'
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
    type SnackbarV2ToastOptions,
    type SnackbarV2ToastProps,
    SnackbarV2Variant,
    SnackbarV2Position,
    SnackbarV2Props,
    SnackbarV2IconProps,
} from './snackbarV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SnackbarV2TokensType } from './snackbarV2.tokens'

const SnackbarV2Icon: React.FC<SnackbarV2IconProps> = ({ variant }) => {
    const snackbarTokens =
        useResponsiveTokens<SnackbarV2TokensType>('SNACKBARV2')
    const props = {
        color: snackbarTokens.infoIcon.color[variant],
        size: snackbarTokens.infoIcon.height,
        'aria-hidden': 'true' as const,
    }
    if (variant === SnackbarV2Variant.SUCCESS)
        return <CircleCheckBig {...props} />
    else if (variant === SnackbarV2Variant.WARNING)
        return <TriangleAlert {...props} />
    else if (variant === SnackbarV2Variant.ERROR)
        return <CircleAlert {...props} />
    return <Info {...props} />
}

const IconContainer = ({ variant }: { variant: SnackbarV2Variant }) => {
    return (
        <Block
            display="flex"
            alignItems="flex-start"
            flexShrink={0}
            data-element="icon"
            aria-hidden="true"
        >
            <SnackbarV2Icon variant={variant} />
        </Block>
    )
}

const HeaderContainer = ({
    header,
    variant,
    snackbarTokens,
    headerId,
}: {
    header: string
    variant: SnackbarV2Variant
    snackbarTokens: SnackbarV2TokensType
    headerId: string
}) => {
    return (
        <Block flexGrow={1} minWidth={0}>
            <Text
                id={headerId}
                as="p"
                color={
                    snackbarTokens.content.textContainer.header.color[variant]
                }
                fontSize={snackbarTokens.content.textContainer.header.fontSize}
                fontWeight={
                    snackbarTokens.content.textContainer.header.fontWeight
                }
                data-element="header"
                data-id={header}
                style={{
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {header}
            </Text>
        </Block>
    )
}

const DescriptionContainer = ({
    description,
    variant,
    snackbarTokens,
    descriptionId,
    iconHeight,
    gap,
    closeButtonHeight,
}: {
    description: string
    variant: SnackbarV2Variant
    snackbarTokens: SnackbarV2TokensType
    descriptionId: string
    iconHeight: string | number | undefined
    gap: string | number | undefined
    closeButtonHeight: string | number | undefined
}) => {
    return (
        <Block
            marginTop={snackbarTokens.content.textContainer.gap}
            marginLeft={`calc(${iconHeight ?? 0} + ${gap ?? 0})`}
            marginRight={closeButtonHeight ?? 0}
        >
            <Text
                id={descriptionId}
                as="p"
                color={
                    snackbarTokens.content.textContainer.description.color[
                        variant
                    ]
                }
                fontSize={
                    snackbarTokens.content.textContainer.description.fontSize
                }
                fontWeight={
                    snackbarTokens.content.textContainer.description.fontWeight
                }
                data-element="description"
                data-id={description}
            >
                {description}
            </Text>
        </Block>
    )
}

const ActionButton = ({
    actionButton,
    variant,
    snackbarTokens,
    toastId,
    iconHeight,
    gap,
    closeButtonHeight,
}: {
    actionButton: {
        label: string
        onClick: () => void
        autoDismiss?: boolean
    }
    variant: SnackbarV2Variant
    snackbarTokens: SnackbarV2TokensType
    toastId?: string | number
    iconHeight: string | number | undefined
    gap: string | number | undefined
    closeButtonHeight: string | number | undefined
}) => {
    const actionColor = snackbarTokens.actions.primaryAction.color[variant]

    return (
        <Block
            marginTop={snackbarTokens.content.gap}
            marginLeft={`calc(${iconHeight ?? 0} + ${gap ?? 0})`}
            marginRight={closeButtonHeight ?? 0}
        >
            <PrimitiveButton
                backgroundColor="transparent"
                color={actionColor}
                aria-label={actionButton.label}
                onClick={() => {
                    actionButton.onClick()
                    if (actionButton.autoDismiss !== false && toastId) {
                        sonnerToast.dismiss(toastId)
                    }
                }}
                data-element="primary-action"
                data-id={actionButton.label}
            >
                <Text
                    color={actionColor}
                    fontSize={snackbarTokens.actions.primaryAction.fontSize}
                    fontWeight={snackbarTokens.actions.primaryAction.fontWeight}
                >
                    {actionButton.label}
                </Text>
            </PrimitiveButton>
        </Block>
    )
}

const CloseButton = ({
    onClose,
    variant,
    snackbarTokens,
}: {
    onClose?: () => void
    variant: SnackbarV2Variant
    snackbarTokens: SnackbarV2TokensType
}) => {
    const closeButtonColor = snackbarTokens.actions.closeButton.color[variant]

    return (
        <Block flexShrink={0}>
            <PrimitiveButton
                backgroundColor="transparent"
                contentCentered
                onClick={onClose}
                aria-label="Close notification"
                data-element="close-button"
            >
                <X
                    size={snackbarTokens.actions.closeButton.height}
                    color={closeButtonColor}
                    aria-hidden="true"
                />
            </PrimitiveButton>
        </Block>
    )
}

export const StyledToast: React.FC<SnackbarV2ToastProps> = ({
    header,
    description,
    variant,
    onClose,
    actionButton,
    toastId,
    maxWidth,
    ...props
}) => {
    const snackbarTokens =
        useResponsiveTokens<SnackbarV2TokensType>('SNACKBARV2')
    const baseId = useId()
    const role =
        variant === SnackbarV2Variant.ERROR ||
        variant === SnackbarV2Variant.WARNING
            ? 'alert'
            : 'status'
    const idPrefix = toastId ? `snackbar-${toastId}` : baseId
    const headerId = `${idPrefix}-header`
    const descriptionId = description ? `${idPrefix}-description` : undefined

    const iconHeight = snackbarTokens.infoIcon.height
    const gap = snackbarTokens.gap
    const closeButtonHeight = snackbarTokens.actions.closeButton.height

    return (
        <Block
            role={role}
            aria-labelledby={headerId}
            aria-describedby={descriptionId}
            data-snackbar={header ?? 'snackbar'}
            data-status={variant}
            display="flex"
            flexDirection="column"
            backgroundColor={snackbarTokens.backgroundColor}
            borderRadius={snackbarTokens.borderRadius}
            padding={snackbarTokens.padding}
            maxWidth={maxWidth}
            boxShadow={snackbarTokens.boxShadow}
            {...props}
        >
            <Block
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={gap}
            >
                <IconContainer variant={variant} />

                <HeaderContainer
                    header={header}
                    variant={variant}
                    snackbarTokens={snackbarTokens}
                    headerId={headerId}
                />

                <CloseButton
                    onClose={onClose}
                    variant={variant}
                    snackbarTokens={snackbarTokens}
                />
            </Block>

            {description && (
                <DescriptionContainer
                    description={description}
                    variant={variant}
                    snackbarTokens={snackbarTokens}
                    descriptionId={descriptionId!}
                    iconHeight={iconHeight}
                    gap={gap}
                    closeButtonHeight={closeButtonHeight}
                />
            )}

            {actionButton && (
                <ActionButton
                    actionButton={actionButton}
                    variant={variant}
                    snackbarTokens={snackbarTokens}
                    toastId={toastId}
                    iconHeight={iconHeight}
                    gap={gap}
                    closeButtonHeight={closeButtonHeight}
                />
            )}
        </Block>
    )
}

export const addSnackbarV2 = ({
    header,
    description,
    variant = SnackbarV2Variant.INFO,
    onClose,
    actionButton,
    duration,
    position,
    maxWidth,
}: SnackbarV2ToastOptions) => {
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
                maxWidth={maxWidth}
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

const SnackbarV2 = forwardRef<HTMLDivElement, SnackbarV2Props>(
    (
        {
            position = SnackbarV2Position.BOTTOM_RIGHT,
            dismissOnClickAway = false,
        },
        ref
    ) => {
        const isCenter = position?.includes('center')

        useEffect(() => {
            if (!dismissOnClickAway) {
                return
            }

            const handleClickAway = (event: MouseEvent) => {
                const target = event.target as Node

                const clickedSnackbar = (target as Element)?.closest(
                    '[data-snackbar]'
                )

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
            <Block ref={ref}>
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
            </Block>
        )
    }
)

SnackbarV2.displayName = 'SnackbarV2'

export default SnackbarV2
