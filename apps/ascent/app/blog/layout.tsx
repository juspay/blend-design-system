import React, { memo } from 'react'
import { SharedDocLayout } from '@/components'

type BlogLayoutProps = {
    children: React.ReactNode
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return <div>{children}</div>
}

BlogLayout.displayName = 'BlogLayout'

export default memo(BlogLayout)
