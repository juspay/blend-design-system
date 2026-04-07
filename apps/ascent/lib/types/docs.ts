import { PageMetadata } from '@/app/docs/utils/getFileContent'

export interface DocsPageProps {
    metadata: PageMetadata
    content: React.ReactNode
    breadcrumbItems: { label: string; href: string }[]
    rawMarkdown?: string
}
