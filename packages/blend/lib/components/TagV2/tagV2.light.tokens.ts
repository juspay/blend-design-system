import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveTagV2Tokens } from './tagV2.tokens'

export const getTagV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTagV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[6],
            backgroundColor: {
                noFill: {
                    neutral: foundationToken.colors.gray[0],
                    primary: foundationToken.colors.gray[0],
                    success: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                    warning: foundationToken.colors.gray[0],
                    purple: foundationToken.colors.gray[0],
                },
                attentive: {
                    neutral: foundationToken.colors.gray[950],
                    primary: foundationToken.colors.primary[600],
                    success: foundationToken.colors.green[600],
                    error: foundationToken.colors.red[600],
                    warning: foundationToken.colors.orange[500],
                    purple: foundationToken.colors.purple[500],
                },
                subtle: {
                    neutral: foundationToken.colors.gray[50],
                    primary: foundationToken.colors.primary[50],
                    success: foundationToken.colors.green[50],
                    error: foundationToken.colors.red[50],
                    warning: foundationToken.colors.orange[50],
                    purple: foundationToken.colors.purple[50],
                },
            },

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

            height: {
                xs: `${foundationToken.unit[20]}`,
                sm: `${foundationToken.unit[22]}`,
                md: `${foundationToken.unit[24]}`,
                lg: `${foundationToken.unit[28]}`,
            },

            padding: {
                top: {
                    xs: `${foundationToken.unit[2]}`,
                    sm: `${foundationToken.unit[3]}`,
                    md: `${foundationToken.unit[4]}`,
                    lg: `${foundationToken.unit[6]}`,
                },
                right: {
                    xs: `${foundationToken.unit[6]}`,
                    sm: `${foundationToken.unit[8]}`,
                    md: `${foundationToken.unit[10]}`,
                    lg: `${foundationToken.unit[12]}`,
                },
                bottom: {
                    xs: `${foundationToken.unit[2]}`,
                    sm: `${foundationToken.unit[3]}`,
                    md: `${foundationToken.unit[4]}`,
                    lg: `${foundationToken.unit[6]}`,
                },
                left: {
                    xs: `${foundationToken.unit[6]}`,
                    sm: `${foundationToken.unit[8]}`,
                    md: `${foundationToken.unit[10]}`,
                    lg: `${foundationToken.unit[12]}`,
                },
            },

            border: {
                noFill: {
                    neutral: `1px solid ${foundationToken.colors.gray[950]}`,
                    primary: `1px solid ${foundationToken.colors.primary[600]}`,
                    success: `1px solid ${foundationToken.colors.green[600]}`,
                    error: `1px solid ${foundationToken.colors.red[600]}`,
                    warning: `1px solid ${foundationToken.colors.orange[500]}`,
                    purple: `1px solid ${foundationToken.colors.purple[500]}`,
                },
                subtle: {
                    neutral: `1px solid ${foundationToken.colors.gray[200]}`,
                    primary: `1px solid ${foundationToken.colors.primary[100]}`,
                    success: `1px solid ${foundationToken.colors.green[100]}`,
                    error: `1px solid ${foundationToken.colors.red[100]}`,
                    warning: `1px solid ${foundationToken.colors.orange[100]}`,
                    purple: `1px solid ${foundationToken.colors.purple[100]}`,
                },
                attentive: {
                    neutral: `1px solid ${foundationToken.colors.gray[950]}`,
                    primary: `1px solid ${foundationToken.colors.primary[600]}`,
                    success: `1px solid ${foundationToken.colors.green[600]}`,
                    error: `1px solid ${foundationToken.colors.red[600]}`,
                    warning: `1px solid ${foundationToken.colors.orange[500]}`,
                    purple: `1px solid ${foundationToken.colors.purple[500]}`,
                },
            },

            text: {
                color: {
                    noFill: {
                        neutral: foundationToken.colors.gray[950],
                        primary: foundationToken.colors.primary[800],
                        success: foundationToken.colors.green[600],
                        error: foundationToken.colors.red[600],
                        warning: foundationToken.colors.orange[500],
                        purple: foundationToken.colors.purple[500],
                    },
                    attentive: {
                        neutral: foundationToken.colors.gray[0],
                        primary: foundationToken.colors.gray[0],
                        success: foundationToken.colors.gray[0],
                        error: foundationToken.colors.gray[0],
                        warning: foundationToken.colors.gray[0],
                        purple: foundationToken.colors.gray[0],
                    },
                    subtle: {
                        neutral: foundationToken.colors.gray[950],
                        primary: foundationToken.colors.primary[600],
                        success: foundationToken.colors.green[600],
                        error: foundationToken.colors.red[600],
                        warning: foundationToken.colors.orange[600],
                        purple: foundationToken.colors.purple[600],
                    },
                },

                fontSize: {
                    xs: foundationToken.font.fontSize[12],
                    sm: foundationToken.font.fontSize[12],
                    md: foundationToken.font.fontSize[14],
                    lg: foundationToken.font.fontSize[14],
                },

                fontWeight: {
                    xs: foundationToken.font.weight[600],
                    sm: foundationToken.font.weight[600],
                    md: foundationToken.font.weight[600],
                    lg: foundationToken.font.weight[600],
                },
                lineHeight: {
                    xs: foundationToken.font.lineHeight[18],
                    sm: foundationToken.font.lineHeight[18],
                    md: foundationToken.font.lineHeight[20],
                    lg: foundationToken.font.lineHeight[20],
                },
            },
        },
        lg: {
            gap: foundationToken.unit[6],
            backgroundColor: {
                noFill: {
                    neutral: foundationToken.colors.gray[0],
                    primary: foundationToken.colors.gray[0],
                    success: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                    warning: foundationToken.colors.gray[0],
                    purple: foundationToken.colors.gray[0],
                },
                attentive: {
                    neutral: foundationToken.colors.gray[950],
                    primary: foundationToken.colors.primary[600],
                    success: foundationToken.colors.green[600],
                    error: foundationToken.colors.red[600],
                    warning: foundationToken.colors.orange[500],
                    purple: foundationToken.colors.purple[500],
                },
                subtle: {
                    neutral: foundationToken.colors.gray[50],
                    primary: foundationToken.colors.primary[50],
                    success: foundationToken.colors.green[50],
                    error: foundationToken.colors.red[50],
                    warning: foundationToken.colors.orange[50],
                    purple: foundationToken.colors.purple[50],
                },
            },

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
            height: {
                xs: `${foundationToken.unit[20]}`,
                sm: `${foundationToken.unit[22]}`,
                md: `${foundationToken.unit[24]}`,
                lg: `${foundationToken.unit[28]}`,
            },
            padding: {
                top: {
                    xs: `${foundationToken.unit[2]} `,
                    sm: `${foundationToken.unit[3]} `,
                    md: `${foundationToken.unit[4]} `,
                    lg: `${foundationToken.unit[6]} `,
                },
                right: {
                    xs: `${foundationToken.unit[6]}`,
                    sm: ` ${foundationToken.unit[8]}`,
                    md: `${foundationToken.unit[10]}`,
                    lg: `${foundationToken.unit[12]}`,
                },
                bottom: {
                    xs: `${foundationToken.unit[2]} `,
                    sm: `${foundationToken.unit[3]} `,
                    md: `${foundationToken.unit[4]} `,
                    lg: `${foundationToken.unit[6]} `,
                },
                left: {
                    xs: ` ${foundationToken.unit[6]}`,
                    sm: ` ${foundationToken.unit[8]}`,
                    md: ` ${foundationToken.unit[10]}`,
                    lg: ` ${foundationToken.unit[12]}`,
                },
            },
            border: {
                noFill: {
                    neutral: `1px solid ${foundationToken.colors.gray[950]}`,
                    primary: `1px solid ${foundationToken.colors.primary[600]}`,
                    success: `1px solid ${foundationToken.colors.green[600]}`,
                    error: `1px solid ${foundationToken.colors.red[600]}`,
                    warning: `1px solid ${foundationToken.colors.orange[500]}`,
                    purple: `1px solid ${foundationToken.colors.purple[500]}`,
                },
                subtle: {
                    neutral: `1px solid ${foundationToken.colors.gray[200]}`,
                    primary: `1px solid ${foundationToken.colors.primary[100]}`,
                    success: `1px solid ${foundationToken.colors.green[100]}`,
                    error: `1px solid ${foundationToken.colors.red[100]}`,
                    warning: `1px solid ${foundationToken.colors.orange[100]}`,
                    purple: `1px solid ${foundationToken.colors.purple[100]}`,
                },
                attentive: {
                    neutral: `1px solid ${foundationToken.colors.gray[950]}`,
                    primary: `1px solid ${foundationToken.colors.primary[600]}`,
                    success: `1px solid ${foundationToken.colors.green[600]}`,
                    error: `1px solid ${foundationToken.colors.red[600]}`,
                    warning: `1px solid ${foundationToken.colors.orange[500]}`,
                    purple: `1px solid ${foundationToken.colors.purple[500]}`,
                },
            },

            text: {
                color: {
                    noFill: {
                        neutral: foundationToken.colors.gray[950],
                        primary: foundationToken.colors.primary[800],
                        success: foundationToken.colors.green[600],
                        error: foundationToken.colors.red[600],
                        warning: foundationToken.colors.orange[500],
                        purple: foundationToken.colors.purple[500],
                    },
                    attentive: {
                        neutral: foundationToken.colors.gray[0],
                        primary: foundationToken.colors.gray[0],
                        success: foundationToken.colors.gray[0],
                        error: foundationToken.colors.gray[0],
                        warning: foundationToken.colors.gray[0],
                        purple: foundationToken.colors.gray[0],
                    },
                    subtle: {
                        neutral: foundationToken.colors.gray[950],
                        primary: foundationToken.colors.primary[600],
                        success: foundationToken.colors.green[600],
                        error: foundationToken.colors.red[600],
                        warning: foundationToken.colors.orange[600],
                        purple: foundationToken.colors.purple[600],
                    },
                },

                fontSize: {
                    xs: foundationToken.font.fontSize[12],
                    sm: foundationToken.font.fontSize[12],
                    md: foundationToken.font.fontSize[14],
                    lg: foundationToken.font.fontSize[14],
                },

                fontWeight: {
                    xs: foundationToken.font.weight[600],
                    sm: foundationToken.font.weight[600],
                    md: foundationToken.font.weight[600],
                    lg: foundationToken.font.weight[600],
                },
                lineHeight: {
                    xs: foundationToken.font.lineHeight[18],
                    sm: foundationToken.font.lineHeight[18],
                    md: foundationToken.font.lineHeight[20],
                    lg: foundationToken.font.lineHeight[20],
                },
            },
        },
    }
}
