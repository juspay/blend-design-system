import {
    SelectMenuAlignment,
    SelectMenuSide,
    SelectMenuGroupType,
    SelectMenuSize,
    SelectMenuVariant,
} from '../Select'
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
    alignment?: SelectMenuAlignment
    side?: SelectMenuSide
    sideOffset?: number
    alignOffset?: number
    minWidth?: number
    maxWidth?: number
    maxHeight?: number
}
