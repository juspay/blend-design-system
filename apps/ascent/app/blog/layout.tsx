import React from 'react'

type BlogLayoutProps = {
    children: React.ReactNode
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return <div>{children}</div>
}

export default BlogLayout
