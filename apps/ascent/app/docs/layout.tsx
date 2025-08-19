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
import getDirItems from './utils/getDirItems'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalKeyboardNavigationProvider>
            <main className="min-h-screen w-screen bg-[var(--background)]">
                <nav className="h-[var(--navbar-height)] flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--sidebar-background)] backdrop-blur-sm sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <div className="sidebar-drawer-trigger">
                            <SidebarDrawer
                                items={getDirItems('app/docs/content')}
                            />
                        </div>
                        <Link
                            href="/"
                            className="flex items-center font-semibold text-lg text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors"
                            data-nav-topbar
                        >
                            <span>Blend Docs</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="max-w-sm" data-nav-topbar>
                            <SearchProvider />
                        </div>
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
                        <Link
                            href="/changelog"
                            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                            aria-label="View Changelog"
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
                                <path d="M3 3v18h18" />
                                <path d="M7 12l3 3 7-7" />
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
                        <Sidebar items={getDirItems('app/docs/content')} />
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
