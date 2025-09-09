'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Github } from 'lucide-react'
import {
    Sidebar,
    SidebarDrawer,
    SearchProvider,
    ThemeToggle,
    GlobalKeyboardNavigationProvider,
    FloatingShortcutsButton,
    TableOfContents,
} from '../index'
import {
    DocumentIcon,
    BlogIcon,
    ChangelogIcon,
    StorybookIcon,
} from '@/components/ui/Icons'
import type { DocItem } from '@/docs/utils'
import { Logo } from '@/app/changelog/icons/Logo'
import { JuspayLogoTitle } from '@/app/changelog/icons/JuspayLogoTitle'
import Gradient from '@/app/changelog/icons/Gradient'
import { ConnectWithUs } from '@/app/landing/components/connect-with-us/ConnectWithUs'
import { Footer } from '@/app/landing/components/footer/Footer'
import { useTableOfContents } from '@/app/docs/context/TableOfContentsContext'
import { TOCItem } from '@/app/components/layout/Navigation/TableOfContents'

export interface SharedDocLayoutProps {
    /** Title displayed in the navigation bar */
    // title: string
    /** Base route for navigation (e.g., '/docs', '/changelog') */
    baseRoute: string
    /** Path to content directory for sidebar generation */
    contentPath?: string
    /** Pre-generated sidebar items (replaces contentPath for client components) */
    sidebarItems?: DocItem[]
    /** Children components to render in the main content area */
    children: React.ReactNode
    /** Optional custom CSS classes */
    className?: string
    /** Whether to show the theme toggle button */
    showThemeToggle?: boolean

    showSidebar?: boolean

    showFooter?: boolean

    navbarBorderBottom?: boolean
}

const SharedDocLayout: React.FC<SharedDocLayoutProps> = ({
    // title,
    baseRoute,
    contentPath: _contentPath,
    sidebarItems = [],
    children,
    className = '',
    showThemeToggle = true,
    showSidebar = true,
    showFooter = false,
    navbarBorderBottom = false,
}) => {
    // Get headings from context (will be empty array if context is not available)
    let headings: TOCItem[] = []
    try {
        const { headings: contextHeadings } = useTableOfContents()
        headings = contextHeadings
    } catch {
        // Context not available, use empty array
        headings = []
    }

    // Theme detection state
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme')
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light'
        const initialTheme = (savedTheme as 'light' | 'dark') || systemTheme
        setTheme(initialTheme)

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-theme'
                ) {
                    const currentTheme = document.documentElement.getAttribute(
                        'data-theme'
                    ) as 'light' | 'dark'
                    if (currentTheme) {
                        setTheme(currentTheme)
                    }
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        })

        return () => observer.disconnect()
    }, [])

    // Determine logo color based on theme
    const logoColor = mounted ? (theme === 'dark' ? 'white' : 'black') : 'white'

    return (
        <GlobalKeyboardNavigationProvider>
            <main className={`min-h-screen w-full ${className}`}>
                <Gradient className="absolute right-0" />
                {/* Navigation Bar */}
                <nav
                    className={`xl:h-25 lg:h-20 md:h-16 sm:h-14 h-12 flex items-center justify-between xl:px-6 lg:px-5 md:px-4 sm:px-3 px-2 sticky top-0 z-50 backdrop-blur-md ${navbarBorderBottom ? (theme === 'light' ? 'border-b border-neutral-200' : 'border-b border-neutral-800') : 'border-none'} `}
                >
                    {/* Left side - Title and drawer */}
                    <div className="flex items-center xl:gap-4 lg:gap-3 md:gap-2 gap-1">
                        <div
                            className={`sidebar-drawer-trigger z-[50]  ${showSidebar ? 'visible' : '!hidden'}`}
                        >
                            <SidebarDrawer
                                items={sidebarItems}
                                baseRoute={baseRoute}
                            />
                        </div>
                        <Link
                            href="/"
                            className="flex items-center font-semibold xl:text-lg lg:text-base md:text-sm sm:text-xs text-xs text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors"
                            data-nav-topbar
                        >
                            <Logo logoColor={logoColor} />{' '}
                            <JuspayLogoTitle logoColor={logoColor} />
                        </Link>
                    </div>

                    {/* Right side - Search and navigation links */}
                    <div className="flex items-center xl:gap-3 lg:gap-2 md:gap-2 sm:gap-1 gap-1">
                        <div
                            className="xl:max-w-sm lg:max-w-xs md:max-w-[350px] sm:max-w-[290px] max-w-[100px] "
                            data-nav-topbar
                        >
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
                <FloatingShortcutsButton />
                {/* Main content area */}
                <div className="w-screen flex bg-[var(--sidebar-background)] h-[90vh] backdrop-blur-sm overflow-hidden">
                    <div
                        className={`backdrop:blur-lg z-40 w-[240px] overflow-hidden left-0 h-full ${theme === 'light' ? 'border-r border-neutral-200' : 'border-r border-neutral-800'} ${showSidebar ? 'visible' : 'hidden'}`}
                    >
                        <Sidebar items={sidebarItems} baseRoute={baseRoute} />
                    </div>

                    {/* Main content */}
                    <div className=" overflow-y-auto bg-[var(--sidebar-background)] backdrop-blur-sm w-full lg:rounded-[var(--rounded-100)] md:rounded-[var(--rounded-80)] sm:rounded-[var(--rounded-60)] rounded-[var(--rounded-50)] ">
                        {children}
                        {showFooter === true && <ConnectWithUs />}
                        {showFooter === true && <Footer />}
                    </div>

                    {baseRoute.includes('docs') && (
                        <div className="doc-toc-ctr max-w-[240px] w-full overflow-y-auto">
                            <div className="sticky top-4">
                                <TableOfContents items={headings} />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </GlobalKeyboardNavigationProvider>
    )
}

export default SharedDocLayout
