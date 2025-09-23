import React, { memo } from 'react'
import { SharedDocLayout } from '@/components'
import { TableOfContentsProvider } from '@/app/docs/context/TableOfContentsContext'

type BlogLayoutProps = {
    children: React.ReactNode
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return (
        <TableOfContentsProvider>
            <SharedDocLayout
                baseRoute="/blog"
                sidebarItems={[]}
                showSidebar={false}
            >
                {children}
            </SharedDocLayout>
        </TableOfContentsProvider>
    )
}

BlogLayout.displayName = 'BlogLayout'

// Memoize the component for performance
export default memo(BlogLayout)
