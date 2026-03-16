import type { ReactNode } from 'react'
import type { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

export enum MenuV2Alignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

export enum MenuV2Side {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}

export enum MenuV2ItemVariant {
    DEFAULT = 'default',
    ACTION = 'action',
}

export enum MenuV2ItemActionType {
    PRIMARY = 'primary',
    DANGER = 'danger',
}

export type MenuV2ItemTooltipProps = {
    side?: TooltipSide
    align?: TooltipAlign
    size?: TooltipSize
    showArrow?: boolean
    delayDuration?: number
    offset?: number
}

export type MenuV2ItemLabel = {
    text: string
    leftSlot?: React.ReactElement
}
export type MenuV2ItemType = {
    id?: string
    label: MenuV2ItemLabel
    subLabel?: string
    variant?: MenuV2ItemVariant
    actionType?: MenuV2ItemActionType
    disabled?: boolean
    onClick?: () => void
    subMenu?: MenuV2ItemType[]
    enableSubMenuSearch?: boolean
    subMenuSearchPlaceholder?: string
    tooltip?: string | ReactNode
    tooltipProps?: MenuV2ItemTooltipProps
}

export type MenuV2GroupType = {
    id?: string
    label?: string
    items: MenuV2ItemType[]
    showSeparator?: boolean
}

export type MenuV2VirtualScrollingConfig = {
    /** Estimated height per item (px). Used by useVirtualizer. */
    itemHeight?: number
    /** Number of items to render outside visible area. */
    overscan?: number
    /** Min number of items to enable virtual scrolling. Default 30. */
    threshold?: number
}

export type MenuV2Props = {
    trigger: React.ReactElement
    items?: MenuV2GroupType[]
    maxHeight?: number
    minHeight?: number
    maxWidth?: number
    minWidth?: number
    enableSearch?: boolean
    searchPlaceholder?: string
    enableVirtualScrolling?: boolean
    virtualScrolling?: MenuV2VirtualScrollingConfig
    open?: boolean
    onOpenChange?: (open: boolean) => void
    asModal?: boolean
    alignment?: MenuV2Alignment
    side?: MenuV2Side
    sideOffset?: number
    alignOffset?: number
    collisionBoundaryRef?: HTMLElement | null | (HTMLElement | null)[]
    triggerProps?: Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'className' | 'style'
    >
}
