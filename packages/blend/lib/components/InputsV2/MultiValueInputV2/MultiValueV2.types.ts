import { TagShape, TagSize, TagVariant } from '../../Tags/types'
import type { InputSizeV2 } from '../inputV2.types'

export type MultiValueInputV2Props = {
    value?: string
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: boolean
    errorMessage?: string
    hintText?: string
    disabled?: boolean
    tags?: {
        value: string[]
        size: TagSize
        shape: TagShape
        variant: TagVariant
    }
    onChange?: (value: string) => void
    onTagAdd?: (tag: string) => void
    onTagRemove?: (tag: string) => void
    size?: InputSizeV2
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onChange' | 'value' | 'onFocus' | 'onBlur'
>
