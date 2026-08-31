import type { ReactElement, ReactNode } from 'react'
import type { View as RNView } from 'react-native'
import type {
    MenuV2Alignment,
    MenuV2Side,
    MenuV2ItemType,
    MenuV2GroupType,
    MenuV2ItemVariant,
    MenuV2ItemActionType,
} from '@juspay/blend-design-system/node'

/**
 * Menu — React Native implementation of web's `MenuV2`.
 *
 * Selection is fully controlled per-item (`item.selected`); Menu manages no
 * selection state internally. Sub-menus render trailing chevrons and open
 * a nested panel positioned to the right of the item row.
 */
export type MenuNativeProps = {
    /** The element that opens the menu when pressed. */
    trigger: ReactElement
    /** Grouped items to render in the menu. */
    items?: MenuV2GroupType[]
    /** Whether the menu is open (controlled). */
    open?: boolean
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void
    /** Close the menu after an item is selected. Defaults to `true`. */
    closeOnSelect?: boolean
    /** Enable search filtering. */
    enableSearch?: boolean
    /** Placeholder for the search input. */
    searchPlaceholder?: string
    /** Alignment of the dropdown relative to the trigger. */
    alignment?: MenuV2Alignment
    /** Side of the trigger the dropdown appears on. */
    side?: MenuV2Side
    /** Gap between trigger and dropdown, in points. */
    sideOffset?: number
    /** Use a bottom sheet on small screens instead of a floating panel. */
    usePanelOnMobile?: boolean
    /** Enable virtualization for long lists. */
    enableVirtualization?: boolean
    /** Extra content rendered below the item list. */
    menuFooter?: ReactNode
    testID?: string
    accessibilityLabel?: string
    style?: import('react-native').StyleProp<import('react-native').ViewStyle>
}

export type { MenuV2ItemType as MenuItemType }
export type { MenuV2GroupType as MenuGroupType }
export type {
    MenuV2Alignment,
    MenuV2Side,
    MenuV2ItemVariant,
    MenuV2ItemActionType,
}

export type MenuRef = RNView
