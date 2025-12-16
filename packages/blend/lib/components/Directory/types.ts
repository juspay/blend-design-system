import type { ReactNode } from 'react'

export type DirectoryProps = {
    directoryData: DirectoryData[]
    idPrefix?: string
    activeItem?: string | null
    onActiveItemChange?: (item: string | null) => void
    defaultActiveItem?: string | null
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
}

export type NavItemProps = {
    item: NavbarItem
    index: number
    onNavigate: (direction: 'up' | 'down', currentIndex: number) => void
    itemPath?: string
}
