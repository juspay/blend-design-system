import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import {
    compileMDXFromSlug,
    generateMetadataFromFrontmatter,
    generateStaticParamsFromMDX,
} from '../../lib/utils/mdx'
import { CHANGELOG_CONFIG } from '../config'

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const resolvedParams = await params
    const slug = resolvedParams.slug.join('/')
    const changelogData = await compileMDXFromSlug(
        CHANGELOG_CONFIG.contentPath,
        slug
    )

    if (!changelogData) {
        return {
            title: 'Changelog Not Found',
            description: 'The requested changelog entry could not be found.',
        }
    }

    const { frontmatter } = changelogData
    const metadata = generateMetadataFromFrontmatter(
        frontmatter,
        slug,
        `${slug} - Changelog`
    )

    return {
        title: `${metadata.title} | Blend Changelog`,
        description: metadata.description,
    }
}

export default async function ChangelogPage({ params }: PageProps) {
    const resolvedParams = await params
    const slug = resolvedParams.slug.join('/')
    const changelogData = await compileMDXFromSlug(
        CHANGELOG_CONFIG.contentPath,
        slug
    )

    if (!changelogData) {
        notFound()
    }

    const { content } = changelogData

    return (
        <article className="p-30 rounded-[var(--rounded-100)] border-[length:var(--pixel)] border-[var(--changelog-border-color)] bg-gradient-to-b from-[var(--changelog-card-list-bg-from)] to-[var(--changelog-card-list-bg-to)] w-full">
            {content}
        </article>
    )
}

export async function generateStaticParams() {
    return generateStaticParamsFromMDX(CHANGELOG_CONFIG.contentPath)
}
