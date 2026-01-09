import type { CSSObject } from 'styled-components'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
} from './ButtonV2.types'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import type { BreakpointType } from '../../../breakpoints/breakPoints'

/**
 * Button Component Anatomy:
 *
 * ButtonV2
 * ├── Container (PrimitiveButton - root element)
 * │   ├── LeadingIcon (optional - Block wrapper)
 * │   ├── Text (optional - Text component)
 * │   ├── TrailingIcon (optional - Block wrapper)
 * │   └── LoadingSpinner (when loading - LoaderCircle icon)
 *
 * Token Mapping:
 * - container.* → Root button container styles
 * - text.* → Text content styles
 * - icon.* → Icon wrapper styles
 * - loading.* → Loading spinner styles
 */

/**
 * Button Tokens Type
 *
 * Follows the pattern: [target].CSSProp.[size].[variant].[subType].[state]
 *
 * Structure:
 * - target: container | text (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | padding | border | shadow | outline | color
 * - size: sm | md | lg (only for size-dependent properties like padding)
 * - variant: primary | secondary | danger | success (button type/variant)
 * - subType: default | iconOnly | inline (button sub-type)
 * - state: default | hover | active | disabled (interaction state)
 *
 * Size-independent properties: backgroundColor, borderRadius, border, shadow, outline, color
 * Size-dependent properties: padding
 */
export type ButtonV2TokensType = {
    gap: CSSObject['gap']
    // Pattern: slotMaxHeight.[size] (size-dependent)
    slotMaxHeight: {
        [key in ButtonV2Size]: CSSObject['maxHeight']
    }
    // Pattern: backgroundColor.[variant].[subType].[state]
    backgroundColor: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['background']
            }
        }
    }
    // Pattern: borderRadius.[size].[variant].[subType].[state]
    borderRadius: {
        [key in ButtonV2Size]: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: {
                    [key in ButtonV2State]: CSSObject['borderRadius']
                }
            }
        }
    }
    // Pattern: padding.[size].[variant].[subType] (size-dependent)
    padding: {
        [key in ButtonV2Size]: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }
    }
    // Pattern: border.[variant].[subType].[state]
    border: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['border']
            }
        }
    }
    // Pattern: shadow.[variant].[subType].[state]
    shadow: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['boxShadow']
            }
        }
    }
    // Pattern: outline.[variant].[subType].[state]
    outline: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['outline']
            }
        }
    }
    text: {
        // Pattern: text.color.[variant].[subType].[state]
        color: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: {
                    [key in ButtonV2State]: CSSObject['color']
                }
            }
        }
        // Pattern: text.fontSize.[size] (size-dependent)
        fontSize: {
            [key in ButtonV2Size]: CSSObject['fontSize']
        }
        // Pattern: text.fontWeight.[size] (size-dependent)
        fontWeight: {
            [key in ButtonV2Size]: CSSObject['fontWeight']
        }
    }
}

export type ResponsiveButtonV2Tokens = {
    [key in keyof BreakpointType]: ButtonV2TokensType
}

/**
 * Get Button Tokens
 *
 * Generates button tokens from foundation tokens.
 * Reuses the existing button token structure for consistency.
 * This ensures ButtonV2 uses the same tokens as Button for visual consistency.
 */
export const getButtonV2Tokens = (
    foundationToken: FoundationTokenType
): ResponsiveButtonV2Tokens => {
    // Reuse existing button token structure
    // Import from parent Button component's tokens
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getButtonTokens } = require('../button.tokens')
    return getButtonTokens(foundationToken) as ResponsiveButtonV2Tokens
}
