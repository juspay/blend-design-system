import type { ReactNode } from 'react'

export enum CheckboxSize {
    SMALL = 'sm',
    MEDIUM = 'md',
}

export enum CheckboxCheckedState {
    CHECKED = 'checked',
    UNCHECKED = 'unchecked',
    INDETERMINATE = 'indeterminate',
}

export enum CheckboxInteractionState {
    DEFAULT = 'default',
    HOVER = 'hover',
    DISABLED = 'disabled',
    ERROR = 'error',
}

export type CheckboxProps = {
    id?: string
    name?: string
    checked?: boolean | 'indeterminate'
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean | 'indeterminate') => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: CheckboxSize
    children?: ReactNode
    subtext?: string
    slot?: ReactNode
    maxLength?: {
        label?: number
        subtext?: number
    }
}
