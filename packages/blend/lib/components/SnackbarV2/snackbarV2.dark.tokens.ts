import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveSnackbarV2Tokens } from './snackbarV2.tokens'

export const getSnackbarV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSnackbarV2Tokens => {
    return {
        sm: {
            width: '100%',
            maxWidth: 'calc(100vw - 32px)',
            minWidth: foundationToken.unit[300],
            backgroundColor: foundationToken.colors.gray[800],
            borderRadius: foundationToken.border.radius[12],
            padding: foundationToken.unit[16],
            boxShadow: foundationToken.shadows.lg,
            gap: foundationToken.unit[8],
            slot: {
                height: foundationToken.unit[16],
                width: foundationToken.unit[16],
                color: {
                    info: foundationToken.colors.primary[400],
                    success: foundationToken.colors.green[400],
                    warning: foundationToken.colors.yellow[400],
                    error: foundationToken.colors.red[400],
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
                                info: foundationToken.colors.gray[100],
                                success: foundationToken.colors.gray[100],
                                warning: foundationToken.colors.gray[100],
                                error: foundationToken.colors.gray[100],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[500],
                            lineHeight: foundationToken.font.lineHeight[16],
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
                            lineHeight: foundationToken.font.lineHeight[16],
                        },
                    },
                    actionContainer: {
                        primaryAction: {
                            color: {
                                info: foundationToken.colors.primary[300],
                                success: foundationToken.colors.primary[300],
                                warning: foundationToken.colors.primary[300],
                                error: foundationToken.colors.primary[300],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                },
                closeButton: {
                    height: foundationToken.unit[16],
                    color: {
                        info: foundationToken.colors.gray[100],
                        success: foundationToken.colors.gray[100],
                        warning: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[100],
                    },
                },
            },
        },
        lg: {
            width: '100%',
            maxWidth: 'calc(100vw - 32px)',
            minWidth: foundationToken.unit[300],
            backgroundColor: foundationToken.colors.gray[800],
            borderRadius: foundationToken.border.radius[8],
            padding: foundationToken.unit[16],
            boxShadow: foundationToken.shadows.lg,
            gap: foundationToken.unit[10],
            slot: {
                height: foundationToken.unit[16],
                width: foundationToken.unit[16],
                color: {
                    info: foundationToken.colors.primary[400],
                    success: foundationToken.colors.green[400],
                    warning: foundationToken.colors.yellow[400],
                    error: foundationToken.colors.red[400],
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
                                info: foundationToken.colors.gray[100],
                                success: foundationToken.colors.gray[100],
                                warning: foundationToken.colors.gray[100],
                                error: foundationToken.colors.gray[100],
                            },
                            fontSize:
                                foundationToken.font.size.body.lg.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                            lineHeight: foundationToken.font.lineHeight[16],
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
                            lineHeight: foundationToken.font.lineHeight[16],
                        },
                    },
                    actionContainer: {
                        primaryAction: {
                            color: {
                                info: foundationToken.colors.primary[300],
                                success: foundationToken.colors.primary[300],
                                warning: foundationToken.colors.primary[300],
                                error: foundationToken.colors.primary[300],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                            lineHeight: foundationToken.font.lineHeight[20],
                        },
                    },
                },
                closeButton: {
                    height: foundationToken.unit[16],
                    color: {
                        info: foundationToken.colors.gray[100],
                        success: foundationToken.colors.gray[100],
                        warning: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[100],
                    },
                },
            },
        },
    }
}
