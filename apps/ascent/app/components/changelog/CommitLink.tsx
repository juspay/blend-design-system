interface CommitLinkProps {
    hash: string
    url?: string // Optional - will auto-generate if not provided
    children?: React.ReactNode
}

export const CommitLink = ({ hash, url, children }: CommitLinkProps) => {
    // Auto-generate GitHub URL if not provided
    const githubUrl =
        url || `https://github.com/juspay/blend-design-system/commit/${hash}`

    return (
        <a
            href={githubUrl}
            className="commit-link"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children || hash}
        </a>
    )
}
