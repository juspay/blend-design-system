import React from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import Button from '../Button/Button'
import { ButtonSubType } from '../Button/types'
import { CardVariant, CardAlignment } from './types'
import type { CardProps } from './types'
import type { CardTokenType } from './card.tokens'
import {
    getHeaderBoxStyles,
    getHeaderTitleStyles,
    getSubHeaderStyles,
    getBodyTitleStyles,
    getBodyContentStyles,
    getBodyStyles,
    getHeaderSpacing,
    getHeaderMarginBottom,
    getSubHeaderMarginBottom,
    getBodySlot1MarginBottom,
    getBodyTitleMarginBottom,
    getContentMarginBottom,
    getBodySlot2MarginBottom,
    getCustomCardStyles,
    isInlineActionButton,
} from './utils'

type CardComponentProps = {
    props: Extract<CardProps, { variant?: CardVariant.DEFAULT }>
    cardToken: CardTokenType
}

type AlignedCardComponentProps = {
    props: Extract<CardProps, { variant: CardVariant.ALIGNED }>
    cardToken: CardTokenType
}

type CustomCardComponentProps = {
    props: Extract<CardProps, { variant: CardVariant.CUSTOM }>
    cardToken: CardTokenType
}

export const DefaultCard: React.FC<CardComponentProps> = ({
    props,
    cardToken,
}) => {
    const {
        headerSlot1,
        headerTitle,
        headerTag,
        headerSlot2,
        subHeader,
        bodySlot1,
        bodyTitle,
        content,
        bodySlot2,
        actionButton,
    } = props

    const variant = CardVariant.DEFAULT
    const hasHeader = Boolean(
        headerSlot1 || headerTitle || headerTag || headerSlot2
    )
    const hasSubHeader = Boolean(subHeader)
    const hasBodySlot1 = Boolean(bodySlot1)
    const hasBodyTitle = Boolean(bodyTitle)
    const hasContent = Boolean(content)
    const hasBodySlot2 = Boolean(bodySlot2)
    const hasActionButton = Boolean(actionButton)
    const isInlineButton = isInlineActionButton(actionButton, false) // Default cards are never center-aligned

    return (
        <>
            {hasHeader && (
                <Block style={getHeaderBoxStyles(cardToken)}>
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        style={{ width: '100%' }}
                    >
                        <Block
                            display="flex"
                            alignItems="flex-start"
                            style={{ gap: getHeaderSpacing(cardToken) }}
                        >
                            {headerSlot1 && <Block>{headerSlot1}</Block>}

                            <Block
                                display="flex"
                                flexDirection="column"
                                style={{
                                    gap: hasSubHeader
                                        ? getHeaderMarginBottom(
                                              hasSubHeader,
                                              cardToken
                                          )
                                        : '0',
                                }}
                            >
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    style={{
                                        gap: getHeaderSpacing(cardToken),
                                    }}
                                >
                                    {headerTitle && (
                                        <Text
                                            style={getHeaderTitleStyles(
                                                cardToken
                                            )}
                                        >
                                            {headerTitle}
                                        </Text>
                                    )}
                                    {headerTag && <Block>{headerTag}</Block>}
                                </Block>

                                {hasSubHeader && (
                                    <Block>
                                        <Text
                                            style={getSubHeaderStyles(
                                                cardToken
                                            )}
                                        >
                                            {subHeader}
                                        </Text>
                                    </Block>
                                )}
                            </Block>
                        </Block>

                        {headerSlot2 && <Block>{headerSlot2}</Block>}
                    </Block>
                </Block>
            )}

            <Block style={getBodyStyles(cardToken)}>
                {hasBodySlot1 && (
                    <Block
                        style={{
                            marginBottom: getBodySlot1MarginBottom(
                                hasBodyTitle,
                                cardToken,
                                variant
                            ),
                        }}
                    >
                        {bodySlot1}
                    </Block>
                )}

                {hasBodyTitle && (
                    <Block
                        style={{
                            marginBottom: getBodyTitleMarginBottom(
                                hasContent,
                                cardToken
                            ),
                        }}
                    >
                        <Text style={getBodyTitleStyles(cardToken)}>
                            {bodyTitle}
                        </Text>
                    </Block>
                )}

                {hasContent && (
                    <Block
                        style={{
                            marginBottom: getContentMarginBottom(
                                hasBodySlot2,
                                cardToken,
                                variant
                            ),
                        }}
                    >
                        <Text style={getBodyContentStyles(cardToken)}>
                            {content}
                        </Text>
                    </Block>
                )}

                {hasBodySlot2 && (
                    <Block
                        style={{
                            marginBottom: getBodySlot2MarginBottom(
                                hasActionButton,
                                isInlineButton,
                                cardToken,
                                variant
                            ),
                        }}
                    >
                        {bodySlot2}
                    </Block>
                )}

                {hasActionButton && (
                    <Block display="flex" justifyContent="flex-start">
                        <Button
                            {...actionButton}
                            subType={
                                isInlineButton
                                    ? ButtonSubType.INLINE
                                    : undefined
                            }
                        />
                    </Block>
                )}
            </Block>
        </>
    )
}

const CardContent: React.FC<{
    props: AlignedCardComponentProps['props']
    cardToken: CardTokenType
    alignment: CardAlignment
    centerAlign: boolean
}> = ({ props, cardToken, alignment, centerAlign }) => {
    const {
        headerTitle,
        headerTag,
        headerSlot2,
        subHeader,
        bodySlot1,
        bodyTitle,
        content,
        actionButton,
    } = props

    const variant = CardVariant.ALIGNED
    const hasHeader = Boolean(headerTitle || headerTag || headerSlot2)
    const hasSubHeader = Boolean(subHeader)
    const hasBodySlot1 = Boolean(bodySlot1)
    const hasBodyTitle = Boolean(bodyTitle)
    const hasContent = Boolean(content)
    const hasActionButton = Boolean(actionButton)
    const isInlineButton = isInlineActionButton(actionButton, centerAlign) // Pass centerAlign parameter

    return (
        <Block
            style={{
                flex: alignment === CardAlignment.HORIZONTAL ? 1 : undefined,
                ...(centerAlign && {
                    textAlign: 'center' as const,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }),
            }}
        >
            {hasHeader && (
                <Block
                    display="flex"
                    justifyContent={centerAlign ? 'center' : 'space-between'}
                    alignItems="center"
                    style={{
                        marginBottom: getHeaderMarginBottom(
                            hasSubHeader,
                            cardToken
                        ),
                        width: centerAlign ? 'auto' : '100%',
                        gap: centerAlign
                            ? getHeaderSpacing(cardToken)
                            : undefined,
                    }}
                >
                    {!centerAlign ? (
                        <>
                            <Block
                                display="flex"
                                alignItems="center"
                                style={{
                                    gap: getHeaderSpacing(cardToken),
                                }}
                            >
                                {headerTitle && (
                                    <Text
                                        style={getHeaderTitleStyles(cardToken)}
                                    >
                                        {headerTitle}
                                    </Text>
                                )}
                                {headerTag && <Block>{headerTag}</Block>}
                            </Block>
                            {headerSlot2 && <Block>{headerSlot2}</Block>}
                        </>
                    ) : (
                        <>
                            {headerTitle && (
                                <Text style={getHeaderTitleStyles(cardToken)}>
                                    {headerTitle}
                                </Text>
                            )}
                            {headerTag && <Block>{headerTag}</Block>}
                            {headerSlot2 && <Block>{headerSlot2}</Block>}
                        </>
                    )}
                </Block>
            )}

            {hasSubHeader && (
                <Block
                    style={{
                        marginBottom: getSubHeaderMarginBottom(
                            cardToken,
                            variant
                        ),
                    }}
                >
                    <Text style={getSubHeaderStyles(cardToken)}>
                        {subHeader}
                    </Text>
                </Block>
            )}

            {hasBodySlot1 && (
                <Block
                    style={{
                        marginBottom: getBodySlot1MarginBottom(
                            hasBodyTitle,
                            cardToken,
                            variant
                        ),
                    }}
                >
                    {bodySlot1}
                </Block>
            )}

            {hasBodyTitle && (
                <Block
                    style={{
                        marginBottom: getBodyTitleMarginBottom(
                            hasContent,
                            cardToken
                        ),
                    }}
                >
                    <Text style={getBodyTitleStyles(cardToken)}>
                        {bodyTitle}
                    </Text>
                </Block>
            )}

            {/* Wrap content and action button with proper gap */}
            <Block
                display="flex"
                flexDirection="column"
                style={{
                    gap: hasActionButton
                        ? centerAlign
                            ? '24px' // Always 24px for center-aligned cards
                            : isInlineButton
                              ? '14px' // Always 14px for inline buttons (non-center)
                              : '24px' // Always 24px for regular buttons in aligned variant
                        : '0',
                }}
            >
                {hasContent && (
                    <Text style={getBodyContentStyles(cardToken)}>
                        {content}
                    </Text>
                )}

                {hasActionButton && (
                    <Block
                        display="flex"
                        justifyContent={centerAlign ? 'center' : 'flex-start'}
                    >
                        <Button
                            {...actionButton}
                            subType={
                                isInlineButton
                                    ? ButtonSubType.INLINE
                                    : undefined
                            }
                        />
                    </Block>
                )}
            </Block>
        </Block>
    )
}

export const AlignedCard: React.FC<AlignedCardComponentProps> = ({
    props,
    cardToken,
}) => {
    const { alignment, centerAlign = false, cardSlot } = props
    const variant = CardVariant.ALIGNED
    const hasCardSlot = Boolean(cardSlot)

    if (hasCardSlot) {
        if (alignment === CardAlignment.HORIZONTAL) {
            return (
                <Block
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: centerAlign ? 'center' : 'flex-start',
                        gap: getHeaderSpacing(cardToken),
                        padding: cardToken.padding[variant],
                    }}
                >
                    <Block
                        style={{
                            flexShrink: 0,
                            minWidth: '92px',
                        }}
                    >
                        {cardSlot}
                    </Block>

                    <CardContent
                        props={props}
                        cardToken={cardToken}
                        alignment={alignment}
                        centerAlign={centerAlign}
                    />
                </Block>
            )
        } else {
            return (
                <>
                    <Block
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: centerAlign ? 'center' : 'stretch',
                            justifyContent: centerAlign
                                ? 'center'
                                : 'flex-start',
                            paddingBottom: cardToken.padding[variant],
                            minHeight: '142px',
                            ...(centerAlign && {
                                padding: cardToken.padding[variant],
                            }),
                        }}
                    >
                        {cardSlot}
                    </Block>

                    <Block
                        style={{
                            padding: `0 ${String(cardToken.padding[variant])} ${String(cardToken.padding[variant])} ${String(cardToken.padding[variant])}`,
                        }}
                    >
                        <CardContent
                            props={props}
                            cardToken={cardToken}
                            alignment={alignment}
                            centerAlign={centerAlign}
                        />
                    </Block>
                </>
            )
        }
    } else {
        return (
            <Block style={{ padding: String(cardToken.padding[variant]) }}>
                <CardContent
                    props={props}
                    cardToken={cardToken}
                    alignment={alignment}
                    centerAlign={centerAlign}
                />
            </Block>
        )
    }
}

export const CustomCard: React.FC<CustomCardComponentProps> = ({
    props,
    cardToken,
}) => {
    const { children } = props

    return <Block style={getCustomCardStyles(cardToken)}>{children}</Block>
}
