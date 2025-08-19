import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import {
    getBlogPost,
    getAllBlogPosts,
    BlogPost,
} from '@/blog/utils/getBlogPosts'
import { extractHeadings } from '@/docs/utils'
import { BlogPostWithTOC, TOCItem } from '@/components/features/Blog'

// Import MDX components directly to avoid hook issues
import { components as mdxComponents } from '@/mdx-components'

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
}

/**
 * Generate static params for all blog posts
 * @returns Array of static params for blog posts
 */
export async function generateStaticParams() {
    try {
        const posts = getAllBlogPosts()
        return posts.map((post: BlogPost) => ({
            slug: [post.slug],
        }))
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error generating static params for blog posts:', error)
        return []
    }
}

/**
 * Generate metadata for blog post page
 * @param params - Page parameters
 * @returns Metadata object
 */
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    try {
        const resolvedParams = await params
        const slug = resolvedParams.slug.join('/')
        const post = getBlogPost(slug)

        if (!post) {
            return {
                title: 'Blog Post Not Found | Blend Blog',
                description: 'The requested blog post could not be found.',
            }
        }

        return {
            title: `${post.title} | Blend Blog`,
            description: post.description,
            authors: [{ name: post.author }],
            keywords: post.tags,
            openGraph: {
                title: post.title,
                description: post.description,
                type: 'article',
                publishedTime: post.publishDate,
                modifiedTime: post.lastModified,
                authors: [post.author],
                tags: post.tags,
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.description,
            },
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error generating metadata for blog post:', error)
        return {
            title: 'Blog Post | Blend Blog',
            description: 'Blend Design System Blog',
        }
    }
}

/**
 * Blog post page component with enhanced error handling
 * @param params - Page parameters
 * @returns Blog post page
 */
export default async function BlogPostPage({ params }: PageProps) {
    try {
        const resolvedParams = await params
        const slug = resolvedParams.slug.join('/')

        // Get blog post with error handling
        const post = getBlogPost(slug)
        if (!post) {
            // eslint-disable-next-line no-console
            console.warn(`Blog post not found: ${slug}`)
            notFound()
        }

        // Compile MDX with error handling
        let content
        try {
            const compiled = await compileMDX({
                source: post.content,
                components: mdxComponents,
                options: {
                    parseFrontmatter: false,
                },
            })
            content = compiled.content
        } catch (mdxError) {
            // eslint-disable-next-line no-console
            console.error(`Error compiling MDX for post ${slug}:`, mdxError)
            throw new Error(
                `Failed to compile blog post content: ${mdxError instanceof Error ? mdxError.message : 'Unknown error'}`
            )
        }

        // Extract headings with error handling
        let headings: TOCItem[]
        try {
            headings = extractHeadings(post.content)
        } catch (tocError) {
            // eslint-disable-next-line no-console
            console.error(
                `Error extracting headings for post ${slug}:`,
                tocError
            )
            headings = [] // Fallback to empty array
        }

        return (
            <BlogPostWithTOC
                post={post}
                content={content}
                headings={headings}
            />
        )
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error rendering blog post page:', error)
        // Re-throw to trigger Next.js error boundary
        throw error
    }
}
