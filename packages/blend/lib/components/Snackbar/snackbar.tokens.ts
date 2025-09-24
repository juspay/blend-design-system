import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'
import FOUNDATION_THEME, { FoundationTokenType } from '../../tokens/theme.token'
import { SnackbarVariant } from './types'

/**
 * Snackbar Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure:
 * - target: container | infoIcon | content | actionButton | crossIcon (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | padding | color | fontSize | fontWeight | gap | size | minWidth | maxWidth | boxShadow
 * - variant: info | success | warning | error (snackbar variant)
 * - state: default (no interactive states for snackbar)
 *
 * Pattern examples:
 * - container.backgroundColor
 * - container.borderRadius
 * - container.padding
 * - infoIcon.color.[variant]
 * - infoIcon.size.[variant]
 * - content.textContainer.header.color
 * - content.textContainer.description.color
 * - content.actionButton.color
 * - crossIcon.color
 */
export type SnackbarTokens = Readonly<{
    backgroundColor: CSSObject['backgroundColor']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    minWidth: CSSObject['minWidth']
    maxWidth: CSSObject['maxWidth']
    boxShadow: CSSObject['boxShadow']
    gap: CSSObject['gap']

    // Info icon styling
    infoIcon: {
        // Pattern: infoIcon.color.[variant]
        color: {
            [key in SnackbarVariant]: CSSObject['color']
        }
        // Pattern: infoIcon.size.[variant]
        height: CSSObject['height' | 'width']
    }

    // Content area styling
    content: {
        // Pattern: content.gap
        gap: CSSObject['gap']

        // Text container within content
        textContainer: {
            // Pattern: content.textContainer.gap
            gap: CSSObject['gap']

            // Header text styling
            header: {
                // Pattern: content.textContainer.header.color
                color: {
                    [key in SnackbarVariant]: CSSObject['color']
                }
                // Pattern: content.textContainer.header.fontSize
                fontSize: CSSObject['fontSize']
                // Pattern: content.textContainer.header.fontWeight
                fontWeight: CSSObject['fontWeight']
            }

            // Description text styling
            description: {
                // Pattern: content.textContainer.description.color
                color: {
                    [key in SnackbarVariant]: CSSObject['color']
                }
                // Pattern: content.textContainer.description.fontSize
                fontSize: CSSObject['fontSize']
                // Pattern: content.textContainer.description.fontWeight
                fontWeight: CSSObject['fontWeight']
            }
        }

        // Action button styling
    }

    actions: {
        // Pattern: content.actionButton.padding
        // padding: CSSObject['padding']
        // Pattern: content.actionButton.color
        primaryAction: {
            color: {
                [key in SnackbarVariant]: CSSObject['color']
            }
            // Pattern: content.actionButton.fontSize
            fontSize: CSSObject['fontSize']
            // Pattern: content.actionButton.fontWeight
            fontWeight: CSSObject['fontWeight']
        }
        closeButton: {
            // Pattern: crossIcon.size
            height: CSSObject['height' | 'width']
            // Pattern: crossIcon.color
            color: {
                [key in SnackbarVariant]: CSSObject['color']
            }
        }
    }

    // Cross icon styling
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

            // Pattern: infoIcon.color.[variant]
            // Example: infoIcon.color.success
            infoIcon: {
                color: {
                    info: foundationToken.colors.primary[300],
                    success: foundationToken.colors.green[500],
                    warning: foundationToken.colors.yellow[500],
                    error: foundationToken.colors.red[500],
                },
                height: foundationToken.unit[16],
            },

            // Content area styling
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
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                    },

                    description: {
                        color: {
                            info: foundationToken.colors.gray[300],
                            success: foundationToken.colors.gray[300],
                            warning: foundationToken.colors.gray[300],
                            error: foundationToken.colors.gray[300],
                        },
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                    },
                },
            },

            actions: {
                primaryAction: {
                    color: {
                        info: foundationToken.colors.primary[400],
                        success: foundationToken.colors.primary[400],
                        warning: foundationToken.colors.primary[400],
                        error: foundationToken.colors.primary[400],
                    },
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                },
                closeButton: {
                    height: foundationToken.unit[16],
                    color: {
                        info: foundationToken.colors.gray[0],
                        success: foundationToken.colors.gray[0],
                        warning: foundationToken.colors.gray[0],
                        error: foundationToken.colors.gray[0],
                    },
                },
            },
        },
        lg: {
            backgroundColor: foundationToken.colors.gray[900],
            borderRadius: foundationToken.border.radius[8],
            padding: foundationToken.unit[16],
            minWidth: 400,
            maxWidth: 420,
            boxShadow: foundationToken.shadows.lg,
            gap: foundationToken.unit[8],

            // Pattern: infoIcon.color.[variant]
            // Example: infoIcon.color.warning
            infoIcon: {
                color: {
                    info: foundationToken.colors.primary[300],
                    success: foundationToken.colors.green[500],
                    warning: foundationToken.colors.yellow[500],
                    error: foundationToken.colors.red[500],
                },
                height: foundationToken.unit[16],
            },

            // Content area styling
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
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                    },

                    description: {
                        color: {
                            info: foundationToken.colors.gray[300],
                            success: foundationToken.colors.gray[300],
                            warning: foundationToken.colors.gray[300],
                            error: foundationToken.colors.gray[300],
                        },
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                    },
                },
            },

            actions: {
                primaryAction: {
                    color: {
                        info: foundationToken.colors.primary[400],
                        success: foundationToken.colors.primary[400],
                        warning: foundationToken.colors.primary[400],
                        error: foundationToken.colors.primary[400],
                    },
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                },
                closeButton: {
                    height: foundationToken.unit[16],
                    color: {
                        info: foundationToken.colors.gray[0],
                        success: foundationToken.colors.gray[0],
                        warning: foundationToken.colors.gray[0],
                        error: foundationToken.colors.gray[0],
                    },
                },
            },
        },
    }
}

const snackbarTokens: ResponsiveSnackbarTokens =
    getSnackbarTokens(FOUNDATION_THEME)

export default snackbarTokens
