'use client'
import { useState, Children } from 'react'
import type { ChangelogCardProps } from '@/lib/types'
import Link from 'next/link'
import { cn } from '@/lib'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

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
                    'sticky top-0 z-10 w-full px-6 py-4 text-left bg-surface hover:bg-sidebar-item-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset border-border',
                    isExpanded && 'border-b'
                )}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ChevronDown
                            className={cn(
                                'w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0',
                                isExpanded ? 'rotate-0' : '-rotate-90'
                            )}
                        />
                        <h3 className="text-base font-semibold text-foreground">
                            {summary}
                        </h3>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        {prIds.map((id, i) => {
                            const url =
                                prUrls[i] ||
                                `https://github.com/juspay/blend-design-system/pull/${id}`
                            return (
                                <Link
                                    key={`pr-${id}`}
                                    href={url}
                                    className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    PR
                                    <ArrowUpRight className="w-4 h-4" />
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
                                    className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Commit
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </button>

            {isExpanded && (
                <div className="py-4 px-6">
                    <div className="relative">
                        {(() => {
                            const count = Children.count(children)
                            return count > 1 ? (
                                <div
                                    className="absolute left-[9px] w-px bg-green-600/30"
                                    style={{
                                        top: '6px',
                                        height: 'calc(100%)',
                                    }}
                                />
                            ) : null
                        })()}
                        <div className="space-y-6 relative">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
