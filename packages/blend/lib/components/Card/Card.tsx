import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { CardHeaderVariant, type CardProps } from './types'
import type { CardTokenType } from './card.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { toPixels } from '../../global-utils/GlobalUtils'

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, maxWidth = 'auto', header, headerSlot }, ref) => {
        const cardToken = useResponsiveTokens<CardTokenType>('CARD')

        const headerVariant = header?.variant || CardHeaderVariant.DEFAULT

        const renderHeader = () => {
            if (headerSlot) {
                return (
                    <Block
                        style={{
                            ...cardToken.header.variants[headerVariant],
                        }}
                    >
                        {headerSlot}
                    </Block>
                )
            }

            if (header && (header.title || header.subtitle || header.actions)) {
                return (
                    <Block
                        style={{
                            ...cardToken.header.variants[headerVariant],
                        }}
                    >
                        <Block
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Block>
                                {header.title && (
                                    <Text
                                        style={{
                                            fontSize:
                                                cardToken.header.title.fontSize,
                                            fontWeight:
                                                cardToken.header.title
                                                    .fontWeight,
                                            color: cardToken.header.title.color,
                                            marginBottom:
                                                cardToken.header.title
                                                    .marginBottom,
                                        }}
                                    >
                                        {header.title}
                                    </Text>
                                )}
                                {header.subtitle && (
                                    <Text
                                        style={{
                                            fontSize:
                                                cardToken.header.subtitle
                                                    .fontSize,
                                            fontWeight:
                                                cardToken.header.subtitle
                                                    .fontWeight,
                                            color: cardToken.header.subtitle
                                                .color,
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
                                    style={{
                                        gap: cardToken.header.actions.gap,
                                    }}
                                >
                                    {header.actions}
                                </Block>
                            )}
                        </Block>
                    </Block>
                )
            }

            return null
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
                    border: cardToken.border.default,
                    borderRadius: cardToken.borderRadius,
                    backgroundColor: cardToken.backgroundColor.default,
                    boxShadow: cardToken.boxShadow,
                    padding: cardToken.padding,
                    transition:
                        'border-color 0.2s ease, background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.border = cardToken.border.hover as string
                    target.style.backgroundColor = cardToken.backgroundColor
                        .hover as string
                }}
                onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.border = cardToken.border.default as string
                    target.style.backgroundColor = cardToken.backgroundColor
                        .default as string
                }}
            >
                {renderHeader()}
                <Block
                    style={{
                        padding: cardToken.content.padding,
                    }}
                >
                    {children}
                </Block>
            </Block>
        )
    }
)

Card.displayName = 'Card'

export default Card
