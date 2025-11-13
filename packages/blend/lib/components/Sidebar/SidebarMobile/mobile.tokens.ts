import type { CSSObject } from 'styled-components'
import { type FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

export type MobileNavigationState = 'default' | 'active'

/**
 * Mobile Navigation Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure matches Sidebar pattern for consistency:
 * - Base properties: container.*, drawer.*
 * - Target sections: primaryRow.*, secondaryRow.*, item.*, primaryAction.*
 * - Each target has: backgroundColor, padding, border, gap, dimensions, specific properties
 * - Interactive elements have state-based styling: [state] = default | active
 *
 * Note: This is mobile-only, so no responsive breakpoints needed.
 * All items (including More button) use the same item tokens.
 *
 * Pattern examples:
 * - container.backgroundColor (navigation container background)
 * - drawer.borderRadius (drawer top border radius)
 * - primaryRow.padding.[variant] (primary row padding based on variant)
 * - item.backgroundColor.[state] (item background per state)
 * - primaryAction.width (primary action button dimensions)
 */
export type MobileNavigationTokenType = {
    // Container properties
    backgroundColor: CSSObject['backgroundColor']

    // Drawer properties
    drawer: {
        borderRadius: CSSObject['borderRadius']
        borderTop: CSSObject['border']
    }

    // Primary row (first visible row)
    primaryRow: {
        minHeight: CSSObject['minHeight']
        padding: {
            default: {
                top: CSSObject['padding']
                right: CSSObject['padding']
                bottom: CSSObject['padding']
                left: CSSObject['padding']
            }
        }
        gap: CSSObject['gap']
    }

    // Secondary row (expanded rows)
    secondaryRow: {
        padding: {
            default: {
                top: CSSObject['padding']
                right: CSSObject['padding']
                bottom: CSSObject['padding']
                left: CSSObject['padding']
            }
            last: {
                top: CSSObject['padding']
                right: CSSObject['padding']
                bottom: CSSObject['padding']
                left: CSSObject['padding']
            }
        }
        marginTop: CSSObject['margin']
        gap: CSSObject['gap']
        rowGap: CSSObject['gap']
    }

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
        primaryRow: {
            minHeight: `calc(${String(foundationToken.unit[48])} + ${String(foundationToken.unit[16])} * 2)`,
            padding: {
                default: {
                    top: foundationToken.unit[16],
                    right: foundationToken.unit[24],
                    bottom: foundationToken.unit[16],
                    left: foundationToken.unit[24],
                },
            },
            gap: foundationToken.unit[8],
        },
        secondaryRow: {
            padding: {
                default: {
                    top: foundationToken.unit[12],
                    right: foundationToken.unit[24],
                    bottom: foundationToken.unit[12],
                    left: foundationToken.unit[24],
                },
                last: {
                    top: foundationToken.unit[12],
                    right: foundationToken.unit[24],
                    bottom: foundationToken.unit[28],
                    left: foundationToken.unit[24],
                },
            },
            marginTop: foundationToken.unit[12],
            gap: foundationToken.unit[8],
            rowGap: foundationToken.unit[12],
        },
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
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
