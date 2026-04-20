import { forwardRef, useId, useMemo } from 'react'
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
import CardSkeleton from './CardSkeleton'

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ maxWidth = 'auto', minHeight, maxHeight, skeleton, ...props }, ref) => {
        const cardToken = useResponsiveTokens<CardTokenType>('CARD')
        const variant = getCardVariant(
            'variant' in props ? props.variant : undefined
        )

        // Generate unique IDs for ARIA relationships
        const baseId = useId()
        const cardId = `${baseId}-card`
        const headerTitle =
            'headerTitle' in props ? props.headerTitle : undefined

        // Generate accessible label for the card
        const cardLabel = useMemo(() => {
            const parts: string[] = []
            if ('headerTitle' in props && props.headerTitle) {
                parts.push(props.headerTitle)
            }
            if ('bodyTitle' in props && props.bodyTitle) {
                parts.push(props.bodyTitle)
            }
            return parts.length > 0 ? parts.join(' - ') : undefined
        }, [props])

        const renderCardContent = () => {
            if (isDefaultCard(variant)) {
                return (
                    <DefaultCard
                        props={
                            props as Extract<CardProps, { variant?: undefined }>
                        }
                        cardToken={cardToken}
                        maxHeight={maxHeight}
                        baseId={baseId}
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
                        baseId={baseId}
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
                        baseId={baseId}
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
                id={cardId}
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
                display="flex"
                flexDirection="column"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-card={headerTitle}
                role="region"
                aria-label={cardLabel}
                aria-labelledby={
                    'headerTitle' in props && props.headerTitle
                        ? `${baseId}-header-title`
                        : undefined
                }
            >
                {skeleton?.show ? (
                    <CardSkeleton
                        skeleton={skeleton}
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
