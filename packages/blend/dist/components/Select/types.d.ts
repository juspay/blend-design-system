export declare enum SelectMenuAlignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}
export declare enum SelectMenuVariant {
    CONTAINER = 'container',
    NO_CONTAINER = 'no-container',
}
export declare enum SelectMenuSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}
export declare enum SelectMenuSide {
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
export declare const dummyMenuItemsLong: SelectMenuGroupType[]
