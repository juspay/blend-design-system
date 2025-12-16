export enum TextInputSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum TextInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type TextInputProps = {
    label?: string
    sublabel?: string
    hintText?: string
    helpIconHintText?: string
    error?: boolean
    errorMessage?: string
    size?: TextInputSize
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    cursor?: 'text' | 'pointer' | 'default' | 'not-allowed'
    passwordToggle?: boolean
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onBlur' | 'onFocus'
>
