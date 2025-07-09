import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  DataTable,
  ColumnDefinition,
  ColumnType,
  SortDirection,
  FilterType,
  SortConfig,
  SearchConfig,
  ColumnFilter,
  PaginationConfig,
  AvatarData,
  TagData,
  Button,
  ButtonType,
  ButtonSize,
} from "blend-v1";
import {
  Download,
  Filter,
  Plus,
  Trash2,
  Edit,
  Eye,
  MoreVertical,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
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

## Usage

\`\`\`tsx
import { DataTable, ColumnDefinition, ColumnType } from 'blend-v1';

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
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample data types
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: TagData;
  avatar: AvatarData;
  joinDate: Date;
  salary: number;
  skills: string[];
  [key: string]: unknown;
};

// Sample data generator
const generateUsers = (count: number): User[] => {
  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"];
  const roles = ["Manager", "Developer", "Designer", "Analyst", "Coordinator"];
  const skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
    "MongoDB",
  ];
  const statuses = [
    { text: "Active", color: "success" as const },
    { text: "Inactive", color: "error" as const },
    { text: "Pending", color: "warning" as const },
    { text: "On Leave", color: "neutral" as const },
  ];

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
        i % 3 === 0 ? `https://i.pravatar.cc/150?img=${i + 1}` : undefined,
      initials: `U${i + 1}`,
    } as AvatarData,
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28),
    ),
    salary: 50000 + Math.floor(Math.random() * 100000),
    skills: skills
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 4) + 1),
  }));
};

const sampleUsers = generateUsers(50);

// Column definitions
const userColumns: ColumnDefinition<Record<string, unknown>>[] = [
  {
    field: "avatar",
    header: "User",
    type: ColumnType.AVATAR,
    minWidth: "200px",
    isSortable: true,
    isFilterable: true,
  },
  {
    field: "email",
    header: "Email",
    type: ColumnType.TEXT,
    minWidth: "200px",
    isSortable: true,
    isFilterable: true,
  },
  {
    field: "role",
    header: "Role",
    type: ColumnType.SELECT,
    minWidth: "150px",
    isSortable: true,
    isFilterable: true,
    filterType: FilterType.SELECT,
    filterOptions: [
      { id: "manager", label: "Manager", value: "Manager" },
      { id: "developer", label: "Developer", value: "Developer" },
      { id: "designer", label: "Designer", value: "Designer" },
      { id: "analyst", label: "Analyst", value: "Analyst" },
      { id: "coordinator", label: "Coordinator", value: "Coordinator" },
    ],
  },
  {
    field: "department",
    header: "Department",
    type: ColumnType.SELECT,
    minWidth: "150px",
    isSortable: true,
    isFilterable: true,
    filterType: FilterType.SELECT,
    filterOptions: [
      { id: "engineering", label: "Engineering", value: "Engineering" },
      { id: "sales", label: "Sales", value: "Sales" },
      { id: "marketing", label: "Marketing", value: "Marketing" },
      { id: "hr", label: "HR", value: "HR" },
      { id: "finance", label: "Finance", value: "Finance" },
    ],
  },
  {
    field: "status",
    header: "Status",
    type: ColumnType.TAG,
    minWidth: "120px",
    isSortable: true,
    isFilterable: true,
    filterType: FilterType.SELECT,
    filterOptions: [
      { id: "active", label: "Active", value: "Active" },
      { id: "inactive", label: "Inactive", value: "Inactive" },
      { id: "pending", label: "Pending", value: "Pending" },
      { id: "onleave", label: "On Leave", value: "On Leave" },
    ],
  },
  {
    field: "joinDate",
    header: "Join Date",
    type: ColumnType.DATE,
    minWidth: "150px",
    isSortable: true,
    isFilterable: true,
    renderCell: (value) => {
      const date = value as Date;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    field: "salary",
    header: "Salary",
    type: ColumnType.NUMBER,
    minWidth: "120px",
    isSortable: true,
    isFilterable: true,
    renderCell: (value) => {
      const salary = value as number;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salary);
    },
  },
  {
    field: "skills",
    header: "Skills",
    type: ColumnType.MULTISELECT,
    minWidth: "200px",
    isSortable: false,
    isFilterable: true,
    filterType: FilterType.MULTISELECT,
    renderCell: (value) => {
      const skills = value as string[];
      return skills.join(", ");
    },
  },
];

// Default story
export const Default: Story = {
  args: {
    data: sampleUsers.slice(0, 10) as any[],
    columns: userColumns as any[],
    idField: "id",
    title: "User Management",
    description: "Manage your organization users",
    isHoverable: true,
  },
};

// With search and filtering
export const WithSearchAndFiltering: Story = {
  args: {
    data: sampleUsers as any[],
    columns: userColumns as any[],
    idField: "id",
    title: "User Management",
    enableSearch: true,
    searchPlaceholder: "Search users...",
    enableFiltering: true,
    isHoverable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "DataTable with search and column filtering enabled for finding specific records.",
      },
    },
  },
};

// With pagination
export const WithPagination: Story = {
  args: {
    data: sampleUsers as any[],
    columns: userColumns as any[],
    idField: "id",
    title: "User Management",
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
        story:
          "DataTable with pagination controls for handling large datasets.",
      },
    },
  },
};

// With inline editing
const EditableDataTable: React.FC = () => {
  const [data, setData] = useState(sampleUsers.slice(0, 10));

  const handleRowSave = (
    rowId: unknown,
    updatedRow: Record<string, unknown>,
  ) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === rowId ? (updatedRow as User) : row)),
    );
    console.log("Row saved:", rowId, updatedRow);
  };

  const editableColumns = userColumns.map((col) => ({
    ...col,
    isEditable: ["email", "role", "department"].includes(col.field as string),
  }));

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
  );
};

export const WithInlineEditing: Story = {
  render: () => <EditableDataTable />,
  parameters: {
    docs: {
      description: {
        story:
          "DataTable with inline editing capabilities. Click on email, role, or department cells to edit.",
      },
    },
  },
};

// With row expansion
export const WithRowExpansion: Story = {
  args: {
    data: sampleUsers.slice(0, 10) as any[],
    columns: userColumns.slice(0, 5) as any[],
    idField: "id",
    title: "Expandable User Table",
    enableRowExpansion: true,
    renderExpandedRow: ({ row }) => {
      const user = row as unknown as User;
      return (
        <div style={{ padding: "20px", backgroundColor: "#f9fafb" }}>
          <h4 style={{ marginBottom: "16px" }}>Additional Information</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Department:</strong> {user.department}
            </div>
            <div>
              <strong>Join Date:</strong> {user.joinDate.toLocaleDateString()}
            </div>
            <div>
              <strong>Salary:</strong> ${user.salary.toLocaleString()}
            </div>
            <div>
              <strong>Skills:</strong> {user.skills.join(", ")}
            </div>
          </div>
        </div>
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: "DataTable with expandable rows to show additional details.",
      },
    },
  },
};

// With custom header slots
const DataTableWithActions: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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
          leadingIcon={Plus}
        />
      }
      headerSlot3={
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            buttonType={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            text="Export"
            leadingIcon={Download}
          />
          <Button
            buttonType={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            text="Filter"
            leadingIcon={Filter}
          />
        </div>
      }
      bulkActions={
        selectedRows.length > 0 && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span>{selectedRows.length} selected</span>
            <Button
              buttonType={ButtonType.DANGER}
              size={ButtonSize.SMALL}
              text="Delete"
              leadingIcon={Trash2}
            />
          </div>
        )
      }
    />
  );
};

export const WithCustomActions: Story = {
  render: () => <DataTableWithActions />,
  parameters: {
    docs: {
      description: {
        story: "DataTable with custom header slots and bulk actions.",
      },
    },
  },
};

// Server-side operations
const ServerSideDataTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRows: 100,
  });

  // Simulate server-side data fetching
  const fetchData = async (
    page: number,
    pageSize: number,
    sort?: SortConfig,
    search?: SearchConfig,
  ) => {
    setLoading(true);
    console.log("Fetching data:", { page, pageSize, sort, search });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate data for current page
    const startIndex = (page - 1) * pageSize;
    const newData = generateUsers(pageSize).map((user, index) => ({
      ...user,
      id: `user-${startIndex + index + 1}`,
      name: `User ${startIndex + index + 1}`,
    }));

    setData(newData);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData(pagination.currentPage, pagination.pageSize);
  }, []);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    fetchData(page, pagination.pageSize);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, currentPage: 1 }));
    fetchData(1, pageSize);
  };

  const handleSortChange = (sortConfig: SortConfig) => {
    fetchData(pagination.currentPage, pagination.pageSize, sortConfig);
  };

  const handleSearchChange = (searchConfig: SearchConfig) => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchData(1, pagination.pageSize, undefined, searchConfig);
  };

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
  );
};

export const ServerSideOperations: Story = {
  render: () => <ServerSideDataTable />,
  parameters: {
    docs: {
      description: {
        story:
          "DataTable with server-side pagination, sorting, and search. Data is fetched on demand.",
      },
    },
  },
};

// Loading state
export const LoadingState: Story = {
  args: {
    data: [],
    columns: userColumns as any[],
    idField: "id",
    title: "Loading Data",
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "DataTable in loading state with skeleton placeholders.",
      },
    },
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    data: [],
    columns: userColumns as any[],
    idField: "id",
    title: "User Management",
    description: "No users found",
    enableSearch: true,
    searchPlaceholder: "Search users...",
  },
  parameters: {
    docs: {
      description: {
        story: "DataTable with no data showing empty state.",
      },
    },
  },
};

// Complex example with all features
const ComplexDataTable: React.FC = () => {
  const [data, setData] = useState(sampleUsers);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const handleRowSave = (
    rowId: unknown,
    updatedRow: Record<string, unknown>,
  ) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === rowId ? (updatedRow as User) : row)),
    );
  };

  const handleRowExpansionChange = (rowId: unknown, isExpanded: boolean) => {
    const id = rowId as string;
    setExpandedRows((prev) =>
      isExpanded ? [...prev, id] : prev.filter((r) => r !== id),
    );
  };

  const complexColumns: ColumnDefinition<Record<string, unknown>>[] = [
    ...userColumns.map((col) => ({
      ...col,
      isEditable: ["email", "role", "department"].includes(col.field as string),
    })),
    {
      field: "id",
      header: "Actions",
      type: ColumnType.CUSTOM,
      minWidth: "100px",
      renderCell: (_, row) => (
        <div style={{ display: "flex", gap: "4px" }}>
          <Button
            buttonType={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            text=""
            leadingIcon={Eye}
            onClick={() => console.log("View:", row)}
          />
          <Button
            buttonType={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            text=""
            leadingIcon={Edit}
            onClick={() => console.log("Edit:", row)}
          />
          <Button
            buttonType={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            text=""
            leadingIcon={MoreVertical}
            onClick={() => console.log("More:", row)}
          />
        </div>
      ),
    },
  ];

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
      isHoverable={true}
      defaultSort={{ field: "name", direction: SortDirection.ASCENDING }}
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
          leadingIcon={Plus}
        />
      }
      headerSlot3={
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            buttonType={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            text="Import"
            leadingIcon={Download}
          />
          <Button
            buttonType={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            text="Export"
            leadingIcon={Download}
          />
        </div>
      }
      bulkActions={
        selectedRows.length > 0 && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ marginRight: "16px" }}>
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
              leadingIcon={Trash2}
            />
          </div>
        )
      }
      renderExpandedRow={({ row, isExpanded, toggleExpansion }) => {
        const user = row as unknown as User;
        return (
          <div style={{ padding: "24px", backgroundColor: "#f9fafb" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
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
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              <div>
                <h5 style={{ marginBottom: "8px", color: "#6b7280" }}>
                  Contact Information
                </h5>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 Main St, City, State 12345
                </p>
              </div>
              <div>
                <h5 style={{ marginBottom: "8px", color: "#6b7280" }}>
                  Employment Details
                </h5>
                <p>
                  <strong>Department:</strong> {user.department}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>Join Date:</strong>{" "}
                  {user.joinDate.toLocaleDateString()}
                </p>
                <p>
                  <strong>Salary:</strong> ${user.salary.toLocaleString()}
                </p>
              </div>
              <div>
                <h5 style={{ marginBottom: "8px", color: "#6b7280" }}>
                  Skills & Status
                </h5>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor:
                        user.status.color === "success"
                          ? "#d1fae5"
                          : user.status.color === "error"
                            ? "#fee2e2"
                            : user.status.color === "warning"
                              ? "#fef3c7"
                              : "#f3f4f6",
                      color:
                        user.status.color === "success"
                          ? "#065f46"
                          : user.status.color === "error"
                            ? "#991b1b"
                            : user.status.color === "warning"
                              ? "#92400e"
                              : "#374151",
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
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                    marginTop: "4px",
                  }}
                >
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        backgroundColor: "#e5e7eb",
                        fontSize: "12px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }}
      onRowSave={handleRowSave}
      onRowExpansionChange={handleRowExpansionChange}
    />
  );
};

export const ComplexExample: Story = {
  render: () => <ComplexDataTable />,
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive DataTable example with all features enabled: search, filtering, sorting, pagination, inline editing, row expansion, column management, and custom actions.",
      },
    },
  },
};
