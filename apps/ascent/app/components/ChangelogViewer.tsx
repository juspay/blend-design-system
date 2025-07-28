'use client'

import { useState } from 'react'
import {
    ChangelogEntry,
    getCategoryIcon,
    getCategoryColor,
    formatDate,
    getVersionBadgeColor,
} from '../docs/utils/changelogUtils'

interface ChangelogViewerProps {
    entries: ChangelogEntry[]
}

export function ChangelogViewer({ entries }: ChangelogViewerProps) {
    const [expandedVersions, setExpandedVersions] = useState<Set<string>>(
        new Set([entries[0]?.version].filter(Boolean))
    )
    const [filter, setFilter] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const toggleVersion = (version: string) => {
        const newExpanded = new Set(expandedVersions)
        if (newExpanded.has(version)) {
            newExpanded.delete(version)
        } else {
            newExpanded.add(version)
        }
        setExpandedVersions(newExpanded)
    }

    const toggleAll = () => {
        if (expandedVersions.size === entries.length) {
            setExpandedVersions(new Set())
        } else {
            setExpandedVersions(new Set(entries.map((entry) => entry.version)))
        }
    }

    // Get all unique categories for filtering
    const allCategories = Array.from(
        new Set(
            entries.flatMap((entry) =>
                entry.changes.map((change) => change.category)
            )
        )
    )

    // Filter entries based on search and category
    const filteredEntries = entries.filter((entry) => {
        const matchesSearch =
            filter === '' ||
            entry.version.toLowerCase().includes(filter.toLowerCase()) ||
            entry.title.toLowerCase().includes(filter.toLowerCase()) ||
            entry.content.toLowerCase().includes(filter.toLowerCase())

        const matchesCategory =
            selectedCategory === 'all' ||
            entry.changes.some((change) => change.category === selectedCategory)

        return matchesSearch && matchesCategory
    })

    if (entries.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-6">📋</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    No changelog entries found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    The changelog is empty or could not be loaded. Check back
                    later for updates.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search releases..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="all">All Categories</option>
                            {allCategories.map((category) => (
                                <option key={category} value={category}>
                                    {getCategoryIcon(category)} {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Toggle All Button */}
                    <button
                        onClick={toggleAll}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                        {expandedVersions.size === filteredEntries.length
                            ? 'Collapse All'
                            : 'Expand All'}
                    </button>
                </div>

                {/* Results Info */}
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredEntries.length} of {entries.length}{' '}
                    releases
                    {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

                {/* Changelog entries */}
                <div className="space-y-8">
                    {filteredEntries.map((entry, index) => {
                        const isExpanded = expandedVersions.has(entry.version)
                        const hasChanges = entry.changes.length > 0
                        const totalChanges = entry.changes.reduce(
                            (sum, category) => sum + category.items.length,
                            0
                        )

                        return (
                            <div key={entry.version} className="relative pl-20">
                                {/* Timeline marker */}
                                <div className="absolute left-6 w-4 h-4 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full shadow-lg"></div>

                                {/* Entry card */}
                                <div
                                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-lg'}`}
                                >
                                    {/* Header */}
                                    <button
                                        onClick={() =>
                                            toggleVersion(entry.version)
                                        }
                                        className="w-full p-8 text-left transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                {/* Version and Date */}
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getVersionBadgeColor(entry.version)}`}
                                                    >
                                                        v{entry.version}
                                                    </span>
                                                    {entry.date && (
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(
                                                                entry.date
                                                            )}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Title and Subtitle */}
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                    {entry.title}
                                                </h3>
                                                {entry.subtitle && (
                                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                                        {entry.subtitle}
                                                    </p>
                                                )}

                                                {/* Quick stats */}
                                                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                                    {hasChanges && (
                                                        <span className="flex items-center gap-1">
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M9 5l7 7-7 7"
                                                                />
                                                            </svg>
                                                            {totalChanges}{' '}
                                                            change
                                                            {totalChanges !== 1
                                                                ? 's'
                                                                : ''}
                                                        </span>
                                                    )}
                                                    {entry.images &&
                                                        entry.images.length >
                                                            0 && (
                                                            <span className="flex items-center gap-1">
                                                                🖼️{' '}
                                                                {
                                                                    entry.images
                                                                        .length
                                                                }{' '}
                                                                image
                                                                {entry.images
                                                                    .length !==
                                                                1
                                                                    ? 's'
                                                                    : ''}
                                                            </span>
                                                        )}
                                                    {entry.videos &&
                                                        entry.videos.length >
                                                            0 && (
                                                            <span className="flex items-center gap-1">
                                                                🎥{' '}
                                                                {
                                                                    entry.videos
                                                                        .length
                                                                }{' '}
                                                                video
                                                                {entry.videos
                                                                    .length !==
                                                                1
                                                                    ? 's'
                                                                    : ''}
                                                            </span>
                                                        )}
                                                </div>
                                            </div>

                                            {/* Expand icon */}
                                            <div className="ml-4 flex-shrink-0">
                                                <div
                                                    className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                                                >
                                                    <svg
                                                        className="w-6 h-6 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expanded content */}
                                    {isExpanded && (
                                        <div className="border-t border-gray-200 dark:border-gray-700">
                                            {/* Images */}
                                            {entry.images &&
                                                entry.images.length > 0 && (
                                                    <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                                            Visual Preview
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            {entry.images.map(
                                                                (
                                                                    image,
                                                                    imgIndex
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            imgIndex
                                                                        }
                                                                        className="group"
                                                                    >
                                                                        <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                                                                            <img
                                                                                src={
                                                                                    image.src
                                                                                }
                                                                                alt={
                                                                                    image.alt
                                                                                }
                                                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                                                            />
                                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                                                                        </div>
                                                                        {image.caption && (
                                                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                                                                                {
                                                                                    image.caption
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                            {/* Videos */}
                                            {entry.videos &&
                                                entry.videos.length > 0 && (
                                                    <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                                            Video Demo
                                                        </h4>
                                                        <div className="space-y-6">
                                                            {entry.videos.map(
                                                                (
                                                                    video,
                                                                    vidIndex
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            vidIndex
                                                                        }
                                                                    >
                                                                        <video
                                                                            controls
                                                                            poster={
                                                                                video.poster
                                                                            }
                                                                            className="w-full rounded-xl shadow-lg"
                                                                        >
                                                                            <source
                                                                                src={
                                                                                    video.src
                                                                                }
                                                                                type="video/mp4"
                                                                            />
                                                                            Your
                                                                            browser
                                                                            does
                                                                            not
                                                                            support
                                                                            the
                                                                            video
                                                                            tag.
                                                                        </video>
                                                                        {video.caption && (
                                                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                                                                                {
                                                                                    video.caption
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                            {/* Content */}
                                            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                                    {entry.content
                                                        .split('\n')
                                                        .map(
                                                            (
                                                                line,
                                                                lineIndex
                                                            ) => {
                                                                if (
                                                                    line.trim() ===
                                                                    ''
                                                                )
                                                                    return (
                                                                        <br
                                                                            key={
                                                                                lineIndex
                                                                            }
                                                                        />
                                                                    )
                                                                if (
                                                                    line.startsWith(
                                                                        '###'
                                                                    )
                                                                )
                                                                    return null // Skip headers as they're in title/subtitle
                                                                if (
                                                                    line.startsWith(
                                                                        '####'
                                                                    )
                                                                )
                                                                    return null
                                                                if (
                                                                    line.startsWith(
                                                                        '!['
                                                                    )
                                                                )
                                                                    return null // Skip images as they're rendered separately
                                                                if (
                                                                    line.includes(
                                                                        '<video'
                                                                    )
                                                                )
                                                                    return null // Skip videos as they're rendered separately

                                                                // Render markdown-style content
                                                                if (
                                                                    line.startsWith(
                                                                        '> '
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <blockquote
                                                                            key={
                                                                                lineIndex
                                                                            }
                                                                            className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400"
                                                                        >
                                                                            {line.substring(
                                                                                2
                                                                            )}
                                                                        </blockquote>
                                                                    )
                                                                }

                                                                if (
                                                                    line.match(
                                                                        /^```/
                                                                    )
                                                                )
                                                                    return null // Skip code blocks for now

                                                                return (
                                                                    <p
                                                                        key={
                                                                            lineIndex
                                                                        }
                                                                        className="mb-4 leading-relaxed"
                                                                    >
                                                                        {line}
                                                                    </p>
                                                                )
                                                            }
                                                        )}
                                                </div>
                                            </div>

                                            {/* Changes */}
                                            {hasChanges && (
                                                <div className="p-8">
                                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                                        What's Changed
                                                    </h4>
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                        {entry.changes.map(
                                                            (category) => (
                                                                <div
                                                                    key={
                                                                        category.category
                                                                    }
                                                                    className="group"
                                                                >
                                                                    <div
                                                                        className={`rounded-xl border-2 overflow-hidden transition-all duration-200 hover:shadow-lg ${getCategoryColor(category.category)}`}
                                                                    >
                                                                        <div className="px-4 py-3 border-b border-current/20">
                                                                            <h5 className="flex items-center gap-2 font-semibold">
                                                                                <span className="text-lg">
                                                                                    {getCategoryIcon(
                                                                                        category.category
                                                                                    )}
                                                                                </span>
                                                                                <span>
                                                                                    {
                                                                                        category.category
                                                                                    }
                                                                                </span>
                                                                                <span className="ml-auto text-xs opacity-75 bg-current/10 px-2 py-1 rounded-full">
                                                                                    {
                                                                                        category
                                                                                            .items
                                                                                            .length
                                                                                    }
                                                                                </span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="p-4 bg-white/50 dark:bg-black/20">
                                                                            <ul className="space-y-2">
                                                                                {category.items.map(
                                                                                    (
                                                                                        item,
                                                                                        index
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            className="flex items-start gap-2 text-sm leading-relaxed"
                                                                                        >
                                                                                            <span className="text-current/60 mt-1.5 flex-shrink-0">
                                                                                                •
                                                                                            </span>
                                                                                            <span>
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </span>
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
