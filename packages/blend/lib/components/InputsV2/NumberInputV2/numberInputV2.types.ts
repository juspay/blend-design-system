import { InputSizeV2 } from '../inputV2.types'

export type NumberInputV2Props = {
    value: number | null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    step?: number
    error?: boolean
    errorMessage?: string
    size?: InputSizeV2
    label?: string
    sublabel?: string
    helpIconHintText?: string
    hintText?: string
    preventNegative?: boolean
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'value' | 'onBlur' | 'onFocus'
>
