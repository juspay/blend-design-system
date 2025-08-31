import React from 'react'
import { SharedDocLayout } from '@/components/layout'
import { CHANGELOG_CONFIG } from './config'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SharedDocLayout
            // title={CHANGELOG_CONFIG.title}
            baseRoute={CHANGELOG_CONFIG.baseRoute}
            contentPath={CHANGELOG_CONFIG.contentPath}
            showThemeToggle={false}
            showSidebar={false}
            showFooter={true}
        >
            {children}
        </SharedDocLayout>
    )
}

export default layout
