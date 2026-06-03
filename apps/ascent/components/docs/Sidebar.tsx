'use client'

import React, { useMemo } from 'react'
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
}) => (
    <div className={isNested ? 'mt-6' : ''}>
        <div
            className={cn(
                'flex items-center px-3 text-xs uppercase text-nav-section-text-foreground select-none tracking-wider font-medium',
                isNested ? 'my-3' : 'my-6'
            )}
        >
            {item.name}
        </div>

        <div className="space-y-1">
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
    </div>
)

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
