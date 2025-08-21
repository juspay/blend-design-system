import {
    DataTable,
    ColumnDefinition,
    ColumnType,
} from '@juspay/blend-design-system'

interface ComponentAnalytics {
    componentName: string
    totalUsage: number
    uniqueSessions: number
    uniqueVariants: number
    firstSeen: string
    lastSeen: string
    avgInstancesPerSession: number
}

interface ComponentAnalyticsTableProps {
    components: ComponentAnalytics[]
}

export function ComponentAnalyticsTable({
    components,
}: ComponentAnalyticsTableProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    if (components.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No component data available
            </div>
        )
    }

    const columns: ColumnDefinition<ComponentAnalytics>[] = [
        {
            field: 'componentName',
            header: 'Component',
            type: ColumnType.TEXT,
            minWidth: '150px',
        },
        {
            field: 'totalUsage',
            header: 'Usage',
            type: ColumnType.NUMBER,
            format: 'integer',
            minWidth: '100px',
        },
        {
            field: 'uniqueSessions',
            header: 'Sessions',
            type: ColumnType.NUMBER,
            format: 'integer',
            minWidth: '100px',
        },
        {
            field: 'uniqueVariants',
            header: 'Variants',
            type: ColumnType.NUMBER,
            format: 'integer',
            minWidth: '100px',
        },
        {
            field: 'avgInstancesPerSession',
            header: 'Avg/Session',
            type: ColumnType.NUMBER,
            format: 'decimal',
            precision: 2,
            minWidth: '120px',
        },
        {
            field: 'lastSeen',
            header: 'Last Seen',
            type: ColumnType.TEXT,
            renderCell: (value: string) => formatDate(value),
            minWidth: '150px',
        },
    ]

    return (
        <DataTable
            data={components}
            columns={columns}
            idField="componentName"
            isHoverable={true}
            title="Component Usage Analytics"
        />
    )
}
