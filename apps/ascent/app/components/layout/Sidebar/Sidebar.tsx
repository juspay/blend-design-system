'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { DocItem } from '@/docs/utils'

const capitalize = (str: string) => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

interface SidebarProps {
    items: DocItem[]
    baseRoute?: string
}

const SidebarItem = ({
    item,
    level = 0,
    baseRoute = '/docs',
}: {
    item: DocItem
    level?: number
    baseRoute?: string
}) => {
    const pathname = usePathname()

    // Handle special case for home in changelog only
    // Encode each segment of the path to prevent XSS
    const encodePath = (path: string) =>
        path
            .split('/')
            .map((segment) => encodeURIComponent(segment))
            .join('/')

    const href =
        baseRoute === '/changelog' && item.name === 'home'
            ? '/changelog'
            : `${baseRoute}/${encodePath(item.path)}`

    // Use unencoded path for active state comparison
    const unEncodedHref =
        baseRoute === '/changelog' && item.name === 'home'
            ? '/changelog'
            : `${baseRoute}/${item.path}`

    // Normalize paths by removing trailing slashes for comparison
    const normalizedPathname =
        pathname.endsWith('/') && pathname !== '/'
            ? pathname.slice(0, -1)
            : pathname
    const normalizedUnEncodedHref =
        unEncodedHref.endsWith('/') && unEncodedHref !== '/'
            ? unEncodedHref.slice(0, -1)
            : unEncodedHref

    const isActive = normalizedPathname === normalizedUnEncodedHref

    if (item.children && item.children.length > 0) {
        const isComponents = item.name.toLowerCase() === 'components'
        const marginTop = isComponents ? 'mt-8' : 'mt-6'

        return (
            <div key={item.slug} className={`mb-6 ${marginTop}`}>
                <div className="flex h-8 shrink-0 items-center gap-2 px-3 text-xs font-semibold text-[var(--sidebar-section-text)] uppercase tracking-wider select-none">
                    {capitalize(item.name)}
                </div>
                <div className="mt-2 space-y-1">
                    {item.children.map((child) => (
                        <SidebarItem
                            key={child.slug}
                            item={child}
                            level={level + 1}
                            baseRoute={baseRoute}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <Link
            href={href}
            className={`
                group flex h-8 shrink-0 items-center justify-between rounded-lg px-3 text-sm font-medium transition-all duration-200 touch-manipulation
                ${
                    isActive
                        ? 'bg-[var(--sidebar-item-hover)] text-[var(--foreground)]'
                        : 'text-[var(--muted-foreground)] hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--foreground)]'
                }
            `}
            data-sidebar-item={item.path}
        >
            <div className="flex items-center gap-2">
                <span className="truncate">
                    {item.name === 'home' ? 'Home' : capitalize(item.name)}
                </span>
            </div>
        </Link>
    )
}

const Sidebar = ({ items, baseRoute = '/docs' }: SidebarProps) => {
    const renderSidebarItem = (item: DocItem): React.ReactNode => {
        if (item.children && item.children.length > 0) {
            const isComponents = item.name.toLowerCase() === 'components'
            const marginTop = isComponents ? 'mt-8' : 'mt-6'

            return (
                <div key={item.slug} className={`mb-6 ${marginTop}`}>
                    <div className="flex h-8 shrink-0 items-center gap-2 px-3 text-xs font-semibold text-[var(--sidebar-section-text)] uppercase tracking-wider select-none">
                        {capitalize(item.name)}
                    </div>
                    <div className="mt-2 space-y-1">
                        {item.children.map((child) => renderSidebarItem(child))}
                    </div>
                </div>
            )
        }

        return <SidebarItem key={item.slug} item={item} baseRoute={baseRoute} />
    }

    return (
        <div className="flex flex-col h-full bg-[var(--sidebar-background)]">
            <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-2">
                    {items.map((item) => renderSidebarItem(item))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
