import React, { memo } from 'react'
import './blog.css'

type BlogLayoutProps = {
    children: React.ReactNode
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return (
        <div className="blog-root min-h-screen w-full bg-white text-blog-ink">
            {children}
        </div>
    )
}

BlogLayout.displayName = 'BlogLayout'

export default memo(BlogLayout)
