import type { CSSObject } from 'styled-components'
import FOUNDATION_THEME, {
    type FoundationTokenType,
} from '../../tokens/theme.token'
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
    shadow: CSSObject['boxShadow']
    // Pattern: borderRadius
    borderRadius: CSSObject['borderRadius']

    // Header properties
    header: {
        // Pattern: header.padding
        padding: CSSObject['padding']
        // Pattern: header.border
        border: CSSObject['border']
        // Pattern: header.borderRadius
        borderRadius: CSSObject['borderRadius']
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
            }
        }
    }

    // Body properties
    body: {
        // Pattern: body.padding
        padding: CSSObject['padding']
        // Pattern: body.border
        border: CSSObject['border']
        // Pattern: body.borderRadius
        borderRadius: CSSObject['borderRadius']
        // Pattern: body.backgroundColor
        backgroundColor: CSSObject['backgroundColor']
    }

    // Footer properties
    footer: {
        // Pattern: footer.padding
        padding: CSSObject['padding']
        // Pattern: footer.border
        border: CSSObject['border']
        // Pattern: footer.borderRadius
        borderRadius: CSSObject['borderRadius']
        // Pattern: footer.backgroundColor
        backgroundColor: CSSObject['backgroundColor']
        // Pattern: footer.alignItems
        alignItems: CSSObject['alignItems']
        // Pattern: footer.gap
        gap: CSSObject['gap']
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
            shadow: foundationToken.shadows.xs,
            borderRadius: foundationToken.border.radius[12],

            // Header properties
            header: {
                padding: foundationToken.unit[16],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[12],
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
                    },
                },
            },

            // Body properties
            body: {
                padding: foundationToken.unit[16],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[12],
                backgroundColor: foundationToken.colors.gray[0],
            },

            // Footer properties
            footer: {
                padding: foundationToken.unit[16],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: `0 0 ${foundationToken.border.radius[12]} ${foundationToken.border.radius[12]}`,
                backgroundColor: foundationToken.colors.gray[0],
                alignItems: 'flex-end',
                gap: foundationToken.unit[12],
            },
        },
        lg: {
            // Container properties
            shadow: foundationToken.shadows.lg,
            borderRadius: foundationToken.border.radius[16],

            // Header properties
            header: {
                padding: foundationToken.unit[20],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[16],
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
                    },
                },
            },

            // Body properties
            body: {
                padding: foundationToken.unit[20],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[16],
                backgroundColor: foundationToken.colors.gray[0],
            },

            // Footer properties
            footer: {
                padding: foundationToken.unit[20],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: `0 0 ${foundationToken.border.radius[16]} ${foundationToken.border.radius[16]}`,
                backgroundColor: foundationToken.colors.gray[0],
                alignItems: 'flex-end',
                gap: foundationToken.unit[16],
            },
        },
    }
}

const modalTokens: ResponsiveModalTokens =
    getModalComponentTokens(FOUNDATION_THEME)

export default modalTokens
