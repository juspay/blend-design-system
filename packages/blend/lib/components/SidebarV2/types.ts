import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { DirectoryData, DirectoryProps } from '../Directory/types'
import type { MerchantInfo } from '../Topbar/types'
import type { TenantBadge } from '../Sidebar/types'

export type { TenantBadge } from '../Sidebar/types'

export enum SidebarV2StateChange {
    COLLAPSED = 'collapsed',
    EXPANDED = 'expanded',
    INTERMEDIATE = 'intermediate',
}

export type SidebarV2StateChangeType = `${SidebarV2StateChange}`

export type SecondarySidebarItem = {
    label: string
    value: string
    icon: ReactNode
    badge?: TenantBadge
}

export type SecondarySidebarInfo = {
    items: SecondarySidebarItem[]
    selected: string
    onSelect: (value: string) => void
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
    /**
     * Optional bottom slot for actions like settings/help/profile.
     * Renders pinned at the bottom of the rail.
     */
    footerSlot?: ReactNode
}

export type SidebarV2Props = {
    height?: string
    children?: ReactNode
    data?: DirectoryData[] | null
    secondarySidebar?: SecondarySidebarInfo
    topbar?: ReactNode
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
    onSidebarStateChange?: (state: SidebarV2StateChangeType) => void
    defaultIsExpanded?: boolean
    showMobilePrimaryActionButton?: boolean
    mobilePrimaryActionButtonProps?: Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'type'
    >
    activeItem?: string | null
    onActiveItemChange?: (item: string | null) => void
    defaultActiveItem?: string | null
    showHierarchyLines?: DirectoryProps['showHierarchyLines']
    hierarchyLineBorderRadius?: DirectoryProps['hierarchyLineBorderRadius']
}

export type {
    SidebarV2MobileNavigationItem,
    SidebarV2MobileNavigationProps,
} from './SidebarV2MobileNavigation/types'
