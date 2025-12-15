import { type ReactNode } from 'react'
import type { DirectoryData, NavbarItem } from '../Directory/types'
import type { MerchantInfo } from '../Topbar/types'

export type LeftPanelItem = {
    label: string
    icon: ReactNode
    value?: string

    /**
     * When true, item appears in main panel. When false or undefined, item appears in overflow menu (3-dots)
     * Defaults to false (hidden in overflow)
     */
    showInPanel?: boolean
}

export type LeftPanelInfo = {
    items: LeftPanelItem[]
    selected: string
    onSelect: (value: string) => void
    tenantSlot1?: ReactNode
    tenantSlot2?: ReactNode
    tenantFooter?: ReactNode
}

export type TenantItem = {
    label: string
    value?: string
    icon: ReactNode
    /**
     * When true, item appears in main panel. When false or undefined, item appears in overflow menu (3-dots)
     * Defaults to false (hidden in overflow)
     */
    showInPanel?: boolean
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
     * Controlled state: Show/hide topbar
     * When provided, topbar operates in controlled mode - parent must handle visibility updates
     */
    isTopbarVisible?: boolean

    /**
     * Callback fired when topbar visibility should change
     * In controlled mode: Parent should update isTopbarVisible prop based on this callback
     * In uncontrolled mode: Optional callback for visibility change notifications
     */
    onTopbarVisibilityChange?: (isVisible: boolean) => void

    /**
     * Uncontrolled mode: Initial topbar visibility (defaults to true)
     * Only used when isTopbarVisible is not provided
     */
    defaultIsTopbarVisible?: boolean

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

    /**
     * When true, shows only the left panel without any sidebar content
     * In this mode:
     * - Only left panel is visible (no directory, header, footer, toggle)
     * - Left panel is always shown (no intermediate/hover states)
     * - Sidebar cannot be expanded
     * Only applies when leftPanel is provided
     */
    panelOnlyMode?: boolean

    /**
     * Show primary action button in mobile navigation
     */
    showPrimaryActionButton?: boolean
    /**
     * Props for the primary action button in mobile navigation
     * Extends HTML button attributes
     */
    primaryActionButtonProps?: Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'type'
    >
    activeItem?: string | null
    onActiveItemChange?: (item: string | null) => void
    defaultActiveItem?: string | null
}

export type MobileNavigationItem = NavbarItem & {
    sectionLabel?: string
}

export type SidebarMobileNavigationProps = {
    items: MobileNavigationItem[]
    onHeightChange?: (height: string) => void
    showPrimaryActionButton?: boolean
    primaryActionButtonProps?: Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'type'
    >
}
