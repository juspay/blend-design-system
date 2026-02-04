import type { CSSObject } from 'styled-components'
import { TextOverflowMode, KeyValuePairStateType } from './types'
import { KeyValuePairTokensType } from './KeyValuePair.tokens'

/**
 * Get text styles based on overflow mode
 */
export const getTextStyles = (
    textOverflow: TextOverflowMode,
    maxLines: number,
    slotPresent: boolean
): CSSObject => {
    const baseStyles: CSSObject = !slotPresent
        ? {
              width: '100%',
          }
        : {}

    const ellipsisStyles: CSSObject = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }

    switch (textOverflow) {
        case 'truncate':
            return {
                ...baseStyles,
                ...ellipsisStyles,
            }
        case 'wrap':
            return {
                ...baseStyles,
                whiteSpace: 'normal',
                wordBreak: 'break-word',
            }
        case 'wrap-clamp':
            return {
                ...baseStyles,
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
            }
        default:
            return baseStyles
    }
}

/**
 * Get PrimitiveText styles based on overflow mode
 */
export const getPrimitiveTextStyles = (
    textOverflow: TextOverflowMode
): CSSObject => {
    const baseStyles: CSSObject = {
        display: 'block',
    }

    if (textOverflow === 'truncate') {
        return {
            ...baseStyles,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }
    }

    return baseStyles
}

/**
 * Get container styles based on text overflow mode and max width
 */
export const getContainerStyles = (
    textOverflow: TextOverflowMode,
    maxWidth: string
): CSSObject => {
    return {
        width: textOverflow === 'wrap' ? '100%' : maxWidth,
        maxWidth: textOverflow === 'wrap' ? maxWidth : undefined,
    }
}

/**
 * Get flex direction and gap based on layout state
 */
export const getLayoutStyles = (
    keyValuePairState: KeyValuePairStateType,
    keyValuePairTokens: KeyValuePairTokensType
): CSSObject => {
    const isVertical = keyValuePairState === KeyValuePairStateType.vertical

    return {
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        justifyContent: isVertical ? 'flex-start' : 'space-between',
        gap: isVertical
            ? keyValuePairTokens.gap.vertical
            : keyValuePairTokens.gap.horizontal,
    }
}

/**
 * Get slot container styles
 */
export const getSlotStyles = (): CSSObject => ({
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
