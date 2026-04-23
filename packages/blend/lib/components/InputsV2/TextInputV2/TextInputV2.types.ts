import { ReactElement } from 'react'
import { CSSObject } from 'styled-components'
import { InputSizeV2 } from '../inputV2.types'
import type { SingleSelectV2Props } from '../../SingleSelectV2/singleSelectV2.types'

export enum DropdownPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

export type TextInputV2Dropdown = SingleSelectV2Props & {
    position: DropdownPosition
}

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
    helpIconText?: string
    dropdown?: TextInputV2Dropdown | TextInputV2Dropdown[]
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
    'size' | 'style' | 'className' | 'select' | 'dropdown'
>
