import type { BreadcrumbNativeItemType } from './breadcrumb.types'

/**
 * Overflow arithmetic, adapted from web's
 * `BreadcrumbV2/utils.ts#computeBreadcrumbOverflowLayout` — but over the
 * plain item model instead of React elements, so it is testable with no
 * React runtime.
 *
 * The collapse trigger and the tail arithmetic are web-parity by default:
 * collapse when `items.length > maxItems`, and the tail keeps `maxItems - 1`
 * crumbs after the ellipsis. `minVisibleItems` (default 1) is a floor on
 * how many crumbs must REMAIN VISIBLE after a collapse: if collapsing
 * would leave fewer than `minVisibleItems` crumbs on the trail, stay
 * inline instead. Pass 3 (or your `maxItems` value) to mean "the trail
 * must always earn its `maxItems` slots" — this suppresses web's two
 * degenerate shapes:
 *   - `maxItems: 2` collapsing to just 2 visible crumbs (`Home … Last`)
 *     — fewer than you asked for;
 *   - an ellipsis hiding a single crumb where the "collapsed" trail is
 *     no shorter than the plain one.
 * (The one shape it cannot change is `maxItems: 1` — the current page is
 * never menu-only, so a single-crumb trail is legal by definition there.)
 */
export function computeBreadcrumbOverflowLayout(
    items: BreadcrumbNativeItemType[],
    maxItems: number,
    minVisibleItems = 1
): {
    shouldShowMenu: boolean
    base: BreadcrumbNativeItemType | undefined
    rest: BreadcrumbNativeItemType[]
    menuItems: BreadcrumbNativeItemType[]
} {
    const base = items[0]

    if (items.length === 0 || !Number.isFinite(maxItems) || maxItems < 1) {
        return {
            shouldShowMenu: false,
            base,
            rest: items.slice(1),
            menuItems: [],
        }
    }

    const limit = Math.floor(maxItems)

    if (items.length <= limit) {
        return {
            shouldShowMenu: false,
            base,
            rest: items.slice(1),
            menuItems: [],
        }
    }

    // Collapsed shape (web parity): first crumb + up to three trailing
    // crumbs. The tail shares the visible budget with the first crumb, but
    // always reserves at least one slot so the current page never becomes
    // menu-only.
    const desiredTailSize = 3
    // First crumb + tail share the visible "budget" (limit). `limit - 1` would be 0 when
    // maxItems is 1; still reserve at least one tail slot so the current/last segment stays
    // on the trail and is not only reachable via the overflow menu.
    const maxTailSlots = Math.max(1, limit - 1)
    const tailCount = Math.min(desiredTailSize, items.length - 1, maxTailSlots)
    // The collapsed trail is first crumb + tail. If that is fewer crumbs
    // than `minVisibleItems`, collapsing would leave a fainter trail than
    // the caller is willing to accept — stay inline instead.
    const visibleAfterCollapse = 1 + tailCount
    if (visibleAfterCollapse < Math.floor(minVisibleItems)) {
        return {
            shouldShowMenu: false,
            base,
            rest: items.slice(1),
            menuItems: [],
        }
    }
    const rest = items.slice(-tailCount)
    const menuItems = items.slice(1, items.length - tailCount)

    return { shouldShowMenu: true, base, rest, menuItems }
}

/**
 * A crumb key for React lists — same rule as web's
 * `item.id ?? \`${item.href}-${i}\``: a stable `id` when the caller
 * supplies one, position otherwise (crumb lists are append-stable by
 * nature — a mid-list insert re-keys the suffix, which is correct).
 */
export function breadcrumbItemKey(
    item: BreadcrumbNativeItemType,
    index: number
): string {
    return item.id != null ? String(item.id) : `breadcrumb-item-${index}`
}

/**
 * `accessibilityRole` for a crumb. RN has no `nav`→`ol`→`li` hierarchy;
 * the bar is announced as a group of buttons and the last crumb carries
 * `selected` state (the closest RN mapping of web's `aria-current="page"`).
 */
export function isCurrentCrumb(
    index: number,
    total: number,
    isActive?: boolean
): boolean {
    if (typeof isActive === 'boolean') return isActive
    return index === total - 1
}

/**
 * The overflow trigger's accessible name — web parity:
 * "Show N more breadcrumb items" (singular at exactly one).
 */
export function overflowMenuLabel(count: number): string {
    return `Show ${count} more breadcrumb ${count === 1 ? 'item' : 'items'}`
}
