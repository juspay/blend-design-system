import { ReactElement } from 'react'
import { CSSObject } from 'styled-components'
import { InputSizeV2 } from '../inputV2.types'

export type TextInputV2Props = {
    value: string
    label?: string
    subLabel?: string
    size?: InputSizeV2
    error?: {
        show: boolean
        message?: string
    }
    hintText?: string
    helpIconText?: {
        text: string
        onClick?: () => void
    }
    leftSlot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    rightSlot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className'
>
