import { type CSSObject } from 'styled-components'
import { TooltipSize } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

//Original Pattern: component.[target].CSSProp.[size].[variant].[state].value
/**
 * Tooltip Tokens following the pattern: [target].CSSProp.[size]
 *
 * Structure:
 * - target:  text (defines what element the token applies to)
 * - CSSProp: background | borderRadius | maxWidth | padding | gap | color | fontWeight | fontSize | lineHeight
 * - size: sm | lg (tooltip size)
 *
 * Notes:
 * - Size-independent properties: background, text.color
 * - Size-dependent properties: borderRadius, maxWidth, padding, gap, text.fontWeight, text.fontSize, text.lineHeight
 */
export type TooltipTokensType = {
    // Pattern: background (size-independent)
    background: CSSObject['backgroundColor']
    // Pattern: borderRadius.[size]
    borderRadius: {
        [key in TooltipSize]: CSSObject['borderRadius']
    }
    // Pattern: maxWidth.[size]
    maxWidth: {
        [key in TooltipSize]: CSSObject['maxWidth']
    }
    // Pattern: padding.[size]
    padding: {
        [key in TooltipSize]: CSSObject['padding']
    }

    // Pattern: gap.[size]
    gap: {
        [key in TooltipSize]: CSSObject['gap']
    }
    // Pattern: text.color (size-independent) text.fontWeight.[size] text.fontSize.[size] text.lineHeight.[size]
    text: {
        // Pattern: text.color (size-independent)
        color: CSSObject['color']
        // Pattern: text.fontWeight.[size]
        fontWeight: {
            [key in TooltipSize]: CSSObject['fontWeight']
        }
        // Pattern: text.fontSize.[size]
        fontSize: {
            [key in TooltipSize]: CSSObject['fontSize']
        }
        // Pattern: text.lineHeight.[size]
        lineHeight: {
            [key in TooltipSize]: CSSObject['lineHeight']
        }
    }
}

export type ResponsiveTooltipTokens = {
    [key in keyof BreakpointType]: TooltipTokensType
}

export const getTooltipTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTooltipTokens => {
    return {
        sm: {
            // background (size-independent)
            background: foundationToken.colors.gray[900],
            // borderRadius.[size]
            borderRadius: {
                sm: foundationToken.border.radius[6],
                lg: foundationToken.border.radius[8],
            },
            // maxWidth.[size]
            maxWidth: {
                sm: '320px',
                lg: '384px',
            },
            // padding.[size]
            padding: {
                sm: `${foundationToken.unit[4]} ${foundationToken.unit[6]}`,
                lg: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
            },

            // gap.[size]
            gap: {
                sm: foundationToken.unit[4],
                lg: foundationToken.unit[6],
            },
            text: {
                // text.color (size-independent)
                color: foundationToken.colors.gray[0],
                // text.fontWeight.[size]
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                // text.fontSize.[size]
                fontSize: {
                    sm: `${foundationToken.font.size.body.xs.fontSize}px`,
                    lg: `${foundationToken.font.size.body.sm.fontSize}px`,
                },
                // text.lineHeight.[size]
                lineHeight: {
                    sm: `${foundationToken.font.size.body.xs.lineHeight}px`,
                    lg: `${foundationToken.font.size.body.sm.lineHeight}px`,
                },
            },
        },
        lg: {
            // background (size-independent)
            background: foundationToken.colors.gray[900],

            // borderRadius.[size]
            borderRadius: {
                sm: foundationToken.border.radius[6],
                lg: foundationToken.border.radius[8],
            },
            // maxWidth.[size]
            maxWidth: {
                sm: '320px',
                lg: '384px',
            },
            // padding.[size]
            padding: {
                sm: `${foundationToken.unit[4]} ${foundationToken.unit[6]}`,
                lg: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
            },

            // gap.[size]
            gap: {
                sm: foundationToken.unit[4],
                lg: foundationToken.unit[6],
            },

            text: {
                // text.color (size-independent)
                color: foundationToken.colors.gray[0],
                // text.fontWeight.[size]
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                // text.fontSize.[size]
                fontSize: {
                    sm: `${foundationToken.font.size.body.xs.fontSize}px`,
                    lg: `${foundationToken.font.size.body.sm.fontSize}px`,
                },
                // text.lineHeight.[size]
                lineHeight: {
                    sm: `${foundationToken.font.size.body.xs.lineHeight}px`,
                    lg: `${foundationToken.font.size.body.sm.lineHeight}px`,
                },
            },
        },
    }
}
