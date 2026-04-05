'use client'

import { useState } from 'react'
import { PanelLeft, X } from 'lucide-react'
import { Drawer } from 'vaul'
import { TOCItem } from '../../../components/Navigation/TableOfContents'
import { DocItem } from '../utils'
import Sidebar from '@/components/docs/Sidebar'

type PageClientProps = {
    headings: TOCItem[]
}

// PageClient is kept for potential future client-side logic
// Headings are now passed directly to SharedDocLayout to avoid hydration layout shift
export const PageClient: React.FC<PageClientProps> = () => {
    return null
}

// Mobile sidebar trigger component
interface MobileSidebarTriggerProps {
    sidebarItems: DocItem[]
}

export const MobileSidebarTrigger: React.FC<MobileSidebarTriggerProps> = ({
    sidebarItems,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen} direction="left">
            <Drawer.Trigger asChild>
                <button
                    className="flex items-center gap-1.5 text-sm text-nav-section-text-foreground hover:text-foreground transition-colors"
                    aria-label="Open navigation menu"
                >
                    <PanelLeft size={14} />
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-100" />
                <Drawer.Content className="fixed inset-y-0 left-0 z-100 w-72 bg-background border-r border-border outline-none">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <Drawer.Title className="font-semibold text-foreground">
                                Documentation
                            </Drawer.Title>
                            <Drawer.Close asChild>
                                <button
                                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={18} />
                                </button>
                            </Drawer.Close>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <Sidebar
                                items={sidebarItems}
                                baseRoute="/docs"
                                onLinkClick={() => setIsOpen(false)}
                            />
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
