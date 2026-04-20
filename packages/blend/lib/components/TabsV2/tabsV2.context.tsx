/* eslint-disable react-refresh/only-export-components -- Radix-style context + provider pair */
import { createContext, useContext, type ReactNode } from 'react'
import { TabsV2Variant, TabsV2Size } from './tabsV2.types'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

export type TabsV2ContextValue = {
    variant: TabsV2Variant
    size: TabsV2Size
    expanded: boolean
    fitContent: boolean
    disabled: boolean
    showSkeleton: boolean
    skeletonVariant: SkeletonVariant
    stickyHeader: boolean
    offsetTop: number
    activeTab: string
}

const defaultContext: TabsV2ContextValue = {
    variant: TabsV2Variant.UNDERLINE,
    size: TabsV2Size.MD,
    expanded: false,
    fitContent: false,
    disabled: false,
    showSkeleton: false,
    skeletonVariant: 'pulse',
    stickyHeader: false,
    offsetTop: 0,
    activeTab: '',
}

export const TabsV2Context = createContext<TabsV2ContextValue>(defaultContext)

export const TabsV2Provider = ({
    value,
    children,
}: {
    value: TabsV2ContextValue
    children: ReactNode
}) => <TabsV2Context.Provider value={value}>{children}</TabsV2Context.Provider>

export const useTabsV2Context = () => {
    const context = useContext(TabsV2Context)
    return context
}
