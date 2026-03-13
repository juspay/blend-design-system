import type { ReactNode } from 'react'
import type { SkeletonVariant } from '../Skeleton'
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

export type MenuV2SkeletonProps = {
    count?: number
    show?: boolean
    variant?: SkeletonVariant
}

export type MenuV2ItemTooltipProps = {
    side?: TooltipSide
    align?: TooltipAlign
    size?: TooltipSize
    showArrow?: boolean
    delayDuration?: number
    offset?: number
}

/**
 * Optional slots for menu item content, in order: [leading, ...trailing].
 * Prefer `slots` for clarity; slot1–slot4 remain supported for backward compatibility.
 */
export type MenuV2ItemSlots = {
    /** Leading slot (e.g. icon). Maps to slot1 when using legacy props. */
    leading?: ReactNode
    /** Up to 3 trailing slots. Maps to slot2, slot3, slot4 when using legacy props. */
    trailing?: [ReactNode?, ReactNode?, ReactNode?]
}

export type MenuV2ItemType = {
    id?: string
    label: string
    subLabel?: string
    /** Preferred: ordered slots [leading, slot2, slot3, slot4]. Overridden by slot1–slot4 if set. */
    slots?: MenuV2ItemSlots
    /** @deprecated Prefer slots.leading. Leading slot (e.g. icon). */
    slot1?: ReactNode
    /** @deprecated Prefer slots.trailing[0]. */
    slot2?: ReactNode
    /** @deprecated Prefer slots.trailing[1]. */
    slot3?: ReactNode
    /** @deprecated Prefer slots.trailing[2]. */
    slot4?: ReactNode
    variant?: MenuV2ItemVariant
    actionType?: MenuV2ItemActionType
    disabled?: boolean
    onClick?: () => void
    subMenu?: MenuV2ItemType[]
    enableSubMenuSearch?: boolean
    subMenuSearchPlaceholder?: string
    tooltip?: string | ReactNode
    tooltipProps?: MenuV2ItemTooltipProps
    /** When true, submenu uses TanStack Virtual for large lists. */
    enableSubMenuVirtualScrolling?: boolean
    /** Used when enableSubMenuVirtualScrolling is true. */
    subMenuVirtualItemHeight?: number
    subMenuVirtualOverscan?: number
}

export type MenuV2GroupType = {
    id?: string
    label?: string
    items: MenuV2ItemType[]
    showSeparator?: boolean
}

/** Config for TanStack Virtual when rendering large item lists. */
export type MenuV2VirtualScrollingConfig = {
    /** Estimated height per item (px). Used by useVirtualizer. */
    itemHeight?: number
    /** Number of items to render outside visible area. */
    overscan?: number
    /** Min number of items to enable virtual scrolling. Default 30. */
    threshold?: number
}

export type MenuV2Props = {
    trigger: ReactNode
    items?: MenuV2GroupType[]
    /** Max height of the menu content (px). */
    maxHeight?: number
    /** Min height of the menu content (px). */
    minHeight?: number
    /** Max width of the menu content (px). Falls back to tokens if omitted. */
    maxWidth?: number
    /** Min width of the menu content (px). Falls back to tokens if omitted. */
    minWidth?: number
    enableSearch?: boolean
    searchPlaceholder?: string
    /** When true, menu content uses TanStack Virtual for large lists. */
    enableVirtualScrolling?: boolean
    /** Optional config for virtual scrolling (itemHeight, overscan). */
    virtualScrolling?: MenuV2VirtualScrollingConfig
    open?: boolean
    onOpenChange?: (open: boolean) => void
    asModal?: boolean
    alignment?: MenuV2Alignment
    side?: MenuV2Side
    sideOffset?: number
    alignOffset?: number
    collisionBoundaryRef?: HTMLElement | null | (HTMLElement | null)[]
    skeleton?: MenuV2SkeletonProps
}
