import type { CSSObject } from 'styled-components'
import { DiffLineType } from './codeEditorV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { darkCodeEditorV2Tokens } from './codeEditorV2.dark.tokens'
import { lightCodeEditorV2Tokens } from './codeEditorV2.light.token'
import { Theme } from '../../context/theme.enum'
import { MonacoTheme } from './codeEditorV2.types'

export type CodeEditorV2Tokens = {
    backgroundColor: CSSObject['backgroundColor']
    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    boxShadow: CSSObject['boxShadow']
    theme: MonacoTheme
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

export type ResponsiveCodeEditorV2Tokens = {
    [key in keyof BreakpointType]: CodeEditorV2Tokens
}

export const getCodeEditorV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCodeEditorV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return darkCodeEditorV2Tokens(foundationToken)
    }

    return lightCodeEditorV2Tokens(foundationToken)
}
