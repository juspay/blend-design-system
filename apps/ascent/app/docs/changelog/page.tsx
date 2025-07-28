import fs from 'fs'
import path from 'path'
import { ChangelogViewer } from '../../components/ChangelogViewer'
import { ChangelogEntry } from '../utils/changelogUtils'

export interface ParsedChangelog {
    entries: ChangelogEntry[]
}

/**
 * Advanced markdown changelog parser that supports rich content
 */
function parseAdvancedChangelog(changelogPath: string): ParsedChangelog {
    try {
        if (!fs.existsSync(changelogPath)) {
            return { entries: [] }
        }

        const content = fs.readFileSync(changelogPath, 'utf-8')
        const lines = content.split('\n')
        const entries: ChangelogEntry[] = []

        let currentEntry: ChangelogEntry | null = null
        let currentSection = ''
        let currentContent: string[] = []
        let collectingContent = false

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]

            // Match version headers (e.g., ## [1.0.0] - 2023-01-01)
            const versionMatch = line.match(/^##\s*\[?([^\]]+)\]?\s*-?\s*(.*)$/)
            if (versionMatch) {
                // Save previous entry if exists
                if (currentEntry) {
                    currentEntry.content = currentContent.join('\n').trim()
                    entries.push(currentEntry)
                }

                // Look ahead for title and subtitle
                let title = ''
                let subtitle = ''

                // Check next few lines for title (###) and subtitle (####)
                for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
                    const nextLine = lines[j].trim()
                    if (nextLine.match(/^###\s+(.+)$/)) {
                        title = nextLine.replace(/^###\s+/, '')
                    } else if (nextLine.match(/^####\s+(.+)$/)) {
                        subtitle = nextLine.replace(/^####\s+/, '')
                    } else if (nextLine.match(/^##\s/)) {
                        break // Hit next version
                    }
                }

                currentEntry = {
                    version: versionMatch[1],
                    date: versionMatch[2] || '',
                    title: title || `Version ${versionMatch[1]}`,
                    subtitle: subtitle,
                    content: '',
                    changes: [],
                    images: [],
                    videos: [],
                }

                currentContent = []
                collectingContent = true
                continue
            }

            // Skip if no current entry
            if (!currentEntry) continue

            // Collect all content for this version
            if (collectingContent) {
                currentContent.push(line)

                // Parse specific elements

                // Parse images: ![alt](src) or ![alt](src "caption")
                const imageMatch = line.match(
                    /!\[([^\]]*)\]\(([^)"]+)(?:\s+"([^"]+)")?\)/g
                )
                if (imageMatch) {
                    imageMatch.forEach((match) => {
                        const parts = match.match(
                            /!\[([^\]]*)\]\(([^)"]+)(?:\s+"([^"]+)")?\)/
                        )
                        if (parts && currentEntry) {
                            currentEntry.images = currentEntry.images || []
                            currentEntry.images.push({
                                src: parts[2],
                                alt: parts[1],
                                caption: parts[3],
                            })
                        }
                    })
                }

                // Parse videos: <video> tags
                const videoMatch = line.match(/<video[^>]*>/)
                if (videoMatch) {
                    // Look for src and poster attributes
                    const srcMatch = line.match(/src="([^"]+)"/)
                    const posterMatch = line.match(/poster="([^"]+)"/)

                    if (srcMatch && currentEntry) {
                        currentEntry.videos = currentEntry.videos || []
                        currentEntry.videos.push({
                            src: srcMatch[1],
                            poster: posterMatch ? posterMatch[1] : undefined,
                        })
                    }
                }

                // Parse change categories for structured changes
                const categoryMatch = line.match(
                    /^\*\*([🎨✨⚠️💥🐛🔒⚡📚🔧📝🎭🔌⚙️]+)\s*([^*]+)\*\*/
                )
                if (categoryMatch) {
                    const emoji = categoryMatch[1]
                    const categoryName = categoryMatch[2].trim()

                    // Map emojis to category names
                    const emojiToCategory: Record<string, string> = {
                        '🎨': 'New Component',
                        '✨': 'Enhancement',
                        '🐛': 'Bug Fix',
                        '💥': 'Breaking Change',
                        '🔒': 'Security',
                        '⚡': 'Performance',
                        '📚': 'Documentation',
                        '🔧': 'Design Tokens',
                        '📝': 'Changes',
                        '🎭': 'UI/UX',
                        '🔌': 'API',
                        '⚙️': 'Infrastructure',
                    }

                    const category = emojiToCategory[emoji] || categoryName
                    currentSection = category

                    // Initialize category if not exists
                    if (
                        !currentEntry.changes.find(
                            (c) => c.category === category
                        )
                    ) {
                        currentEntry.changes.push({
                            category,
                            items: [],
                        })
                    }
                }

                // Parse list items under categories
                const listItemMatch = line.match(
                    /^-\s*\*?\*?([^*]+)\*?\*?:?\s*(.+)$/
                )
                if (listItemMatch && currentSection && currentEntry) {
                    const categoryData = currentEntry.changes.find(
                        (c) => c.category === currentSection
                    )
                    if (categoryData) {
                        const item = listItemMatch[2]
                            ? `${listItemMatch[1]}: ${listItemMatch[2]}`
                            : listItemMatch[1]
                        categoryData.items.push(item.trim())
                    }
                }
            }
        }

        // Add the last entry
        if (currentEntry) {
            currentEntry.content = currentContent.join('\n').trim()
            entries.push(currentEntry)
        }

        return { entries }
    } catch (error) {
        console.error('Error parsing advanced changelog:', error)
        return { entries: [] }
    }
}

/**
 * Gets the changelog from the blend package
 */
function getBlendChangelog(): ParsedChangelog {
    const changelogPath = path.join(
        process.cwd(),
        '../../packages/blend/CHANGELOG.md'
    )
    return parseAdvancedChangelog(changelogPath)
}

export default function ChangelogPage() {
    const changelog = getBlendChangelog()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-sm font-medium mb-6">
                        <span className="mr-2">📋</span>
                        Release History
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Changelog
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Track the evolution of Blend Design System. Every
                        update, enhancement, and improvement is documented here
                        with detailed release notes, visual previews, and
                        migration guides.
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8 mt-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {changelog.entries.length}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Total Releases
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {changelog.entries.reduce(
                                    (sum, entry) =>
                                        sum + (entry.images?.length || 0),
                                    0
                                )}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Visual Assets
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {changelog.entries.reduce(
                                    (sum, entry) =>
                                        sum +
                                        entry.changes.reduce(
                                            (catSum, cat) =>
                                                catSum + cat.items.length,
                                            0
                                        ),
                                    0
                                )}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Total Changes
                            </div>
                        </div>
                    </div>
                </div>

                <ChangelogViewer entries={changelog.entries} />
            </div>
        </div>
    )
}
