import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
    SingleSelectBaseProps,
    SingleSelectV2ItemType,
} from '@juspay/blend-design-system/node'

/**
 * The native select option — web's item with the platform pieces swapped:
 * `onClick` becomes `onPress`, and `subMenu`/`tooltip`/`tooltipProps`/
 * `disableTruncation` are omitted. Sub-menus are flattened away — web's
 * own mobile panel flattens groups too, and one consistent item model
 * beats a tablet-only nesting (docblocked divergence).
 */
export type SingleSelectItemType = Omit<
    SingleSelectV2ItemType,
    'onClick' | 'subMenu' | 'tooltip' | 'tooltipProps' | 'disableTruncation'
> & {
    onPress?: () => void
}

export type SingleSelectGroupType = {
    groupLabel?: string
    items: SingleSelectItemType[]
    showSeparator?: boolean
}

/**
 * Props for the native `SingleSelect` — the port of web's `SingleSelectV2`.
 *
 * Derives from `SingleSelectBaseProps`. Phones (`sm`) get the flat bottom
 * panel web's `usePanelOnMobile` prescribes (the prop itself omitted —
 * the breakpoint decides); tablets (`lg`) an anchored dropdown under the
 * trigger.
 *
 * Deliberately omitted rather than accepted-and-ignored: the
 * virtualization trio (the list IS a FlatList), `skeleton` (Wave-C-wide),
 * `helpIconText` (needs Tooltip-in-label), `singleSelectGroupPosition`
 * (no grouped-trigger composition yet), `menuPosition`/CSS dimensions
 * (replaced by the number fields below, `lg` only), and web's
 * DOM-attribute spread. `search` is a plain `{ show, placeholder }` —
 * web's controlled search-config carries V1 Select DOM types.
 */
export type SingleSelectNativeProps = Omit<
    SingleSelectBaseProps,
    'items' | 'helpIconText'
> & {
    items: SingleSelectGroupType[]
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
