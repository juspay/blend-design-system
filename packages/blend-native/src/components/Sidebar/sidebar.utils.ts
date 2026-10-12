import type { SidebarNavItem, SidebarSectionData } from './sidebar.types'

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
