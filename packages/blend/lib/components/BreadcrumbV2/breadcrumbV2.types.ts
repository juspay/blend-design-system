import * as React from 'react'

export type BreadcrumbV2ItemType = {
    /** Stable unique id for React list keys when `href` may repeat or collide (e.g. dynamic routes). */
    id?: string | number
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    label: string
    href: string
    /** With `href`, prevents default navigation and runs this handler (SPA / client routing). */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Platform-neutral crumb model — the native (`blend-native`) port derives
 * its item type from this. `href` is omitted (RN apps own navigation; the
 * caller wires it through `onPress`) and there are no DOM event shapes.
 */
export type BreadcrumbBaseItemType = {
    id?: string | number
    label: string
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
}

/**
 * Platform-neutral root props — the native port derives its props from
 * these. Web's compound-children API (`Item`/`Icon`/`Page`/`Separator`
 * statics) is web-only; native takes the `items` array alone.
 */
export type BreadcrumbBaseProps = {
    /** Flat crumb list, first-to-last; the last entry is the current page. */
    items?: BreadcrumbBaseItemType[]
    /**
     * When the number of items is **greater than** this value, the bar
     * collapses to first crumb + ellipsis + trailing segment(s). At least
     * one trailing segment stays visible when overflow is active (so the
     * current page is not menu-only). Use a finite integer ≥ 1; values
     * below 1 or non-finite values disable overflow (all crumbs inline).
     */
    maxItems?: number
}

export type BreadcrumbCompoundIconProps = {
    children: React.ReactNode
}
export type BreadcrumbCompoundSeparatorProps = {
    children?: React.ReactNode
}

export type BreadcrumbCompoundItemProps = {
    href?: string
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    isActive?: boolean
    children: React.ReactNode
}

export type BreadcrumbV2Props = {
    children?: React.ReactNode
    items?: BreadcrumbV2ItemType[]
    /**
     * When the number of `Item`s (or `items` entries) is **greater than** this value,
     * the bar collapses to first crumb + ellipsis + trailing segment(s). At least one
     * trailing segment stays visible when overflow is active (so the current page is not
     * menu-only). Use a finite integer ≥ 1; values below 1 or non-finite values disable
     * overflow (all crumbs inline).
     */
    maxItems?: number
}
