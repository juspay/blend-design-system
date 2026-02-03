import type React from 'react'
import { useId, useEffect, forwardRef, ReactElement } from 'react'
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
import { addPxToValue } from '../../global-utils/GlobalUtils'
import { filterBlockedProps } from '../../utils/prop-helpers'

const SnackbarV2Icon: React.FC<SnackbarV2IconProps> = ({ variant }) => {
    const snackbarTokens =
        useResponsiveTokens<SnackbarV2TokensType>('SNACKBARV2')
    const iconColor = snackbarTokens.slot.color[variant]
    const iconSize = snackbarTokens.slot.height

    const props = {
        color: iconColor,
        size: iconSize,
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

const SlotContainer = ({
    slot,
    snackbarTokens,
}: {
    slot?: ReactElement
    snackbarTokens: SnackbarV2TokensType
}) => {
    if (!slot) return null
    return (
        <Block
            data-element="icon"
            height={snackbarTokens.slot.height}
            width={snackbarTokens.slot.width}
            contentCentered
            aria-hidden="true"
        >
            {slot}
        </Block>
    )
}

const ActionButton = ({
    action,
    variant,
    snackbarTokens,
    toastId,
}: {
    action: {
        label: string
        onClick: () => void
        autoDismiss?: boolean
    }
    variant: SnackbarV2Variant
    snackbarTokens: SnackbarV2TokensType
    toastId?: string | number
}) => {
    const actionTokens =
        snackbarTokens.mainContainer.content.actionContainer.primaryAction
    const color = actionTokens.color[variant]

    return (
        <PrimitiveButton
            data-element="primary-action"
            data-id={action.label}
            onClick={() => {
                action.onClick()
                if (action.autoDismiss !== false && toastId) {
                    sonnerToast.dismiss(toastId)
                }
            }}
            tabIndex={0}
            aria-label={action.label}
            border="none"
            backgroundColor="transparent"
            cursor="pointer"
            color={color}
            fontSize={actionTokens.fontSize}
            fontWeight={actionTokens.fontWeight}
            lineHeight={addPxToValue(actionTokens.lineHeight)}
            width="fit-content"
            whiteSpace="nowrap"
        >
            {action.label}
        </PrimitiveButton>
    )
}

const ActionsContainer = ({
    actionButton,
    variant,
    snackbarTokens,
    toastId,
}: {
    actionButton?: {
        label: string
        onClick: () => void
        autoDismiss?: boolean
    }
    variant: SnackbarV2Variant
    snackbarTokens: SnackbarV2TokensType
    toastId?: string | number
}) => {
    if (!actionButton) return null

    return (
        <Block
            display="flex"
            height="100%"
            alignItems="center"
            justifyContent="center"
        >
            <ActionButton
                action={actionButton}
                variant={variant}
                snackbarTokens={snackbarTokens}
                toastId={toastId}
            />
        </Block>
    )
}

const TextContainer = ({
    header,
    description,
    variant,
    snackbarTokens,
    headerId,
    descriptionId,
}: {
    header: string
    description?: string
    variant: SnackbarV2Variant
    snackbarTokens: SnackbarV2TokensType
    headerId: string
    descriptionId?: string
}) => {
    return (
        <Block
            display="flex"
            flexGrow={1}
            flexDirection="column"
            gap={snackbarTokens.mainContainer.content.textContainer.gap}
        >
            <Text
                data-element="header"
                data-id={header}
                id={headerId}
                as="p"
                color={
                    snackbarTokens.mainContainer.content.textContainer.header
                        .color[variant]
                }
                fontWeight={
                    snackbarTokens.mainContainer.content.textContainer.header
                        .fontWeight
                }
                fontSize={
                    snackbarTokens.mainContainer.content.textContainer.header
                        .fontSize
                }
                lineHeight={addPxToValue(
                    snackbarTokens.mainContainer.content.textContainer.header
                        .lineHeight
                )}
                style={{
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {header}
            </Text>
            {description && (
                <Text
                    data-id={description}
                    data-element="description"
                    id={descriptionId}
                    as="p"
                    fontWeight={
                        snackbarTokens.mainContainer.content.textContainer
                            .description.fontWeight
                    }
                    fontSize={
                        snackbarTokens.mainContainer.content.textContainer
                            .description.fontSize
                    }
                    lineHeight={addPxToValue(
                        snackbarTokens.mainContainer.content.textContainer
                            .description.lineHeight
                    )}
                    color={
                        snackbarTokens.mainContainer.content.textContainer
                            .description.color[variant]
                    }
                >
                    {description}
                </Text>
            )}
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
    const closeButtonColor =
        snackbarTokens.mainContainer.closeButton.color[variant]
    const closeButtonHeight = snackbarTokens.mainContainer.closeButton.height

    return (
        <PrimitiveButton
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={closeButtonHeight}
            width={closeButtonHeight}
            data-element="close-button"
            border="none"
            backgroundColor="transparent"
            color={closeButtonColor}
            aria-label="Close notification"
            _focusVisible={{
                outline: `1px solid ${closeButtonColor}`,
            }}
            onClick={onClose}
            type="button"
        >
            <X
                size={closeButtonHeight}
                color={closeButtonColor}
                aria-hidden="true"
            />
        </PrimitiveButton>
    )
}

export const StyledToast: React.FC<SnackbarV2ToastProps> = ({
    header,
    description,
    variant,
    slot,
    onClose,
    actionButton,
    toastId,
    width,
    maxWidth,
    minWidth,
    ...rest
}) => {
    const snackbarTokens =
        useResponsiveTokens<SnackbarV2TokensType>('SNACKBARV2')
    const filteredProps = filterBlockedProps(rest)
    const baseId = useId()
    const role =
        variant === SnackbarV2Variant.ERROR ||
        variant === SnackbarV2Variant.WARNING
            ? 'alert'
            : 'status'
    const idPrefix = toastId ? `snackbar-${toastId}` : baseId
    const headerId = `${idPrefix}-header`
    const descriptionId = description ? `${idPrefix}-description` : undefined

    const defaultSlot = <SnackbarV2Icon variant={variant} />
    const iconSlot = slot ?? defaultSlot

    return (
        <Block
            role={role}
            aria-labelledby={headerId}
            aria-describedby={descriptionId}
            data-snackbar={header ?? 'snackbar'}
            data-status={variant}
            display="flex"
            alignItems="center"
            width={width || snackbarTokens.width}
            maxWidth={maxWidth || snackbarTokens.maxWidth}
            minWidth={minWidth || snackbarTokens.minWidth}
            backgroundColor={snackbarTokens.backgroundColor}
            borderRadius={snackbarTokens.borderRadius}
            padding={snackbarTokens.padding}
            boxShadow={snackbarTokens.boxShadow}
            gap={snackbarTokens.gap}
            {...filteredProps}
        >
            <Block
                display="flex"
                flexGrow={1}
                gap={snackbarTokens.mainContainer.gap}
            >
                <SlotContainer
                    slot={iconSlot}
                    snackbarTokens={snackbarTokens}
                />
                <Block
                    display="flex"
                    flexGrow={1}
                    flexDirection="column"
                    gap={snackbarTokens.mainContainer.content.gap}
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <TextContainer
                        header={header}
                        description={description}
                        variant={variant}
                        snackbarTokens={snackbarTokens}
                        headerId={headerId}
                        descriptionId={descriptionId}
                    />

                    <ActionsContainer
                        actionButton={actionButton}
                        variant={variant}
                        snackbarTokens={snackbarTokens}
                        toastId={toastId}
                    />
                </Block>
            </Block>

            <Block alignSelf="flex-start">
                <CloseButton
                    onClose={onClose}
                    variant={variant}
                    snackbarTokens={snackbarTokens}
                />
            </Block>
        </Block>
    )
}

export const addSnackbarV2 = ({
    header,
    description,
    variant = SnackbarV2Variant.INFO,
    slot,
    onClose,
    actionButton,
    duration,
    position,
    width,
    maxWidth,
    minWidth,
}: SnackbarV2ToastOptions) => {
    const isCenter = position?.includes('center')

    return sonnerToast.custom(
        (t) => (
            <StyledToast
                header={header}
                description={description}
                variant={variant}
                slot={slot}
                onClose={() => {
                    sonnerToast.dismiss(t)
                    onClose?.()
                }}
                actionButton={actionButton}
                toastId={t}
                width={width}
                maxWidth={maxWidth}
                minWidth={minWidth}
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
