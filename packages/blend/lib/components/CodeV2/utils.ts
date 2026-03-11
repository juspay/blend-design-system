import { CodeV2Variant } from './types'
import type * as Monaco from 'monaco-editor'
import type { CodeV2Tokens } from './tokens'
export const createCopyToClipboard = (
    code: string,
    setIsCopied: (copied: boolean) => void
) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return () => {
        navigator.clipboard.writeText(code)
        setIsCopied(true)

        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            setIsCopied(false)
            timeoutId = null
        }, 2000)
    }
}

export const shouldShowLineNumbers = (
    showLineNumbers: boolean | undefined,
    variant: CodeV2Variant
): boolean => {
    if (showLineNumbers !== undefined) {
        return showLineNumbers
    }
    return variant === CodeV2Variant.DEFAULT
}

/**
 * Calculates container styles with min/max height
 */
export const getContainerStyles = (
    minHeight?: string | number,
    maxHeight?: string | number
): React.CSSProperties => {
    return {
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const EDITOR_FOCUS_DELAY_MS = 100
export const MIN_SCROLLBAR_SIZE = 8
const SCROLLBAR_SIZE_RATIO = 0.8
const PLACEHOLDER_VERTICAL_OFFSET_MULTIPLIER = 2

export const BLEND_EDITOR_THEME_NAME = 'blend-code-theme'

// ---------------------------------------------------------------------------
// Value coercion
// ---------------------------------------------------------------------------

export const toCssValue = (value?: string | number): string | undefined => {
    if (value === undefined || value === null) return undefined
    return typeof value === 'number' ? `${value}px` : value
}

export const toNumericValue = (
    value: string | number | undefined,
    fallback = 0
): number => {
    if (typeof value === 'number') return value
    if (value === undefined || value === null) return fallback
    const parsed = parseFloat(String(value))
    return Number.isFinite(parsed) ? parsed : fallback
}

// ---------------------------------------------------------------------------
// Editor metrics (derived from tokens)
// ---------------------------------------------------------------------------

export type EditorMetrics = {
    fontSize: number
    lineHeight: number
    verticalPadding: number
    codePaddingLeft: number
    gutterWidth: number
    lineDecorationsWidth: number
    lineNumbersMinChars: number
    scrollbarSize: number
}

export function getEditorMetrics(
    tokens: CodeV2Tokens,
    showLineNumbers: boolean
): EditorMetrics {
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

    return {
        fontSize,
        lineHeight,
        verticalPadding,
        codePaddingLeft,
        gutterWidth,
        lineDecorationsWidth: showLineNumbers
            ? Math.floor(codePaddingLeft / 2)
            : 0,
        lineNumbersMinChars: Math.max(2, Math.floor(gutterWidth / 10)),
        scrollbarSize: Math.max(
            MIN_SCROLLBAR_SIZE,
            Math.floor(fontSize * SCROLLBAR_SIZE_RATIO)
        ),
    }
}

export function getContainerDimensions(
    height: string | number | undefined,
    minHeight: string | number,
    maxHeight?: string | number
): { minHeight?: string; maxHeight?: string; height?: string } {
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

export function getPlaceholderPosition(
    metrics: EditorMetrics,
    showLineNumbers: boolean
): { top: string; left: string } {
    const top = `${metrics.verticalPadding * PLACEHOLDER_VERTICAL_OFFSET_MULTIPLIER}px`
    const leftOffset = showLineNumbers
        ? metrics.gutterWidth + metrics.codePaddingLeft
        : metrics.codePaddingLeft
    return { top, left: `${leftOffset}px` }
}

// ---------------------------------------------------------------------------
// Monaco language defaults
// ---------------------------------------------------------------------------

export function configureLanguageDefaults(
    monaco: typeof import('monaco-editor')
): void {
    const ts = monaco.languages?.typescript
    if (!ts) return

    const commonOptions = {
        allowNonTsExtensions: true,
        jsx: ts.JsxEmit.Preserve,
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
    }

    ts.javascriptDefaults.setCompilerOptions({
        ...commonOptions,
        allowJs: true,
        checkJs: false,
    })
    ts.typescriptDefaults.setCompilerOptions(commonOptions)
}

// ---------------------------------------------------------------------------
// Editor options (shared between mount and update)
// ---------------------------------------------------------------------------

function getScrollbarOptions(
    metrics: EditorMetrics
): Monaco.editor.IEditorScrollbarOptions {
    return {
        vertical: 'auto',
        horizontal: 'auto',
        verticalScrollbarSize: metrics.scrollbarSize,
        horizontalScrollbarSize: metrics.scrollbarSize,
        useShadows: true,
    }
}

function getPaddingOptions(metrics: EditorMetrics) {
    return {
        top: metrics.verticalPadding,
        bottom: metrics.verticalPadding,
    }
}

/** Options applied on editor mount (full set) */
export function getMountEditorOptions(
    metrics: EditorMetrics,
    tokens: CodeV2Tokens,
    showLineNumbers: boolean,
    readOnly: boolean,
    disabled: boolean
): Monaco.editor.IStandaloneEditorConstructionOptions {
    return {
        lineNumbers: showLineNumbers ? 'on' : 'off',
        readOnly: readOnly || disabled,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: metrics.fontSize,
        fontFamily: tokens.body.code.fontFamily,
        lineHeight: metrics.lineHeight,
        fontLigatures: true,
        padding: getPaddingOptions(metrics),
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: metrics.lineDecorationsWidth,
        lineNumbersMinChars: metrics.lineNumbersMinChars,
        renderLineHighlight: 'gutter',
        renderLineHighlightOnlyWhenFocus: true,
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: getScrollbarOptions(metrics),
        wordWrap: 'on',
        wrappingIndent: 'indent',
        automaticLayout: true,
        renderWhitespace: 'none',
        renderControlCharacters: false,
        guides: { indentation: false, highlightActiveIndentation: false },
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        bracketPairColorization: { enabled: true },
    }
}

/** Options applied when props change (subset) */
export function getUpdateEditorOptions(
    metrics: EditorMetrics,
    showLineNumbers: boolean,
    readOnly: boolean,
    disabled: boolean
): Monaco.editor.IEditorOptions {
    return {
        lineNumbers: showLineNumbers ? 'on' : 'off',
        readOnly: readOnly || disabled,
        lineDecorationsWidth: metrics.lineDecorationsWidth,
        lineNumbersMinChars: metrics.lineNumbersMinChars,
        fontSize: metrics.fontSize,
        lineHeight: metrics.lineHeight,
        padding: getPaddingOptions(metrics),
        scrollbar: getScrollbarOptions(metrics),
    }
}

// ---------------------------------------------------------------------------
// Initial Editor component options (before mount)
// ---------------------------------------------------------------------------

export function getInitialEditorOptions(
    metrics: EditorMetrics,
    tokens: CodeV2Tokens,
    showLineNumbers: boolean,
    readOnly: boolean,
    disabled: boolean
): Monaco.editor.IStandaloneEditorConstructionOptions {
    return {
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
        scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            alwaysConsumeMouseWheel: false,
        },
    }
}

// ---------------------------------------------------------------------------
// Inline margin styles for Monaco (CSS string)
// ---------------------------------------------------------------------------

export function getEditorMarginStyles(
    showLineNumbers: boolean,
    codePaddingLeft: number
): string {
    const paddingLeft = `${codePaddingLeft}px`
    return showLineNumbers
        ? `
            .monaco-editor .margin { padding-right: ${paddingLeft} !important; }
            .monaco-editor .monaco-editor-background { padding-left: 0 !important; }
        `
        : `
            .monaco-editor .monaco-editor-background { padding-left: ${paddingLeft} !important; }
        `
}

// ---------------------------------------------------------------------------
// Keyboard shortcuts config (for wrapper to register with Monaco)
// ---------------------------------------------------------------------------

export type ShortcutConfig = {
    id: string
    label: string
    keybindings: number[]
    actionId: string
    requiresWriteAccess: boolean
}

export function buildShortcutKeybindings(
    monaco: typeof import('monaco-editor')
): ShortcutConfig[] {
    return [
        {
            id: 'blend-editor-select-all',
            label: 'Select All',
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA,
                monaco.KeyMod.WinCtrl | monaco.KeyCode.KeyA,
            ],
            actionId: 'editor.action.selectAll',
            requiresWriteAccess: false,
        },
    ]
}
