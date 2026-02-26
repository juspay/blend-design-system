import { ReactElement } from 'react'
import { CheckboxV2TokensType } from './checkboxV2.tokens'
import { CSSObject } from 'styled-components'
import { SelectorV2Size } from '../SelectorV2/selectorV2.types'

export enum CheckboxV2CheckedState {
    CHECKED = 'checked',
    UNCHECKED = 'unchecked',
    INDETERMINATE = 'indeterminate',
}
export type CheckboxV2Props = {
    label?: string
    id?: string
    name?: string
    checked?: boolean | 'indeterminate'
    onCheckedChange?: (checked: boolean | 'indeterminate') => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: SelectorV2Size
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
    onCheckedChange: (checked: boolean | 'indeterminate') => void
    disabled: boolean
    required: boolean
    size: SelectorV2Size
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
    size: SelectorV2Size
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
