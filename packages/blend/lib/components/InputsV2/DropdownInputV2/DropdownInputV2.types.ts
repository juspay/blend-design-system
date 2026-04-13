import { InputSizeV2 } from '../inputV2.types'

export enum DropdownPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

export type DropdownInputV2Props = {
    value?: string
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: boolean
    errorMessage?: string
    required?: boolean
    name?: string
    hintText?: string
    disabled?: boolean
    isFocused?: boolean
    isHovered?: boolean
    onChange?: (value: string) => void
    size?: InputSizeV2
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    id?: string
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onChange' | 'value' | 'onFocus' | 'onBlur'
>
