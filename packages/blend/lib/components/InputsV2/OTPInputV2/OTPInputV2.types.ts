/**
 * Platform-neutral core of the OTPInputV2 API — `@juspay/blend-native`
 * derives its OTPInput props from this. `onChange` already takes the plain
 * joined string, so it lives in the base.
 */
export type OTPInputBaseProps = {
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: boolean
    errorMessage?: string
    hintText?: string
    value?: string
    length?: number
    autoFocus?: boolean
    onChange?: (value: string) => void
}

export type OTPInputV2Props = OTPInputBaseProps & {
    form?: string
} & Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'size' | 'style' | 'className' | 'onChange' | 'placeholder'
    >
