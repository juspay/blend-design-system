import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import { DiffLineType } from './types'

/**
 * CodeBlock Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure:
 * - target: container | header | gutter | code | syntax (defines what element the token applies to)
 * - CSSProp: backgroundColor | border | borderRadius | padding | color | fontSize | fontFamily | lineHeight
 * - variant: default | removed | added (for diff-specific styles)
 * - state: default | hover | active (for interactive elements)
 * Need to check for this — Rust, Haskel, resript, python
 * Size-independent properties: all properties are size-independent for CodeBlock
 */
export type CodeBlockTokenType = {
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
        // Expand/collapse context gap tokens for diff mode
        expandContext: {
            backgroundColor: CSSObject['backgroundColor']
            borderTop: CSSObject['borderTop']
            borderBottom: CSSObject['borderBottom']
            padding: CSSObject['padding']
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            letterSpacing: CSSObject['letterSpacing']
            button: {
                padding: CSSObject['padding']
                dotsPadding: CSSObject['padding']
                opacity: CSSObject['opacity']
                disabledOpacity: CSSObject['opacity']
                hoverBackgroundColor: CSSObject['backgroundColor']
                borderRadius: CSSObject['borderRadius']
                iconSize: number
            }
        }
    }
}

export type ResponsiveCodeBlockTokens = {
    [key in keyof BreakpointType]: CodeBlockTokenType
}
