import type { ReactElement, ReactNode } from 'react'
import { RadioV2TokensType } from './radioV2.tokens'
import { CSSObject } from 'styled-components'

export enum RadioV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
}

export enum RadioV2CheckedState {
    CHECKED = 'checked',
    UNCHECKED = 'unchecked',
}

export enum RadioV2InteractionState {
    DEFAULT = 'default',
    HOVER = 'hover',
    DISABLED = 'disabled',
    ERROR = 'error',
}
export type RadioV2State = 'default' | 'hover' | 'disabled' | 'error'
export type RadioV2IndicatorState = 'active' | 'inactive'

export type RadioV2ContentProps = {
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: RadioV2Size
    label?: string
    subLabel?: string
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    tokens: RadioV2TokensType
    labelMaxLength?: number
    subLabelMaxLength?: number
    subLabelId?: string
}

export type RadioV2Props = {
    id?: string
    value?: string
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: RadioV2Size
    label?: string
    subLabel?: string
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    name?: string
    maxLength?: {
        label?: number
        subLabel?: number
    }
}

export type RadioV2GroupProps = {
    id?: string
    label?: string
    name: string
    defaultValue?: string
    value?: string
    children: ReactNode
    onChange?: (value: string) => void
    disabled?: boolean
    required?: boolean
    error?: boolean
}
