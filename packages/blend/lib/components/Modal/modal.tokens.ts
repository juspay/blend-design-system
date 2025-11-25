import type { CSSObject } from 'styled-components'
import { type FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'

export type ModalState = 'default'

/**
 * Modal Tokens following the pattern: [target].CSSProp.[state]
 *
 * Structure:
 * - target: container | header | body | footer (defines what element the token applies to)
 * - CSSProp: shadow | zIndex | borderRadius | padding | border | backgroundColor | fontSize | fontWeight | color | gap | alignItems
 * - state: default (modal doesn't have interactive states)
 *
 * Pattern examples:
 * - container.shadow
 * - container.zIndex
 * - container.borderRadius
 * - header.padding
 * - header.border
 * - header.backgroundColor
 * - header.text.title.fontSize
 * - header.text.title.fontWeight
 * - header.text.title.color
 * - header.text.subtitle.fontSize
 * - header.text.subtitle.color
 * - body.padding
 * - body.border
 * - body.backgroundColor
 * - footer.padding
 * - footer.border
 * - footer.backgroundColor
 * - footer.alignItems
 * - footer.gap
 */
export type ModalTokensType = {
    // Pattern: shadow
    boxShadow: CSSObject['boxShadow']
    // Pattern: borderRadius
    borderRadius: CSSObject['borderRadius']
    // Pattern: padding
    padding: CSSObject['padding']
    // Header properties
    header: {
        // Pattern: header.padding
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        // Pattern: header.border
        borderBottom: CSSObject['border']
        // Pattern: header.backgroundColor
        backgroundColor: CSSObject['backgroundColor']

        // Text styling within header
        text: {
            title: {
                // Pattern: header.text.title.color
                color: CSSObject['color']
                // Pattern: header.text.title.fontSize
                fontSize: CSSObject['fontSize']
                // Pattern: header.text.title.fontWeight
                fontWeight: CSSObject['fontWeight']
            }
            subtitle: {
                // Pattern: header.text.subtitle.color
                color: CSSObject['color']
                // Pattern: header.text.subtitle.fontSize
                fontSize: CSSObject['fontSize']
                // Pattern: header.text.subtitle.fontWeight
                fontWeight: CSSObject['fontWeight']
            }
        }
    }

    // Body properties
    body: {
        // Pattern: body.padding
        padding: CSSObject['padding']
        // Pattern: body.backgroundColor
        backgroundColor: CSSObject['backgroundColor']
    }

    // Footer properties
    footer: {
        // Pattern: footer.padding
        padding: CSSObject['padding']
        // Pattern: footer.border
        borderTop: CSSObject['border']
        // Pattern: footer.backgroundColor
        backgroundColor: CSSObject['backgroundColor']
        // Pattern: footer.gap
        gap: CSSObject['gap']
    }
    closeButton: {
        color: CSSObject['color'] // add hover and default state
    }
}

export type ResponsiveModalTokens = {
    [key in keyof BreakpointType]: ModalTokensType
}

export const getModalComponentTokens = (
    foundationToken: FoundationTokenType
): ResponsiveModalTokens => {
    return {
        sm: {
            // Container properties
            boxShadow: foundationToken.shadows.xs,
            borderRadius: foundationToken.border.radius[12],
            padding: foundationToken.unit[16],

            // Header properties
            header: {
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                // borderRadius: foundationToken.border.radius[12],
                backgroundColor: foundationToken.colors.gray[0],

                text: {
                    title: {
                        color: foundationToken.colors.gray[700],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                    },
                    subtitle: {
                        color: foundationToken.colors.gray[600],
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                    },
                },
            },

            // Body properties
            body: {
                padding: foundationToken.unit[16],
                backgroundColor: foundationToken.colors.gray[0],
            },

            // Footer properties
            footer: {
                padding: foundationToken.unit[16],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[0],
                gap: foundationToken.unit[12],
            },
            closeButton: {
                color: foundationToken.colors.gray[500], // default color
            },
        },
        lg: {
            // Container properties
            boxShadow: foundationToken.shadows.lg,
            borderRadius: foundationToken.border.radius[16],
            padding: foundationToken.unit[16],

            // Header properties
            header: {
                padding: {
                    x: foundationToken.unit[20],
                    y: foundationToken.unit[20],
                },
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[0],

                text: {
                    title: {
                        color: foundationToken.colors.gray[700],
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                    },
                    subtitle: {
                        color: foundationToken.colors.gray[600],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                    },
                },
            },

            // Body properties
            body: {
                padding: foundationToken.unit[20],
                backgroundColor: foundationToken.colors.gray[0],
            },

            // Footer properties
            footer: {
                padding: foundationToken.unit[20],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[0],
                gap: foundationToken.unit[16],
            },
            closeButton: {
                color: foundationToken.colors.gray[500], // default color
            },
        },
    }
}
