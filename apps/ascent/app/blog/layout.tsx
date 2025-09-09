import React, { memo } from 'react'
import { SharedDocLayout } from '@/components'

type BlogLayoutProps = {
    children: React.ReactNode
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return (
        <SharedDocLayout
            baseRoute="/blog"
            sidebarItems={[]}
            showSidebar={false}
        >
            {children}
        </SharedDocLayout>
    )
}

BlogLayout.displayName = 'BlogLayout'

// Memoize the component for performance
export default memo(BlogLayout)
