import TableOfContentsClient from './TableOfContentsClient'

export interface TOCItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    items: TOCItem[]
    className?: string
    maxLevel?: number
}

export default function TableOfContents({
    items,
    className,
    maxLevel,
}: TableOfContentsProps) {
    return (
        <TableOfContentsClient
            items={items}
            className={className}
            maxLevel={maxLevel}
        />
    )
}
