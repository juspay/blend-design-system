import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../../mdx-components'

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
}

async function getChangelogContent(slug: string) {
    const filePath = path.join(
        process.cwd(),
        'app/changelog/content',
        `${slug}.mdx`
    )

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data: frontmatter, content } = matter(fileContent)

        const { content: mdxContent } = await compileMDX({
            source: content,
            components: useMDXComponents(),
            options: {
                parseFrontmatter: false,
            },
        })

        return { content: mdxContent, frontmatter }
    } catch (error) {
        console.error('Error loading changelog content:', error)
        return null
    }
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const resolvedParams = await params
    const slug = resolvedParams.slug.join('/')
    const changelogData = await getChangelogContent(slug)

    if (!changelogData) {
        return {
            title: 'Changelog Not Found',
        }
    }

    const { frontmatter } = changelogData

    return {
        title: frontmatter.title || slug,
        description: frontmatter.description || `Changelog for ${slug}`,
    }
}

export default async function ChangelogPage({ params }: PageProps) {
    const resolvedParams = await params
    const slug = resolvedParams.slug.join('/')
    const changelogData = await getChangelogContent(slug)

    if (!changelogData) {
        notFound()
    }

    const { content } = changelogData

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <article className="prose prose-gray dark:prose-invert max-w-none">
                {content}
            </article>
        </div>
    )
}

export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), 'app/changelog/content')

    try {
        const files = fs.readdirSync(contentDir)
        const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

        return mdxFiles.map((file) => ({
            slug: [file.replace('.mdx', '')],
        }))
    } catch {
        return []
    }
}
