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
    /**
     * @reserved Toggle expansion callback. Accepted for future implementation
     * of an in-topbar toggle button. Currently a no-op.
     */
    onToggleExpansion?: () => void
    /**
     * @reserved Controls toggle button visibility. Accepted for future
     * implementation. Currently a no-op.
     */
    showToggleButton?: boolean
    /**
     * @reserved When true, hides toggle button (used in panel-only mode).
     * Accepted for future implementation. Currently a no-op.
     */
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
    /**
     * @reserved ARIA controls ID for the sidebar navigation. Accepted for
     * future implementation. Currently a no-op.
     */
    ariaControls?: string
}
