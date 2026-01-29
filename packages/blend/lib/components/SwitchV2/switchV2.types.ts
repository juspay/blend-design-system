import { ButtonHTMLAttributes, ReactElement } from 'react'
import { SwitchV2TokensType } from './switchV2.tokens'
import { CSSObject } from 'styled-components'

export enum SwitchV2Size {
    SM = 'sm',
    MD = 'md',
}

export type SwitchV2State = 'default' | 'hover' | 'disabled' | 'error'
export type SwitchV2Variant = 'checked' | 'unchecked'

export type SwitchV2ButtonProps = {
    id: string
    checked?: boolean
    disabled: boolean
    size: SwitchV2Size
    tokens: SwitchV2TokensType
    onToggle: () => void
    buttonProps?: Record<string, unknown>
    ref?: React.Ref<HTMLButtonElement>
}

export type SwitchV2ContentProps = {
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: SwitchV2Size
    label?: string
    subLabel?: string
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    tokens: SwitchV2TokensType
    labelMaxLength?: number
    subLabelMaxLength?: number
    subLabelId?: string
}

export type SwitchV2Props = {
    checked?: boolean
    onChange?: (checked: boolean) => void
    required?: boolean
    error?: boolean
    label?: string
    subLabel?: string
    size?: SwitchV2Size
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    maxLength?: {
        label?: number
        subLabel?: number
    }
} & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'style' | 'slot' | 'onChange'
>
