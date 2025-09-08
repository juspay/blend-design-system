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

    className?: string

    style?: React.CSSProperties

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

    // Mobile-specific props
    leftPanel?: LeftPanelInfo

    merchantInfo?: MerchantInfo
}
