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
        <div
            className={`${CHANGELOG_CONFIG.maxWidth} mx-auto ${CHANGELOG_CONFIG.containerPadding}`}
        >
            <article className="prose prose-gray dark:prose-invert max-w-none">
                {content}
            </article>
        </div>
    )
}

export async function generateStaticParams() {
    return generateStaticParamsFromMDX(CHANGELOG_CONFIG.contentPath)
}
