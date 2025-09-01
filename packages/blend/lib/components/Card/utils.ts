import { CardHeaderVariant, CardSlotVariant } from './types'
import type { CardTokenType } from './card.tokens'

/**
 * Determines if the card is using legacy slot variants
 */
export const isLegacyCard = (
    slot?: {
        variant: CardSlotVariant
        content: React.ReactNode
        centerAlign?: boolean
    },
    header?: {
        variant?: CardHeaderVariant
        title?: string
        subtitle?: string
        actions?: React.ReactNode
        label?: React.ReactNode
    }
): boolean => {
    return slot !== undefined || header !== undefined
}

/**
 * Checks if the slot is a top variant
 */
export const isTopSlotVariant = (slot?: {
    variant: CardSlotVariant
    content: React.ReactNode
    centerAlign?: boolean
}): boolean => {
    return (
        slot?.variant === CardSlotVariant.TOP ||
        slot?.variant === CardSlotVariant.TOP_WITH_PADDING
    )
}

/**
 * Checks if the slot is a left variant
 */
export const isLeftSlotVariant = (slot?: {
    variant: CardSlotVariant
    content: React.ReactNode
    centerAlign?: boolean
}): boolean => {
    return slot?.variant === CardSlotVariant.LEFT
}

/**
 * Checks if the header has a bordered variant
 */
export const isBorderedHeaderVariant = (header?: {
    variant?: CardHeaderVariant
    title?: string
    subtitle?: string
    actions?: React.ReactNode
    label?: React.ReactNode
}): boolean => {
    const headerVariant = header?.variant || CardHeaderVariant.DEFAULT
    return (
        headerVariant === CardHeaderVariant.BORDERED ||
        headerVariant === CardHeaderVariant.BORDERED_WITH_LABEL
    )
}

/**
 * Calculates the main card padding based on variant
 */
export const getCardPadding = (
    isTopSlot: boolean,
    isBorderedHeader: boolean,
    isLeftSlot: boolean,
    cardToken: CardTokenType
): string => {
    if (isTopSlot) return '0'
    if (isBorderedHeader) return '0'
    return String(cardToken.padding || '16px')
}

/**
 * Calculates the content padding based on variant
 */
export const getContentPadding = (
    isTopSlot: boolean,
    isLeftSlot: boolean,
    isBorderedHeader: boolean,
    cardToken: CardTokenType
): string => {
    const padding = String(cardToken.padding || '16px')
    if (isTopSlot) {
        return `0 ${padding} ${padding} ${padding}`
    }
    if (isLeftSlot) return '0'
    if (isBorderedHeader) return padding
    return String(cardToken.content?.padding || '16px')
}

/**
 * Gets the spacing between header and description
 */
export const getHeaderDescriptionSpacing = (): string => {
    return '4px'
}

/**
 * Gets the spacing between description and content slot
 */
export const getDescriptionContentSpacing = (): string => {
    return '16px'
}

/**
 * Gets the spacing between content slot and action button
 */
export const getContentActionSpacing = (isInlineButton: boolean): string => {
    return isInlineButton ? '14px' : '24px'
}

/**
 * Gets the spacing between header text and header slot
 */
export const getHeaderTextSlotSpacing = (): string => {
    return '8px'
}

/**
 * Gets the standard card header styles
 */
export const getHeaderTextStyles = (cardToken: CardTokenType) => ({
    fontSize: cardToken.header.title.fontSize, // body lg
    fontWeight: '600',
    color: '#1F2937', // gray 800
})

/**
 * Gets the standard card description styles with 2-line truncation
 */
export const getDescriptionStyles = (cardToken: CardTokenType) => ({
    fontSize: cardToken.header.subtitle.fontSize, // body md
    color: '#6B7280', // gray 500
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
})

/**
 * Determines margin bottom for header section based on what follows
 */
export const getHeaderMarginBottom = (
    hasDescription: boolean,
    hasContentSlot: boolean,
    hasActionButton: boolean
): string => {
    if (hasDescription) return getHeaderDescriptionSpacing()
    if (hasContentSlot) return getDescriptionContentSpacing()
    if (hasActionButton) return getDescriptionContentSpacing()
    return '0'
}

/**
 * Determines margin bottom for description section based on what follows
 */
export const getDescriptionMarginBottom = (
    hasContentSlot: boolean,
    hasActionButton: boolean
): string => {
    if (hasContentSlot) return getDescriptionContentSpacing()
    if (hasActionButton) return getDescriptionContentSpacing()
    return '0'
}

/**
 * Determines margin bottom for content slot based on action button type
 */
export const getContentSlotMarginBottom = (
    hasActionButton: boolean,
    isInlineButton: boolean
): string => {
    if (!hasActionButton) return '0'
    return getContentActionSpacing(isInlineButton)
}

/**
 * Gets the spacing between slot and sub header title for bordered variant
 */
export const getBorderedSlotSubHeaderSpacing = (): string => {
    return '14px'
}

/**
 * Gets the spacing between sub header title and description for bordered variant
 */
export const getBorderedSubHeaderDescriptionSpacing = (): string => {
    return '6px'
}

/**
 * Gets the spacing between description and content slot for bordered variant
 */
export const getBorderedDescriptionContentSpacing = (): string => {
    return '14px'
}

/**
 * Gets the spacing between content slot and action button for bordered variant
 */
export const getBorderedContentActionSpacing = (): string => {
    return '14px'
}

/**
 * Gets the bordered header styles
 */
export const getBorderedHeaderStyles = (cardToken: CardTokenType) => ({
    padding: '12px 16px',
    backgroundColor: '#F9FAFB', // gray 25
    borderBottom: '1px solid #E5E7EB', // gray 200
})

/**
 * Gets the bordered header title styles
 */
export const getBorderedHeaderTitleStyles = (cardToken: CardTokenType) => ({
    fontSize: cardToken.header.title.fontSize, // body lg
    fontWeight: '600',
    color: '#1F2937', // gray 800
})

/**
 * Gets the bordered header description styles
 */
export const getBorderedHeaderDescriptionStyles = () => ({
    fontSize: '12px', // body sm
    color: '#6B7280', // gray 500
    marginTop: '2px',
})

/**
 * Gets the sub header title styles for bordered variant
 */
export const getBorderedSubHeaderTitleStyles = () => ({
    fontSize: '14px', // body md
    fontWeight: '500',
    color: '#1F2937', // gray 800
})

/**
 * Gets the description styles for bordered variant
 */
export const getBorderedDescriptionStyles = () => ({
    fontSize: '14px', // body md
    color: '#6B7280', // gray 500
})
