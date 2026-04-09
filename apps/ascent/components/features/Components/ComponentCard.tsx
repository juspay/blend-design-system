import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface ComponentCardProps {
    title: string
    href: string
    preview: React.ReactNode
    className?: string
}

const ComponentCard = ({
    title,
    href,
    preview,
    className,
}: ComponentCardProps) => {
    return (
        <Link
            href={href}
            className={cn(
                'group flex flex-col bg-surface',
                'transition-colors duration-200',
                'hover:bg-sidebar-item-hover',
                className
            )}
        >
            {/* Preview Area */}
            <div className="flex-1 min-h-62 flex items-center justify-center p-6 bg-background relative overflow-hidden">
                {preview}
            </div>

            {/* Title Area */}
            <div className="border-t border-border p-3">
                <h3 className="text-[18px] font-manrope font-medium text-primary tracking-tight">
                    {title}
                </h3>
            </div>
        </Link>
    )
}

export default ComponentCard
