import { docs } from 'collections/server'
import { loader } from 'fumadocs-core/source'
import type { TOCItemType } from 'fumadocs-core/toc'
import type { MDXContent } from 'mdx/types'

/**
 * Fumadocs is the documentation data engine. Rendering remains entirely in
 * Ascent's existing DocsPage, Sidebar, TableOfContents, and MDX components.
 */
export const docsSource = loader({
    baseUrl: '/docs',
    source: docs.toFumadocsSource(),
})

type GeneratedDocData = {
    body: MDXContent
    toc: TOCItemType[]
    getText: (type: 'raw' | 'processed') => Promise<string>
}

type LoadedDocPage = NonNullable<ReturnType<typeof docsSource.getPage>>

/**
 * The generated collection is intentionally `@ts-nocheck` (Fumadocs owns it),
 * so restore the MDX runtime fields at our application boundary.
 */
export type DocsPage = Omit<LoadedDocPage, 'data'> & {
    data: LoadedDocPage['data'] & GeneratedDocData
}

export function getDoc(slugs: string[]): DocsPage | undefined {
    return docsSource.getPage(slugs) as DocsPage | undefined
}
