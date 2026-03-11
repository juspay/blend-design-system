import { ReactNode } from 'react'
import { SupportedLanguage, CodeV2Variant } from '../types'
export type CodeEditorV2Props = {
    value: string
    onChange?: (value: string) => void
    variant?: CodeV2Variant
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
}
