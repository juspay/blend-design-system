'use client'

import {
    DataTable,
    ColumnDefinition,
    ColumnType,
} from '@juspay/blend-design-system'
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

const reCode = `@module("blend-v1") external dataTable: React.component<{
  "data": array<'t>,
  "columns": array<columnDefinition<'t>>,
  "idField": string,
  "title"?: string,
  "enableSearch"?: bool,
  "enableFiltering"?: bool,
  "pagination"?: paginationConfig
}> = "DataTable"

type columnDefinition<'t> = {
  "field": string,
  "header": string,
  "type": columnType,
  "isSortable"?: bool
}

type paginationConfig = {
  "currentPage": int,
  "pageSize": int,
  "totalRows": int
}

let make = () => {
  let data = [
    {"id": 1, "name": "John Doe", "email": "john@example.com", "role": "Admin", "status": "Active"},
    {"id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "User", "status": "Active"},
    {"id": 3, "name": "Bob Johnson", "email": "bob@example.com", "role": "User", "status": "Inactive"}
  ]

  let columns = [
    {"field": "name", "header": "Name", "type": #TEXT, "isSortable": true},
    {"field": "email", "header": "Email", "type": #TEXT, "isSortable": true},
    {"field": "role", "header": "Role", "type": #TEXT, "isSortable": true},
    {"field": "status", "header": "Status", "type": #TEXT, "isSortable": true}
  ]

  React.createElement(dataTable, {
    "data": data,
    "columns": columns,
    "idField": "id",
    "title": "Users",
    "enableSearch": true,
    "enableFiltering": true,
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalRows": Array.length(data)
    }
  })
}`

const bindingCode = `type columnType = [#TEXT | #NUMBER | #AVATAR | #TAG | #PROGRESS | #DATE | #DROPDOWN | #REACT_ELEMENT]

type columnDefinition<'t> = {
  "field": string,
  "header": string,
  "type": columnType,
  "isSortable"?: bool,
  "isVisible"?: bool,
  "width"?: string
}

type paginationConfig = {
  "currentPage": int,
  "pageSize": int,
  "totalRows": int,
  "pageSizeOptions"?: array<int>
}

@module("blend-v1") external dataTable: React.component<{
  "data": array<'t>,
  "columns": array<columnDefinition<'t>>,
  "idField": string,
  "title"?: string,
  "description"?: string,
  "enableSearch"?: bool,
  "enableFiltering"?: bool,
  "enableRowSelection"?: bool,
  "enableRowExpansion"?: bool,
  "pagination"?: paginationConfig,
  "isLoading"?: bool
}> = "DataTable"`

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
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
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
