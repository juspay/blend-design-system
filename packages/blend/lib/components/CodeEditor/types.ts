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
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    showCopyButton?: boolean
    language?: SupportedLanguage
    placeholder?: string
    readOnly?: boolean
    disabled?: boolean
    minHeight?: string | number
    maxHeight?: string | number
    className?: string
    onBlur?: () => void
    onFocus?: () => void
}
