import React from 'react'
import { Metadata } from 'next'
import { compileMDXFromSlug, getAllMDXSlugs } from '@/lib/utils/mdx'
import { CHANGELOG_CONFIG } from './config'
import { ChangelogHeader, VersionHeader } from '@/components/changelog'

export const metadata: Metadata = {
    title: 'Home - Changelog',
    description: CHANGELOG_CONFIG.defaultDescription,
}

async function getAllChangelogContent() {
    const slugs = getAllMDXSlugs(CHANGELOG_CONFIG.contentPath)
    // Filter out 'home' and sort by version (assuming semantic versioning in filename)
    const versionSlugs = slugs
        .filter((slug) => slug !== 'home')
        .sort((a, b) => {
            // Sort in descending order (newest first)
            const versionA = a.replace('v', '').split('.').map(Number)
            const versionB = b.replace('v', '').split('.').map(Number)
            for (
                let i = 0;
                i < Math.max(versionA.length, versionB.length);
                i++
            ) {
                const numA = versionA[i] || 0
                const numB = versionB[i] || 0
                if (numA !== numB) return numB - numA
            }
            return 0
        })

    const entries = await Promise.all(
        versionSlugs.map(async (slug) => {
            const data = await compileMDXFromSlug(
                CHANGELOG_CONFIG.contentPath,
                slug
            )
            return { slug, data }
        })
    )

    return entries.filter((entry) => entry.data !== null)
}

const ChangelogPage = async () => {
    const entries = await getAllChangelogContent()

    if (entries.length === 0) {
        return (
            <div
                className={`${CHANGELOG_CONFIG.maxWidth} mx-auto ${CHANGELOG_CONFIG.containerPadding}`}
            >
                <h1 className="text-3xl font-bold text-foreground mb-4">
                    Changelog
                </h1>
                <p className="text-muted-foreground">
                    No changelog entries found.
                </p>
            </div>
        )
    }

    return (
        <div>
            <div>
                <ChangelogHeader />
            </div>

            {/* Changelog Entries */}
            <div>
                <div className="grid grid-cols-1 w-full">
                    {entries.map(({ slug, data }) => {
                        const frontmatter = data?.frontmatter || {}
                        return (
                            <article
                                key={slug}
                                className="px-10 pt-10 pb-16 border-b border-border"
                            >
                                <VersionHeader
                                    version={frontmatter.version || slug}
                                    date={frontmatter.date || ''}
                                    status={frontmatter.status || 'stable'}
                                >
                                    {frontmatter.description}
                                </VersionHeader>
                                {data?.content}
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ChangelogPage
