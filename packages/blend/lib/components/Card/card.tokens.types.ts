import type { CSSObject } from 'styled-components'
import { CardVariant } from './types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

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
        [CardVariant.DEFAULT]: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        [CardVariant.ALIGNED]: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        [CardVariant.CUSTOM]: undefined
    }

    // Header section
    header: {
        // Box styling (only DEFAULT variant has gray background box)
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
            [CardVariant.ALIGNED]: undefined // paddig should be there
            [CardVariant.CUSTOM]: undefined // 12 px default padding
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

        // Action buttons styling - Simple gap (14px default, 24px for center-aligned)
        actions: {
            gap: CSSObject['gap'] // Base gap for actions (14px)
            centerAlignGap: CSSObject['gap'] // Gap for center-aligned cards (24px)
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
