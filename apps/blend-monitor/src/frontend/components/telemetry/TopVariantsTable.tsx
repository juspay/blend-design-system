import {
    DataTable,
    ColumnDefinition,
    ColumnType,
    ProgressBar,
} from '@juspay/blend-design-system'

interface TopVariant {
    componentName: string
    propsSignature: string
    componentProps: Record<string, unknown>
    usageCount: number
}

interface TopVariantsTableProps {
    variants: TopVariant[]
}

export function TopVariantsTable({ variants }: TopVariantsTableProps) {
    const formatProps = (props: Record<string, unknown>) => {
        const entries = Object.entries(props)
            .filter(([key, value]) => value !== undefined && value !== null)
            .slice(0, 4)

        if (entries.length === 0) {
            return <span className="text-gray-400 italic">No props</span>
        }

        return (
            <div className="space-y-1">
                {entries.map(([key, value], index) => (
                    <div key={key} className="text-xs">
                        <span className="font-medium text-gray-700">
                            {key}:
                        </span>{' '}
                        <span className="text-gray-600">
                            {typeof value === 'string'
                                ? value
                                : JSON.stringify(value)}
                        </span>
                    </div>
                ))}
                {Object.keys(props).length > 4 && (
                    <div className="text-xs text-gray-400 italic">
                        +{Object.keys(props).length - 4} more props
                    </div>
                )}
            </div>
        )
    }

    if (variants.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No variant data available
            </div>
        )
    }

    const maxUsage = Math.max(...variants.map((v) => v.usageCount))

    // Add popularity percentage to each variant
    const variantsWithPopularity = variants.map((variant) => ({
        ...variant,
        popularityPercentage: (variant.usageCount / maxUsage) * 100,
    }))

    const columns: ColumnDefinition<(typeof variantsWithPopularity)[0]>[] = [
        {
            field: 'componentName',
            header: 'Component',
            type: ColumnType.REACT_ELEMENT,
            renderCell: (value: string, row) => (
                <div>
                    <div className="text-sm font-medium text-gray-900">
                        {value}
                    </div>
                    <div className="text-xs text-gray-500">
                        {row.propsSignature}
                    </div>
                </div>
            ),
            isSortable: false,
            minWidth: '200px',
        },
        {
            field: 'componentProps',
            header: 'Props Configuration',
            type: ColumnType.REACT_ELEMENT,
            renderCell: (value: Record<string, unknown>) => (
                <div className="max-w-xs">{formatProps(value)}</div>
            ),
            isSortable: false,
            minWidth: '250px',
        },
        {
            field: 'usageCount',
            header: 'Usage Count',
            type: ColumnType.NUMBER,
            format: 'integer',
            minWidth: '120px',
        },
        {
            field: 'popularityPercentage',
            header: 'Popularity',
            type: ColumnType.REACT_ELEMENT,
            renderCell: (value: number) => (
                <div className="w-24">
                    <ProgressBar
                        value={value}
                        maxValue={100}
                        showLabel={true}
                        size="sm"
                    />
                </div>
            ),
            isSortable: false,
            minWidth: '120px',
        },
    ]

    return (
        <DataTable
            data={variantsWithPopularity}
            columns={columns}
            idField="propsSignature"
            isHoverable={true}
            title="Most Used Component Variants"
            subtitle="Top prop combinations across all components"
        />
    )
}
