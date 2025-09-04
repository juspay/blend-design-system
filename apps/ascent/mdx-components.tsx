import DocsTypeTable from '@/components/features/Documentation/DocsTypeTable'
import Preview from '@/components/features/Documentation/Preview'
import {
    VersionHeader,
    ChangelogCard,
    ChangelogEntry,
} from '@/components/changelog/ChangelogComponents'
import {
    MDXComponents,
    PreviewComponents,
    TableComponents,
} from '@/components/mdx'

// Combine all modular MDX components
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
}

declare global {
    type MDXProvidedComponents = typeof components
}

export { components }

export function useMDXComponents(): MDXProvidedComponents {
    return components
}
