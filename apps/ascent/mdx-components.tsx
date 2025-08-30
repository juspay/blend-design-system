import DocsTypeTable from '@/components/features/Documentation/DocsTypeTable'
import Preview from '@/components/features/Documentation/Preview'
import {
    VersionHeader,
    ChangelogCard,
    ChangelogEntry,
} from '@/components/changelog/ChangelogComponents'
import { CommitLink } from '@/components/changelog/CommitLink'
import {
    MDXComponents,
    PreviewComponents,
    TableComponents,
} from '@/components/mdx'
import GradientBorderComponent from './app/changelog/components/ui/GradientBorderWrapper'
import DateBadge from './app/changelog/components/ui/DateBadge'
import { Search } from 'lucide-react'
import ChangeLogCard from './app/changelog/components/ui/ChangeLogCard'
import HomeDataList from './app/changelog/components/ui/HomeDataList'
import ImageBlock from './app/changelog/components/ui/ImageBlock'

const components = {
    // Core MDX components (headings, paragraphs, links, etc.)
    ...MDXComponents,

    // Table components
    ...TableComponents,

    // All preview components (generated programmatically)
    ...PreviewComponents,

    // Documentation components
    DocsTypeTable,
    Preview,

    // Changelog components
    VersionHeader,
    ChangelogCard,
    ChangelogEntry,
    CommitLink,
    GradientBorderComponent,
    DateBadge,
    Search,
    ChangeLogCard,
    HomeDataList,
    ImageBlock,
}

declare global {
    type MDXProvidedComponents = typeof components
}

export { components }

export function useMDXComponents(): MDXProvidedComponents {
    return components
}
