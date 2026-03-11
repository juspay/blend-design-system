import { ReactNode } from 'react'
import { CodeV2Tokens } from './tokens'
export enum CodeV2Variant {
    DEFAULT = 'default',
    NO_GUTTER = 'no-gutter',
    DIFF = 'diff',
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

export type CodeV2Props = {
    code: string
    variant?: CodeV2Variant
    showLineNumbers?: boolean
    showHeader?: boolean
    header?: string
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    diffLines?: DiffLine[]
    showCopyButton?: boolean
    autoFormat?: boolean
    language?: SupportedLanguage
}
export type CodeV2HeaderProps = {
    header: string
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    showLeftIcon: boolean
    showCopyButton: boolean
    isCopied: boolean
    onCopy: () => void
    tokens: CodeV2Tokens
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
    tokens: CodeV2Tokens
    onFocus?: () => void
    onBlur?: () => void
    /** When true, focuses the editor on mount. Defaults to false. */
    autoFocus?: boolean
}
