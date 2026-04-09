import DocsTypeTable from '@/components/features/Documentation/DocsTypeTable'
import Preview from '@/components/features/Documentation/Preview'
import { ChangelogEntry } from '@/components/changelog/ChangelogEntry'
import {
    MDXComponents,
    PreviewComponents,
    TableComponents,
} from '@/components/mdx'
import { Search } from 'lucide-react'
import { ComponentGrid } from '@/components/ui/ComponentGrid'
import { ChangelogCard, VersionHeader } from './components/changelog'

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
    Search,
}

declare global {
    type MDXProvidedComponents = typeof components
}

export { components }

export function useMDXComponents(): MDXProvidedComponents {
    return components
}
