import type { ReactNode } from 'react'
import type { SupportedLanguage } from '../CodeBlock/types'

export enum CodeEditorVariant {
    DEFAULT = 'default',
    NO_GUTTER = 'no-gutter',
}

export type CodeEditorProps = {
    value: string
    onChange?: (value: string) => void
    variant?: CodeEditorVariant
    showLineNumbers?: boolean
    showHeader?: boolean
    header?: string
    /**
     * Custom content to display on the left side of the header, before the header text.
     * If provided, replaces the default FileCode icon.
     */
    headerLeftSlot?: ReactNode
    /**
     * Custom content to display on the right side of the header, after the header text.
     * Uses the same gap as the left icon.
     */
    headerRightSlot?: ReactNode
    /**
     * When false, hides the default left FileCode icon.
     * Has no effect if headerLeftSlot is provided.
     * Defaults to true.
     */
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
    /**
     * When true, automatically focuses the editor when it mounts.
     * When false or undefined, the editor will not auto-focus.
     * Defaults to false.
     */
    autoFocus?: boolean
}
