export type SearchInputV2Props = {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    error?: boolean
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    allowClear?: boolean
    onClear?: () => void
    clearIcon?: React.ReactNode
    disabled?: boolean
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'placeholderStyles' | 'required'
>
