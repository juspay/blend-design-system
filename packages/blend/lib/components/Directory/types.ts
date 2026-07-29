import type { ReactNode, RefObject } from 'react'
import type { CSSObject } from 'styled-components'

export type DirectoryExpandedItems = Set<string> | string[]

export type DirectoryVirtualizationConfig = {
    viewportRef?: RefObject<HTMLElement | null>
    rowHeight?: number
    sectionHeight?: number
    viewportHeight?: number
    overscan?: number
    threshold?: number
}

export type DirectoryProps = {
    directoryData: DirectoryData[] | null
    idPrefix?: string
    activeItem?: string | null
    onActiveItemChange?: (item: string | null) => void
    defaultActiveItem?: string | null
    iconOnlyMode?: boolean
    showHierarchyLines?: boolean
    hierarchyLineBorderRadius?: CSSObject['borderRadius']
    expandedItems?: DirectoryExpandedItems
    defaultExpandedItems?: DirectoryExpandedItems
    onExpandedItemsChange?: (items: string[]) => void
    onItemExpand?: (item: NavbarItem, itemPath: string) => void | Promise<void>
    /**
     * Called when the viewport is scrolled within endReachedThreshold pixels
     * of the bottom (and re-checked when the content grows), for paged /
     * infinite loading.
     */
    onEndReached?: () => void | Promise<void>
    /**
     * Distance in pixels from the bottom at which onEndReached fires.
     * @default 200
     */
    endReachedThreshold?: number
    enableVirtualization?: boolean
    virtualization?: DirectoryVirtualizationConfig
}

export type DirectoryData = {
    label?: string
    items?: NavbarItem[]
    isCollapsible?: boolean
    defaultOpen?: boolean
}

export type NavbarItem = {
    label: string
    /**
     * Stable identifier used as this item's path segment (itemPath, expansion
     * state, virtualizer keys). Falls back to label when omitted — provide it
     * when sibling labels can collide.
     */
    id?: string
    items?: NavbarItem[]
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    onClick?: () => void
    href?: string
    isSelected?: boolean
    /**
     * When true, the item appears in the Sidebar mobile navigation drawer.
     * Desktop always renders all items regardless of this flag.
     */
    showOnMobile?: boolean
}

export type SectionProps = {
    section: DirectoryData
    sectionIndex: number
    // totalSections: number;
    onNavigateBetweenSections: (
        direction: 'up' | 'down',
        currentIndex: number
    ) => void
    idPrefix?: string
    iconOnlyMode?: boolean
    showHierarchyLines?: boolean
    hierarchyLineBorderRadius?: CSSObject['borderRadius']
}

export type NavItemProps = {
    item: NavbarItem
    index: number
    onNavigate: (direction: 'up' | 'down', currentIndex: number) => void
    itemPath?: string
    iconOnlyMode?: boolean
    showHierarchyLines?: boolean
    hierarchyLineBorderRadius?: CSSObject['borderRadius']
    isLast?: boolean
    isNested?: boolean
}

export type DirectoryFlatRow =
    | {
          type: 'section'
          section: DirectoryData
          sectionIndex: number
      }
    | {
          type: 'item'
          item: NavbarItem
          sectionIndex: number
          itemPath: string
          depth: number
          isLast: boolean
          ancestorIsLast: boolean[]
      }
