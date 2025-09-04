import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { SnackbarVariant } from './types'

export type SnackbarTokens = Readonly<{
    backgroundColor: CSSObject['backgroundColor']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    minWidth: CSSObject['minWidth']
    maxWidth: CSSObject['maxWidth']
    boxShadow: CSSObject['boxShadow']
    gap: CSSObject['gap']
    container: {
        gap: CSSObject['gap']
        infoIcon: {
            [key in SnackbarVariant]: {
                color: CSSObject['color']
                size: CSSObject['size']
            }
        }
        content: {
            gap: CSSObject['gap']
            textContainer: {
                gap: CSSObject['gap']
                header: {
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
                description: {
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
            }
            actionButton: {
                padding: CSSObject['padding']
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
        }
    }

    crossIcon: {
        size: CSSObject['fontSize']
        color: CSSObject['color']
    }
}>

export type ResponsiveSnackbarTokens = {
    [key in keyof BreakpointType]: SnackbarTokens
}

export const getSnackbarTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSnackbarTokens => {
    return {
        sm: {
            backgroundColor: foundationToken.colors.gray[900],
            borderRadius: foundationToken.border.radius[12],
            padding: foundationToken.unit[16],
            minWidth: 320,
            maxWidth: 350,
            boxShadow: foundationToken.shadows.lg,
            gap: foundationToken.unit[10],
            container: {
                gap: foundationToken.unit[10],
                infoIcon: {
                    info: {
                        color: foundationToken.colors.primary[300],
                        size: foundationToken.unit[16],
                    },
                    success: {
                        color: foundationToken.colors.green[500],
                        size: foundationToken.unit[16],
                    },
                    warning: {
                        color: foundationToken.colors.yellow[500],
                        size: foundationToken.unit[16],
                    },
                    error: {
                        color: foundationToken.colors.red[500],
                        size: foundationToken.unit[16],
                    },
                },
                content: {
                    gap: foundationToken.unit[14],
                    textContainer: {
                        gap: foundationToken.unit[6],
                        header: {
                            color: foundationToken.colors.gray[25],
                            fontSize: 14,
                            fontWeight: foundationToken.font.weight[500],
                        },
                        description: {
                            color: foundationToken.colors.gray[300],
                            fontSize: 14,
                            fontWeight: foundationToken.font.weight[400],
                        },
                    },
                    actionButton: {
                        padding: `${String(foundationToken.unit[0])} ${String(foundationToken.unit[2])} ${String(foundationToken.unit[0])} ${String(foundationToken.unit[2])}`,
                        color: foundationToken.colors.primary[400],
                        fontSize: 14,
                        fontWeight: foundationToken.font.weight[600],
                    },
                },
            },
            crossIcon: {
                size: foundationToken.unit[16],
                color: foundationToken.colors.gray[0],
            },
        },
        lg: {
            backgroundColor: foundationToken.colors.gray[900],
            borderRadius: foundationToken.border.radius[8],
            padding: foundationToken.unit[16],
            minWidth: 400,
            maxWidth: 420,
            boxShadow: foundationToken.shadows.lg,
            gap: foundationToken.unit[10],
            container: {
                gap: foundationToken.unit[8],
                infoIcon: {
                    info: {
                        color: foundationToken.colors.primary[300],
                        size: foundationToken.unit[16],
                    },
                    success: {
                        color: foundationToken.colors.green[500],
                        size: foundationToken.unit[16],
                    },
                    warning: {
                        color: foundationToken.colors.yellow[500],
                        size: foundationToken.unit[16],
                    },
                    error: {
                        color: foundationToken.colors.red[500],
                        size: foundationToken.unit[16],
                    },
                },
                content: {
                    gap: foundationToken.unit[18],
                    textContainer: {
                        gap: foundationToken.unit[6],
                        header: {
                            color: foundationToken.colors.gray[25],
                            fontSize: 16,
                            fontWeight: foundationToken.font.weight[600],
                        },
                        description: {
                            color: foundationToken.colors.gray[300],
                            fontSize: 14,
                            fontWeight: foundationToken.font.weight[400],
                        },
                    },
                    actionButton: {
                        padding: `${String(foundationToken.unit[0])} ${String(foundationToken.unit[2])} ${String(foundationToken.unit[0])} ${String(foundationToken.unit[2])}`,

                        color: foundationToken.colors.primary[400],
                        fontSize: 14,
                        fontWeight: foundationToken.font.weight[600],
                    },
                },
            },

            crossIcon: {
                size: foundationToken.unit[16],
                color: foundationToken.colors.gray[0],
            },
        },
    }
}
