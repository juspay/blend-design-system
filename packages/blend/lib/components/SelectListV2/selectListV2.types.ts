import type { ReactNode } from 'react'
import type { CSSObject } from 'styled-components'
import type {
    SelectV2BaseItemType,
    SelectV2Size,
    SelectV2SkeletonProps,
    SelectV2Variant,
} from '../SelectV2/selectV2.shared.types'
import type { SelectV2MenuItemTokensBase } from '../SelectV2/types'
import type { SelectV2SearchConfig } from '../SingleSelectV2/singleSelectV2.types'
import type { SingleSelectV2GroupType } from '../SingleSelectV2/singleSelectV2.types'
import type { MultiSelectV2GroupType } from '../MultiSelectV2/multiSelectV2.types'

export type { SelectV2SearchConfig as SelectListV2SearchConfig }

/**
 * Structural supertype of `SingleSelectV2ItemType` and `MultiSelectV2ItemType`,
 * so both dropdown item models flow into the shared list renderer unchanged.
 */
export type SelectListV2ItemType = SelectV2BaseItemType & {
    alwaysSelected?: boolean
    subMenu?: SelectListV2ItemType[]
}

export type SelectListV2GroupType = {
    groupLabel?: string
    items: SelectListV2ItemType[]
    showSeparator?: boolean
}

/** A flattened, render-ready row. `id` also satisfies `VirtualListItem`. */
export type SelectListV2Row =
    | { id: string; kind: 'label'; label: string; groupIndex: number }
    | { id: string; kind: 'separator'; groupIndex: number }
    | {
          id: string
          kind: 'item'
          item: SelectListV2ItemType
          /** Ordinal among item rows only; drives roving focus and `aria-posinset`. */
          itemIndex: number
          groupIndex: number
      }

/**
 * Normalized chrome tokens. SingleSelectV2 and MultiSelectV2 name their menu
 * tokens differently (`groupLabelText`/`optionsLabel`, `separator`/`seperator`),
 * so each list adapts its own slot into this shape and the row renderer stays
 * mode-agnostic.
 */
export type SelectListV2ChromeTokens = {
    itemTokens: SelectV2MenuItemTokensBase
    groupLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
    }
    separator: {
        height: CSSObject['height']
        color: CSSObject['backgroundColor']
        margin: CSSObject['margin']
    }
    listPadding: {
        top: CSSObject['paddingTop']
        right: CSSObject['paddingRight']
        bottom: CSSObject['paddingBottom']
        left: CSSObject['paddingLeft']
    }
    emptyStateColor: CSSObject['color']
    gap: CSSObject['gap']
}

export type SelectListV2BaseProps = {
    /**
     * Renders a form label above the list and names the listbox. Use
     * `aria-label` instead when the list is already labelled by surrounding
     * UI. Providing neither leaves the listbox unnamed and emits a one-time
     * development warning.
     */
    label?: string
    'aria-label'?: string
    name?: string
    /** Disables every row, the search input and the select-all control. */
    disabled?: boolean
    size?: SelectV2Size
    variant?: SelectV2Variant
    /**
     * Same controlled/uncontrolled search contract as the dropdown selects.
     * Providing `searchText` switches off internal filtering.
     */
    search?: SelectV2SearchConfig
    /** Caps the scroll viewport. Also sets the virtualized viewport height. */
    maxHeight?: number
    /** Auto-enables virtualization above 20 options; pass false to opt out. */
    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number

    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    /** True while the consumer is fetching the next page. */
    isLoadingMore?: boolean
    loadingComponent?: ReactNode
    /** Replaces the whole body; zero tab stops, `aria-busy="true"`. */
    skeleton?: SelectV2SkeletonProps

    allowCustomValue?: boolean
    customValueLabel?: string
}

export type SelectListV2Props = SelectListV2BaseProps & {
    items: SingleSelectV2GroupType[]
    selected: string
    onSelect: (value: string) => void
    /** Lets a second activation of the selected option clear the selection. */
    allowDeselect?: boolean
}

export type MultiSelectListV2Props = SelectListV2BaseProps & {
    items: MultiSelectV2GroupType[]
    selectedValues: string[]
    /**
     * Legacy per-item toggle callback, matching `MultiSelectV2`. Prefer
     * `onSelectionChange` for the complete resulting selection.
     */
    onChange?: (value: string | string[]) => void
    /** Fires once per accepted gesture with the complete resulting selection. */
    onSelectionChange?: (selectedValues: string[]) => void
    enableSelectAll?: boolean
    selectAllText?: string
    /** Adds an explicit clear-all action below the select-all row. */
    showClearAll?: boolean
    clearAllText?: string
    /**
     * Replaces the default clear-all behaviour of emptying the selection.
     *
     * This is a full override: neither `onChange` nor `onSelectionChange` fires
     * when it is supplied, unlike every other gesture. Because `selectedValues`
     * is controlled, you own clearing it — if you do not, the button appears
     * inert.
     */
    onClearAll?: () => void
    maxSelections?: number
}
