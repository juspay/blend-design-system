'use client'

type TocItem = { title: string; url: string; depth: number }

export function AscentToc({ items }: { items: TocItem[] }) {
    return (
        <aside className="ascent-docs-toc" aria-label="On this page">
            <p>On this page</p>
            <nav>
                {items.map((item) => (
                    <a
                        href={item.url}
                        key={item.url}
                        style={{
                            paddingInlineStart: `${Math.max(item.depth - 2, 0) * 0.75 + 0.75}rem`,
                        }}
                    >
                        {item.title}
                    </a>
                ))}
            </nav>
        </aside>
    )
}
