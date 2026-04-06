import type { ButtonHTMLAttributes } from 'react'
import type { NavbarItem } from '../../Directory/types'
import type { MobileNavigationV2TokenType } from './mobile.tokens'

export type SidebarV2MobileNavigationItem = NavbarItem & {
    sectionLabel?: string
}

export type SidebarV2MobileNavigationProps = {
    items: SidebarV2MobileNavigationItem[]
    onHeightChange?: (height: string) => void
    showPrimaryActionButton?: boolean
    primaryActionButtonProps?: Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'type'
    >
}

export type MobileNavigationItemProps = {
    item: SidebarV2MobileNavigationItem
    index?: number
    tokens: MobileNavigationV2TokenType
    onSelect: (item: SidebarV2MobileNavigationItem) => void
}

export type MoreButtonProps = {
    tokens: MobileNavigationV2TokenType
    onClick: () => void
    isExpanded: boolean
    secondaryNavigationRegionId: string
}

export type PrimaryActionButtonProps = {
    tokens: MobileNavigationV2TokenType
    buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
}
