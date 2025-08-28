import type { ReactNode } from 'react'
import { TooltipSide, TooltipAlign, TooltipSize } from '../../Tooltip/types'

export enum SelectItemType {
    SINGLE = 'single',
    MULTI = 'multi',
}

export type BaseSelectItemType = {
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
    subMenu?: BaseSelectItemType[]

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

export type SelectItemProps = {
    item: BaseSelectItemType
    onSelect: (value: string) => void
    selected: string | string[]
    type: SelectItemType
    showCheckmark?: boolean
    className?: string
}
