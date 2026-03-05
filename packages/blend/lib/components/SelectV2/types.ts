import type { ReactNode } from 'react'
import type { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'
import type { SingleSelectV2MenuItemTokensType } from '../SingleSelectV2/singleSelectV2.tokens'
import type { MultiSelectTokensType } from '../MultiSelect/multiSelect.tokens'

/** Item type for SelectV2 (compatible with SingleSelectV2 item shape) */
export type SelectV2ItemType = {
    label: string
    value: string
    checked?: boolean
    subLabel?: string
    slot1?: ReactNode
    slot2?: ReactNode
    slot3?: ReactNode
    slot4?: ReactNode
    disabled?: boolean
    onClick?: () => void
    subMenu?: SelectV2ItemType[]
    tooltip?: string | ReactNode
    tooltipProps?: {
        side?: TooltipSide
        align?: TooltipAlign
        size?: TooltipSize
        showArrow?: boolean
        delayDuration?: number
        offset?: number
    }
    disableTruncation?: boolean
}

export type SelectItemV2Props = {
    item: SelectV2ItemType
    selected: string
    onSelect: (value: string) => void
    itemTokens: SingleSelectV2MenuItemTokensType
    index?: number
    showCheckmark?: boolean
    selectedPosition?: 'first' | 'middle' | 'last' | 'only' | 'none'
    className?: string
}

export type MultiSelectItemV2Props = {
    item: SelectV2ItemType
    selectedValues: string[]
    onSelect: (value: string) => void
    itemTokens: MultiSelectTokensType['menu']['item']
    index?: number
    selectedPosition?: 'first' | 'middle' | 'last' | 'only' | 'none'
    className?: string
}
