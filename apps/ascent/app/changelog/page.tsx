import React from 'react'
import { Metadata } from 'next'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../mdx-components'

export const metadata: Metadata = {
    title: 'Getting Started - Changelog',
    description:
        'Learn how to use and contribute to the Blend Design System changelog',
}

async function getGettingStartedContent() {
    const filePath = path.join(
        process.cwd(),
        'app/changelog/content',
        'getting-started.mdx'
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
        console.error('Error loading getting started content:', error)
        return null
    }
}

const ChangelogPage = async () => {
    const gettingStartedData = await getGettingStartedContent()

    if (!gettingStartedData) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                    Changelog
                </h1>
                <p className="text-[var(--muted-foreground)]">
                    Error loading getting started content.
                </p>
            </div>
        )
    }

    const { content } = gettingStartedData

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <article className="prose prose-gray dark:prose-invert max-w-none">
                {content}
            </article>
        </div>
    )
}

export default ChangelogPage
