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

    /** Sidebar expansion state */
    isExpanded?: boolean

    onToggleExpansion?: () => void

    showToggleButton?: boolean

    /** Controlled mode: Show/hide topbar */
    isVisible?: boolean

    /** Callback when visibility changes (controlled mode) */
    onVisibilityChange?: (visible: boolean) => void

    /** Uncontrolled mode: Initial topbar visibility (defaults to true) */
    defaultIsVisible?: boolean

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
