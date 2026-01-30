import React, { forwardRef, ReactElement, useId } from 'react'
import { X } from 'lucide-react'
import {
    AlertV2Props,
    AlertV2Type,
    AlertV2SubType,
    AlertV2Actions,
    AlertV2ActionPosition,
    AlertV2Action,
} from './alertV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { AlertV2TokensType } from './alertV2.tokens'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import { FOUNDATION_THEME } from '../../tokens'
import Seperator from '../common/Seperator'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { CSSObject } from 'styled-components'
import { addAccessibleAriaAttributes } from '../../utils/accessibility/icon-helpers'

const SlotContainer = ({
    slot,
    alertV2Tokens,
}: {
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    alertV2Tokens: AlertV2TokensType
}) => {
    if (!slot) return null
    const slotMaxHeight = slot?.maxHeight || alertV2Tokens.slot.maxHeight
    return (
        <Block data-element="slot" contentCentered maxHeight={slotMaxHeight}>
            {addAccessibleAriaAttributes(slot.slot)}
        </Block>
    )
}

const ActionButton = ({
    action,
    type,
    alertV2Tokens,
    variant,
}: {
    action: AlertV2Action
    type: AlertV2Type
    alertV2Tokens: AlertV2TokensType
    variant: 'primaryAction' | 'secondaryAction'
}) => {
    const actionTokens =
        alertV2Tokens.mainContainer.content.actionContainer[variant]
    const color = actionTokens.color[type]

    return (
        <PrimitiveButton
            data-element={`${variant === 'primaryAction' ? 'primary' : 'secondary'}-action`}
            data-id={action.text}
            onClick={action.onClick}
            tabIndex={0}
            aria-label={`${action.text} action`}
            border="none"
            backgroundColor="transparent"
            cursor="pointer"
            color={color}
            fontSize={actionTokens.fontSize}
            fontWeight={actionTokens.fontWeight}
            lineHeight={addPxToValue(actionTokens.lineHeight)}
            width="fit-content"
            whiteSpace="nowrap"
            _focusVisible={{
                outline: `2px solid ${color}`,
                outlineOffset: '2px',
                borderRadius: '4px',
            }}
        >
            {action.text}
        </PrimitiveButton>
    )
}

const ActionsContainer = ({
    actions,
    type,
    alertV2Tokens,
}: {
    actions?: AlertV2Actions
    type: AlertV2Type
    alertV2Tokens: AlertV2TokensType
}) => {
    if (!actions) return null

    return (
        <Block
            display="flex"
            gap={alertV2Tokens.mainContainer.content.actionContainer.gap}
            height="100%"
            alignItems="center"
            justifyContent="center"
        >
            {actions.primaryAction && (
                <ActionButton
                    action={actions.primaryAction}
                    type={type}
                    alertV2Tokens={alertV2Tokens}
                    variant="primaryAction"
                />
            )}
            {actions.secondaryAction && (
                <ActionButton
                    action={actions.secondaryAction}
                    type={type}
                    alertV2Tokens={alertV2Tokens}
                    variant="secondaryAction"
                />
            )}
        </Block>
    )
}

const TextContainer = ({
    heading,
    description,
    type,
    alertV2Tokens,
    headingId,
    descriptionId,
}: {
    heading?: string
    description?: string
    type: AlertV2Type
    alertV2Tokens: AlertV2TokensType
    headingId?: string
    descriptionId?: string
}) => {
    if (!heading && !description) return null

    return (
        <Block
            display="flex"
            flexGrow={1}
            flexDirection="column"
            gap={alertV2Tokens.mainContainer.content.textContainer.gap}
        >
            {heading && (
                <Text
                    data-element="header"
                    data-id={heading}
                    id={headingId}
                    as="h3"
                    color={
                        alertV2Tokens.mainContainer.content.textContainer
                            .heading.color[type]
                    }
                    fontWeight={
                        alertV2Tokens.mainContainer.content.textContainer
                            .heading.fontWeight
                    }
                    fontSize={
                        alertV2Tokens.mainContainer.content.textContainer
                            .heading.fontSize
                    }
                    lineHeight={addPxToValue(
                        alertV2Tokens.mainContainer.content.textContainer
                            .heading.lineHeight
                    )}
                >
                    {heading}
                </Text>
            )}
            {description && (
                <Text
                    data-id={description}
                    data-element="description"
                    id={descriptionId}
                    as="p"
                    fontWeight={
                        alertV2Tokens.mainContainer.content.textContainer
                            .description.fontWeight
                    }
                    fontSize={
                        alertV2Tokens.mainContainer.content.textContainer
                            .description.fontSize
                    }
                    lineHeight={addPxToValue(
                        alertV2Tokens.mainContainer.content.textContainer
                            .description.lineHeight
                    )}
                    color={
                        alertV2Tokens.mainContainer.content.textContainer
                            .description.color[type]
                    }
                >
                    {description}
                </Text>
            )}
        </Block>
    )
}

const CloseButton = ({
    closeButton,
    type,
    alertV2Tokens,
    actionPlacementBottom,
}: {
    closeButton?: {
        show?: boolean
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    }
    type: AlertV2Type
    alertV2Tokens: AlertV2TokensType
    actionPlacementBottom?: boolean
}) => {
    if (!closeButton?.show) return null

    const closeButtonColor = alertV2Tokens.mainContainer.closeButton.color[type]

    return (
        <PrimitiveButton
            display="flex"
            alignItems={actionPlacementBottom ? 'flex-start' : 'center'}
            justifyContent="center"
            height="-webkit-fill-available"
            data-element="close-button"
            border="none"
            backgroundColor="transparent"
            className="debug"
            color={closeButtonColor}
            contentCentered
            aria-label="Close"
            _focusVisible={{
                outline: `1px solid ${closeButtonColor}`,
            }}
            onClick={closeButton.onClick}
            type="button"
        >
            <X
                size={alertV2Tokens.mainContainer.closeButton.height}
                color={closeButtonColor}
                aria-hidden="true"
            />
        </PrimitiveButton>
    )
}

const AlertV2 = forwardRef<HTMLDivElement, AlertV2Props>(
    (
        {
            width,
            maxWidth,
            minWidth,
            type = AlertV2Type.PRIMARY,
            subType = AlertV2SubType.SUBTLE,
            slot,
            heading,
            description,
            actions,
            closeButton = {
                show: true,
                onClick: () => {},
            },
            ...rest
        },
        ref
    ) => {
        const alertV2Tokens = useResponsiveTokens<AlertV2TokensType>('ALERTV2')
        const filteredProps = filterBlockedProps(rest)
        const actionsPosition =
            actions?.position || AlertV2ActionPosition.BOTTOM
        const actionPlacementBottom =
            actionsPosition === AlertV2ActionPosition.BOTTOM
        const showSeparator =
            actionsPosition === AlertV2ActionPosition.RIGHT && closeButton.show

        const baseId = useId()
        const headingId = heading ? `${baseId}-heading` : undefined
        const descriptionId = description ? `${baseId}-description` : undefined

        return (
            <Block
                data-alert={heading ?? 'blend-alert'}
                ref={ref}
                role={'alert'}
                aria-live="assertive"
                aria-atomic="true"
                aria-labelledby={headingId}
                aria-describedby={descriptionId}
                display="flex"
                alignItems="center"
                width={width || alertV2Tokens.width}
                maxWidth={maxWidth || alertV2Tokens.maxWidth}
                minWidth={minWidth || alertV2Tokens.minWidth}
                border={alertV2Tokens.border[type][subType]}
                borderRadius={alertV2Tokens.borderRadius}
                backgroundColor={alertV2Tokens.backgroundColor[type][subType]}
                paddingTop={alertV2Tokens.padding.top}
                paddingBottom={alertV2Tokens.padding.bottom}
                paddingLeft={alertV2Tokens.padding.left}
                paddingRight={alertV2Tokens.padding.right}
                gap={alertV2Tokens.gap[actionsPosition]}
                {...filteredProps}
            >
                <Block
                    display="flex"
                    flexGrow={1}
                    gap={alertV2Tokens.mainContainer.gap}
                >
                    <SlotContainer slot={slot} alertV2Tokens={alertV2Tokens} />
                    <Block
                        display="flex"
                        flexGrow={1}
                        flexDirection={actionPlacementBottom ? 'column' : 'row'}
                        gap={
                            alertV2Tokens.mainContainer.content.gap[
                                actionsPosition
                            ]
                        }
                        justifyContent={
                            actionPlacementBottom
                                ? 'space-between'
                                : 'flex-start'
                        }
                        alignItems={
                            actionPlacementBottom ? 'flex-start' : 'center'
                        }
                    >
                        <TextContainer
                            heading={heading}
                            description={description}
                            type={type}
                            alertV2Tokens={alertV2Tokens}
                            headingId={headingId}
                            descriptionId={descriptionId}
                        />

                        <ActionsContainer
                            actions={actions}
                            type={type}
                            alertV2Tokens={alertV2Tokens}
                        />
                    </Block>
                </Block>
                {showSeparator && (
                    <Seperator
                        width="1px"
                        height={addPxToValue(FOUNDATION_THEME.unit[16])}
                    />
                )}

                <CloseButton
                    closeButton={closeButton}
                    type={type}
                    alertV2Tokens={alertV2Tokens}
                    actionPlacementBottom={actionPlacementBottom}
                />
            </Block>
        )
    }
)

AlertV2.displayName = 'AlertV2'

export default AlertV2
