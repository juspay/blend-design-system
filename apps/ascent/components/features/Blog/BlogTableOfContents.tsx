'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { TOCItem } from './types'

interface Props {
    items: TOCItem[]
    className?: string
}

export default function BlogTableOfContents({ items, className = '' }: Props) {
    const [activeId, setActiveId] = useState<string>('')
    const router = useRouter()
    const pathname = usePathname()
    const isScrollingRef = useRef(false)
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    const filteredItems = useMemo(
        () => items.filter((item) => item.level <= 2),
        [items]
    )

    useEffect(() => {
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

        const updateActiveHeading = () => {
            if (isScrollingRef.current) return

            const isAtBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 2

            if (isAtBottom && filteredItems.length > 0) {
                setActiveId(filteredItems[filteredItems.length - 1].id)
                return
            }

            const scrollPos = window.scrollY + 100
            let currentActive = filteredItems[0]?.id || ''
            for (const item of filteredItems) {
                const el = document.getElementById(item.id)
                if (el) {
                    if (el.offsetTop <= scrollPos) {
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
        if (!element) return

        isScrollingRef.current = true
        setActiveId(id)
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        router.push(`${pathname}#${id}`, { scroll: false })

        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false
        }, 800)
    }

    if (filteredItems.length === 0) return null

    return (
        <nav className={className} aria-label="Table of contents">
            <ul className="space-y-3 relative">
                <div className="absolute left-[20.5px] top-0.5 bottom-0 w-0.5 bg-border h-full" />
                {filteredItems.map((item) => (
                    <li key={item.id} className="px-4 relative">
                        <button
                            type="button"
                            onClick={() => scrollToSection(item.id)}
                            aria-current={
                                activeId === item.id ? 'location' : undefined
                            }
                            className={`text-left w-full px-4 text-sm transition-colors font-mono line-clamp-1 cursor-pointer relative ${
                                activeId === item.id
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {activeId === item.id && (
                                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-7 rounded-full bg-foreground z-10" />
                            )}
                            <span className="pl-3">{item.text}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
