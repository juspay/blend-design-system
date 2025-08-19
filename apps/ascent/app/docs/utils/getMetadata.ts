import { Metadata } from 'next'
import { getFileContent, PageMetadata } from '@/docs/utils'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
    const resolvedParams = await params
    const frontmatter = await getFileContent(resolvedParams.slug || [])

    if (!frontmatter) {
        return {
            title: 'Page Not Found',
            description: 'The requested page could not be found.',
        }
    }

    const metadata: PageMetadata = {
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || '',
        category: frontmatter.category || '',
        tags: frontmatter.tags || [],
        ...frontmatter,
    }

    const metadataObject: Metadata = {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            type: 'article',
            tags: metadata.tags,
            ...(metadata.image && { images: [{ url: metadata.image }] }),
            ...(metadata.author && { authors: [{ name: metadata.author }] }),
            ...(metadata.date && { publishedTime: metadata.date }),
        },
        twitter: {
            card: 'summary_large_image',
            title: metadata.title,
            description: metadata.description,
            ...(metadata.image && { images: [metadata.image] }),
        },
    }

    // Add optional properties only if they exist
    if (metadata.keywords) {
        metadataObject.keywords = metadata.keywords
    } else if (metadata.tags && metadata.tags.length > 0) {
        metadataObject.keywords = metadata.tags.join(', ')
    }

    if (metadata.category) {
        metadataObject.other = {
            category: metadata.category,
        }

        if (metadata.tags && metadata.tags.length > 0) {
            metadataObject.other.tags = metadata.tags.join(', ')
        }
    }

    return metadataObject
}
