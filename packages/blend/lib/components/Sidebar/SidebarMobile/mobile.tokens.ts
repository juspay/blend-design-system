import type { CSSObject } from 'styled-components'
import { type FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

export type MobileNavigationState = 'default' | 'active'

/**
 * Mobile Navigation Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure matches Sidebar pattern for consistency:
 * - Base properties: backgroundColor, drawer.*
 * - Layout surfaces: padding/gap (container), row.*
 * - Interactive elements: item.*, primaryAction.*
 * - Interactive elements have state-based styling: [state] = default | active
 *
 * Note: This is mobile-only, so no responsive breakpoints needed.
 * All navigation items (including the More button) use the same item tokens.
 *
 * Pattern examples:
 * - padding.[axis] (wrapper spacing for all rows)
 * - row.padding.[axis] (individual row spacing)
 * - item.backgroundColor.[state] (item background per state)
 * - primaryAction.width (primary action button dimensions)
 */
export type MobileNavigationTokenType = {
    // Surface background
    backgroundColor: CSSObject['backgroundColor']

    // Drawer properties
    drawer: {
        borderRadius: CSSObject['borderRadius']
        borderTop: CSSObject['border']
    }
    padding: {
        x: CSSObject['padding']
        y: CSSObject['padding']
    }
    gap: CSSObject['gap']

    // Row styling shared across primary and secondary rows
    row: {
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        gap: CSSObject['gap']

        // Navigation item button (used for all items including More button)
        item: {
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            backgroundColor: {
                [key in MobileNavigationState]: CSSObject['backgroundColor']
            }
            color: {
                [key in MobileNavigationState]: CSSObject['color']
            }
            fontWeight: CSSObject['fontWeight']
            icon: {
                width: CSSObject['width']
                height: CSSObject['height']
                borderRadius: CSSObject['borderRadius']
                transition: CSSObject['transition']
            }
            text: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                textAlign: CSSObject['textAlign']
            }
        }

        // Primary action button (center button)
        primaryAction: {
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
            background: CSSObject['background']
            boxShadow: CSSObject['boxShadow']
            color: CSSObject['color']
            icon: {
                width: CSSObject['width']
                height: CSSObject['height']
            }
        }
    }
}

export type ResponsiveMobileNavigationTokens = {
    [key in keyof BreakpointType]: MobileNavigationTokenType
}

export const getMobileNavigationTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMobileNavigationTokens => {
    const baseTokens: MobileNavigationTokenType = {
        backgroundColor: foundationToken.colors.gray[0],
        drawer: {
            borderRadius: foundationToken.border.radius[24],
            borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
        },
        padding: {
            x: foundationToken.unit[24],
            y: foundationToken.unit[4],
        },
        gap: foundationToken.unit[12],
        row: {
            padding: {
                x: foundationToken.unit[0],
                y: foundationToken.unit[12],
            },
            gap: foundationToken.unit[10],
            item: {
                width: foundationToken.unit[56],
                height: foundationToken.unit[48],
                borderRadius: foundationToken.border.radius[24],
                gap: foundationToken.unit[4],
                backgroundColor: {
                    default: 'transparent',
                    active: 'transparent',
                },
                color: {
                    default: foundationToken.colors.gray[400],
                    active: foundationToken.colors.gray[800],
                },
                fontWeight: foundationToken.font.weight[500],
                icon: {
                    width: foundationToken.unit[20],
                    height: foundationToken.unit[20],
                    borderRadius: foundationToken.border.radius[12],
                    transition: 'color 0.2s ease',
                },
                text: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    textAlign: 'center',
                },
            },
            primaryAction: {
                width: foundationToken.unit[48],
                height: foundationToken.unit[48],
                borderRadius: foundationToken.border.radius[28],
                background: `linear-gradient(135deg, ${foundationToken.colors.primary[400]} 0%, ${foundationToken.colors.primary[600]} 100%)`,
                boxShadow: foundationToken.shadows['2xl'],
                color: foundationToken.colors.gray[0],
                icon: {
                    width: '24px',
                    height: '24px',
                },
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
