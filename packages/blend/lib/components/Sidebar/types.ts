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
    enableTopbarAutoHide?: boolean

    /**
     * Controlled state: Current expanded state of the sidebar
     * When provided, sidebar operates in controlled mode - parent must handle state updates
     */
    isExpanded?: boolean

    /**
     * Callback fired when sidebar expand/collapse state should change
     * In controlled mode: Parent should update isExpanded prop based on this callback
     * In uncontrolled mode: Optional callback for state change notifications
     */
    onExpandedChange?: (isExpanded: boolean) => void

    /**
     * Uncontrolled mode: Initial expanded state (defaults to true)
     * Only used when isExpanded is not provided
     */
    defaultIsExpanded?: boolean
}
