import { SelectMenuGroupType, SelectMenuSize, SelectMenuVariant } from './types'
import { default as React } from 'react'
export declare enum SelectionTagType {
    COUNT = 'count',
    TEXT = 'text',
}
type SelectProps = {
    label: string
    subLabel?: string
    hintText?: string
    required?: boolean
    helpIconText?: string
    placeholder: string
    size?: SelectMenuSize
    items: SelectMenuGroupType[]
    variant?: SelectMenuVariant
    selected: string | string[]
    onSelectChange: (value: string | string[]) => void
    allowMultiSelect?: boolean
    enableSearch?: boolean
    selectionTagType?: SelectionTagType
    slot?: React.ReactNode
}
declare const Select: ({
    items,
    variant,
    label,
    subLabel,
    hintText,
    required,
    helpIconText,
    placeholder,
    size,
    selected,
    onSelectChange,
    allowMultiSelect,
    enableSearch,
    selectionTagType,
    slot,
}: SelectProps) => import('react/jsx-runtime').JSX.Element
export default Select
