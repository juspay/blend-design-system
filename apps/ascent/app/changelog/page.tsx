import React from 'react'
import { Metadata } from 'next'
import { compileMDXFromSlug } from '@/lib/utils/mdx'
import { CHANGELOG_CONFIG } from './config'

export const metadata: Metadata = {
    title: 'Home - Changelog',
    description: CHANGELOG_CONFIG.defaultDescription,
}

async function getHomeContent() {
    return await compileMDXFromSlug(CHANGELOG_CONFIG.contentPath, 'home')
}

const ChangelogPage = async () => {
    const homeData = await getHomeContent()

    if (!homeData) {
        return (
            <div
                className={`${CHANGELOG_CONFIG.maxWidth} mx-auto ${CHANGELOG_CONFIG.containerPadding}`}
            >
                <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                    Changelog
                </h1>
                <p className="text-[var(--muted-foreground)]">
                    Error loading changelog content.
                </p>
            </div>
        )
    }

    const { content } = homeData

    return (
        <div
            className={`${CHANGELOG_CONFIG.maxWidth} mx-auto ${CHANGELOG_CONFIG.containerPadding}`}
        >
            <article className="prose prose-gray dark:prose-invert max-w-none">
                {content}
            </article>
        </div>
    )
}

export default ChangelogPage
