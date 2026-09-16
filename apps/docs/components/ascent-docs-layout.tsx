'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export type DocsNavigationItem = { title: string; url: string }

export function AscentDocsLayout({
    children,
    pages,
}: {
    children: ReactNode
    pages: DocsNavigationItem[]
}) {
    const pathname = usePathname()

    return (
        <div className="ascent-docs-shell">
            <header className="ascent-docs-navbar">
                <div className="ascent-docs-navbar-content">
                    <Link className="ascent-docs-brand" href="/docs">
                        Blend
                    </Link>
                    <nav
                        className="ascent-docs-nav"
                        aria-label="Primary navigation"
                    >
                        <Link className="is-active" href="/docs">
                            Docs
                        </Link>
                        <Link href="/storybook">Storybook</Link>
                        <Link href="/blog">Blogs</Link>
                        <Link href="/changelog">Changelog</Link>
                        <Link href="/showcase">Showcase</Link>
                    </nav>
                </div>
            </header>
            <div className="ascent-docs-frame">
                <aside className="ascent-docs-sidebar">
                    <nav aria-label="Documentation">
                        <p className="ascent-docs-sidebar-label">
                            Documentation
                        </p>
                        {pages.map((page) => (
                            <Link
                                className={
                                    pathname === page.url
                                        ? 'is-active'
                                        : undefined
                                }
                                href={page.url}
                                key={page.url}
                            >
                                {page.title}
                            </Link>
                        ))}
                    </nav>
                </aside>
                {children}
            </div>
        </div>
    )
}
