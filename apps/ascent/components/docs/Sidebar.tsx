import { DocItem } from '@/docs/utils'
import { cn } from '@/lib/utils/cn'
import { SidebarItem } from './SidebarItem'

interface SidebarProps {
    items: DocItem[]
    baseRoute: string
    onLinkClick?: () => void
}

const SidebarSection = ({
    item,
    baseRoute,
    onLinkClick,
    isNested = false,
}: {
    item: DocItem
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
        <div className={cn('space-y-1', isNested && 'ml-0')}>
            {item.children!.map((child) =>
                child.children?.length ? (
                    <SidebarSection
                        key={child.slug}
                        item={child}
                        baseRoute={baseRoute}
                        onLinkClick={onLinkClick}
                        isNested={true}
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

export default function Sidebar({
    items,
    baseRoute,
    onLinkClick,
}: SidebarProps) {
    return (
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
}
