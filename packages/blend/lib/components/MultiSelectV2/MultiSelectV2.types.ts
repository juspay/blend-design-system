import type { ReactNode, ReactElement, ButtonHTMLAttributes } from 'react'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import type {
    SelectV2FlattenedItemBase,
    SelectV2BaseItemType,
    SelectV2MenuRootPropsBase,
    SelectV2SkeletonProps,
    SelectV2Size,
    SelectV2Variant,
} from '../SelectV2/selectV2.shared.types'
import type {
    SelectV2MenuDimensions,
    SelectV2TriggerDimensions,
    SelectV2MenuPosition,
    SelectV2ErrorState,
    SelectV2SearchConfig,
} from '../SingleSelectV2/singleSelectV2.types'

export {
    SelectV2Alignment as MultiSelectV2Alignment,
    SelectV2Variant as MultiSelectV2Variant,
    SelectV2Size as MultiSelectV2Size,
    SelectV2Side as MultiSelectV2Side,
} from '../SelectV2/selectV2.shared.types'

export type { SelectV2SkeletonProps as MultiSelectV2SkeletonProps }

export type {
    SelectV2MenuDimensions,
    SelectV2TriggerDimensions,
    SelectV2MenuPosition,
    SelectV2ErrorState,
    SelectV2SearchConfig,
}

export enum MultiSelectV2SelectionTagType {
    COUNT = 'count',
    TEXT = 'text',
}

export type MultiSelectV2ItemType = SelectV2BaseItemType & {
    alwaysSelected?: boolean
    subMenu?: MultiSelectV2ItemType[]
}

export type MultiSelectV2GroupType = {
    groupLabel?: string
    items: MultiSelectV2ItemType[]
    showSeparator?: boolean
}

export type FlattenedMultiSelectV2Item =
    SelectV2FlattenedItemBase<MultiSelectV2ItemType>

export type MultiSelectV2MenuProps = {
    items: MultiSelectV2GroupType[]
    selected: string[]
    onSelect: (value: string) => void
    trigger: ReactElement
    menuDimensions?: SelectV2MenuDimensions
    disabled?: boolean
    search?: SelectV2SearchConfig
    enableSelectAll?: boolean
    selectAllText?: string
    onSelectAll?: (
        selectAll: boolean,
        filteredItems: MultiSelectV2GroupType[]
    ) => void
    maxSelections?: number
    menuPosition?: SelectV2MenuPosition
    collisionBoundary?: DropdownMenuContentProps['collisionBoundary']
    open?: boolean
    onOpenChange?: (open: boolean) => void
    showActionButtons?: boolean
    primaryAction?: {
        text: string
        onClick: (selectedValues: string[]) => void
        disabled?: boolean
        loading?: boolean
    }
    secondaryAction?: {
        text: string
        onClick: () => void
        disabled?: boolean
        loading?: boolean
    }
    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: ReactNode
    skeleton?: SelectV2SkeletonProps
    size?: SelectV2Size
    variant?: SelectV2Variant
    allowCustomValue?: boolean
    customValueLabel?: string
    menuId?: string
}

export type MenuRootProps = SelectV2MenuRootPropsBase & {
    onInteractOutside?: (e: Event) => void
    onPointerDownOutside?: (e: Event) => void
}

export type MultiSelectV2Props = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'style' | 'className' | 'onChange' | 'slot'
> & {
    selectedValues: string[]
    onChange: (value: string | string[]) => void
    items?: MultiSelectV2GroupType[]

    label: string
    subLabel?: string
    helpIconText?: string
    required?: boolean
    variant?: SelectV2Variant
    selectionTagType?: MultiSelectV2SelectionTagType
    slot?: ReactNode
    hintText?: string
    placeholder: string
    size?: SelectV2Size
    search?: SelectV2SearchConfig
    enableSelectAll?: boolean
    selectAllText?: string
    maxSelections?: number

    customTrigger?: ReactElement
    usePanelOnMobile?: boolean

    triggerDimensions?: SelectV2TriggerDimensions
    menuDimensions?: SelectV2MenuDimensions
    menuPosition?: SelectV2MenuPosition

    inline?: boolean
    onOpenChange?: (open: boolean) => void

    error?: SelectV2ErrorState

    showActionButtons?: boolean
    primaryAction?: {
        text: string
        onClick: (selectedValues: string[]) => void
        disabled?: boolean
        loading?: boolean
    }
    secondaryAction?: {
        text: string
        onClick: () => void
        disabled?: boolean
        loading?: boolean
    }
    showItemDividers?: boolean
    showHeaderBorder?: boolean

    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number
    itemsToRender?: number

    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: ReactNode
    skeleton?: SelectV2SkeletonProps
    allowCustomValue?: boolean
    customValueLabel?: string
    showClearButton?: boolean
    onClearAllClick?: () => void
    multiSelectGroupPosition?: 'center' | 'left' | 'right'
}
