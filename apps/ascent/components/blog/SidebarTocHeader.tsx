'use client'

import { useEffect, useState } from 'react'
import TableOfContents from '@/components/Navigation/TableOfContents'

interface Props {
    title: string
    headings: Array<{ id: string; text: string; level: number }>
}

export default function SidebarTocHeader({ title, headings }: Props) {
    const [showTitle, setShowTitle] = useState(false)

    useEffect(() => {
        const sentinel = document.getElementById('sidebar-meta')
        if (!sentinel) return

        const observer = new IntersectionObserver(
            ([entry]) => setShowTitle(!entry.isIntersecting),
            {
                root: null, // viewport
                threshold: 0,
                rootMargin: '0px', // fires as soon as it leaves viewport
            }
        )
        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="sticky top-0 px-2">
            {showTitle && (
                <div className="pt-4 px-5">
                    <h2 className="font-manrope line-clamp-2">{title}</h2>
                </div>
            )}
            <TableOfContents
                items={headings}
                className="py-6 space-y-3.5"
                maxLevel={2}
            />
        </div>
    )
}
