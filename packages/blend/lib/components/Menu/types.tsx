import { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

export enum MenuAlignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

export enum MenuSide {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}

export type MenuProps = {
    trigger: React.ReactNode
    items?: MenuGroupType[]

    maxHeight?: number
    minHeight?: number
    maxWidth?: number
    minWidth?: number

    enableSearch?: boolean
    searchPlaceholder?: string
    enableVirtualScrolling?: boolean
    virtualItemHeight?: number | ((item: MenuItemType, index: number) => number)
    virtualOverscan?: number
    virtualScrollThreshold?: number
    // Radix Menu Props
    open?: boolean
    onOpenChange?: (open: boolean) => void
    asModal?: boolean
    alignment?: MenuAlignment
    side?: MenuSide
    sideOffset?: number
    alignOffset?: number
    collisonBoundaryRef?: Element | null | Array<Element | null>
}

export enum MenuItemVariant {
    DEFAULT = 'default',
    ACTION = 'action',
}

export enum MenuItemActionType {
    PRIMARY = 'primary',
    DANGER = 'danger',
}

export type MenuItemType = {
    label: string
    subLabel?: string
    slot1?: React.ReactNode
    slot2?: React.ReactNode
    slot3?: React.ReactNode
    slot4?: React.ReactNode
    variant?: MenuItemVariant
    actionType?: MenuItemActionType
    disabled?: boolean
    onClick?: () => void
    subMenu?: MenuItemType[]
    enableSubMenuSearch?: boolean
    subMenuSearchPlaceholder?: string
    tooltip?: string | React.ReactNode
    tooltipProps?: {
        side?: TooltipSide
        align?: TooltipAlign
        size?: TooltipSize
        showArrow?: boolean
        delayDuration?: number
        offset?: number
    }
}

export type MenuGroupType = {
    label?: string
    items: MenuItemType[]
    showSeparator?: boolean
}
