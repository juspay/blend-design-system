import { TextInputSize } from '../TextInput/types'

import type { SelectMenuGroupType } from '../../Select/types'

export enum DropdownInputSize {
    MD = 'md',
    LG = 'lg',
}

export enum DropdownInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type DropdownInputProps = {
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: boolean
    errorMessage?: string
    hintText?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    slot?: React.ReactNode
    size?: TextInputSize
    dropDownValue?: string
    onDropDownChange?: (value: string) => void
    dropDownItems: SelectMenuGroupType[]
    dropdownName?: string
    onDropdownOpen?: () => void
    onDropdownClose?: () => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onBlur' | 'onFocus'
>
