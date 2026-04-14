import { InputSizeV2 } from '../inputV2.types'

export type NumberInputV2Props = {
    value: number | null
    unit?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    min?: number
    max?: number
    step?: number
    error?: {
        show: boolean
        message?: string
    }
    size?: InputSizeV2
    label?: {
        text: string
        subtext?: string
    }
    helpIconText?: string
    hintText?: string
    name?: string
    preventNegative?: boolean
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'value' | 'onBlur' | 'onFocus'
>

export type StepperArrowProps = {
    disabled?: boolean
    dimmed: boolean
    flip?: boolean
    size: number | string
    colorDefault: React.CSSProperties['color']
    colorDisabled: React.CSSProperties['color']
}
