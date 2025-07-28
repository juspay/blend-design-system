export interface ChangelogEntry {
    version: string
    date: string
    title: string
    subtitle?: string
    content: string // Raw markdown content
    changes: {
        category: string
        items: string[]
    }[]
    images?: {
        src: string
        alt: string
        caption?: string
    }[]
    videos?: {
        src: string
        poster?: string
        caption?: string
    }[]
}

export interface ParsedChangelog {
    entries: ChangelogEntry[]
}

/**
 * Maps change categories to emoji and styling
 */
export function getCategoryIcon(category: string): string {
    const categoryMap: Record<string, string> = {
        Added: '🎨',
        Changed: '✨',
        Deprecated: '⚠️',
        Removed: '💥',
        Fixed: '🐛',
        Security: '🔒',
        Performance: '⚡',
        Documentation: '📚',
        Tokens: '🔧',
        Changes: '📝',
        Enhancement: '✨',
        'New Component': '🎨',
        'Component Enhancement': '✨',
        'Bug Fix': '🐛',
        'Breaking Change': '💥',
        'Design Tokens': '🔧',
        Accessibility: '🔒',
        'UI/UX': '🎭',
        API: '🔌',
        Infrastructure: '⚙️',
    }

    return categoryMap[category] || '📝'
}

/**
 * Maps change categories to color classes
 */
export function getCategoryColor(category: string): string {
    const colorMap: Record<string, string> = {
        Added: 'text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
        Changed:
            'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800',
        Deprecated:
            'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800',
        Removed:
            'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800',
        Fixed: 'text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800',
        Security:
            'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800',
        Performance:
            'text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-900/20 dark:border-indigo-800',
        Documentation:
            'text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800',
        Tokens: 'text-pink-700 bg-pink-50 border-pink-200 dark:text-pink-400 dark:bg-pink-900/20 dark:border-pink-800',
        Changes:
            'text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800',
        Enhancement:
            'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800',
        'New Component':
            'text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
        'Component Enhancement':
            'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800',
        'Bug Fix':
            'text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800',
        'Breaking Change':
            'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800',
        'Design Tokens':
            'text-pink-700 bg-pink-50 border-pink-200 dark:text-pink-400 dark:bg-pink-900/20 dark:border-pink-800',
        Accessibility:
            'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800',
        'UI/UX':
            'text-violet-700 bg-violet-50 border-violet-200 dark:text-violet-400 dark:bg-violet-900/20 dark:border-violet-800',
        API: 'text-cyan-700 bg-cyan-50 border-cyan-200 dark:text-cyan-400 dark:bg-cyan-900/20 dark:border-cyan-800',
        Infrastructure:
            'text-slate-700 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-slate-900/20 dark:border-slate-800',
    }

    return (
        colorMap[category] ||
        'text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800'
    )
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    } catch {
        return dateString
    }
}

/**
 * Get version badge color based on version type
 */
export function getVersionBadgeColor(version: string): string {
    if (version.includes('alpha') || version.includes('beta')) {
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
    }
    if (version.includes('rc')) {
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
    }
    // Check if it's a major version (x.0.0)
    const versionParts = version.split('.')
    if (
        versionParts.length >= 2 &&
        versionParts[1] === '0' &&
        versionParts[2] === '0'
    ) {
        return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
    }
    // Minor version (x.y.0)
    if (versionParts.length >= 3 && versionParts[2] === '0') {
        return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
    }
    // Patch version
    return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800'
}
