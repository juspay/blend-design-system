import type {
    DirectoryData,
    DirectoryExpandedItems,
    DirectoryFlatRow,
    NavbarItem,
} from './types'

export const normalizeDirectoryData = (
    directoryData: DirectoryData[] | null
): DirectoryData[] => (Array.isArray(directoryData) ? directoryData : [])

export const normalizeExpandedItems = (
    expandedItems?: DirectoryExpandedItems
): Set<string> =>
    expandedItems ? new Set(Array.from(expandedItems)) : new Set<string>()

export const getItemPathSegment = (item: NavbarItem): string =>
    item.id ?? item.label

const getItemPath = (parentPath: string, item: NavbarItem): string =>
    parentPath
        ? `${parentPath}/${getItemPathSegment(item)}`
        : getItemPathSegment(item)

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
