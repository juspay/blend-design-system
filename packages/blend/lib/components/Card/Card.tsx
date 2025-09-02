import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import { type CardProps } from './types'
import type { CardTokenType } from './card.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { toPixels } from '../../global-utils/GlobalUtils'
import {
    getCardVariant,
    isDefaultCard,
    isAlignedCard,
    isCustomCard,
} from './utils'
import { DefaultCard, AlignedCard, CustomCard } from './CardComponents'

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { className, maxWidth = 'auto', ...restProps } = props
    const cardToken = useResponsiveTokens<CardTokenType>('CARD')
    const variant = getCardVariant(
        'variant' in restProps ? restProps.variant : undefined
    )

    const renderCardContent = () => {
        if (isDefaultCard(variant)) {
            return (
                <DefaultCard
                    props={
                        restProps as Extract<CardProps, { variant?: undefined }>
                    }
                    cardToken={cardToken}
                />
            )
        }

        if (isAlignedCard(variant)) {
            return (
                <AlignedCard
                    props={
                        restProps as Extract<CardProps, { variant: 'aligned' }>
                    }
                    cardToken={cardToken}
                />
            )
        }

        if (isCustomCard(variant)) {
            return (
                <CustomCard
                    props={
                        restProps as Extract<CardProps, { variant: 'custom' }>
                    }
                    cardToken={cardToken}
                />
            )
        }

        return null
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLElement
        target.style.outline = cardToken.border.hover as string
        target.style.backgroundColor = cardToken.backgroundColor.hover as string
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLElement
        target.style.outline = cardToken.border.default as string
        target.style.backgroundColor = cardToken.backgroundColor
            .default as string
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
                outline: cardToken.border.default,
                borderRadius: cardToken.borderRadius,
                backgroundColor: cardToken.backgroundColor.default,
                boxShadow: cardToken.boxShadow,
                transition:
                    'outline-color 0.2s ease, background-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {renderCardContent()}
        </Block>
    )
})

Card.displayName = 'Card'

export default Card
