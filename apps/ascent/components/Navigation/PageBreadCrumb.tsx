import { cn } from '@/lib'
import { Undo2 } from 'lucide-react'

export const PageBreadcrumb = ({
    items,
    className,
    style,
}: {
    items: Array<{ label: string; href: string }>
    className?: string
    style?: React.CSSProperties
}) => {
    return (
        <nav
            className={cn(
                'px-5 py-2.5 border-b border-border bg-surface w-full max-h-10 z-99',
                className
            )}
            aria-label="Breadcrumb"
            style={style}
        >
            <ol className="flex items-center text-sm">
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                        {index > 0 && (
                            <span className="mx-2 text-muted-foreground">
                                /
                            </span>
                        )}

                        {index === items.length - 1 ? (
                            <span
                                className="flex items-center gap-x-1.5 text-nav-section-text"
                                data-nav-content
                            >
                                {index === 0 && (
                                    <Undo2 className="w-3.5 h-3.5" />
                                )}
                                <span>{item.label}</span>
                            </span>
                        ) : (
                            <a
                                href={item.href}
                                className="flex items-center gap-x-1.5 text-nav-section-text-foreground hover:text-foreground transition-colors"
                                data-nav-content
                            >
                                {index === 0 && (
                                    <Undo2 className="w-3.5 h-3.5" />
                                )}
                                <span>{item.label}</span>
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
