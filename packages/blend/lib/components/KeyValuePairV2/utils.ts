import type { CSSObject } from 'styled-components'
import {
    TextOverflowMode,
    KeyValuePairV2StateType,
} from './keyValuePairV2.types'
import { KeyValuePairV2TokensType } from './keyValuePairV2.tokens'

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
    keyValuePairState: KeyValuePairV2StateType,
    keyValuePairTokens: KeyValuePairV2TokensType
): CSSObject => {
    const isVertical = keyValuePairState === KeyValuePairV2StateType.vertical

    return {
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        justifyContent: isVertical ? 'flex-start' : 'space-between',
        gap: isVertical
            ? keyValuePairTokens.gap.vertical
            : keyValuePairTokens.gap.horizontal,
    }
}

/**
 * Get slot container styles
 */
export const getSlotStyles = (
    keyValuePairTokens: KeyValuePairV2TokensType
): CSSObject => ({
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: keyValuePairTokens.value?.color,
})
