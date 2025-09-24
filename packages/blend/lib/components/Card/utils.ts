import React from 'react'
import { CardVariant } from './types'
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
export const getHeaderBoxStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    backgroundColor: cardToken.header.backgroundColor,
    padding: cardToken.header.padding,
    borderBottom: cardToken.header.borderBottom,
    display: 'flex',
    flexDirection: 'column' as const,
})

/**
 * Gets header title styles
 */
export const getHeaderTitleStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.header.text.title.fontSize,
    fontWeight: cardToken.header.text.title.fontWeight,
    color: cardToken.header.text.title.color,
})

/**
 * Gets sub header styles
 */
export const getSubHeaderStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.header.text.subHeader.fontSize,
    fontWeight: cardToken.header.text.subHeader.fontWeight,
    color: cardToken.header.text.subHeader.color,
})

/**
 * Gets body title styles
 */
export const getBodyTitleStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.body.text.title.fontSize,
    fontWeight: cardToken.body.text.title.fontWeight,
    color: cardToken.body.text.title.color,
})

/**
 * Gets body content styles
 */
export const getBodyContentStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.body.text.content.fontSize,
    color: cardToken.body.text.content.color,
})

/**
 * Gets body container styles
 */
export const getBodyStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    padding: cardToken.body.padding,
    display: 'flex',
    flexDirection: 'column' as const,
})

/**
 * Gets spacing between header slots
 */
export const getHeaderSlotSpacing = (cardToken: CardTokenType): string => {
    return String(cardToken.header.slot.gap)
}

/**
 * Gets margin bottom for header based on what follows
 */
export const getHeaderMarginBottom = (
    hasSubHeader: boolean,
    cardToken: CardTokenType
): string => {
    if (hasSubHeader) return String(cardToken.header.text.subHeader.marginTop)
    return '0'
}

/**
 * Gets margin bottom for sub header
 */
export const getSubHeaderMarginBottom = (cardToken: CardTokenType): string => {
    return String(cardToken.body.slot.slot1.marginTop)
}

/**
 * Gets margin bottom for body slot 1
 */
export const getBodySlot1MarginBottom = (
    hasBodyTitle: boolean,
    cardToken: CardTokenType
): string => {
    if (hasBodyTitle) return String(cardToken.body.text.title.marginTop)
    return '0'
}

/**
 * Gets margin bottom for body title
 */
export const getBodyTitleMarginBottom = (
    hasContent: boolean,
    cardToken: CardTokenType
): string => {
    if (hasContent) return String(cardToken.body.text.content.marginTop)
    return '0'
}

/**
 * Gets margin bottom for content
 */
export const getContentMarginBottom = (
    hasBodySlot2: boolean,
    cardToken: CardTokenType
): string => {
    if (hasBodySlot2) return String(cardToken.body.slot.slot2.marginTop)
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
        ? String(cardToken.action.inline.marginTop)
        : String(cardToken.action.regular.marginTop)
}

/**
 * Gets custom card styles (simple wrapper with padding)
 */
export const getCustomCardStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
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
