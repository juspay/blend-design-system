import { TextInputSize } from '../TextInput/types'

export enum MultiValueInputSize {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export enum MultiValueInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type MultiValueInputProps = {
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
    size?: TextInputSize
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onChange' | 'value' | 'onFocus' | 'onBlur'
>
