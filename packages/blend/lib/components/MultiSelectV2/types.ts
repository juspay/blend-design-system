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
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'

export enum MultiSelectV2Variant {
    CONTAINER = 'container',
    NO_CONTAINER = 'no-container',
}

export enum MultiSelectV2Alignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

export enum MultiSelectV2Side {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}

export enum MultiSelectV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum MultiSelectV2SelectionTagType {
    COUNT = 'count',
    TEXT = 'text',
}

export type MultiSelectV2SkeletonProps = {
    count?: number
    show?: boolean
    variant?: SkeletonVariant
}

export type MultiSelectV2ItemType = {
    label: string
    value: string
    checked?: boolean
    subLabel?: string
    slot1?: ReactNode
    slot2?: ReactNode
    slot3?: ReactNode
    slot4?: ReactNode
    disabled?: boolean
    alwaysSelected?: boolean
    onClick?: () => void
    subMenu?: MultiSelectV2ItemType[]
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

export type MultiSelectV2GroupType = {
    groupLabel?: string
    items: MultiSelectV2ItemType[]
    showSeparator?: boolean
}

export type FlattenedMultiSelectV2Item = {
    id: string
    type: 'item' | 'label' | 'separator'
    item?: MultiSelectV2ItemType
    label?: string
    groupId?: number
}

export type MultiSelectV2MenuProps = {
    items: MultiSelectV2GroupType[]
    selected: string[]
    onSelect: (value: string) => void
    trigger: ReactElement
    minMenuWidth?: number
    maxMenuWidth?: number
    maxMenuHeight?: number
    disabled?: boolean
    enableSearch?: boolean
    searchPlaceholder?: string
    enableSelectAll?: boolean
    selectAllText?: string
    onSelectAll?: (
        selectAll: boolean,
        filteredItems: MultiSelectV2GroupType[]
    ) => void
    maxSelections?: number
    alignment?: MultiSelectV2Alignment
    side?: MultiSelectV2Side
    sideOffset?: number
    alignOffset?: number
    open: boolean
    onOpenChange: (open: boolean) => void
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
    skeleton?: MultiSelectV2SkeletonProps
    size?: MultiSelectV2Size
    variant?: MultiSelectV2Variant
    allowCustomValue?: boolean
    customValueLabel?: string
    menuId?: string
    collisionBoundary?: DropdownMenuContentProps['collisionBoundary']
}

export type MenuPopoverProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    disabled?: boolean
    trigger: ReactElement
    menuId?: string
    alignment: MultiSelectV2Alignment
    side: MultiSelectV2Side
    sideOffset: number
    alignOffset: number
    collisionBoundary?: DropdownMenuContentProps['collisionBoundary']
    contentStyle: CSSProperties
    onContentKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
    contentRef?: RefObject<HTMLDivElement | null>
    onInteractOutside?: (e: Event) => void
    onPointerDownOutside?: (e: Event) => void
    children: ReactNode
}

export type MultiSelectV2Props = {
    selectedValues: string[]
    onChange: (selectedValue: string) => void
    items: MultiSelectV2GroupType[]

    label: string
    subLabel?: string
    disabled?: boolean
    helpIconText?: string
    name?: string
    required?: boolean
    variant?: MultiSelectV2Variant
    selectionTagType?: MultiSelectV2SelectionTagType
    slot?: ReactNode
    hintText?: string
    placeholder: string
    size?: MultiSelectV2Size
    enableSearch?: boolean
    searchPlaceholder?: string
    enableSelectAll?: boolean
    selectAllText?: string
    maxSelections?: number

    customTrigger?: ReactElement
    usePanelOnMobile?: boolean
    maxTriggerWidth?: number
    minTriggerWidth?: number

    minPopoverWidth?: number
    maxPopoverWidth?: number
    maxPopoverHeight?: number

    alignment?: MultiSelectV2Alignment
    side?: MultiSelectV2Side
    sideOffset?: number
    alignOffset?: number

    inline?: boolean
    onBlur?: () => void
    onFocus?: () => void
    onOpenChange?: (open: boolean) => void

    error?: boolean
    errorMessage?: string

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
    fullWidth?: boolean

    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number
    itemsToRender?: number

    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: ReactNode
    skeleton?: MultiSelectV2SkeletonProps
    allowCustomValue?: boolean
    customValueLabel?: string
    showClearButton?: boolean
    onClearAllClick?: () => void
    multiSelectGroupPosition?: 'center' | 'left' | 'right'
}
