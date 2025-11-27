'use client'

import { DataTable, ColumnDefinition, ColumnType } from 'blend-v1'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const tsCode = `import { DataTable, ColumnDefinition, ColumnType } from 'blend-v1'

function MyComponent() {
    const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    ]

    const columns: ColumnDefinition<typeof data[0]>[] = [
        {
            field: 'name',
            header: 'Name',
            type: ColumnType.TEXT,
            isSortable: true,
        },
        {
            field: 'email',
            header: 'Email',
            type: ColumnType.TEXT,
            isSortable: true,
        },
        {
            field: 'role',
            header: 'Role',
            type: ColumnType.TEXT,
            isSortable: true,
        },
        {
            field: 'status',
            header: 'Status',
            type: ColumnType.TEXT,
            isSortable: true,
        },
    ]

    return (
        <DataTable
            data={data}
            columns={columns}
            idField="id"
            title="Users"
            enableSearch={true}
            enableFiltering={true}
            pagination={{
                currentPage: 1,
                pageSize: 10,
                totalRows: data.length,
            }}
        />
    )
}`

const DataTablePreview = () => {
    const sampleData: Record<string, unknown>[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'User',
            status: 'Active',
        },
        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'User',
            status: 'Inactive',
        },
        {
            id: 4,
            name: 'Alice Williams',
            email: 'alice@example.com',
            role: 'Manager',
            status: 'Active',
        },
        {
            id: 5,
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            role: 'User',
            status: 'Active',
        },
    ]

    const columns: ColumnDefinition<Record<string, unknown>>[] = [
        {
            field: 'name',
            header: 'Name',
            type: ColumnType.TEXT,
            isSortable: true,
        },
        {
            field: 'email',
            header: 'Email',
            type: ColumnType.TEXT,
            isSortable: true,
        },
        {
            field: 'role',
            header: 'Role',
            type: ColumnType.TEXT,
            isSortable: true,
        },
        {
            field: 'status',
            header: 'Status',
            type: ColumnType.TEXT,
            isSortable: true,
        },
    ]

    return (
        <ComponentPreview ts={tsCode}>
            <div className="w-full">
                <DataTable
                    data={sampleData}
                    columns={columns}
                    idField="id"
                    title="User Management"
                    description="Manage system users and their permissions"
                    enableSearch={true}
                    enableFiltering={true}
                    pagination={{
                        currentPage: 1,
                        pageSize: 5,
                        totalRows: sampleData.length,
                        pageSizeOptions: [5, 10, 20],
                    }}
                />
            </div>
        </ComponentPreview>
    )
}

export default DataTablePreview
