import { ButtonHTMLAttributes, ReactElement } from 'react'
import {
    type SwitchV2TokensType,
    type SwitchV2Variant,
} from './switchV2.tokens.types'
import { CSSObject } from 'styled-components'
import { SelectorV2Size } from '../selectorV2.types'

export type { SwitchV2Variant }

export type SwitchV2ButtonProps = {
    id: string
    checked?: boolean
    disabled: boolean
    size: SelectorV2Size
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
    size: SelectorV2Size
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

/**
 * Platform-neutral core of the SwitchV2 API — `@juspay/blend-native`
 * derives its Switch props from this.
 */
export type SwitchBaseProps = {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    required?: boolean
    error?: boolean
    label?: string
    subLabel?: string
    size?: SelectorV2Size
}

export type SwitchV2Props = SwitchBaseProps & {
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
        'className' | 'style' | 'slot'
    >
