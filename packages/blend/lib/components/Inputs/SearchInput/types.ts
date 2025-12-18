export type SearchInputProps = {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    error?: boolean
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    allowClear?: boolean
    onClear?: () => void
    clearIcon?: React.ReactNode
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className'
>
