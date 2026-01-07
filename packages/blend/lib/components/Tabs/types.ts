import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

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
    disable?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    newItem?: boolean
}

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
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
    disable?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    stickyHeader?: boolean
}

export type TabsListProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.List
> & {
    variant?: TabsVariant
    size?: TabsSize
    expanded?: boolean
    fitContent?: boolean
    items?: TabItem[]
    originalItems?: TabItem[]
    onTabClose?: (value: string) => void
    onTabAdd?: () => void
    showDropdown?: boolean
    showAddButton?: boolean
    dropdownTooltip?: string
    addButtonTooltip?: string
    onTabChange?: (value: string) => void
    activeTab?: string
    disable?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    stickyHeader?: boolean
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
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
}

export type TabsContentProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.Content
>

export type TabsStyles = {
    list: string
    trigger: string
}
