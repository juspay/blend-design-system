import type { ReactNode } from 'react'
import type { BadgeColor } from '@juspay/blend-design-system/node'

/**
 * Extra `data-*` attributes for a row or section, keyed in camelCase the way
 * react-native-web's `dataSet` expects (`{ sidebarSelected: 'true' }` renders
 * `data-sidebar-selected="true"`). Web only; ignored on iOS/Android. The
 * sidebar's own attributes (`data-element`, `data-id`, `data-status`, …) are
 * applied after these, so a consumer key can't override them.
 */
export type SidebarDataSet = Record<string, string>

/**
 * The sidebar panel's state as reported in `data-status` on web, matching
 * web `Sidebar`'s `SidebarStateChangeType`: `intermediate` is the
 * hover-preview state (see `SidebarNativeProps.isPreviewing`).
 */
export type SidebarStatus = 'expanded' | 'collapsed' | 'intermediate'

/**
 * A row's visual tier, reported in `data-path-state` on web. Same values as
 * web `Directory`'s `DirectoryItemVisualState`.
 */
export type SidebarItemVisualState =
    | 'active'
    | 'activePath'
    | 'muted'
    | 'default'

/**
 * One row in the nav tree. Mirrors the shape of web's `NavbarItem`
 * (`SidebarV2`/`Directory`), adapted to RN naming (`onPress`, not
 * `onClick`) and to this package's scope: no `href` (RN has no anchor
 * navigation — wire `onPress` to your router) and no flyout submenu for
 * nested items in icon-only mode (see `Sidebar`'s docblock).
 */
export type SidebarNavItem = {
    /**
     * Stable identifier, used for active-item matching and as the React key.
     * Falls back to `label` when omitted — provide it when sibling labels
     * can collide.
     */
    id?: string
    label: string
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    items?: SidebarNavItem[]
    onPress?: () => void
    disabled?: boolean
    /**
     * Included in `mobileBottomNav`'s flattened item list. Desktop/the
     * drawer always render every item regardless of this flag — mirrors
     * web's `NavbarItem.showOnMobile`.
     */
    showOnMobile?: boolean
    dataSet?: SidebarDataSet
}

/** One item in the secondary (tenant/workspace-switcher) icon rail. */
export type SidebarSecondaryItem = {
    label: string
    value: string
    icon: ReactNode
    badge?: {
        text: string
        /** @default BadgeColor.NEUTRAL */
        color?: BadgeColor
    }
}

/** Configures the secondary icon rail docked to the left of the main rail. */
export type SidebarSecondaryInfo = {
    items: SidebarSecondaryItem[]
    selected: string
    onSelect: (value: string) => void
    /** Pinned to the bottom of the rail (e.g. a settings/profile button). */
    footerSlot?: ReactNode
}

/** One selectable entry in the header's built-in merchant/workspace picker. */
export type SidebarMerchantItem = {
    label: string
    value: string
    icon?: ReactNode
}

/**
 * Renders a `SingleSelect` in the header in place of a custom `header` node.
 * Ignored when `header` is also provided — `header` always wins, matching
 * web's `sidebarTopSlot ?? merchantInfo` precedence.
 */
export type SidebarMerchantInfo = {
    items: SidebarMerchantItem[]
    selected: string
    onSelect: (value: string) => void
}

/** One labelled, optionally-collapsible group of nav items. */
export type SidebarSectionData = {
    label?: string
    items: SidebarNavItem[]
    /** @default true when `label` is set, otherwise the group cannot collapse. */
    isCollapsible?: boolean
    /** @default true */
    defaultOpen?: boolean
    dataSet?: SidebarDataSet
}

export type SidebarNativeProps = {
    data: SidebarSectionData[]
    /** Rendered above the nav tree, inside the header row (e.g. a logo/switcher). */
    header?: ReactNode
    /**
     * Renders a built-in `SingleSelect` merchant/workspace picker in the
     * header. Ignored when `header` is also provided.
     */
    merchantInfo?: SidebarMerchantInfo
    /** Rendered pinned to the bottom (e.g. account/settings). */
    footer?: ReactNode

    /**
     * A narrow icon rail docked to the left of the main rail (e.g. a
     * tenant/workspace switcher). Desktop/tablet only — hidden entirely in
     * the mobile drawer, matching web.
     */
    secondarySidebar?: SidebarSecondaryInfo

    /**
     * Highlights the selected item's ancestor chain (`activePath`) and mutes
     * every unrelated row, so the branch you're in reads at a glance.
     * Requires a path-valued `activeItem` (`"parent/child"`) — see
     * `SidebarNavItem.id`.
     * @default false
     */
    highlightActivePath?: boolean
    /** Draws vertical/elbow connector lines between nested items. @default false */
    showHierarchyLines?: boolean

    /**
     * Renders a floating bottom nav bar on the mobile breakpoint instead of
     * requiring the host to trigger the drawer — built from every item
     * across `data` flagged `showOnMobile`. A "More" button opens the full
     * drawer (`open`/`onOpenChange`) when there are more flagged items than
     * fit in the bar.
     * @default false
     */
    showMobileBottomNav?: boolean

    /**
     * Desktop/tablet ('lg') rail width. Ignored at the 'sm' breakpoint,
     * where `Sidebar` presents as a drawer instead of a docked rail.
     */
    isExpanded?: boolean
    onExpandedChange?: (isExpanded: boolean) => void
    /** @default true */
    defaultIsExpanded?: boolean
    /** Hides the built-in collapse/expand toggle button. */
    hideToggleButton?: boolean
    /**
     * The current expansion is a temporary preview rather than a pinned
     * state — e.g. a host that expands a collapsed rail while the pointer
     * hovers it. Changes nothing visually; it is only reported, as web
     * `Sidebar`'s hover state is: `data-status="intermediate"` on web.
     * @default false
     */
    isPreviewing?: boolean

    activeItem?: string | null
    onActiveItemChange?: (item: string | null) => void
    defaultActiveItem?: string | null

    /**
     * Mobile ('sm') drawer visibility. The drawer has no built-in trigger —
     * render your own (an `IconButton` in your screen header, typically) and
     * flip this to open it, matching how `BottomSheet`/`Modal`/`Popover`
     * work in this package.
     */
    open?: boolean
    onOpenChange?: (open: boolean) => void
    /** @default false */
    defaultOpen?: boolean
    /** Drawer width in points. @default 280 */
    drawerWidth?: number

    /**
     * Overrides the rail-vs-drawer decision, bypassing `useWindowDimensions`.
     * Pass this when the host already knows the real available width and
     * `useWindowDimensions` would be wrong — e.g. a preview harness that
     * renders its app inside a scaled-down device frame, where the window
     * reports the frame's outer size rather than the content's own layout
     * width (measure the content with `onLayout` and compare to your own
     * breakpoint instead).
     */
    isSmallScreen?: boolean

    accessibilityLabel?: string
    testID?: string
}
