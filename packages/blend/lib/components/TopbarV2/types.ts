import type { ReactNode } from 'react'
import type { SecondarySidebarInfo } from '../SidebarV2/types'

export type MerchantInfoV2 = {
    items: Array<{
        label: string
        value: string
        icon?: ReactNode
    }>
    selected: string
    onSelect: (value: string) => void
}

export type TopbarV2Props = {
    children?: ReactNode
    /** Sidebar expansion state */
    isExpanded?: boolean
    onToggleExpansion?: () => void
    showToggleButton?: boolean
    /** When true, hides toggle button (used in panel only mode) */
    panelOnlyMode?: boolean
    /** Controlled mode: Show/hide topbar */
    isVisible?: boolean
    /** Callback when visibility changes (controlled mode) */
    onVisibilityChange?: (visible: boolean) => void
    /** Uncontrolled mode: Initial topbar visibility (defaults to true) */
    defaultIsVisible?: boolean
    sidebarTopSlot?: ReactNode
    topbar?: ReactNode
    leftAction?: ReactNode
    rightActions?: ReactNode
    showBackButton?: boolean
    onBackClick?: () => void
    secondarySidebar?: SecondarySidebarInfo
    merchantInfo?: MerchantInfoV2
    /** ARIA controls ID for the sidebar navigation */
    ariaControls?: string
}
