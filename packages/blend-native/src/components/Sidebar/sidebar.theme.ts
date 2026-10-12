/**
 * Sidebar's own hardcoded design constants — deliberately NOT sourced from
 * Blend's token *system* (`useNativeTokens`/`SIDEBARV2`/`DIRECTORY` slots).
 * Porting that system itself isn't viable here (see the component's
 * docblock: tenant-switcher rail, hover-preview, hierarchy-line connectors,
 * a floating adaptive mobile dock — a much larger surface than this
 * component implements), but the *values* below are taken directly from
 * `SidebarV2`'s and `Directory`'s own light/dark token files
 * (`packages/blend/lib/components/SidebarV2/sidebarV2.{light,dark}.tokens.ts`,
 * `packages/blend/lib/components/Directory/directory.{light,dark}.tokens.ts`,
 * `lg` breakpoint) rather than approximated from an external reference, so
 * this rail reads as the same product's sidebar rather than a generic one.
 */

export const SIDEBAR_METRICS = {
    /** Expanded desktop rail width. `primarySidebar.width` (lg). */
    expandedWidth: 250,
    /** Icon-only collapsed rail width. `container.maxWidth.iconOnly` = unit[52]. */
    collapsedWidth: 52,
    /** Mobile drawer width — native-only surface, no web equivalent. */
    drawerWidth: 288,
    /** Below this window width, Sidebar presents as a drawer, not a rail. */
    mobileBreakpoint: 768,

    // `directory.section.itemList.item.padding.y` (6) + `body.md.lineHeight`
    // (20) = 32, web's natural row height. Undershoots the Material/HIG
    // touch-target minimum (44-48pt), but the row spans the full rail width,
    // so the tappable area is still comfortably large in practice.
    itemHeight: 32,
    itemPaddingX: 12,
    /** Icon-to-label gap. `directory.section.itemList.item.gap` (lg) is 10 —
     *  bumped a touch past that literal value for a little more breathing
     *  room between the icon and label on native (explicit product call,
     *  not a token mismatch). */
    itemGap: 12,
    /** `directory.section.itemList.item.icon.width` (lg). */
    itemIconWidth: 14,
    /** `directory.section.itemList.item.borderRadius` → `border.radius[4]`. */
    itemRadius: 4,
    /** `directory.section.itemList.item.fontSize` → `font.size.body.md`. */
    itemFontSize: 14,
    /** `directory.section.itemList.item.fontWeight` — flat; web has no
     *  separate active-item weight, selection reads entirely from color/bg. */
    itemFontWeight: '500' as const,

    /** `directory.section.header.label.fontSize` + padding.y*2, both sides. */
    groupLabelHeight: 22,
    /** `directory.section.header.label.fontSize` → `font.size.body.sm`. */
    groupLabelFontSize: 12,
    groupLabelFontWeight: '600' as const,
    /** `directory.section.header.padding.x`. */
    groupLabelPaddingX: 12,

    /** `directory.gap` — space between sections. */
    sectionGap: 24,
    /** `sidebarV2.header.paddingLeft/Right` (lg). */
    headerPaddingX: 12,
    /** `sidebarV2.header.paddingTop/Bottom` (lg). */
    headerPaddingY: 6,
    /** `sidebarV2.header.gap` (lg). */
    headerGap: 16,
    /** `sidebarV2.footer.paddingLeft/Right` (lg). */
    footerPaddingX: 12,
    /** `sidebarV2.footer.paddingTop/Bottom` (lg). */
    footerPaddingY: 16,
    /** `sidebarV2.header.toggleButton.padding` (lg). */
    toggleButtonPadding: 10,
    /** `sidebarV2.header.toggleButton.borderRadius` → `border.radius[10]`. */
    toggleButtonRadius: 10,

    /** `directory.section.itemList.nested.paddingLeft`. */
    nestedIndent: 24,
    /** Vertical gap between sibling nested rows — web ties this to the
     *  hierarchy-line geometry (`itemList.gap`); native's rows are
     *  fixed-height, so a flat constant does the same job. */
    nestedGap: 4,
    /** `directory.section.itemList.nested.border.width`. */
    connectorWidth: 1,
    /** Horizontal run of a connector's elbow. `nestedIndent - itemIconWidth/2`,
     *  i.e. from the parent's icon column to the child row's own content. */
    connectorElbowWidth: 17,

    /** `directory.section.itemList.item.transition` → `background-color 0.2s`. */
    transitionDuration: 200,

    // --- Secondary sidebar (tenant/workspace switcher) ---
    /** `sidebarV2.secondarySidebar.width` (lg). */
    secondaryWidth: 52,
    /** `sidebarV2.secondarySidebar.item.width/height` (lg). */
    secondaryItemSize: 32,
    /** `sidebarV2.secondarySidebar.item.borderRadius` (lg). */
    secondaryItemRadius: 6,
    /** `sidebarV2.secondarySidebar.gap` (lg). */
    secondaryGap: 16,
    /** `sidebarV2.secondarySidebar.paddingTop/Bottom` (lg). */
    secondaryPaddingY: 12,
    /** `sidebarV2.secondarySidebar.paddingLeft/Right` (lg). */
    secondaryPaddingX: 12,

    // --- Mobile bottom nav — native-only surface, no direct web geometry
    // port (see `SidebarMobileBottomNav`'s docblock for why). ---
    mobileNavItemSize: 56,
    mobileNavIconSize: 20,
    mobileNavFontSize: 10,
    mobileNavGap: 4,
    mobileNavRadius: 24,
    mobileNavPaddingX: 8,
    mobileNavPaddingY: 8,
} as const

export type SidebarPalette = {
    background: string
    border: string
    /** Default item text/icon color. `directory...item.color.default`. */
    foreground: string
    /** Section-label and muted-item color. `directory...header.label.color`. */
    mutedForeground: string
    /** Pressed-row feedback bg. `directory...item.backgroundColor.hover`. */
    hoverBackground: string
    /** Selected-row bg. `directory...item.backgroundColor.active`. */
    selectedBackground: string
    /** Selected-row text/icon color. Equals `foreground` in light — web's
     *  active item keeps the default text color there and marks selection
     *  with the background alone; only dark brightens the text too. */
    selectedForeground: string
    /** Toggle/icon-button pressed bg. `sidebarV2.header.toggleButton.backgroundColor.hover`. */
    controlHoverBackground: string
    /** Toggle button icon color. `sidebarV2.header.toggleButton.iconColor`. */
    controlForeground: string
    /** Accent used for the selected secondary-rail item's border and the
     *  active mobile-nav item. `primary/500`, same in both themes. */
    accent: string
    /** Selected-row text color when `highlightActivePath` marks an ancestor
     *  (not the selected row itself). Equals `foreground` in light — same
     *  "background carries the state" asymmetry as `selectedForeground`.
     *  `directory...item.color.activePath`. */
    activePathForeground: string
    /** Hierarchy connector line color (off-path). `directory...nested.border.color`. */
    connector: string
    /** Hierarchy connector line color (on the selected item's ancestor path).
     *  Equals `mutedForeground` in both themes. `...nested.border.activeColor`. */
    connectorActive: string
}

const LIGHT_PALETTE: SidebarPalette = {
    background: '#FCFCFD', // gray/25
    border: '#E1E4EA', // gray/200
    foreground: '#525866', // gray/600
    mutedForeground: '#99A0AE', // gray/400
    hoverBackground: '#F5F7FA', // gray/50
    selectedBackground: '#F5F7FA', // gray/50
    selectedForeground: '#525866', // gray/600 — unchanged from `foreground`
    controlHoverBackground: '#F2F4F8', // gray/100
    controlForeground: '#525866', // gray/600
    accent: '#2B7FFF', // primary/500
    activePathForeground: '#525866', // gray/600 — unchanged from `foreground`
    connector: '#E1E4EA', // gray/200
    connectorActive: '#99A0AE', // gray/400 — equals `mutedForeground`
}

const DARK_PALETTE: SidebarPalette = {
    background: '#181B25', // gray/900
    border: '#222530', // gray/800
    foreground: '#99A0AE', // gray/400
    mutedForeground: '#717784', // gray/500
    hoverBackground: '#222530', // gray/800
    selectedBackground: '#2B303B', // gray/700
    selectedForeground: '#F5F7FA', // gray/50 — brightens on selection
    controlHoverBackground: '#222530', // gray/800
    controlForeground: '#F2F4F8', // gray/100
    accent: '#2B7FFF', // primary/500
    activePathForeground: '#E1E4EA', // gray/200
    connector: '#2B303B', // gray/700
    connectorActive: '#717784', // gray/500 — equals `mutedForeground`
}

export function getSidebarPalette(
    theme: 'light' | 'dark' | string
): SidebarPalette {
    return theme === 'dark' ? DARK_PALETTE : LIGHT_PALETTE
}
