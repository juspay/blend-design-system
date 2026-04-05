'use client'
import { useState } from 'react'
import type { ChangelogCardProps } from '@/lib/types'
import Link from 'next/link'
import { cn } from '@/lib'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Timeline } from './Timeline'

export const ChangelogCard = ({
    summary,
    children,
    defaultExpanded = false,
    prId,
    prUrl,
    commitHash,
    commitUrl,
}: ChangelogCardProps) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded)

    const prIds = Array.isArray(prId) ? prId : prId ? [prId] : []
    const prUrls = Array.isArray(prUrl) ? prUrl : prUrl ? [prUrl] : []
    const commitHashes = Array.isArray(commitHash)
        ? commitHash
        : commitHash
          ? [commitHash]
          : []
    const commitUrls = Array.isArray(commitUrl)
        ? commitUrl
        : commitUrl
          ? [commitUrl]
          : []

    return (
        <div className="border-x border-b border-border overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    'sticky top-0 z-10 w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-surface hover:bg-sidebar-item-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset border-border',
                    isExpanded && 'border-b'
                )}
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex items-center gap-2">
                        <ChevronDown
                            className={cn(
                                'w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0',
                                isExpanded ? 'rotate-0' : '-rotate-90'
                            )}
                        />
                        <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 sm:line-clamp-1">
                            {summary}
                        </h3>
                    </div>

                    <div className="flex items-center gap-3 text-sm ml-6 sm:ml-0">
                        {prIds.map((id, i) => {
                            const url =
                                prUrls[i] ||
                                `https://github.com/juspay/blend-design-system/pull/${id}`
                            return (
                                <Link
                                    key={`pr-${id}`}
                                    href={url}
                                    className="flex items-center gap-1 text-blue-600 dark:text-blue-500 font-medium hover:underline text-xs sm:text-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    PR
                                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Link>
                            )
                        })}
                        {commitHashes.map((hash, i) => {
                            const url =
                                commitUrls[i] ||
                                `https://github.com/juspay/blend-design-system/commit/${hash}`
                            return (
                                <Link
                                    key={`commit-${hash}`}
                                    href={url}
                                    className="flex items-center gap-1 text-blue-600 dark:text-blue-500 hover:underline font-medium text-xs sm:text-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Commit
                                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </button>

            {isExpanded && (
                <div className="py-2 sm:py-4 px-4 sm:px-6">
                    <Timeline>{children}</Timeline>
                </div>
            )}
        </div>
    )
}
