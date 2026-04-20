import { ReactNode } from 'react'
import { CodeEditorV2Tokens } from './codeEditorV2.tokens'
import type { CSSObject } from 'styled-components'
export enum CodeEditorV2Variant {
    DEFAULT = 'default',
    NO_GUTTER = 'no-gutter',
    DIFF = 'diff',
}

export enum MonacoTheme {
    LIGHT = 'light',
    DARK = 'dark',
}
export enum DiffLineType {
    ADDED = 'added',
    REMOVED = 'removed',
    UNCHANGED = 'unchanged',
}

export type DiffLine = {
    content: string
    type: DiffLineType
}

export type SupportedLanguage =
    | 'javascript'
    | 'typescript'
    | 'jsx'
    | 'tsx'
    | 'json'
    | 'css'
    | 'html'
    | 'markdown'
    | 'yaml'
    | 'python'
    | 'rust'
    | 'haskell'

export type CodeEditorV2Dimensions = {
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
    height?: CSSObject['height']
    maxHeight?: CSSObject['maxHeight']
    minHeight?: CSSObject['minHeight']
}
export type CodeEditorV2Props = {
    value: string
    onChange?: (value: string) => void
    /** Use `DIFF` to enable Monaco’s diff editor (same as `diff={true}`; either is enough). */
    variant?: CodeEditorV2Variant
    showLineNumbers?: boolean
    header?: {
        showHeader?: boolean
        title?: string
        leftSlot?: ReactNode
        rightSlot?: ReactNode
        showCopyButton?: boolean
    }
    language?: SupportedLanguage
    placeholder?: string
    readOnly?: boolean
    disabled?: boolean
    onBlur?: () => void
    onFocus?: () => void
    autoFocus?: boolean
    /**
     * When true, renders Monaco’s diff view. Same as `variant={CodeEditorV2Variant.DIFF}`—use
     * either (or both); diff mode is on if either is set.
     */
    diff?: boolean
    /** The original (left-side) source for diff mode. */
    originalValue?: string
    /** Render diffs inline (single column) instead of side-by-side. */
    renderSideBySide?: boolean
    /**
     * When true (default), Monaco hides unchanged regions in diff mode with a
     * GitHub-like expand control.
     */
    isDiffUnchangedCollapsed?: boolean
    /** Context lines shown around edits when unchanged regions are hidden. Defaults to 3. */
    diffContextLines?: number
    /** Lines revealed per expand action when unchanged regions are hidden. Defaults to 20. */
    diffExpandChunk?: number
} & CodeEditorV2Dimensions &
    Omit<
        React.HTMLAttributes<HTMLDivElement>,
        'style' | 'className' | 'onChange' | 'children'
    >
export type CodeEditorV2HeaderProps = {
    title?: string
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    showCopyButton: boolean
    isCopied: boolean
    onCopy: () => void
    tokens: CodeEditorV2Tokens
}
export type MonacoEditorWrapperDimensions = {
    minHeight: CSSObject['minHeight']
    maxHeight?: CSSObject['maxHeight']
    height?: CSSObject['height']
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
}
export type MonacoEditorWrapperProps = {
    value: string
    language: string
    onChange?: (value: string) => void
    readOnly: boolean
    disabled: boolean
    placeholder?: string
    showLineNumbers: boolean
    tokens: CodeEditorV2Tokens
    onFocus?: () => void
    onBlur?: () => void
    /** When true, focuses the editor on mount. Defaults to false. */
    autoFocus?: boolean
    /** When true, renders a side-by-side diff view instead of a single editor. */
    diff?: boolean
    /** The original (left-side) source for diff mode. */
    originalValue?: string
    /** Render diffs inline (single column) instead of side-by-side. */
    renderSideBySide?: boolean
    /** Hide unchanged regions in diff mode (GitHub-style). */
    isDiffUnchangedCollapsed?: boolean
    /** Context lines shown around edits when unchanged regions are hidden. */
    diffContextLines?: number
    /** Lines revealed per expand action when unchanged regions are hidden. */
    diffExpandChunk?: number
} & MonacoEditorWrapperDimensions
