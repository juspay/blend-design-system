import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react'
import { RadioV2TokensType } from './radioV2.tokens'
import { CSSObject } from 'styled-components'
import { SelectorV2Size } from '../selectorV2.types'

export enum RadioV2CheckedState {
    CHECKED = 'checked',
    UNCHECKED = 'unchecked',
}

export type RadioV2State = 'default' | 'hover' | 'disabled' | 'error'
export type RadioV2IndicatorState = 'active' | 'inactive'

export type RadioV2ContentProps = {
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: SelectorV2Size
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
    defaultChecked?: boolean
    onCheckedChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    name?: string
    checked?: boolean
    required?: boolean
    error?: boolean
    label?: string
    subLabel?: string
    size?: SelectorV2Size
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    maxLength?: {
        label?: number
        subLabel?: number
    }
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'className' | 'style' | 'slot' | 'onChange' | 'size' | 'maxLength'
>

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
