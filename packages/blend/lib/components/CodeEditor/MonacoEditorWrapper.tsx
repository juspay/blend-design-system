import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import type * as Monaco from 'monaco-editor'
import Block from '../Primitives/Block/Block'
import type { CodeBlockTokenType } from '../CodeBlock/codeBlock.token'

const LANGUAGE_MAP: Record<string, string> = {
    jsx: 'javascriptreact',
    tsx: 'typescriptreact',
}

const mapLanguage = (value: string) => LANGUAGE_MAP[value] ?? value

const EDITOR_FOCUS_DELAY_MS = 100
const MIN_SCROLLBAR_SIZE = 8
const SCROLLBAR_SIZE_RATIO = 0.8
const PLACEHOLDER_VERTICAL_OFFSET_MULTIPLIER = 2

const toCssValue = (value?: string | number): string | undefined => {
    if (value === undefined || value === null) {
        return undefined
    }
    return typeof value === 'number' ? `${value}px` : value
}

const toNumericValue = (
    value: string | number | undefined,
    fallback = 0
): number => {
    if (typeof value === 'number') {
        return value
    }

    if (value === undefined || value === null) {
        return fallback
    }

    const parsed = parseFloat(String(value))
    return Number.isFinite(parsed) ? parsed : fallback
}

const toMonacoColor = (color: string | undefined, fallback = '#24292F') =>
    (color ?? fallback).replace('#', '')

const createEditorTheme = (
    tokens: CodeBlockTokenType
): Monaco.editor.IStandaloneThemeData => {
    const syntax = tokens.body.syntax
    const gutter = tokens.body.gutter
    const highlight = tokens.body.highlightedLine.backgroundColor

    return {
        base: 'vs',
        inherit: true,
        rules: [
            {
                token: 'keyword',
                foreground: toMonacoColor(syntax.keyword),
                fontStyle: 'bold',
            },
            {
                token: 'keyword.control',
                foreground: toMonacoColor(syntax.keyword),
                fontStyle: 'bold',
            },
            {
                token: 'keyword.operator',
                foreground: toMonacoColor(syntax.operator),
            },
            { token: 'function', foreground: toMonacoColor(syntax.function) },
            {
                token: 'function.call',
                foreground: toMonacoColor(syntax.function),
            },
            { token: 'identifier', foreground: toMonacoColor(syntax.text) },
            { token: 'string', foreground: toMonacoColor(syntax.string) },
            {
                token: 'string.quoted',
                foreground: toMonacoColor(syntax.string),
            },
            {
                token: 'string.escape',
                foreground: toMonacoColor(syntax.keyword),
                fontStyle: 'bold',
            },
            { token: 'number', foreground: toMonacoColor(syntax.number) },
            { token: 'number.hex', foreground: toMonacoColor(syntax.number) },
            {
                token: 'number.binary',
                foreground: toMonacoColor(syntax.number),
            },
            { token: 'number.octal', foreground: toMonacoColor(syntax.number) },
            { token: 'number.float', foreground: toMonacoColor(syntax.number) },
            { token: 'delimiter', foreground: toMonacoColor(syntax.operator) },
            {
                token: 'delimiter.bracket',
                foreground: toMonacoColor(syntax.operator),
            },
            {
                token: 'delimiter.parenthesis',
                foreground: toMonacoColor(syntax.operator),
            },
            {
                token: 'delimiter.square',
                foreground: toMonacoColor(syntax.operator),
            },
            {
                token: 'delimiter.curly',
                foreground: toMonacoColor(syntax.operator),
            },
            { token: 'operator', foreground: toMonacoColor(syntax.operator) },
            {
                token: 'comment',
                foreground: toMonacoColor(syntax.comment),
                fontStyle: 'italic',
            },
            {
                token: 'comment.line',
                foreground: toMonacoColor(syntax.comment),
                fontStyle: 'italic',
            },
            {
                token: 'comment.block',
                foreground: toMonacoColor(syntax.comment),
                fontStyle: 'italic',
            },
            {
                token: 'comment.doc',
                foreground: toMonacoColor(syntax.comment),
                fontStyle: 'italic',
            },
            { token: 'variable', foreground: toMonacoColor(syntax.variable) },
            {
                token: 'variable.name',
                foreground: toMonacoColor(syntax.variable),
            },
            {
                token: 'variable.parameter',
                foreground: toMonacoColor(syntax.variable),
            },
            { token: 'type', foreground: toMonacoColor(syntax.keyword) },
            {
                token: 'type.identifier',
                foreground: toMonacoColor(syntax.keyword),
            },
            { token: 'constant', foreground: toMonacoColor(syntax.number) },
            {
                token: 'constant.language',
                foreground: toMonacoColor(syntax.keyword),
                fontStyle: 'bold',
            },
            { token: 'tag', foreground: toMonacoColor(syntax.keyword) },
            { token: 'tag.id', foreground: toMonacoColor(syntax.function) },
            { token: 'tag.class', foreground: toMonacoColor(syntax.function) },
            {
                token: 'attribute.name',
                foreground: toMonacoColor(syntax.variable),
            },
            {
                token: 'attribute.value',
                foreground: toMonacoColor(syntax.string),
            },
            {
                token: 'regexp',
                foreground: toMonacoColor(syntax.string),
                fontStyle: 'bold',
            },
            { token: '', foreground: toMonacoColor(syntax.text) },
        ],
        colors: {
            'editor.background': tokens.body.backgroundColor || '#FAFAFA',
            'editor.foreground': syntax.text || '#24292F',
            'editor.lineHighlightBackground':
                highlight.unchanged || 'transparent',
            'editor.lineHighlightBorder': 'transparent',
            'editorLineNumber.foreground': gutter.color || '#57606A',
            'editorLineNumber.activeForeground': syntax.text || '#24292F',
            'editor.selectionBackground': `${syntax.keyword || '#0969DA'}20`,
            'editor.inactiveSelectionBackground': `${syntax.keyword || '#0969DA'}10`,
            'editorCursor.foreground': syntax.text || '#24292F',
            'editorWhitespace.foreground': 'transparent',
            'editorIndentGuide.background': 'transparent',
            'editorIndentGuide.activeBackground': 'transparent',
            'scrollbarSlider.background': `${gutter.color || '#6E7681'}40`,
            'scrollbarSlider.hoverBackground': `${gutter.color || '#6E7681'}55`,
            'scrollbarSlider.activeBackground': `${gutter.color || '#6E7681'}70`,
            'scrollbar.shadow': `${gutter.color || '#6E7681'}10`,
        },
    }
}

const configureLanguageDefaults = (
    monacoInstance: typeof import('monaco-editor')
) => {
    const { languages } = monacoInstance
    const typescript = languages?.typescript

    if (!typescript) {
        return
    }

    typescript.javascriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        allowJs: true,
        checkJs: false,
        jsx: typescript.JsxEmit.Preserve,
        target: typescript.ScriptTarget.ES2020,
        module: typescript.ModuleKind.ESNext,
    })

    typescript.typescriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        jsx: typescript.JsxEmit.Preserve,
        target: typescript.ScriptTarget.ES2020,
        module: typescript.ModuleKind.ESNext,
    })
}

type EditorMetrics = {
    fontSize: number
    lineHeight: number
    verticalPadding: number
    codePaddingLeft: number
    gutterWidth: number
    lineDecorationsWidth: number
    lineNumbersMinChars: number
    scrollbarSize: number
}

const getEditorMetrics = (
    tokens: CodeBlockTokenType,
    showLineNumbers: boolean
): EditorMetrics => {
    const fontSize = toNumericValue(tokens.body.code.fontSize, 12)
    const lineHeightToken = tokens.body.code.lineHeight
    const lineHeightMultiplier =
        typeof lineHeightToken === 'number'
            ? lineHeightToken
            : parseFloat(String(lineHeightToken ?? 1.6))
    const lineHeight = lineHeightMultiplier * fontSize

    const verticalPadding = toNumericValue(tokens.body.padding.y, 16)
    const codePaddingLeft = toNumericValue(tokens.body.code.padding.x.left, 12)
    const gutterWidth = toNumericValue(tokens.body.gutter.width, 40)

    const lineDecorationsWidth = showLineNumbers
        ? Math.floor(codePaddingLeft / 2)
        : 0

    const lineNumbersMinChars = Math.max(2, Math.floor(gutterWidth / 10))
    const scrollbarSize = Math.max(
        MIN_SCROLLBAR_SIZE,
        Math.floor(fontSize * SCROLLBAR_SIZE_RATIO)
    )

    return {
        fontSize,
        lineHeight,
        verticalPadding,
        codePaddingLeft,
        gutterWidth,
        lineDecorationsWidth,
        lineNumbersMinChars,
        scrollbarSize,
    }
}

const getContainerDimensions = (
    height: string | number | undefined,
    minHeight: string | number,
    maxHeight?: string | number
) => {
    const resolvedHeight = toCssValue(height)
    const resolvedMinHeight = toCssValue(minHeight)
    const resolvedMaxHeight = toCssValue(maxHeight)

    return {
        minHeight: resolvedHeight ? undefined : resolvedMinHeight,
        maxHeight: resolvedHeight ? undefined : resolvedMaxHeight,
        height:
            resolvedHeight ??
            (resolvedMaxHeight ? undefined : resolvedMinHeight),
    }
}

const getPlaceholderPosition = (
    metrics: EditorMetrics,
    showLineNumbers: boolean
) => {
    const top = `${
        metrics.verticalPadding * PLACEHOLDER_VERTICAL_OFFSET_MULTIPLIER
    }px`
    const leftOffset = showLineNumbers
        ? metrics.gutterWidth + metrics.codePaddingLeft
        : metrics.codePaddingLeft

    return {
        top,
        left: `${leftOffset}px`,
    }
}

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
    height?: string | number
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
    height,
    tokens,
    onFocus,
    onBlur,
}: MonacoEditorWrapperProps) => {
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
    const monacoRef = useRef<typeof import('monaco-editor') | null>(null)
    const shortcutDisposables = useRef<Monaco.IDisposable[]>([])
    const [isEditorReady, setIsEditorReady] = useState(false)
    const monacoLanguage = useMemo(() => mapLanguage(language), [language])

    const editorTheme = useMemo(() => createEditorTheme(tokens), [tokens])

    const metrics = useMemo(
        () => getEditorMetrics(tokens, showLineNumbers),
        [tokens, showLineNumbers]
    )

    const containerStyle = useMemo(
        () => getContainerDimensions(height, minHeight, maxHeight),
        [height, minHeight, maxHeight]
    )

    const placeholderPosition = useMemo(
        () => getPlaceholderPosition(metrics, showLineNumbers),
        [metrics, showLineNumbers]
    )

    const disposeShortcuts = useCallback(() => {
        shortcutDisposables.current.forEach((disposable) =>
            disposable?.dispose?.()
        )
        shortcutDisposables.current = []
    }, [])

    const registerKeyboardShortcuts = useCallback(() => {
        const editor = editorRef.current
        const monacoInstance = monacoRef.current

        if (!editor || !monacoInstance) {
            return
        }

        disposeShortcuts()

        const shortcutConfigurations = [
            {
                id: 'blend-editor-select-all',
                label: 'Select All',
                keybindings: [
                    monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyA,
                    monacoInstance.KeyMod.WinCtrl | monacoInstance.KeyCode.KeyA,
                ],
                actionId: 'editor.action.selectAll',
                requiresWriteAccess: false,
            },
        ]

        const dispositions = shortcutConfigurations
            .filter(
                (shortcut) =>
                    !shortcut.requiresWriteAccess || (!readOnly && !disabled)
            )
            .map((shortcut) =>
                editor.addAction({
                    id: shortcut.id,
                    label: shortcut.label,
                    keybindings: shortcut.keybindings,
                    precondition: undefined,
                    keybindingContext: undefined,
                    run: () => {
                        editor.trigger('shortcut', shortcut.actionId, undefined)
                    },
                })
            )

        shortcutDisposables.current = dispositions
    }, [disposeShortcuts, disabled, readOnly])

    useEffect(() => {
        if (!editorRef.current) return

        editorRef.current.updateOptions({
            lineNumbers: showLineNumbers ? 'on' : 'off',
            readOnly: readOnly || disabled,
            lineDecorationsWidth: metrics.lineDecorationsWidth,
            lineNumbersMinChars: metrics.lineNumbersMinChars,
            fontSize: metrics.fontSize,
            lineHeight: metrics.lineHeight,
            padding: {
                top: metrics.verticalPadding,
                bottom: metrics.verticalPadding,
            },
            scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                verticalScrollbarSize: metrics.scrollbarSize,
                horizontalScrollbarSize: metrics.scrollbarSize,
                useShadows: true,
            },
        })
    }, [disabled, readOnly, showLineNumbers, metrics])

    useEffect(() => {
        if (!isEditorReady) {
            return
        }

        registerKeyboardShortcuts()

        return () => {
            disposeShortcuts()
        }
    }, [disposeShortcuts, isEditorReady, registerKeyboardShortcuts])

    const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
        editorRef.current = editor
        monacoRef.current = monacoInstance
        setIsEditorReady(true)

        editor.updateOptions({
            lineNumbers: showLineNumbers ? 'on' : 'off',
            readOnly: readOnly || disabled,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: metrics.fontSize,
            fontFamily: tokens.body.code.fontFamily,
            lineHeight: metrics.lineHeight,
            fontLigatures: true,
            padding: {
                top: metrics.verticalPadding,
                bottom: metrics.verticalPadding,
            },
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: metrics.lineDecorationsWidth,
            lineNumbersMinChars: metrics.lineNumbersMinChars,
            renderLineHighlight: 'gutter',
            renderLineHighlightOnlyWhenFocus: true,
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                verticalScrollbarSize: metrics.scrollbarSize,
                horizontalScrollbarSize: metrics.scrollbarSize,
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

        editor.onDidFocusEditorText(() => onFocus?.())
        editor.onDidBlurEditorText(() => onBlur?.())

        if (!disabled && !readOnly) {
            setTimeout(() => editor.focus(), EDITOR_FOCUS_DELAY_MS)
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
            style={containerStyle}
        >
            <style>
                {showLineNumbers
                    ? `
                        .monaco-editor .margin {
                            padding-right: ${metrics.codePaddingLeft}px !important;
                        }
                        .monaco-editor .monaco-editor-background {
                            padding-left: 0 !important;
                        }
                    `
                    : `
                        .monaco-editor .monaco-editor-background {
                            padding-left: ${metrics.codePaddingLeft}px !important;
                        }
                    `}
            </style>

            <Editor
                value={value}
                language={monacoLanguage}
                onChange={handleChange}
                onMount={handleEditorDidMount}
                theme="blend-code-theme"
                beforeMount={(monacoInstance) => {
                    monacoRef.current = monacoInstance
                    try {
                        configureLanguageDefaults(monacoInstance)
                        monacoInstance.editor.defineTheme(
                            'blend-code-theme',
                            editorTheme
                        )
                    } catch (error) {
                        console.warn(
                            'Failed to initialise Monaco theme:',
                            error
                        )
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
                    fontSize: metrics.fontSize,
                    fontFamily: tokens.body.code.fontFamily,
                    lineHeight: metrics.lineHeight,
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
                        style={{ minHeight: toCssValue(minHeight) }}
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
                    top={placeholderPosition.top}
                    left={placeholderPosition.left}
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
