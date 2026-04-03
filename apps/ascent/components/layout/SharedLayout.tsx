import React from 'react'
import { GlobalKeyboardNavigationProvider } from '../index'
import type { DocItem } from '@/docs/utils'
import { TOCItem } from '../Navigation/TableOfContents'
import { DynamicSnackbar } from '../ui/DynamicSnackBar'
import { Navbar } from '../Navigation'

export interface SharedLayoutProps {
    baseRoute: string
    contentPath?: string
    sidebarItems?: DocItem[]
    children: React.ReactNode
    className?: string
    showSidebar?: boolean
    headings?: TOCItem[]
    showFooter?: boolean
}

const SharedLayout = ({
    contentPath: _contentPath,
    children,
    className = '',
    showFooter = false,
}: SharedLayoutProps) => {
    return (
        <GlobalKeyboardNavigationProvider>
            <div className={`min-h-screen ${className}`}>
                <div className="w-full">
                    <Navbar />
                    <div className="border-t border-border w-full">
                        <div className="flex justify-center items-start max-w-360 mx-auto w-full">
                            <main className="flex-1 min-w-0 border-x border-border">
                                {children}
                            </main>
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

export default SharedLayout
