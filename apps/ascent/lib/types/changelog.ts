export type VersionHeaderProps = {
    version: string
    date: string
    status: 'stable' | 'beta' | 'alpha'
    children?: React.ReactNode
}

export type ChangelogCardProps = {
    summary: string
    children: React.ReactNode
    defaultExpanded?: boolean
    prId?: string | string[]
    prUrl?: string | string[]
    commitHash?: string | string[]
    commitUrl?: string | string[]
    index?: number
    isLast?: boolean
}

export type ChangelogEntryProps = {
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
    'data-first'?: string
    'data-last'?: string
}
