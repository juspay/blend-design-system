import { ReactElement } from 'react'
import { CSSObject } from 'styled-components'
import { InputSizeV2 } from '../inputV2.types'
import type {
    SingleSelectV2Props,
    SingleSelectV2Size,
} from '../../SingleSelectV2/singleSelectV2.types'
import type { SelectV2Alignment } from '../../SelectV2/selectV2.shared.types'

export enum DropdownPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

/**
 * Full `SingleSelectV2` API for the inline embed, plus `position` for TextInputV2 layout.
 * All `SingleSelectV2` props are forwarded; the host applies embed defaults (e.g. `NO_CONTAINER`, `inline`, input-linked `size`/`disabled`, merged `menuPosition`).
 */
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
    'size' | 'style' | 'className' | 'dropdown'
>

export type EmbeddedSingleSelectOptions = {
    fieldLabel: string | undefined
    fieldDisabled: boolean
    singleSelectV2Size: SingleSelectV2Size
    menuAlignment: SelectV2Alignment
    menuSideOffset: number
    menuAlignOffset: number
    defaultSingleSelectGroupPosition: 'left' | 'right'
}
