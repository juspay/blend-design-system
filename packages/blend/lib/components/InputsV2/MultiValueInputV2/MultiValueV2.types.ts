import { InputSizeV2 } from '../inputV2.types'

export type MultiValueInputV2Props = {
    value?: string
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: boolean
    errorMessage?: string
    hintText?: string
    disabled?: boolean
    tags?: string[]
    onTagAdd?: (tag: string) => void
    onTagRemove?: (tag: string) => void
    onChange?: (value: string) => void
    size?: InputSizeV2
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onChange' | 'value' | 'onFocus' | 'onBlur'
>
