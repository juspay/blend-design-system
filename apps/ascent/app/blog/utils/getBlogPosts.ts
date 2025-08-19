import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
    BlogPost,
    BlogPostWithContent,
} from '../../components/features/Blog/types'

// Re-export types for backward compatibility
export type { BlogPost, BlogPostWithContent }

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'app/blog/content')

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

        // Sort by publish date (newest first)
        return posts.sort(
            (a, b) =>
                new Date(b.publishDate).getTime() -
                new Date(a.publishDate).getTime()
        )
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

export function getFeaturedBlogPosts(): BlogPost[] {
    const allPosts = getAllBlogPosts()
    return allPosts.filter((post) => post.featured)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
    const allPosts = getAllBlogPosts()
    return allPosts.filter((post) => post.category === category)
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
    const allPosts = getAllBlogPosts()
    return allPosts.filter((post) => post.tags.includes(tag))
}

export function getRecentBlogPosts(limit: number = 5): BlogPost[] {
    const allPosts = getAllBlogPosts()
    return allPosts.slice(0, limit)
}

export function getAllCategories(): string[] {
    const allPosts = getAllBlogPosts()
    const categories = new Set(allPosts.map((post) => post.category))
    return Array.from(categories).sort()
}

export function getAllTags(): string[] {
    const allPosts = getAllBlogPosts()
    const tags = new Set(allPosts.flatMap((post) => post.tags))
    return Array.from(tags).sort()
}

export function getRelatedPosts(
    currentSlug: string,
    limit: number = 3
): BlogPost[] {
    const allPosts = getAllBlogPosts()
    const currentPost = allPosts.find((post) => post.slug === currentSlug)

    if (!currentPost) {
        return []
    }

    // Find posts with similar tags or same category
    const relatedPosts = allPosts
        .filter((post) => post.slug !== currentSlug)
        .map((post) => {
            let score = 0

            // Same category gets higher score
            if (post.category === currentPost.category) {
                score += 3
            }

            // Shared tags get points
            const sharedTags = post.tags.filter((tag) =>
                currentPost.tags.includes(tag)
            )
            score += sharedTags.length

            return { post, score }
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ post }) => post)

    return relatedPosts
}

export function getPreviousAndNextPosts(currentSlug: string): {
    previous: BlogPost | null
    next: BlogPost | null
} {
    const allPosts = getAllBlogPosts()
    const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug)

    if (currentIndex === -1) {
        return { previous: null, next: null }
    }

    return {
        previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
        next:
            currentIndex < allPosts.length - 1
                ? allPosts[currentIndex + 1]
                : null,
    }
}
