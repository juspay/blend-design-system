import type { CSSObject } from 'styled-components'
import { DiffLineType } from './codeV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { darkCodeTokens } from './codeV2.dark.tokens'
import { lightCodeTokens } from './codeV2.light.token'
import { Theme } from '../../context/theme.enum'

export type CodeV2Tokens = {
    backgroundColor: CSSObject['backgroundColor']
    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    boxShadow: CSSObject['boxShadow']
    // Header tokens
    header: {
        backgroundColor: CSSObject['backgroundColor']
        borderBottom: CSSObject['borderBottom']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        gap: CSSObject['gap']
        icon: {
            width: CSSObject['width']
        }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']
        }
    }
    // Content area tokens
    body: {
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        backgroundColor: CSSObject['backgroundColor']

        // Gutter (line numbers) tokens
        gutter: {
            width: CSSObject['width']
            color: CSSObject['color']
            backgroundColor: {
                [key in DiffLineType]: CSSObject['backgroundColor']
            }
            borderLeft: {
                [key in DiffLineType]: CSSObject['borderLeft']
            }
            borderColor: {
                [key in DiffLineType]: CSSObject['color']
            }
        }
        // Code tokens
        code: {
            fontFamily: CSSObject['fontFamily']
            fontSize: CSSObject['fontSize']
            lineHeight: CSSObject['lineHeight']
            padding: {
                x: {
                    left: CSSObject['paddingLeft']
                    right: CSSObject['paddingRight']
                }
                y: CSSObject['padding']
            }
        }
        // Highlighted line tokens (for diff mode and code highlighting)
        highlightedLine: {
            backgroundColor: {
                [key in DiffLineType]: CSSObject['backgroundColor']
            }
        }
        // Syntax highlighting tokens
        syntax: {
            keyword: CSSObject['color']
            function: CSSObject['color']
            string: CSSObject['color']
            number: CSSObject['color']
            operator: CSSObject['color']
            variable: CSSObject['color']
            comment: CSSObject['color']
            text: CSSObject['color']
        }
    }
}

export type ResponsiveCodeV2Tokens = {
    [key in keyof BreakpointType]: CodeV2Tokens
}

export const getCodeV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCodeV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return darkCodeTokens(foundationToken)
    }

    return lightCodeTokens(foundationToken)
}
