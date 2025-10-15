import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import FOUNDATION_THEME from '../../tokens/theme.token'

export type DrawerDirection = 'top' | 'bottom' | 'left' | 'right'

/**
 * Drawer Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure:
 * - target: overlay | content | handle | header | body | footer | mobileOffset (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | boxShadow | zIndex | border | padding | fontSize | fontWeight | color | gap | etc.
 * - variant: top | bottom | left | right (drawer direction)
 * - state: default (interaction state)
 *
 * Pattern examples:
 * - overlay.backgroundColor.[state]
 * - overlay.zIndex (no variant dependency)
 * - content.backgroundColor.[variant].[state]
 * - content.borderRadius.[variant]
 * - handle.backgroundColor.[variant].[state]
 * - header.padding.[variant]
 * - header.text.title.fontSize (no variant dependency)
 * - body.padding.[variant]
 * - footer.gap.[variant]
 * - mobileOffset.top.[variant]
 */
export type DrawerTokensType = {
    // Base properties (shared)
    borderRadius: {
        topLeft: CSSObject['borderTopLeftRadius']
        topRight: CSSObject['borderTopRightRadius']
        bottomLeft: CSSObject['borderBottomLeftRadius']
        bottomRight: CSSObject['borderBottomRightRadius']
    }

    // Overlay section
    overlay: {
        backgroundColor: CSSObject['backgroundColor']
    }

    offset: {
        top: CSSObject['top']
        bottom: CSSObject['bottom']
        left: CSSObject['left']
        right: CSSObject['right']
    }

    // Content section (main drawer container)
    content: {
        backgroundColor: CSSObject['backgroundColor']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        handle: {
            backgroundColor: CSSObject['backgroundColor']
            borderRadius: CSSObject['borderRadius']
            width: CSSObject['width']
            height: CSSObject['height']
        }
    }
}

export type ResponsiveDrawerTokens = {
    [key in keyof BreakpointType]: DrawerTokensType
}

export const getDrawerComponentTokens = (
    foundationToken: FoundationTokenType
): ResponsiveDrawerTokens => {
    return {
        sm: {
            // Base properties (shared)
            borderRadius: {
                topLeft: foundationToken.border.radius[16],
                topRight: foundationToken.border.radius[16],
                bottomLeft: foundationToken.border.radius[16],
                bottomRight: foundationToken.border.radius[16],
            },
            // border: `1px solid ${foundationToken.colors.gray[200]}`,

            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            offset: {
                top: '74px',
                bottom: FOUNDATION_THEME.unit[16],
                left: FOUNDATION_THEME.unit[16],
                right: FOUNDATION_THEME.unit[16],
            },
            content: {
                backgroundColor: foundationToken.colors.gray[0],
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                handle: {
                    backgroundColor: foundationToken.colors.gray[300],
                    borderRadius: foundationToken.border.radius.full,
                    width: FOUNDATION_THEME.unit[48],
                    height: FOUNDATION_THEME.unit[6],
                },
            },
        },
        lg: {
            // Base properties (shared)
            borderRadius: {
                topLeft: foundationToken.border.radius[16],
                topRight: foundationToken.border.radius[16],
                bottomLeft: foundationToken.border.radius[16],
                bottomRight: foundationToken.border.radius[16],
            },
            // border: `1px solid ${foundationToken.colors.gray[200]}`,

            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            offset: {
                top: '74px',
                bottom: FOUNDATION_THEME.unit[16],
                left: FOUNDATION_THEME.unit[16],
                right: FOUNDATION_THEME.unit[16],
            },
            content: {
                backgroundColor: foundationToken.colors.gray[0],
                padding: {
                    x: foundationToken.unit[20],
                    y: foundationToken.unit[20],
                },
                handle: {
                    backgroundColor: foundationToken.colors.gray[300],
                    borderRadius: foundationToken.border.radius.full,
                    width: FOUNDATION_THEME.unit[48],
                    height: FOUNDATION_THEME.unit[6],
                },
            },
        },
    }
}
