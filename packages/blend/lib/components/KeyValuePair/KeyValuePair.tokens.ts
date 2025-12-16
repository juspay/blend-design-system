import type { CSSObject } from 'styled-components'
import { KeyValuePairSize } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

/**
 * KeyValuePair Tokens following the pattern: [target].CSSProp.[size].[state]
 * component.CSSProp.[size].[variant].[subType].[state].value
 * Structure:
 * - target: container | key | value (defines what element the token applies to)
 * - CSSProp: gap | color | fontSize
 * - size: sm | md | lg (only for size-dependent properties like value fontSize)
 * - state: vertical | horizontal (layout state)
 *
 * Size-independent properties: gap, key color, key fontSize, value color
 * Size-dependent properties: value fontSize
 */
export type KeyValuePairTokensType = {
    // gap: CSSObject['gap']
    // // Pattern: key.color (size-independent)
    gap: {
        [key in 'vertical' | 'horizontal']: CSSObject['gap']
    }

    key: {
        color: CSSObject['color']
        // Pattern: key.fontSize (size-independent)
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        gap: CSSObject['gap']
    }
    // Pattern: value.color (size-independent)
    // Pattern: value.fontSize.[size] (size-dependent)
    // Pattern: value.fontWeight (size-independent)
    value: {
        color: CSSObject['color']
        fontSize: {
            [key in KeyValuePairSize]: CSSObject['fontSize']
        }
        fontWeight: CSSObject['fontWeight']
        gap: CSSObject['gap']
    }
}

export type ResponsiveKeyValuePairTokens = {
    [key in keyof BreakpointType]: KeyValuePairTokensType
}

export const getKeyValuePairTokens = (
    foundationToken: FoundationTokenType
): ResponsiveKeyValuePairTokens => {
    return {
        sm: {
            gap: {
                vertical: foundationToken.unit[4], // 4px
                horizontal: foundationToken.unit[0], // 0px
            },
            // Pattern: key.color (size-independent)
            key: {
                color: foundationToken.colors.gray[500],
                // Pattern: key.fontSize (size-independent)
                fontSize: foundationToken.font.size.body.md.fontSize, // 14px
                fontWeight: foundationToken.font.weight[400], // 400
                gap: foundationToken.unit[8], // 8px
            },
            // Pattern: value.color (size-independent)
            // Pattern: value.fontSize.[size].[state] (size-dependent)
            value: {
                color: foundationToken.colors.gray[700],
                fontSize: {
                    [KeyValuePairSize.SMALL]:
                        foundationToken.font.size.body.md.fontSize, // 14px
                    [KeyValuePairSize.MEDIUM]:
                        foundationToken.font.size.body.lg.fontSize, // 16px
                    [KeyValuePairSize.LARGE]: 18, // 18px
                },
                fontWeight: foundationToken.font.weight[600], // 600
                gap: foundationToken.unit[8], // 8px
            },
        },
        lg: {
            gap: {
                vertical: foundationToken.unit[4], // 4px
                horizontal: foundationToken.unit[0], // 0px
            },
            // Pattern: key.color (size-independent)
            key: {
                color: foundationToken.colors.gray[500],
                // Pattern: key.fontSize (size-independent) - Fixed to 14px instead of 16px
                fontSize: foundationToken.font.size.body.md.fontSize, // 14px (was lg.fontSize which is 16px)
                fontWeight: foundationToken.font.weight[400], // 400
                gap: foundationToken.unit[8], // 8px
            },
            // Pattern: value.color (size-independent)
            // Pattern: value.fontSize.[size].[state] (size-dependent)
            value: {
                color: foundationToken.colors.gray[700],
                fontSize: {
                    [KeyValuePairSize.SMALL]:
                        foundationToken.font.size.body.md.fontSize, // 14px
                    [KeyValuePairSize.MEDIUM]:
                        foundationToken.font.size.body.lg.fontSize, // 16px
                    [KeyValuePairSize.LARGE]:
                        foundationToken.font.size.heading.sm.fontSize, // 18px
                },
                fontWeight: foundationToken.font.weight[600], // 600
                gap: foundationToken.unit[8], // 8px
            },
        },
    }
}
