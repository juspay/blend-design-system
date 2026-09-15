import type { CSSObject } from 'styled-components'
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
    container: {
        backgroundColor: CSSObject['backgroundColor']
        background?: CSSObject['background']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        backdropFilter: CSSObject['backdropFilter']
        zIndex?: CSSObject['zIndex']
        transition?: CSSObject['transition']
    }

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
