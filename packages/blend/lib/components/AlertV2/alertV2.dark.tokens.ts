import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveAlertV2Tokens } from './alertV2.tokens'

export const getAlertV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveAlertV2Tokens => {
    return {
        sm: {
            width: '100%',
            maxWidth: '900px',
            minWidth: '300px',
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
            borderRadius: foundationToken.border.radius[8],
            backgroundColor: {
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
            padding: {
                top: foundationToken.unit[16],
                right: foundationToken.unit[16],
                bottom: foundationToken.unit[16],
                left: foundationToken.unit[16],
            },
            gap: {
                right: foundationToken.unit[16],
                bottom: foundationToken.unit[10],
            },
            slot: {
                height: foundationToken.unit[16],
                width: foundationToken.unit[16],
            },
            mainContainer: {
                gap: foundationToken.unit[8],
                content: {
                    gap: {
                        right: foundationToken.unit[28],
                        bottom: foundationToken.unit[18],
                    },
                    textContainer: {
                        gap: foundationToken.unit[8],
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
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
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
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                    actionContainer: {
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
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
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
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
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
                    height: foundationToken.unit[16],
                    width: foundationToken.unit[16],
                },
            },
        },
        lg: {
            width: '100%',
            maxWidth: '900px',
            minWidth: '300px',
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
            borderRadius: foundationToken.border.radius[8],
            backgroundColor: {
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
            padding: {
                top: foundationToken.unit[16],
                right: foundationToken.unit[16],
                bottom: foundationToken.unit[16],
                left: foundationToken.unit[16],
            },
            gap: {
                right: foundationToken.unit[16],
                bottom: foundationToken.unit[10],
            },
            slot: {
                height: foundationToken.unit[16],
                width: foundationToken.unit[16],
            },
            mainContainer: {
                gap: foundationToken.unit[8],
                content: {
                    gap: {
                        right: foundationToken.unit[28],
                        bottom: foundationToken.unit[18],
                    },
                    textContainer: {
                        gap: foundationToken.unit[8],
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
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
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
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                    actionContainer: {
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
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
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
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
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
                    height: foundationToken.unit[16],
                    width: foundationToken.unit[16],
                },
            },
        },
    }
}
