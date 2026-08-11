import React from 'react'
import type { SkeletonVariant } from '../Skeleton/types'
import { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'
import type { MenuSelectionMode, MenuSelectionStyle } from './selection'

export type { MenuSelectionMode, MenuSelectionStyle } from './selection'

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

export type MenuSkeletonProps = {
    count?: number
    show?: boolean
    variant?: SkeletonVariant
}

export type MenuSearchSortFn = (
    items: MenuItemType[],
    searchText: string
) => MenuItemType[]

export type MenuProps = {
    trigger: React.ReactNode
    items?: MenuGroupType[]

    maxHeight?: number
    minHeight?: number
    maxWidth?: number
    minWidth?: number

    enableSearch?: boolean
    searchPlaceholder?: string
    searchSortFn?: MenuSearchSortFn
    onEnter?: (searchText: string, filteredGroups: MenuGroupType[]) => void
    enableVirtualScrolling?: boolean
    virtualItemHeight?: number | ((item: MenuItemType, index: number) => number)
    virtualOverscan?: number
    virtualScrollThreshold?: number
    // Radix Menu Props
    open?: boolean
    onOpenChange?: (open: boolean) => void
    asModal?: boolean
    /** How controlled selected items are indicated. */
    selectionStyle?: MenuSelectionStyle
    /** The selection cardinality used for selectable item accessibility semantics. */
    selectionMode?: MenuSelectionMode
    /** Whether activating an item closes the menu. Defaults to true. */
    closeOnSelect?: boolean
    alignment?: MenuAlignment
    side?: MenuSide
    sideOffset?: number
    alignOffset?: number
    collisonBoundaryRef?: Element | null | Array<Element | null>
    skeleton?: MenuSkeletonProps
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'slot'>

export type SubMenuVirtualScrollProps = {
    enableVirtualScrolling?: boolean
    virtualItemHeight?: number
    virtualOverscan?: number
    virtualScrollThreshold?: number
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
    /** Controlled selection state. Menu never changes this value internally. */
    selected?: boolean
    onClick?: () => void
    subMenu?: MenuItemType[]
    enableSubMenuSearch?: boolean
    subMenuSearchPlaceholder?: string
    /** Custom sort function for submenu search results. Defaults to exact → prefix → substring. */
    subMenuSearchSortFn?: MenuSearchSortFn
    /** Called when the user presses Enter while focused on the submenu search input. */
    onSubMenuSearchEnter?: (
        searchText: string,
        filteredResults: MenuItemType[]
    ) => void
    tooltip?: string | React.ReactNode
    tooltipProps?: {
        side?: TooltipSide
        align?: TooltipAlign
        size?: TooltipSize
        showArrow?: boolean
        delayDuration?: number
        offset?: number
    }
    enableSubMenuVirtualScrolling?: boolean
    subMenuVirtualItemHeight?: number
    subMenuVirtualOverscan?: number
    subMenuVirtualScrollThreshold?: number
}

export type MenuGroupType = {
    label?: string
    items: MenuItemType[]
    showSeparator?: boolean
    /** Overrides the Menu-level selection style for this group's selectable items. */
    selectionStyle?: MenuSelectionStyle
    /** Overrides the Menu-level selection mode for this group's selectable items. */
    selectionMode?: MenuSelectionMode
}
