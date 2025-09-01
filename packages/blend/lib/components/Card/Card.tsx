import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import Button from '../Button/Button'
import { type CardProps } from './types'
import { ButtonSubType } from '../Button/types'
import type { CardTokenType } from './card.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { toPixels } from '../../global-utils/GlobalUtils'
import {
    isLegacyCard,
    isTopSlotVariant,
    isLeftSlotVariant,
    isBorderedHeaderVariant,
    getCardPadding,
    getContentPadding,
    getHeaderTextStyles,
    getDescriptionStyles,
    getHeaderMarginBottom,
    getDescriptionMarginBottom,
    getContentSlotMarginBottom,
    getHeaderTextSlotSpacing,
    getBorderedHeaderStyles,
    getBorderedHeaderTitleStyles,
    getBorderedHeaderDescriptionStyles,
    getBorderedSubHeaderTitleStyles,
    getBorderedDescriptionStyles,
    getBorderedSlotSubHeaderSpacing,
    getBorderedSubHeaderDescriptionSpacing,
    getBorderedDescriptionContentSpacing,
    getBorderedContentActionSpacing,
} from './utils'

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            className,
            maxWidth = 'auto',
            // Standard card props
            title,
            titleSlot,
            headerActionSlot,
            description,
            content,
            actionButton,
            // Bordered header variant
            borderedHeader,
            // Legacy props
            header,
            slot,
        },
        ref
    ) => {
        const cardToken = useResponsiveTokens<CardTokenType>('CARD')

        // Card type detection
        const isLegacy = isLegacyCard(slot, header)
        const isBordered = Boolean(borderedHeader)
        const isTopSlot = isTopSlotVariant(slot)
        const isLeftSlot = isLeftSlotVariant(slot)
        const isBorderedHeader = isBorderedHeaderVariant(header)

        // Content flags for spacing calculations
        const hasTitle = Boolean(title)
        const hasTitleSlot = Boolean(titleSlot)
        const hasHeaderActionSlot = Boolean(headerActionSlot)
        const hasDescription = Boolean(description)
        const hasContent = Boolean(content)
        const hasActionButton = Boolean(actionButton)
        const isInlineButton = actionButton?.subType === ButtonSubType.INLINE

        // Standard Card Component
        const StandardCard = () => (
            <Block
                style={{
                    padding: cardToken.padding,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header Section */}
                {(hasTitle || hasTitleSlot || hasHeaderActionSlot) && (
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        style={{
                            marginBottom: getHeaderMarginBottom(
                                hasDescription,
                                hasContent,
                                hasActionButton
                            ),
                        }}
                    >
                        {/* Title and Title Slot */}
                        <Block
                            display="flex"
                            alignItems="center"
                            style={{
                                gap:
                                    hasTitle && hasTitleSlot
                                        ? getHeaderTextSlotSpacing()
                                        : '0',
                            }}
                        >
                            {hasTitle && (
                                <Text style={getHeaderTextStyles(cardToken)}>
                                    {title}
                                </Text>
                            )}
                            {hasTitleSlot && <Block>{titleSlot}</Block>}
                        </Block>

                        {/* Header Action Slot */}
                        {hasHeaderActionSlot && (
                            <Block>{headerActionSlot}</Block>
                        )}
                    </Block>
                )}

                {/* Description */}
                {hasDescription && (
                    <Block
                        style={{
                            marginBottom: getDescriptionMarginBottom(
                                hasContent,
                                hasActionButton
                            ),
                        }}
                    >
                        <Text style={getDescriptionStyles(cardToken)}>
                            {description}
                        </Text>
                    </Block>
                )}

                {/* Content Slot */}
                {hasContent && (
                    <Block
                        style={{
                            marginBottom: getContentSlotMarginBottom(
                                hasActionButton,
                                isInlineButton
                            ),
                        }}
                    >
                        {content}
                    </Block>
                )}

                {/* Action Button */}
                {hasActionButton && (
                    <Block>
                        <Button {...actionButton} />
                    </Block>
                )}

                {/* Fallback for children (if no content prop) */}
                {children && !hasContent && <Block>{children}</Block>}
            </Block>
        )

        // Bordered Header Card Component
        const BorderedHeaderCard = () => {
            if (!borderedHeader) return null

            const {
                title: headerTitle,
                titleSlot: headerTitleSlot,
                headerActionSlot: headerActionSlot,
                headerDescription,
                topSlot,
                subHeaderTitle,
                description: borderedDescription,
                content: borderedContent,
                actionButton: borderedActionButton,
            } = borderedHeader

            const hasHeaderTitle = Boolean(headerTitle)
            const hasHeaderTitleSlot = Boolean(headerTitleSlot)
            const hasHeaderActionSlot = Boolean(headerActionSlot)
            const hasHeaderDescription = Boolean(headerDescription)
            const hasTopSlot = Boolean(topSlot)
            const hasSubHeaderTitle = Boolean(subHeaderTitle)
            const hasBorderedDescription = Boolean(borderedDescription)
            const hasBorderedContent = Boolean(borderedContent)
            const hasBorderedActionButton = Boolean(borderedActionButton)

            return (
                <>
                    {/* Bordered Header Section */}
                    <Block style={getBorderedHeaderStyles(cardToken)}>
                        <Block
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            {/* Header Title and Title Slot */}
                            <Block
                                display="flex"
                                alignItems="center"
                                style={{
                                    gap:
                                        hasHeaderTitle && hasHeaderTitleSlot
                                            ? getHeaderTextSlotSpacing()
                                            : '0',
                                }}
                            >
                                {hasHeaderTitle && (
                                    <Text
                                        style={getBorderedHeaderTitleStyles(
                                            cardToken
                                        )}
                                    >
                                        {headerTitle}
                                    </Text>
                                )}
                                {hasHeaderTitleSlot && (
                                    <Block>{headerTitleSlot}</Block>
                                )}
                            </Block>

                            {/* Header Action Slot */}
                            {hasHeaderActionSlot && (
                                <Block>{headerActionSlot}</Block>
                            )}
                        </Block>

                        {/* Header Description */}
                        {hasHeaderDescription && (
                            <Text style={getBorderedHeaderDescriptionStyles()}>
                                {headerDescription}
                            </Text>
                        )}
                    </Block>

                    {/* Content Area */}
                    <Block
                        style={{
                            padding: cardToken.padding,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Top Slot */}
                        {hasTopSlot && (
                            <Block
                                style={{
                                    marginBottom: hasSubHeaderTitle
                                        ? getBorderedSlotSubHeaderSpacing()
                                        : '0',
                                }}
                            >
                                {topSlot}
                            </Block>
                        )}

                        {/* Sub Header Title */}
                        {hasSubHeaderTitle && (
                            <Block
                                style={{
                                    marginBottom: hasBorderedDescription
                                        ? getBorderedSubHeaderDescriptionSpacing()
                                        : '0',
                                }}
                            >
                                <Text style={getBorderedSubHeaderTitleStyles()}>
                                    {subHeaderTitle}
                                </Text>
                            </Block>
                        )}

                        {/* Description */}
                        {hasBorderedDescription && (
                            <Block
                                style={{
                                    marginBottom: hasBorderedContent
                                        ? getBorderedDescriptionContentSpacing()
                                        : '0',
                                }}
                            >
                                <Text style={getBorderedDescriptionStyles()}>
                                    {borderedDescription}
                                </Text>
                            </Block>
                        )}

                        {/* Content Slot */}
                        {hasBorderedContent && (
                            <Block
                                style={{
                                    marginBottom: hasBorderedActionButton
                                        ? getBorderedContentActionSpacing()
                                        : '0',
                                }}
                            >
                                {borderedContent}
                            </Block>
                        )}

                        {/* Action Button */}
                        {hasBorderedActionButton && (
                            <Block>
                                <Button {...borderedActionButton} />
                            </Block>
                        )}
                    </Block>
                </>
            )
        }

        // Legacy Card Components (kept for backward compatibility)
        const LegacyHeaderContent = ({
            useDefaultStyle = false,
        }: {
            useDefaultStyle?: boolean
        }) => {
            if (
                !header ||
                (!header.title &&
                    !header.subtitle &&
                    !header.actions &&
                    !header.label)
            ) {
                return null
            }

            const headerVariant = header.variant || 'default'
            const headerStyle = useDefaultStyle
                ? cardToken.header.variants.default
                : cardToken.header.variants[headerVariant]

            return (
                <Block style={headerStyle}>
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Block display="flex" alignItems="center">
                            {header.title && (
                                <Text
                                    style={{
                                        fontSize:
                                            cardToken.header.title.fontSize,
                                        fontWeight:
                                            cardToken.header.title.fontWeight,
                                        color: cardToken.header.title.color,
                                    }}
                                >
                                    {header.title}
                                </Text>
                            )}
                            {header.label && (
                                <Block
                                    style={{
                                        marginLeft:
                                            cardToken.header.label.marginLeft,
                                    }}
                                >
                                    {header.label}
                                </Block>
                            )}
                            {header.subtitle && (
                                <Text
                                    style={{
                                        fontSize:
                                            cardToken.header.subtitle.fontSize,
                                        fontWeight:
                                            cardToken.header.subtitle
                                                .fontWeight,
                                        color: cardToken.header.subtitle.color,
                                    }}
                                >
                                    {header.subtitle}
                                </Text>
                            )}
                        </Block>
                        {header.actions && (
                            <Block
                                display="flex"
                                alignItems="center"
                                style={{ gap: cardToken.header.actions.gap }}
                            >
                                {header.actions}
                            </Block>
                        )}
                    </Block>
                </Block>
            )
        }

        const LegacySlotContent = () => {
            if (!slot) return null

            const slotTokens = cardToken.slot.variants[slot.variant]
            const shouldCenterAlign = slot.centerAlign || false

            const slotStyles: React.CSSProperties = {
                padding: slotTokens.padding as string,
                gap: slotTokens.gap as string,
                height: slotTokens.height as string,
                borderRadius: slotTokens.borderRadius as string,
                overflow: slotTokens.overflow as string,
                display: 'flex',
                alignItems: shouldCenterAlign ? 'center' : 'flex-start',
                justifyContent: shouldCenterAlign ? 'center' : 'flex-start',
                textAlign: shouldCenterAlign ? 'center' : 'left',
            }

            if (isTopSlot) {
                slotStyles.minHeight = '142px'
                slotStyles.height = '50%'
                slotStyles.flex = 'none'
            }

            return <Block style={slotStyles}>{slot.content}</Block>
        }

        const LegacyCard = () => {
            const shouldCenterAlign = slot?.centerAlign || false
            const contentPadding = getContentPadding(
                isTopSlot,
                isLeftSlot,
                isBorderedHeader,
                cardToken
            )

            // Top slot layout
            if (isTopSlot) {
                return (
                    <>
                        <LegacySlotContent />
                        <Block
                            style={{
                                minHeight: '142px',
                                height: '50%',
                                flex: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: `${String(cardToken.padding)} ${String(cardToken.padding)} 0 ${String(cardToken.padding)}`,
                            }}
                        >
                            <LegacyHeaderContent useDefaultStyle />
                            <Block
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: `0 0 ${String(cardToken.padding)} 0`,
                                    ...(shouldCenterAlign
                                        ? {
                                              textAlign: 'center',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                          }
                                        : {}),
                                }}
                            >
                                {children}
                            </Block>
                        </Block>
                    </>
                )
            }

            // Left slot layout
            if (isLeftSlot) {
                return (
                    <Block style={{ padding: String(cardToken.padding) }}>
                        <Block
                            display="flex"
                            style={{
                                gap: cardToken.slot.variants[slot!.variant].gap,
                            }}
                        >
                            <LegacySlotContent />
                            <Block style={{ flex: 1 }}>
                                <LegacyHeaderContent />
                                <Block
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {children}
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                )
            }

            // Default legacy layout
            return (
                <>
                    <LegacyHeaderContent />
                    <Block
                        style={{
                            padding: contentPadding,
                            display: 'flex',
                            flexDirection: 'column',
                            ...(shouldCenterAlign && isTopSlot
                                ? {
                                      textAlign: 'center',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                  }
                                : {}),
                        }}
                    >
                        {children}
                    </Block>
                </>
            )
        }

        // Main card styles
        const cardPadding = isLegacy
            ? getCardPadding(isTopSlot, isBorderedHeader, isLeftSlot, cardToken)
            : isBordered
              ? '0'
              : '0'

        return (
            <Block
                ref={ref}
                className={className}
                style={{
                    maxWidth:
                        maxWidth !== 'auto'
                            ? toPixels(maxWidth)
                            : cardToken.maxWidth,
                    outline: cardToken.border.default,
                    borderRadius: cardToken.borderRadius,
                    backgroundColor: cardToken.backgroundColor.default,
                    boxShadow: cardToken.boxShadow,
                    padding: cardPadding,
                    transition:
                        'outline-color 0.2s ease, background-color 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    ...(isTopSlot && { minHeight: '284px' }),
                    ...(isBorderedHeader &&
                        !isTopSlot && { overflow: 'hidden' }),
                }}
                onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.outline = cardToken.border.hover as string
                    target.style.backgroundColor = cardToken.backgroundColor
                        .hover as string
                }}
                onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.outline = cardToken.border.default as string
                    target.style.backgroundColor = cardToken.backgroundColor
                        .default as string
                }}
            >
                {isLegacy ? (
                    <LegacyCard />
                ) : isBordered ? (
                    <BorderedHeaderCard />
                ) : (
                    <StandardCard />
                )}
            </Block>
        )
    }
)

Card.displayName = 'Card'

export default Card
