'use client'

import React, { useState } from 'react'

type VersionHeaderProps = {
    version: string
    date: string
    status: 'stable' | 'beta' | 'alpha'
}

export const VersionHeader = ({
    version,
    date,
    status,
}: VersionHeaderProps) => {
    const statusColors = {
        stable: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        beta: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
        alpha: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    }

    return (
        <div className="mb-8 pb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-[var(--foreground)]">
                    {version}
                </h1>
                <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[status]}`}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </div>
            <p className="text-[var(--muted-foreground)]">
                Released on{' '}
                {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>
        </div>
    )
}

type ChangelogCardProps = {
    summary: string
    children: React.ReactNode
    defaultExpanded?: boolean
    prId?: string | string[]
    prUrl?: string | string[]
    commitHash?: string | string[]
    commitUrl?: string | string[]
}

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

    // Normalize to arrays
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
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg mb-6 overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-6 text-left hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-inset"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        {summary}
                        {(prIds.length > 0 || commitHashes.length > 0) && (
                            <span className="text-sm font-normal ml-2">
                                {prIds.map((id, index) => {
                                    const url =
                                        prUrls[index] ||
                                        `https://github.com/juspay/blend-design-system/pull/${id}`
                                    return (
                                        <span key={`pr-${id}`}>
                                            {index > 0 && ', '}
                                            <a
                                                href={url}
                                                className="commit-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                #{id}
                                            </a>
                                        </span>
                                    )
                                })}
                                {prIds.length > 0 &&
                                    commitHashes.length > 0 &&
                                    ' • '}
                                {commitHashes.map((hash, index) => {
                                    const url =
                                        commitUrls[index] ||
                                        `https://github.com/juspay/blend-design-system/commit/${hash}`
                                    return (
                                        <span key={`commit-${hash}`}>
                                            {index > 0 && ', '}
                                            <a
                                                href={url}
                                                className="commit-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                {hash.substring(0, 7)}
                                            </a>
                                        </span>
                                    )
                                })}
                            </span>
                        )}
                    </h3>
                    <svg
                        className={`w-5 h-5 text-[var(--muted-foreground)] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </button>
            {isExpanded && (
                <div className="px-6 pb-6 border-t border-[var(--border)]">
                    <div className="pt-4 space-y-3">{children}</div>
                </div>
            )}
        </div>
    )
}

type ChangelogEntryProps = {
    type:
        | 'feat'
        | 'fix'
        | 'breaking'
        | 'docs'
        | 'style'
        | 'refactor'
        | 'perf'
        | 'test'
        | 'chore'
    component?: string
    children: React.ReactNode
    prId?: string | string[]
    prUrl?: string | string[]
    commitHash?: string | string[]
    commitUrl?: string | string[]
}

export const ChangelogEntry = ({
    type,
    component,
    children,
    prId,
    prUrl,
    commitHash,
    commitUrl,
}: ChangelogEntryProps) => {
    // Normalize to arrays
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
    const typeColors = {
        feat: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
        fix: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        breaking: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
        docs: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
        style: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
        refactor:
            'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
        perf: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
        test: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
        chore: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200',
    }

    const typeLabels = {
        feat: 'Feature',
        fix: 'Bug Fix',
        breaking: 'Breaking',
        docs: 'Documentation',
        style: 'Style',
        refactor: 'Refactor',
        perf: 'Performance',
        test: 'Test',
        chore: 'Chore',
    }

    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--sidebar-background)]">
            <span
                className={`px-2 py-1 text-xs font-medium rounded ${typeColors[type]} flex-shrink-0`}
            >
                {typeLabels[type]}
            </span>
            <div className="flex-1 min-w-0">
                {(component || prIds.length > 0 || commitHashes.length > 0) && (
                    <div className="flex items-center gap-2 mb-1">
                        {component && (
                            <span className="text-sm font-medium text-[var(--foreground)]">
                                {component}
                            </span>
                        )}
                        {(prIds.length > 0 || commitHashes.length > 0) && (
                            <span className="text-xs text-[var(--muted-foreground)]">
                                {prIds.map((id, index) => {
                                    const url =
                                        prUrls[index] ||
                                        `https://github.com/juspay/blend-design-system/pull/${id}`
                                    return (
                                        <span key={`pr-${id}`}>
                                            {index > 0 && ', '}
                                            <a
                                                href={url}
                                                className="commit-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                #{id}
                                            </a>
                                        </span>
                                    )
                                })}
                                {prIds.length > 0 &&
                                    commitHashes.length > 0 &&
                                    ' • '}
                                {commitHashes.map((hash, index) => {
                                    const url =
                                        commitUrls[index] ||
                                        `https://github.com/juspay/blend-design-system/commit/${hash}`
                                    return (
                                        <span key={`commit-${hash}`}>
                                            {index > 0 && ', '}
                                            <a
                                                href={url}
                                                className="commit-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {hash.substring(0, 7)}
                                            </a>
                                        </span>
                                    )
                                })}
                            </span>
                        )}
                    </div>
                )}
                <div className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    )
}
