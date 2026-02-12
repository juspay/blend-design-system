import { ReactElement } from 'react'
import { CheckboxV2TokensType } from './checkboxV2.tokens'
import { CSSObject } from 'styled-components'

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
    subLabel?: string
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    maxLength?: {
        label?: number
        subLabel?: number
    }
}

export type CheckboxV2RootProps = {
    tokens: CheckboxV2TokensType
    uniqueId: string
    name: string
    ref: React.RefObject<HTMLButtonElement>
    checked: boolean | 'indeterminate'
    defaultChecked: boolean
    onCheckedChange: (checked: boolean | 'indeterminate') => void
    disabled: boolean
    required: boolean
    size: CheckboxV2Size
    error: boolean
    shouldShake: boolean
    ariaAttributes: {
        'aria-required': boolean
        'aria-invalid': boolean
        'aria-describedby': string
    }
    restProps: {
        [key: string]: unknown
    }
}

export type CheckboxV2ContentProps = {
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: CheckboxV2Size
    label?: string
    subLabel?: string
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    tokens: CheckboxV2TokensType
    labelMaxLength?: number
    subLabelMaxLength?: number
    subLabelId?: string
}
