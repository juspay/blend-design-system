import type { CSSObject } from 'styled-components'
import { SnackbarV2Variant } from './snackbarV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getSnackbarV2DarkTokens } from './snackbarV2.dark.tokens'
import { getSnackbarV2LightTokens } from './snackbarV2.light.tokens'

//Tokens Pattern: component.[target].CSSProp.[size].[variant].[state].value
export type SnackbarV2TokensType = {
    backgroundColor: CSSObject['backgroundColor']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    maxWidth: CSSObject['maxWidth']
    boxShadow: CSSObject['boxShadow']
    gap: CSSObject['gap']

    // Info icon styling
    infoIcon: {
        // Pattern: infoIcon.color.[variant]
        color: {
            [key in SnackbarV2Variant]: CSSObject['color']
        }
        // Pattern: infoIcon.size.[variant]
        height: CSSObject['height' | 'width']
    }

    // Content area styling
    content: {
        // Pattern: content.gap
        gap: CSSObject['gap']

        // Text container within content
        textContainer: {
            // Pattern: content.textContainer.gap
            gap: CSSObject['gap']

            // Header text styling
            header: {
                // Pattern: content.textContainer.header.color
                color: {
                    [key in SnackbarV2Variant]: CSSObject['color']
                }
                // Pattern: content.textContainer.header.fontSize
                fontSize: CSSObject['fontSize']
                // Pattern: content.textContainer.header.fontWeight
                fontWeight: CSSObject['fontWeight']
            }

            // Description text styling
            description: {
                // Pattern: content.textContainer.description.color
                color: {
                    [key in SnackbarV2Variant]: CSSObject['color']
                }
                // Pattern: content.textContainer.description.fontSize
                fontSize: CSSObject['fontSize']
                // Pattern: content.textContainer.description.fontWeight
                fontWeight: CSSObject['fontWeight']
            }
        }
    }

    actions: {
        // Pattern: content.actionButton.color
        primaryAction: {
            color: {
                [key in SnackbarV2Variant]: CSSObject['color']
            }
            // Pattern: content.actionButton.fontSize
            fontSize: CSSObject['fontSize']
            // Pattern: content.actionButton.fontWeight
            fontWeight: CSSObject['fontWeight']
        }
        closeButton: {
            // Pattern: crossIcon.size
            height: CSSObject['height' | 'width']
            // Pattern: crossIcon.color
            color: {
                [key in SnackbarV2Variant]: CSSObject['color']
            }
        }
    }
}

export type ResponsiveSnackbarV2Tokens = {
    [key in keyof BreakpointType]: SnackbarV2TokensType
}

export const getSnackbarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSnackbarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSnackbarV2DarkTokens(foundationToken)
    }

    return getSnackbarV2LightTokens(foundationToken)
}
