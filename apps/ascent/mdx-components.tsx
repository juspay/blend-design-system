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
import {
    GradientBorderWrapper,
    DateBadge,
    ChangeLogCard,
    ImageBlock,
    VideoBlock,
    HeadingBlock,
    SubHeadingBlock,
    ParagraphBlock,
} from './app/changelog/components/ui/ChangelogBlocks'
import { Search } from 'lucide-react'
import HomeDataList from './app/changelog/components/ui/HomeDataList'
import { ComponentGrid } from '@/components/ui/ComponentGrid'

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
    ComponentGrid,

    // Changelog components
    VersionHeader,
    ChangelogCard,
    ChangelogEntry,
    CommitLink,
    GradientBorderWrapper,
    GradientBorderComponent: GradientBorderWrapper, // Alias for backward compatibility
    DateBadge,
    Search,
    ChangeLogCard,
    HomeDataList,
    ImageBlock,
    VideoBlock,
    HeadingBlock,
    SubHeadingBlock,
    ParagraphBlock,
}

declare global {
    type MDXProvidedComponents = typeof components
}

export { components }

export function useMDXComponents(): MDXProvidedComponents {
    return components
}
