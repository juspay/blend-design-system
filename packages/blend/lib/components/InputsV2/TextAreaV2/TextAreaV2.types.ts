import { InputSizeV2 } from '../inputV2.types'

/**
 * Platform-neutral core of the TextAreaV2 API — `@juspay/blend-native`
 * derives its TextArea props from this; the DOM event handlers and the
 * textarea attribute spread stay web-only.
 */
export type TextAreaBaseProps = {
    size?: InputSizeV2
    value: string
    placeholder: string
    disabled?: boolean
    autoFocus?: boolean
    rows?: number
    label?: string
    sublabel?: string
    hintText?: string
    helpIconText?: string
    required?: boolean
    error?: {
        show: boolean
        message?: string
    }
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline'
}

export type TextAreaV2Props = TextAreaBaseProps & {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
} & Omit<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        'size' | 'style' | 'className' | 'onFocus' | 'onBlur' | 'cols'
    >
