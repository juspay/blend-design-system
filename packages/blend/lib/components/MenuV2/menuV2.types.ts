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

export type MenuV2Props = {
    trigger: React.ReactElement
    items?: MenuV2GroupType[]
    dimensions?: MenuV2Dimensions
    enableSearch?: boolean
    searchPlaceholder?: string
    searchSortFn?: MenuV2SearchSortFn
    onEnter?: (searchText: string, filteredGroups: MenuV2GroupType[]) => void
    enableVirtualScrolling?: boolean
    virtualScrolling?: MenuV2VirtualScrollingConfig
    open?: boolean
    onOpenChange?: (open: boolean) => void
    asModal?: boolean
    /**
     * How selected items are indicated.
     * - `checkmark`: trailing tick icon on selected items
     * - `highlight`: selected background from design tokens
     * Defaults to `checkmark` when any item has `selected` set.
     * Can be overridden per group via `MenuV2GroupType.selectionStyle`.
     */
    selectionStyle?: MenuV2SelectionStyle
    /**
     * Selection cardinality used for accessibility semantics.
     * - `single`: items use `menuitemradio`
     * - `multiple`: items use `menuitemcheckbox`
     * Defaults to `single` when an item has `selected` set.
     * Can be overridden per group via `MenuV2GroupType.selectionMode`.
     */
    selectionMode?: MenuV2SelectionMode
    /**
     * When `false`, selecting an item keeps the menu open (multi-select).
     * Defaults to `true` (current fire-and-forget close behavior).
     */
    closeOnSelect?: boolean
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
