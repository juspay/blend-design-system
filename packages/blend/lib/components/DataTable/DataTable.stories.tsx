import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DataTable from "./DataTable";
import {
  ColumnDefinition,
  FilterType,
  SearchConfig,
  ColumnFilter,
} from "./types";
import { ColumnType, AvatarData, TagData } from "./columnTypes";
import { Avatar } from "../Avatar";
import Tag from "../Tags/Tags";
import { TagColor, TagVariant, TagSize } from "../Tags/types";
import { Button, ButtonType, ButtonSize } from "../Button";
import { RefreshCw, Plus, Download, Settings } from "lucide-react";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# DataTable Component

A powerful, feature-rich data table component with built-in support for:

## Key Features
- **Type Safety**: Strict typing between column types and data structures
- **Search & Filtering**: Local and server-side support
- **Sorting**: Multi-column sorting with custom logic
- **Pagination**: Client-side and server-side pagination
- **Inline Editing**: Edit cells directly in the table
- **Row Expansion**: Expandable rows with custom content
- **Row Click Actions**: Click handlers with automatic visual feedback
- **Bulk Actions**: Select multiple rows and perform bulk operations
- **Column Management**: Show/hide columns dynamically
- **Export**: CSV export functionality
- **Responsive**: Mobile-friendly design

## Column Types

The DataTable supports multiple column types with strict type safety:

### AVATAR
Expects \`AvatarData\` structure:
\`\`\`tsx
{
  label: string;           // Required display name
  sublabel?: string;       // Optional subtitle
  imageUrl?: string;       // Optional image URL
  initials?: string;       // Optional fallback initials
}
\`\`\`

### TAG
Expects \`TagData\` structure:
\`\`\`tsx
{
  text: string;            // Required tag text
  color?: 'success' | 'error' | 'warning' | 'neutral';
  variant?: 'solid' | 'subtle' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}
\`\`\`

### TEXT, NUMBER, SELECT, MULTISELECT, DATE, DATE_RANGE, CUSTOM
Each has specific expected data structures for type safety.

## Usage Examples

### Basic Usage
\`\`\`tsx
<DataTable
  idField="id" // Ensure idField is explicitly set to a valid string
  idField="id" // Ensure idField is explicitly set to a valid string
  data={users}
  columns={columns}
  idField="id"
  title="User Management"
  description="Manage your users with full CRUD operations"
/>
\`\`\`

### With Server-Side Operations
\`\`\`tsx
<DataTable
  data={users}
  columns={columns}
  idField="id"
  serverSideSearch={true}
  serverSideFiltering={true}
  serverSidePagination={true}
  onSearchChange={(config) => fetchData(config)}
  onFilterChange={(filters) => fetchData(filters)}
  onPageChange={(page) => fetchData(page)}
/>
\`\`\`

### With Row Click Actions
\`\`\`tsx
<DataTable
  data={users}
  columns={columns}
  idField="id"
  onRowClick={(row, index) => {
    // Navigate to user profile
    navigate(\`/users/\${row.id}\`);
    
    // Or open a modal
    setSelectedUser(row);
    setShowModal(true);
    
    // Or trigger any custom action
    console.log('Clicked row:', row, 'at index:', index);
  }}
/>
\`\`\`

### Type-Safe Data Structure
\`\`\`tsx
type User = {
  id: number;
  name: AvatarData;      // Avatar column type
  email: string;         // Text column type
  status: TagData;       // Tag column type
  role: string;          // Text column type
};

const data: User[] = [
  {
    id: 1,
    name: {
      label: "John Doe",
      sublabel: "Software Engineer",
      imageUrl: "https://example.com/john.jpg"
    },
    email: "john@example.com",
    status: {
      text: "Active",
      color: "success",
      variant: "subtle"
    },
    role: "Admin"
  }
];
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    data: {
      description: "Array of data objects to display in the table",
      control: false,
    },
    columns: {
      description: "Column definitions specifying how to render each field",
      control: false,
    },
    idField: {
      description: "Field name to use as unique identifier for rows",
      control: "text",
    },
    title: {
      description: "Optional table title displayed in the header",
      control: "text",
    },
    description: {
      description: "Optional table description displayed below the title",
      control: "text",
    },
    isHoverable: {
      description: "Whether to show hover effects on rows",
      control: "boolean",
    },
    enableSearch: {
      description: "Enable universal search functionality",
      control: "boolean",
    },
    enableFiltering: {
      description: "Enable local column-level filtering",
      control: "boolean",
    },
    enableAdvancedFilter: {
      description: "Enable advanced filtering with custom filter component",
      control: "boolean",
    },
    enableInlineEdit: {
      description: "Enable inline editing of cells",
      control: "boolean",
    },
    enableRowExpansion: {
      description: "Enable expandable rows",
      control: "boolean",
    },
    enableColumnManager: {
      description: "Enable column visibility management",
      control: "boolean",
    },
    serverSideSearch: {
      description: "Handle search on server-side (disables local search)",
      control: "boolean",
    },
    serverSideFiltering: {
      description: "Handle filtering on server-side (disables local filtering)",
      control: "boolean",
    },
    serverSidePagination: {
      description:
        "Handle pagination on server-side (disables local pagination)",
      control: "boolean",
    },
    isLoading: {
      description: "Show loading states when data is being fetched",
      control: "boolean",
    },
    onRowClick: {
      description:
        "Callback function when a row is clicked. Automatically adds cursor pointer and hover effects.",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample data types with proper type safety
type User = {
  id: number;
  name: AvatarData;
  email: string;
  role: string;
  department: string;
  status: TagData;
  salary: number;
  joinDate: string;
  lastLogin: string;
};

// Helper function to create type-safe user data
const createUser = (
  id: number,
  name: string,
  email: string,
  role: string,
  department: string,
  status: string,
  salary: number,
  joinDate: string,
  lastLogin: string,
): User => ({
  id,
  name: {
    label: name,
    sublabel: role,
    imageUrl: `https://randomuser.me/api/portraits/${id % 2 ? "men" : "women"}/${id % 70}.jpg`,
  },
  email,
  role,
  department,
  status: {
    text: status,
    color:
      status === "Active"
        ? "success"
        : status === "Inactive"
          ? "error"
          : status === "Pending"
            ? "warning"
            : "neutral",
    variant: "subtle",
  } as TagData,
  salary,
  joinDate,
  lastLogin,
});

// Sample data
const sampleUsers: User[] = [
  createUser(
    1,
    "John Doe",
    "john@example.com",
    "Admin",
    "Engineering",
    "Active",
    120000,
    "2020-01-15",
    "2 hours ago",
  ),
  createUser(
    2,
    "Jane Smith",
    "jane@example.com",
    "Manager",
    "Marketing",
    "Active",
    95000,
    "2019-03-10",
    "1 day ago",
  ),
  createUser(
    3,
    "Bob Johnson",
    "bob@example.com",
    "Developer",
    "Engineering",
    "Inactive",
    85000,
    "2021-07-22",
    "1 week ago",
  ),
  createUser(
    4,
    "Alice Brown",
    "alice@example.com",
    "Designer",
    "Design",
    "Active",
    75000,
    "2020-11-05",
    "3 hours ago",
  ),
  createUser(
    5,
    "Charlie Wilson",
    "charlie@example.com",
    "Analyst",
    "Finance",
    "Pending",
    70000,
    "2022-02-14",
    "2 days ago",
  ),
  createUser(
    6,
    "Diana Lee",
    "diana@example.com",
    "Developer",
    "Engineering",
    "Active",
    90000,
    "2021-09-18",
    "5 hours ago",
  ),
  createUser(
    7,
    "Eve Davis",
    "eve@example.com",
    "Manager",
    "Sales",
    "Active",
    100000,
    "2019-12-03",
    "1 hour ago",
  ),
  createUser(
    8,
    "Frank Miller",
    "frank@example.com",
    "Support",
    "Customer Service",
    "Suspended",
    55000,
    "2022-04-20",
    "3 weeks ago",
  ),
];

// Column definitions showcasing different column types
const userColumns: ColumnDefinition<User>[] = [
  {
    field: "name",
    header: "Employee",
    type: ColumnType.AVATAR,
    renderCell: (value) => {
      const avatarData = value as AvatarData;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar src={avatarData.imageUrl} alt={avatarData.label} />
          <div>
            <div style={{ fontWeight: 500, fontSize: "14px" }}>
              {avatarData.label}
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              {avatarData.sublabel}
            </div>
          </div>
        </div>
      );
    },
    isSortable: true,
    isFilterable: true,
    filterType: FilterType.TEXT,
    minWidth: "220px",
    maxWidth: "300px",
  },
  {
    field: "email",
    header: "Email",
    type: ColumnType.TEXT,
    isSortable: true,
    isEditable: true,
    isFilterable: true,
    filterType: FilterType.TEXT,
    minWidth: "180px",
    maxWidth: "250px",
  },
  {
    field: "role",
    header: "Role",
    type: ColumnType.SELECT,
    isSortable: true,
    isEditable: true,
    isFilterable: true,
    filterType: FilterType.SELECT,
    filterOptions: [
      { id: "admin", label: "Admin", value: "Admin" },
      { id: "manager", label: "Manager", value: "Manager" },
      { id: "developer", label: "Developer", value: "Developer" },
      { id: "designer", label: "Designer", value: "Designer" },
      { id: "analyst", label: "Analyst", value: "Analyst" },
    ],
    minWidth: "120px",
    maxWidth: "160px",
  },
  {
    field: "department",
    header: "Department",
    type: ColumnType.SELECT,
    isSortable: true,
    isEditable: true,
    isFilterable: true,
    filterType: FilterType.SELECT,
    filterOptions: [
      { id: "engineering", label: "Engineering", value: "Engineering" },
      { id: "marketing", label: "Marketing", value: "Marketing" },
      { id: "design", label: "Design", value: "Design" },
      { id: "finance", label: "Finance", value: "Finance" },
      { id: "sales", label: "Sales", value: "Sales" },
      { id: "support", label: "Customer Service", value: "Customer Service" },
    ],
    minWidth: "130px",
    maxWidth: "180px",
  },
  {
    field: "status",
    header: "Status",
    type: ColumnType.TAG,
    renderCell: (value) => {
      const tagData = value as TagData;
      const getStatusColor = (status: string): TagColor => {
        switch (status) {
          case "Active":
            return TagColor.SUCCESS;
          case "Inactive":
            return TagColor.ERROR;
          case "Pending":
            return TagColor.WARNING;
          case "Suspended":
            return TagColor.NEUTRAL;
          default:
            return TagColor.NEUTRAL;
        }
      };

      return (
        <Tag
          text={tagData.text}
          variant={TagVariant.SUBTLE}
          color={getStatusColor(tagData.text)}
          size={TagSize.SM}
        />
      );
    },
    isSortable: true,
    isFilterable: true,
    filterType: FilterType.SELECT,
    filterOptions: [
      { id: "active", label: "Active", value: "Active" },
      { id: "inactive", label: "Inactive", value: "Inactive" },
      { id: "pending", label: "Pending", value: "Pending" },
      { id: "suspended", label: "Suspended", value: "Suspended" },
    ],
    minWidth: "100px",
    maxWidth: "140px",
  },
  {
    field: "salary",
    header: "Salary",
    type: ColumnType.NUMBER,
    renderCell: (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value as number);
    },
    isSortable: true,
    isEditable: true,
    isFilterable: true,
    filterType: FilterType.NUMBER,
    minWidth: "100px",
    maxWidth: "140px",
  },
  {
    field: "joinDate",
    header: "Join Date",
    type: ColumnType.DATE,
    isSortable: true,
    isFilterable: true,
    filterType: FilterType.DATE,
    minWidth: "120px",
    maxWidth: "150px",
  },
  {
    field: "lastLogin",
    header: "Last Login",
    type: ColumnType.TEXT,
    isSortable: true,
    minWidth: "110px",
    maxWidth: "140px",
  },
];

// Story: Basic DataTable
const DefaultComponent = (args: typeof Default.args) => {
  const handleRowClick = (row: Record<string, unknown>, index: number) => {
    const user = row as User;
    const userData = user.name as AvatarData;
    console.log("🖱️ Row clicked:", {
      user: userData.label,
      email: user.email,
      role: user.role,
      index,
    });
    alert(
      `Clicked on employee: ${userData.label}\nEmail: ${user.email}\nRole: ${user.role}\n\nRow index: ${index}`,
    );
  };

  return (
    <DataTable
      {...args}
      data={sampleUsers as Record<string, unknown>[]}
      columns={
        userColumns as unknown as ColumnDefinition<Record<string, unknown>>[]
      }
      idField="id"
      onRowClick={handleRowClick}
    />
  );
};

export const Default: Story = {
  render: DefaultComponent,
  args: {
    data: sampleUsers,
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Directory",
    description:
      "Manage your team members and their information. Click on any row to see details!",
    isHoverable: true,
    enableSearch: false,
    enableAdvancedFilter: false,
    enableInlineEdit: false,
    enableRowExpansion: false,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Basic DataTable

This is the simplest form of the DataTable component showing:
- **Type-safe columns**: Each column type (AVATAR, TAG, SELECT, etc.) expects specific data structures
- **Custom rendering**: Avatar and Tag columns have custom \`renderCell\` functions
- **Column management**: Users can show/hide columns
- **Sorting**: Click column headers to sort
- **Row click interactions**: Click any row to trigger custom actions (shows alert in this demo)
- **Visual feedback**: Automatic cursor pointer and hover effects for clickable rows
- **Responsive design**: Table adapts to different screen sizes

The data uses proper type-safe structures:
- \`name\` field uses \`AvatarData\` for avatar display
- \`status\` field uses \`TagData\` for tag display
- Other fields use appropriate primitive types

**Try clicking on any row** to see the \`onRowClick\` handler in action!
        `,
      },
    },
  },
};

// Story: With Search and Filtering
const WithSearchAndFilteringComponent = (
  args: typeof WithSearchAndFiltering.args,
) => {
  const handleRowClick = (row: Record<string, unknown>, index: number) => {
    const user = row as User;
    const userData = user.name as AvatarData;
    console.log("🖱️ Row clicked in search/filter demo:", {
      user: userData.label,
      email: user.email,
      department: user.department,
      index,
    });
    // Example: Navigate to employee profile
    alert(
      `Opening profile for: ${userData.label}\nDepartment: ${user.department}\nEmail: ${user.email}`,
    );
  };

  return (
    <DataTable
      {...args}
      data={sampleUsers as Record<string, unknown>[]}
      columns={
        userColumns as unknown as ColumnDefinition<Record<string, unknown>>[]
      }
      idField="id"
      onRowClick={handleRowClick}
    />
  );
};

export const WithSearchAndFiltering: Story = {
  render: WithSearchAndFilteringComponent,
  args: {
    data: sampleUsers,
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Directory",
    description:
      "Search and filter employees by various criteria. Click any row to view profile!",
    isHoverable: true,
    enableSearch: true,
    searchPlaceholder: "Search employees...",
    enableFiltering: true,
    enableAdvancedFilter: false,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable with Search and Filtering

This story demonstrates:
- **Universal search**: Search across all visible columns
- **Column-specific filters**: Each column can have its own filter type
- **Filter types**: TEXT, SELECT, NUMBER, DATE filters
- **Real-time filtering**: Results update as you type
- **Combined filtering**: Multiple filters work together
- **Row click interactions**: Click any row to view employee profile

Try:
1. Search for "john" in the search box
2. Filter by "Engineering" department (click column header)
3. Filter by "Active" status (click column header)
4. Combine multiple filters
5. **Click on any row** to see the profile action

Row clicks work seamlessly with search and filtering - click any visible row to trigger actions.
        `,
      },
    },
  },
};

// Advanced Filter Component - using compatible types with DataTable
type AdvancedFilter = {
  id: string;
  field: string;
  operator: string;
  value: string;
};

// Import the actual AdvancedFilterProps type from DataTable
import { AdvancedFilterProps } from "./types";

const DemoAdvancedFilterComponent = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: AdvancedFilterProps) => {
  const [localFilters, setLocalFilters] = useState<AdvancedFilter[]>(
    (filters as AdvancedFilter[]) || [],
  );

  const addFilter = () => {
    const newFilter: AdvancedFilter = {
      id: Date.now().toString(),
      field: "name",
      operator: "contains",
      value: "",
    };
    const updatedFilters = [...localFilters, newFilter];
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const removeFilter = (id: string) => {
    const updatedFilters = localFilters.filter((f) => f.id !== id);
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const updateFilter = (id: string, field: string, value: string) => {
    const updatedFilters = localFilters.map((f) =>
      f.id === id ? { ...f, [field]: value } : f,
    );
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  return (
    <div style={{ minWidth: "400px", padding: "16px" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
          Advanced Filters
        </h4>
        {localFilters.length > 0 && (
          <button
            onClick={() => {
              setLocalFilters([]);
              onClearFilters();
            }}
            style={{
              padding: "4px 8px",
              fontSize: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {localFilters.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "32px",
            border: "2px dashed #e2e8f0",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: "0 0 16px 0", color: "#6b7280" }}>
            No advanced filters applied
          </p>
          <button
            onClick={addFilter}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Filter Rule
          </button>
        </div>
      ) : (
        <div>
          {localFilters.map((filter, index: number) => (
            <div
              key={filter.id}
              style={{
                marginBottom: "12px",
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                {index > 0 && (
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>
                    AND
                  </span>
                )}
                <span style={{ fontSize: "14px", fontWeight: 500 }}>
                  Filter {index + 1}
                </span>
                <button
                  onClick={() => removeFilter(filter.id)}
                  style={{
                    marginLeft: "auto",
                    padding: "2px 6px",
                    fontSize: "12px",
                    color: "#dc2626",
                    border: "1px solid #dc2626",
                    borderRadius: "3px",
                  }}
                >
                  Remove
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 2fr",
                  gap: "8px",
                }}
              >
                <select
                  value={filter.field}
                  onChange={(e) =>
                    updateFilter(filter.id, "field", e.target.value)
                  }
                  style={{
                    padding: "4px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }}
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="role">Role</option>
                  <option value="department">Department</option>
                  <option value="status">Status</option>
                </select>
                <select
                  value={filter.operator}
                  onChange={(e) =>
                    updateFilter(filter.id, "operator", e.target.value)
                  }
                  style={{
                    padding: "4px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }}
                >
                  <option value="contains">Contains</option>
                  <option value="equals">Equals</option>
                  <option value="startsWith">Starts with</option>
                  <option value="endsWith">Ends with</option>
                </select>
                <input
                  type="text"
                  placeholder="Filter value..."
                  value={filter.value}
                  onChange={(e) =>
                    updateFilter(filter.id, "value", e.target.value)
                  }
                  style={{
                    padding: "4px 8px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
          <button
            onClick={addFilter}
            style={{
              padding: "6px 12px",
              backgroundColor: "#f3f4f6",
              border: "1px dashed #9ca3af",
              borderRadius: "4px",
              color: "#374151",
            }}
          >
            + Add Another Filter
          </button>
        </div>
      )}
    </div>
  );
};

const WithAdvancedFilteringComponent = (
  args: typeof WithAdvancedFiltering.args,
) => {
  const [advancedFilters, setAdvancedFilters] = useState<unknown[]>([]);

  const handleAdvancedFiltersChange = (filters: unknown[]) => {
    setAdvancedFilters(filters);
    console.log("Advanced Filters changed:", filters);
  };

  const handleRowClick = (row: Record<string, unknown>, index: number) => {
    const user = row as User;
    const userData = user.name as AvatarData;
    const statusData = user.status as TagData;
    console.log("🖱️ Row clicked in advanced filter demo:", {
      user: userData.label,
      status: statusData.text,
      salary: user.salary,
      index,
    });
    // Example: Open detailed view with all information
    alert(
      `Employee Details:\n\nName: ${userData.label}\nRole: ${user.role}\nDepartment: ${user.department}\nStatus: ${statusData.text}\nSalary: $${user.salary.toLocaleString()}\nJoined: ${user.joinDate}`,
    );
  };

  return (
    <DataTable
      {...args}
      data={sampleUsers as Record<string, unknown>[]}
      columns={
        userColumns as unknown as ColumnDefinition<Record<string, unknown>>[]
      }
      idField="id" // Ensure idField is explicitly set to a valid string
      advancedFilterComponent={DemoAdvancedFilterComponent}
      advancedFilters={advancedFilters}
      onAdvancedFiltersChange={handleAdvancedFiltersChange}
      onRowClick={handleRowClick}
    />
  );
};

export const WithAdvancedFiltering: Story = {
  render: WithAdvancedFilteringComponent,
  args: {
    data: sampleUsers,
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Directory",
    description:
      "Try the advanced filters for complex filtering scenarios. Click any row for detailed employee view!",
    isHoverable: true,
    enableSearch: true,
    enableFiltering: true,
    enableAdvancedFilter: true,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable with Advanced Filtering

This story demonstrates the advanced filtering capabilities:
- **Custom Filter Component**: User-defined filter interface
- **Complex Filter Rules**: Multiple field, operator, value combinations  
- **Server-Side Ready**: Filters can be sent to APIs for server-side processing
- **Combined with Local Filters**: Works alongside column-level filters
- **User Control**: Full control over filter logic and API calls

Advanced Filter Features:
- Add/remove filter rules dynamically
- Choose field, operator, and value for each rule
- Combine multiple filters with AND logic
- Clear all filters at once
- Custom filter component with full UI control
- Row click interactions show detailed employee information

Try:
1. Click "Advanced Filters" button
2. Add filter rules with different combinations
3. Use both column filters (header dropdowns) and advanced filters
4. Notice how they work together for comprehensive filtering
5. **Click any filtered row** to view detailed employee information

The advanced filter component can be customized for your specific needs and can trigger API calls for server-side filtering. Row clicks provide quick access to detailed views.
        `,
      },
    },
  },
};

// Story: With Inline Editing
const WithInlineEditingComponent = (args: typeof WithInlineEditing.args) => {
  const [data, setData] = useState(sampleUsers);

  const handleRowSave = (
    rowId: unknown,
    updatedRow: Record<string, unknown>,
  ) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, ...updatedRow } : row,
      ),
    );
    console.log("Row saved:", { rowId, updatedRow });
  };

  const handleRowCancel = (rowId: unknown) => {
    console.log("Edit cancelled for row:", rowId);
  };

  return (
    <DataTable
      {...args}
      data={data as Record<string, unknown>[]}
      columns={
        userColumns as unknown as ColumnDefinition<Record<string, unknown>>[]
      }
      idField="id"
      onRowSave={handleRowSave}
      onRowCancel={handleRowCancel}
    />
  );
};

export const WithInlineEditing: Story = {
  render: WithInlineEditingComponent,
  args: {
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Management",
    description: "Edit employee information directly in the table",
    isHoverable: true,
    enableSearch: true,
    enableFiltering: true,
    enableInlineEdit: true,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable with Inline Editing

This story shows inline editing capabilities:
- **Edit mode**: Double-click or click edit icon to start editing
- **Editable columns**: Only columns marked with \`isEditable: true\` can be edited
- **Save/Cancel**: Save changes or cancel editing
- **Validation**: Automatic validation based on column types
- **Callbacks**: \`onRowSave\` and \`onRowCancel\` handle edit operations

Editable columns in this example:
- Email (text input)
- Role (select dropdown)
- Department (select dropdown)
- Salary (number input)
        `,
      },
    },
  },
};

// Story: With Row Expansion
const WithRowExpansionComponent = (args: typeof WithRowExpansion.args) => {
  const handleRowExpansionChange = (
    rowId: unknown,
    isExpanded: boolean,
    rowData: Record<string, unknown>,
  ) => {
    console.log("Row expansion changed:", { rowId, isExpanded, rowData });
  };

  const isRowExpandable = (row: Record<string, unknown>) => {
    const user = row as User;
    return (user.status as TagData).text === "Active";
  };

  const renderExpandedRow = ({
    row,
    index,
    toggleExpansion,
  }: {
    row: Record<string, unknown>;
    index: number;
    isExpanded: boolean;
    toggleExpansion: () => void;
  }) => {
    const user = row as User;
    const userData = user.name as AvatarData;
    const statusData = user.status as TagData;

    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          margin: "8px 0",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h4
            style={{
              margin: "0",
              fontSize: "18px",
              fontWeight: 600,
              color: "#1f2937",
            }}
          >
            Detailed Profile: {userData.label} (Row #{index + 1})
          </h4>
          <button
            onClick={toggleExpansion}
            style={{
              padding: "6px 12px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Collapse
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong
              style={{
                color: "#6b7280",
                fontSize: "12px",
                textTransform: "uppercase",
              }}
            >
              Personal Information
            </strong>
            <div style={{ fontSize: "14px", marginTop: "8px" }}>
              <div>
                <strong>Name:</strong> {userData.label}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Role:</strong> {user.role}
              </div>
              <div>
                <strong>Department:</strong> {user.department}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: statusData.text === "Active" ? "#059669" : "#dc2626",
                  }}
                >
                  {statusData.text}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong
              style={{
                color: "#6b7280",
                fontSize: "12px",
                textTransform: "uppercase",
              }}
            >
              Employment Details
            </strong>
            <div style={{ fontSize: "14px", marginTop: "8px" }}>
              <div>
                <strong>Salary:</strong> ${user.salary.toLocaleString()}
              </div>
              <div>
                <strong>Join Date:</strong> {user.joinDate}
              </div>
              <div>
                <strong>Last Login:</strong> {user.lastLogin}
              </div>
              <div>
                <strong>Employee ID:</strong> EMP-
                {user.id.toString().padStart(4, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataTable
      {...args}
      data={sampleUsers as Record<string, unknown>[]}
      columns={
        userColumns as unknown as ColumnDefinition<Record<string, unknown>>[]
      }
      idField="id"
      onRowExpansionChange={handleRowExpansionChange}
      isRowExpandable={isRowExpandable}
      renderExpandedRow={renderExpandedRow}
    />
  );
};

export const WithRowExpansion: Story = {
  render: WithRowExpansionComponent,
  args: {
    data: sampleUsers,
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Directory",
    description: "Click the expand icon to view detailed employee information",
    isHoverable: true,
    enableSearch: true,
    enableFiltering: true,
    enableRowExpansion: true,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable with Row Expansion

This story demonstrates expandable rows:
- **Expandable rows**: Click the expand icon to see detailed content
- **Conditional expansion**: Only "Active" employees can be expanded (\`isRowExpandable\`)
- **Custom content**: \`renderExpandedRow\` provides full control over expanded content
- **Expansion callbacks**: \`onRowExpansionChange\` handles expansion events
- **Rich content**: Expanded rows can contain any React content

Features shown:
- Employee details in a grid layout
- Styled expanded content
- Conditional expansion based on status
- Toggle expansion functionality
        `,
      },
    },
  },
};

// Story: With Pagination
const WithPaginationComponent = (args: typeof WithPagination.args) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    console.log("Page size changed to:", size);
  };

  return (
    <DataTable
      {...args}
      data={sampleUsers as Record<string, unknown>[]}
      columns={
        userColumns as unknown as ColumnDefinition<Record<string, unknown>>[]
      }
      idField="id"
      pagination={{
        currentPage,
        pageSize,
        totalRows: sampleUsers.length,
        pageSizeOptions: [5, 10, 15, 20],
      }}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );
};

export const WithPagination: Story = {
  render: WithPaginationComponent,
  args: {
    data: sampleUsers,
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Directory",
    description: "Navigate through employees using pagination controls",
    isHoverable: true,
    enableSearch: true,
    enableFiltering: true,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable with Pagination

This story shows pagination features:
- **Page navigation**: Previous/Next and direct page navigation
- **Page size selection**: Choose how many rows to display per page
- **Total row count**: Shows total number of records
- **Responsive pagination**: Adapts to different screen sizes
- **Callbacks**: \`onPageChange\` and \`onPageSizeChange\` handle pagination events

Pagination configuration:
- Current page tracking
- Configurable page sizes (5, 10, 15, 20)
- Automatic page reset when page size changes
- Integration with search and filtering
        `,
      },
    },
  },
};

// Story: With Custom Header Slots
const WithCustomHeaderSlotsComponent = (
  args: typeof WithCustomHeaderSlots.args,
) => {
  const handleRowClick = (row: Record<string, unknown>, index: number) => {
    const user = row as User;
    const userData = user.name as AvatarData;
    console.log("🖱️ Row clicked in header slots demo:", {
      user: userData.label,
      role: user.role,
      lastLogin: user.lastLogin,
      index,
    });
    // Example: Quick action menu
    const action = confirm(
      `Quick Actions for ${userData.label}:\n\nClick OK to Edit Employee\nClick Cancel to View Details`,
    );
    if (action) {
      alert(`Opening edit form for: ${userData.label}`);
    } else {
      alert(
        `Viewing details for: ${userData.label}\nRole: ${user.role}\nLast Login: ${user.lastLogin}`,
      );
    }
  };

  return (
    <DataTable
      {...args}
      data={sampleUsers as Record<string, unknown>[]}
      columns={
        userColumns as unknown as ColumnDefinition<Record<string, unknown>>[]
      }
      idField="id"
      onRowClick={handleRowClick}
    />
  );
};

export const WithCustomHeaderSlots: Story = {
  render: WithCustomHeaderSlotsComponent,
  args: {
    data: sampleUsers,
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Management System",
    description:
      "Complete employee management with custom actions. Click rows for quick actions!",
    isHoverable: true,
    enableSearch: true,
    enableFiltering: true,
    enableColumnManager: true,
    headerSlot1: (
      <Button
        buttonType={ButtonType.SECONDARY}
        leadingIcon={RefreshCw}
        size={ButtonSize.SMALL}
        onClick={() => console.log("Refresh clicked")}
      >
        Refresh
      </Button>
    ),
    headerSlot2: (
      <Button
        buttonType={ButtonType.SECONDARY}
        leadingIcon={Download}
        size={ButtonSize.SMALL}
        onClick={() => console.log("Export clicked")}
      >
        Export All
      </Button>
    ),
    headerSlot3: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          buttonType={ButtonType.SECONDARY}
          leadingIcon={Settings}
          size={ButtonSize.SMALL}
          onClick={() => console.log("Settings clicked")}
        >
          Settings
        </Button>
        <Button
          buttonType={ButtonType.PRIMARY}
          leadingIcon={Plus}
          size={ButtonSize.SMALL}
          onClick={() => console.log("Add employee clicked")}
        >
          Add Employee
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable with Custom Header Slots

This story demonstrates custom header slots:
- **headerSlot1**: Left side of the toolbar (Refresh button)
- **headerSlot2**: Center of the toolbar (Export button)
- **headerSlot3**: Right side of the toolbar (Settings and Add buttons)
- **Flexible content**: Any React component can be placed in header slots
- **Responsive layout**: Slots adapt to available space

Use cases:
- Action buttons (Add, Edit, Delete)
- Export/Import functionality
- Settings and configuration
- Status indicators
- Custom search controls
- Row click quick actions (Edit/View options in this demo)

**Try clicking any row** to see quick action options - this demonstrates how row clicks can provide immediate access to common actions like editing or viewing details.
        `,
      },
    },
  },
};

// Story: Server-Side Operations
const ServerSideOperationsComponent = (
  args: typeof ServerSideOperations.args,
) => {
  const [data, setData] = useState(sampleUsers.slice(0, 5));
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ColumnFilter[]>([]);

  // Simulate server-side API call
  const fetchData = async (
    search?: string,
    filterList?: ColumnFilter[],
    page?: number,
    size?: number,
  ) => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filteredData = [...sampleUsers];

    // Apply search
    if (search?.trim()) {
      filteredData = filteredData.filter(
        (user) =>
          (user.name as AvatarData).label
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Apply filters
    filterList?.forEach((filter) => {
      if (filter.value) {
        filteredData = filteredData.filter((user) => {
          const fieldValue = user[filter.field as keyof User];
          if (filter.field === "status") {
            return (fieldValue as TagData).text === filter.value;
          }
          return String(fieldValue)
            .toLowerCase()
            .includes(String(filter.value).toLowerCase());
        });
      }
    });

    // Apply pagination
    const startIndex = ((page || currentPage) - 1) * (size || pageSize);
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + (size || pageSize),
    );

    setData(paginatedData);
    setIsLoading(false);

    console.log("🚀 Server API Call:", {
      search,
      filters: filterList,
      page: page || currentPage,
      size: size || pageSize,
      totalResults: filteredData.length,
      returnedRecords: paginatedData.length,
    });
  };

  const handleSearchChange = (searchConfig: SearchConfig) => {
    setSearchQuery(searchConfig.query);
    setCurrentPage(1);
    fetchData(searchConfig.query, filters, 1, pageSize);
  };

  const handleFilterChange = (newFilters: ColumnFilter[]) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchData(searchQuery, newFilters, 1, pageSize);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(searchQuery, filters, page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    fetchData(searchQuery, filters, 1, size);
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600 }}>
          Server-Side Mode Demo
        </h3>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
          🚀 All operations (search, filtering, pagination) are handled
          server-side. Check the console to see API calls being made.
          {isLoading && (
            <span style={{ color: "#0369a1", marginLeft: "8px" }}>
              ⏳ Loading...
            </span>
          )}
        </p>
      </div>

      <DataTable
        {...args}
        data={data as Record<string, unknown>[]}
        columns={
          userColumns as unknown as ColumnDefinition<Record<string, unknown>>[]
        }
        idField="id"
        isLoading={isLoading}
        serverSideSearch={true}
        serverSideFiltering={true}
        serverSidePagination={true}
        pagination={{
          currentPage,
          pageSize,
          totalRows: sampleUsers.length, // In real scenario, this comes from server
          pageSizeOptions: [5, 10, 15, 20],
        }}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export const ServerSideOperations: Story = {
  render: ServerSideOperationsComponent,
  args: {
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Server-Side Employee Directory",
    description: "All operations handled server-side with API calls",
    isHoverable: true,
    enableSearch: true,
    enableFiltering: true,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable with Server-Side Operations

This story demonstrates server-side data operations:
- **Server-side search**: Search queries sent to server
- **Server-side filtering**: Filter changes trigger API calls  
- **Server-side pagination**: Page changes fetch new data
- **Loading states**: Shows loading indicator during API calls
- **API simulation**: Mock 800ms delay to simulate real API

Key features:
- All data processing happens on the server
- Client only displays the current page of results
- Search and filter changes reset pagination to page 1
- Loading states provide user feedback
- Console logs show API call details

Server-side props:
- \`serverSideSearch={true}\`
- \`serverSideFiltering={true}\`
- \`serverSidePagination={true}\`
- \`isLoading={true}\` during API calls
        `,
      },
    },
  },
};

// Story: Loading State
export const LoadingState: Story = {
  args: {
    data: [],
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Directory",
    description: "Loading employee data...",
    isLoading: true,
    enableSearch: true,
    enableFiltering: true,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable Loading State

This story shows the loading state:
- **Loading indicator**: Visual feedback while data is being fetched
- **Disabled interactions**: Search and filters are disabled during loading
- **Empty data**: Table shows loading state even with no data
- **Consistent UI**: Layout remains stable during loading

Use the \`isLoading\` prop to control loading states during:
- Initial data fetch
- Server-side operations
- Data refresh
- Any async operations
        `,
      },
    },
  },
};

// Story: Empty State
export const EmptyState: Story = {
  args: {
    data: [],
    columns: userColumns as unknown as ColumnDefinition<
      Record<string, unknown>
    >[],
    idField: "id",
    title: "Employee Directory",
    description: "No employees found",
    isLoading: false,
    enableSearch: true,
    enableFiltering: true,
    enableColumnManager: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DataTable Empty State

This story shows the empty state when no data is available:
- **No data message**: Clear indication that no records match the criteria
- **Functional controls**: Search and filters remain functional
- **Proper layout**: Table structure is maintained
- **User guidance**: Description can guide users on next steps

Empty states occur when:
- No data is initially loaded
- Search/filter results in no matches
- All data has been deleted
- API returns empty results
        `,
      },
    },
  },
};
