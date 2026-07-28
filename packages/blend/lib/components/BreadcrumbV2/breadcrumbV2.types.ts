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
