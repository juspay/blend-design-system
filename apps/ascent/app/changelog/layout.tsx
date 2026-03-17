import React from 'react'
import { CHANGELOG_CONFIG } from './config'
import { ChangelogLayoutWrapper } from './components/ChangelogLayoutWrapper'
import ChangelogThemeForcer from './components/ChangelogThemeForcer'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChangelogLayoutWrapper
            baseRoute={CHANGELOG_CONFIG.baseRoute}
            sidebarItems={[]}
            showThemeToggle={false}
            showSidebar={false}
        >
            <ChangelogThemeForcer />
            {children}
        </ChangelogLayoutWrapper>
    )
}

export default layout
