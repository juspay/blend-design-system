import type {
    SelectV2BaseItemType,
    SelectV2ErrorState,
    SelectV2Size,
    SelectV2Variant,
} from '../SelectV2/selectV2.base.types'

/**
 * Leaf module for the platform-neutral single-select core.
 *
 * `singleSelectV2.types.ts` re-exports everything here, so web consumers
 * are unaffected — but `lib/node.ts` imports THIS file: the full types
 * file pulls Radix and V1 Select types whose graphs reach DOM-typed
 * modules, which the React-free node entry must never see.
 */

export type SingleSelectV2ItemType = SelectV2BaseItemType & {
    subMenu?: SingleSelectV2ItemType[]
}

export type SingleSelectV2GroupType = {
    groupLabel?: string
    items: SingleSelectV2ItemType[]
    showSeparator?: boolean
}

/**
 * The platform-neutral core of `SingleSelectV2Props` — the field chrome
 * scalars, the item model and the selection contract. ReactNode slots,
 * search config, CSS dimensions, virtualization and the DOM attribute
 * spread stay in `SingleSelectV2PropsBase`/`SingleSelectV2Props`.
 */
export type SingleSelectBaseProps = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean
    helpIconText?: string
    placeholder: string
    size?: SelectV2Size
    variant?: SelectV2Variant
    items: SingleSelectV2GroupType[]
    selected: string
    onSelect: (value: string) => void
    open?: boolean
    onOpenChange?: (open: boolean) => void
    inline?: boolean
    error?: SelectV2ErrorState
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    allowCustomValue?: boolean
    customValueLabel?: string
}
