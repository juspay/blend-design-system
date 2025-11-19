import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export enum TabsVariant {
    BOXED = 'boxed',
    FLOATING = 'floating',
    UNDERLINE = 'underline',
    PILLS = 'pills',
}

export enum TabsSize {
    MD = 'md',
    LG = 'lg',
}

export type TabItem = {
    value: string
    label: string
    content: ReactNode
    closable?: boolean
    isDefault?: boolean
    disable?: boolean
}

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    variant?: TabsVariant
    size?: TabsSize
    items?: TabItem[]
    onTabClose?: (value: string) => void
    onTabAdd?: () => void
    showDropdown?: boolean
    showAddButton?: boolean
    dropdownTooltip?: string
    addButtonTooltip?: string
    maxDisplayTabs?: number
    disable?: boolean
}

export type TabsListProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.List
> & {
    variant?: TabsVariant
    size?: TabsSize
    expanded?: boolean
    fitContent?: boolean
    items?: TabItem[]
    onTabClose?: (value: string) => void
    onTabAdd?: () => void
    showDropdown?: boolean
    showAddButton?: boolean
    dropdownTooltip?: string
    addButtonTooltip?: string
    maxDisplayTabs?: number
    onTabChange?: (value: string) => void
    activeTab?: string
    disable?: boolean
}

export type TabsTriggerProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.Trigger
> & {
    value: string
    variant?: TabsVariant
    size?: TabsSize
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    children: string | number
    closable?: boolean
    onClose?: () => void
    disable?: boolean
    isActive?: boolean
    isOverlay?: boolean
    tabsGroupId?: string
}

export type TabsContentProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.Content
>

export type TabsStyles = {
    list: string
    trigger: string
}
