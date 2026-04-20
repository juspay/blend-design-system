import type {
    ReactNode,
    ReactElement,
    RefObject,
    ButtonHTMLAttributes,
} from 'react'
import type { CSSObject } from 'styled-components'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'

import {
    SelectV2Alignment,
    SelectV2FlattenedItemBase,
    SelectV2BaseItemType,
    SelectV2MenuRootPropsBase,
    SelectV2SkeletonProps,
    SelectV2Side,
    SelectV2Size,
    SelectV2Variant,
} from '../SelectV2/selectV2.shared.types'

import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

export { SelectV2Alignment as SingleSelectV2Alignment }
export { SelectV2Variant as SingleSelectV2Variant }
export { SelectV2Size as SingleSelectV2Size }
export { SelectV2Side as SingleSelectV2Side }

export type { SelectV2SkeletonProps as SingleSelectV2SkeletonProps }

export type SelectV2MenuDimensions = {
    minWidth?: CSSObject['minWidth']
    maxWidth?: CSSObject['maxWidth']
    maxHeight?: CSSObject['maxHeight']
}

export type SelectV2TriggerDimensions = {
    minWidth?: CSSObject['minWidth']
    maxWidth?: CSSObject['maxWidth']
    width?: CSSObject['width']
}

export type SelectV2MenuPosition = {
    alignment?: SelectV2Alignment
    side?: SelectV2Side
    sideOffset?: number
    alignOffset?: number
}

export type SelectV2ErrorState = {
    show?: boolean
    message?: string
}

export type SelectV2SearchConfig = {
    show?: boolean
    placeholder?: string
}

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

export type MenuRootProps = SelectV2MenuRootPropsBase

export type SingleSelectV2MenuProps = {
    items: SingleSelectV2GroupType[]
    selected: string
    onSelect: (value: string) => void
    trigger: ReactElement

    menuDimensions?: SelectV2MenuDimensions
    search?: SelectV2SearchConfig
    disabled?: boolean
    menuPosition?: SelectV2MenuPosition
    collisionBoundary?: DropdownMenuContentProps['collisionBoundary']

    open: boolean
    onOpenChange: (open: boolean) => void

    size?: SelectV2Size
    variant?: SelectV2Variant

    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number

    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: ReactNode

    skeleton?: SelectV2SkeletonProps

    allowCustomValue?: boolean
    customValueLabel?: string

    menuId?: string
}
export type SingleSelectV2PropsBase = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean
    helpIconText?: string

    placeholder: string
    size?: SelectV2Size
    variant?: SelectV2Variant

    items: SingleSelectV2GroupType[]
    selected: string
    onSelect: (value: string) => void

    search?: SelectV2SearchConfig

    slot?: ReactNode
    customTrigger?: ReactElement

    open?: boolean
    onOpenChange?: (open: boolean) => void

    usePanelOnMobile?: boolean

    menuPosition?: SelectV2MenuPosition

    menuDimensions?: SelectV2MenuDimensions
    triggerDimensions?: SelectV2TriggerDimensions

    inline?: boolean

    error?: SelectV2ErrorState

    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number

    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: ReactNode

    skeleton?: SelectV2SkeletonProps

    allowCustomValue?: boolean
    customValueLabel?: string

    singleSelectGroupPosition?: 'center' | 'left' | 'right'
}

export type SingleSelectV2Props = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'style' | 'className' | 'onSelect' | 'slot'
> &
    SingleSelectV2PropsBase
