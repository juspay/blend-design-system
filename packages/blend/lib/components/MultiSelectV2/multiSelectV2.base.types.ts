import type {
    SelectV2BaseItemType,
    SelectV2ErrorState,
    SelectV2FlattenedItemBase,
    SelectV2Size,
    SelectV2Variant,
} from '../SelectV2/selectV2.base.types'

/**
 * Leaf module for the platform-neutral multi-select core.
 *
 * `multiSelectV2.types.ts` re-exports everything here, so web consumers
 * are unaffected — but `lib/node.ts` (and the mobile flatten util) import
 * THIS file: the full types file pulls Radix types whose graphs reach
 * DOM-typed modules, which the React-free node entry must never see.
 */

export enum MultiSelectV2SelectionTagType {
    COUNT = 'count',
    TEXT = 'text',
}

export type MultiSelectV2ItemType = SelectV2BaseItemType & {
    alwaysSelected?: boolean
    subMenu?: MultiSelectV2ItemType[]
}

export type MultiSelectV2GroupType = {
    groupLabel?: string
    items: MultiSelectV2ItemType[]
    showSeparator?: boolean
}

export type FlattenedMultiSelectV2Item =
    SelectV2FlattenedItemBase<MultiSelectV2ItemType>

export type MultiSelectV2PrimaryAction = {
    text: string
    onClick: (selectedValues: string[]) => void
    disabled?: boolean
    loading?: boolean
}

export type MultiSelectV2SecondaryAction = {
    text: string
    onClick: () => void
    disabled?: boolean
    loading?: boolean
}

/**
 * The platform-neutral core of `MultiSelectV2Props` — the field chrome
 * scalars, the item model, the selection contract and the (already
 * neutral) action objects. The legacy `onChange`, ReactNode slots, search
 * config, CSS dimensions, virtualization and the DOM attribute spread
 * stay in `MultiSelectV2Props`.
 */
export type MultiSelectBaseProps = {
    selectedValues: string[]
    onSelectionChange?: (selectedValues: string[]) => void
    items?: MultiSelectV2GroupType[]
    label: string
    subLabel?: string
    helpIconText?: string
    required?: boolean
    variant?: SelectV2Variant
    selectionTagType?: MultiSelectV2SelectionTagType
    hintText?: string
    placeholder: string
    size?: SelectV2Size
    enableSelectAll?: boolean
    selectAllText?: string
    maxSelections?: number
    inline?: boolean
    onOpenChange?: (open: boolean) => void
    error?: SelectV2ErrorState
    showActionButtons?: boolean
    primaryAction?: MultiSelectV2PrimaryAction
    secondaryAction?: MultiSelectV2SecondaryAction
    showItemDividers?: boolean
    showHeaderBorder?: boolean
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    allowCustomValue?: boolean
    customValueLabel?: string
    showClearButton?: boolean
    onClearAllClick?: () => void
}
