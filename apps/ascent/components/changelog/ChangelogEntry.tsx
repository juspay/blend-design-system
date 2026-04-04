import type { ChangelogEntryProps } from '@/lib/types'

export const ChangelogEntry = ({
    type,
    component,
    children,
    prId,
    prUrl,
    commitHash,
    commitUrl,
}: ChangelogEntryProps) => {
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

    const typeConfig: Record<string, { label: string; className: string }> = {
        feat: {
            label: 'Feature',
            className:
                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        },
        fix: {
            label: 'Bug Fix',
            className:
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        },
        breaking: {
            label: 'Breaking',
            className:
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        },
        docs: {
            label: 'Documentation',
            className:
                'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        },
        style: {
            label: 'Style',
            className:
                'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        },
        refactor: {
            label: 'Refactor',
            className:
                'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        },
        perf: {
            label: 'Performance',
            className:
                'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        },
        test: {
            label: 'Test',
            className:
                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        },
        chore: {
            label: 'Chore',
            className:
                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        },
    }

    const config = typeConfig[type] || {
        label: type,
        className:
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    }

    return (
        <div className="flex items-start gap-x-4">
            {/* Dot - positioned to align with the vertical line in parent */}
            <div className="w-5 shrink-0 flex justify-center pt-1.5">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full relative z-10" />
            </div>

            <div className="flex flex-col items-start flex-1">
                <div className="flex items-center gap-4">
                    <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-md ${config.className}`}
                    >
                        {config.label}
                    </span>

                    <div>
                        {(component ||
                            prIds.length > 0 ||
                            commitHashes.length > 0) && (
                            <div className="flex items-center gap-2 mb-1">
                                {(prIds.length > 0 ||
                                    commitHashes.length > 0) && (
                                    <span className="text-xs text-muted-foreground">
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
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="text-sm text-muted-foreground leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
