export enum NumberInputSize {
    MEDIUM = 'md',
    LARGE = 'lg',
}

export type NumberInputProps = {
    value: number | null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    step?: number
    error?: boolean
    errorMessage?: string
    size?: NumberInputSize
    label?: string
    sublabel?: string
    helpIconHintText?: string
    hintText?: string
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'value' | 'onBlur' | 'onFocus'
>
