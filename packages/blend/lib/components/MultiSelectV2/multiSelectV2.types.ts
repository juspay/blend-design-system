import type { ReactNode, ReactElement, ButtonHTMLAttributes } from 'react'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import type {
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

// Moved to the leaf `multiSelectV2.base.types.ts` (see its header) and
// re-exported here so existing consumers keep importing from this module.
export { MultiSelectV2SelectionTagType } from './multiSelectV2.base.types'
export type {
    MultiSelectV2ItemType,
    MultiSelectV2GroupType,
    FlattenedMultiSelectV2Item,
    MultiSelectV2PrimaryAction,
    MultiSelectV2SecondaryAction,
    MultiSelectBaseProps,
} from './multiSelectV2.base.types'
import type {
    MultiSelectV2GroupType,
    MultiSelectBaseProps,
} from './multiSelectV2.base.types'

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
    menuFooter?: ReactNode
}

export type MultiSelectV2MenuRootProps = SelectV2MenuRootPropsBase & {
    onInteractOutside?: (e: Event) => void
    onPointerDownOutside?: (e: Event) => void
}

export type MultiSelectV2Props = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'style' | 'className' | 'onChange' | 'slot'
> &
    MultiSelectBaseProps & {
        /**
         * Legacy per-item toggle callback. Prefer `onSelectionChange` for
         * the complete resulting selection.
         */
        onChange?: (value: string | string[]) => void
        slot?: ReactNode
        search?: SelectV2SearchConfig

        customTrigger?: ReactElement
        usePanelOnMobile?: boolean

        triggerDimensions?: SelectV2TriggerDimensions
        menuDimensions?: SelectV2MenuDimensions
        menuPosition?: SelectV2MenuPosition

        enableVirtualization?: boolean
        virtualListItemHeight?: number
        virtualListOverscan?: number
        itemsToRender?: number

        loadingComponent?: ReactNode
        skeleton?: SelectV2SkeletonProps
        multiSelectGroupPosition?: 'center' | 'left' | 'right'
        menuFooter?: ReactNode
    }
