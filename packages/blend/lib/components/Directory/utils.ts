import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import type {
    DirectoryData,
    DirectoryExpandedItems,
    DirectoryFlatRow,
    NavbarItem,
} from './types'
// leaf types module, not ./directory.tokens — keeps this file out of the
// token factory's import graph (see RFC 0007 / check:circular)
import type {
    DirectoryItemVisualState,
    DirectoryTokenType,
} from './directory.tokens.types'

export const DEFAULT_END_REACHED_THRESHOLD = 200

export const useDirectoryEndReached = ({
    scrollRef,
    externalRef,
    onEndReached,
    threshold,
    contentKey,
}: {
    scrollRef: RefObject<HTMLElement | null>
    externalRef?: RefObject<HTMLElement | null>
    onEndReached?: () => void | Promise<void>
    threshold: number
    contentKey: unknown
}) => {
    // Latest-ref so an inline callback prop doesn't rebind (and re-arm) the
    // effect on every render.
    const onEndReachedRef = useRef(onEndReached)
    useEffect(() => {
        onEndReachedRef.current = onEndReached
    })
    const hasOnEndReached = !!onEndReached

    useEffect(() => {
        if (!hasOnEndReached) return
        const element = externalRef?.current ?? scrollRef.current
        if (!element) return

        // Re-armed when the effect rebinds so content growth (contentKey) can
        // trigger another fire while still within the threshold.
        let armed = true
        const check = () => {
            const remaining =
                element.scrollHeight - element.scrollTop - element.clientHeight
            if (remaining <= threshold) {
                if (armed) {
                    armed = false
                    void onEndReachedRef.current?.()
                }
            } else {
                armed = true
            }
        }

        check()
        element.addEventListener('scroll', check, { passive: true })
        return () => element.removeEventListener('scroll', check)
    }, [hasOnEndReached, threshold, contentKey, externalRef, scrollRef])
}

export const normalizeDirectoryData = (
    directoryData: DirectoryData[] | null
): DirectoryData[] => (Array.isArray(directoryData) ? directoryData : [])

export const normalizeExpandedItems = (
    expandedItems?: DirectoryExpandedItems
): Set<string> =>
    expandedItems ? new Set(Array.from(expandedItems)) : new Set<string>()

// || (not ??) so an empty-string id falls back to the label instead of
// silently producing colliding empty path segments
export const getItemPathSegment = (item: NavbarItem): string =>
    item.id || item.label

/**
 * True when `itemPath` is a strict ancestor of the selected item.
 *
 * itemPath segments are "/"-joined and ids may not contain "/", so ancestry is
 * a prefix test rather than a tree walk. A bare-label activeItem (the
 * backward-compat match for id-less items) is not a path, so it resolves no
 * ancestors — the tree then degrades to selected-only highlighting.
 */
export const isActiveAncestorPath = (
    itemPath: string,
    activeItem: string | null | undefined
): boolean =>
    !!activeItem &&
    activeItem !== itemPath &&
    activeItem.startsWith(`${itemPath}/`)

/**
 * Resolves the visual tier of a row. Returns `default` for every row unless
 * active-path highlighting is on AND something is selected, so the opt-out
 * path is byte-identical to the pre-existing two-state behaviour.
 */
export const getItemVisualState = ({
    isActive,
    itemPath,
    activeItem,
    highlightActivePath,
}: {
    isActive: boolean
    itemPath: string
    activeItem: string | null | undefined
    highlightActivePath: boolean
}): DirectoryItemVisualState => {
    if (isActive) return 'active'
    if (!highlightActivePath || !activeItem) return 'default'
    return isActiveAncestorPath(itemPath, activeItem) ? 'activePath' : 'muted'
}

/**
 * Background/text colours for a visual tier. The two path tiers fall back to
 * pre-existing tiers when a consumer's whole-slot DIRECTORY override predates
 * them, so a partial override degrades instead of resolving to undefined.
 */
export const resolveItemColors = (
    tokens: DirectoryTokenType,
    state: DirectoryItemVisualState
) => {
    const { backgroundColor, color } = tokens.section.itemList.item

    switch (state) {
        case 'active':
            return {
                backgroundColor: backgroundColor.active,
                color: color.active,
            }
        case 'activePath':
            return {
                backgroundColor:
                    backgroundColor.activePath ?? backgroundColor.default,
                color: color.activePath ?? color.active,
            }
        case 'muted':
            return {
                backgroundColor:
                    backgroundColor.muted ?? backgroundColor.default,
                color: color.muted ?? color.default,
            }
        default:
            return {
                backgroundColor: backgroundColor.default,
                color: color.default,
            }
    }
}

const countItems = (items: NavbarItem[] | undefined): number =>
    (items ?? []).reduce((total, item) => total + 1 + countItems(item.items), 0)

// Stable end-reached contentKey: reference identity of directoryData is
// useless here (inline arrays / null re-normalize to fresh references every
// render), so key on the total item count like the virtualized rows.length.
export const countDirectoryItems = (directoryData: DirectoryData[]): number =>
    directoryData.reduce(
        (total, section) => total + countItems(section.items),
        0
    )

const getItemPath = (parentPath: string, item: NavbarItem): string => {
    const segment = getItemPathSegment(item)
    return parentPath ? `${parentPath}/${segment}` : segment
}

const flattenDirectoryItems = (
    items: NavbarItem[],
    expandedItems: Set<string>,
    rows: DirectoryFlatRow[],
    sectionIndex: number,
    parentPath = '',
    depth = 0,
    ancestorIsLast: boolean[] = []
) => {
    items.forEach((item, index) => {
        const itemPath = getItemPath(parentPath, item)
        const hasChildren = !!item.items?.length
        const isLast = index === items.length - 1

        rows.push({
            type: 'item',
            item,
            sectionIndex,
            itemPath,
            depth,
            isLast,
            ancestorIsLast,
        })

        if (hasChildren && expandedItems.has(itemPath) && item.items) {
            flattenDirectoryItems(
                item.items,
                expandedItems,
                rows,
                sectionIndex,
                itemPath,
                depth + 1,
                [...ancestorIsLast, isLast]
            )
        }
    })
}

export const flattenDirectoryData = (
    directoryData: DirectoryData[],
    expandedItems: Set<string>,
    openSections: Set<number>
): DirectoryFlatRow[] => {
    const rows: DirectoryFlatRow[] = []

    directoryData.forEach((section, sectionIndex) => {
        if (section.label) {
            rows.push({
                type: 'section',
                section,
                sectionIndex,
            })
        }

        if (section.items && openSections.has(sectionIndex)) {
            flattenDirectoryItems(
                section.items,
                expandedItems,
                rows,
                sectionIndex
            )
        }
    })

    return rows
}

export const handleSectionNavigation = (
    direction: 'up' | 'down',
    currentIndex: number,
    totalItems: number,
    selector: string = '[data-state]',
    childSelector: string = '[role="button"]'
) => {
    const nextIndex =
        direction === 'up'
            ? Math.max(0, currentIndex - 1)
            : Math.min(totalItems - 1, currentIndex + 1)

    if (nextIndex !== currentIndex) {
        const nextSection = document.querySelectorAll(selector)[nextIndex]
        const elementToFocus = nextSection?.querySelector(
            childSelector
        ) as HTMLElement

        if (elementToFocus) {
            elementToFocus.focus()
        }
    }

    return nextIndex
}

export const handleKeyDown = (
    e: React.KeyboardEvent,
    options: {
        hasChildren?: boolean
        isExpanded?: boolean
        setIsExpanded?: (value: boolean) => void
        handleClick?: () => void
        index?: number
        onNavigate?: (direction: 'up' | 'down', index: number) => void
    }
) => {
    const {
        hasChildren,
        isExpanded,
        setIsExpanded,
        handleClick,
        index,
        onNavigate,
    } = options

    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick?.()
    } else if (
        e.key === 'ArrowRight' &&
        hasChildren &&
        !isExpanded &&
        setIsExpanded
    ) {
        e.preventDefault()
        setIsExpanded(true)
    } else if (
        e.key === 'ArrowLeft' &&
        hasChildren &&
        isExpanded &&
        setIsExpanded
    ) {
        e.preventDefault()
        setIsExpanded(false)
    } else if (
        e.key === 'ArrowDown' &&
        onNavigate &&
        typeof index === 'number'
    ) {
        e.preventDefault()
        onNavigate('down', index)
    } else if (e.key === 'ArrowUp' && onNavigate && typeof index === 'number') {
        e.preventDefault()
        onNavigate('up', index)
    }
}
