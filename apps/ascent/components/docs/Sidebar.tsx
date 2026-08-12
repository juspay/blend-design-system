'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { DocItem } from '@/docs/utils'
import { cn } from '@/lib/utils/cn'
import { SidebarItem } from './SidebarItem'
import { useDocsVersion, type Version } from '@/lib/hooks/useDocsVersion'

interface SidebarProps {
    items: DocItem[]
    baseRoute: string
    onLinkClick?: () => void
}

interface SectionItem extends DocItem {
    children: DocItem[]
}

const VERSION_NUM: Record<Version, number> = { '1': 1, '2': 2 }

const normalizePath = (path: string) =>
    path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path

const sectionContainsPath = (
    pathname: string,
    baseRoute: string,
    sectionPath: string
) =>
    normalizePath(pathname).startsWith(
        normalizePath(`${baseRoute}/${sectionPath}`)
    )

//Filtering
function filterByVersion(
    items: DocItem[],
    version: Version,
    isInsideComponents = false
): DocItem[] {
    return items
        .map((item): DocItem | null => {
            const insideComponents =
                isInsideComponents || item.slug === 'components'

            if (item.children?.length) {
                const filteredChildren = filterByVersion(
                    item.children,
                    version,
                    insideComponents
                )

                if (insideComponents && item.slug !== 'components') {
                    return filteredChildren.length
                        ? { ...item, children: filteredChildren }
                        : null
                }

                return { ...item, children: filteredChildren }
            }

            if (insideComponents) {
                const itemVersion = item.version ?? 1
                return itemVersion === VERSION_NUM[version] ? item : null
            }

            return item
        })
        .filter((item): item is DocItem => item !== null)
}

// SidebarSection

const SidebarSection = ({
    item,
    baseRoute,
    onLinkClick,
    isNested = false,
}: {
    item: SectionItem
    baseRoute: string
    onLinkClick?: () => void
    isNested?: boolean
}) => {
    const pathname = usePathname()
    const isCurrentSection = sectionContainsPath(pathname, baseRoute, item.path)
    const [isOpen, setIsOpen] = useState(
        item.slug === 'components' || isNested || isCurrentSection
    )
    const sectionId = `sidebar-section-${item.path.replace(/[^a-zA-Z0-9]/g, '-')}`

    useEffect(() => {
        if (isCurrentSection) setIsOpen(true)
    }, [isCurrentSection])

    return (
        <div className={isNested ? 'mt-6' : ''}>
            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={sectionId}
                onClick={() => setIsOpen((open) => !open)}
                className={cn(
                    'flex w-full items-center justify-between px-3 text-xs uppercase text-nav-section-text-foreground select-none tracking-wider font-medium cursor-pointer',
                    isNested ? 'my-3' : 'my-6'
                )}
            >
                {item.name}
                <ChevronDown
                    aria-hidden="true"
                    size={14}
                    className={cn(
                        'transition-transform duration-150',
                        isOpen ? 'rotate-0' : '-rotate-90'
                    )}
                />
            </button>
            {isOpen && (
                <div id={sectionId} className="space-y-1">
                    {item.children.map((child) =>
                        child.children?.length ? (
                            <SidebarSection
                                key={child.slug}
                                item={child as SectionItem}
                                baseRoute={baseRoute}
                                onLinkClick={onLinkClick}
                                isNested
                            />
                        ) : (
                            <SidebarItem
                                key={child.slug}
                                item={child}
                                baseRoute={baseRoute}
                                onLinkClick={onLinkClick}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    )
}

//Sidebar

export default function Sidebar({
    items,
    baseRoute,
    onLinkClick,
}: SidebarProps) {
    const [version] = useDocsVersion()

    const filtered = useMemo(
        () => filterByVersion(items, version),
        [items, version]
    )

    return (
        <nav className="flex flex-col py-3 px-2 gap-2">
            {filtered.map((item) =>
                item.children?.length ? (
                    <SidebarSection
                        key={item.slug}
                        item={item as SectionItem}
                        baseRoute={baseRoute}
                        onLinkClick={onLinkClick}
                    />
                ) : (
                    <SidebarItem
                        key={item.slug}
                        item={item}
                        baseRoute={baseRoute}
                        onLinkClick={onLinkClick}
                    />
                )
            )}
        </nav>
    )
}
