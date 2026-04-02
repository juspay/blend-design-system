'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export interface TOCItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    items: TOCItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')
    const router = useRouter()
    const pathname = usePathname()
    const isScrollingRef = useRef(false)
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    const filteredItems = items

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.slice(1)
            if (hash) {
                const element = document.getElementById(hash)
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        })
                        setActiveId(hash)
                    }, 100)
                }
            }
        }

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
                    const top = el.offsetTop
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

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            isScrollingRef.current = true
            setActiveId(id)
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            router.push(`${pathname}#${id}`, { scroll: false })

            clearTimeout(scrollTimeoutRef.current)
            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false
            }, 800)
        }
    }

    return (
        <ul className="space-y-4 py-4 relative">
            <div className="absolute left-[20.5px] top-6 bottom-0 w-0.5 bg-border" />

            {filteredItems.map((item) => (
                <li key={item.id} className="px-4 relative">
                    <button
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left w-full px-4 text-sm transition-colors font-mono line-clamp-1 cursor-pointer relative ${
                            activeId === item.id
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                        data-nav-content
                    >
                        {activeId === item.id && (
                            <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-7 rounded-full bg-foreground z-10" />
                        )}
                        <span className="pl-3">{item.text}</span>
                    </button>
                </li>
            ))}
        </ul>
    )
}
