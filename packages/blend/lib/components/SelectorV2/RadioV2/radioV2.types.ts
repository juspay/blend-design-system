import type { InputHTMLAttributes, ReactElement } from 'react'
import { RadioV2TokensType } from './radioV2.tokens'
import { CSSObject } from 'styled-components'
import { SelectorV2Size } from '../selectorV2.types'

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
    checked?: boolean
    onCheckedChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
    'className' | 'style' | 'slot' | 'size' | 'maxLength'
>
