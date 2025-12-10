import { useState } from 'react'
import {
    DataTable,
    ColumnDefinition,
    ColumnType,
    SortDirection,
    FilterType,
    AvatarData,
    TagData,
    Button,
    ButtonType,
    ButtonSize,
} from '../../../packages/blend/lib/main'
import {
    Download,
    Filter,
    Plus,
    Trash2,
    Edit,
    Eye,
    MoreVertical,
} from 'lucide-react'

// Sample data types
type User = {
    id: string
    name: string
    email: string
    role: string
    department: string
    status: TagData
    avatar: AvatarData
    joinDate: Date
    salary: number
    skills: string[]
    [key: string]: unknown
}

// Sample data generator
const generateUsers = (count: number): User[] => {
    const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance']
    const roles = ['Manager', 'Developer', 'Designer', 'Analyst', 'Coordinator']
    const skills = [
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'AWS',
        'Docker',
        'GraphQL',
        'MongoDB',
    ]
    const statuses = [
        { text: 'Active', color: 'success' as const },
        { text: 'Inactive', color: 'error' as const },
        { text: 'Pending', color: 'warning' as const },
        { text: 'On Leave', color: 'neutral' as const },
    ]

    return Array.from({ length: count }, (_, i) => ({
        id: `user-${i + 1}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        avatar: {
            id: `avatar-${i + 1}`,
            label: `User ${i + 1}`,
            sublabel: roles[Math.floor(Math.random() * roles.length)],
            imageUrl:
                i % 3 === 0
                    ? `https://i.pravatar.cc/150?img=${i + 1}`
                    : undefined,
            initials: `U${i + 1}`,
        } as AvatarData,
        joinDate: new Date(
            2020 + Math.floor(Math.random() * 4),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28)
        ),
        salary: 50000 + Math.floor(Math.random() * 100000),
        skills: skills
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 4) + 1),
    }))
}

const sampleUsers = generateUsers(50)

// Column definitions
const userColumns: ColumnDefinition<Record<string, unknown>>[] = [
    {
        field: 'avatar',
        header: 'User',
        type: ColumnType.AVATAR,
        minWidth: '200px',
        isSortable: true,
    },
    {
        field: 'email',
        header: 'Email',
        type: ColumnType.TEXT,
        minWidth: '200px',
        isSortable: true,
    },
    {
        field: 'role',
        header: 'Role',
        type: ColumnType.SELECT,
        minWidth: '150px',
        isSortable: true,
        filterType: FilterType.SELECT,
        filterOptions: [
            { id: 'manager', label: 'Manager', value: 'Manager' },
            { id: 'developer', label: 'Developer', value: 'Developer' },
            { id: 'designer', label: 'Designer', value: 'Designer' },
            { id: 'analyst', label: 'Analyst', value: 'Analyst' },
            { id: 'coordinator', label: 'Coordinator', value: 'Coordinator' },
        ],
    },
    {
        field: 'department',
        header: 'Department',
        type: ColumnType.SELECT,
        minWidth: '150px',
        isSortable: true,
        filterType: FilterType.SELECT,
        filterOptions: [
            { id: 'engineering', label: 'Engineering', value: 'Engineering' },
            { id: 'sales', label: 'Sales', value: 'Sales' },
            { id: 'marketing', label: 'Marketing', value: 'Marketing' },
            { id: 'hr', label: 'HR', value: 'HR' },
            { id: 'finance', label: 'Finance', value: 'Finance' },
        ],
    },
    {
        field: 'status',
        header: 'Status',
        type: ColumnType.TAG,
        minWidth: '120px',
        isSortable: true,
        filterType: FilterType.SELECT,
        filterOptions: [
            { id: 'active', label: 'Active', value: 'Active' },
            { id: 'inactive', label: 'Inactive', value: 'Inactive' },
            { id: 'pending', label: 'Pending', value: 'Pending' },
            { id: 'onleave', label: 'On Leave', value: 'On Leave' },
        ],
    },
    {
        field: 'joinDate',
        header: 'Join Date',
        type: ColumnType.DATE,
        minWidth: '150px',
        isSortable: true,
        renderCell: (value) => {
            const date = value as unknown as Date
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })
        },
    },
    {
        field: 'salary',
        header: 'Salary',
        type: ColumnType.NUMBER,
        minWidth: '120px',
        isSortable: true,
        renderCell: (value) => {
            const salary = value as number
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(salary)
        },
    },
    {
        field: 'skills',
        header: 'Skills',
        type: ColumnType.MULTISELECT,
        minWidth: '200px',
        isSortable: false,
        filterType: FilterType.MULTISELECT,
        renderCell: (value) => {
            const skills = value as string[]
            return skills.join(', ')
        },
    },
]

function App() {
    const [data, setData] = useState(sampleUsers.slice(0, 10))
    const [selectedRows, setSelectedRows] = useState<string[]>([])

    const handleRowSave = (
        rowId: unknown,
        updatedRow: Record<string, unknown>
    ) => {
        setData((prevData) =>
            prevData.map((row) =>
                row.id === rowId ? (updatedRow as User) : row
            )
        )
    }

    const editableColumns = userColumns.map((col) => ({
        ...col,
        isEditable: ['email', 'role', 'department'].includes(
            col.field as string
        ),
    }))

    const complexColumns: ColumnDefinition<Record<string, unknown>>[] = [
        ...userColumns.map((col) => ({
            ...col,
            isEditable: ['email', 'role', 'department'].includes(
                col.field as string
            ),
        })),
        // {
        //     field: 'id',
        //     header: 'Actions',
        //     type: ColumnType.CUSTOM,
        //     minWidth: '100px',
        //     renderCell: (_, row) => (
        //         <div style={{ display: 'flex', gap: '4px' }}>
        //             <Button
        //                 buttonType={ButtonType.SECONDARY}
        //                 size={ButtonSize.SMALL}
        //                 text=""
        //                 leadingIcon={<Eye />}
        //                 onClick={() => console.log('View:', row)}
        //             />
        //             <Button
        //                 buttonType={ButtonType.SECONDARY}
        //                 size={ButtonSize.SMALL}
        //                 text=""
        //                 leadingIcon={<Edit />}
        //                 onClick={() => console.log('Edit:', row)}
        //             />
        //             <Button
        //                 buttonType={ButtonType.SECONDARY}
        //                 size={ButtonSize.SMALL}
        //                 text=""
        //                 leadingIcon={<MoreVertical />}
        //                 onClick={() => console.log('More:', row)}
        //             />
        //         </div>
        //     ),
        // },
    ]

    return (
        <main className="w-screen min-h-screen bg-gray-100 flex flex-col gap-8 p-8">
            <DataTable
                data={sampleUsers.slice(0, 10) as any[]}
                columns={userColumns as any[]}
                idField="id"
                title="User Management"
                description="Manage your organization users"
                isHoverable={true}
            />

            <DataTable
                data={sampleUsers as any[]}
                columns={userColumns as any[]}
                idField="id"
                title="User Management"
                enableSearch={true}
                searchPlaceholder="Search users..."
                enableFiltering={true}
                isHoverable={true}
            />

            <DataTable
                data={sampleUsers as any[]}
                columns={userColumns as any[]}
                idField="id"
                title="User Management"
                enableSearch={true}
                enableFiltering={true}
                pagination={{
                    currentPage: 1,
                    pageSize: 10,
                    totalRows: sampleUsers.length,
                    pageSizeOptions: [10, 20, 50, 100],
                }}
            />

            <DataTable
                data={data as any[]}
                columns={editableColumns as any[]}
                idField="id"
                title="Editable User Table"
                description="Click on editable cells to modify data"
                enableInlineEdit={true}
                onRowSave={handleRowSave}
                isHoverable={true}
            />

            <DataTable
                data={sampleUsers.slice(0, 10) as any[]}
                columns={userColumns.slice(0, 5) as any[]}
                idField="id"
                title="Expandable User Table"
                enableRowExpansion={true}
                renderExpandedRow={({ row }) => {
                    const user = row as unknown as User
                    return (
                        <div
                            style={{
                                padding: '20px',
                                backgroundColor: '#f9fafb',
                            }}
                        >
                            <h4 style={{ marginBottom: '16px' }}>
                                Additional Information
                            </h4>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '16px',
                                }}
                            >
                                <div>
                                    <strong>Email:</strong> {user.email}
                                </div>
                                <div>
                                    <strong>Department:</strong>{' '}
                                    {user.department}
                                </div>
                                <div>
                                    <strong>Join Date:</strong>{' '}
                                    {user.joinDate.toLocaleDateString()}
                                </div>
                                <div>
                                    <strong>Salary:</strong> $
                                    {user.salary.toLocaleString()}
                                </div>
                                <div>
                                    <strong>Skills:</strong>{' '}
                                    {user.skills.join(', ')}
                                </div>
                            </div>
                        </div>
                    )
                }}
            />

            <DataTable
                data={sampleUsers.slice(0, 20) as any[]}
                columns={userColumns as any[]}
                idField="id"
                title="User Management"
                enableSearch={true}
                enableFiltering={true}
                headerSlot1={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                        text="Add User"
                        leadingIcon={<Plus />}
                    />
                }
                headerSlot2={
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            text="Export"
                            leadingIcon={<Download />}
                        />
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            text="Filter"
                            leadingIcon={<Filter />}
                        />
                    </div>
                }
                bulkActions={
                    selectedRows.length > 0
                        ? {
                              customActions: (
                                  <div
                                      style={{
                                          display: 'flex',
                                          gap: '8px',
                                          alignItems: 'center',
                                      }}
                                  >
                                      <span>
                                          {selectedRows.length} selected
                                      </span>
                                      <Button
                                          buttonType={ButtonType.DANGER}
                                          size={ButtonSize.SMALL}
                                          text="Delete"
                                          leadingIcon={<Trash2 />}
                                      />
                                  </div>
                              ),
                          }
                        : undefined
                }
                enableRowSelection={true}
                onRowSelectionChange={(selectedRowIds) => {
                    setSelectedRows(selectedRowIds)
                }}
            />

            <DataTable
                data={[]}
                columns={userColumns as any[]}
                idField="id"
                title="User Management"
                isLoading={true}
            />

            <DataTable
                data={[]}
                columns={userColumns as any[]}
                idField="id"
                title="User Management"
                description="No users found"
                enableSearch={true}
                searchPlaceholder="Search users..."
            />

            <DataTable
                data={sampleUsers as any[]}
                columns={complexColumns as any[]}
                idField="id"
                title="Advanced User Management"
                description="Full-featured data table with all capabilities"
                enableSearch={true}
                searchPlaceholder="Search by name, email, role..."
                enableFiltering={true}
                enableColumnManager={true}
                enableInlineEdit={true}
                enableRowExpansion={true}
                enableRowSelection={true}
                isHoverable={true}
                defaultSort={{
                    field: 'name',
                    direction: SortDirection.ASCENDING,
                }}
                pagination={{
                    currentPage: 1,
                    pageSize: 20,
                    totalRows: sampleUsers.length,
                    pageSizeOptions: [10, 20, 50, 100],
                }}
                headerSlot1={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                        text="Add User"
                        leadingIcon={<Plus />}
                    />
                }
                headerSlot2={
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            text="Import"
                            leadingIcon={<Download />}
                        />
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            text="Export"
                            leadingIcon={<Download />}
                        />
                    </div>
                }
                bulkActions={
                    selectedRows.length > 0
                        ? {
                              customActions: (
                                  <div
                                      style={{
                                          display: 'flex',
                                          gap: '8px',
                                          alignItems: 'center',
                                      }}
                                  >
                                      <span style={{ marginRight: '16px' }}>
                                          {selectedRows.length} selected
                                      </span>
                                      <Button
                                          buttonType={ButtonType.SECONDARY}
                                          size={ButtonSize.SMALL}
                                          text="Assign"
                                      />
                                      <Button
                                          buttonType={ButtonType.SECONDARY}
                                          size={ButtonSize.SMALL}
                                          text="Export"
                                      />
                                      <Button
                                          buttonType={ButtonType.DANGER}
                                          size={ButtonSize.SMALL}
                                          text="Delete"
                                          leadingIcon={<Trash2 />}
                                      />
                                  </div>
                              ),
                          }
                        : undefined
                }
                renderExpandedRow={({ row, toggleExpansion }) => {
                    const user = row as unknown as User
                    return (
                        <div
                            style={{
                                padding: '24px',
                                backgroundColor: '#f9fafb',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '16px',
                                }}
                            >
                                <h4>Detailed Information for {user.name}</h4>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    text="Close"
                                    onClick={toggleExpansion}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '24px',
                                }}
                            >
                                <div>
                                    <h5
                                        style={{
                                            marginBottom: '8px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        Contact Information
                                    </h5>
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong> +1 (555)
                                        123-4567
                                    </p>
                                    <p>
                                        <strong>Address:</strong> 123 Main St,
                                        City, State 12345
                                    </p>
                                </div>
                                <div>
                                    <h5
                                        style={{
                                            marginBottom: '8px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        Employment Details
                                    </h5>
                                    <p>
                                        <strong>Department:</strong>{' '}
                                        {user.department}
                                    </p>
                                    <p>
                                        <strong>Role:</strong> {user.role}
                                    </p>
                                    <p>
                                        <strong>Join Date:</strong>{' '}
                                        {user.joinDate.toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Salary:</strong> $
                                        {user.salary.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h5
                                        style={{
                                            marginBottom: '8px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        Skills & Status
                                    </h5>
                                    <p>
                                        <strong>Status:</strong>{' '}
                                        {user.status.text}
                                    </p>
                                    <p>
                                        <strong>Skills:</strong>
                                    </p>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '4px',
                                            marginTop: '4px',
                                        }}
                                    >
                                        {user.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                style={{
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#e5e7eb',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
                onRowSave={handleRowSave}
                onRowSelectionChange={(selectedRowIds) => {
                    setSelectedRows(selectedRowIds)
                }}
            />

            <DataTable
                data={sampleUsers.slice(0, 15) as any[]}
                columns={
                    userColumns.map((col, index) => {
                        if (index === 0) {
                            return {
                                ...col,
                                header: 'User (Sortable)',
                                isSortable: true,
                            }
                        }
                        if (index === 1) {
                            return {
                                ...col,
                                header: 'Email (Sortable)',
                                isSortable: true,
                            }
                        }
                        if (index === 2) {
                            return {
                                ...col,
                                header: 'Role (Non-Sortable)',
                                isSortable: false,
                            }
                        }
                        if (index === 3) {
                            return {
                                ...col,
                                header: 'Department (Default Sortable)',
                            }
                        }
                        if (index === 4) {
                            return {
                                ...col,
                                header: 'Status (Non-Sortable)',
                                isSortable: false,
                            }
                        }
                        if (index === 5) {
                            return {
                                ...col,
                                header: 'Join Date (Sortable)',
                                isSortable: true,
                            }
                        }
                        if (index === 6) {
                            return {
                                ...col,
                                header: 'Salary (Non-Sortable)',
                                isSortable: false,
                            }
                        }
                        return {
                            ...col,
                            header: 'Skills (Auto Non-Sortable)',
                            isSortable: false,
                        }
                    }) as any[]
                }
                idField="id"
                title="Column Sorting Control Example"
                description="Demonstrates sortable vs non-sortable columns"
                enableSearch={true}
                enableFiltering={true}
                defaultSort={{
                    field: 'joinDate',
                    direction: SortDirection.DESCENDING,
                }}
                pagination={{
                    currentPage: 1,
                    pageSize: 10,
                    totalRows: 15,
                    pageSizeOptions: [10, 15],
                }}
            />
        </main>
    )
}

export default App
