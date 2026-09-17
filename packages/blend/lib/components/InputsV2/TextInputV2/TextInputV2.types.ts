import { ReactElement } from 'react'
import { CSSObject } from 'styled-components'
import { InputSizeV2 } from '../inputV2.types'
import type {
    SingleSelectV2Props,
    SingleSelectV2Size,
} from '../../SingleSelectV2/singleSelectV2.types'
import type { SelectV2Alignment } from '../../SelectV2/selectV2.shared.types'

export enum TextInputV2DropdownPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

/**
 * Full `SingleSelectV2` API for the inline embed, plus `position` for TextInputV2 layout.
 * All `SingleSelectV2` props are forwarded; the host applies embed defaults (e.g. `NO_CONTAINER`, `inline`, input-linked `size`/`disabled`, merged `menuPosition`).
 */
export type TextInputV2Dropdown = SingleSelectV2Props & {
    position: TextInputV2DropdownPosition
}

/**
 * Platform-neutral core of the TextInputV2 API — no DOM types, no dropdown
 * (which would drag the SingleSelectV2 type graph into the node entry).
 * `@juspay/blend-native` derives its input props from this.
 */
export type TextInputBaseProps = {
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
}

export type TextInputV2Props = TextInputBaseProps & {
    dropdown?: TextInputV2Dropdown | TextInputV2Dropdown[]
    leftSlot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    rightSlot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    /**
     * Render Blend's built-in show/hide password button in the right slot and
     * drive the input `type` between `password` and `text`. Use this instead of
     * wiring an eye icon into `rightSlot` yourself. Icon size and colour come
     * from the `inputContainer.passwordToggle` tokens. Any `rightSlot` you pass
     * renders beside the toggle. Ignored when an embedded `dropdown` is set,
     * because dropdowns take over both slot positions.
     */
    passwordToggle?: boolean
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
