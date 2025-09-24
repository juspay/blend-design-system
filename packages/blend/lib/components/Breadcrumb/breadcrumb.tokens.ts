import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../tokens'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'

export type BreadcrumbState = 'default' | 'hover' | 'active'

/**
 * Breadcrumb Tokens following the pattern: [target].CSSProp.[state]
 *
 * Structure:
 * - target: container | item | separator (defines what element the token applies to)
 * - CSSProp: height | padding | gap | fontSize | fontWeight | color | background
 * - state: active | inactive (breadcrumb item state)
 *
 * Pattern examples:
 * - container.height
 * - container.padding
 * - container.gap
 * - item.padding
 * - item.gap
 * - item.text.fontSize.[state]
 * - item.text.fontWeight.[state]
 * - item.text.color.[state]
 * - item.background.[state]
 */
export type BreadcrumbTokenType = {
    // Pattern: container.height
    height: CSSObject['height']
    // Pattern: container.gap
    gap: CSSObject['gap']

    // Item properties
    item: {
        // Pattern: item.padding
        padding: CSSObject['padding']
        // Pattern: item.gap
        gap: CSSObject['gap']

        // Text styling within item
        text: {
            // Pattern: item.text.fontSize.
            fontSize: CSSObject['fontSize']
            // Pattern: item.text.fontWeight.
            fontWeight: CSSObject['fontWeight']
            // Pattern: item.text.color.[state]
            color: {
                [key in BreadcrumbState]: CSSObject['color']
            }
        }
    }
}

export type ResponsiveBreadcrumbTokens = {
    [key in keyof BreakpointType]: BreadcrumbTokenType
}

export const getBreadcrumbTokens = (
    foundationToken: FoundationTokenType
): ResponsiveBreadcrumbTokens => {
    return {
        sm: {
            height: foundationToken.unit[32],
            gap: foundationToken.unit[0],

            // Item properties
            item: {
                padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
                gap: foundationToken.unit[6],

                text: {
                    // Pattern: item.text.fontSize
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    // Pattern: item.text.fontWeight.[state]
                    fontWeight: foundationToken.font.weight[500],
                    // Pattern: item.text.color.[state]
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[1000],
                        active: foundationToken.colors.gray[700],
                    },
                },
            },
        },
        lg: {
            height: foundationToken.unit[32],
            gap: foundationToken.unit[0],

            // Item properties
            item: {
                padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
                gap: foundationToken.unit[6],

                text: {
                    // Pattern: item.text.fontSize.[state]
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    // Pattern: item.text.fontWeight.[state]
                    fontWeight: foundationToken.font.weight[500],
                    // Pattern: item.text.color.[state]
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[1000],
                        active: foundationToken.colors.gray[700],
                    },
                },
            },
        },
    }
}

const breadcrumbTokens: ResponsiveBreadcrumbTokens =
    getBreadcrumbTokens(FOUNDATION_THEME)

export default breadcrumbTokens
