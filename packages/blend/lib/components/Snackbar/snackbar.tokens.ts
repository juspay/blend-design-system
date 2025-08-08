import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { SnackbarVariant } from './types'

export type SnackbarTokens = Readonly<{
    backgroundColor: CSSObject['color']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    minWidth: CSSObject['minWidth']
    maxWidth: CSSObject['maxWidth']
    boxShadow: CSSObject['boxShadow']
    gap: CSSObject['gap']
    content: {
        gap: CSSObject['gap']
        infoIcon: {
            color: {
                [key in SnackbarVariant]: CSSObject['color']
            }
            size: {
                [key in SnackbarVariant]: CSSObject['fontSize']
            }
        }
        container: {
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
                layout: {
                    paddingX: CSSObject['padding']
                }
                text: {
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
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
            content: {
                gap: foundationToken.unit[10],
                infoIcon: {
                    color: {
                        info: foundationToken.colors.primary[300],
                        success: foundationToken.colors.green[500],
                        warning: foundationToken.colors.yellow[500],
                        error: foundationToken.colors.red[500],
                    },
                    size: {
                        info: foundationToken.unit[16],
                        success: foundationToken.unit[16],
                        warning: foundationToken.unit[16],
                        error: foundationToken.unit[16],
                    },
                },
                container: {
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
                        layout: {
                            paddingX: foundationToken.unit[2],
                        },
                        text: {
                            color: foundationToken.colors.gray[100],
                            fontSize: 14,
                            fontWeight: foundationToken.font.weight[600],
                        },
                    },
                },
            },
            crossIcon: {
                size: 16,
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
            content: {
                gap: foundationToken.unit[8],
                infoIcon: {
                    color: {
                        info: foundationToken.colors.primary[300],
                        success: foundationToken.colors.green[500],
                        warning: foundationToken.colors.yellow[500],
                        error: foundationToken.colors.red[500],
                    },
                    size: {
                        info: foundationToken.unit[16],
                        success: foundationToken.unit[16],
                        warning: foundationToken.unit[16],
                        error: foundationToken.unit[16],
                    },
                },
                container: {
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
                        layout: {
                            paddingX: foundationToken.unit[2],
                        },
                        text: {
                            color: foundationToken.colors.gray[100],
                            fontSize: 14,
                            fontWeight: foundationToken.font.weight[600],
                        },
                    },
                },
            },

            crossIcon: {
                size: 16,
                color: foundationToken.colors.gray[0],
            },
        },
    }
}
