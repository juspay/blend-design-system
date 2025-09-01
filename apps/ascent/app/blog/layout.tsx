import Link from 'next/link'
import React, { memo } from 'react'
import { Github } from 'lucide-react'
import {
    SearchProvider,
    ThemeToggle,
    GlobalKeyboardNavigationProvider,
    DocumentIcon,
    ChangelogIcon,
    StorybookIcon,
    SharedDocLayout,
} from '@/components'
import {
    EXTERNAL_URLS,
    NAVIGATION_LABELS,
    ROUTES,
    LAYOUT_CONFIG,
} from '@/blog/config'
import { SHARED_NAV_CLASSES } from '@/lib/styles'

interface BlogLayoutProps {
    children: React.ReactNode
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return (
        // <GlobalKeyboardNavigationProvider>
        //     <main className="min-h-screen w-screen bg-[var(--background)]">
        //         <nav className="h-[var(--navbar-height)] flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--sidebar-background)] backdrop-blur-sm sticky top-0 z-50">
        //             <div className="flex items-center gap-4">
        //                 <Link
        //                     href={ROUTES.BLOG}
        //                     className={SHARED_NAV_CLASSES.LINK}
        //                     data-nav-topbar
        //                 >
        //                     <span>{NAVIGATION_LABELS.BLOG_TITLE}</span>
        //                 </Link>
        //             </div>

        //             <div className="flex items-center gap-3">
        //                 <div
        //                     className={LAYOUT_CONFIG.MAX_SEARCH_WIDTH}
        //                     data-nav-topbar
        //                 >
        //                     <SearchProvider />
        //                 </div>
        //                 <Link
        //                     href={ROUTES.DOCS}
        //                     className={SHARED_NAV_CLASSES.BUTTON}
        //                     aria-label={NAVIGATION_LABELS.VIEW_DOCS}
        //                     data-nav-topbar
        //                 >
        //                     <DocumentIcon size={LAYOUT_CONFIG.ICON_SIZE} />
        //                 </Link>
        //                 <Link
        //                     href={ROUTES.CHANGELOG}
        //                     className={SHARED_NAV_CLASSES.BUTTON}
        //                     aria-label={NAVIGATION_LABELS.VIEW_CHANGELOG}
        //                     data-nav-topbar
        //                 >
        //                     <ChangelogIcon size={LAYOUT_CONFIG.ICON_SIZE} />
        //                 </Link>
        //                 <a
        //                     href={EXTERNAL_URLS.STORYBOOK}
        //                     target="_blank"
        //                     rel="noopener noreferrer"
        //                     className={SHARED_NAV_CLASSES.BUTTON}
        //                     aria-label={NAVIGATION_LABELS.VIEW_STORYBOOK}
        //                     data-nav-topbar
        //                 >
        //                     <StorybookIcon size={LAYOUT_CONFIG.ICON_SIZE} />
        //                 </a>
        //                 <a
        //                     href={EXTERNAL_URLS.GITHUB}
        //                     target="_blank"
        //                     rel="noopener noreferrer"
        //                     className={SHARED_NAV_CLASSES.BUTTON}
        //                     aria-label={NAVIGATION_LABELS.VIEW_GITHUB}
        //                     data-nav-topbar
        //                 >
        //                     <Github size={LAYOUT_CONFIG.ICON_SIZE} />
        //                 </a>
        //                 <div data-nav-topbar>
        //                     <ThemeToggle />
        //                 </div>
        //             </div>
        //         </nav>

        //         {children}
        //     </main>
        // </GlobalKeyboardNavigationProvider>
        <SharedDocLayout
            // title="Blend Docs"
            baseRoute="/blog"
            // contentPath="app/docs/content"
            sidebarItems={[]}
            showSidebar={false}
        >
            {children}
        </SharedDocLayout>
    )
}

BlogLayout.displayName = 'BlogLayout'

// Memoize the component for performance
export default memo(BlogLayout)
