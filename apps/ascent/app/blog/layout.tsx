import React, { memo } from 'react'

type BlogLayoutProps = {
    children: React.ReactNode
}

// globals.css switches --background to near-black via
// @media (prefers-color-scheme: dark), which Tailwind v4 applies to body.
// Use :has() to force html + body white whenever a .blog-root is on the page.
const BLOG_LIGHT_STYLE = `
    html:has(.blog-root),
    body:has(.blog-root) {
        background-color: #ffffff !important;
        color-scheme: light !important;
    }
`

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <style dangerouslySetInnerHTML={{ __html: BLOG_LIGHT_STYLE }} />
            <div
                className="blog-root min-h-screen w-full bg-white"
                style={{
                    ['--navbar-height' as string]: '0px',
                    colorScheme: 'light',
                }}
            >
                {children}
            </div>
        </>
    )
}

BlogLayout.displayName = 'BlogLayout'

export default memo(BlogLayout)
