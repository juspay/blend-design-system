import { type ReactNode } from 'react'
import type { DirectoryData } from '../Directory/types'
import type { MerchantInfo } from '../Topbar/types'

export type LeftPanelItem = {
    label: string
    icon: ReactNode
    value?: string
}

export type LeftPanelInfo = {
    items: LeftPanelItem[]
    selected: string
    onSelect: (value: string) => void
    maxVisibleItems?: number
}

export type TenantItem = {
    label: string
    value?: string
    icon: ReactNode
}

export type SidebarMerchantInfo = {
    items: Array<{
        label: string
        value: string
        icon?: ReactNode
    }>
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
    merchantInfo?: MerchantInfo
    rightActions?: ReactNode
}
