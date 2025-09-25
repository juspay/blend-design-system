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
    fontSize: cardToken.header.text.subTitle.fontSize,
    fontWeight: cardToken.header.text.subTitle.fontWeight,
    color: cardToken.header.text.subTitle.color,
})

/**
 * Gets body title styles
 */
export const getBodyTitleStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.body.content.text.title.fontSize,
    fontWeight: cardToken.body.content.text.title.fontWeight,
    color: cardToken.body.content.text.title.color,
})

/**
 * Gets body content styles
 */
export const getBodyContentStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.body.content.text.content.fontSize,
    color: cardToken.body.content.text.content.color,
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
 * Gets spacing between header elements for a specific variant
 */
export const getHeaderSpacing = (
    cardToken: CardTokenType,
    variant: CardVariant
): string => {
    return String(cardToken.header.gap[variant])
}

/**
 * Gets gap for sub header (replaced marginTop with gap)
 */
export const getHeaderMarginBottom = (
    hasSubHeader: boolean,
    cardToken: CardTokenType
): string => {
    if (hasSubHeader) return String(cardToken.header.titleToSubTitleGap)
    return '0'
}

/**
 * Gets gap for elements after sub header (using body elements spacing)
 */
export const getSubHeaderMarginBottom = (
    cardToken: CardTokenType,
    variant: CardVariant
): string => {
    return String(cardToken.body.gap[variant]) // variant-dependent spacing
}

/**
 * Gets gap for body elements (using body elements spacing)
 */
export const getBodySlot1MarginBottom = (
    hasBodyTitle: boolean,
    cardToken: CardTokenType,
    variant: CardVariant
): string => {
    if (hasBodyTitle) return String(cardToken.body.gap[variant]) // variant-dependent spacing
    return '0'
}

/**
 * Gets gap between body title and content (using title to content spacing)
 */
export const getBodyTitleMarginBottom = (
    hasContent: boolean,
    cardToken: CardTokenType
): string => {
    if (hasContent) return String(cardToken.body.titleToContentGap) // 6px for closely related content
    return '0'
}

/**
 * Gets gap after content (using body elements spacing)
 */
export const getContentMarginBottom = (
    hasBodySlot2: boolean,
    cardToken: CardTokenType,
    variant: CardVariant
): string => {
    if (hasBodySlot2) return String(cardToken.body.gap[variant]) // variant-dependent spacing
    return '0'
}

/**
 * Gets gap before action button
 */
export const getBodySlot2MarginBottom = (
    hasActionButton: boolean,
    isInlineButton: boolean,
    cardToken: CardTokenType,
    variant: CardVariant
): string => {
    if (!hasActionButton) return '0'
    return isInlineButton
        ? String(cardToken.body.actions.inlineButtonsGap[variant]) // variant-dependent inline spacing
        : String(cardToken.body.actions.regularButtonsGap[variant]) // variant-dependent regular spacing
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
 * Center-aligned cards use regular buttons, non-center-aligned use inline buttons
 */
export const isInlineActionButton = (
    _actionButton?: {
        subType?: ButtonSubType
    },
    centerAlign?: boolean
): boolean => {
    // For center-aligned cards, use regular buttons (not inline)
    if (centerAlign) return false

    // For all other cases, use inline buttons
    return true
}
