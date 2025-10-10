import type { CSSObject } from 'styled-components'
import { CardVariant } from './types'
import { type FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type CardState = 'default' | 'hover'

/**
 * Card Tokens following proper hierarchy pattern
 *
 * Structure:
 * container (outermost) -> header/body (sections) -> text/content/actions (elements) -> properties
 *
 * Pattern:
 * - container.property.[variant].[state] (for variant-dependent properties)
 * - container.header.text.title.property (for shared text styling)
 * - container.body.actions.inline.gap.[variant] (for variant-dependent spacing)
 *
 * Hierarchy:
 * - Container: Outermost wrapper with base styling and variant-dependent properties
 * - Header: Header section with text styling and variant-specific box styling
 * - Body: Body section with text, content, actions, and variant-specific spacing
 */
export type CardTokenType = {
    // Base properties (shared across variants)
    maxWidth: CSSObject['maxWidth']
    borderRadius: CSSObject['borderRadius']
    border: CSSObject['border']

    boxShadow: CSSObject['boxShadow']
    backgroundColor: CSSObject['backgroundColor']
    padding: {
        [key in CardVariant]: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
    }

    // Header section
    header: {
        // Box styling (only DEFAULT variant has gray background box)
        boxStyling: {
            [CardVariant.DEFAULT]: {
                backgroundColor: CSSObject['backgroundColor']
                padding: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
                borderBottom: CSSObject['borderBottom']
            }
            [CardVariant.ALIGNED]: undefined
            [CardVariant.CUSTOM]: undefined
        }

        // Text styling within header
        text: {
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
                gap: CSSObject['gap'] // Gap between slots and title
            }
            subTitle: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            gap: CSSObject['gap'] // Gap between title and subtitle
        }
    }

    // Body section
    body: {
        // Body container padding (only DEFAULT variant has padding)
        padding: {
            [CardVariant.DEFAULT]: {
                x: CSSObject['padding']
                y: CSSObject['padding']
            }
            [CardVariant.ALIGNED]: undefined
            [CardVariant.CUSTOM]: undefined
        }

        // Spacing between body elements (bodySlot1 → bodyTitle → content → bodySlot2 → actionButton)
        gap: {
            [key in CardVariant]: CSSObject['gap']
        }

        // Text styling for body content
        text: {
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            content: {
                fontSize: CSSObject['fontSize']
                color: CSSObject['color']
                fontWeight: CSSObject['fontWeight']
            }
            gap: CSSObject['gap'] // Gap between bodyTitle and content description
        }

        // Action buttons styling
        actions: {
            inline: {
                gap: {
                    [key in CardVariant]: CSSObject['gap'] // 14px normal, 24px center-aligned
                }
            }
            regular: {
                gap: {
                    [CardVariant.DEFAULT]: CSSObject['gap']
                    [CardVariant.ALIGNED]: undefined
                    [CardVariant.CUSTOM]: undefined
                }
            }
        }

        // Alignment styling (only for ALIGNED variant, similar to header.boxStyling)
        alignment: {
            [CardVariant.ALIGNED]: {
                cardSlot: {
                    vertical: {
                        marginBottom: CSSObject['marginBottom']
                        minHeight: CSSObject['minHeight']
                    }
                    horizontal: {
                        marginRight: CSSObject['marginRight']
                        width: CSSObject['width']
                        height: CSSObject['height']
                    }
                }
            }
            [CardVariant.DEFAULT]: undefined
            [CardVariant.CUSTOM]: undefined
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
            // Base properties (shared)
            maxWidth: 'auto',
            borderRadius: foundationToken.border.radius[12],
            border: `1px solid ${foundationToken.colors.gray[200]}`,

            boxShadow: foundationToken.shadows.sm,
            backgroundColor: foundationToken.colors.gray[0],
            padding: {
                [CardVariant.DEFAULT]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                [CardVariant.ALIGNED]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                [CardVariant.CUSTOM]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
            },

            // Header section
            header: {
                boxStyling: {
                    [CardVariant.DEFAULT]: {
                        backgroundColor: foundationToken.colors.gray[25],
                        padding: {
                            x: foundationToken.unit[16],
                            y: foundationToken.unit[12],
                        },
                        borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                    },
                    [CardVariant.ALIGNED]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[800],
                        gap: foundationToken.unit[8],
                    },
                    subTitle: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[500],
                    },
                    gap: foundationToken.unit[2], // Gap between title and subtitle
                },
            },

            // Body section
            body: {
                padding: {
                    [CardVariant.DEFAULT]: {
                        x: foundationToken.unit[16],
                        y: foundationToken.unit[16],
                    },
                    [CardVariant.ALIGNED]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
                gap: {
                    [CardVariant.DEFAULT]: foundationToken.unit[16],
                    [CardVariant.ALIGNED]: foundationToken.unit[16],
                    [CardVariant.CUSTOM]: foundationToken.unit[16],
                },
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[800],
                    },
                    content: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        color: foundationToken.colors.gray[500],
                        fontWeight: foundationToken.font.weight[400],
                    },
                    gap: foundationToken.unit[6],
                },
                actions: {
                    inline: {
                        gap: {
                            [CardVariant.DEFAULT]: foundationToken.unit[14],

                            [CardVariant.ALIGNED]: foundationToken.unit[14],
                            [CardVariant.CUSTOM]: foundationToken.unit[14],
                        },
                    },
                    regular: {
                        gap: {
                            [CardVariant.DEFAULT]: foundationToken.unit[24],
                            [CardVariant.ALIGNED]: undefined,
                            [CardVariant.CUSTOM]: undefined,
                        },
                    },
                },
                alignment: {
                    [CardVariant.ALIGNED]: {
                        cardSlot: {
                            vertical: {
                                marginBottom: foundationToken.unit[16],
                                minHeight: '142px',
                            },
                            horizontal: {
                                marginRight: foundationToken.unit[16],
                                width: foundationToken.unit[92],
                                height: foundationToken.unit[92],
                                // flexShrink: 0,
                            },
                        },
                        // centerAlign: {
                        //     textAlign: 'center',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        // },
                        // content: {
                        //     flex: '1',
                        // },
                    },
                    [CardVariant.DEFAULT]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
            },
        },

        lg: {
            // Base properties (shared)
            maxWidth: 'auto',
            borderRadius: foundationToken.border.radius[12],
            border: `1px solid ${foundationToken.colors.gray[200]}`,

            boxShadow: foundationToken.shadows.sm,
            backgroundColor: foundationToken.colors.gray[0],
            padding: {
                [CardVariant.DEFAULT]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                [CardVariant.ALIGNED]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                [CardVariant.CUSTOM]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
            },

            // Header section
            header: {
                boxStyling: {
                    [CardVariant.DEFAULT]: {
                        backgroundColor: foundationToken.colors.gray[25],
                        padding: {
                            x: foundationToken.unit[16],
                            y: foundationToken.unit[12],
                        },
                        borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                    },
                    [CardVariant.ALIGNED]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[800],
                        gap: foundationToken.unit[8],
                    },
                    subTitle: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[500],
                    },
                    gap: foundationToken.unit[2], // Gap between title and subtitle
                },
            },

            // Body section
            body: {
                padding: {
                    [CardVariant.DEFAULT]: {
                        x: foundationToken.unit[16],
                        y: foundationToken.unit[16],
                    },
                    [CardVariant.ALIGNED]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
                gap: {
                    [CardVariant.DEFAULT]: foundationToken.unit[16],
                    [CardVariant.ALIGNED]: foundationToken.unit[16],
                    [CardVariant.CUSTOM]: foundationToken.unit[16],
                },
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[800],
                    },
                    content: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        color: foundationToken.colors.gray[500],
                        fontWeight: foundationToken.font.weight[400],
                    },
                    gap: foundationToken.unit[6],
                },
                actions: {
                    inline: {
                        gap: {
                            [CardVariant.DEFAULT]: foundationToken.unit[14],
                            [CardVariant.ALIGNED]: foundationToken.unit[14],
                            [CardVariant.CUSTOM]: foundationToken.unit[14],
                        },
                    },
                    regular: {
                        gap: {
                            [CardVariant.DEFAULT]: foundationToken.unit[24],
                            [CardVariant.ALIGNED]: undefined,
                            [CardVariant.CUSTOM]: undefined,
                        },
                    },
                },
                alignment: {
                    [CardVariant.ALIGNED]: {
                        cardSlot: {
                            vertical: {
                                marginBottom: foundationToken.unit[16],
                                minHeight: '142px',
                            },
                            horizontal: {
                                marginRight: foundationToken.unit[16],
                                width: foundationToken.unit[92],
                                height: foundationToken.unit[92],
                                // flexShrink: 0,
                            },
                        },
                        // centerAlign: {
                        //     textAlign: 'center',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        // },
                        // content: {
                        //     flex: '1',
                        // },
                    },
                    [CardVariant.DEFAULT]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
            },
        },
    }
}
