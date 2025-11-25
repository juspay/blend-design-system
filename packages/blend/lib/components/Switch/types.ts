import type { ReactNode } from 'react'

export enum SwitchSize {
    SMALL = 'sm',
    MEDIUM = 'md',
}

export type SwitchProps = {
    id?: string
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: SwitchSize
    label?: string
    subtext?: string
    slot?: ReactNode
    name?: string
    value?: string
    maxLength?: {
        label?: number
        subtext?: number
    }
}

export type SwitchGroupProps = {
    id?: string
    label?: string
    name?: string
    children: ReactNode
    disabled?: boolean
    value?: string[]
    defaultValue?: string[]
    onChange?: (value: string[]) => void
}
