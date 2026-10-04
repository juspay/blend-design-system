'use client'

import { baseOptions } from '@/lib/layout.shared'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ComponentProps, ReactNode } from 'react'
type BlendDocsLayoutProps = {
    children: ReactNode
    tree: ComponentProps<typeof DocsLayout>['tree']
}

export function BlendDocsLayout({ children, tree }: BlendDocsLayoutProps) {
    return (
        <DocsLayout
            tree={tree}
            {...baseOptions()}
            containerProps={{ className: 'blend-docs-layout' }}
            sidebar={{ collapsible: false }}
        >
            {children}
        </DocsLayout>
    )
}
