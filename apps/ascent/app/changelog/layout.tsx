import React from 'react'
import { SharedDocLayout } from '@/components/layout'
import { CHANGELOG_CONFIG } from './config'
import ChangelogThemeForcer from './components/ChangelogThemeForcer'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SharedDocLayout
            // title={CHANGELOG_CONFIG.title}
            baseRoute={CHANGELOG_CONFIG.baseRoute}
            sidebarItems={[]}
            showThemeToggle={false}
            showSidebar={false}
            showFooter={true}
        >
            <ChangelogThemeForcer />
            {children}
        </SharedDocLayout>
    )
}

export default layout
