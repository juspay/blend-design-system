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
                    subtle: `1px solid ${foundationToken.colors.primary[800]}`,
                    noFill: `1px solid ${foundationToken.colors.primary[400]}`,
                },
                warning: {
                    subtle: `1px solid ${foundationToken.colors.yellow[800]}`,
                    noFill: `1px solid ${foundationToken.colors.yellow[400]}`,
                },
                success: {
                    subtle: `1px solid ${foundationToken.colors.green[800]}`,
                    noFill: `1px solid ${foundationToken.colors.green[400]}`,
                },
                purple: {
                    subtle: `1px solid ${foundationToken.colors.purple[800]}`,
                    noFill: `1px solid ${foundationToken.colors.purple[400]}`,
                },
                neutral: {
                    subtle: `1px solid ${foundationToken.colors.gray[700]}`,
                    noFill: `1px solid ${foundationToken.colors.gray[400]}`,
                },
                error: {
                    subtle: `1px solid ${foundationToken.colors.red[800]}`,
                    noFill: `1px solid ${foundationToken.colors.red[400]}`,
                },
                orange: {
                    subtle: `1px solid ${foundationToken.colors.orange[800]}`,
                    noFill: `1px solid ${foundationToken.colors.orange[400]}`,
                },
            },
            borderRadius: foundationToken.border.radius[8],
            backgroundColor: {
                primary: {
                    subtle: foundationToken.colors.primary[950],
                    noFill: foundationToken.colors.gray[900],
                },
                warning: {
                    subtle: foundationToken.colors.yellow[950],
                    noFill: foundationToken.colors.gray[900],
                },
                success: {
                    subtle: foundationToken.colors.green[950],
                    noFill: foundationToken.colors.gray[900],
                },
                purple: {
                    subtle: foundationToken.colors.purple[950],
                    noFill: foundationToken.colors.gray[900],
                },
                neutral: {
                    subtle: foundationToken.colors.gray[800],
                    noFill: foundationToken.colors.gray[900],
                },
                error: {
                    subtle: foundationToken.colors.red[950],
                    noFill: foundationToken.colors.gray[900],
                },
                orange: {
                    subtle: foundationToken.colors.orange[950],
                    noFill: foundationToken.colors.gray[900],
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
                maxHeight: foundationToken.unit[16],
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
                                primary: foundationToken.colors.gray[100],
                                warning: foundationToken.colors.gray[100],
                                success: foundationToken.colors.gray[100],
                                purple: foundationToken.colors.gray[100],
                                neutral: foundationToken.colors.gray[100],
                                error: foundationToken.colors.gray[100],
                                orange: foundationToken.colors.gray[100],
                            },
                            fontWeight: foundationToken.font.weight[600],
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[16],
                        },
                        description: {
                            color: {
                                primary: foundationToken.colors.gray[300],
                                warning: foundationToken.colors.gray[300],
                                success: foundationToken.colors.gray[300],
                                purple: foundationToken.colors.gray[300],
                                neutral: foundationToken.colors.gray[300],
                                error: foundationToken.colors.gray[300],
                                orange: foundationToken.colors.gray[300],
                            },
                            fontWeight: foundationToken.font.weight[400],
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[16],
                        },
                    },
                    actionContainer: {
                        gap: foundationToken.unit[20],
                        primaryAction: {
                            color: {
                                primary: foundationToken.colors.primary[400],
                                warning: foundationToken.colors.yellow[400],
                                success: foundationToken.colors.green[400],
                                purple: foundationToken.colors.purple[400],
                                neutral: foundationToken.colors.gray[300],
                                error: foundationToken.colors.red[400],
                                orange: foundationToken.colors.orange[400],
                            },
                            fontWeight: foundationToken.font.weight[600],
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                        secondaryAction: {
                            color: {
                                primary: foundationToken.colors.primary[400],
                                warning: foundationToken.colors.yellow[400],
                                success: foundationToken.colors.green[400],
                                purple: foundationToken.colors.purple[400],
                                neutral: foundationToken.colors.gray[300],
                                error: foundationToken.colors.red[400],
                                orange: foundationToken.colors.orange[400],
                            },
                            fontWeight: foundationToken.font.weight[600],
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                },
                closeButton: {
                    color: {
                        primary: foundationToken.colors.primary[400],
                        warning: foundationToken.colors.yellow[400],
                        success: foundationToken.colors.green[400],
                        purple: foundationToken.colors.purple[400],
                        neutral: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[400],
                        orange: foundationToken.colors.orange[400],
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
                    subtle: `1px solid ${foundationToken.colors.primary[800]}`,
                    noFill: `1px solid ${foundationToken.colors.primary[400]}`,
                },
                warning: {
                    subtle: `1px solid ${foundationToken.colors.yellow[800]}`,
                    noFill: `1px solid ${foundationToken.colors.yellow[400]}`,
                },
                success: {
                    subtle: `1px solid ${foundationToken.colors.green[800]}`,
                    noFill: `1px solid ${foundationToken.colors.green[400]}`,
                },
                purple: {
                    subtle: `1px solid ${foundationToken.colors.purple[800]}`,
                    noFill: `1px solid ${foundationToken.colors.purple[400]}`,
                },
                neutral: {
                    subtle: `1px solid ${foundationToken.colors.gray[700]}`,
                    noFill: `1px solid ${foundationToken.colors.gray[400]}`,
                },
                error: {
                    subtle: `1px solid ${foundationToken.colors.red[800]}`,
                    noFill: `1px solid ${foundationToken.colors.red[400]}`,
                },
                orange: {
                    subtle: `1px solid ${foundationToken.colors.orange[800]}`,
                    noFill: `1px solid ${foundationToken.colors.orange[400]}`,
                },
            },
            borderRadius: foundationToken.border.radius[8],
            backgroundColor: {
                primary: {
                    subtle: foundationToken.colors.primary[950],
                    noFill: foundationToken.colors.gray[900],
                },
                warning: {
                    subtle: foundationToken.colors.yellow[950],
                    noFill: foundationToken.colors.gray[900],
                },
                success: {
                    subtle: foundationToken.colors.green[950],
                    noFill: foundationToken.colors.gray[900],
                },
                purple: {
                    subtle: foundationToken.colors.purple[950],
                    noFill: foundationToken.colors.gray[900],
                },
                neutral: {
                    subtle: foundationToken.colors.gray[800],
                    noFill: foundationToken.colors.gray[900],
                },
                error: {
                    subtle: foundationToken.colors.red[950],
                    noFill: foundationToken.colors.gray[900],
                },
                orange: {
                    subtle: foundationToken.colors.orange[950],
                    noFill: foundationToken.colors.gray[900],
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
                maxHeight: foundationToken.unit[16],
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
                                primary: foundationToken.colors.gray[100],
                                warning: foundationToken.colors.gray[100],
                                success: foundationToken.colors.gray[100],
                                purple: foundationToken.colors.gray[100],
                                neutral: foundationToken.colors.gray[100],
                                error: foundationToken.colors.gray[100],
                                orange: foundationToken.colors.gray[100],
                            },
                            fontWeight: foundationToken.font.weight[600],
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[16],
                        },
                        description: {
                            color: {
                                primary: foundationToken.colors.gray[300],
                                warning: foundationToken.colors.gray[300],
                                success: foundationToken.colors.gray[300],
                                purple: foundationToken.colors.gray[300],
                                neutral: foundationToken.colors.gray[300],
                                error: foundationToken.colors.gray[300],
                                orange: foundationToken.colors.gray[300],
                            },
                            fontWeight: foundationToken.font.weight[400],
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[16],
                        },
                    },
                    actionContainer: {
                        gap: foundationToken.unit[20],
                        primaryAction: {
                            color: {
                                primary: foundationToken.colors.primary[400],
                                warning: foundationToken.colors.yellow[400],
                                success: foundationToken.colors.green[400],
                                purple: foundationToken.colors.purple[400],
                                neutral: foundationToken.colors.gray[300],
                                error: foundationToken.colors.red[400],
                                orange: foundationToken.colors.orange[400],
                            },
                            fontWeight: foundationToken.font.weight[600],
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                        secondaryAction: {
                            color: {
                                primary: foundationToken.colors.primary[400],
                                warning: foundationToken.colors.yellow[400],
                                success: foundationToken.colors.green[400],
                                purple: foundationToken.colors.purple[400],
                                neutral: foundationToken.colors.gray[300],
                                error: foundationToken.colors.red[400],
                                orange: foundationToken.colors.orange[400],
                            },
                            fontWeight: foundationToken.font.weight[600],
                            fontSize: foundationToken.font.fontSize[14],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                },
                closeButton: {
                    color: {
                        primary: foundationToken.colors.primary[400],
                        warning: foundationToken.colors.yellow[400],
                        success: foundationToken.colors.green[400],
                        purple: foundationToken.colors.purple[400],
                        neutral: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[400],
                        orange: foundationToken.colors.orange[400],
                    },
                    height: foundationToken.unit[16],
                    width: foundationToken.unit[16],
                },
            },
        },
    }
}
