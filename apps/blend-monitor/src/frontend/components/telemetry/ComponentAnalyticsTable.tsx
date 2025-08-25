import {
    DataTable,
    ColumnDefinition,
    ColumnType,
} from '@juspay/blend-design-system'

interface ComponentAnalytics {
    componentName: string
    totalUsage: number
    uniquePages: number
    uniqueVariants: number
    firstSeen: string
    lastSeen: string
    avgInstancesPerPage: number
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
            field: 'uniquePages',
            header: 'Pages',
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
            field: 'avgInstancesPerPage',
            header: 'Avg/Page',
            type: ColumnType.NUMBER,
            format: 'decimal',
            precision: 2,
            minWidth: '120px',
        },
        {
            field: 'lastSeen',
            header: 'Last Seen',
            type: ColumnType.REACT_ELEMENT,
            renderCell: (value: unknown) => formatDate(String(value)),
            isSortable: false,
            minWidth: '150px',
        },
    ]

    return (
        <DataTable
            data={components as unknown as Record<string, unknown>[]}
            columns={
                columns as unknown as ColumnDefinition<
                    Record<string, unknown>
                >[]
            }
            idField="componentName"
            isHoverable={true}
            title="Component Usage Analytics"
        />
    )
}
