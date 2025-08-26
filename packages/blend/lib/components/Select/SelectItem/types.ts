import type { ReactNode } from 'react'
import type { TooltipProps } from '../../Tooltip/types'

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

    // Tooltip support
    tooltip?: string | ReactNode
    tooltipProps?: Partial<Omit<TooltipProps, 'children' | 'content'>>

    // Disable truncation for specific items if needed
    disableTruncation?: boolean
}

export type SelectItemProps = {
    item: BaseSelectItemType
    onSelect: (value: string) => void
    selected: string | string[]
    type: SelectItemType
    showCheckmark?: boolean
    className?: string
    tokens?: any // Will be typed properly based on usage
}
