import type { ReactNode } from 'react'
import type { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

/**
 * Leaf module for the platform-neutral select building blocks.
 *
 * `selectV2.shared.types.ts` re-exports everything here, so web consumers
 * are unaffected — but `lib/node.ts` imports THIS file: the shared types
 * file pulls Radix and Skeleton types whose graphs reach DOM-typed
 * modules, which the React-free node entry must never see.
 */

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
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export enum SelectV2Side {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
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

export type SelectV2ErrorState = {
    show?: boolean
    message?: string
}
