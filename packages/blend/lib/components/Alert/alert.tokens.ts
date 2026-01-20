import type { CSSObject } from 'styled-components'
import { AlertStyle, AlertVariant } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'

//Original Pattern: component.[target].CSSProp.[size].[variant].[subType].[state].value
/**
 * Alert Tokens following the pattern: [target].CSSProp.[variant].[style]
 *
 * Structure:
 * - target: container | button (defines the element the token applies to)
 * - CSSProp:
 *   - container: padding | borderRadius | background.[variant].[style] | border.[variant]
 *   - button: color per [variant]
 * - variant: primary | warning | success | purple | neutral | error | orange
 * - style: subtle | noFill (applies to background only)
 *
 * Notes:
 * - Size-independent properties: padding, borderRadius, background, border, button
 * - Background uses an additional style dimension; border/button are variant-only
 */
export type AlertTokenType = {
    // Pattern: width
    width: CSSObject['width']
    // Pattern: maxWidth
    maxWidth: CSSObject['maxWidth']
    // Pattern: minWidth
    minWidth: CSSObject['minWidth']
    // Pattern: gap
    gap: CSSObject['gap']
    // Pattern: padding
    padding: CSSObject['padding']
    // Pattern: borderRadius
    borderRadius: CSSObject['borderRadius']
    // Pattern: background.[variant].[style]
    background: {
        [key in AlertVariant]: {
            [key in AlertStyle]: CSSObject['color']
        }
    }
    // Pattern: border.[variant].[style]
    border: {
        [key in AlertVariant]: {
            [key in AlertStyle]: CSSObject['color']
        }
    }
    // Pattern: text.heading.[variant] | text.description.[variant]
    text: {
        heading: {
            color: { [key in AlertVariant]: CSSObject['color'] }
            fontWeight: CSSObject['fontWeight']
            fontSize: CSSObject['fontSize']
            lineHeight: CSSObject['lineHeight']
        }
        description: {
            color: { [key in AlertVariant]: CSSObject['color'] }
            fontWeight: CSSObject['fontWeight']
            fontSize: CSSObject['fontSize']
            lineHeight: CSSObject['lineHeight']
        }
    }

    // Pattern: button.[variant].
    button: {
        gap: CSSObject['gap']
        primaryAction: {
            color: { [key in AlertVariant]: CSSObject['color'] }
            fontWeight: CSSObject['fontWeight']
            fontSize: CSSObject['fontSize']
            lineHeight: CSSObject['lineHeight']
        }
        secondaryAction: {
            color: { [key in AlertVariant]: CSSObject['color'] }
            fontWeight: CSSObject['fontWeight']
            fontSize: CSSObject['fontSize']
            lineHeight: CSSObject['lineHeight']
        }
        closeButton: {
            color: { [key in AlertVariant]: CSSObject['color'] }
            fontWeight: CSSObject['fontWeight']
            fontSize: CSSObject['fontSize']
            lineHeight: CSSObject['lineHeight']
        }
    }
}

export type ResponsiveAlertTokens = {
    [key in keyof BreakpointType]: AlertTokenType
}

export const getAlertTokens = (
    foundationToken: FoundationTokenType
): ResponsiveAlertTokens => {
    return {
        sm: {
            // width
            width: 'auto',
            // maxWidth
            maxWidth: '900px',
            minWidth: '300px',
            gap: foundationToken.unit[8],
            // padding
            padding: foundationToken.unit[16],
            // borderRadius
            borderRadius: foundationToken.border.radius[8],
            // background.[variant].[style]
            background: {
                primary: {
                    subtle: foundationToken.colors.primary[50],
                    noFill: foundationToken.colors.gray[0],
                },
                warning: {
                    subtle: foundationToken.colors.yellow[50],
                    noFill: foundationToken.colors.gray[0],
                },
                success: {
                    subtle: foundationToken.colors.green[50],
                    noFill: foundationToken.colors.gray[0],
                },
                purple: {
                    subtle: foundationToken.colors.purple[50],
                    noFill: foundationToken.colors.gray[0],
                },
                neutral: {
                    subtle: foundationToken.colors.gray[50],
                    noFill: foundationToken.colors.gray[0],
                },
                error: {
                    subtle: foundationToken.colors.red[50],
                    noFill: foundationToken.colors.gray[0],
                },
                orange: {
                    subtle: foundationToken.colors.orange[50],
                    noFill: foundationToken.colors.gray[0],
                },
            },
            // border.[variant]
            border: {
                primary: {
                    subtle: `1px solid ${foundationToken.colors.primary[500]}`,
                    noFill: `1px solid ${foundationToken.colors.primary[500]}`,
                },
                warning: {
                    subtle: `1px solid ${foundationToken.colors.yellow[500]}`,
                    noFill: `1px solid ${foundationToken.colors.yellow[500]}`,
                },
                success: {
                    subtle: `1px solid ${foundationToken.colors.green[500]}`,
                    noFill: `1px solid ${foundationToken.colors.green[500]}`,
                },
                purple: {
                    subtle: `1px solid ${foundationToken.colors.purple[500]}`,
                    noFill: `1px solid ${foundationToken.colors.purple[500]}`,
                },
                neutral: {
                    subtle: `1px solid ${foundationToken.colors.gray[500]}`,
                    noFill: `1px solid ${foundationToken.colors.gray[500]}`,
                },
                error: {
                    subtle: `1px solid ${foundationToken.colors.red[500]}`,
                    noFill: `1px solid ${foundationToken.colors.red[500]}`,
                },
                orange: {
                    subtle: `1px solid ${foundationToken.colors.orange[500]}`,
                    noFill: `1px solid ${foundationToken.colors.orange[500]}`,
                },
            },
            // text.[variant]
            text: {
                heading: {
                    color: {
                        primary: foundationToken.colors.gray[700],
                        warning: foundationToken.colors.gray[700],
                        success: foundationToken.colors.gray[700],
                        purple: foundationToken.colors.gray[700],
                        neutral: foundationToken.colors.gray[700],
                        error: foundationToken.colors.gray[700],
                        orange: foundationToken.colors.gray[700],
                    },
                    fontWeight: foundationToken.font.weight[600],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
                description: {
                    color: {
                        primary: foundationToken.colors.gray[600],
                        warning: foundationToken.colors.gray[600],
                        success: foundationToken.colors.gray[600],
                        purple: foundationToken.colors.gray[600],
                        neutral: foundationToken.colors.gray[600],
                        error: foundationToken.colors.gray[600],
                        orange: foundationToken.colors.gray[600],
                    },
                    fontWeight: foundationToken.font.weight[400],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
            },
            // button.[variant]
            button: {
                gap: foundationToken.unit[20],
                primaryAction: {
                    color: {
                        primary: foundationToken.colors.primary[700],
                        warning: foundationToken.colors.yellow[700],
                        success: foundationToken.colors.green[700],
                        purple: foundationToken.colors.purple[700],
                        neutral: foundationToken.colors.gray[700],
                        error: foundationToken.colors.red[700],
                        orange: foundationToken.colors.orange[700],
                    },
                    fontWeight: foundationToken.font.weight[600],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
                secondaryAction: {
                    color: {
                        primary: foundationToken.colors.primary[700],
                        warning: foundationToken.colors.yellow[700],
                        success: foundationToken.colors.green[700],
                        purple: foundationToken.colors.purple[700],
                        neutral: foundationToken.colors.gray[700],
                        error: foundationToken.colors.red[700],
                        orange: foundationToken.colors.orange[700],
                    },
                    fontWeight: foundationToken.font.weight[600],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
                closeButton: {
                    color: {
                        primary: foundationToken.colors.primary[700],
                        warning: foundationToken.colors.yellow[700],
                        success: foundationToken.colors.green[700],
                        purple: foundationToken.colors.purple[700],
                        neutral: foundationToken.colors.gray[700],
                        error: foundationToken.colors.red[700],
                        orange: foundationToken.colors.orange[700],
                    },
                    fontWeight: foundationToken.font.weight[600],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
            },
        },
        lg: {
            // width
            width: 'auto',
            // maxWidth
            maxWidth: '900px',
            // minWidth
            minWidth: '300px',
            // width
            // gap
            gap: foundationToken.unit[8],
            // padding
            padding: foundationToken.unit[16],
            // borderRadius
            borderRadius: foundationToken.border.radius[8],
            // background.[variant].[style]
            background: {
                primary: {
                    subtle: foundationToken.colors.primary[50],
                    noFill: foundationToken.colors.gray[0],
                },
                warning: {
                    subtle: foundationToken.colors.yellow[50],
                    noFill: foundationToken.colors.gray[0],
                },
                success: {
                    subtle: foundationToken.colors.green[50],
                    noFill: foundationToken.colors.gray[0],
                },
                purple: {
                    subtle: foundationToken.colors.purple[50],
                    noFill: foundationToken.colors.gray[0],
                },
                neutral: {
                    subtle: foundationToken.colors.gray[50],
                    noFill: foundationToken.colors.gray[0],
                },
                error: {
                    subtle: foundationToken.colors.red[50],
                    noFill: foundationToken.colors.gray[0],
                },
                orange: {
                    subtle: foundationToken.colors.orange[50],
                    noFill: foundationToken.colors.gray[0],
                },
            },
            // border.[variant]
            border: {
                primary: {
                    subtle: `1px solid ${foundationToken.colors.primary[500]}`,
                    noFill: `1px solid ${foundationToken.colors.primary[500]}`,
                },
                warning: {
                    subtle: `1px solid ${foundationToken.colors.yellow[500]}`,
                    noFill: `1px solid ${foundationToken.colors.yellow[500]}`,
                },
                success: {
                    subtle: `1px solid ${foundationToken.colors.green[500]}`,
                    noFill: `1px solid ${foundationToken.colors.green[500]}`,
                },
                purple: {
                    subtle: `1px solid ${foundationToken.colors.purple[500]}`,
                    noFill: `1px solid ${foundationToken.colors.purple[500]}`,
                },
                neutral: {
                    subtle: `1px solid ${foundationToken.colors.gray[500]}`,
                    noFill: `1px solid ${foundationToken.colors.gray[500]}`,
                },
                error: {
                    subtle: `1px solid ${foundationToken.colors.red[500]}`,
                    noFill: `1px solid ${foundationToken.colors.red[500]}`,
                },
                orange: {
                    subtle: `1px solid ${foundationToken.colors.orange[500]}`,
                    noFill: `1px solid ${foundationToken.colors.orange[500]}`,
                },
            },

            text: {
                heading: {
                    color: {
                        primary: foundationToken.colors.gray[700],
                        warning: foundationToken.colors.gray[700],
                        success: foundationToken.colors.gray[700],
                        purple: foundationToken.colors.gray[700],
                        neutral: foundationToken.colors.gray[700],
                        error: foundationToken.colors.gray[700],
                        orange: foundationToken.colors.gray[700],
                    },
                    fontWeight: foundationToken.font.weight[600],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
                description: {
                    color: {
                        primary: foundationToken.colors.gray[600],
                        warning: foundationToken.colors.gray[600],
                        success: foundationToken.colors.gray[600],
                        purple: foundationToken.colors.gray[600],
                        neutral: foundationToken.colors.gray[600],
                        error: foundationToken.colors.gray[600],
                        orange: foundationToken.colors.gray[600],
                    },
                    fontWeight: foundationToken.font.weight[400],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
            },

            // button.[variant]
            button: {
                gap: foundationToken.unit[20],
                primaryAction: {
                    color: {
                        primary: foundationToken.colors.primary[700],
                        warning: foundationToken.colors.yellow[700],
                        success: foundationToken.colors.green[700],
                        purple: foundationToken.colors.purple[700],
                        neutral: foundationToken.colors.gray[700],
                        error: foundationToken.colors.red[700],
                        orange: foundationToken.colors.orange[700],
                    },
                    fontWeight: foundationToken.font.weight[600],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
                secondaryAction: {
                    color: {
                        primary: foundationToken.colors.primary[700],
                        warning: foundationToken.colors.yellow[700],
                        success: foundationToken.colors.green[700],
                        purple: foundationToken.colors.purple[700],
                        neutral: foundationToken.colors.gray[700],
                        error: foundationToken.colors.red[700],
                        orange: foundationToken.colors.orange[700],
                    },
                    fontWeight: foundationToken.font.weight[600],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
                closeButton: {
                    color: {
                        primary: foundationToken.colors.primary[700],
                        warning: foundationToken.colors.yellow[700],
                        success: foundationToken.colors.green[700],
                        purple: foundationToken.colors.purple[700],
                        neutral: foundationToken.colors.gray[700],
                        error: foundationToken.colors.red[700],
                        orange: foundationToken.colors.orange[700],
                    },
                    fontWeight: foundationToken.font.weight[600],
                    fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                    lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
                },
            },
        },
    }
}
