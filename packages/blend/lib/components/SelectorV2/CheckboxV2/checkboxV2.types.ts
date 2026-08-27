import { ButtonHTMLAttributes, ReactElement } from 'react'
import type { CheckboxV2TokensType } from './checkboxV2.tokens.types'
import { CheckboxV2CheckedState } from './checkboxV2.tokens.types'
import { CSSObject } from 'styled-components'
import { SelectorV2Size } from '../../SelectorV2/selectorV2.types'

export { CheckboxV2CheckedState }

/**
 * Platform-neutral core of the CheckboxV2 API — no DOM attributes, no React
 * element slots. `@juspay/blend-native` derives its Checkbox props from
 * this; `CheckboxV2Props` layers the web-only pieces on top unchanged.
 */
export type CheckboxBaseProps = {
    checked?: boolean | 'indeterminate'
    onCheckedChange?: (checked: boolean | 'indeterminate') => void
    required?: boolean
    error?: boolean
    label?: string
    subLabel?: string
    size?: SelectorV2Size
}

export type CheckboxV2Props = CheckboxBaseProps & {
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
