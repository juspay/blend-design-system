import { InputSizeV2 } from '../inputV2.types'

export type TextAreaV2Props = {
    size?: InputSizeV2
    value: string
    placeholder: string
    disabled?: boolean
    autoFocus?: boolean
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    rows?: number
    cols?: number
    label?: string
    sublabel?: string
    hintText?: string
    helpIconHintText?: string
    helpIconText?: string
    required?: boolean
    error?: {
        show: boolean
        message?: string
    }
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline'
} & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'style' | 'className' | 'onFocus' | 'onBlur'
>
