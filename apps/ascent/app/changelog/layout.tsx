import React from 'react'
import { CHANGELOG_CONFIG } from './config'
import { ChangelogLayoutWrapper } from './components/ChangelogLayoutWrapper'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChangelogLayoutWrapper
            baseRoute={CHANGELOG_CONFIG.baseRoute}
            sidebarItems={[]}
            showThemeToggle={false}
            showSidebar={false}
            showFooter={true}
        >
            {children}
        </ChangelogLayoutWrapper>
    )
}

export default layout
