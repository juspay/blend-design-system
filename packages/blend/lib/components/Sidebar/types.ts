import { type ReactNode } from 'react'
import type { DirectoryData } from '../Directory/types'

export type LeftPanelItem = {
    label: string
    icon: ReactNode
    value?: string
}

export type LeftPanelInfo = {
    items: LeftPanelItem[]
    selected: string
    onSelect: (value: string) => void
}

export type SidebarProps = {
    children: ReactNode
    data: DirectoryData[]
    leftPanel?: LeftPanelInfo
    topbar: ReactNode
    footer?: ReactNode
    sidebarTopSlot?: ReactNode
    sidebarCollapseKey?: string
}
