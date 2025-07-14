'use client'

import Link from 'next/link'
import React from 'react'
import { DocItem } from '../docs/utils/scanDirectory'

const capitalize = (str: string) => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const SidebarItem = ({
    item,
    level = 0,
}: {
    item: DocItem
    level?: number
}) => {
    const paddingLeft = (level - 1) * 16

    if (item.children && item.children.length > 0) {
        return (
            <div key={item.slug} className="py-6">
                <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs outline-hidden text-[var(--muted-foreground)] font-medium select-none">
                    {capitalize(item.name)}
                </div>
                {item.children.map((child) => (
                    <SidebarItem
                        key={child.slug}
                        item={child}
                        level={level + 1}
                    />
                ))}
            </div>
        )
    }

    return (
        <Link
            href={`/docs/${item.path}`}
            className="flex h-8 shrink-0 items-center rounded-md px-2 text-sm outline-hidden text-[var(--foreground)] font-medium hover:bg-black/5 touch-manipulation"
        >
            {capitalize(item.name)}
        </Link>
    )
}

const Sidebar = ({ items }: { items: DocItem[] }) => {
    return (
        <div className="flex m-2 flex-col gap-1 h-full overflow-y-auto px-2">
            {items.map((item) => (
                <SidebarItem key={item.slug} item={item} />
            ))}
        </div>
    )
}

export default Sidebar
