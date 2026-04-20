import type { CSSObject } from 'styled-components'

export type TextOverflowMode = 'truncate' | 'wrap' | 'wrap-clamp'

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
