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
        <article className="bg-[linear-gradient(0deg,#050505_0%,#050505_100%),linear-gradient(180deg,#121316_10.86%,#0505E2_99.98%)] ">
            {content}
        </article>
    )
}

export default ChangelogPage
