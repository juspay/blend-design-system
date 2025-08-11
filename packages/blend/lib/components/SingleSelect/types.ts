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
}

export type SingleSelectProps = {
    label: string
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
    slot?: React.ReactNode
    disabled?: boolean
    name?: string
    // responsive behavior
    useDrawerOnMobile?: boolean
    // alignment
    alignment?: SelectMenuAlignment
    side?: SelectMenuSide
    sideOffset?: number
    alignOffset?: number

    // dim
    minWidth?: number
    maxWidth?: number
    maxHeight?: number
    inline?: boolean
    onBlur?: () => void
    onFocus?: () => void

    // error
    error?: boolean
    errorMessage?: string
}
