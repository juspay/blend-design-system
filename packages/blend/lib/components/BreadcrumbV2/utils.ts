import * as React from 'react'
import type { BreadcrumbCompoundItemProps } from './breadcrumbV2.types'

/** Collects visible text from React nodes for accessible labels (e.g. Page text inside Item). */
export function getPlainTextFromReactNode(node: React.ReactNode): string {
    if (node == null || typeof node === 'boolean') {
        return ''
    }
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node)
    }
    if (Array.isArray(node)) {
        return node
            .map(getPlainTextFromReactNode)
            .filter(Boolean)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()
    }
    if (React.isValidElement(node)) {
        const props = node.props as { children?: React.ReactNode }
        return getPlainTextFromReactNode(props.children)
    }
    return ''
}

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
    const effectiveMaxItems = Math.max(maxItems, 4)
    const shouldShowMenu = indexed.length > effectiveMaxItems
    const base = indexed[0]
    if (!shouldShowMenu) {
        return {
            shouldShowMenu,
            base,
            rest: indexed.slice(1),
            menuItems: [],
        }
    }
    // Number of trailing items to keep visible after the base item.
    const tailCount = Math.min(indexed.length - 1, effectiveMaxItems - 1)
    const rest = indexed.slice(-tailCount)
    const menuItems = indexed.slice(1, indexed.length - tailCount)

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
