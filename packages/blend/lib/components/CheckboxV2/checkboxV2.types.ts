import { ReactNode } from 'react'

export enum CheckboxV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
}

export enum CheckboxV2CheckedState {
    CHECKED = 'checked',
    UNCHECKED = 'unchecked',
    INDETERMINATE = 'indeterminate',
}

export enum CheckboxV2InteractionState {
    DEFAULT = 'default',
    HOVER = 'hover',
    DISABLED = 'disabled',
    ERROR = 'error',
}
export type CheckboxV2Props = {
    label?: string
    id?: string
    name?: string
    checked?: boolean | 'indeterminate'
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean | 'indeterminate') => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: CheckboxV2Size
    children?: ReactNode
    subtext?: string
    slot?: ReactNode
    maxLength?: {
        label?: number
        subtext?: number
    }
}
