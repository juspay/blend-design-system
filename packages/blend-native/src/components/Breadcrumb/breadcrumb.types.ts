import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { BreadcrumbBaseItemType } from '@juspay/blend-design-system/node'

/**
 * The native crumb — web's `BreadcrumbV2ItemType` with the platform pieces
 * swapped:
 *
 * - `href` is omitted — RN apps own navigation; wire it through `onPress`
 *   (the `LinkButton` precedent: `onPress`-only, navigation is the app's
 *   job).
 * - DOM `onClick` becomes `onPress` (no anchor, no MouseEvent shape).
 * - `isActive` is additive, mirroring web's compound `Item` prop, for
 *   callers whose "current page" is not the last entry.
 *
 * Everything else ports as-is, so a native item remains structurally
 * assignable to the node-exported `BreadcrumbBaseItemType`.
 */
export type BreadcrumbNativeItemType = BreadcrumbBaseItemType & {
    onPress?: () => void
    /** Overrides the "last entry is current" default. */
    isActive?: boolean
}

/**
 * Props for the native `Breadcrumb` — the port of web's `BreadcrumbV2`.
 *
 * Web offers two APIs (the `items` array, or the `Item`/`Icon`/`Page`/
 * `Separator` compound children); native takes the array alone — the
 * compound statics are a DOM-API convenience with no RN counterpart.
 * Overflow collapses to first crumb + ellipsis (a native `Menu`) +
 * trailing segment(s). `maxItems` and `minVisibleItems` together control
 * whether and how the trail truncates.
 */
export type BreadcrumbNativeProps = {
    /** Flat crumb list, first-to-last; the last entry is the current page. */
    items?: BreadcrumbNativeItemType[]
    /**
     * When the number of items is **greater than** this value, the bar
     * collapses to first crumb + ellipsis + trailing segment(s). At least
     * one trailing segment stays visible when overflow is active (so the
     * current page is not menu-only). Use a finite integer ≥ 1; values
     * below 1 or non-finite values disable overflow (all crumbs inline).
     * Defaults to 4, like web.
     */
    maxItems?: number
    /**
     * A floor on how many crumbs must **remain visible** after a collapse.
     * If collapsing would leave fewer than this many crumbs on the trail,
     * the bar stays inline instead. Defaults to 1 (web parity — collapse
     * is gated only by `maxItems`). Pass your `maxItems` value to mean
     * "the collapsed trail must always earn its slots": this suppresses
     * web's aggressive shapes, e.g. `maxItems: 2` collapsing 6 crumbs to
     * just `Home … Current page` (2 visible, fewer than the 2 you asked
     * for plus no more), or a single-crumb trail at `maxItems: 1`.
     */
    minVisibleItems?: number
    /** Replaces "/" as the crumb separator. */
    separator?: React.ReactNode
    /** Announced by screen readers for the whole bar. */
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
