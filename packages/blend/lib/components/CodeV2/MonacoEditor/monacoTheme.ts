import type * as Monaco from 'monaco-editor'
import type { CodeBlockTokenType } from '../../CodeBlock/codeBlock.token'

const MONACO_COLOR_FALLBACK = '#24292F'

const toMonacoColor = (
    color: string | undefined,
    fallback = MONACO_COLOR_FALLBACK
) => (color ?? fallback).replace('#', '')

/** Token names mapped to syntax key and optional font style for Monaco theme rules */
const SYNTAX_RULE_SPEC: Array<{
    token: string
    syntaxKey: keyof CodeBlockTokenType['body']['syntax']
    fontStyle?: string
}> = [
    { token: 'keyword', syntaxKey: 'keyword', fontStyle: 'bold' },
    { token: 'keyword.control', syntaxKey: 'keyword', fontStyle: 'bold' },
    { token: 'keyword.operator', syntaxKey: 'operator' },
    { token: 'function', syntaxKey: 'function' },
    { token: 'function.call', syntaxKey: 'function' },
    { token: 'identifier', syntaxKey: 'text' },
    { token: 'string', syntaxKey: 'string' },
    { token: 'string.quoted', syntaxKey: 'string' },
    { token: 'string.escape', syntaxKey: 'keyword', fontStyle: 'bold' },
    { token: 'number', syntaxKey: 'number' },
    { token: 'number.hex', syntaxKey: 'number' },
    { token: 'number.binary', syntaxKey: 'number' },
    { token: 'number.octal', syntaxKey: 'number' },
    { token: 'number.float', syntaxKey: 'number' },
    { token: 'delimiter', syntaxKey: 'operator' },
    { token: 'delimiter.bracket', syntaxKey: 'operator' },
    { token: 'delimiter.parenthesis', syntaxKey: 'operator' },
    { token: 'delimiter.square', syntaxKey: 'operator' },
    { token: 'delimiter.curly', syntaxKey: 'operator' },
    { token: 'operator', syntaxKey: 'operator' },
    { token: 'comment', syntaxKey: 'comment', fontStyle: 'italic' },
    { token: 'comment.line', syntaxKey: 'comment', fontStyle: 'italic' },
    { token: 'comment.block', syntaxKey: 'comment', fontStyle: 'italic' },
    { token: 'comment.doc', syntaxKey: 'comment', fontStyle: 'italic' },
    { token: 'variable', syntaxKey: 'variable' },
    { token: 'variable.name', syntaxKey: 'variable' },
    { token: 'variable.parameter', syntaxKey: 'variable' },
    { token: 'type', syntaxKey: 'keyword' },
    { token: 'type.identifier', syntaxKey: 'keyword' },
    { token: 'constant', syntaxKey: 'number' },
    { token: 'constant.language', syntaxKey: 'keyword', fontStyle: 'bold' },
    { token: 'tag', syntaxKey: 'keyword' },
    { token: 'tag.id', syntaxKey: 'function' },
    { token: 'tag.class', syntaxKey: 'function' },
    { token: 'attribute.name', syntaxKey: 'variable' },
    { token: 'attribute.value', syntaxKey: 'string' },
    { token: 'regexp', syntaxKey: 'string', fontStyle: 'bold' },
    { token: '', syntaxKey: 'text' },
]

export function createEditorTheme(
    tokens: CodeBlockTokenType
): Monaco.editor.IStandaloneThemeData {
    const syntax = tokens.body.syntax
    const gutter = tokens.body.gutter
    const highlight = tokens.body.highlightedLine.backgroundColor
    const keyword = syntax.keyword ?? MONACO_COLOR_FALLBACK
    const gutterColor = gutter.color ?? '#6E7681'

    const rules = SYNTAX_RULE_SPEC.map(({ token, syntaxKey, fontStyle }) => ({
        token,
        foreground: toMonacoColor(syntax[syntaxKey]),
        ...(fontStyle && { fontStyle }),
    }))

    return {
        base: 'vs',
        inherit: true,
        rules,
        colors: {
            'editor.background': tokens.body.backgroundColor || '#FAFAFA',
            'editor.foreground': syntax.text || MONACO_COLOR_FALLBACK,
            'editor.lineHighlightBackground':
                highlight.unchanged || 'transparent',
            'editor.lineHighlightBorder': 'transparent',
            'editorLineNumber.foreground': gutter.color || '#57606A',
            'editorLineNumber.activeForeground':
                syntax.text || MONACO_COLOR_FALLBACK,
            'editor.selectionBackground': `${keyword}20`,
            'editor.inactiveSelectionBackground': `${keyword}10`,
            'editorCursor.foreground': syntax.text || MONACO_COLOR_FALLBACK,
            'editorWhitespace.foreground': 'transparent',
            'editorIndentGuide.background': 'transparent',
            'editorIndentGuide.activeBackground': 'transparent',
            'scrollbarSlider.background': `${gutterColor}40`,
            'scrollbarSlider.hoverBackground': `${gutterColor}55`,
            'scrollbarSlider.activeBackground': `${gutterColor}70`,
            'scrollbar.shadow': `${gutterColor}10`,
        },
    }
}
