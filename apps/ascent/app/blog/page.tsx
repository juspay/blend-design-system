import React from 'react'
import {
    getAllBlogPosts,
    getFeaturedBlogPosts,
    BlogPost,
} from '@/blog/utils/getBlogPosts'
import {
    BlogHeader,
    FeaturedPosts,
    BlogPostGrid,
} from '@/components/features/Blog'
import { BLOG_CONFIG } from '@/blog/config'

/**
 * Blog page component - server component for static export
 * @returns React component
 */
export default function BlogPage() {
    // Fetch data at build time (no need for useMemo in server components)
    const allPosts = getAllBlogPosts()
    const featuredPosts = getFeaturedBlogPosts()

    // Filter regular posts
    const regularPosts = allPosts.filter((post: BlogPost) => !post.featured)

    // Calculate title
    const gridTitle =
        featuredPosts.length > 0
            ? BLOG_CONFIG.latestSectionTitle
            : BLOG_CONFIG.allSectionTitle

    // Check whether to show featured section
    const showFeaturedSection = featuredPosts.length > 0

    return (
        <div
            className={`${BLOG_CONFIG.maxWidth} mx-auto ${BLOG_CONFIG.containerPadding}`}
        >
            <BlogHeader />

            {showFeaturedSection && <FeaturedPosts posts={featuredPosts} />}

            <BlogPostGrid posts={regularPosts} title={gridTitle} />
        </div>
    )
}
