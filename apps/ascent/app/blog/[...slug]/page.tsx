import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import {
    getBlogPost,
    getAllBlogPosts,
    BlogPost,
} from '@/blog/utils/getBlogPosts'
import { extractHeadings } from '@/docs/utils'
import { BlogPostWithTOC } from '@/components/features/Blog'
import { useMDXComponents } from '@/mdx-components'

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
}

export async function generateStaticParams() {
    const posts = getAllBlogPosts()
    return posts.map((post: BlogPost) => ({
        slug: [post.slug],
    }))
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
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
}

export default async function BlogPostPage({ params }: PageProps) {
    const resolvedParams = await params
    const slug = resolvedParams.slug.join('/')
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    const { content } = await compileMDX({
        source: post.content,
        components: useMDXComponents(),
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
        },
    })

    const headings = extractHeadings(post.content).filter((h) => h.level <= 2)

    return (
        <BlogPostWithTOC post={post} headings={headings}>
            {content}
        </BlogPostWithTOC>
    )
}
