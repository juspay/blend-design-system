import React, { CSSProperties } from 'react'
import {
    Sidebar,
    GlobalKeyboardNavigationProvider,
    TableOfContents,
    Navbar,
} from '../index'
import type { DocItem } from '@/docs/utils'
import { TOCItem } from '../../components/layout/Navigation/TableOfContents'
import { DynamicSnackbar } from '../ui/DynamicSnackBar'
import { cn } from '@/lib'

export interface SharedDocLayoutProps {
    baseRoute: string
    contentPath?: string
    sidebarItems?: DocItem[]
    children: React.ReactNode
    className?: string
    showSidebar?: boolean
    headings?: TOCItem[]
    showFooter?: boolean
}

const SharedDocLayout: React.FC<SharedDocLayoutProps> = ({
    baseRoute,
    contentPath: _contentPath,
    sidebarItems = [],
    children,
    className = '',
    showSidebar = true,
    headings = [],
    showFooter = false,
}) => {
    const asideStyle: CSSProperties = {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        height: '100vh',
        overflowY: 'auto',
    }

    return (
        <GlobalKeyboardNavigationProvider>
            <div className={`min-h-screen ${className}`}>
                <div className="w-full">
                    {/* Navbar */}
                    <Navbar />
                    {/* Main Content Area */}
                    <div className="border-t border-border w-full">
                        <div
                            className={cn(
                                'max-w-360 mx-auto',
                                showSidebar && 'border-x border-border'
                            )}
                        >
                            <div className="flex justify-center items-start">
                                {/* Sidebar */}
                                {showSidebar && (
                                    <aside
                                        className="w-52 min-w-52 transition-none"
                                        style={asideStyle}
                                    >
                                        <Sidebar
                                            items={sidebarItems}
                                            baseRoute={baseRoute}
                                        />
                                    </aside>
                                )}

                                {/* Main Content */}
                                <main className="flex-1 min-w-0 border-x border-border">
                                    {children}
                                </main>

                                {/* Table of Contents */}
                                {baseRoute.includes('docs') &&
                                    headings.length > 0 && (
                                        <aside
                                            className="w-52 min-w-52 hidden lg:block transition-none"
                                            style={asideStyle}
                                        >
                                            <div className="px-5 py-3">
                                                <span className="text-xs text-nav-section-text-foreground font-semibold uppercase tracking-wider">
                                                    On this page
                                                </span>
                                            </div>
                                            <TableOfContents items={headings} />
                                        </aside>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                {showFooter && (
                    <div className="fixed bottom-0 left-0 right-0 z-10 w-full border-t border-border h-17.75">
                        <div className="border-x border-border max-w-360 mx-auto h-17.75" />
                    </div>
                )}
            </div>
            <DynamicSnackbar />
        </GlobalKeyboardNavigationProvider>
    )
}

export default SharedDocLayout
