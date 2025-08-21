import {
    DataTable,
    ColumnDefinition,
    ColumnType,
} from '@juspay/blend-design-system'

interface RepositoryAnalytics {
    repositoryName: string
    totalComponents: number
    totalUsage: number
    uniqueComponents: number
    lastActivity: string
}

interface RepositoryAnalyticsTableProps {
    repositories: RepositoryAnalytics[]
}

export function RepositoryAnalyticsTable({
    repositories,
}: RepositoryAnalyticsTableProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getRepoDisplayName = (repoName: string) => {
        if (repoName === 'local-development') {
            return '🔧 Local Development'
        }
        return repoName
    }

    if (repositories.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No repository data available
            </div>
        )
    }

    const columns: ColumnDefinition<RepositoryAnalytics>[] = [
        {
            field: 'repositoryName',
            header: 'Repository',
            type: ColumnType.TEXT,
            renderCell: (value: string) => getRepoDisplayName(value),
            minWidth: '200px',
        },
        {
            field: 'uniqueComponents',
            header: 'Components',
            type: ColumnType.NUMBER,
            format: 'integer',
            minWidth: '120px',
        },
        {
            field: 'totalUsage',
            header: 'Total Usage',
            type: ColumnType.NUMBER,
            format: 'integer',
            minWidth: '120px',
        },
        {
            field: 'lastActivity',
            header: 'Last Activity',
            type: ColumnType.TEXT,
            renderCell: (value: string) => formatDate(value),
            minWidth: '150px',
        },
    ]

    return (
        <DataTable
            data={repositories}
            columns={columns}
            idField="repositoryName"
            isHoverable={true}
            title="Repository Analytics"
        />
    )
}
