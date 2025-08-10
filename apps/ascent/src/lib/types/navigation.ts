// Navigation-related type definitions
export interface NavigationItem {
    title: string
    path: string
    children?: NavigationItem[]
}

export enum NavigationZone {
    TOPBAR = 'topbar',
    SIDEBAR = 'sidebar',
    MAIN_CONTENT = 'main_content',
    TABLE_OF_CONTENTS = 'table_of_contents',
}

export interface BreadcrumbItem {
    title: string
    path: string
    isActive?: boolean
}

export interface TableOfContentsItem {
    title: string
    id: string
    level: number
    children?: TableOfContentsItem[]
}
