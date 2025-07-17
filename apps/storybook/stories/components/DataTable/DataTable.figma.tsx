import { figma } from '@figma/code-connect'
import { DataTable, ColumnType } from 'blend-v1'

/**
 * FIGMA CODE CONNECT FOR DATATABLE COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - The Figma component represents the visual table structure
 *
 * 2. CODE-ONLY PROPERTIES:
 *    - data: Array of row data
 *    - columns: Column definitions with types and configurations
 *    - idField: Unique identifier field for rows
 *    - title: Table title
 *    - description: Table description
 *    - enableSearch: Enable search functionality
 *    - enableFiltering: Enable column filtering
 *    - pagination: Pagination configuration
 *    - enableRowSelection: Enable row selection
 *    - enableColumnManager: Enable column visibility management
 *    - isHoverable: Enable row hover effects
 *    - onRowClick: Row click handler
 *    - bulkActions: Bulk action buttons
 */

// Base DataTable connection
figma.connect(
    DataTable,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=6252-24109&t=O53E5LTqGyp5e0cp-4',
    {
        props: {
            // Note: The DataTable Figma component doesn't expose properties
            // All props are code-only and configured in the implementation
        },

        example: () => (
            <DataTable
                data={[
                    {
                        id: '1',
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        role: 'Admin',
                        status: { text: 'Active', color: 'success' },
                        lastActive: '2024-01-15',
                    },
                    {
                        id: '2',
                        name: 'Jane Smith',
                        email: 'jane.smith@example.com',
                        role: 'User',
                        status: { text: 'Inactive', color: 'neutral' },
                        lastActive: '2024-01-10',
                    },
                    {
                        id: '3',
                        name: 'Bob Johnson',
                        email: 'bob.johnson@example.com',
                        role: 'Editor',
                        status: { text: 'Active', color: 'success' },
                        lastActive: '2024-01-14',
                    },
                ]}
                columns={[
                    {
                        field: 'name',
                        header: 'Name',
                        type: ColumnType.TEXT,
                        isSortable: true,
                        minWidth: '150px',
                    },
                    {
                        field: 'email',
                        header: 'Email',
                        type: ColumnType.TEXT,
                        isSortable: true,
                        minWidth: '200px',
                    },
                    {
                        field: 'role',
                        header: 'Role',
                        type: ColumnType.TEXT,
                        isSortable: true,
                        minWidth: '100px',
                    },
                    {
                        field: 'status',
                        header: 'Status',
                        type: ColumnType.TAG,
                        isSortable: false,
                        minWidth: '120px',
                    },
                    {
                        field: 'lastActive',
                        header: 'Last Active',
                        type: ColumnType.DATE,
                        isSortable: true,
                        minWidth: '150px',
                    },
                ]}
                idField="id"
                title="User Management"
                description="Manage system users and their permissions"
                enableSearch={true}
                searchPlaceholder="Search users..."
                enableFiltering={true}
                enableRowSelection={true}
                enableColumnManager={true}
                isHoverable={true}
                pagination={{
                    currentPage: 1,
                    pageSize: 10,
                    totalRows: 3,
                    pageSizeOptions: [10, 25, 50],
                }}
                bulkActions={[
                    {
                        id: 'delete',
                        label: 'Delete',
                        variant: 'danger',
                        onClick: (selectedIds) =>
                            console.log('Delete:', selectedIds),
                    },
                    {
                        id: 'export',
                        label: 'Export',
                        variant: 'secondary',
                        onClick: (selectedIds) =>
                            console.log('Export:', selectedIds),
                    },
                ]}
                onRowClick={(row) => console.log('Row clicked:', row)}
            />
        ),

        imports: ["import { DataTable, ColumnType } from 'blend-v1'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/DataTable',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-datatable--docs',
            },
        ],
    }
)

/**
 * Example of DataTable usage in code:
 *
 * // Basic DataTable
 * const userData = [
 *   { id: '1', name: 'John', email: 'john@example.com', role: 'Admin' },
 *   { id: '2', name: 'Jane', email: 'jane@example.com', role: 'User' },
 * ];
 *
 * const columns = [
 *   { field: 'name', header: 'Name', type: ColumnType.TEXT },
 *   { field: 'email', header: 'Email', type: ColumnType.TEXT },
 *   { field: 'role', header: 'Role', type: ColumnType.TEXT },
 * ];
 *
 * <DataTable
 *   data={userData}
 *   columns={columns}
 *   idField="id"
 * />
 *
 * // With Avatar Column
 * const columnsWithAvatar = [
 *   {
 *     field: 'user',
 *     header: 'User',
 *     type: ColumnType.AVATAR,
 *     renderCell: (value) => ({
 *       label: value.name,
 *       sublabel: value.email,
 *       imageUrl: value.avatar,
 *     }),
 *   },
 *   // ... other columns
 * ];
 *
 * // With Tag Column
 * const columnsWithTag = [
 *   {
 *     field: 'status',
 *     header: 'Status',
 *     type: ColumnType.TAG,
 *     renderCell: (value) => ({
 *       text: value.label,
 *       color: value.color,
 *       variant: 'subtle',
 *     }),
 *   },
 *   // ... other columns
 * ];
 *
 * // With Progress Column
 * const columnsWithProgress = [
 *   {
 *     field: 'completion',
 *     header: 'Progress',
 *     type: ColumnType.PROGRESS,
 *     renderCell: (value) => ({
 *       value: value,
 *       max: 100,
 *       showPercentage: true,
 *       color: value >= 80 ? 'success' : 'primary',
 *     }),
 *   },
 *   // ... other columns
 * ];
 *
 * // With Custom Filtering
 * <DataTable
 *   data={data}
 *   columns={columns}
 *   idField="id"
 *   enableFiltering={true}
 *   onFilterChange={(filters) => {
 *     console.log('Filters applied:', filters);
 *   }}
 * />
 *
 * // With Server-Side Pagination
 * <DataTable
 *   data={currentPageData}
 *   columns={columns}
 *   idField="id"
 *   serverSidePagination={true}
 *   pagination={{
 *     currentPage: page,
 *     pageSize: pageSize,
 *     totalRows: totalCount,
 *   }}
 *   onPageChange={(newPage) => fetchData(newPage, pageSize)}
 *   onPageSizeChange={(newSize) => fetchData(1, newSize)}
 * />
 *
 * // With Row Expansion
 * <DataTable
 *   data={data}
 *   columns={columns}
 *   idField="id"
 *   enableRowExpansion={true}
 *   renderExpandedRow={({ row }) => (
 *     <div className="p-4">
 *       <h4>Additional Details</h4>
 *       <p>Created: {row.createdAt}</p>
 *       <p>Modified: {row.modifiedAt}</p>
 *     </div>
 *   )}
 * />
 *
 * // With Inline Editing
 * <DataTable
 *   data={data}
 *   columns={editableColumns}
 *   idField="id"
 *   enableInlineEdit={true}
 *   onRowSave={(rowId, updatedRow) => {
 *     console.log('Save row:', rowId, updatedRow);
 *   }}
 *   onFieldChange={(rowId, fieldName, value) => {
 *     console.log('Field changed:', rowId, fieldName, value);
 *   }}
 * />
 */
