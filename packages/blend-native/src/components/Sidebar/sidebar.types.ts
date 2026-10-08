import type { ReactNode } from 'react'

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
}

/** One labelled, optionally-collapsible group of nav items. */
export type SidebarSectionData = {
    label?: string
    items: SidebarNavItem[]
    /** @default true when `label` is set, otherwise the group cannot collapse. */
    isCollapsible?: boolean
    /** @default true */
    defaultOpen?: boolean
}

export type SidebarNativeProps = {
    data: SidebarSectionData[]
    /** Rendered above the nav tree, inside the header row (e.g. a logo/switcher). */
    header?: ReactNode
    /** Rendered pinned to the bottom (e.g. account/settings). */
    footer?: ReactNode

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
