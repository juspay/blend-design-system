import { useRef, useEffect, useState } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import type * as Monaco from 'monaco-editor'
import Block from '../Primitives/Block/Block'
import type { CodeBlockTokenType } from '../CodeBlock/codeBlock.token'

type MonacoEditorWrapperProps = {
    value: string
    language: string
    onChange?: (value: string) => void
    readOnly: boolean
    disabled: boolean
    placeholder?: string
    showLineNumbers: boolean
    minHeight: string | number
    maxHeight?: string | number
    tokens: CodeBlockTokenType
    onFocus?: () => void
    onBlur?: () => void
}

export const MonacoEditorWrapper = ({
    value,
    language,
    onChange,
    readOnly,
    disabled,
    placeholder,
    showLineNumbers,
    minHeight,
    maxHeight,
    tokens,
    onFocus,
    onBlur,
}: MonacoEditorWrapperProps) => {
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
    const [isEditorReady, setIsEditorReady] = useState(false)

    const codePaddingLeft =
        typeof tokens.body.code.padding.x.left === 'number'
            ? tokens.body.code.padding.x.left
            : parseInt(String(tokens.body.code.padding.x.left))

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.updateOptions({
                lineNumbers: showLineNumbers ? 'on' : 'off',
                readOnly: readOnly || disabled,
            })
        }
    }, [showLineNumbers, readOnly, disabled])

    const toMonacoColor = (color: string | undefined): string => {
        if (!color) {
            return (tokens.body.syntax.text || '#24292F').replace('#', '')
        }
        return color.replace('#', '')
    }

    const createEditorTheme = (): Monaco.editor.IStandaloneThemeData => ({
        base: 'vs',
        inherit: true,
        rules: [
            {
                token: 'keyword',
                foreground: toMonacoColor(tokens.body.syntax.keyword),
                fontStyle: 'bold',
            },
            {
                token: 'keyword.control',
                foreground: toMonacoColor(tokens.body.syntax.keyword),
                fontStyle: 'bold',
            },
            {
                token: 'keyword.operator',
                foreground: toMonacoColor(tokens.body.syntax.operator),
            },
            // Functions
            {
                token: 'function',
                foreground: toMonacoColor(tokens.body.syntax.function),
            },
            {
                token: 'function.call',
                foreground: toMonacoColor(tokens.body.syntax.function),
            },
            // Identifiers
            {
                token: 'identifier',
                foreground: toMonacoColor(tokens.body.syntax.text),
            },
            // Strings
            {
                token: 'string',
                foreground: toMonacoColor(tokens.body.syntax.string),
            },
            {
                token: 'string.quoted',
                foreground: toMonacoColor(tokens.body.syntax.string),
            },
            {
                token: 'string.escape',
                foreground: toMonacoColor(tokens.body.syntax.keyword),
                fontStyle: 'bold',
            },
            // Numbers
            {
                token: 'number',
                foreground: toMonacoColor(tokens.body.syntax.number),
            },
            {
                token: 'number.hex',
                foreground: toMonacoColor(tokens.body.syntax.number),
            },
            {
                token: 'number.binary',
                foreground: toMonacoColor(tokens.body.syntax.number),
            },
            {
                token: 'number.octal',
                foreground: toMonacoColor(tokens.body.syntax.number),
            },
            {
                token: 'number.float',
                foreground: toMonacoColor(tokens.body.syntax.number),
            },
            // Delimiters
            {
                token: 'delimiter',
                foreground: toMonacoColor(tokens.body.syntax.operator),
            },
            {
                token: 'delimiter.bracket',
                foreground: toMonacoColor(tokens.body.syntax.operator),
            },
            {
                token: 'delimiter.parenthesis',
                foreground: toMonacoColor(tokens.body.syntax.operator),
            },
            {
                token: 'delimiter.square',
                foreground: toMonacoColor(tokens.body.syntax.operator),
            },
            {
                token: 'delimiter.curly',
                foreground: toMonacoColor(tokens.body.syntax.operator),
            },
            // Operators
            {
                token: 'operator',
                foreground: toMonacoColor(tokens.body.syntax.operator),
            },
            // Comments
            {
                token: 'comment',
                foreground: toMonacoColor(tokens.body.syntax.comment),
                fontStyle: 'italic',
            },
            {
                token: 'comment.line',
                foreground: toMonacoColor(tokens.body.syntax.comment),
                fontStyle: 'italic',
            },
            {
                token: 'comment.block',
                foreground: toMonacoColor(tokens.body.syntax.comment),
                fontStyle: 'italic',
            },
            {
                token: 'comment.doc',
                foreground: toMonacoColor(tokens.body.syntax.comment),
                fontStyle: 'italic',
            },
            // Variables
            {
                token: 'variable',
                foreground: toMonacoColor(tokens.body.syntax.variable),
            },
            {
                token: 'variable.name',
                foreground: toMonacoColor(tokens.body.syntax.variable),
            },
            {
                token: 'variable.parameter',
                foreground: toMonacoColor(tokens.body.syntax.variable),
            },
            // Types
            {
                token: 'type',
                foreground: toMonacoColor(tokens.body.syntax.keyword),
            },
            {
                token: 'type.identifier',
                foreground: toMonacoColor(tokens.body.syntax.keyword),
            },
            // Constants
            {
                token: 'constant',
                foreground: toMonacoColor(tokens.body.syntax.number),
            },
            {
                token: 'constant.language',
                foreground: toMonacoColor(tokens.body.syntax.keyword),
                fontStyle: 'bold',
            },
            // HTML/JSX Tags
            {
                token: 'tag',
                foreground: toMonacoColor(tokens.body.syntax.keyword),
            },
            {
                token: 'tag.id',
                foreground: toMonacoColor(tokens.body.syntax.function),
            },
            {
                token: 'tag.class',
                foreground: toMonacoColor(tokens.body.syntax.function),
            },
            // Attributes
            {
                token: 'attribute.name',
                foreground: toMonacoColor(tokens.body.syntax.variable),
            },
            {
                token: 'attribute.value',
                foreground: toMonacoColor(tokens.body.syntax.string),
            },
            // RegExp
            {
                token: 'regexp',
                foreground: toMonacoColor(tokens.body.syntax.string),
                fontStyle: 'bold',
            },
            { token: '', foreground: toMonacoColor(tokens.body.syntax.text) },
        ],
        colors: {
            'editor.background': tokens.body.backgroundColor || '#FAFAFA',
            'editor.foreground': tokens.body.syntax.text || '#24292F',
            'editor.lineHighlightBackground':
                tokens.body.highlightedLine.backgroundColor.unchanged ||
                'transparent',
            'editor.lineHighlightBorder': 'transparent',
            'editorLineNumber.foreground':
                tokens.body.gutter.color || '#57606A',
            'editorLineNumber.activeForeground':
                tokens.body.syntax.text || '#24292F',
            'editor.selectionBackground': `${tokens.body.syntax.keyword || '#0969DA'}20`,
            'editor.inactiveSelectionBackground': `${tokens.body.syntax.keyword || '#0969DA'}10`,
            'editorCursor.foreground': tokens.body.syntax.text || '#24292F',
            'editorWhitespace.foreground': 'transparent',
            'editorIndentGuide.background': 'transparent',
            'editorIndentGuide.activeBackground': 'transparent',
            'scrollbarSlider.background': `${tokens.body.gutter.color || '#6E7681'}40`,
            'scrollbarSlider.hoverBackground': `${tokens.body.gutter.color || '#6E7681'}55`,
            'scrollbarSlider.activeBackground': `${tokens.body.gutter.color || '#6E7681'}70`,
            'scrollbar.shadow': `${tokens.body.gutter.color || '#6E7681'}10`,
        },
    })
    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor
        setIsEditorReady(true)

        const fontSize =
            typeof tokens.body.code.fontSize === 'number'
                ? tokens.body.code.fontSize
                : parseInt(String(tokens.body.code.fontSize))

        const lineHeight =
            typeof tokens.body.code.lineHeight === 'number'
                ? tokens.body.code.lineHeight * fontSize
                : parseFloat(String(tokens.body.code.lineHeight)) * fontSize

        const paddingTop =
            typeof tokens.body.padding.y === 'number'
                ? tokens.body.padding.y
                : parseInt(String(tokens.body.padding.y))

        const paddingBottom = paddingTop

        const lineDecorationsWidth =
            typeof tokens.body.code.padding.x.left === 'number'
                ? Math.floor(tokens.body.code.padding.x.left / 2)
                : Math.floor(
                      parseInt(String(tokens.body.code.padding.x.left)) / 2
                  )

        const gutterWidth =
            typeof tokens.body.gutter.width === 'number'
                ? tokens.body.gutter.width
                : parseInt(String(tokens.body.gutter.width))

        const lineNumbersMinChars = Math.max(2, Math.floor(gutterWidth / 10))

        const scrollbarSize = Math.max(8, Math.floor(fontSize * 0.8))

        editor.updateOptions({
            lineNumbers: showLineNumbers ? 'on' : 'off',
            readOnly: readOnly || disabled,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize,
            fontFamily: tokens.body.code.fontFamily,
            lineHeight,
            fontLigatures: true,
            padding: { top: paddingTop, bottom: paddingBottom },
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: showLineNumbers ? lineDecorationsWidth : 0,
            lineNumbersMinChars,
            renderLineHighlight: 'gutter',
            renderLineHighlightOnlyWhenFocus: true,
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                verticalScrollbarSize: scrollbarSize,
                horizontalScrollbarSize: scrollbarSize,
                useShadows: true,
            },
            wordWrap: 'on',
            wrappingIndent: 'indent',
            automaticLayout: true,
            renderWhitespace: 'none',
            renderControlCharacters: false,
            guides: {
                indentation: false,
                highlightActiveIndentation: false,
            },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            bracketPairColorization: { enabled: true },
        })

        editor.onDidFocusEditorText(() => {
            onFocus?.()
        })

        editor.onDidBlurEditorText(() => {
            onBlur?.()
        })

        if (!disabled && !readOnly) {
            const focusDelay = 100
            setTimeout(() => {
                editor.focus()
            }, focusDelay)
        }
    }

    const handleChange = (newValue: string | undefined) => {
        if (onChange && newValue !== undefined) {
            onChange(newValue)
        }
    }

    return (
        <Block
            position="relative"
            width="100%"
            backgroundColor={tokens.body.backgroundColor}
            style={{
                minHeight:
                    typeof minHeight === 'number'
                        ? `${minHeight}px`
                        : minHeight,
                maxHeight:
                    typeof maxHeight === 'number'
                        ? `${maxHeight}px`
                        : maxHeight,
                height: maxHeight
                    ? undefined
                    : typeof minHeight === 'number'
                      ? `${minHeight}px`
                      : minHeight,
            }}
        >
            {showLineNumbers && (
                <style>
                    {`
                        .monaco-editor .margin {
                            padding-right: ${codePaddingLeft}px !important;
                        }
                        .monaco-editor .monaco-editor-background {
                            padding-left: 0 !important;
                        }
                    `}
                </style>
            )}

            <Editor
                value={value}
                language={language}
                onChange={handleChange}
                onMount={handleEditorDidMount}
                theme="blend-code-theme"
                beforeMount={(monaco) => {
                    try {
                        monaco.editor.defineTheme(
                            'blend-code-theme',
                            createEditorTheme()
                        )
                    } catch (e) {
                        console.warn('Failed to define Monaco theme:', e)
                    }
                }}
                options={{
                    automaticLayout: true,
                    wordWrap: 'on',
                    wrappingIndent: 'indent',
                    readOnly: readOnly || disabled,
                    domReadOnly: disabled,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize:
                        typeof tokens.body.code.fontSize === 'number'
                            ? tokens.body.code.fontSize
                            : parseInt(String(tokens.body.code.fontSize)),
                    fontFamily: tokens.body.code.fontFamily,
                    lineHeight:
                        typeof tokens.body.code.lineHeight === 'number'
                            ? tokens.body.code.lineHeight *
                              (typeof tokens.body.code.fontSize === 'number'
                                  ? tokens.body.code.fontSize
                                  : parseInt(String(tokens.body.code.fontSize)))
                            : parseFloat(String(tokens.body.code.lineHeight)) *
                              (typeof tokens.body.code.fontSize === 'number'
                                  ? tokens.body.code.fontSize
                                  : parseInt(
                                        String(tokens.body.code.fontSize)
                                    )),
                    lineNumbers: showLineNumbers ? 'on' : 'off',
                    renderLineHighlight: 'none',
                    renderWhitespace: 'none',
                    guides: { indentation: false },
                }}
                loading={
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        style={{
                            minHeight:
                                typeof minHeight === 'number'
                                    ? `${minHeight}px`
                                    : minHeight,
                        }}
                        color={tokens.body.syntax.comment}
                        fontSize={tokens.body.code.fontSize}
                    >
                        Loading editor...
                    </Block>
                }
            />

            {!value && placeholder && isEditorReady && (
                <Block
                    position="absolute"
                    top={
                        typeof tokens.body.padding.y === 'number'
                            ? `${tokens.body.padding.y * 2}px`
                            : `${parseInt(String(tokens.body.padding.y)) * 2}px`
                    }
                    left={
                        showLineNumbers
                            ? typeof tokens.body.gutter.width === 'number'
                                ? `${tokens.body.gutter.width + codePaddingLeft}px`
                                : `${parseInt(String(tokens.body.gutter.width)) + codePaddingLeft}px`
                            : typeof tokens.body.code.padding.x.left ===
                                'number'
                              ? `${tokens.body.code.padding.x.left}px`
                              : String(tokens.body.code.padding.x.left)
                    }
                    color={tokens.body.syntax.comment}
                    style={{
                        pointerEvents: 'none',
                        fontSize: tokens.body.code.fontSize,
                        fontFamily: tokens.body.code.fontFamily,
                        opacity: 0.6,
                    }}
                >
                    {placeholder}
                </Block>
            )}
        </Block>
    )
}
