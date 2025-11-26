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
import { Skeleton, SkeletonVariant } from '../Skeleton'

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ maxWidth = 'auto', minHeight, maxHeight, skeleton, ...props }, ref) => {
        const cardToken = useResponsiveTokens<CardTokenType>('CARD')
        const variant = getCardVariant(
            'variant' in props ? props.variant : undefined
        )

        const renderCardContent = () => {
            if (isDefaultCard(variant)) {
                return (
                    <DefaultCard
                        props={
                            props as Extract<CardProps, { variant?: undefined }>
                        }
                        cardToken={cardToken}
                        maxHeight={maxHeight}
                    />
                )
            }

            if (isAlignedCard(variant)) {
                return (
                    <AlignedCard
                        props={
                            props as Extract<CardProps, { variant: 'aligned' }>
                        }
                        cardToken={cardToken}
                        maxHeight={maxHeight}
                    />
                )
            }

            if (isCustomCard(variant)) {
                return (
                    <CustomCard
                        props={
                            props as Extract<CardProps, { variant: 'custom' }>
                        }
                        cardToken={cardToken}
                        maxHeight={maxHeight}
                    />
                )
            }

            return null
        }

        const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.currentTarget as HTMLElement
            target.style.outline = cardToken.border as string
            target.style.backgroundColor = cardToken.backgroundColor as string
        }

        const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.currentTarget as HTMLElement
            target.style.outline = cardToken.border as string
            target.style.backgroundColor = cardToken.backgroundColor as string
        }

        return (
            <Block
                ref={ref}
                maxWidth={
                    maxWidth !== 'auto'
                        ? toPixels(maxWidth)
                        : cardToken.maxWidth
                }
                maxHeight={maxHeight ? toPixels(maxHeight) : undefined}
                minHeight={minHeight ? toPixels(minHeight) : undefined}
                outline={cardToken.border}
                borderRadius={cardToken.borderRadius}
                backgroundColor={cardToken.backgroundColor}
                boxShadow={cardToken.boxShadow}
                overflow="hidden"
                display="flex"
                flexDirection="column"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-card="true"
            >
                {skeleton?.show ? (
                    <Skeleton
                        variant={skeleton.variant as SkeletonVariant}
                        width={'100%'}
                        height={skeleton.height || '250px'}
                        maxHeight={maxHeight}
                        minHeight={minHeight}
                        maxWidth={maxWidth}
                    />
                ) : (
                    renderCardContent()
                )}
            </Block>
        )
    }
)

Card.displayName = 'Card'

export default Card
