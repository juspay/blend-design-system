import { TextInputSize } from '../TextInput/types'

import type { SelectMenuGroupType } from '../../Select/types'
import { ReactNode } from 'react'

export enum DropdownInputSize {
    SM = 'sm',
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

export enum DropdownPosition {
    LEFT = 'left',
    RIGHT = 'right',
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
    slot?: ReactNode
    size?: TextInputSize
    dropDownValue?: string
    onDropDownChange?: (value: string) => void
    dropDownItems: SelectMenuGroupType[]
    dropdownName?: string
    onDropdownOpen?: () => void
    onDropdownClose?: () => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    dropdownPosition?: DropdownPosition
    maxMenuHeight?: number
    minMenuWidth?: number
    maxMenuWidth?: number
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onBlur' | 'onFocus' | 'slot'
>
