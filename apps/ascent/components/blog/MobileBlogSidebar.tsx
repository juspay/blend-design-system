'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { InfoIcon, XIcon } from '@phosphor-icons/react/dist/ssr'
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
    const [activeId, setActiveId] = useState<string>('')
    const isScrollingRef = useRef(false)
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    const filteredItems = useMemo(
        () => headings.filter((item) => item.level <= 2),
        [headings]
    )

    useEffect(() => {
        const updateActiveHeading = () => {
            if (typeof window === 'undefined') return
            if (isScrollingRef.current) return

            const scrollPos = window.scrollY + 100

            const isAtBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 2

            if (isAtBottom && filteredItems.length > 0) {
                setActiveId(filteredItems[filteredItems.length - 1].id)
                return
            }

            let currentActive = filteredItems[0]?.id || ''
            for (const item of filteredItems) {
                const el = document.getElementById(item.id)
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY
                    if (top <= scrollPos) {
                        currentActive = item.id
                    } else {
                        break
                    }
                }
            }

            setActiveId(currentActive)
        }

        updateActiveHeading()
        window.addEventListener('scroll', updateActiveHeading, {
            passive: true,
        })

        return () => window.removeEventListener('scroll', updateActiveHeading)
    }, [filteredItems])

    const scrollToSection = useCallback((id: string) => {
        // Close drawer first
        setIsOpen(false)

        // Wait for drawer animation to complete, then scroll
        setTimeout(() => {
            const element = document.getElementById(id)
            if (element) {
                isScrollingRef.current = true
                setActiveId(id)

                const yOffset = -80 // Offset for any fixed headers
                const y =
                    element.getBoundingClientRect().top +
                    window.scrollY +
                    yOffset
                window.scrollTo({ top: y, behavior: 'smooth' })

                clearTimeout(scrollTimeoutRef.current)
                scrollTimeoutRef.current = setTimeout(() => {
                    isScrollingRef.current = false
                }, 800)
            }
        }, 300)
    }, [])

    return (
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen} direction="right">
            <Drawer.Trigger asChild>
                <button
                    className="flex items-center gap-1.5 text-sm text-nav-section-text-foreground hover:text-foreground transition-colors"
                    aria-label="Open article info"
                >
                    <InfoIcon size={15} />
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
                                    <XIcon size={18} />
                                </button>
                            </Drawer.Close>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {/* Custom TOC with proper click handling */}
                            <ul className="space-y-4 relative py-6">
                                <div className="absolute left-[20.5px] top-5 bottom-0 w-0.5 bg-border" />
                                {filteredItems.map((item) => (
                                    <li key={item.id} className="px-4 relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                scrollToSection(item.id)
                                            }
                                            aria-current={
                                                activeId === item.id
                                                    ? 'location'
                                                    : undefined
                                            }
                                            className={cn(
                                                'text-left w-full px-4 text-sm transition-colors font-mono line-clamp-1 cursor-pointer relative',
                                                activeId === item.id
                                                    ? 'text-primary'
                                                    : 'text-muted-foreground hover:text-foreground'
                                            )}
                                            data-nav-content
                                        >
                                            {activeId === item.id && (
                                                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-7.5 rounded-full bg-foreground z-10" />
                                            )}
                                            <span className="pl-3">
                                                {item.text}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {/* Meta info */}
                            <div className="py-6 border-t border-border">
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
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
