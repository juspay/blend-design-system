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
} from '../index'
import {
    DocumentIcon,
    BlogIcon,
    ChangelogIcon,
    StorybookIcon,
} from '@/components/ui/Icons'
import { getDirItems } from '@/docs/utils'
import { Logo } from '@/app/changelog/icons/Logo'
import { JuspayLogoTitle } from '@/app/changelog/icons/JuspayLogoTitle'
import Gradient from '@/app/changelog/icons/Gradient'

export interface SharedDocLayoutProps {
    /** Title displayed in the navigation bar */
    title: string
    /** Base route for navigation (e.g., '/docs', '/changelog') */
    baseRoute: string
    /** Path to content directory for sidebar generation */
    contentPath: string
    /** Children components to render in the main content area */
    children: React.ReactNode
    /** Optional custom CSS classes */
    className?: string
    /** Whether to show the theme toggle button */
    showThemeToggle?: boolean

    showSidebar?: boolean
}

const SharedDocLayout: React.FC<SharedDocLayoutProps> = ({
    title,
    baseRoute,
    contentPath,
    children,
    className = '',
    showThemeToggle = true,
    showSidebar = true,
}) => {
    // Generate sidebar items based on content path
    const sidebarItems = getDirItems(contentPath)

    return (
        <GlobalKeyboardNavigationProvider>
            <main className={`min-h-screen w-full ${className}`}>
                <Gradient className="absolute right-0" />
                {/* Navigation Bar */}
                <nav className="xl:h-25 lg:h-20 h-18 flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-md">
                    {/* Left side - Title and drawer */}
                    <div className="flex items-center gap-4">
                        <div className="sidebar-drawer-trigger">
                            <SidebarDrawer
                                items={sidebarItems}
                                baseRoute={baseRoute}
                            />
                        </div>
                        <Link
                            href="/"
                            className="flex items-center font-semibold text-lg text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors"
                            data-nav-topbar
                        >
                            <Logo /> <JuspayLogoTitle />
                        </Link>
                    </div>

                    {/* Right side - Search and navigation links */}
                    <div className="flex items-center gap-3">
                        <div className="max-w-sm" data-nav-topbar>
                            <SearchProvider />
                        </div>

                        {/* Docs link (show if not on docs) */}
                        {baseRoute !== '/docs' && (
                            <Link
                                href="/docs"
                                className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                                aria-label="View Documentation"
                                data-nav-topbar
                            >
                                <DocumentIcon size={18} />
                            </Link>
                        )}

                        {/* Blog link (show if not on blog) */}
                        {baseRoute !== '/blog' && (
                            <Link
                                href="/blog"
                                className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                                aria-label="View Blog"
                                data-nav-topbar
                            >
                                <BlogIcon size={18} />
                            </Link>
                        )}

                        {/* Changelog link (show if not on changelog) */}
                        {baseRoute !== '/changelog' && (
                            <Link
                                href="/changelog"
                                className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                                aria-label="View Changelog"
                                data-nav-topbar
                            >
                                <ChangelogIcon size={18} />
                            </Link>
                        )}

                        {/* Storybook link */}
                        <a
                            href="https://juspay.design/storybook"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                            aria-label="View Storybook"
                            data-nav-topbar
                        >
                            <StorybookIcon size={18} />
                        </a>

                        {/* GitHub link */}
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

                        {/* Theme toggle */}
                        <div
                            data-nav-topbar
                            className={` ${showThemeToggle ? 'visible' : 'hidden'}`}
                        >
                            <ThemeToggle />
                        </div>
                    </div>
                </nav>

                {/* Main content area */}
                <div className="w-screen flex bg-[var(--sidebar-background)] backdrop-blur-sm">
                    <aside
                        className={`doc-sidebar w-[240px] h-[calc(100vh-var(--navbar-height))] overflow-hidden ${showSidebar ? 'visible' : 'hidden'}`}
                    >
                        <Sidebar items={sidebarItems} baseRoute={baseRoute} />
                    </aside>

                    {/* Main content */}
                    <div className="main-content-area mt-20 overflow-y-auto bg-[var(--sidebar-background)] backdrop-blur-sm w-full rounded-[var(--rounded-100)]">
                        {children}
                    </div>
                </div>

                {/* Floating shortcuts button */}
                <FloatingShortcutsButton />
            </main>
        </GlobalKeyboardNavigationProvider>
    )
}

export default SharedDocLayout
