import { ReactNode } from 'react'
import { CodeEditorV2Tokens } from './codeEditorV2.tokens'
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

export interface DiffLine {
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
export type CodeEditorV2Props = {
    value: string
    onChange?: (value: string) => void
    variant?: CodeEditorV2Variant
    showLineNumbers?: boolean
    showHeader?: boolean
    header?: string
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    showLeftIcon?: boolean
    showCopyButton?: boolean
    language?: SupportedLanguage
    placeholder?: string
    readOnly?: boolean
    disabled?: boolean
    minHeight?: string | number
    maxHeight?: string | number
    height?: string | number
    className?: string
    onBlur?: () => void
    onFocus?: () => void
    autoFocus?: boolean
    /** When true, renders a side-by-side diff view instead of a single editor. */
    diff?: boolean
    /** The original (left-side) source for diff mode. */
    originalValue?: string
    /** Render diffs inline (single column) instead of side-by-side. */
    renderSideBySide?: boolean
}
export type CodeEditorV2HeaderProps = {
    header: string
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    showLeftIcon: boolean
    showCopyButton: boolean
    isCopied: boolean
    onCopy: () => void
    tokens: CodeEditorV2Tokens
}
export type MonacoEditorWrapperProps = {
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
}
