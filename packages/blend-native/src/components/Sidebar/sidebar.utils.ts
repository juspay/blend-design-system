import type {
    SidebarDataSet,
    SidebarItemVisualState,
    SidebarNavItem,
    SidebarSectionData,
    SidebarStatus,
} from './sidebar.types'

/**
 * True when `itemPath` is a strict ancestor of the selected item. Mirrors
 * web's `Directory`/`isActiveAncestorPath` — itemPath segments are
 * "/"-joined and ids may not contain "/", so ancestry is a prefix test
 * rather than a tree walk.
 */
export function isActiveAncestorPath(
    itemPath: string,
    activeItem: string | null | undefined
): boolean {
    return (
        !!activeItem &&
        activeItem !== itemPath &&
        activeItem.startsWith(`${itemPath}/`)
    )
}

/**
 * Flattens every item across `data` (nested items included) that opts into
 * the mobile bottom nav via `showOnMobile` — the native analogue of web's
 * `getSidebarV2MobileNavigationItems`. Order follows section/item order;
 * sections themselves carry no weight here since the bar renders a flat row.
 */
export function flattenMobileNavItems(
    data: SidebarSectionData[]
): SidebarNavItem[] {
    const result: SidebarNavItem[] = []

    const visit = (items: SidebarNavItem[]) => {
        for (const item of items) {
            if (item.showOnMobile) result.push(item)
            if (item.items && item.items.length > 0) visit(item.items)
        }
    }

    for (const section of data) {
        visit(section.items)
    }

    return result
}

/**
 * Mirrors web `Directory`'s `getItemVisualState`: `activePath`/`muted` only
 * apply once `highlightActivePath` is on and something is selected, so the
 * default is the plain two-tier (`active`/`default`) behaviour.
 */
export function getItemVisualState({
    isSelected,
    itemPath,
    activeItem,
    highlightActivePath,
}: {
    isSelected: boolean
    itemPath: string
    activeItem: string | null | undefined
    highlightActivePath: boolean
}): SidebarItemVisualState {
    if (isSelected) return 'active'
    if (!highlightActivePath || !activeItem) return 'default'
    return isActiveAncestorPath(itemPath, activeItem) ? 'activePath' : 'muted'
}

/**
 * Mirrors web `Sidebar`'s `getSidebarStatus`: a preview wins over the
 * pinned state, exactly as web's hover does.
 */
export function getSidebarStatus(
    isExpanded: boolean,
    isPreviewing: boolean
): SidebarStatus {
    if (isPreviewing) return 'intermediate'
    return isExpanded ? 'expanded' : 'collapsed'
}

// The `data-*` attributes below are the ones web `Sidebar` (V1) and
// `Directory` render, with the same values, so selectors and automation
// written against the web sidebar match this one when it runs on
// react-native-web. Keys are camelCase because react-native-web hyphenates
// `dataSet` keys (`pathState` → `data-path-state`).

/** The sidebar root — web `Sidebar`'s `<nav>`. */
export function getSidebarRootDataSet(status: SidebarStatus): SidebarDataSet {
    return { sidebar: 'sidebar', status }
}

/** The collapse/expand toggle — web `SidebarHeader`'s toggle button. */
export const SIDEBAR_TOGGLE_DATA_SET: SidebarDataSet = {
    icon: 'sidebar-hamburger',
}

/**
 * A section container — web `Directory`'s `Section`. Unlabelled sections get
 * web's positional `section-<index>` id.
 */
export function getSectionDataSet({
    section,
    index,
    isOpen,
}: {
    section: SidebarSectionData
    index: number
    isOpen: boolean
}): SidebarDataSet {
    return {
        ...section.dataSet,
        element: 'sidebar-section',
        id: section.label || `section-${index}`,
        status: isOpen ? 'expanded' : 'collapsed',
        state: isOpen ? 'open' : 'closed',
    }
}

/**
 * A nav row — web `Directory`'s `NavItem`. `data-id` is the row's own path
 * segment (`id`, falling back to `label`), not its full path, as on web.
 * `data-sidebar-expanded` is only set on a row whose children can open,
 * which excludes the icon-only rail.
 */
export function getItemDataSet({
    item,
    isSelected,
    visualState,
    hasChildren,
    iconOnlyMode,
    isExpanded,
}: {
    item: SidebarNavItem
    isSelected: boolean
    visualState: SidebarItemVisualState
    hasChildren: boolean
    iconOnlyMode: boolean
    isExpanded: boolean
}): SidebarDataSet {
    const dataSet: SidebarDataSet = {
        ...item.dataSet,
        element: 'sidebar-sub-section',
        // `||`, not `??` — web's `getItemPathSegment`, empty id included.
        id: item.id || item.label,
        status: isSelected ? 'selected' : 'not selected',
        pathState: visualState,
    }
    if (hasChildren && !iconOnlyMode) {
        dataSet.sidebarExpanded = String(isExpanded)
    }
    return dataSet
}
