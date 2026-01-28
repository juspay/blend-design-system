import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveSnackbarV2Tokens } from './snackbarV2.tokens'

export const getSnackbarV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSnackbarV2Tokens => {
    return {
        sm: {
            backgroundColor: foundationToken.colors.gray[900],
            borderRadius: foundationToken.border.radius[12],
            padding: foundationToken.unit[16],
            boxShadow: foundationToken.shadows.lg,
            gap: foundationToken.unit[8],
            maxWidth: 'calc(100vw - 32px)',
            slot: {
                height: foundationToken.unit[16],
                width: foundationToken.unit[16],
                color: {
                    info: foundationToken.colors.primary[300],
                    success: foundationToken.colors.green[500],
                    warning: foundationToken.colors.yellow[500],
                    error: foundationToken.colors.red[500],
                },
                padding: {
                    top: foundationToken.unit[4],
                    bottom: foundationToken.unit[4],
                    left: foundationToken.unit[0],
                    right: foundationToken.unit[0],
                },
            },
            mainContainer: {
                gap: foundationToken.unit[8],
                content: {
                    gap: foundationToken.unit[14],
                    textContainer: {
                        gap: foundationToken.unit[6],
                        header: {
                            color: {
                                info: foundationToken.colors.gray[25],
                                success: foundationToken.colors.gray[25],
                                warning: foundationToken.colors.gray[25],
                                error: foundationToken.colors.gray[25],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[500],
                            lineHeight: foundationToken.font.lineHeight[24],
                        },
                        description: {
                            color: {
                                info: foundationToken.colors.gray[300],
                                success: foundationToken.colors.gray[300],
                                warning: foundationToken.colors.gray[300],
                                error: foundationToken.colors.gray[300],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                    actionContainer: {
                        primaryAction: {
                            color: {
                                info: foundationToken.colors.primary[400],
                                success: foundationToken.colors.primary[400],
                                warning: foundationToken.colors.primary[400],
                                error: foundationToken.colors.primary[400],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                },
                closeButton: {
                    height: foundationToken.unit[22],
                    iconSize: foundationToken.unit[12],
                    color: {
                        info: foundationToken.colors.gray[0],
                        success: foundationToken.colors.gray[0],
                        warning: foundationToken.colors.gray[0],
                        error: foundationToken.colors.gray[0],
                    },
                    padding: {
                        top: foundationToken.unit[4],
                        bottom: foundationToken.unit[4],
                        left: foundationToken.unit[4],
                        right: foundationToken.unit[4],
                    },
                },
            },
        },
        lg: {
            backgroundColor: foundationToken.colors.gray[900],
            borderRadius: foundationToken.border.radius[8],
            padding: foundationToken.unit[16],
            boxShadow: foundationToken.shadows.lg,
            gap: foundationToken.unit[10],
            maxWidth: 'calc(100vw - 32px)',
            slot: {
                height: foundationToken.unit[16],
                width: foundationToken.unit[16],
                color: {
                    info: foundationToken.colors.primary[300],
                    success: foundationToken.colors.green[500],
                    warning: foundationToken.colors.yellow[500],
                    error: foundationToken.colors.red[500],
                },
                padding: {
                    top: foundationToken.unit[4],
                    bottom: foundationToken.unit[4],
                    left: foundationToken.unit[0],
                    right: foundationToken.unit[0],
                },
            },
            mainContainer: {
                gap: foundationToken.unit[8],
                content: {
                    gap: foundationToken.unit[18],
                    textContainer: {
                        gap: foundationToken.unit[6],
                        header: {
                            color: {
                                info: foundationToken.colors.gray[25],
                                success: foundationToken.colors.gray[25],
                                warning: foundationToken.colors.gray[25],
                                error: foundationToken.colors.gray[25],
                            },
                            fontSize:
                                foundationToken.font.size.body.lg.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                            lineHeight: foundationToken.font.lineHeight[24],
                        },
                        description: {
                            color: {
                                info: foundationToken.colors.gray[300],
                                success: foundationToken.colors.gray[300],
                                warning: foundationToken.colors.gray[300],
                                error: foundationToken.colors.gray[300],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                    actionContainer: {
                        primaryAction: {
                            color: {
                                info: foundationToken.colors.primary[400],
                                success: foundationToken.colors.primary[400],
                                warning: foundationToken.colors.primary[400],
                                error: foundationToken.colors.primary[400],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                },
                closeButton: {
                    height: foundationToken.unit[22],
                    iconSize: foundationToken.unit[12],
                    color: {
                        info: foundationToken.colors.gray[0],
                        success: foundationToken.colors.gray[0],
                        warning: foundationToken.colors.gray[0],
                        error: foundationToken.colors.gray[0],
                    },
                    padding: {
                        top: foundationToken.unit[4],
                        bottom: foundationToken.unit[4],
                        left: foundationToken.unit[4],
                        right: foundationToken.unit[4],
                    },
                },
            },
        },
    }
}
