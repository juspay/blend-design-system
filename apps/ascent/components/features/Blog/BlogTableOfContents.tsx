'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { BlogTableOfContentsProps } from './types'
import {
    scrollToElement,
    calculateTOCPadding,
    cssVar,
    createIntersectionObserver,
    isBrowser,
    safeGetElementById,
} from './utils'

// Simple constants for this component
const BLOG_CONSTANTS = {
    TOC: {
        SCROLL_DELAY: 100,
    },
    CSS_VARS: {
        FOREGROUND: '--foreground',
        MUTED_FOREGROUND: '--muted-foreground',
    },
} as const

const ARIA_LABELS = {
    TOC_NAVIGATION: 'Table of contents',
    TOC_TITLE: 'On this page',
} as const

const ICON_PATHS = {
    HOME: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    HOME_INTERIOR: '9,22 9,12 15,12 15,22',
} as const

/**
 * BlogTableOfContents component with improved accessibility and performance
 */
export const BlogTableOfContents: React.FC<BlogTableOfContentsProps> = ({
    items,
    activeId: externalActiveId,
    onItemClick,
    className = '',
}) => {
    const [internalActiveId, setInternalActiveId] = useState<string>('')
    const router = useRouter()
    const pathname = usePathname()

    // Use external activeId if provided, otherwise use internal state
    const activeId = externalActiveId ?? internalActiveId

    // Memoize the intersection observer callback to prevent unnecessary re-renders
    const intersectionCallback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setInternalActiveId(entry.target.id)
                }
            })
        },
        []
    )

    // Handle initial hash navigation and set up intersection observer
    useEffect(() => {
        if (!isBrowser()) return

        // Handle initial hash in URL
        const hash = window.location.hash.slice(1)
        if (hash) {
            const element = safeGetElementById(hash)
            if (element) {
                setTimeout(() => {
                    scrollToElement(hash)
                    setInternalActiveId(hash)
                }, BLOG_CONSTANTS.TOC.SCROLL_DELAY)
            }
        }

        // Create intersection observer
        const observer = createIntersectionObserver(intersectionCallback)
        if (!observer) return

        // Observe all heading elements
        items.forEach((item) => {
            const element = safeGetElementById(item.id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [items, intersectionCallback])

    // Handle scroll to section with URL update
    const handleScrollToSection = useCallback(
        (id: string) => {
            scrollToElement(id)

            // Update URL with hash
            router.push(`${pathname}#${id}`, { scroll: false })

            // Call external handler if provided
            onItemClick?.(id)
        },
        [router, pathname, onItemClick]
    )

    // Memoize the TOC items to prevent unnecessary re-renders
    const tocItems = useMemo(
        () =>
            items.map((item) => ({
                ...item,
                paddingLeft: calculateTOCPadding(item.level),
                isActive: activeId === item.id,
            })),
        [items, activeId]
    )

    // Early return if no items
    if (items.length === 0) {
        return null
    }

    return (
        <nav
            className={`${className}`}
            aria-label={ARIA_LABELS.TOC_NAVIGATION}
            role="navigation"
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 px-2">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d={ICON_PATHS.HOME} />
                    <polyline points={ICON_PATHS.HOME_INTERIOR} />
                </svg>
                <p
                    className={`text-sm font-medium text-[${cssVar(BLOG_CONSTANTS.CSS_VARS.FOREGROUND)}]`}
                >
                    {ARIA_LABELS.TOC_TITLE}
                </p>
            </div>

            {/* TOC List */}
            <ul className="space-y-1" role="list">
                {tocItems.map((item) => (
                    <li key={item.id} role="listitem">
                        <button
                            onClick={() => handleScrollToSection(item.id)}
                            className={`text-left w-full px-2 py-1.5 rounded text-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                                item.isActive
                                    ? `text-[${cssVar(BLOG_CONSTANTS.CSS_VARS.FOREGROUND)}] font-medium`
                                    : `text-[${cssVar(BLOG_CONSTANTS.CSS_VARS.MUTED_FOREGROUND)}] hover:text-[${cssVar(BLOG_CONSTANTS.CSS_VARS.FOREGROUND)}]`
                            }`}
                            style={{
                                paddingLeft: `${item.paddingLeft}px`,
                            }}
                            aria-current={
                                item.isActive ? 'location' : undefined
                            }
                            data-nav-content
                            type="button"
                        >
                            {item.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

// Export as default for backward compatibility
export default BlogTableOfContents
