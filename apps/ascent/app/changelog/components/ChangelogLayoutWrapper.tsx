'use client'

import React from 'react'
import { SharedDocLayout } from '@/components/layout'
import { useChangelogThemeForcer } from '../hooks/useChangelogThemeForcer'

interface ChangelogLayoutWrapperProps {
    baseRoute: string
    sidebarItems: any[]
    showThemeToggle: boolean
    showSidebar: boolean
    children: React.ReactNode
}

export const ChangelogLayoutWrapper: React.FC<ChangelogLayoutWrapperProps> = ({
    baseRoute,
    sidebarItems,
    showThemeToggle,
    showSidebar,
    children,
}) => {
    // Use the hook to force dark theme
    useChangelogThemeForcer()

    return (
        <SharedDocLayout
            baseRoute={baseRoute}
            sidebarItems={sidebarItems}
            showThemeToggle={showThemeToggle}
            showSidebar={showSidebar}
        >
            {children}
        </SharedDocLayout>
    )
}
