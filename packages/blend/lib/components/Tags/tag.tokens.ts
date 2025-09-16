import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME, type ThemeType } from '../../tokens'
import { TagColor, TagShape, TagSize, TagVariant } from './types'
import { type BreakpointType } from '../../breakpoints/breakPoints'

// TagTokens following pattern: CSSProperty.[size].[variant].[subType].[state]
// - CSSProperty: backgroundColor, color, borderColor, borderRadius, borderWidth, fontSize, fontWeight, gap, padding, height
// - size: xs, sm, md, lg (optional - not all properties need size variants)
// - variant: noFill, attentive, subtle (optional - some properties like fontSize don't have variants)
// - subType: neutral, primary, success, error, warning, purple (for colors) | squarical, rounded (for shapes)
// - state: default (can be extended for hover, focus, etc.)
export type TagTokensType = Readonly<{
    // CSS Property: backgroundColor - follows pattern backgroundColor.[variant].[subType]
    backgroundColor: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['backgroundColor']
        }
    }
    // CSS Property: color - follows pattern color.[variant].[subType]
    color: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['color']
        }
    }
    // CSS Property: borderColor - follows pattern borderColor.[variant].[subType]
    borderColor: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['borderColor']
        }
    }
    // CSS Property: borderRadius - follows pattern borderRadius.[subType].[size] (shape as subType)
    borderRadius: {
        [key in TagShape]: {
            [key in TagSize]: CSSObject['borderRadius']
        }
    }
    // CSS Property: borderWidth - follows pattern borderWidth.[variant].[subType]
    borderWidth: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['borderWidth']
        }
    }
    // CSS Property: fontSize - follows pattern fontSize.[size]
    fontSize: {
        [key in TagSize]: CSSObject['fontSize']
    }
    // CSS Property: fontWeight - follows pattern fontWeight.[size]
    fontWeight: {
        [key in TagSize]: CSSObject['fontWeight']
    }
    // CSS Property: gap - follows pattern gap.[size]
    gap: {
        [key in TagSize]: CSSObject['gap']
    }
    // CSS Property: padding - follows pattern padding.[size]
    padding: {
        [key in TagSize]: CSSObject['padding']
    }
    // CSS Property: height - follows pattern height.[size]
    height: {
        [key in TagSize]: CSSObject['height']
    }
}>

export type ResponsiveTagTokens = {
    [key in keyof BreakpointType]: TagTokensType
}

const tagTokens: TagTokensType = {
    backgroundColor: {
        noFill: {
            neutral: FOUNDATION_THEME.colors.gray[0],
            primary: FOUNDATION_THEME.colors.gray[0],
            success: FOUNDATION_THEME.colors.gray[0],
            error: FOUNDATION_THEME.colors.gray[0],
            warning: FOUNDATION_THEME.colors.gray[0],
            purple: FOUNDATION_THEME.colors.gray[0],
        },
        attentive: {
            neutral: FOUNDATION_THEME.colors.gray[950],
            primary: FOUNDATION_THEME.colors.primary[600],
            success: FOUNDATION_THEME.colors.green[600],
            error: FOUNDATION_THEME.colors.red[600],
            warning: FOUNDATION_THEME.colors.orange[500],
            purple: FOUNDATION_THEME.colors.purple[500],
        },
        subtle: {
            neutral: FOUNDATION_THEME.colors.gray[50],
            primary: FOUNDATION_THEME.colors.primary[50],
            success: FOUNDATION_THEME.colors.green[50],
            error: FOUNDATION_THEME.colors.red[50],
            warning: FOUNDATION_THEME.colors.orange[50],
            purple: FOUNDATION_THEME.colors.purple[50],
        },
    },
    color: {
        noFill: {
            neutral: FOUNDATION_THEME.colors.gray[950],
            primary: FOUNDATION_THEME.colors.primary[800],
            success: FOUNDATION_THEME.colors.green[600],
            error: FOUNDATION_THEME.colors.red[600],
            warning: FOUNDATION_THEME.colors.orange[500],
            purple: FOUNDATION_THEME.colors.purple[500],
        },
        attentive: {
            neutral: FOUNDATION_THEME.colors.gray[0],
            primary: FOUNDATION_THEME.colors.gray[0],
            success: FOUNDATION_THEME.colors.gray[0],
            error: FOUNDATION_THEME.colors.gray[0],
            warning: FOUNDATION_THEME.colors.gray[0],
            purple: FOUNDATION_THEME.colors.gray[0],
        },
        subtle: {
            neutral: FOUNDATION_THEME.colors.gray[950],
            primary: FOUNDATION_THEME.colors.primary[600],
            success: FOUNDATION_THEME.colors.green[600],
            error: FOUNDATION_THEME.colors.red[600],
            warning: FOUNDATION_THEME.colors.orange[600],
            purple: FOUNDATION_THEME.colors.purple[600],
        },
    },
    borderColor: {
        noFill: {
            neutral: FOUNDATION_THEME.colors.gray[950],
            primary: FOUNDATION_THEME.colors.primary[600],
            success: FOUNDATION_THEME.colors.green[600],
            error: FOUNDATION_THEME.colors.red[600],
            warning: FOUNDATION_THEME.colors.orange[500],
            purple: FOUNDATION_THEME.colors.purple[500],
        },
        subtle: {
            neutral: FOUNDATION_THEME.colors.gray[200],
            primary: FOUNDATION_THEME.colors.primary[100],
            success: FOUNDATION_THEME.colors.green[100],
            error: FOUNDATION_THEME.colors.red[100],
            warning: FOUNDATION_THEME.colors.orange[100],
            purple: FOUNDATION_THEME.colors.purple[100],
        },
        attentive: {
            neutral: FOUNDATION_THEME.colors.gray[950],
            primary: FOUNDATION_THEME.colors.primary[600],
            success: FOUNDATION_THEME.colors.green[600],
            error: FOUNDATION_THEME.colors.red[600],
            warning: FOUNDATION_THEME.colors.orange[500],
            purple: FOUNDATION_THEME.colors.purple[500],
        },
    },
    borderRadius: {
        squarical: {
            xs: FOUNDATION_THEME.border.radius[6],
            sm: FOUNDATION_THEME.border.radius[6],
            md: FOUNDATION_THEME.border.radius[6],
            lg: FOUNDATION_THEME.border.radius[8],
        },
        rounded: {
            xs: FOUNDATION_THEME.border.radius.full,
            sm: FOUNDATION_THEME.border.radius.full,
            md: FOUNDATION_THEME.border.radius.full,
            lg: FOUNDATION_THEME.border.radius.full,
        },
    },
    borderWidth: {
        noFill: {
            neutral: 1,
            primary: 1,
            success: 1,
            error: 1,
            warning: 1,
            purple: 1,
        },
        subtle: {
            neutral: 1,
            primary: 1,
            success: 1,
            error: 1,
            warning: 1,
            purple: 1,
        },
        attentive: {
            neutral: 1,
            primary: 1,
            success: 1,
            error: 1,
            warning: 1,
            purple: 1,
        },
    },
    fontSize: {
        xs: FOUNDATION_THEME.font.size.body.sm.fontSize,
        sm: FOUNDATION_THEME.font.size.body.sm.fontSize,
        md: FOUNDATION_THEME.font.size.body.md.fontSize,
        lg: FOUNDATION_THEME.font.size.body.md.fontSize,
    },
    fontWeight: {
        xs: FOUNDATION_THEME.font.weight[600],
        sm: FOUNDATION_THEME.font.weight[600],
        md: FOUNDATION_THEME.font.weight[600],
        lg: FOUNDATION_THEME.font.weight[600],
    },
    gap: {
        xs: FOUNDATION_THEME.unit[6],
        sm: FOUNDATION_THEME.unit[6],
        md: FOUNDATION_THEME.unit[6],
        lg: FOUNDATION_THEME.unit[6],
    },
    padding: {
        xs: `${FOUNDATION_THEME.unit[2]} ${FOUNDATION_THEME.unit[6]}`,
        sm: `${FOUNDATION_THEME.unit[3]} ${FOUNDATION_THEME.unit[8]}`,
        md: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[10]}`,
        lg: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[12]}`,
    },
    height: {
        xs: FOUNDATION_THEME.unit[20],
        sm: FOUNDATION_THEME.unit[22],
        md: FOUNDATION_THEME.unit[24],
        lg: FOUNDATION_THEME.unit[28],
    },
}

export const getTagTokens = (
    FOUNDATION_THEME: ThemeType
): ResponsiveTagTokens => {
    return {
        sm: {
            backgroundColor: {
                noFill: {
                    neutral: FOUNDATION_THEME.colors.gray[0],
                    primary: FOUNDATION_THEME.colors.gray[0],
                    success: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                    warning: FOUNDATION_THEME.colors.gray[0],
                    purple: FOUNDATION_THEME.colors.gray[0],
                },
                attentive: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[600],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[500],
                    purple: FOUNDATION_THEME.colors.purple[500],
                },
                subtle: {
                    neutral: FOUNDATION_THEME.colors.gray[50],
                    primary: FOUNDATION_THEME.colors.primary[50],
                    success: FOUNDATION_THEME.colors.green[50],
                    error: FOUNDATION_THEME.colors.red[50],
                    warning: FOUNDATION_THEME.colors.orange[50],
                    purple: FOUNDATION_THEME.colors.purple[50],
                },
            },
            color: {
                noFill: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[800],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[500],
                    purple: FOUNDATION_THEME.colors.purple[500],
                },
                attentive: {
                    neutral: FOUNDATION_THEME.colors.gray[0],
                    primary: FOUNDATION_THEME.colors.gray[0],
                    success: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                    warning: FOUNDATION_THEME.colors.gray[0],
                    purple: FOUNDATION_THEME.colors.gray[0],
                },
                subtle: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[600],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[600],
                    purple: FOUNDATION_THEME.colors.purple[600],
                },
            },
            borderColor: {
                noFill: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[600],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[500],
                    purple: FOUNDATION_THEME.colors.purple[500],
                },
                subtle: {
                    neutral: FOUNDATION_THEME.colors.gray[200],
                    primary: FOUNDATION_THEME.colors.primary[100],
                    success: FOUNDATION_THEME.colors.green[100],
                    error: FOUNDATION_THEME.colors.red[100],
                    warning: FOUNDATION_THEME.colors.orange[100],
                    purple: FOUNDATION_THEME.colors.purple[100],
                },
                attentive: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[600],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[500],
                    purple: FOUNDATION_THEME.colors.purple[500],
                },
            },
            borderRadius: {
                squarical: {
                    xs: FOUNDATION_THEME.border.radius[6],
                    sm: FOUNDATION_THEME.border.radius[6],
                    md: FOUNDATION_THEME.border.radius[6],
                    lg: FOUNDATION_THEME.border.radius[8],
                },
                rounded: {
                    xs: FOUNDATION_THEME.border.radius.full,
                    sm: FOUNDATION_THEME.border.radius.full,
                    md: FOUNDATION_THEME.border.radius.full,
                    lg: FOUNDATION_THEME.border.radius.full,
                },
            },
            borderWidth: {
                noFill: {
                    neutral: 1,
                    primary: 1,
                    success: 1,
                    error: 1,
                    warning: 1,
                    purple: 1,
                },
                subtle: {
                    neutral: 1,
                    primary: 1,
                    success: 1,
                    error: 1,
                    warning: 1,
                    purple: 1,
                },
                attentive: {
                    neutral: 1,
                    primary: 1,
                    success: 1,
                    error: 1,
                    warning: 1,
                    purple: 1,
                },
            },
            fontSize: {
                xs: FOUNDATION_THEME.font.size.body.sm.fontSize,
                sm: FOUNDATION_THEME.font.size.body.sm.fontSize,
                md: FOUNDATION_THEME.font.size.body.md.fontSize,
                lg: FOUNDATION_THEME.font.size.body.md.fontSize,
            },
            fontWeight: {
                xs: FOUNDATION_THEME.font.weight[600],
                sm: FOUNDATION_THEME.font.weight[600],
                md: FOUNDATION_THEME.font.weight[600],
                lg: FOUNDATION_THEME.font.weight[600],
            },
            gap: {
                xs: FOUNDATION_THEME.unit[6],
                sm: FOUNDATION_THEME.unit[6],
                md: FOUNDATION_THEME.unit[6],
                lg: FOUNDATION_THEME.unit[6],
            },
            padding: {
                xs: `${FOUNDATION_THEME.unit[2]} ${FOUNDATION_THEME.unit[6]}`,
                sm: `${FOUNDATION_THEME.unit[3]} ${FOUNDATION_THEME.unit[8]}`,
                md: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[10]}`,
                lg: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[12]}`,
            },
            height: {
                xs: FOUNDATION_THEME.unit[20],
                sm: FOUNDATION_THEME.unit[22],
                md: FOUNDATION_THEME.unit[24],
                lg: FOUNDATION_THEME.unit[28],
            },
        },
        lg: {
            backgroundColor: {
                noFill: {
                    neutral: FOUNDATION_THEME.colors.gray[0],
                    primary: FOUNDATION_THEME.colors.gray[0],
                    success: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                    warning: FOUNDATION_THEME.colors.gray[0],
                    purple: FOUNDATION_THEME.colors.gray[0],
                },
                attentive: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[600],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[500],
                    purple: FOUNDATION_THEME.colors.purple[500],
                },
                subtle: {
                    neutral: FOUNDATION_THEME.colors.gray[50],
                    primary: FOUNDATION_THEME.colors.primary[50],
                    success: FOUNDATION_THEME.colors.green[50],
                    error: FOUNDATION_THEME.colors.red[50],
                    warning: FOUNDATION_THEME.colors.orange[50],
                    purple: FOUNDATION_THEME.colors.purple[50],
                },
            },
            color: {
                noFill: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[800],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[500],
                    purple: FOUNDATION_THEME.colors.purple[500],
                },
                attentive: {
                    neutral: FOUNDATION_THEME.colors.gray[0],
                    primary: FOUNDATION_THEME.colors.gray[0],
                    success: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                    warning: FOUNDATION_THEME.colors.gray[0],
                    purple: FOUNDATION_THEME.colors.gray[0],
                },
                subtle: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[600],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[600],
                    purple: FOUNDATION_THEME.colors.purple[600],
                },
            },
            borderColor: {
                noFill: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[600],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[500],
                    purple: FOUNDATION_THEME.colors.purple[500],
                },
                subtle: {
                    neutral: FOUNDATION_THEME.colors.gray[200],
                    primary: FOUNDATION_THEME.colors.primary[100],
                    success: FOUNDATION_THEME.colors.green[100],
                    error: FOUNDATION_THEME.colors.red[100],
                    warning: FOUNDATION_THEME.colors.orange[100],
                    purple: FOUNDATION_THEME.colors.purple[100],
                },
                attentive: {
                    neutral: FOUNDATION_THEME.colors.gray[950],
                    primary: FOUNDATION_THEME.colors.primary[600],
                    success: FOUNDATION_THEME.colors.green[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    warning: FOUNDATION_THEME.colors.orange[500],
                    purple: FOUNDATION_THEME.colors.purple[500],
                },
            },
            borderRadius: {
                squarical: {
                    xs: FOUNDATION_THEME.border.radius[6],
                    sm: FOUNDATION_THEME.border.radius[6],
                    md: FOUNDATION_THEME.border.radius[6],
                    lg: FOUNDATION_THEME.border.radius[8],
                },
                rounded: {
                    xs: FOUNDATION_THEME.border.radius.full,
                    sm: FOUNDATION_THEME.border.radius.full,
                    md: FOUNDATION_THEME.border.radius.full,
                    lg: FOUNDATION_THEME.border.radius.full,
                },
            },
            borderWidth: {
                noFill: {
                    neutral: 1,
                    primary: 1,
                    success: 1,
                    error: 1,
                    warning: 1,
                    purple: 1,
                },
                subtle: {
                    neutral: 1,
                    primary: 1,
                    success: 1,
                    error: 1,
                    warning: 1,
                    purple: 1,
                },
                attentive: {
                    neutral: 1,
                    primary: 1,
                    success: 1,
                    error: 1,
                    warning: 1,
                    purple: 1,
                },
            },
            fontSize: {
                xs: FOUNDATION_THEME.font.size.body.sm.fontSize,
                sm: FOUNDATION_THEME.font.size.body.sm.fontSize,
                md: FOUNDATION_THEME.font.size.body.md.fontSize,
                lg: FOUNDATION_THEME.font.size.body.md.fontSize,
            },
            fontWeight: {
                xs: FOUNDATION_THEME.font.weight[600],
                sm: FOUNDATION_THEME.font.weight[600],
                md: FOUNDATION_THEME.font.weight[600],
                lg: FOUNDATION_THEME.font.weight[600],
            },
            gap: {
                xs: FOUNDATION_THEME.unit[6],
                sm: FOUNDATION_THEME.unit[6],
                md: FOUNDATION_THEME.unit[6],
                lg: FOUNDATION_THEME.unit[6],
            },
            padding: {
                xs: `${FOUNDATION_THEME.unit[2]} ${FOUNDATION_THEME.unit[6]}`,
                sm: `${FOUNDATION_THEME.unit[3]} ${FOUNDATION_THEME.unit[8]}`,
                md: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[10]}`,
                lg: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[12]}`,
            },
            height: {
                xs: FOUNDATION_THEME.unit[20],
                sm: FOUNDATION_THEME.unit[22],
                md: FOUNDATION_THEME.unit[24],
                lg: FOUNDATION_THEME.unit[28],
            },
        },
    }
}

export default tagTokens
