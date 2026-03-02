import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveTagTokens } from './tag.tokens'

export const getTagDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTagTokens => {
    return {
        sm: {
            gap: foundationToken.unit[6],
            minWidth: 'fit-content',
            maxWidth: foundationToken.unit[200],
            width: 'fit-content',
            // Pattern: backgroundColor.[variant].[subType]
            // Example: backgroundColor.attentive.primary
            backgroundColor: {
                noFill: {
                    neutral: foundationToken.colors.gray[950],
                    primary: foundationToken.colors.gray[950],
                    success: foundationToken.colors.gray[950],
                    error: foundationToken.colors.gray[950],
                    warning: foundationToken.colors.gray[950],
                    purple: foundationToken.colors.gray[950],
                },
                attentive: {
                    neutral: foundationToken.colors.gray[100],
                    primary: foundationToken.colors.primary[400],
                    success: foundationToken.colors.green[500],
                    error: foundationToken.colors.red[500],
                    warning: foundationToken.colors.orange[400],
                    purple: foundationToken.colors.purple[400],
                },
                subtle: {
                    neutral: foundationToken.colors.gray[800],
                    primary: foundationToken.colors.primary[900],
                    success: foundationToken.colors.green[900],
                    error: foundationToken.colors.red[900],
                    warning: foundationToken.colors.orange[900],
                    purple: foundationToken.colors.purple[900],
                },
            },
            // Pattern: borderRadius.[size].[shape]
            // Example: borderRadius.lg.rounded
            borderRadius: {
                xs: {
                    squarical: foundationToken.border.radius[6],
                    rounded: foundationToken.border.radius.full,
                },
                sm: {
                    squarical: foundationToken.border.radius[6],
                    rounded: foundationToken.border.radius.full,
                },
                md: {
                    squarical: foundationToken.border.radius[6],
                    rounded: foundationToken.border.radius.full,
                },
                lg: {
                    squarical: foundationToken.border.radius[8],
                    rounded: foundationToken.border.radius.full,
                },
            },
            // Pattern: padding.[size] (size-dependent)
            // Example: padding.lg
            padding: {
                xs: `${foundationToken.unit[2]} ${foundationToken.unit[6]}`,
                sm: `${foundationToken.unit[3]} ${foundationToken.unit[8]}`,
                md: `${foundationToken.unit[4]} ${foundationToken.unit[10]}`,
                lg: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
            },
            // Pattern: border.[variant].[subType]
            // Example: border.noFill.primary
            border: {
                noFill: {
                    neutral: `1px solid ${foundationToken.colors.gray[100]}`,
                    primary: `1px solid ${foundationToken.colors.primary[400]}`,
                    success: `1px solid ${foundationToken.colors.green[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    warning: `1px solid ${foundationToken.colors.orange[400]}`,
                    purple: `1px solid ${foundationToken.colors.purple[400]}`,
                },
                subtle: {
                    neutral: `1px solid ${foundationToken.colors.gray[700]}`,
                    primary: `1px solid ${foundationToken.colors.primary[800]}`,
                    success: `1px solid ${foundationToken.colors.green[800]}`,
                    error: `1px solid ${foundationToken.colors.red[800]}`,
                    warning: `1px solid ${foundationToken.colors.orange[800]}`,
                    purple: `1px solid ${foundationToken.colors.purple[800]}`,
                },
                attentive: {
                    neutral: `1px solid ${foundationToken.colors.gray[100]}`,
                    primary: `1px solid ${foundationToken.colors.primary[400]}`,
                    success: `1px solid ${foundationToken.colors.green[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    warning: `1px solid ${foundationToken.colors.orange[400]}`,
                    purple: `1px solid ${foundationToken.colors.purple[400]}`,
                },
            },
            // Pattern: height.[size] (size-dependent)
            // Example: height.md
            // height: {
            //     xs: foundationToken.unit[20],
            //     sm: foundationToken.unit[22],
            //     md: foundationToken.unit[24],
            //     lg: foundationToken.unit[28],
            // },
            text: {
                // Pattern: text.color.[variant].[subType]
                // Example: text.color.subtle.primary
                color: {
                    noFill: {
                        neutral: foundationToken.colors.gray[100],
                        primary: foundationToken.colors.primary[400],
                        success: foundationToken.colors.green[400],
                        error: foundationToken.colors.red[400],
                        warning: foundationToken.colors.orange[400],
                        purple: foundationToken.colors.purple[400],
                    },
                    attentive: {
                        neutral: foundationToken.colors.gray[950],
                        primary: foundationToken.colors.gray[950],
                        success: foundationToken.colors.gray[950],
                        error: foundationToken.colors.gray[950],
                        warning: foundationToken.colors.gray[950],
                        purple: foundationToken.colors.gray[950],
                    },
                    subtle: {
                        neutral: foundationToken.colors.gray[200],
                        primary: foundationToken.colors.primary[300],
                        success: foundationToken.colors.green[300],
                        error: foundationToken.colors.red[300],
                        warning: foundationToken.colors.orange[300],
                        purple: foundationToken.colors.purple[300],
                    },
                },
                // Pattern: text.fontSize.[size] (size-dependent)
                // Example: text.fontSize.md
                fontSize: {
                    xs: foundationToken.font.size.body.sm.fontSize,
                    sm: foundationToken.font.size.body.sm.fontSize,
                    md: foundationToken.font.size.body.md.fontSize,
                    lg: foundationToken.font.size.body.md.fontSize,
                },
                // Pattern: text.fontWeight.[size] (size-dependent)
                // Example: text.fontWeight.lg
                fontWeight: {
                    xs: foundationToken.font.weight[500],
                    sm: foundationToken.font.weight[500],
                    md: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
            },
        },
        lg: {
            gap: foundationToken.unit[6],
            minWidth: 'fit-content',
            maxWidth: foundationToken.unit[200],
            width: 'fit-content',
            // Pattern: backgroundColor.[variant].[subType]
            // Example: backgroundColor.attentive.primary
            backgroundColor: {
                noFill: {
                    neutral: foundationToken.colors.gray[950],
                    primary: foundationToken.colors.gray[950],
                    success: foundationToken.colors.gray[950],
                    error: foundationToken.colors.gray[950],
                    warning: foundationToken.colors.gray[950],
                    purple: foundationToken.colors.gray[950],
                },
                attentive: {
                    neutral: foundationToken.colors.gray[100],
                    primary: foundationToken.colors.primary[400],
                    success: foundationToken.colors.green[500],
                    error: foundationToken.colors.red[500],
                    warning: foundationToken.colors.orange[400],
                    purple: foundationToken.colors.purple[400],
                },
                subtle: {
                    neutral: foundationToken.colors.gray[800],
                    primary: foundationToken.colors.primary[900],
                    success: foundationToken.colors.green[900],
                    error: foundationToken.colors.red[900],
                    warning: foundationToken.colors.orange[900],
                    purple: foundationToken.colors.purple[900],
                },
            },
            // Pattern: borderRadius.[size].[shape]
            // Example: borderRadius.lg.rounded
            borderRadius: {
                xs: {
                    squarical: foundationToken.border.radius[6],
                    rounded: foundationToken.border.radius.full,
                },
                sm: {
                    squarical: foundationToken.border.radius[6],
                    rounded: foundationToken.border.radius.full,
                },
                md: {
                    squarical: foundationToken.border.radius[6],
                    rounded: foundationToken.border.radius.full,
                },
                lg: {
                    squarical: foundationToken.border.radius[8],
                    rounded: foundationToken.border.radius.full,
                },
            },
            // Pattern: padding.[size] (size-dependent)
            // Example: padding.lg
            padding: {
                xs: `${foundationToken.unit[2]} ${foundationToken.unit[6]}`,
                sm: `${foundationToken.unit[3]} ${foundationToken.unit[8]}`,
                md: `${foundationToken.unit[4]} ${foundationToken.unit[10]}`,
                lg: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
            },
            // Pattern: border.[variant].[subType]
            // Example: border.noFill.primary
            border: {
                noFill: {
                    neutral: `1px solid ${foundationToken.colors.gray[100]}`,
                    primary: `1px solid ${foundationToken.colors.primary[400]}`,
                    success: `1px solid ${foundationToken.colors.green[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    warning: `1px solid ${foundationToken.colors.orange[400]}`,
                    purple: `1px solid ${foundationToken.colors.purple[400]}`,
                },
                subtle: {
                    neutral: `1px solid ${foundationToken.colors.gray[700]}`,
                    primary: `1px solid ${foundationToken.colors.primary[800]}`,
                    success: `1px solid ${foundationToken.colors.green[800]}`,
                    error: `1px solid ${foundationToken.colors.red[800]}`,
                    warning: `1px solid ${foundationToken.colors.orange[800]}`,
                    purple: `1px solid ${foundationToken.colors.purple[800]}`,
                },
                attentive: {
                    neutral: `1px solid ${foundationToken.colors.gray[100]}`,
                    primary: `1px solid ${foundationToken.colors.primary[400]}`,
                    success: `1px solid ${foundationToken.colors.green[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    warning: `1px solid ${foundationToken.colors.orange[400]}`,
                    purple: `1px solid ${foundationToken.colors.purple[400]}`,
                },
            },
            // Pattern: height.[size] (size-dependent)
            // Example: height.md
            // height: {
            //     xs: foundationToken.unit[20],
            //     sm: foundationToken.unit[22],
            //     md: foundationToken.unit[24],
            //     lg: foundationToken.unit[28],
            // },
            text: {
                // Pattern: text.color.[variant].[subType]
                // Example: text.color.subtle.primary
                color: {
                    noFill: {
                        neutral: foundationToken.colors.gray[100],
                        primary: foundationToken.colors.primary[400],
                        success: foundationToken.colors.green[400],
                        error: foundationToken.colors.red[400],
                        warning: foundationToken.colors.orange[400],
                        purple: foundationToken.colors.purple[400],
                    },
                    attentive: {
                        neutral: foundationToken.colors.gray[950],
                        primary: foundationToken.colors.gray[950],
                        success: foundationToken.colors.gray[950],
                        error: foundationToken.colors.gray[950],
                        warning: foundationToken.colors.gray[950],
                        purple: foundationToken.colors.gray[950],
                    },
                    subtle: {
                        neutral: foundationToken.colors.gray[200],
                        primary: foundationToken.colors.primary[300],
                        success: foundationToken.colors.green[300],
                        error: foundationToken.colors.red[300],
                        warning: foundationToken.colors.orange[300],
                        purple: foundationToken.colors.purple[300],
                    },
                },
                // Pattern: text.fontSize.[size] (size-dependent)
                // Example: text.fontSize.md
                fontSize: {
                    xs: foundationToken.font.size.body.sm.fontSize,
                    sm: foundationToken.font.size.body.sm.fontSize,
                    md: foundationToken.font.size.body.md.fontSize,
                    lg: foundationToken.font.size.body.md.fontSize,
                },
                // Pattern: text.fontWeight.[size] (size-dependent)
                // Example: text.fontWeight.lg
                fontWeight: {
                    xs: foundationToken.font.weight[500],
                    sm: foundationToken.font.weight[500],
                    md: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
            },
        },
    }
}
