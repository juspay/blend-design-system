import React, { memo } from 'react'

type BlogLayoutProps = {
    children: React.ReactNode
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return (
        <div
            className="min-h-screen w-full bg-white"
            style={{ ['--navbar-height' as string]: '0px' }}
        >
            {children}
        </div>
    )
}

BlogLayout.displayName = 'BlogLayout'

export default memo(BlogLayout)
