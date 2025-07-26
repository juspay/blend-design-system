'use client'

import { AlignLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export interface TOCItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    items: TOCItem[]
    isMobile?: boolean
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')

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

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-20% 0% -35% 0%',
                threshold: 0,
            }
        )

        items.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [items])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })

            const url = new URL(window.location.href)
            url.hash = id
            window.history.pushState({}, '', url.toString())
        }
    }

    if (items.length === 0) {
        return null
    }

    return (
        <nav className="w-full h-full pt-5">
            <div className="flex items-center gap-2 mb-4 px-2">
                <AlignLeft size={16} /> <p className="text-sm">On this page</p>
            </div>
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => scrollToSection(item.id)}
                            className={`text-left w-full px-2 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                                activeId === item.id
                                    ? 'text-primary'
                                    : 'text-[var(--muted-foreground)]'
                            }`}
                            style={{
                                paddingLeft: `${(item.level - 1) * 16 + 8}px`,
                            }}
                            data-nav-content
                        >
                            <p>{item.text}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
