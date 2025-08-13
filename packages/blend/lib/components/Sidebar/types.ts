import { type ReactNode } from 'react'
import type { DirectoryData } from '../Directory/types'

export type SidebarDropdownItem = {
    label: string
    icon: ReactNode
    value?: string
}

export type LeftSidebarInfo = {
    items: SidebarDropdownItem[]
    selected: string
    onSelect: (value: string) => void
}

export type SidebarProps = {
    children: ReactNode
    data: DirectoryData[]
    leftSidebar?: LeftSidebarInfo
    topbar: ReactNode
    footer?: ReactNode
    sidebarTopSlot?: ReactNode
}
