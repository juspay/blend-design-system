import React from 'react'
import { SharedDocLayout } from '@/components/layout'
import { getDirItems } from './utils'

const layout = ({ children }: { children: React.ReactNode }) => {
    const sidebarItems = getDirItems('app/docs/content')

    return (
        <SharedDocLayout
            // title="Blend Docs"
            baseRoute="/docs"
            contentPath="app/docs/content"
            sidebarItems={sidebarItems}
            navbarBorderBottom={true}
        >
            {children}
        </SharedDocLayout>
    )
}

export default layout
