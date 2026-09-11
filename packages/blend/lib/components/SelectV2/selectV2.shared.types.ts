import type {
    ReactNode,
    ReactElement,
    CSSProperties,
    KeyboardEvent,
    RefObject,
} from 'react'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import type { SkeletonVariant } from '../Skeleton/types'

// Moved to the leaf `selectV2.base.types.ts` (see its header) and
// re-exported here so existing consumers keep importing from this module.
export {
    SelectV2Alignment,
    SelectV2Variant,
    SelectV2Size,
    SelectV2Side,
} from './selectV2.base.types'
export type {
    SelectV2TooltipProps,
    SelectV2BaseItemType,
    SelectV2FlattenedItemBase,
    SelectV2ErrorState,
} from './selectV2.base.types'
import { SelectV2Alignment, SelectV2Side } from './selectV2.base.types'
export type SelectV2SkeletonProps = {
    count?: number
    show?: boolean
    variant?: SkeletonVariant
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
