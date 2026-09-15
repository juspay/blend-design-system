import type { ReactNode } from 'react'
import type { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'
import type { CSSObject } from 'styled-components'
import type { MenuSelectionMode, MenuSelectionStyle } from '../Menu/selection'

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
export type MenuV2SearchSortFn = (
    items: MenuV2ItemType[],
    searchText: string
) => MenuV2ItemType[]
export type MenuV2SelectionStyle = MenuSelectionStyle
export type MenuV2SelectionMode = MenuSelectionMode

export type MenuV2ItemType = {
    id?: string
    label: MenuV2ItemLabel
    subLabel?: string
    variant?: MenuV2ItemVariant
    actionType?: MenuV2ItemActionType
    disabled?: boolean
    /**
     * Controlled selection state. When set, the item participates in
     * selection UI (checkmark / highlight) and exposes `aria-checked`.
     * Selection is fully controlled by the consumer — MenuV2 never
     * manages selection internally.
     */
    selected?: boolean
    onClick?: () => void
    subMenu?: MenuV2ItemType[]
    enableSubMenuSearch?: boolean
    subMenuSearchPlaceholder?: string
    subMenuSearchSortFn?: MenuV2SearchSortFn
    onSubMenuSearchEnter?: (
        searchText: string,
        filteredResults: MenuV2ItemType[]
    ) => void
    tooltip?: string | ReactNode
    tooltipProps?: MenuV2ItemTooltipProps
}

export type MenuV2GroupType = {
    id?: string
    label?: string
    items: MenuV2ItemType[]
    showSeparator?: boolean
    /**
     * Overrides the Menu-level `selectionStyle` for items in this group.
     */
    selectionStyle?: MenuV2SelectionStyle
    /**
     * Overrides the Menu-level `selectionMode` for items in this group.
     */
    selectionMode?: MenuV2SelectionMode
}

export type MenuV2VirtualScrollingConfig = {
    /** Estimated height per item (px). Used by useVirtualizer. */
    itemHeight?: number
    /** Number of items to render outside visible area. */
    overscan?: number
    /** Min number of items to enable virtual scrolling. Default 30. */
    threshold?: number
}

export type MenuV2Dimensions = {
    minWidth?: CSSObject['minWidth']
    maxWidth?: CSSObject['maxWidth']
    minHeight?: CSSObject['minHeight']
    maxHeight?: CSSObject['maxHeight']
}

/**
 * The platform-neutral core of `MenuV2Props` — the item model, search and
 * selection contract, so `@juspay/blend-design-system/node` can export it
 * for the React Native package. The ReactElement trigger, CSS dimensions,
 * virtualization config and DOM-typed props stay in `MenuV2Props`.
 */
export type MenuBaseProps = {
    items?: MenuV2GroupType[]
    enableSearch?: boolean
    searchPlaceholder?: string
    searchSortFn?: MenuV2SearchSortFn
    onEnter?: (searchText: string, filteredGroups: MenuV2GroupType[]) => void
    open?: boolean
    onOpenChange?: (open: boolean) => void
    selectionStyle?: MenuV2SelectionStyle
    selectionMode?: MenuV2SelectionMode
    closeOnSelect?: boolean
    alignment?: MenuV2Alignment
    side?: MenuV2Side
    sideOffset?: number
    alignOffset?: number
}

export type MenuV2Props = MenuBaseProps & {
    trigger: React.ReactElement
    dimensions?: MenuV2Dimensions
    enableVirtualScrolling?: boolean
    virtualScrolling?: MenuV2VirtualScrollingConfig
    asModal?: boolean
    collisionBoundaryRef?: HTMLElement | null | (HTMLElement | null)[]
    triggerProps?: Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'className' | 'style'
    >
}
