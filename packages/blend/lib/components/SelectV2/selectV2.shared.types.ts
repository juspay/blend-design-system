import type {
    ReactNode,
    ReactElement,
    CSSProperties,
    KeyboardEvent,
    RefObject,
} from 'react'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import type { SkeletonVariant } from '../Skeleton'
import type { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

export enum SelectV2Alignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

export enum SelectV2Variant {
    CONTAINER = 'container',
    NO_CONTAINER = 'no-container',
}

export enum SelectV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum SelectV2Side {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}
export type SelectV2SkeletonProps = {
    count?: number
    show?: boolean
    variant?: SkeletonVariant
}

export type SelectV2TooltipProps = {
    side?: TooltipSide
    align?: TooltipAlign
    size?: TooltipSize
    showArrow?: boolean
    delayDuration?: number
    offset?: number
}

export type SelectV2BaseItemType = {
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
    tooltip?: string | ReactNode
    tooltipProps?: SelectV2TooltipProps
    disableTruncation?: boolean
}

export type SelectV2FlattenedItemBase<T = unknown> = {
    id: string
    type: 'item' | 'label' | 'separator'
    item?: T
    label?: string
    groupId?: number
}

export type SelectV2PopoverPositioningProps = {
    alignment?: SelectV2Alignment
    side?: SelectV2Side
    sideOffset?: number
    alignOffset?: number
    collisionBoundary?: DropdownMenuContentProps['collisionBoundary']
    minPopoverWidth?: number
    maxPopoverWidth?: number
    maxPopoverHeight?: number
}

export type SelectV2VirtualizationProps = {
    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number
}

export type SelectV2InfiniteScrollProps = {
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: ReactNode
}

export type SelectV2MenuRootPropsBase = {
    open: boolean
    onOpenChange: (open: boolean) => void
    disabled?: boolean
    trigger: ReactElement
    menuId?: string
    alignment: SelectV2Alignment
    side: SelectV2Side
    sideOffset: number
    alignOffset: number
    collisionBoundary?: DropdownMenuContentProps['collisionBoundary']
    contentStyle: CSSProperties
    onContentKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
    contentRef?: RefObject<HTMLDivElement | null>
    children: ReactNode
}
