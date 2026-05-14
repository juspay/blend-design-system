import React from 'react'
import { GlobalKeyboardNavigationProvider } from '../Navigation/GlobalKeyboardNavigation'
import type { DocItem } from '@/docs/utils'
import { TOCItem } from '../Navigation/TableOfContents'
import { DynamicSnackbar } from '../ui/DynamicSnackBar'
import { CommandSearch } from '../ui/CommandSearch'
import { Navbar } from '../Navigation'
import { cn } from '@/lib'

export interface SharedLayoutProps {
    baseRoute: string
    contentPath?: string
    sidebarItems?: DocItem[]
    children: React.ReactNode
    className?: string
    showSidebar?: boolean
    headings?: TOCItem[]
    showFooter?: boolean
    showSideBorder?: boolean
    fullWidth?: boolean
}

const SharedLayout = ({
    contentPath: _contentPath,
    children,
    className = '',
    showFooter = false,
    showSideBorder = true,
    fullWidth = false,
}: SharedLayoutProps) => {
    return (
        <GlobalKeyboardNavigationProvider>
            <div className={`min-h-screen ${className}`}>
                <div className="w-full">
                    <Navbar />
                    <div className="border-t border-border w-full">
                        <div
                            className={cn(
                                'flex justify-center items-start mx-auto w-full',
                                !fullWidth &&
                                    'lg:max-w-5xl xl:max-w-6xl 2xl:max-w-360'
                            )}
                        >
                            <main
                                className={cn(
                                    'flex-1 min-w-0',
                                    showSideBorder && 'border-x border-border'
                                )}
                            >
                                {children}
                            </main>
                        </div>
                    </div>
                </div>
                {showFooter && (
                    <div className="fixed bottom-0 left-0 right-0 z-10 w-full border-t border-border h-17.75 bg-background hidden md:block">
                        <div className="border-x border-border max-w-360 mx-auto h-17.75" />
                    </div>
                )}
            </div>
            <DynamicSnackbar />
            <CommandSearch />
        </GlobalKeyboardNavigationProvider>
    )
}

export default SharedLayout
