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
): React.CSSProperties => {
    const boxStyling = cardToken.header[CardVariant.DEFAULT]
    const padding = boxStyling?.padding
        ? `${String(boxStyling.padding.y)} ${String(boxStyling.padding.x)}`
        : undefined

    return {
        backgroundColor: boxStyling?.backgroundColor,
        padding,
        borderBottom: boxStyling?.borderBottom,
        display: 'flex',
        flexDirection: 'column' as const,
    }
}

/**
 * Gets header title styles (shared across all variants)
 */
export const getHeaderTitleStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.header.text.title.fontSize,
    fontWeight: cardToken.header.text.title.fontWeight,
    color: cardToken.header.text.title.color,
})

/**
 * Gets sub header styles (shared across all variants)
 */
export const getSubHeaderStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.header.text.subTitle.fontSize,
    fontWeight: cardToken.header.text.subTitle.fontWeight,
    color: cardToken.header.text.subTitle.color,
})

/**
 * Gets body title styles (shared across all variants)
 */
export const getBodyTitleStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.body.text.title.fontSize,
    fontWeight: cardToken.body.text.title.fontWeight,
    color: cardToken.body.text.title.color,
})

/**
 * Gets body content styles (shared across all variants)
 */
export const getBodyContentStyles = (
    cardToken: CardTokenType
): React.CSSProperties => ({
    fontSize: cardToken.body.text.content.fontSize,
    color: cardToken.body.text.content.color,
})

/**
 * Gets body container styles for default card
 */
export const getBodyStyles = (
    cardToken: CardTokenType
): React.CSSProperties => {
    const bodyPadding = cardToken.body.padding[CardVariant.DEFAULT]
    const padding = bodyPadding
        ? `${String(bodyPadding.y)} ${String(bodyPadding.x)}`
        : undefined

    return {
        padding,
        display: 'flex',
        flexDirection: 'column' as const,
    }
}

/**
 * Gets spacing between header elements for a specific variant
 */
export const getHeaderSpacing = (cardToken: CardTokenType): string => {
    return String(cardToken.header.text.title.gap)
}

/**
 * Gets gap for sub header (replaced marginTop with gap)
 */
export const getHeaderMarginBottom = (
    hasSubHeader: boolean,
    cardToken: CardTokenType
): string => {
    if (!hasSubHeader) return '0'
    return String(cardToken.header.text.gap)
}

/**
 * Gets gap for elements after sub header (using body elements spacing)
 */
export const getSubHeaderMarginBottom = (
    cardToken: CardTokenType,
    variant: CardVariant
): string => {
    return String(cardToken.body.gap[variant] || '0')
}

/**
 * Gets gap for body elements (using body elements spacing)
 */
export const getBodySlot1MarginBottom = (
    hasBodyTitle: boolean,
    cardToken: CardTokenType,
    variant: CardVariant
): string => {
    if (!hasBodyTitle) return '0'
    return String(cardToken.body.gap[variant] || '0')
}

/**
 * Gets gap between body title and content (using title to content spacing)
 */
export const getBodyTitleMarginBottom = (
    hasContent: boolean,
    cardToken: CardTokenType
): string => {
    if (!hasContent) return '0'
    return String(cardToken.body.text.gap || '0')
}

/**
 * Gets gap after content (using body elements spacing)
 */
export const getContentMarginBottom = (
    hasBodySlot2: boolean,
    cardToken: CardTokenType,
    variant: CardVariant
): string => {
    if (!hasBodySlot2) return '0'
    return String(cardToken.body.gap[variant] || '0')
}

/**
 * Gets gap before action button - Simple logic: 14px default, 24px for center-aligned
 */
export const getBodySlot2MarginBottom = (
    hasActionButton: boolean,
    _isInlineButton: boolean,
    cardToken: CardTokenType,
    centerAlign?: boolean
): string => {
    if (!hasActionButton) return '0'

    // For center-aligned cards, always use centerAlignGap (24px)
    if (centerAlign) {
        return String(cardToken.body.actions.centerAlignGap || '0')
    }

    // For all other cases, use base gap (14px)
    return String(cardToken.body.actions.gap || '0')
}

/**
 * Gets custom card styles (simple wrapper with padding)
 */

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
