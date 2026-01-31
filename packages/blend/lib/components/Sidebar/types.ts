import { type ReactNode } from 'react'
import type { DirectoryData, NavbarItem } from '../Directory/types'
import type { MerchantInfo } from '../Topbar/types'

export type LeftPanelItem = {
    label: string
    icon: ReactNode
    value?: string
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
    showLeftPanel?: boolean
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
    isTopbarVisible?: boolean
    onTopbarVisibilityChange?: (isVisible: boolean) => void
    defaultIsTopbarVisible?: boolean
    isExpanded?: boolean
    onExpandedChange?: (isExpanded: boolean) => void
    defaultIsExpanded?: boolean
    iconOnlyMode?: boolean
    panelOnlyMode?: boolean
    disableIntermediateState?: boolean
    hideOnIconOnlyToggle?: boolean
    showPrimaryActionButton?: boolean
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
