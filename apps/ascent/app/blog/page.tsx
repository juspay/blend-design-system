import React from 'react'
import { getAllBlogPosts } from '@/blog/utils/getBlogPosts'
import { BlogHeader, BlogPostGrid } from '@/components/features/Blog'

export default function BlogPage() {
    const posts = getAllBlogPosts()

    return (
        <div className="bg-white">
            {/* Header Grid — fixed at top */}
            <div className="fixed left-0 right-0 top-0 z-10 w-full border-b border-[#e1e4ea] bg-white">
                <div className="mx-auto h-[71px] max-w-[1172px] border-l border-r border-[#e1e4ea]" />
            </div>

            {/* Content — exactly fills the space between the two fixed grids */}
            <div
                className="mx-auto flex w-full max-w-[1172px] flex-col"
                style={{ height: 'calc(100vh - 142px)', marginTop: '71px' }}
            >
                <BlogHeader />
                <BlogPostGrid posts={posts} />
            </div>

            {/* Footer Grid — fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 z-10 w-full border-t border-[#e1e4ea] bg-white">
                <div className="mx-auto h-[71px] max-w-[1172px] border-b border-l border-r border-[#e1e4ea]" />
            </div>
        </div>
    )
}
