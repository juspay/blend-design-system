import type { InputHTMLAttributes, ReactElement } from 'react'
import { RadioV2TokensType } from './radioV2.tokens.types'
import { CSSObject } from 'styled-components'
import { SelectorV2Size } from '../selectorV2.types'

export type { RadioV2IndicatorState } from './radioV2.tokens.types'

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

/**
 * Platform-neutral core of the RadioV2 API. `onCheckedChange` stays out of
 * the base — web types it with a DOM `ChangeEvent`; `@juspay/blend-native`
 * declares its own callback shape.
 */
export type RadioBaseProps = {
    checked?: boolean
    required?: boolean
    error?: boolean
    label?: string
    subLabel?: string
    size?: SelectorV2Size
}

export type RadioV2Props = RadioBaseProps & {
    onCheckedChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
        'className' | 'style' | 'slot' | 'size' | 'maxLength' | 'children'
    >
