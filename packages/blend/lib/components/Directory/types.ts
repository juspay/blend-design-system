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
