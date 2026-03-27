import * as React from 'react'
import type { BreadcrumbCompoundItemProps } from './breadcrumbV2.types'

export type IndexedBreadcrumbChild = {
    el: React.ReactElement<BreadcrumbCompoundItemProps>
    idx: number
}

export function filterBreadcrumbItemChildren(
    children: React.ReactNode,
    ItemComponent: React.ComponentType<BreadcrumbCompoundItemProps>
): React.ReactElement<BreadcrumbCompoundItemProps>[] {
    return React.Children.toArray(children).filter(
        (child): child is React.ReactElement<BreadcrumbCompoundItemProps> =>
            React.isValidElement(child) && child.type === ItemComponent
    )
}

export function indexBreadcrumbChildren(
    items: React.ReactElement<BreadcrumbCompoundItemProps>[]
): IndexedBreadcrumbChild[] {
    return items.map((el, idx) => ({ el, idx }))
}

export function computeBreadcrumbOverflowLayout(
    indexed: IndexedBreadcrumbChild[],
    maxItems: number
): {
    shouldShowMenu: boolean
    base: IndexedBreadcrumbChild | undefined
    rest: IndexedBreadcrumbChild[]
    menuItems: IndexedBreadcrumbChild[]
} {
    const shouldShowMenu = indexed.length > maxItems
    const base = indexed[0]
    const rest = shouldShowMenu ? indexed.slice(-3) : indexed.slice(1)
    const menuItems = shouldShowMenu ? indexed.slice(1, indexed.length - 3) : []

    return { shouldShowMenu, base, rest, menuItems }
}

export function resolveBreadcrumbItemActive(
    idx: number,
    el: React.ReactElement<BreadcrumbCompoundItemProps>,
    totalItems: number
): boolean {
    const explicit = el.props?.isActive
    if (typeof explicit === 'boolean') return explicit
    return idx === totalItems - 1
}
