import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

export enum TabsV2Variant {
    BOXED = 'boxed',
    FLOATING = 'floating',
    UNDERLINE = 'underline',
    PILLS = 'pills',
}

export enum TabsV2Size {
    MD = 'md',
    LG = 'lg',
}

export type TabsV2State = 'default' | 'hover' | 'active' | 'disabled'

export type TabsV2TabItem = {
    value: string
    label: string
    content: ReactNode
    disabled?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    newItem?: boolean
}

export type TabsV2Props = ComponentPropsWithoutRef<
    typeof TabsPrimitive.Root
> & {
    variant?: TabsV2Variant
    size?: TabsV2Size
    expanded?: boolean
    fitContent?: boolean
    disabled?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    stickyHeader?: boolean
    offsetTop?: number
}

export type TabsV2ListProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.List
> & {
    variant?: TabsV2Variant
    size?: TabsV2Size
    expanded?: boolean
    fitContent?: boolean
    disabled?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    stickyHeader?: boolean
    offsetTop?: number
}

export type TabsV2TriggerProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.Trigger
> & {
    value: string
    variant?: TabsV2Variant
    size?: TabsV2Size
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    children: string | number
    disabled?: boolean
    /**
     * When true, renders a close (X) affordance inside the trigger.
     * Useful for "new/temporary" tabs that can be removed.
     */
    closable?: boolean
    onClose?: () => void
    isActive?: boolean
    isOverlay?: boolean
    tabsGroupId?: string
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
}

export type TabsV2ContentProps = ComponentPropsWithoutRef<
    typeof TabsPrimitive.Content
>
