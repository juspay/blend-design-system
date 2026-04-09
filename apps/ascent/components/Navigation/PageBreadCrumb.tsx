import { cn } from '@/lib'
import { ArrowUUpLeftIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

export const PageBreadcrumb = ({
    items,
    className,
    style,
    mobileTrigger,
}: {
    items: Array<{ label: string; href: string }>
    className?: string
    style?: React.CSSProperties
    mobileTrigger?: React.ReactNode
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
            <div className="flex items-center justify-between gap-3 min-w-0">
                <ol className="flex items-center text-sm min-w-0 overflow-hidden">
                    {items.map((item, index) => (
                        <li
                            key={item.href}
                            className="flex items-center min-w-0 overflow-hidden"
                        >
                            {index > 0 && (
                                <span className="mx-2 text-muted-foreground shrink-0">
                                    /
                                </span>
                            )}

                            {index === items.length - 1 ? (
                                <span
                                    className="flex items-center gap-x-1.5 text-nav-section-text min-w-0 overflow-hidden"
                                    data-nav-content
                                >
                                    {index === 0 && (
                                        <ArrowUUpLeftIcon className="w-3.5 h-3.5 shrink-0" />
                                    )}
                                    <span className="truncate">
                                        {item.label}
                                    </span>
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-x-1.5 text-nav-section-text-foreground hover:text-foreground transition-colors shrink-0"
                                    data-nav-content
                                >
                                    {index === 0 && (
                                        <ArrowUUpLeftIcon className="w-3.5 h-3.5" />
                                    )}
                                    <span>{item.label}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
                {mobileTrigger && (
                    <div className="lg:hidden shrink-0">{mobileTrigger}</div>
                )}
            </div>
        </nav>
    )
}
