interface CardTileProps {
    image: string
    title: string
    style: React.CSSProperties
    onClick: () => void
    variant?: 'filtered' | 'canvas'
}

export function CardTile({
    image,
    title,
    style,
    onClick,
    variant = 'canvas',
}: CardTileProps) {
    const isFiltered = variant === 'filtered'

    const skeletonClass = isFiltered
        ? 'absolute inset-0 bg-muted animate-pulse'
        : 'absolute inset-0 bg-muted bg-[linear-gradient(90deg,transparent_0%,hsl(var(--muted-foreground)/0.08)_50%,transparent_100%)] bg-size-[200%_100%] animate-[skeleton-shimmer_1.6s_ease-in-out_infinite]'

    const titleClass = isFiltered
        ? 'text-primary font-medium text-xs leading-snug font-manrope'
        : 'text-foreground/75 font-medium text-xs leading-snug font-manrope tracking-wide'

    return (
        <div
            {...(isFiltered ? { 'data-showcase-card': true } : {})}
            onClick={onClick}
            style={{
                position: 'absolute',
                cursor: 'pointer',
                ...style,
            }}
        >
            <div className="relative w-full h-full group hover:scale-110 duration-75 hover:shadow-lg transition-all ease-out overflow-hidden border border-border/60">
                <div className={skeletonClass} />
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover dark:invert dark:hue-rotate-180 dark:saturate-150 dark:brightness-105"
                    onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-black/70 dark:via-black/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5">
                    <p className={titleClass}>{title}</p>
                </div>
            </div>
        </div>
    )
}
