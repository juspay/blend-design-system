import React from 'react'
import { CHANGELOG_CONFIG } from './config'
import SharedDocLayout from '@/components/layout/SharedDocLayout'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SharedDocLayout
            baseRoute={CHANGELOG_CONFIG.baseRoute}
            showSidebar={false}
        >
            {children}
        </SharedDocLayout>
    )
}

export default layout
