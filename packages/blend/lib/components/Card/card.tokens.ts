import type { CSSObject } from 'styled-components'
import { CardVariant } from './types'
import FOUNDATION_THEME, {
    type FoundationTokenType,
} from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type CardState = 'default' | 'hover'

/**
 * Card Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure:
 * - target: header | body | actions (defines what element the token applies to)
 * - CSSProp: padding | backgroundColor | border | fontSize | fontWeight | color | gap
 * - variant: default | aligned (card variant)
 * - state: default | hover (interaction state)
 *
 * Pattern examples:
 * - maxWidth (no variant dependency)
 * - borderRadius (no variant dependency)
 * - boxShadow.[state]
 * - padding (no variant dependency)
 * - border (no variant dependency)
 * - backgroundColor.[state]
 * - header.backgroundColor (no variant dependency)
 * - header.padding (no variant dependency)
 * - header.text.title.fontSize
 * - header.gap.[variant] (depends on alignment)
 * - body.gap.[variant] (depends on alignment)
 */
export type CardTokenType = {
    // Base container properties (no variant dependency)
    maxWidth: CSSObject['maxWidth']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    border: CSSObject['border']

    // State-dependent properties
    boxShadow: {
        [key in CardState]: CSSObject['boxShadow']
    }
    backgroundColor: {
        [key in CardState]: CSSObject['backgroundColor']
    }

    // Header section
    header: {
        backgroundColor: CSSObject['backgroundColor']
        padding: CSSObject['padding']
        borderBottom: CSSObject['borderBottom']

        // Text styling within header
        text: {
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
                gap: CSSObject['gap'] // Gap between title and subtitle
            }
            subTitle: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
        }

        // Spacing between header elements (variant-dependent for alignment)
        gap: {
            [key in CardVariant]: CSSObject['gap']
        }
    }

    // Body section
    body: {
        padding: CSSObject['padding']

        // Spacing between body elements (variant-dependent for alignment)
        gap: {
            [key in CardVariant]: CSSObject['gap']
        }

        // Content section within body (for complex content layouts)
        content: {
            text: {
                title: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    color: CSSObject['color']
                    gap: CSSObject['gap'] // Gap between title and content text
                }
                subtitle: {
                    fontSize: CSSObject['fontSize']
                    color: CSSObject['color']
                    gap: CSSObject['gap'] // Gap between title and subtitle
                }
                content: {
                    fontSize: CSSObject['fontSize']
                    color: CSSObject['color']
                }
            }
            // Gap for content slot positioning (variant-dependent)
            gap: {
                [key in CardVariant]: CSSObject['gap']
            }
        }

        // Action buttons section (variant-dependent)
        actions: {
            inline: {
                gap: {
                    [key in CardVariant]: CSSObject['gap']
                }
            }
            regular: {
                gap: {
                    [key in CardVariant]: CSSObject['gap']
                }
            }
        }
    }
}

export type ResponsiveCardTokens = {
    [key in keyof BreakpointType]: CardTokenType
}

export const getCardTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCardTokens => {
    return {
        sm: {
            maxWidth: 'auto',
            borderRadius: foundationToken.border.radius[12],
            boxShadow: {
                default: foundationToken.shadows.sm,
                hover: foundationToken.shadows.md,
            },
            padding: foundationToken.unit[16],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            backgroundColor: {
                default: foundationToken.colors.gray[0],
                hover: foundationToken.colors.gray[0],
            },

            // Header section
            header: {
                backgroundColor: foundationToken.colors.gray[25],
                padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,

                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[800],
                        gap: foundationToken.unit[2], // Gap between title and subtitle
                    },
                    subTitle: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        color: foundationToken.colors.gray[500],
                    },
                },

                gap: {
                    [CardVariant.DEFAULT]: foundationToken.unit[8],
                    [CardVariant.ALIGNED]: foundationToken.unit[12], // More spacing for aligned cards
                    [CardVariant.CUSTOM]: foundationToken.unit[8],
                },
            },

            // Body section
            body: {
                padding: foundationToken.unit[16],

                gap: {
                    [CardVariant.DEFAULT]: foundationToken.unit[24],
                    [CardVariant.ALIGNED]: foundationToken.unit[16], // Tighter spacing for aligned layouts
                    [CardVariant.CUSTOM]: foundationToken.unit[24],
                },

                content: {
                    text: {
                        title: {
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[500],
                            color: foundationToken.colors.gray[800],
                            gap: foundationToken.unit[6], // Gap between title and content text
                        },
                        subtitle: {
                            fontSize:
                                foundationToken.font.size.body.sm.fontSize,
                            color: foundationToken.colors.gray[500],
                            gap: foundationToken.unit[4], // Gap between title and subtitle
                        },
                        content: {
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            color: foundationToken.colors.gray[500],
                        },
                    },
                    gap: {
                        [CardVariant.DEFAULT]: foundationToken.unit[8],
                        [CardVariant.ALIGNED]: foundationToken.unit[6], // Tighter for aligned content
                        [CardVariant.CUSTOM]: foundationToken.unit[8],
                    },
                },

                // Action buttons section (variant-dependent)
                actions: {
                    inline: {
                        gap: {
                            [CardVariant.DEFAULT]: foundationToken.unit[14], // Always 14px for inline buttons
                            [CardVariant.ALIGNED]: foundationToken.unit[14], // Always 14px for inline buttons (except center-aligned uses 24px)
                            [CardVariant.CUSTOM]: foundationToken.unit[14],
                        },
                    },
                    regular: {
                        gap: {
                            [CardVariant.DEFAULT]: foundationToken.unit[24],
                            [CardVariant.ALIGNED]: foundationToken.unit[24], // Regular buttons use 24px
                            [CardVariant.CUSTOM]: foundationToken.unit[24],
                        },
                    },
                },
            },
        },
        lg: {
            maxWidth: 'auto',
            borderRadius: foundationToken.border.radius[12],
            boxShadow: {
                default: foundationToken.shadows.sm,
                hover: foundationToken.shadows.md,
            },
            padding: foundationToken.unit[16],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            backgroundColor: {
                default: foundationToken.colors.gray[0],
                hover: foundationToken.colors.gray[0],
            },

            // Header section
            header: {
                backgroundColor: foundationToken.colors.gray[25],
                padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,

                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[800],
                        gap: foundationToken.unit[2], // Gap between title and subtitle
                    },
                    subTitle: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        color: foundationToken.colors.gray[500],
                    },
                },

                gap: {
                    [CardVariant.DEFAULT]: foundationToken.unit[8],
                    [CardVariant.ALIGNED]: foundationToken.unit[16], // More spacing for aligned cards on larger screens
                    [CardVariant.CUSTOM]: foundationToken.unit[8],
                },
            },

            // Body section
            body: {
                padding: foundationToken.unit[16],

                gap: {
                    [CardVariant.DEFAULT]: foundationToken.unit[24],
                    [CardVariant.ALIGNED]: foundationToken.unit[20], // Adjusted spacing for aligned layouts
                    [CardVariant.CUSTOM]: foundationToken.unit[24],
                },

                content: {
                    text: {
                        title: {
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[500],
                            color: foundationToken.colors.gray[800],
                            gap: foundationToken.unit[6], // Gap between title and content text
                        },
                        subtitle: {
                            fontSize:
                                foundationToken.font.size.body.sm.fontSize,
                            color: foundationToken.colors.gray[500],
                            gap: foundationToken.unit[4], // Gap between title and subtitle
                        },
                        content: {
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            color: foundationToken.colors.gray[500],
                        },
                    },
                    gap: {
                        [CardVariant.DEFAULT]: foundationToken.unit[8],
                        [CardVariant.ALIGNED]: foundationToken.unit[8], // Consistent for larger screens
                        [CardVariant.CUSTOM]: foundationToken.unit[8],
                    },
                },

                // Action buttons section (variant-dependent)
                actions: {
                    inline: {
                        gap: {
                            [CardVariant.DEFAULT]: foundationToken.unit[14], // Always 14px for inline buttons
                            [CardVariant.ALIGNED]: foundationToken.unit[14], // Always 14px for inline buttons (except center-aligned uses 24px)
                            [CardVariant.CUSTOM]: foundationToken.unit[14],
                        },
                    },
                    regular: {
                        gap: {
                            [CardVariant.DEFAULT]: foundationToken.unit[24],
                            [CardVariant.ALIGNED]: foundationToken.unit[24], // Regular buttons use 24px
                            [CardVariant.CUSTOM]: foundationToken.unit[24],
                        },
                    },
                },
            },
        },
    }
}

const cardTokens: ResponsiveCardTokens = getCardTokens(FOUNDATION_THEME)

export default cardTokens
