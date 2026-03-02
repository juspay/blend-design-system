import { SkeletonVariant } from '../Skeleton'
import { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

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
    slot1?: React.ReactNode
    slot2?: React.ReactNode
    slot3?: React.ReactNode
    slot4?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    subMenu?: SingleSelectV2ItemType[]
    tooltip?: string | React.ReactNode
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

    // custom trigger
    customTrigger?: React.ReactNode

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
