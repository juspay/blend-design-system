import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { CodeEditorV2Variant } from './codeEditorV2.types'
import type * as Monaco from 'monaco-editor'
import type { CodeEditorV2Tokens } from './codeEditorV2.tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Delay before focusing the editor after mount (ms). */
export const EDITOR_FOCUS_DELAY_MS = 100

/** How long the “copied” state stays visible after copy (ms). */
export const COPY_FEEDBACK_RESET_MS = 2000

/** Minimum Monaco vertical/horizontal scrollbar thickness (px). */
export const MIN_SCROLLBAR_SIZE = 8

/** Scrollbar size as a fraction of editor font size. */
const SCROLLBAR_SIZE_RATIO = 0.8

/** Multiplier for placeholder `top` offset vs vertical padding. */
const PLACEHOLDER_VERTICAL_OFFSET_MULTIPLIER = 2

export const BLEND_EDITOR_THEME_NAME = 'light'

// --- Editor metrics fallbacks (when tokens omit values) ---

const DEFAULT_EDITOR_FONT_SIZE_PX = 12
const DEFAULT_LINE_HEIGHT_MULTIPLIER = 1.6
const DEFAULT_BODY_PADDING_TOP_PX = 16
const DEFAULT_CODE_PADDING_LEFT_PX = 12
const DEFAULT_GUTTER_WIDTH_PX = 40

/** `lineDecorationsWidth ≈ codePaddingLeft / this` when line numbers are on. */
const LINE_DECORATIONS_WIDTH_DIVISOR = 2

const LINE_DECORATIONS_WIDTH_OFF = 0

/** Minimum Monaco `lineNumbersMinChars`. */
const MIN_LINE_NUMBERS_MIN_CHARS = 2

/** Derive min char count from gutter width: `floor(gutterWidth / this)`. */
const LINE_NUMBERS_CHARS_FROM_GUTTER_DIVISOR = 10

/** Default for `toNumericValue` when value is missing. */
const DEFAULT_NUMERIC_COERCION_FALLBACK = 0

// ---------------------------------------------------------------------------
// Clipboard / behavior
// ---------------------------------------------------------------------------

/** Ref must be stable across renders (e.g. from `useRef`) so timeout ids persist. */
export type CopyFeedbackTimeoutRef = MutableRefObject<ReturnType<
    typeof setTimeout
> | null>

/**
 * Writes `code` to the clipboard, sets copied feedback to true, and schedules
 * resetting it after `resetMs`. Clears any previous reset timeout on the same ref.
 */
export const copyToClipboardWithTemporaryFeedback = (
    code: string,
    setIsCopied: Dispatch<SetStateAction<boolean>>,
    feedbackTimeoutRef: CopyFeedbackTimeoutRef,
    resetMs: number = COPY_FEEDBACK_RESET_MS
): void => {
    void navigator.clipboard.writeText(code)
    setIsCopied(true)

    if (feedbackTimeoutRef.current !== null) {
        clearTimeout(feedbackTimeoutRef.current)
    }
    feedbackTimeoutRef.current = setTimeout(() => {
        setIsCopied(false)
        feedbackTimeoutRef.current = null
    }, resetMs)
}

export const shouldShowLineNumbers = (
    showLineNumbers: boolean | undefined,
    variant: CodeEditorV2Variant
): boolean => {
    if (showLineNumbers !== undefined) {
        return showLineNumbers
    }
    return variant === CodeEditorV2Variant.DEFAULT
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
// Value coercion
// ---------------------------------------------------------------------------

export const toCssValue = (value?: string | number): string | undefined => {
    if (value === undefined || value === null) return undefined
    return typeof value === 'number' ? `${value}px` : value
}

export const toNumericValue = (
    value: string | number | undefined,
    fallback = DEFAULT_NUMERIC_COERCION_FALLBACK
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
    tokens: CodeEditorV2Tokens,
    showLineNumbers: boolean
): EditorMetrics {
    const fontSize = toNumericValue(
        tokens.body.code.fontSize,
        DEFAULT_EDITOR_FONT_SIZE_PX
    )
    const lineHeightToken = tokens.body.code.lineHeight
    const lineHeightMultiplier =
        typeof lineHeightToken === 'number'
            ? lineHeightToken
            : parseFloat(
                  String(lineHeightToken ?? DEFAULT_LINE_HEIGHT_MULTIPLIER)
              )
    const lineHeight = lineHeightMultiplier * fontSize

    const verticalPadding = toNumericValue(
        tokens.body.paddingTop,
        DEFAULT_BODY_PADDING_TOP_PX
    )
    const codePaddingLeft = toNumericValue(
        tokens.body.code.paddingLeft,
        DEFAULT_CODE_PADDING_LEFT_PX
    )
    const gutterWidth = toNumericValue(
        tokens.body.gutter.width,
        DEFAULT_GUTTER_WIDTH_PX
    )

    return {
        fontSize,
        lineHeight,
        verticalPadding,
        codePaddingLeft,
        gutterWidth,
        lineDecorationsWidth: showLineNumbers
            ? Math.floor(codePaddingLeft / LINE_DECORATIONS_WIDTH_DIVISOR)
            : LINE_DECORATIONS_WIDTH_OFF,
        lineNumbersMinChars: Math.max(
            MIN_LINE_NUMBERS_MIN_CHARS,
            Math.floor(gutterWidth / LINE_NUMBERS_CHARS_FROM_GUTTER_DIVISOR)
        ),
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
        alwaysConsumeMouseWheel: false,
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
    tokens: CodeEditorV2Tokens,
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

export function getDiffEditorOptions(
    metrics: EditorMetrics,
    tokens: CodeEditorV2Tokens,
    showLineNumbers: boolean,
    renderSideBySide: boolean,
    readOnly: boolean,
    disabled: boolean
): Monaco.editor.IDiffEditorConstructionOptions {
    const isViewOnly = readOnly || disabled
    return {
        automaticLayout: true,
        readOnly: isViewOnly,
        renderSideBySide,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: metrics.fontSize,
        fontFamily: tokens.body.code.fontFamily,
        lineHeight: metrics.lineHeight,
        lineNumbers: showLineNumbers ? 'on' : 'off',
        renderLineHighlight: 'none',
        renderWhitespace: 'none',
        glyphMargin: false,
        folding: false,
        scrollbar: getScrollbarOptions(metrics),
        padding: getPaddingOptions(metrics),
        overviewRulerBorder: false,
        guides: { indentation: false, highlightActiveIndentation: false },
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
    }
}

export function getInitialEditorOptions(
    metrics: EditorMetrics,
    tokens: CodeEditorV2Tokens,
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

export const backupColor = {
    body: {
        backgroundColor: '#FAFAFA',
        gutter: {
            color: '#57606A',
            backgroundColor: {
                added: '#dafbe1',
                removed: '#ffebe9',
                unchanged: 'transparent',
            },
            borderColor: {
                added: '#2da44e',
                removed: '#cf222e',
                unchanged: 'none',
            },
        },
        highlightedLine: {
            backgroundColor: '#dafbe1',
        },
    },
    header: {
        backgroundColor: '#FAFAFA',
    },
}
