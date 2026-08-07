import { AscentDocsLayout } from '@/components/ascent-docs-layout'
import { source } from '@/lib/source'
import type { ReactNode } from 'react'

export default function DocsLayoutPage({ children }: { children: ReactNode }) {
    return (
        <AscentDocsLayout
            pages={source.getPages().map((page) => ({
                title: page.data.title,
                url: page.url,
            }))}
        >
            {children}
        </AscentDocsLayout>
    )
}
