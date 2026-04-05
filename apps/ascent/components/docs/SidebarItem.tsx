'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DocItem } from '@/docs/utils'
import { cn } from '@/lib/utils/cn'

const encodePath = (path: string) =>
    path
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/')

const normalize = (path: string) =>
    path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path

interface SidebarItemProps {
    item: DocItem
    baseRoute: string
    onLinkClick?: () => void
}

export function SidebarItem({
    item,
    baseRoute,
    onLinkClick,
}: SidebarItemProps) {
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
