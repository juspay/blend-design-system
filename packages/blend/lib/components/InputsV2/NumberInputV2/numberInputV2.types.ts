import { InputSizeV2 } from '../inputV2.types'

export enum NumberInputV2Direction {
    LEFT = 'left',
    RIGHT = 'right',
}

/**
 * Platform-neutral core of the NumberInputV2 API — `@juspay/blend-native`
 * derives its NumberInput props from this; the synthesized DOM change
 * events and ReactNode slots stay web-only.
 */
export type NumberInputBaseProps = {
    value: number | null
    unit?: string
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
    unitDirection?: NumberInputV2Direction
    helpIconText?: string
    hintText?: string
    name?: string
    preventNegative?: boolean
}

export type NumberInputV2Props = NumberInputBaseProps & {
    slot?: {
        left?: React.ReactNode
        right?: React.ReactNode
    }
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'size' | 'style' | 'className' | 'value' | 'onBlur' | 'onFocus' | 'slot'
    >

export type StepperArrowProps = {
    disabled?: boolean
    dimmed: boolean
    flip?: boolean
    size: number | string
    colorDefault: React.CSSProperties['color']
    colorDisabled: React.CSSProperties['color']
}
