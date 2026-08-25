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

// Category sections are synthetic (`components/category/actions`) and never
// prefix-match the real URL, so containment has to be checked by descendant.
const containsActiveDoc = (
    item: DocItem,
    pathname: string,
    baseRoute: string
): boolean =>
    (item.children ?? []).some((child) =>
        child.children?.length
            ? containsActiveDoc(child, pathname, baseRoute)
            : normalizePath(pathname) ===
              normalizePath(`${baseRoute}/${child.path}`)
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
    const isCurrentSection =
        sectionContainsPath(pathname, baseRoute, item.path) ||
        containsActiveDoc(item, pathname, baseRoute)
    // Category groups start collapsed; only the one holding the current doc opens.
    const [isOpen, setIsOpen] = useState(
        item.slug === 'components' || isCurrentSection
    )
    const sectionId = `sidebar-section-${item.path.replace(/[^a-zA-Z0-9]/g, '-')}`
    // A top-level section that groups further sections (e.g. Components ->
    // Actions / Data / Display) gets a rail so the containment is visible.
    const hasSubSections = item.children.some((child) => child.children?.length)

    useEffect(() => {
        if (isCurrentSection) setIsOpen(true)
    }, [isCurrentSection])

    return (
        <div>
            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={sectionId}
                onClick={() => setIsOpen((open) => !open)}
                className={cn(
                    'flex w-full items-center justify-between px-3 text-xs uppercase select-none tracking-wider cursor-pointer',
                    isNested
                        ? 'py-1 font-medium text-nav-section-text-foreground'
                        : 'mt-4 mb-3 font-semibold text-nav-section-text'
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
                <div
                    id={sectionId}
                    className={cn(
                        'flex flex-col',
                        isNested && 'gap-1 pt-2 pl-1.5',
                        !isNested &&
                            (hasSubSections
                                ? 'ml-3 gap-7 border-l border-border pt-4 pl-1.5'
                                : 'gap-1')
                    )}
                >
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
