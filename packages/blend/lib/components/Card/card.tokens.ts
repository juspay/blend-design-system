import type { CSSObject } from 'styled-components'
import FOUNDATION_THEME, {
    type FoundationTokenType,
} from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type CardState = 'default' | 'hover'

/**
 * Card Tokens following the design system pattern
 *
 * Structure:
 * - Root level: maxWidth, borderRadius, boxShadow, padding, border, backgroundColor
 * - header: backgroundColor, padding, borderBottom, borderRadius, text, slot
 * - body: padding, text, slot
 * - action: inline, regular (marginTop values)
 * - alignment: vertical, horizontal (padding, gap, minHeight)
 *
 * Pattern examples:
 * - maxWidth
 * - backgroundColor.[state]
 * - header.backgroundColor
 * - header.text.title.fontSize
 * - header.text.subHeader.marginTop
 * - body.text.title.marginTop
 * - body.slot.slot1.marginTop
 * - action.inline.marginTop
 */
export type CardTokenType = {
    // Root level card properties
    maxWidth: CSSObject['maxWidth']
    borderRadius: CSSObject['borderRadius']
    boxShadow: {
        [key in CardState]: CSSObject['boxShadow']
    }
    padding: CSSObject['padding']
    border: CSSObject['border']
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
                gap: CSSObject['gap']
            }
            subHeader: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
                marginTop: CSSObject['marginTop']
            }
        }

        // Header slot spacing
        slot: {
            gap: CSSObject['gap']
        }
    }

    // Body section
    body: {
        padding: CSSObject['padding']

        // Text styling within body
        text: {
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
                marginTop: CSSObject['marginTop']
            }
            content: {
                fontSize: CSSObject['fontSize']
                color: CSSObject['color']
                marginTop: CSSObject['marginTop']
            }
        }

        // Body slot spacing
        slot: {
            slot1: {
                marginTop: CSSObject['marginTop']
            }
            slot2: {
                marginTop: CSSObject['marginTop']
            }
        }
    }

    // Action button spacing
    action: {
        inline: {
            marginTop: CSSObject['marginTop']
        }
        regular: {
            marginTop: CSSObject['marginTop']
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
            // Root level properties
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
                        gap: foundationToken.unit[8],
                    },
                    subHeader: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        color: foundationToken.colors.gray[500],
                        marginTop: foundationToken.unit[2],
                    },
                },

                slot: {
                    gap: foundationToken.unit[8],
                },
            },

            // Body section
            body: {
                padding: foundationToken.unit[16],

                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[800],
                        marginTop: foundationToken.unit[14],
                    },
                    content: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        color: foundationToken.colors.gray[500],
                        marginTop: foundationToken.unit[6],
                    },
                },

                slot: {
                    slot1: {
                        marginTop: foundationToken.unit[16],
                    },
                    slot2: {
                        marginTop: foundationToken.unit[14],
                    },
                },
            },

            // Action button spacing
            action: {
                inline: {
                    marginTop: foundationToken.unit[14],
                },
                regular: {
                    marginTop: foundationToken.unit[24],
                },
            },
        },
        lg: {
            // Root level properties
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
                        gap: foundationToken.unit[8],
                    },
                    subHeader: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        color: foundationToken.colors.gray[500],
                        marginTop: foundationToken.unit[2],
                    },
                },

                slot: {
                    gap: foundationToken.unit[8],
                },
            },

            // Body section
            body: {
                padding: foundationToken.unit[16],

                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[800],
                        marginTop: foundationToken.unit[14],
                    },
                    content: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        color: foundationToken.colors.gray[500],
                        marginTop: foundationToken.unit[6],
                    },
                },

                slot: {
                    slot1: {
                        marginTop: foundationToken.unit[16],
                    },
                    slot2: {
                        marginTop: foundationToken.unit[14],
                    },
                },
            },

            // Action button spacing
            action: {
                inline: {
                    marginTop: foundationToken.unit[14],
                },
                regular: {
                    marginTop: foundationToken.unit[24],
                },
            },
        },
    }
}

const cardTokens: ResponsiveCardTokens = getCardTokens(FOUNDATION_THEME)

export default cardTokens
