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
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
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
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
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
            paddingTop: CSSObject['paddingTop']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            paddingRight: CSSObject['paddingRight']
        }
        // Highlighted line tokens (for diff mode and code highlighting)
        highlightedLine: {
            backgroundColor: {
                [key in DiffLineType]: CSSObject['backgroundColor']
            }
        }
        // Syntax highlighting tokens
        syntax: {
            keyword: { color: CSSObject['color'] }
            function: { color: CSSObject['color'] }
            string: { color: CSSObject['color'] }
            number: { color: CSSObject['color'] }
            operator: { color: CSSObject['color'] }
            variable: { color: CSSObject['color'] }
            comment: { color: CSSObject['color'] }
            text: { color: CSSObject['color'] }
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
