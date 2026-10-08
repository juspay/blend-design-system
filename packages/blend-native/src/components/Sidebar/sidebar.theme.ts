/**
 * Sidebar's own hardcoded design constants — deliberately NOT sourced from
 * Blend's token system (`useNativeTokens`/`SIDEBARV2`/`DIRECTORY`).
 *
 * Numbers are carried over from shadcn/ui's `Sidebar` (the widely-used web
 * reference implementation: `SIDEBAR_WIDTH`/`SIDEBAR_WIDTH_ICON`/item and
 * group-label sizing) and React Navigation's drawer navigator (the 768px
 * responsive breakpoint, which shadcn independently converges on too), not
 * invented from scratch. See the component's docblock for the fuller
 * rationale.
 */

export const SIDEBAR_METRICS = {
    /** Expanded desktop rail width. shadcn: 16rem. */
    expandedWidth: 256,
    /** Icon-only collapsed rail width. shadcn: 3rem. */
    collapsedWidth: 48,
    /** Mobile drawer width. shadcn: 18rem. */
    drawerWidth: 288,
    /** Below this window width, Sidebar presents as a drawer, not a rail. */
    mobileBreakpoint: 768,

    // shadcn's own h-8/text-sm (32px/14px) reads fine in a dense desktop
    // app, but this component also serves as primary *touch* navigation
    // (the mobile drawer) — bumped for legibility and closer to the
    // Material/HIG touch-target minimums (44-48pt) that 32px undershoots.
    itemHeight: 40,
    itemPaddingX: 10,
    itemGap: 8,
    itemRadius: 6,
    itemFontSize: 15,
    itemFontWeight: '500' as const,
    /** Weight applied to the active item's label on top of the base weight. */
    itemActiveFontWeight: '700' as const,

    groupLabelHeight: 32,
    groupLabelFontSize: 13,
    groupLabelFontWeight: '600' as const,
    groupLabelPaddingX: 10,

    sectionGap: 16,
    headerPadding: 8,
    headerGap: 8,

    /** Left indent added per nesting level. shadcn: mx-3.5. */
    nestedIndent: 14,

    /** shadcn: `duration-200 ease-linear`. */
    transitionDuration: 200,
} as const

export type SidebarPalette = {
    background: string
    foreground: string
    mutedForeground: string
    border: string
    accent: string
    accentForeground: string
}

const LIGHT_PALETTE: SidebarPalette = {
    background: '#FAFAFA',
    foreground: '#18181B',
    mutedForeground: '#71717A',
    border: '#E5E5E5',
    accent: '#F4F4F5',
    accentForeground: '#18181B',
}

const DARK_PALETTE: SidebarPalette = {
    background: '#18181B',
    foreground: '#FAFAFA',
    mutedForeground: '#A1A1AA',
    border: 'rgba(255, 255, 255, 0.1)',
    accent: '#27272A',
    accentForeground: '#FAFAFA',
}

export function getSidebarPalette(
    theme: 'light' | 'dark' | string
): SidebarPalette {
    return theme === 'dark' ? DARK_PALETTE : LIGHT_PALETTE
}
