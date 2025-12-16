import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    DataTable,
    ColumnDefinition,
    ColumnType,
    SortDirection,
    FilterType,
    SortConfig,
    SearchConfig,
    AvatarData,
    TagData,
    Button,
    ButtonType,
    ButtonSize,
    TooltipSide,
    TooltipAlign,
    TooltipSize,
} from '@juspay/blend-design-system'
import {
    Download,
    Filter,
    Plus,
    Trash2,
    Edit,
    Eye,
    MoreVertical,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof DataTable> = {
    title: 'Components/DataTable',
    component: DataTable,
    parameters: {
        layout: 'fullscreen',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `

A comprehensive data table component with advanced features including sorting, filtering, pagination, search, inline editing, and row expansion capabilities.

## Features
- Advanced sorting and filtering
- Server-side and client-side data handling
- Pagination with customizable page sizes
- Universal search functionality
- Inline editing capabilities
- Row expansion for detailed views
- Column management (show/hide columns)
- Bulk actions support
- Custom cell rendering
- Loading states and empty states
- Multiple column types (Text, Number, Date, Avatar, Tag, Select, etc.)

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Enter, Space, Arrow keys)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (aria-rowcount, aria-colcount, aria-sort, aria-expanded, aria-selected)
- Semantic HTML table structure (thead, tbody, th, td)
- Focus indicators with visible outline
- Status announcements via aria-live regions
- Accessible names for all interactive elements
- Table headers properly associated with cells (scope attribute)

**Level AAA Compliance**: ⚠️ Partial (varies by use case)
- ✅ **Compliant**: 1.3.1 Info and Relationships, 2.1.1 Keyboard, 2.1.3 Keyboard (No Exception), 2.4.7 Focus Visible, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - some interactive elements may not meet 44x44px minimum
- ⚠️ **Application-Dependent**: 3.3.6 Error Prevention (All) - requires confirmation patterns for destructive actions

**Keyboard Navigation**:
- **Tab**: Navigate between interactive elements (buttons, checkboxes, inputs)
- **Enter/Space**: Activate buttons, toggle checkboxes, expand/collapse rows
- **Arrow Keys**: Navigate table cells (when implemented)
- **Escape**: Close popovers and filters

**Screen Reader Support**:
- Table structure announced with row and column counts
- Sort state announced via aria-sort attribute
- Row expansion state announced via aria-expanded
- Selection state announced via aria-selected
- Status changes announced via aria-live regions
- Loading and empty states announced

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test DataTable.accessibility\` (25+ tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify keyboard navigation, check contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { DataTable, ColumnDefinition, ColumnType } from '@juspay/blend-design-system';

const columns: ColumnDefinition<User>[] = [
  {
    field: 'name',
    header: 'Name',
    type: ColumnType.TEXT,
    isSortable: true,
    isFilterable: true
  },
  {
    field: 'status',
    header: 'Status',
    type: ColumnType.TAG,
    isSortable: true
  }
];

<DataTable
  data={users}
  columns={columns}
  idField="id"
  enableSearch={true}
  enableFiltering={true}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        // Basic Props
        data: {
            control: false,
            description: 'Array of data objects to display in the table',
            table: {
                type: { summary: 'T[]' },
                category: 'Data',
            },
        },
        columns: {
            control: false,
            description:
                'Column definitions with type, header, and rendering options',
            table: {
                type: { summary: 'ColumnDefinition<T>[]' },
                category: 'Data',
            },
        },
        idField: {
            control: { type: 'text' },
            description: 'Field name to use as unique identifier for rows',
            table: {
                type: { summary: 'keyof T' },
                category: 'Data',
            },
        },
        title: {
            control: { type: 'text' },
            description: 'Title displayed at the top of the table',
            table: {
                type: { summary: 'string' },
                category: 'Basic',
            },
        },
        description: {
            control: { type: 'text' },
            description: 'Description text displayed below the title',
            table: {
                type: { summary: 'string' },
                category: 'Basic',
            },
        },
        descriptionTooltipProps: {
            control: false,
            description:
                'Optional tooltip configuration for the description when it is truncated. Allows control over tooltip direction (side), alignment (align), size, arrow visibility, delay duration, and offset. When the description text overflows its container, a tooltip will appear on hover showing the full text. Use this prop to customize the tooltip positioning and appearance.',
            table: {
                type: {
                    summary:
                        '{\n  side?: TooltipSide\n  align?: TooltipAlign\n  size?: TooltipSize\n  showArrow?: boolean\n  delayDuration?: number\n  offset?: number\n}',
                },
                category: 'Basic',
            },
        },
        className: {
            control: { type: 'text' },
            description: 'CSS class name for custom styling',
            table: {
                type: { summary: 'string' },
                category: 'Basic',
            },
        },
        isHoverable: {
            control: { type: 'boolean' },
            description: 'Enable hover effects on table rows',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Basic',
            },
        },
        mobileColumnsToShow: {
            control: { type: 'number', min: 1, max: 10 },
            description: 'Number of columns to show on mobile devices',
            table: {
                type: { summary: 'number' },
                category: 'Mobile',
            },
        },

        // Sorting Props
        defaultSort: {
            control: false,
            description: 'Default sort configuration on load',
            table: {
                type: { summary: 'SortConfig' },
                category: 'Sorting',
            },
        },
        onSortChange: {
            action: 'sort-changed',
            description: 'Callback fired when sort configuration changes',
            table: {
                type: { summary: '(sortConfig: SortConfig) => void' },
                category: 'Sorting',
            },
        },

        // Search Props
        enableSearch: {
            control: { type: 'boolean' },
            description: 'Enable global search functionality',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Search',
            },
        },
        searchPlaceholder: {
            control: { type: 'text' },
            description: 'Placeholder text for search input',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Search...' },
                category: 'Search',
            },
        },
        serverSideSearch: {
            control: { type: 'boolean' },
            description: 'Handle search on server side instead of client side',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Search',
            },
        },
        onSearchChange: {
            action: 'search-changed',
            description: 'Callback fired when search query changes',
            table: {
                type: { summary: '(searchConfig: SearchConfig) => void' },
                category: 'Search',
            },
        },

        // Filtering Props
        enableFiltering: {
            control: { type: 'boolean' },
            description: 'Enable column-level filtering',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Filtering',
            },
        },
        enableAdvancedFilter: {
            control: { type: 'boolean' },
            description: 'Enable advanced filtering interface',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Filtering',
            },
        },
        serverSideFiltering: {
            control: { type: 'boolean' },
            description:
                'Handle filtering on server side instead of client side',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Filtering',
            },
        },
        onFilterChange: {
            action: 'filter-changed',
            description: 'Callback fired when column filters change',
            table: {
                type: { summary: '(filters: ColumnFilter[]) => void' },
                category: 'Filtering',
            },
        },
        onAdvancedFiltersChange: {
            action: 'advanced-filters-changed',
            description: 'Callback fired when advanced filters change',
            table: {
                type: { summary: '(filters: unknown[]) => void' },
                category: 'Filtering',
            },
        },

        // Column Management Props
        columnFreeze: {
            control: { type: 'number', min: 0, max: 5 },
            description: 'Number of columns to freeze on the left side',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
                category: 'Column Management',
            },
        },
        enableColumnManager: {
            control: { type: 'boolean' },
            description: 'Enable column visibility management',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Column Management',
            },
        },
        columnManagerMaxSelections: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Maximum number of columns that can be selected',
            table: {
                type: { summary: 'number' },
                category: 'Column Management',
            },
        },
        columnManagerWidth: {
            control: { type: 'number', min: 200, max: 800 },
            description: 'Width of the column manager dropdown',
            table: {
                type: { summary: 'number' },
                category: 'Column Management',
            },
        },

        // Pagination Props
        serverSidePagination: {
            control: { type: 'boolean' },
            description:
                'Handle pagination on server side instead of client side',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Pagination',
            },
        },
        onPageChange: {
            action: 'page-changed',
            description: 'Callback fired when current page changes',
            table: {
                type: { summary: '(page: number) => void' },
                category: 'Pagination',
            },
        },
        onPageSizeChange: {
            action: 'page-size-changed',
            description: 'Callback fired when page size changes',
            table: {
                type: { summary: '(pageSize: number) => void' },
                category: 'Pagination',
            },
        },

        // UI/Loading Props
        isLoading: {
            control: { type: 'boolean' },
            description: 'Show loading state in the table',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'UI State',
            },
        },
        showToolbar: {
            control: { type: 'boolean' },
            description: 'Show the header toolbar with search and actions',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'UI State',
            },
        },
        showSettings: {
            control: { type: 'boolean' },
            description: 'Show settings menu in the toolbar',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'UI State',
            },
        },
        showFooter: {
            control: { type: 'boolean' },
            description:
                'Show the pagination footer at the bottom of the table',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'UI State',
            },
        },

        // Inline Edit Props
        enableInlineEdit: {
            control: { type: 'boolean' },
            description: 'Enable inline editing of cell values',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inline Edit',
            },
        },
        onRowSave: {
            action: 'row-saved',
            description: 'Callback fired when a row is saved after editing',
            table: {
                type: { summary: '(rowId: unknown, updatedRow: T) => void' },
                category: 'Inline Edit',
            },
        },
        onRowCancel: {
            action: 'row-cancelled',
            description: 'Callback fired when row editing is cancelled',
            table: {
                type: { summary: '(rowId: unknown) => void' },
                category: 'Inline Edit',
            },
        },
        onFieldChange: {
            action: 'field-changed',
            description: 'Callback fired when a field value changes',
            table: {
                type: {
                    summary:
                        '(rowId: unknown, fieldName: keyof T, value: unknown) => void',
                },
                category: 'Inline Edit',
            },
        },

        // Row Interaction Props
        onRowClick: {
            action: 'row-clicked',
            description: 'Callback fired when a row is clicked',
            table: {
                type: { summary: '(row: T, index: number) => void' },
                category: 'Row Interaction',
            },
        },

        // Row Expansion Props
        enableRowExpansion: {
            control: { type: 'boolean' },
            description: 'Enable expandable rows for detailed views',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Row Expansion',
            },
        },
        onRowExpansionChange: {
            action: 'row-expansion-changed',
            description: 'Callback fired when row expansion state changes',
            table: {
                type: {
                    summary:
                        '(rowId: unknown, isExpanded: boolean, rowData: T) => void',
                },
                category: 'Row Expansion',
            },
        },

        // Selection/Bulk Actions Props
        enableRowSelection: {
            control: { type: 'boolean' },
            description: 'Enable row selection with checkboxes',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Selection',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable>

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

// Default story
export const Default: Story = {
    args: {
        data: sampleUsers.slice(0, 10) as any[],
        columns: userColumns as any[],
        idField: 'id',
        title: 'User Management',
        description: 'Manage your organization users',
        isHoverable: true,
    },
}

// With search and filtering
export const WithSearchAndFiltering: Story = {
    args: {
        data: sampleUsers as any[],
        columns: userColumns as any[],
        idField: 'id',
        title: 'User Management',
        enableSearch: true,
        searchPlaceholder: 'Search users...',
        enableFiltering: true,
        isHoverable: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'DataTable with search and column filtering enabled for finding specific records.',
            },
        },
    },
}

// With pagination
export const WithPagination: Story = {
    args: {
        data: sampleUsers as any[],
        columns: userColumns as any[],
        idField: 'id',
        title: 'User Management',
        enableSearch: true,
        enableFiltering: true,
        pagination: {
            currentPage: 1,
            pageSize: 10,
            totalRows: sampleUsers.length,
            pageSizeOptions: [10, 20, 50, 100],
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'DataTable with pagination controls for handling large datasets.',
            },
        },
    },
}

// With inline editing
const EditableDataTable: React.FC = () => {
    const [data, setData] = useState(sampleUsers.slice(0, 10))

    const handleRowSave = (
        rowId: unknown,
        updatedRow: Record<string, unknown>
    ) => {
        setData((prevData) =>
            prevData.map((row) =>
                row.id === rowId ? (updatedRow as User) : row
            )
        )
        console.log('Row saved:', rowId, updatedRow)
    }

    const editableColumns = userColumns.map((col) => ({
        ...col,
        isEditable: ['email', 'role', 'department'].includes(
            col.field as string
        ),
    }))

    return (
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
    )
}

export const WithInlineEditing: Story = {
    render: () => <EditableDataTable />,
    parameters: {
        docs: {
            description: {
                story: 'DataTable with inline editing capabilities. Click on email, role, or department cells to edit.',
            },
        },
    },
}

// With row expansion
export const WithRowExpansion: Story = {
    args: {
        data: sampleUsers.slice(0, 10) as any[],
        columns: userColumns.slice(0, 5) as any[],
        idField: 'id',
        title: 'Expandable User Table',
        enableRowExpansion: true,
        renderExpandedRow: ({ row }) => {
            const user = row as unknown as User
            return (
                <div style={{ padding: '20px', backgroundColor: '#f9fafb' }}>
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
                            <strong>Department:</strong> {user.department}
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
                            <strong>Skills:</strong> {user.skills.join(', ')}
                        </div>
                    </div>
                </div>
            )
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'DataTable with expandable rows to show additional details.',
            },
        },
    },
}

// With custom header slots
const DataTableWithActions: React.FC = () => {
    const [selectedRows] = useState<string[]>([])

    return (
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
            headerSlot3={
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
            // @ts-expect-error - bulkActions prop type mismatch
            bulkActions={
                selectedRows.length > 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <span>{selectedRows.length} selected</span>
                        <Button
                            buttonType={ButtonType.DANGER}
                            size={ButtonSize.SMALL}
                            text="Delete"
                            leadingIcon={<Trash2 />}
                        />
                    </div>
                ) : undefined
            }
        />
    )
}

export const WithCustomActions: Story = {
    render: () => <DataTableWithActions />,
    parameters: {
        docs: {
            description: {
                story: 'DataTable with custom header slots and bulk actions.',
            },
        },
    },
}

// Server-side operations
const ServerSideDataTable: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<User[]>([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalRows: 100,
    })

    // Simulate server-side data fetching
    const fetchData = async (
        page: number,
        pageSize: number,
        sort?: SortConfig,
        search?: SearchConfig
    ) => {
        setLoading(true)
        console.log('Fetching data:', { page, pageSize, sort, search })

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate data for current page
        const startIndex = (page - 1) * pageSize
        const newData = generateUsers(pageSize).map((user, index) => ({
            ...user,
            id: `user-${startIndex + index + 1}`,
            name: `User ${startIndex + index + 1}`,
        }))

        setData(newData)
        setLoading(false)
    }

    React.useEffect(() => {
        fetchData(pagination.currentPage, pagination.pageSize)
    }, [pagination.currentPage, pagination.pageSize])

    const handlePageChange = (page: number) => {
        setPagination((prev) => ({ ...prev, currentPage: page }))
        fetchData(page, pagination.pageSize)
    }

    const handlePageSizeChange = (pageSize: number) => {
        setPagination((prev) => ({ ...prev, pageSize, currentPage: 1 }))
        fetchData(1, pageSize)
    }

    const handleSortChange = (sortConfig: SortConfig) => {
        fetchData(pagination.currentPage, pagination.pageSize, sortConfig)
    }

    const handleSearchChange = (searchConfig: SearchConfig) => {
        setPagination((prev) => ({ ...prev, currentPage: 1 }))
        fetchData(1, pagination.pageSize, undefined, searchConfig)
    }

    return (
        <DataTable
            data={data as any[]}
            columns={userColumns as any[]}
            idField="id"
            title="Server-Side Data Table"
            description="Data is fetched from server on demand"
            enableSearch={true}
            enableFiltering={false}
            serverSideSearch={true}
            serverSidePagination={true}
            isLoading={loading}
            pagination={{
                ...pagination,
                pageSizeOptions: [10, 20, 50],
            }}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
        />
    )
}

export const ServerSideOperations: Story = {
    render: () => <ServerSideDataTable />,
    parameters: {
        docs: {
            description: {
                story: 'DataTable with server-side pagination, sorting, and search. Data is fetched on demand.',
            },
        },
    },
}

// Loading state
export const LoadingState: Story = {
    args: {
        data: [],
        columns: userColumns as any[],
        idField: 'id',
        title: 'Loading Data',
        isLoading: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'DataTable in loading state with skeleton placeholders.',
            },
        },
    },
}

// Empty state
export const EmptyState: Story = {
    args: {
        data: [],
        columns: userColumns as any[],
        idField: 'id',
        title: 'User Management',
        description: 'No users found',
        enableSearch: true,
        searchPlaceholder: 'Search users...',
    },
    parameters: {
        docs: {
            description: {
                story: 'DataTable with no data showing empty state.',
            },
        },
    },
}

// Footer hidden
export const FooterHidden: Story = {
    args: {
        data: sampleUsers.slice(0, 2) as any[],
        columns: userColumns.slice(0, 4) as any[],
        idField: 'id',
        title: 'Compact User View',
        description:
            'Table with footer hidden - perfect for displaying only 1-2 rows',
        enableSearch: true,
        enableFiltering: true,
        showFooter: false,
        pagination: {
            currentPage: 1,
            pageSize: 10,
            totalRows: 2,
            pageSizeOptions: [10, 20, 50],
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'DataTable with footer hidden using showFooter={false}. Ideal for compact displays with only a few rows where pagination controls are unnecessary.',
            },
        },
    },
}

// Description with custom tooltip
export const DescriptionWithCustomTooltip: Story = {
    args: {
        data: sampleUsers.slice(0, 10) as any[],
        columns: userColumns as any[],
        idField: 'id',
        title: 'User Management',
        description:
            'This is a very long description that demonstrates how the tooltip works when text is truncated. The description will be cut off when it exceeds the available space, and hovering over it will show a tooltip with the full text. You can customize the tooltip position, alignment, size, and other properties.',
        descriptionTooltipProps: {
            side: TooltipSide.BOTTOM,
            align: TooltipAlign.START,
            size: TooltipSize.LARGE,
            showArrow: true,
            offset: 8,
            delayDuration: 300,
        },
        isHoverable: true,
    },
    parameters: {
        docs: {
            description: {
                story: "DataTable with a long description that will be truncated. The descriptionTooltipProps allows you to customize the tooltip that appears on hover, including its position (side), alignment (align), size, arrow visibility, offset distance, and delay duration. This is useful for ensuring tooltips are positioned optimally and don't get cut off by viewport edges.",
            },
        },
    },
}

// Complex example with all features
const ComplexDataTable: React.FC = () => {
    const [data, setData] = useState(sampleUsers)
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

    const handleRowExpansionChange = (rowId: unknown, isExpanded: boolean) => {
        // Row expansion is handled internally by the DataTable component
        console.log('Row expansion changed:', rowId, isExpanded)
    }

    const handleRowSelectionChange = (selectedRowIds: string[]) => {
        setSelectedRows(selectedRowIds)
    }

    const complexColumns: ColumnDefinition<Record<string, unknown>>[] = [
        ...userColumns.map((col) => ({
            ...col,
            isEditable: ['email', 'role', 'department'].includes(
                col.field as string
            ),
        })),
        {
            field: 'id',
            header: 'Actions',
            type: ColumnType.CUSTOM,
            minWidth: '100px',
            renderCell: (_, row) => (
                <div style={{ display: 'flex', gap: '4px' }}>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        text=""
                        leadingIcon={<Eye />}
                        onClick={() => console.log('View:', row)}
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        text=""
                        leadingIcon={<Edit />}
                        onClick={() => console.log('Edit:', row)}
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        text=""
                        leadingIcon={<MoreVertical />}
                        onClick={() => console.log('More:', row)}
                    />
                </div>
            ),
        },
    ]

    return (
        <DataTable
            data={data as any[]}
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
            defaultSort={{ field: 'name', direction: SortDirection.ASCENDING }}
            pagination={{
                currentPage: 1,
                pageSize: 20,
                totalRows: data.length,
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
            headerSlot3={
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
            // @ts-expect-error - bulkActions prop type mismatch
            bulkActions={
                selectedRows.length > 0 ? (
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
                ) : undefined
            }
            renderExpandedRow={({ row, toggleExpansion }) => {
                const user = row as unknown as User
                return (
                    <div
                        style={{ padding: '24px', backgroundColor: '#f9fafb' }}
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
                                    <strong>Phone:</strong> +1 (555) 123-4567
                                </p>
                                <p>
                                    <strong>Address:</strong> 123 Main St, City,
                                    State 12345
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
                                    <span
                                        style={{
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            backgroundColor:
                                                user.status.color === 'success'
                                                    ? '#d1fae5'
                                                    : user.status.color ===
                                                        'error'
                                                      ? '#fee2e2'
                                                      : user.status.color ===
                                                          'warning'
                                                        ? '#fef3c7'
                                                        : '#f3f4f6',
                                            color:
                                                user.status.color === 'success'
                                                    ? '#065f46'
                                                    : user.status.color ===
                                                        'error'
                                                      ? '#991b1b'
                                                      : user.status.color ===
                                                          'warning'
                                                        ? '#92400e'
                                                        : '#374151',
                                        }}
                                    >
                                        {user.status.text}
                                    </span>
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
            onRowExpansionChange={handleRowExpansionChange}
            onRowSelectionChange={handleRowSelectionChange}
        />
    )
}

export const ComplexExample: Story = {
    render: () => <ComplexDataTable />,
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive DataTable example with all features enabled: search, filtering, sorting, pagination, inline editing, row expansion, column management, and custom actions.',
            },
        },
    },
}

const SortingControlDataTable: React.FC = () => {
    const sortingControlColumns: ColumnDefinition<Record<string, unknown>>[] = [
        {
            field: 'avatar',
            header: 'User (Sortable)',
            type: ColumnType.AVATAR,
            minWidth: '200px',
            isSortable: true,
        },
        {
            field: 'email',
            header: 'Email (Sortable)',
            type: ColumnType.TEXT,
            minWidth: '200px',
            isSortable: true,
        },
        {
            field: 'role',
            header: 'Role (Non-Sortable)',
            type: ColumnType.SELECT,
            minWidth: '150px',
            isSortable: false,
            filterType: FilterType.SELECT,
            filterOptions: [
                { id: 'manager', label: 'Manager', value: 'Manager' },
                { id: 'developer', label: 'Developer', value: 'Developer' },
                { id: 'designer', label: 'Designer', value: 'Designer' },
                { id: 'analyst', label: 'Analyst', value: 'Analyst' },
                {
                    id: 'coordinator',
                    label: 'Coordinator',
                    value: 'Coordinator',
                },
            ],
        },
        {
            field: 'department',
            header: 'Department (Default Sortable)',
            type: ColumnType.SELECT,
            minWidth: '150px',
            filterType: FilterType.SELECT,
            filterOptions: [
                {
                    id: 'engineering',
                    label: 'Engineering',
                    value: 'Engineering',
                },
                { id: 'sales', label: 'Sales', value: 'Sales' },
                { id: 'marketing', label: 'Marketing', value: 'Marketing' },
                { id: 'hr', label: 'HR', value: 'HR' },
                { id: 'finance', label: 'Finance', value: 'Finance' },
            ],
        },
        {
            field: 'status',
            header: 'Status (Non-Sortable)',
            type: ColumnType.TAG,
            minWidth: '120px',
            isSortable: false,
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
            header: 'Join Date (Sortable)',
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
            header: 'Salary (Non-Sortable)',
            type: ColumnType.NUMBER,
            minWidth: '120px',
            isSortable: false,
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
            header: 'Skills (Auto Non-Sortable)',
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

    return (
        <div>
            <div
                style={{
                    marginBottom: '20px',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                }}
            >
                <h4 style={{ marginBottom: '12px', color: '#374151' }}>
                    Column Sorting Control Demo
                </h4>
                <p
                    style={{
                        marginBottom: '8px',
                        color: '#6b7280',
                        fontSize: '14px',
                    }}
                >
                    This example demonstrates how to control sorting at the
                    column level:
                </p>
                <ul
                    style={{
                        marginLeft: '20px',
                        color: '#6b7280',
                        fontSize: '14px',
                    }}
                >
                    <li>
                        <strong>Sortable columns:</strong> User, Email, Join
                        Date - have sort icons and respond to clicks
                    </li>
                    <li>
                        <strong>Non-sortable columns:</strong> Role, Status,
                        Salary, Skills - no sort icons, clicks are ignored
                    </li>
                    <li>
                        <strong>Default behavior:</strong> Department column
                        (isSortable not specified) - defaults to sortable
                    </li>
                </ul>
                <p
                    style={{
                        marginTop: '12px',
                        color: '#6b7280',
                        fontSize: '14px',
                    }}
                >
                    <strong>Usage:</strong> Set <code>isSortable: false</code>{' '}
                    on column definitions to disable sorting. When not
                    specified, columns default to sortable (isSortable: true).
                </p>
            </div>
            <DataTable
                data={sampleUsers.slice(0, 15) as any[]}
                columns={sortingControlColumns as any[]}
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
        </div>
    )
}

export const ColumnSortingControl: Story = {
    render: () => <SortingControlDataTable />,
    parameters: {
        docs: {
            description: {
                story: `
**Column-Level Sorting Control**

This story demonstrates how to enable or disable sorting at the column level using the \`isSortable\` property:

- **\`isSortable: true\`** - Column is sortable (shows sort icons, responds to clicks)
- **\`isSortable: false\`** - Column is not sortable (no sort icons, clicks ignored)  
- **\`isSortable\` not specified** - Defaults to sortable behavior

**Key Features:**
- Sortable columns display sort indicators in the header
- Non-sortable columns have no sort indicators and don't respond to header clicks
- Filtering can still be enabled independently of sorting
- Default sorting can be applied to any sortable column

**Use Cases:**
- Disable sorting for complex data types (arrays, objects)
- Prevent sorting on calculated or derived fields
- Control user interaction for specific business requirements
- Maintain consistent UX by clearly indicating sortable vs non-sortable columns

\`\`\`tsx
const columns: ColumnDefinition<User>[] = [
  {
    field: 'name',
    header: 'Name',
    type: ColumnType.TEXT,
    isSortable: true  // Explicitly sortable
  },
  {
    field: 'tags',
    header: 'Tags', 
    type: ColumnType.MULTISELECT,
    isSortable: false // Explicitly non-sortable
  },
  {
    field: 'department',
    header: 'Department',
    type: ColumnType.SELECT
    // isSortable defaults to true when not specified
  }
];
\`\`\`
            `,
            },
        },
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating keyboard navigation, ARIA attributes, and screen reader support
 */
export const Accessibility: Story = {
    render: () => {
        const accessibilityColumns: ColumnDefinition<
            Record<string, unknown>
        >[] = [
            {
                field: 'name',
                header: 'Name',
                type: ColumnType.TEXT,
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
            },
        ]

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    padding: '24px',
                    maxWidth: '1200px',
                }}
            >
                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Keyboard Navigation
                    </h3>
                    <p
                        style={{
                            marginBottom: '16px',
                            color: '#6b7280',
                            fontSize: '14px',
                        }}
                    >
                        Use Tab to navigate between interactive elements. Press
                        Enter or Space to activate buttons and toggle
                        checkboxes. Arrow keys can be used for cell navigation
                        (when implemented).
                    </p>
                    <DataTable
                        data={sampleUsers.slice(0, 5) as any[]}
                        columns={accessibilityColumns as any[]}
                        idField="id"
                        title="Keyboard Navigation Example"
                        enableRowSelection={true}
                        enableRowExpansion={true}
                        renderExpandedRow={() => (
                            <div style={{ padding: '16px' }}>
                                Expanded row content
                            </div>
                        )}
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        ARIA Attributes & Screen Reader Support
                    </h3>
                    <p
                        style={{
                            marginBottom: '16px',
                            color: '#6b7280',
                            fontSize: '14px',
                        }}
                    >
                        The table includes proper ARIA attributes for screen
                        readers: aria-rowcount, aria-colcount, aria-sort,
                        aria-expanded, aria-selected, and aria-live regions for
                        status announcements.
                    </p>
                    <DataTable
                        data={sampleUsers.slice(0, 5) as any[]}
                        columns={accessibilityColumns as any[]}
                        idField="id"
                        title="ARIA Attributes Example"
                        description="Table with proper ARIA attributes for screen readers"
                        enableRowSelection={true}
                        enableRowExpansion={true}
                        renderExpandedRow={() => (
                            <div style={{ padding: '16px' }}>
                                Additional row information
                            </div>
                        )}
                        defaultSort={{
                            field: 'name',
                            direction: SortDirection.ASCENDING,
                        }}
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Focus Indicators
                    </h3>
                    <p
                        style={{
                            marginBottom: '16px',
                            color: '#6b7280',
                            fontSize: '14px',
                        }}
                    >
                        All interactive elements have visible focus indicators
                        that meet WCAG 2.4.7 Focus Visible (Level AA)
                        requirements.
                    </p>
                    <DataTable
                        data={sampleUsers.slice(0, 5) as any[]}
                        columns={accessibilityColumns as any[]}
                        idField="id"
                        title="Focus Indicators Example"
                        enableSearch={true}
                        enableFiltering={true}
                        enableRowSelection={true}
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Status Announcements
                    </h3>
                    <p
                        style={{
                            marginBottom: '16px',
                            color: '#6b7280',
                            fontSize: '14px',
                        }}
                    >
                        Loading states, empty states, and selection changes are
                        announced via aria-live regions for screen reader users.
                    </p>
                    <DataTable
                        data={[]}
                        columns={accessibilityColumns as any[]}
                        idField="id"
                        title="Empty State Example"
                        description="Empty state with proper screen reader announcement"
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Semantic HTML Structure
                    </h3>
                    <p
                        style={{
                            marginBottom: '16px',
                            color: '#6b7280',
                            fontSize: '14px',
                        }}
                    >
                        The table uses semantic HTML elements (table, thead,
                        tbody, th, td) with proper scope attributes to associate
                        headers with cells, meeting WCAG 1.3.1 Info and
                        Relationships (Level A).
                    </p>
                    <DataTable
                        data={sampleUsers.slice(0, 5) as any[]}
                        columns={accessibilityColumns as any[]}
                        idField="id"
                        title="Semantic Structure Example"
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating keyboard navigation, ARIA attributes, screen reader support, focus indicators, status announcements, and semantic HTML structure.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Check for violations (should be 0 for AA compliance)
   - Review passing tests (15+)
   - See real-time accessibility status

2. **jest-axe unit tests**:
   \`\`\`bash
   pnpm test DataTable.accessibility
   \`\`\`
   - 25+ automated tests
   - WCAG 2.0, 2.1, 2.2 compliance verification
   - ARIA attribute validation
   - Table structure validation

3. **Chromatic visual tests**:
   \`\`\`bash
   pnpm chromatic
   \`\`\`
   - Focus ring visibility
   - State changes
   - Responsive behavior

4. **Manual testing**:
   - VoiceOver (macOS) or NVDA (Windows)
   - Keyboard navigation (Tab, Enter, Space, Arrow keys)
   - Color contrast verification
   - Screen reader announcements

## Accessibility Report

**Current Status**: 
- ✅ **WCAG 2.1 Level AA**: Fully Compliant (0 violations)
- ⚠️ **WCAG 2.1 Level AAA**: Partial Compliance (varies by use case)

**AAA Compliance Details**:
- ✅ Compliant: Info and Relationships (1.3.1), Keyboard (2.1.1, 2.1.3), Focus Visible (2.4.7), Change on Request (3.2.5)
- ❌ Needs Improvement: Contrast Enhanced (1.4.6) - requires 7:1 ratio, Target Size (2.5.5) - some interactive elements may not meet 44x44px
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis

**Key Accessibility Features**:
- Semantic HTML table structure with proper roles
- ARIA attributes for table structure (aria-rowcount, aria-colcount)
- ARIA attributes for interactive states (aria-sort, aria-expanded, aria-selected)
- Keyboard navigation support for all interactive elements
- Screen reader announcements via aria-live regions
- Focus indicators meeting WCAG 2.4.7 requirements
- Accessible names for all buttons and controls
- Proper label associations for form elements
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('interactive'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
