import { SkeletonVariant } from '../Skeleton'
import { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'
import type {
    CSSProperties,
    KeyboardEvent,
    ReactElement,
    ReactNode,
    RefObject,
} from 'react'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'

export enum SingleSelectV2Alignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

export enum SingleSelectV2Variant {
    CONTAINER = 'container',
    NO_CONTAINER = 'no-container',
}

export enum SingleSelectV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum SingleSelectV2Side {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}

export type SingleSelectV2GroupType = {
    groupLabel?: string
    items: SingleSelectV2ItemType[]
    showSeparator?: boolean
}

export type SingleSelectV2SkeletonProps = {
    count?: number
    show?: boolean
    variant?: SkeletonVariant
}

export type SingleSelectV2ItemType = {
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
    subMenu?: SingleSelectV2ItemType[]
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

export type FlattenedItem = {
    id: string
    type: 'item' | 'label' | 'separator'
    item?: SingleSelectV2ItemType
    label?: string
    groupId?: number
}

export type MenuListSharedProps = {
    selected: string
    onSelect: (value: string) => void
    singleSelectTokens: SingleSelectV2TokensType
    size: SingleSelectV2Size
    variant: SingleSelectV2Variant
}

export type MenuListProps = MenuListSharedProps & {
    filteredItems: SingleSelectV2GroupType[]
    enableSearch?: boolean
}

export type VirtualItemShape = {
    key: string | number | bigint
    index: number
    start: number
}

export type VirtualListProps = MenuListSharedProps & {
    flattenedItems: FlattenedItem[]
    virtualViewportHeight: number
    virtualItems: VirtualItemShape[]
    totalSize: number
    measureElement: (node: Element | null) => void
    loadingComponent?: ReactNode
    hasMore?: boolean
    virtualScrollRef: RefObject<HTMLDivElement | null>
}

export type MenuSearchProps = {
    enabled?: boolean
    hasItems: boolean
    backgroundColor: string
    searchPlaceholder: string
    searchText: string
    onSearchTextChange: (value: string) => void
    searchInputRef: RefObject<HTMLInputElement | null>
    containerRef?: RefObject<HTMLDivElement | null>
}

export type MenuPopoverProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    disabled?: boolean
    trigger: ReactElement
    menuId?: string
    alignment: SingleSelectV2Alignment
    side: SingleSelectV2Side
    sideOffset: number
    alignOffset: number
    collisionBoundary?: DropdownMenuContentProps['collisionBoundary']
    contentStyle: CSSProperties
    onContentKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
    contentRef?: RefObject<HTMLDivElement | null>
    children: ReactNode
}

export type SingleSelectV2Props = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean
    helpIconText?: string
    placeholder: string
    size?: SingleSelectV2Size
    items: SingleSelectV2GroupType[]
    variant?: SingleSelectV2Variant
    selected: string
    onSelect: (value: string) => void
    enableSearch?: boolean
    searchPlaceholder?: string
    slot?: React.ReactNode
    disabled?: boolean
    name?: string
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void

    // custom trigger
    customTrigger?: React.ReactElement

    // responsive behavior
    usePanelOnMobile?: boolean
    // alignment
    alignment?: SingleSelectV2Alignment
    side?: SingleSelectV2Side
    sideOffset?: number
    alignOffset?: number

    // dim
    minPopoverWidth?: number
    maxPopoverWidth?: number
    maxPopoverHeight?: number
    inline?: boolean
    onBlur?: () => void
    onFocus?: () => void

    // error
    error?: boolean
    errorMessage?: string
    fullWidth?: boolean

    // virtualization
    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number

    // infinite scroll
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: React.ReactNode
    skeleton?: SingleSelectV2SkeletonProps
    maxTriggerWidth?: number
    minTriggerWidth?: number

    allowCustomValue?: boolean
    customValueLabel?: string
    singleSelectGroupPosition?: 'center' | 'left' | 'right'
}
