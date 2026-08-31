import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
    MenuBaseProps,
    MenuV2ItemType,
} from '@juspay/blend-design-system/node'

/**
 * The native menu item — web's `MenuV2ItemType` with the platform pieces
 * swapped:
 *
 * - `onClick` becomes `onPress` (the RN convention; both are `() => void`).
 * - Per-item `tooltip`/`tooltipProps` are omitted — web anchors them on
 *   hover, and on touch a long-press tooltip would collide with row
 *   presses and the sheet drag.
 * - Sub-menu search callbacks are omitted with the push-in pane keeping a
 *   single search field at its top level.
 *
 * Everything else (label with `leftSlot`, `subLabel`, `variant`,
 * `actionType`, `disabled`, controlled `selected`, `subMenu`) ports as-is,
 * so a native item remains structurally assignable to `MenuV2ItemType` and
 * the node-exported filter/flatten utils work unchanged.
 */
export type MenuItemType = Omit<
    MenuV2ItemType,
    | 'onClick'
    | 'subMenu'
    | 'tooltip'
    | 'tooltipProps'
    | 'enableSubMenuSearch'
    | 'subMenuSearchPlaceholder'
    | 'subMenuSearchSortFn'
    | 'onSubMenuSearchEnter'
> & {
    onPress?: () => void
    subMenu?: MenuItemType[]
}

export type MenuGroupType = {
    id?: string
    label?: string
    items: MenuItemType[]
    showSeparator?: boolean
    selectionStyle?: MenuBaseProps['selectionStyle']
    selectionMode?: MenuBaseProps['selectionMode']
}

/**
 * Props for the native `Menu` — the port of web's `MenuV2`.
 *
 * Derives from `MenuBaseProps`. **Docblocked divergence:** web's Menu is an
 * anchored dropdown at every size; native presents phones (`sm`) a bottom
 * sheet — consistent with Popover and the Selects — and tablets (`lg`) the
 * anchored surface. Selection stays fully controlled by the caller (web
 * parity): the menu never manages `selected`.
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 *
 * - `enableVirtualScrolling`/`virtualScrolling` — the list IS a FlatList,
 *   which is inherently windowed; `@tanstack/react-virtual` has no native
 *   role.
 * - `asModal`, `collisionBoundaryRef`, `triggerProps` — DOM concepts; the
 *   anchored surface always captures outside taps and clamps to the
 *   viewport.
 * - CSS `dimensions` — replaced by the number fields below (`lg` only).
 */
export type MenuNativeProps = Omit<
    MenuBaseProps,
    'items' | 'searchSortFn' | 'onEnter'
> & {
    /** The anchor. Press opens the menu. */
    trigger: React.ReactNode
    items?: MenuGroupType[]
    searchSortFn?: (items: MenuItemType[], searchText: string) => MenuItemType[]
    onEnter?: (searchText: string, filteredGroups: MenuGroupType[]) => void
    /** Sheet-mode height cap as a window fraction. Default 0.9. */
    maxHeightFraction?: number
    minWidth?: number
    maxWidth?: number
    maxHeight?: number
    testID?: string
    /** Styles the menu surface (both presentations). */
    style?: StyleProp<ViewStyle>
}
