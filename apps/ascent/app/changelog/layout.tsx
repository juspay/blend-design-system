import Link from 'next/link'
import React from 'react'
import { Github } from 'lucide-react'
import {
    Sidebar,
    SidebarDrawer,
    SearchProvider,
    ThemeToggle,
    GlobalKeyboardNavigationProvider,
    FloatingShortcutsButton,
} from '../components'
import getDirItems from '../docs/utils/getDirItems'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalKeyboardNavigationProvider>
            <main className="min-h-screen w-screen bg-[var(--background)]">
                <nav className="h-[var(--navbar-height)] flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--sidebar-background)] backdrop-blur-sm sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <div className="sidebar-drawer-trigger">
                            <SidebarDrawer
                                items={getDirItems('app/changelog/content')}
                                baseRoute="/changelog"
                            />
                        </div>
                        <Link
                            href="/"
                            className="flex items-center font-semibold text-lg text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors"
                            data-nav-topbar
                        >
                            <span>Blend Changelog</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="max-w-sm" data-nav-topbar>
                            <SearchProvider />
                        </div>
                        <Link
                            href="/docs"
                            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                            aria-label="View Documentation"
                            data-nav-topbar
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10,9 9,9 8,9" />
                            </svg>
                        </Link>
                        <Link
                            href="/blog"
                            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                            aria-label="View Blog"
                            data-nav-topbar
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </Link>
                        <a
                            href="https://juspay.design/storybook"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                            aria-label="View Storybook"
                            data-nav-topbar
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/juspay/blend-design-system"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                            aria-label="View on GitHub"
                            data-nav-topbar
                        >
                            <Github size={18} />
                        </a>
                        <div data-nav-topbar>
                            <ThemeToggle />
                        </div>
                    </div>
                </nav>

                <div className="w-screen h-[calc(100vh-var(--navbar-height))] flex">
                    <aside className="doc-sidebar w-[240px] h-[calc(100vh-var(--navbar-height))] overflow-hidden">
                        <Sidebar
                            items={getDirItems('app/changelog/content')}
                            baseRoute="/changelog"
                        />
                    </aside>
                    <div className="main-content-area flex-1 h-[calc(100vh-var(--navbar-height))] overflow-y-auto">
                        {children}
                    </div>
                </div>

                {/* Floating Shortcuts Button */}
                <FloatingShortcutsButton />
            </main>
        </GlobalKeyboardNavigationProvider>
    )
}

export default layout
