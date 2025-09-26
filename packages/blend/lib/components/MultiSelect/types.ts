import { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

export enum MultiSelectVariant {
    CONTAINER = 'container',
    NO_CONTAINER = 'no-container',
}

export enum MultiSelectMenuAlignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

export enum MultiSelectMenuSide {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}

export enum MultiSelectMenuSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum MultiSelectSelectionTagType {
    COUNT = 'count',
    TEXT = 'text',
}

export type MultiSelectMenuItemType = {
    label: string
    value: string
    checked?: boolean
    subLabel?: string
    slot1?: React.ReactNode
    slot2?: React.ReactNode
    slot3?: React.ReactNode
    slot4?: React.ReactNode
    disabled?: boolean
    alwaysSelected?: boolean
    onClick?: () => void
    subMenu?: MultiSelectMenuItemType[]
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

export type MultiSelectMenuGroupType = {
    groupLabel?: string
    items: MultiSelectMenuItemType[]
    showSeparator?: boolean
}

export type MultiSelectProps = {
    height?: number
    selectedValues: string[]
    onChange: (selectedValue: string) => void
    items: MultiSelectMenuGroupType[]

    // labels
    label: string
    sublabel?: string
    disabled?: boolean
    helpIconHintText?: string
    name?: string
    required?: boolean
    variant?: MultiSelectVariant
    selectionTagType?: MultiSelectSelectionTagType
    slot?: React.ReactNode
    hintText?: string
    placeholder: string
    size?: MultiSelectMenuSize
    enableSearch?: boolean
    searchPlaceholder?: string
    enableSelectAll?: boolean
    selectAllText?: string

    maxSelections?: number

    // custom trigger
    customTrigger?: React.ReactNode

    // responsive behavior
    useDrawerOnMobile?: boolean

    // dim
    minMenuWidth?: number
    maxMenuWidth?: number
    maxMenuHeight?: number

    // alignment
    alignment?: MultiSelectMenuAlignment
    side?: MultiSelectMenuSide
    sideOffset?: number
    alignOffset?: number

    // inline
    inline?: boolean
    onBlur?: () => void
    onFocus?: () => void

    // error
    error?: boolean
    errorMessage?: string

    // action buttons
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
}

// Multi Select Menu Dropdpown
export type MultiSelectMenuProps = {
    items: MultiSelectMenuGroupType[]
    selected: string[]
    onSelect: (value: string) => void
    trigger: React.ReactNode
    minMenuWidth?: number
    maxMenuWidth?: number
    maxMenuHeight?: number
    disabled?: boolean
    enableSearch?: boolean
    searchPlaceholder?: string
    enableSelectAll?: boolean
    selectAllText?: string
    onSelectAll?: (selectAll: boolean) => void

    maxSelections?: number

    // alignment
    alignment?: MultiSelectMenuAlignment
    side?: MultiSelectMenuSide
    sideOffset?: number
    alignOffset?: number

    // open
    open: boolean
    onOpenChange: (open: boolean) => void

    // action buttons
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
}
