import { default as React } from 'react'
import {
    SelectMenuAlignment,
    SelectMenuSide,
    SelectMenuGroupType,
} from '../Select'
type SingleSelectMenuProps = {
    items: SelectMenuGroupType[]
    selected: string
    onSelect: (value: string) => void
    trigger: React.ReactNode
    minWidth?: number
    maxWidth?: number
    maxHeight?: number
    enableSearch?: boolean
    alignment?: SelectMenuAlignment
    side?: SelectMenuSide
    sideOffset?: number
    alignOffset?: number
    open: boolean
    onOpenChange: (open: boolean) => void
}
declare const SingleSelectMenu: ({
    items,
    selected,
    onSelect,
    trigger,
    minWidth,
    maxWidth,
    maxHeight,
    enableSearch,
    alignment,
    side,
    sideOffset,
    alignOffset,
    open,
    onOpenChange,
}: SingleSelectMenuProps) => import('react/jsx-runtime').JSX.Element
export default SingleSelectMenu
