import { ReactElement } from 'react'
import { CSSObject } from 'styled-components'
import { InputSizeV2 } from '../inputV2.types'
import type { SingleSelectV2Props } from '../../SingleSelectV2/singleSelectV2.types'

/** Props forwarded to the embedded `SingleSelectV2` (inline, no container). Used for `leftSelect` / `rightSelect`; when either is set, icon slots are not rendered. */
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
    /** Renders an inline `SingleSelectV2` on the left. Pushes the text field with left padding. When `leftSelect` or `rightSelect` is set, neither `leftSlot` nor `rightSlot` is rendered. */
    leftSelect?: TextInputV2SelectConfig
    /** Same as `leftSelect` on the right. When `leftSelect` or `rightSelect` is set, neither `leftSlot` nor `rightSlot` is rendered. */
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
