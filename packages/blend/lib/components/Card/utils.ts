import { CardVariant, CardAlignment } from './types'
import type { CardTokenType } from './card.tokens'
import { ButtonSubType } from '../Button/types'

/**
 * Determines the card variant type
 */
export const getCardVariant = (variant?: CardVariant): CardVariant => {
    return variant || CardVariant.DEFAULT
}

/**
 * Checks if card is default variant
 */
export const isDefaultCard = (variant?: CardVariant): boolean => {
    return getCardVariant(variant) === CardVariant.DEFAULT
}

/**
 * Checks if card is aligned variant
 */
export const isAlignedCard = (variant?: CardVariant): boolean => {
    return getCardVariant(variant) === CardVariant.ALIGNED
}

/**
 * Checks if card is custom variant
 */
export const isCustomCard = (variant?: CardVariant): boolean => {
    return getCardVariant(variant) === CardVariant.CUSTOM
}

/**
 * Gets header box styles for default card
 */
export const getHeaderBoxStyles = (cardToken: CardTokenType) => ({
    backgroundColor: cardToken.header.backgroundColor,
    padding: cardToken.header.padding,
    borderBottom: cardToken.header.borderBottom,
    borderRadius: cardToken.header.borderRadius,
    display: 'flex',
    flexDirection: 'column' as const,
})

/**
 * Gets header title styles
 */
export const getHeaderTitleStyles = (cardToken: CardTokenType) => ({
    fontSize: cardToken.header.title.fontSize,
    fontWeight: cardToken.header.title.fontWeight,
    color: cardToken.header.title.color,
})

/**
 * Gets sub header styles
 */
export const getSubHeaderStyles = (cardToken: CardTokenType) => ({
    fontSize: cardToken.header.subHeader.fontSize,
    fontWeight: cardToken.header.subHeader.fontWeight,
    color: cardToken.header.subHeader.color,
    marginTop: cardToken.header.subHeader.marginTop,
})

/**
 * Gets body title styles
 */
export const getBodyTitleStyles = (cardToken: CardTokenType) => ({
    fontSize: cardToken.body.title.fontSize,
    fontWeight: cardToken.body.title.fontWeight,
    color: cardToken.body.title.color,
})

/**
 * Gets body content styles
 */
export const getBodyContentStyles = (cardToken: CardTokenType) => ({
    fontSize: cardToken.body.content.fontSize,
    color: cardToken.body.content.color,
})

/**
 * Gets body container styles
 */
export const getBodyStyles = (cardToken: CardTokenType) => ({
    padding: cardToken.body.padding,
    display: 'flex',
    flexDirection: 'column' as const,
})

/**
 * Gets spacing between header slots
 */
export const getHeaderSlotSpacing = (cardToken: CardTokenType): string => {
    return String(cardToken.spacing.headerSlotSpacing)
}

/**
 * Gets margin bottom for header based on what follows
 */
export const getHeaderMarginBottom = (
    hasSubHeader: boolean,
    cardToken: CardTokenType
): string => {
    if (hasSubHeader) return String(cardToken.spacing.headerToSubHeader)
    return '0'
}

/**
 * Gets margin bottom for sub header
 */
export const getSubHeaderMarginBottom = (cardToken: CardTokenType): string => {
    return String(cardToken.spacing.subHeaderToBody)
}

/**
 * Gets margin bottom for body slot 1
 */
export const getBodySlot1MarginBottom = (
    hasBodyTitle: boolean,
    cardToken: CardTokenType
): string => {
    if (hasBodyTitle) return String(cardToken.spacing.bodySlot1ToTitle)
    return '0'
}

/**
 * Gets margin bottom for body title
 */
export const getBodyTitleMarginBottom = (
    hasContent: boolean,
    cardToken: CardTokenType
): string => {
    if (hasContent) return String(cardToken.spacing.titleToContent)
    return '0'
}

/**
 * Gets margin bottom for content
 */
export const getContentMarginBottom = (
    hasBodySlot2: boolean,
    cardToken: CardTokenType
): string => {
    if (hasBodySlot2) return String(cardToken.spacing.contentToBodySlot2)
    return '0'
}

/**
 * Gets margin bottom for body slot 2
 */
export const getBodySlot2MarginBottom = (
    hasActionButton: boolean,
    isInlineButton: boolean,
    cardToken: CardTokenType
): string => {
    if (!hasActionButton) return '0'
    return isInlineButton
        ? String(cardToken.spacing.actionInline)
        : String(cardToken.spacing.actionRegular)
}

/**
 * Gets alignment styles for aligned cards
 */
export const getAlignmentStyles = (
    alignment: CardAlignment,
    centerAlign: boolean,
    cardToken: CardTokenType
) => {
    const alignmentConfig = cardToken.alignment[alignment]

    const baseStyles = {
        padding: alignmentConfig.padding,
        gap: alignmentConfig.gap,
        minHeight: alignmentConfig.minHeight,
    }

    if (alignment === CardAlignment.VERTICAL) {
        return {
            ...baseStyles,
            display: 'flex',
            flexDirection: 'column' as const,
            ...(centerAlign && {
                alignItems: 'center',
                textAlign: 'center' as const,
                justifyContent: 'center',
            }),
        }
    }

    if (alignment === CardAlignment.HORIZONTAL) {
        return {
            ...baseStyles,
            display: 'flex',
            flexDirection: 'row' as const,
            ...(centerAlign && {
                alignItems: 'center',
                textAlign: 'center' as const,
            }),
        }
    }

    return baseStyles
}

/**
 * Gets custom card styles (simple wrapper with padding)
 */
export const getCustomCardStyles = (cardToken: CardTokenType) => ({
    padding: cardToken.padding,
})

/**
 * Determines if action button is inline type
 */
export const isInlineActionButton = (actionButton?: {
    subType?: ButtonSubType
}): boolean => {
    return actionButton?.subType === ButtonSubType.INLINE
}
