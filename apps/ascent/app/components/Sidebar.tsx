'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { BookOpen, Palette, ChevronRight, Home } from 'lucide-react'
import { DocItem } from '../docs/utils/scanDirectory'

const capitalize = (str: string) => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const getSectionIcon = (name: string) => {
    const iconProps = {
        size: 16,
        className: 'text-[var(--sidebar-section-text)]',
    }

    switch (name.toLowerCase()) {
        case 'getting-started':
            return <Home {...iconProps} />
        case 'guides':
            return <BookOpen {...iconProps} />
        case 'foundations':
            return <Palette {...iconProps} />
        default:
            return null
    }
}

const SidebarItem = ({
    item,
    level = 0,
}: {
    item: DocItem
    level?: number
}) => {
    const pathname = usePathname()
    const isActive = pathname === `/docs/${item.path}`

    if (item.children && item.children.length > 0) {
        const isComponents = item.name.toLowerCase() === 'components'
        const marginTop = isComponents ? 'mt-8' : 'mt-6'

        return (
            <div key={item.slug} className={`mb-6 ${marginTop}`}>
                <div className="flex h-8 shrink-0 items-center gap-2 px-3 text-xs font-semibold text-[var(--sidebar-section-text)] uppercase tracking-wider select-none">
                    {getSectionIcon(item.name)}
                    {capitalize(item.name)}
                </div>
                <div className="mt-2 space-y-1">
                    {item.children.map((child) => (
                        <SidebarItem
                            key={child.slug}
                            item={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <Link
            href={`/docs/${item.path}`}
            className={`
                group flex h-8 shrink-0 items-center justify-between rounded-lg px-3 text-sm font-medium transition-all duration-200 touch-manipulation
                ${
                    isActive
                        ? 'bg-[var(--accent)] text-white border-l-2 border-[var(--accent)]'
                        : 'text-[var(--muted-foreground)] hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--foreground)]'
                }
            `}
            data-sidebar-item={item.path}
        >
            <span className="truncate">{capitalize(item.name)}</span>
            {isActive && (
                <ChevronRight size={14} className="text-white opacity-80" />
            )}
        </Link>
    )
}

const Sidebar = ({ items }: { items: DocItem[] }) => {
    const renderSidebarItem = (item: DocItem): React.ReactNode => {
        if (item.children && item.children.length > 0) {
            const isComponents = item.name.toLowerCase() === 'components'
            const marginTop = isComponents ? 'mt-8' : 'mt-6'

            return (
                <div key={item.slug} className={`mb-6 ${marginTop}`}>
                    <div className="flex h-8 shrink-0 items-center gap-2 px-3 text-xs font-semibold text-[var(--sidebar-section-text)] uppercase tracking-wider select-none">
                        {getSectionIcon(item.name)}
                        {capitalize(item.name)}
                    </div>
                    <div className="mt-2 space-y-1">
                        {item.children.map((child) => renderSidebarItem(child))}
                    </div>
                </div>
            )
        }

        return <SidebarItem key={item.slug} item={item} />
    }

    return (
        <div className="flex flex-col h-full bg-[var(--sidebar-background)] border-r border-[var(--sidebar-border)]">
            <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-2">
                    {items.map((item) => renderSidebarItem(item))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
