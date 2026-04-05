'use client'

import { useState, useCallback } from 'react'
import { PanelLeft, X } from 'lucide-react'
import { Drawer } from 'vaul'
import { BlogPost } from '@/lib/types'
import { formatDate } from '@/app/blog/utils/utils'
import { cn } from '@/lib/utils/cn'

interface MobileBlogSidebarProps {
    post: BlogPost
    headings: Array<{ id: string; text: string; level: number }>
}

export function MobileBlogSidebarTrigger({
    post,
    headings,
}: MobileBlogSidebarProps) {
    const [isOpen, setIsOpen] = useState(false)

    const scrollToSection = useCallback((id: string) => {
        // Close drawer first
        setIsOpen(false)

        // Wait for drawer animation to complete, then scroll
        setTimeout(() => {
            const element = document.getElementById(id)
            if (element) {
                const yOffset = -80 // Offset for any fixed headers
                const y =
                    element.getBoundingClientRect().top +
                    window.scrollY +
                    yOffset
                window.scrollTo({ top: y, behavior: 'smooth' })
            }
        }, 300)
    }, [])

    const filteredItems = headings.filter((item) => item.level <= 2)

    return (
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen} direction="right">
            <Drawer.Trigger asChild>
                <button
                    className="flex items-center gap-1.5 text-sm text-nav-section-text-foreground hover:text-foreground transition-colors"
                    aria-label="Open article info"
                >
                    <PanelLeft size={14} />
                    <span>Info</span>
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-120" />
                <Drawer.Content className="fixed inset-y-0 right-0 z-120 w-72 bg-background border-l border-border outline-none">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <Drawer.Title className="font-semibold text-foreground">
                                Article Info
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
                            {/* Meta info */}
                            <div className="py-6 border-b border-border">
                                <div className="flex flex-col gap-6 px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <p className="font-mono text-sm uppercase tracking-tight text-nav-section-text">
                                            Author
                                        </p>
                                        <p className="text-sm tracking-tight text-foreground">
                                            {post.author}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <p className="font-mono text-sm uppercase tracking-tight text-muted-foreground">
                                            Date
                                        </p>
                                        <p className="text-sm tracking-tight text-foreground">
                                            {formatDate(post.publishDate)}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <p className="font-mono text-sm uppercase tracking-tight text-muted-foreground">
                                            Category
                                        </p>
                                        <p className="text-sm tracking-tight text-foreground">
                                            {post.category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Custom TOC with proper click handling */}
                            <ul className="space-y-4 relative py-6">
                                {filteredItems.map((item) => (
                                    <li key={item.id} className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                scrollToSection(item.id)
                                            }
                                            className={cn(
                                                'text-left w-full px-4 text-sm transition-colors font-mono line-clamp-1 cursor-pointer relative text-muted-foreground hover:text-foreground'
                                            )}
                                        >
                                            <span className="pl-3">
                                                {item.text}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
