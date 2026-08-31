import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
    MultiSelectBaseProps,
    MultiSelectV2ItemType,
} from '@juspay/blend-design-system/node'

/**
 * The native multi-select option — web's item with the platform pieces
 * swapped, exactly the SingleSelect treatment: `onClick` becomes
 * `onPress`; `subMenu`/`tooltip`/`tooltipProps`/`disableTruncation` are
 * omitted (sub-menus flattened away — web's own mobile panel flattens
 * too). `alwaysSelected` ports as-is.
 */
export type MultiSelectItemType = Omit<
    MultiSelectV2ItemType,
    'onClick' | 'subMenu' | 'tooltip' | 'tooltipProps' | 'disableTruncation'
> & {
    onPress?: () => void
}

export type MultiSelectGroupType = {
    groupLabel?: string
    items: MultiSelectItemType[]
    showSeparator?: boolean
}

/**
 * Props for the native `MultiSelect` — the port of web's `MultiSelectV2`.
 *
 * Derives from `MultiSelectBaseProps`; the action objects are web's own
 * (already platform-neutral, `onClick` name kept for base parity). The
 * surface stays open on toggle and reports one `onSelectionChange` per
 * accepted gesture.
 *
 * Deliberately omitted rather than accepted-and-ignored: the legacy
 * `onChange` (native ships only `onSelectionChange` — no legacy consumers
 * to migrate), the virtualization trio + `itemsToRender` (FlatList),
 * `skeleton` (Wave-C-wide), `helpIconText` (needs Tooltip),
 * `multiSelectGroupPosition` (no grouped-trigger composition),
 * `usePanelOnMobile` (the breakpoint decides), CSS dimensions (numbers
 * below, `lg` only) and the DOM spread. `search` is the plain
 * `{ show, placeholder }` pair.
 */
export type MultiSelectNativeProps = Omit<
    MultiSelectBaseProps,
    'items' | 'helpIconText'
> & {
    items?: MultiSelectGroupType[]
    open?: boolean
    search?: { show?: boolean; placeholder?: string }
    slot?: React.ReactNode
    /** Replaces the built-in trigger surface (label/footer kept). */
    customTrigger?: React.ReactNode
    disabled?: boolean
    loadingComponent?: React.ReactNode
    menuFooter?: React.ReactNode
    /** Sheet-mode height cap as a window fraction. Default 0.9. */
    maxHeightFraction?: number
    minWidth?: number
    maxWidth?: number
    maxHeight?: number
    testID?: string
    style?: StyleProp<ViewStyle>
}
