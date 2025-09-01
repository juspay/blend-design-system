import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import Button from '../Button/Button'
import { CardHeaderVariant, CardSlotVariant, type CardProps } from './types'
import type { CardTokenType } from './card.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { toPixels } from '../../global-utils/GlobalUtils'

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            className,
            maxWidth = 'auto',
            header,
            headerSlot,
            slot,
            bottomButton,
        },
        ref
    ) => {
        const cardToken = useResponsiveTokens<CardTokenType>('CARD')

        const headerVariant = header?.variant || CardHeaderVariant.DEFAULT
        const hasSlot = slot !== undefined
        const isTopSlot =
            slot?.variant === CardSlotVariant.TOP ||
            slot?.variant === CardSlotVariant.TOP_WITH_PADDING
        const isLeftSlot = slot?.variant === CardSlotVariant.LEFT
        const isBorderedHeader =
            headerVariant === CardHeaderVariant.BORDERED ||
            headerVariant === CardHeaderVariant.BORDERED_WITH_LABEL
        const shouldCenterAlign = slot?.centerAlign || false

        const cardPadding = isTopSlot
            ? '0'
            : isBorderedHeader
              ? '0'
              : isLeftSlot
                ? cardToken.padding
                : cardToken.padding
        const contentPadding = isTopSlot
            ? `0 ${cardToken.padding} ${cardToken.padding} ${cardToken.padding}` // No top padding for top slots
            : isLeftSlot
              ? '0'
              : isBorderedHeader
                ? cardToken.padding
                : cardToken.content.padding

        const HeaderContent = ({
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
            )
                return null

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

        const SlotContent = () => {
            if (!hasSlot) return null

            const slotTokens = cardToken.slot.variants[slot.variant]

            return (
                <Block
                    style={{
                        ...slotTokens,
                        display: 'flex',
                        alignItems: shouldCenterAlign ? 'center' : 'flex-start',
                        justifyContent: shouldCenterAlign
                            ? 'center'
                            : 'flex-start',
                        textAlign: shouldCenterAlign ? 'center' : 'left',
                        ...(isTopSlot && {
                            minHeight: '142px',
                            height: '50%',
                            flex: 'none',
                        }),
                    }}
                >
                    {slot.content}
                </Block>
            )
        }

        const ContentArea = () => (
            <Block
                style={{
                    padding: contentPadding,
                    display: 'flex',
                    flexDirection: 'column',
                    ...(shouldCenterAlign &&
                        isTopSlot && {
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }),
                }}
            >
                {children}
                {bottomButton && (
                    <Block style={{ marginTop: '16px' }}>
                        <Button {...bottomButton} />
                    </Block>
                )}
            </Block>
        )

        // Main layout logic
        const renderCardContent = () => {
            // Top slot layout
            if (isTopSlot) {
                return (
                    <>
                        <SlotContent />
                        <Block
                            style={{
                                minHeight: '142px',
                                height: '50%',
                                flex: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: `${cardToken.padding} ${cardToken.padding} 0 ${cardToken.padding}`, // No bottom padding to avoid double padding
                            }}
                        >
                            <HeaderContent useDefaultStyle />
                            <Block
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: `0 0 ${cardToken.padding} 0`,
                                    ...(shouldCenterAlign && {
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }),
                                }}
                            >
                                {children}
                                {bottomButton && (
                                    <Block style={{ marginTop: '16px' }}>
                                        <Button {...bottomButton} />
                                    </Block>
                                )}
                            </Block>
                        </Block>
                    </>
                )
            }

            // Left slot layout - add padding to component itself
            if (isLeftSlot) {
                return (
                    <Block style={{ padding: cardToken.padding }}>
                        <Block
                            display="flex"
                            style={{
                                gap: cardToken.slot.variants[slot.variant].gap,
                            }}
                        >
                            <SlotContent />
                            <Block style={{ flex: 1 }}>
                                <HeaderContent />
                                <Block
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {children}
                                    {bottomButton && (
                                        <Block style={{ marginTop: '16px' }}>
                                            <Button {...bottomButton} />
                                        </Block>
                                    )}
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                )
            }

            // Default layout (no slot or header slot)
            return (
                <>
                    {headerSlot ? (
                        <Block style={cardToken.header.variants[headerVariant]}>
                            {headerSlot}
                        </Block>
                    ) : (
                        <HeaderContent />
                    )}
                    <ContentArea />
                </>
            )
        }

        return (
            <Block
                ref={ref}
                className={className}
                style={{
                    maxWidth:
                        maxWidth !== 'auto'
                            ? toPixels(maxWidth)
                            : cardToken.maxWidth,
                    outline: cardToken.border.default, // Use outline instead of border
                    borderRadius: cardToken.borderRadius,
                    backgroundColor: cardToken.backgroundColor.default,
                    boxShadow: cardToken.boxShadow,
                    padding: cardPadding,
                    transition:
                        'outline-color 0.2s ease, background-color 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    ...(isTopSlot && { minHeight: '284px' }),
                    // Fix border radius overflow for bordered headers
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
                {renderCardContent()}
            </Block>
        )
    }
)

Card.displayName = 'Card'

export default Card
