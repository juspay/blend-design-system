import { SkeletonVariant } from '../Skeleton'
import { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

export enum SelectMenuAlignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

export enum SelectMenuVariant {
    CONTAINER = 'container',
    NO_CONTAINER = 'no-container',
}

export enum SelectMenuSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum SelectMenuSide {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}

export type SelectMenuGroupType = {
    groupLabel?: string
    items: SelectMenuItemType[]
    showSeparator?: boolean
}

export type SingleSelectSkeletonProps = {
    count?: number
    show?: boolean
    variant?: SkeletonVariant
}

export type SelectMenuProps = {
    trigger?: React.ReactNode
    items: SelectMenuGroupType[]
    asModal?: boolean
    alignment?: SelectMenuAlignment
    side?: SelectMenuSide
    sideOffset?: number
    alignOffset?: number
    collisonBoundaryRef?: Element | null | Array<Element | null>
    maxHeight?: number
    selected?: string | string[]
    onSelect?: (value: string | string[]) => void
    allowMultiSelect?: boolean
    enableSearch?: boolean
    onOpenChange?: (open: boolean) => void
}

export type SelectMenuItemType = {
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
    subMenu?: SelectMenuItemType[]
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

export type SingleSelectProps = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean
    helpIconText?: string
    placeholder: string
    size?: SelectMenuSize
    items: SelectMenuGroupType[]
    variant?: SelectMenuVariant
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
    useDrawerOnMobile?: boolean
    // alignment
    alignment?: SelectMenuAlignment
    side?: SelectMenuSide
    sideOffset?: number
    alignOffset?: number

    // dim
    minMenuWidth?: number
    maxMenuWidth?: number
    maxMenuHeight?: number
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
    skeleton?: SingleSelectSkeletonProps
    maxTriggerWidth?: number
    minTriggerWidth?: number
}
