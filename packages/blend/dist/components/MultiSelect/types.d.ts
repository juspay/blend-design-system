export declare enum MultiSelectVariant {
    CONTAINER = 'container',
    NO_CONTAINER = 'no-container',
}
export declare enum MultiSelectMenuAlignment {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}
export declare enum MultiSelectMenuSide {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}
export declare enum MultiSelectMenuSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}
export declare enum MultiSelectSelectionTagType {
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
    onClick?: () => void
    subMenu?: MultiSelectMenuItemType[]
}
export type MultiSelectMenuGroupType = {
    groupLabel?: string
    items: MultiSelectMenuItemType[]
    showSeparator?: boolean
}
export type MultiSelectProps = {
    selectedValues: string[]
    onChange: (selectedValue: string) => void
    items: MultiSelectMenuGroupType[]
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
    minWidth?: number
    maxWidth?: number
    maxHeight?: number
    alignment?: MultiSelectMenuAlignment
    side?: MultiSelectMenuSide
    sideOffset?: number
    alignOffset?: number
}
export type MultiSelectMenuProps = {
    items: MultiSelectMenuGroupType[]
    selected: string[]
    onSelect: (value: string) => void
    trigger: React.ReactNode
    minWidth?: number
    maxWidth?: number
    maxHeight?: number
    alignment?: MultiSelectMenuAlignment
    side?: MultiSelectMenuSide
    sideOffset?: number
    alignOffset?: number
    open: boolean
    onOpenChange: (open: boolean) => void
}
