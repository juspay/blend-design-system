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
    const base = indexed[0]

    if (indexed.length === 0 || !Number.isFinite(maxItems) || maxItems < 1) {
        return {
            shouldShowMenu: false,
            base,
            rest: indexed.slice(1),
            menuItems: [],
        }
    }

    const limit = Math.floor(maxItems)
    const shouldShowMenu = indexed.length > limit
    if (!shouldShowMenu) {
        return {
            shouldShowMenu,
            base,
            rest: indexed.slice(1),
            menuItems: [],
        }
    }
    const desiredTailSize = 3
    const tailCount = Math.min(desiredTailSize, indexed.length - 1, limit - 1)
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

/**
 * Native event for {@link createStubAnchorClickEvent}. Uses real MouseEvent in DOM;
 * minimal object elsewhere so SSR does not throw.
 */
export function createStubNativeClickEvent(): MouseEvent {
    if (typeof globalThis.MouseEvent === 'function') {
        return new globalThis.MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        })
    }
    let defaultPrevented = false
    return {
        type: 'click',
        bubbles: true,
        cancelable: true,
        get defaultPrevented() {
            return defaultPrevented
        },
        preventDefault() {
            defaultPrevented = true
        },
        stopPropagation() {
            /* no tree in SSR stub */
        },
    } as unknown as MouseEvent
}

/**
 * Approximates a React click on an anchor for overflow menu items (no real DOM event).
 * {@link BreadcrumbV2Item} calls preventDefault before onClick — callers here should do the same for parity.
 */
export function createStubAnchorClickEvent(
    href: string
): React.MouseEvent<HTMLAnchorElement> {
    const anchor =
        typeof document !== 'undefined'
            ? document.createElement('a')
            : ({} as HTMLAnchorElement)
    anchor.href = href

    const nativeEvent = createStubNativeClickEvent()
    let syntheticDefaultPrevented = false
    let syntheticPropagationStopped = false

    const stub = {
        persist: () => {},
        preventDefault: () => {
            syntheticDefaultPrevented = true
            if (typeof nativeEvent.preventDefault === 'function') {
                nativeEvent.preventDefault()
            }
        },
        stopPropagation: () => {
            syntheticPropagationStopped = true
            if (typeof nativeEvent.stopPropagation === 'function') {
                nativeEvent.stopPropagation()
            }
        },
        isPropagationStopped: () => syntheticPropagationStopped,
        get defaultPrevented() {
            return syntheticDefaultPrevented || nativeEvent.defaultPrevented
        },
        nativeEvent,
        currentTarget: anchor,
        target: anchor,
        bubbles: true,
        cancelable: true,
        eventPhase: 0,
        isTrusted: false,
        timeStamp: Date.now(),
        type: 'click',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        button: 0,
        buttons: 0,
        clientX: 0,
        clientY: 0,
        screenX: 0,
        screenY: 0,
        movementX: 0,
        movementY: 0,
        pageX: 0,
        pageY: 0,
        detail: 1,
        relatedTarget: null,
        getModifierState: () => false,
    } as unknown as React.MouseEvent<HTMLAnchorElement>

    return stub
}
