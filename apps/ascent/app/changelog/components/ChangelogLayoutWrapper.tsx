'use client'

import React from 'react'
import { SharedDocLayout } from '@/components/layout'
import { useChangelogThemeForcer } from '../hooks/useChangelogThemeForcer'
import { TableOfContentsProvider } from '@/app/docs/context/TableOfContentsContext'

interface ChangelogLayoutWrapperProps {
    baseRoute: string
    sidebarItems: any[]
    showThemeToggle: boolean
    showSidebar: boolean
    showFooter: boolean
    children: React.ReactNode
}

export const ChangelogLayoutWrapper: React.FC<ChangelogLayoutWrapperProps> = ({
    baseRoute,
    sidebarItems,
    showThemeToggle,
    showSidebar,
    showFooter,
    children,
}) => {
    // Use the hook to force dark theme
    useChangelogThemeForcer()

    return (
        <TableOfContentsProvider>
            <SharedDocLayout
                baseRoute={baseRoute}
                sidebarItems={sidebarItems}
                showThemeToggle={showThemeToggle}
                showSidebar={showSidebar}
                showFooter={showFooter}
            >
                {children}
            </SharedDocLayout>
        </TableOfContentsProvider>
    )
}
