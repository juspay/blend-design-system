import React from 'react'
import { getAllBlogPosts } from '@/blog/utils/getBlogPosts'
import { BlogHeader, BlogPostGrid } from '@/components/features/Blog'
import SharedDocLayout from '@/components/layout/SharedDocLayout'

export default function BlogPage() {
    const posts = getAllBlogPosts()

    return (
        <div>
            <SharedDocLayout
                baseRoute="/blog"
                showSidebar={false}
                showFooter={true}
            >
                <div
                    className="mx-auto flex w-full flex-col"
                    style={{ height: 'calc(100vh - 131px)' }}
                >
                    <div className="relative">
                        <BlogHeader />
                        <div className="pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-b border-border" />
                    </div>
                    <BlogPostGrid posts={posts} />
                </div>
            </SharedDocLayout>
        </div>
    )
}
