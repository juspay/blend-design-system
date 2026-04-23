import { ReactElement } from 'react'
import { CSSObject } from 'styled-components'
import { InputSizeV2 } from '../inputV2.types'
import type { SingleSelectV2Props } from '../../SingleSelectV2/singleSelectV2.types'

/** Props forwarded to the embedded `SingleSelectV2` (inline, no container). When set, the left slot is not rendered. */
export type TextInputV2SelectConfig = Required<
    Pick<SingleSelectV2Props, 'items' | 'selected' | 'onSelect' | 'placeholder'>
> &
    Partial<
        Pick<
            SingleSelectV2Props,
            | 'search'
            | 'menuPosition'
            | 'menuDimensions'
            | 'name'
            | 'usePanelOnMobile'
            | 'allowCustomValue'
            | 'customValueLabel'
            | 'triggerDimensions'
            | 'singleSelectGroupPosition'
        >
    > & {
        'aria-label'?: string
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
    /** Renders an inline `SingleSelectV2` on the left (like `DropdownInput` + select). Pushes the text field with left padding; `leftSlot` is ignored when this is set. */
    select?: TextInputV2SelectConfig
    /** Same as `select` on the right; `rightSlot` is ignored when this is set. */
    rightSelect?: TextInputV2SelectConfig
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
