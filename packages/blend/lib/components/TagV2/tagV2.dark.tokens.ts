import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveTagV2Tokens } from './tagV2.tokens'

export const getTagV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTagV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[6],

            backgroundColor: {
                noFill: {
                    neutral: 'transparent',
                    primary: 'transparent',
                    success: 'transparent',
                    error: 'transparent',
                    warning: 'transparent',
                    purple: 'transparent',
                },
                attentive: {
                    neutral: foundationToken.colors.gray[100],
                    primary: foundationToken.colors.primary[500],
                    success: foundationToken.colors.green[500],
                    error: foundationToken.colors.red[500],
                    warning: foundationToken.colors.orange[500],
                    purple: foundationToken.colors.purple[500],
                },
                subtle: {
                    neutral: foundationToken.colors.gray[800],
                    primary: foundationToken.colors.primary[950],
                    success: foundationToken.colors.green[950],
                    error: foundationToken.colors.red[950],
                    warning: foundationToken.colors.orange[950],
                    purple: foundationToken.colors.purple[950],
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

            leftSlot: {
                maxHeight: {
                    xs: `${foundationToken.unit[12]}`,
                    sm: `${foundationToken.unit[12]}`,
                    md: `${foundationToken.unit[12]}`,
                    lg: `${foundationToken.unit[12]}`,
                },
            },
            rightSlot: {
                maxHeight: {
                    xs: `${foundationToken.unit[12]}`,
                    sm: `${foundationToken.unit[12]}`,
                    md: `${foundationToken.unit[12]}`,
                    lg: `${foundationToken.unit[12]}`,
                },
            },

            text: {
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
                        primary: foundationToken.colors.gray[0],
                        success: foundationToken.colors.gray[0],
                        error: foundationToken.colors.gray[0],
                        warning: foundationToken.colors.gray[0],
                        purple: foundationToken.colors.gray[0],
                    },
                    subtle: {
                        neutral: foundationToken.colors.gray[100],
                        primary: foundationToken.colors.primary[400],
                        success: foundationToken.colors.green[400],
                        error: foundationToken.colors.red[400],
                        warning: foundationToken.colors.orange[400],
                        purple: foundationToken.colors.purple[400],
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
                    neutral: 'transparent',
                    primary: 'transparent',
                    success: 'transparent',
                    error: 'transparent',
                    warning: 'transparent',
                    purple: 'transparent',
                },
                attentive: {
                    neutral: foundationToken.colors.gray[100],
                    primary: foundationToken.colors.primary[500],
                    success: foundationToken.colors.green[500],
                    error: foundationToken.colors.red[500],
                    warning: foundationToken.colors.orange[500],
                    purple: foundationToken.colors.purple[500],
                },
                subtle: {
                    neutral: foundationToken.colors.gray[800],
                    primary: foundationToken.colors.primary[950],
                    success: foundationToken.colors.green[950],
                    error: foundationToken.colors.red[950],
                    warning: foundationToken.colors.orange[950],
                    purple: foundationToken.colors.purple[950],
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
                    neutral: `1px solid ${foundationToken.colors.gray[700]}`,
                    primary: `1px solid ${foundationToken.colors.primary[500]}`,
                    success: `1px solid ${foundationToken.colors.green[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    warning: `1px solid ${foundationToken.colors.orange[500]}`,
                    purple: `1px solid ${foundationToken.colors.purple[500]}`,
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
                    primary: `1px solid ${foundationToken.colors.primary[500]}`,
                    success: `1px solid ${foundationToken.colors.green[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    warning: `1px solid ${foundationToken.colors.orange[500]}`,
                    purple: `1px solid ${foundationToken.colors.purple[500]}`,
                },
            },

            leftSlot: {
                maxHeight: {
                    xs: `${foundationToken.unit[12]}`,
                    sm: `${foundationToken.unit[12]}`,
                    md: `${foundationToken.unit[12]}`,
                    lg: `${foundationToken.unit[12]}`,
                },
            },
            rightSlot: {
                maxHeight: {
                    xs: `${foundationToken.unit[12]}`,
                    sm: `${foundationToken.unit[12]}`,
                    md: `${foundationToken.unit[12]}`,
                    lg: `${foundationToken.unit[12]}`,
                },
            },

            text: {
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
                        primary: foundationToken.colors.gray[0],
                        success: foundationToken.colors.gray[0],
                        error: foundationToken.colors.gray[0],
                        warning: foundationToken.colors.gray[0],
                        purple: foundationToken.colors.gray[0],
                    },
                    subtle: {
                        neutral: foundationToken.colors.gray[100],
                        primary: foundationToken.colors.primary[400],
                        success: foundationToken.colors.green[400],
                        error: foundationToken.colors.red[400],
                        warning: foundationToken.colors.orange[400],
                        purple: foundationToken.colors.purple[400],
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
