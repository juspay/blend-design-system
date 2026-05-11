import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost, BlogPostWithContent } from '@/lib/types'

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'app/blog/content')
const BLOG_CONFIG_PATH = path.join(BLOG_CONTENT_DIR, 'config.json')

type BlogConfig = {
    order?: string[]
}

const getBlogConfig = (): BlogConfig => {
    try {
        if (!fs.existsSync(BLOG_CONFIG_PATH)) {
            return {}
        }

        const rawConfig = fs.readFileSync(BLOG_CONFIG_PATH, 'utf8')
        const parsedConfig = JSON.parse(rawConfig) as BlogConfig

        return parsedConfig
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error reading blog config:', error)
        return {}
    }
}

export function getAllBlogPosts(): BlogPost[] {
    try {
        const files = fs.readdirSync(BLOG_CONTENT_DIR)
        const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

        const posts = mdxFiles.map((file) => {
            const slug = file.replace('.mdx', '')
            const filePath = path.join(BLOG_CONTENT_DIR, file)
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const { data: frontmatter } = matter(fileContent)

            return {
                slug,
                title: frontmatter.title || 'Untitled',
                description: frontmatter.description || '',
                author: frontmatter.author || 'Anonymous',
                publishDate: frontmatter.publishDate || '',
                lastModified: frontmatter.lastModified,
                tags: frontmatter.tags || [],
                category: frontmatter.category || 'uncategorized',
                featured: frontmatter.featured || false,
                coverImage: frontmatter.coverImage,
                excerpt: frontmatter.excerpt || '',
                readTime: frontmatter.readTime || '5 min read',
            } as BlogPost
        })

        const { order = [] } = getBlogConfig()

        if (order.length === 0) {
            // Fallback to date sort when no explicit config order exists.
            return posts.sort(
                (a, b) =>
                    new Date(b.publishDate).getTime() -
                    new Date(a.publishDate).getTime()
            )
        }

        const postsBySlug = new Map(posts.map((post) => [post.slug, post]))

        // Return posts in config order first, then remaining posts sorted by date.
        const orderedPosts = order
            .map((slug) => postsBySlug.get(slug))
            .filter((post): post is BlogPost => post !== undefined)

        const orderedSlugs = new Set(orderedPosts.map((post) => post.slug))
        const remainingPosts = posts
            .filter((post) => !orderedSlugs.has(post.slug))
            .sort(
                (a, b) =>
                    new Date(b.publishDate).getTime() -
                    new Date(a.publishDate).getTime()
            )

        return [...orderedPosts, ...remainingPosts]
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error reading blog posts:', error)
        return []
    }
}

export function getBlogPost(slug: string): BlogPostWithContent | null {
    try {
        const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`)

        if (!fs.existsSync(filePath)) {
            return null
        }

        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data: frontmatter, content } = matter(fileContent)

        return {
            slug,
            title: frontmatter.title || 'Untitled',
            description: frontmatter.description || '',
            author: frontmatter.author || 'Anonymous',
            publishDate: frontmatter.publishDate || '',
            lastModified: frontmatter.lastModified,
            tags: frontmatter.tags || [],
            category: frontmatter.category || 'uncategorized',
            featured: frontmatter.featured || false,
            coverImage: frontmatter.coverImage,
            excerpt: frontmatter.excerpt || '',
            readTime: frontmatter.readTime || '5 min read',
            content,
        } as BlogPostWithContent
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error reading blog post:', error)
        return null
    }
}
