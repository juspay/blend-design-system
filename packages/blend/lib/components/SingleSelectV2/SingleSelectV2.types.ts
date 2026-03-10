import type { ReactNode, ReactElement, RefObject } from 'react'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import {
    SelectV2Alignment,
    SelectV2FlattenedItemBase,
    SelectV2BaseItemType,
    SelectV2PopoverPropsBase,
    SelectV2SkeletonProps,
    SelectV2Side,
    SelectV2Size,
    SelectV2Variant,
} from '../SelectV2/selectV2.shared.types'

export { SelectV2Alignment as SingleSelectV2Alignment }
export { SelectV2Variant as SingleSelectV2Variant }
export { SelectV2Size as SingleSelectV2Size }
export { SelectV2Side as SingleSelectV2Side }

export type { SelectV2SkeletonProps as SingleSelectV2SkeletonProps }

export type SingleSelectV2ItemType = SelectV2BaseItemType & {
    subMenu?: SingleSelectV2ItemType[]
}

export type SingleSelectV2GroupType = {
    groupLabel?: string
    items: SingleSelectV2ItemType[]
    showSeparator?: boolean
}

export type FlattenedItem = SelectV2FlattenedItemBase<SingleSelectV2ItemType>

export type MenuListSharedProps = {
    selected: string
    onSelect: (value: string) => void
    singleSelectTokens: SingleSelectV2TokensType
    size: SelectV2Size
    variant: SelectV2Variant
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

export type MenuPopoverProps = SelectV2PopoverPropsBase

export type SingleSelectV2Props = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean
    helpIconText?: string
    placeholder: string
    size?: SelectV2Size
    items: SingleSelectV2GroupType[]
    variant?: SelectV2Variant
    selected: string
    onSelect: (value: string) => void
    enableSearch?: boolean
    searchPlaceholder?: string
    slot?: ReactNode
    disabled?: boolean
    name?: string
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void

    // Custom trigger
    customTrigger?: ReactElement

    // Responsive behaviour
    usePanelOnMobile?: boolean

    // Alignment
    alignment?: SelectV2Alignment
    side?: SelectV2Side
    sideOffset?: number
    alignOffset?: number

    // Dimensions
    minPopoverWidth?: number
    maxPopoverWidth?: number
    maxPopoverHeight?: number
    inline?: boolean
    onBlur?: () => void
    onFocus?: () => void

    // Error state
    error?: boolean
    errorMessage?: string
    fullWidth?: boolean

    // Virtualization
    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number

    // Infinite scroll
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: ReactNode
    skeleton?: SelectV2SkeletonProps
    maxTriggerWidth?: number
    minTriggerWidth?: number

    allowCustomValue?: boolean
    customValueLabel?: string
    singleSelectGroupPosition?: 'center' | 'left' | 'right'
}
