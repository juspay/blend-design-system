import type { InputHTMLAttributes } from 'react'
import type {
    SingleSelectV2Alignment,
    SingleSelectV2GroupType,
} from '../../SingleSelectV2/singleSelectV2.types'
import { SingleSelectV2Size } from '../../SingleSelectV2/singleSelectV2.types'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'

export enum DropdownPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

export type DropdownInputLayoutMetrics = {
    paddingX: number
    paddingY: number
    gap: number
    paddingTop: number
    paddingBottom: number
    floatingLabelTopPadding: number
    paddingLeft: number
    paddingRight: number
}

export type SingleSelectMenuPositionConfig = {
    alignment: SingleSelectV2Alignment
    alignOffset: number
    sideOffset: number
}
export type BorderInteractionVariants = {
    borderVariant: InputStateV2
    hoverVariant: InputStateV2
    focusVariant: InputStateV2
}

export type DropdownInputV2Props = {
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: { show: boolean; message: string }
    required?: boolean
    name?: string
    hintText?: string
    disabled?: boolean
    size?: InputSizeV2
    id?: string
    dropdownPosition?: DropdownPosition
    /** Accessible name for the dropdown control (defaults from `name` / label) */
    dropdownName?: string
    onDropdownOpen?: () => void
    onDropdownClose?: () => void
    maxMenuHeight?: number
    minMenuWidth?: number
    maxMenuWidth?: number
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    dropDown?: {
        onSelect?: (value: string) => void
        size?: SingleSelectV2Size
        items?: SingleSelectV2GroupType[]
        value?: string
        placeholder?: string
        label?: string
    }
    input?: {
        value?: string
        onChange?: (value: string) => void
        placeholder?: string
        size?: InputSizeV2
        label?: string
    }
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onChange' | 'value'
>
