import React, { useMemo } from 'react'
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
 * Blog page component with optimized performance
 * @returns React component
 */
export default function BlogPage() {
    // Memoize expensive operations
    const allPosts = useMemo(() => getAllBlogPosts(), [])
    const featuredPosts = useMemo(() => getFeaturedBlogPosts(), [])

    // Memoize filtered posts to prevent unnecessary recalculations
    const regularPosts = useMemo(
        () => allPosts.filter((post: BlogPost) => !post.featured),
        [allPosts]
    )

    // Memoize title calculation
    const gridTitle = useMemo(
        () =>
            featuredPosts.length > 0
                ? BLOG_CONFIG.latestSectionTitle
                : BLOG_CONFIG.allSectionTitle,
        [featuredPosts.length]
    )

    // Memoize whether to show featured section
    const showFeaturedSection = useMemo(
        () => featuredPosts.length > 0,
        [featuredPosts.length]
    )

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
