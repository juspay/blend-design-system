'use client'

import { useState } from 'react'
import { StackIcon } from '@phosphor-icons/react'

interface ComponentsDisplayProps {
    components: string[]
    initialLimit?: number
}

export default function ComponentsDisplay({
    components,
    initialLimit = 8,
}: ComponentsDisplayProps) {
    const [expanded, setExpanded] = useState(false)

    const hasOverflow = components.length > initialLimit
    const visibleComponents = expanded
        ? components
        : components.slice(0, initialLimit)
    const overflowCount = components.length - initialLimit

    return (
        <div className="pb-8 flex flex-col gap-4">
            <div className="max-w-xl mx-auto flex flex-wrap items-center justify-center gap-3">
                {visibleComponents.map((component) => (
                    <span
                        key={component}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium bg-secondary/50 text-primary border border-border/60"
                    >
                        <StackIcon size={12} weight="fill" />
                        {component}
                    </span>
                ))}

                {hasOverflow && !expanded && (
                    <button
                        onClick={() => setExpanded(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium bg-secondary/50 text-primary border border-border/60 hover:bg-secondary transition-colors cursor-pointer"
                    >
                        +{overflowCount}
                    </button>
                )}

                {expanded && hasOverflow && (
                    <button
                        onClick={() => setExpanded(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium bg-secondary/50 text-primary border border-border/60 hover:bg-secondary transition-colors cursor-pointer"
                    >
                        Show less
                    </button>
                )}
            </div>
        </div>
    )
}
