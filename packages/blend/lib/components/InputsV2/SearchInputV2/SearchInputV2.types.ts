/**
 * Platform-neutral core of the SearchInputV2 API — `@juspay/blend-native`
 * derives its SearchInput props from this; ReactNode slots and DOM event
 * handlers stay web-only.
 */
export type SearchInputBaseProps = {
    error?: boolean
    value?: string
    allowClear?: boolean
    onClear?: () => void
    disabled?: boolean
}

export type SearchInputV2Props = SearchInputBaseProps & {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    clearIcon?: React.ReactNode
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'size' | 'style' | 'className' | 'placeholderStyles' | 'required'
    >
