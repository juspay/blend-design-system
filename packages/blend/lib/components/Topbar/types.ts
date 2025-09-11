import type { ReactNode } from 'react'
import type { LeftPanelInfo } from '../Sidebar/types'

export type MerchantInfo = {
    items: Array<{
        label: string
        value: string
        icon?: ReactNode
    }>
    selected: string
    onSelect: (value: string) => void
}

export type TopbarProps = {
    children?: ReactNode

    isExpanded?: boolean

    onToggleExpansion?: () => void

    showToggleButton?: boolean

    sidebarTopSlot?: ReactNode
    topbar?: ReactNode
    title?: string

    leftAction?: ReactNode

    rightActions?: ReactNode

    showBackButton?: boolean

    onBackClick?: () => void

    leftPanel?: LeftPanelInfo

    merchantInfo?: MerchantInfo
}
