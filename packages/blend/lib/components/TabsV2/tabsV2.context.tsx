/* eslint-disable react-refresh/only-export-components -- Radix-style context + provider pair */
import { createContext, type ReactNode } from 'react'
import { TabsV2Variant, TabsV2Size } from './tabsV2.types'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

export type TabsV2ChromeContextValue = {
    variant: TabsV2Variant
    size: TabsV2Size
    expanded: boolean
    fitContent: boolean
    disable: boolean
    showSkeleton: boolean
    skeletonVariant: SkeletonVariant
    stickyHeader: boolean
    offsetTop: number
    activeTab: string
}

const defaultChrome: TabsV2ChromeContextValue = {
    variant: TabsV2Variant.UNDERLINE,
    size: TabsV2Size.MD,
    expanded: false,
    fitContent: false,
    disable: false,
    showSkeleton: false,
    skeletonVariant: 'pulse',
    stickyHeader: false,
    offsetTop: 0,
    activeTab: '',
}

export const TabsV2ChromeContext =
    createContext<TabsV2ChromeContextValue>(defaultChrome)

export const TabsV2ChromeProvider = ({
    value,
    children,
}: {
    value: TabsV2ChromeContextValue
    children: ReactNode
}) => (
    <TabsV2ChromeContext.Provider value={value}>
        {children}
    </TabsV2ChromeContext.Provider>
)
