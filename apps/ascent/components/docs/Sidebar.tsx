'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { DocItem } from '@/docs/utils'
import { cn } from '@/lib/utils/cn'

interface SidebarProps {
    items: DocItem[]
    baseRoute: string
    onLinkClick?: () => void
}

const encodePath = (path: string) =>
    path
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/')

const normalize = (path: string) =>
    path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path

const SidebarItem = ({
    item,
    baseRoute,
    onLinkClick,
}: {
    item: DocItem
    baseRoute: string
    onLinkClick?: () => void
}) => {
    const pathname = usePathname()
    const href = `${baseRoute}/${encodePath(item.path)}`
    const isActive =
        normalize(pathname) === normalize(`${baseRoute}/${item.path}`)

    return (
        <Link
            href={href}
            onClick={onLinkClick}
            className={cn(
                'flex shrink-0 items-center rounded-lg py-2 px-3 text-base transition-all duration-120 tracking-[-0.32px] capitalize',
                isActive
                    ? 'bg-sidebar-item-active text-foreground'
                    : 'text-nav-section-text hover:bg-sidebar-item-hover hover:text-foreground'
            )}
        >
            <span className="truncate">{item.name}</span>
        </Link>
    )
}

const SidebarSection = ({
    item,
    baseRoute,
    onLinkClick,
}: {
    item: DocItem
    baseRoute: string
    onLinkClick?: () => void
}) => (
    <div>
        <div className="flex items-center px-3 text-xs uppercase text-nav-section-text-foreground select-none tracking-wider my-6 font-medium">
            {item.name}
        </div>
        <div className="space-y-2">
            {item.children!.map((child) =>
                child.children?.length ? (
                    <SidebarSection
                        key={child.slug}
                        item={child}
                        baseRoute={baseRoute}
                        onLinkClick={onLinkClick}
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

const Sidebar = ({ items, baseRoute, onLinkClick }: SidebarProps) => (
    <nav className="flex flex-col py-3 px-2 gap-2">
        {items.map((item) =>
            item.children?.length ? (
                <SidebarSection
                    key={item.slug}
                    item={item}
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

export default Sidebar
