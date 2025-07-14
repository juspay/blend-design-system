import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { MultiSelect, MultiSelectSelectionTagType } from "blend-v1";
import {
  Globe,
  Palette,
  User,
  Calendar,
  Clock,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
  Heart,
  Star,
  Flag,
  Zap,
  Coffee,
  Music,
  Camera,
  Gamepad2,
  Book,
  Plane,
  Car,
  Home,
  CreditCard,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Video,
  Mic,
  Headphones,
  Wifi,
  Bluetooth,
  Battery,
  Settings,
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  Upload,
  Share2,
  Copy,
  Trash2,
  Edit,
  Save,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  Users,
  Circle,
  Tag,
  Hash,
  Code,
  Database,
  Server,
  Cloud,
  Cpu,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Layers,
  Package,
  Box,
  Archive,
  FolderOpen,
  FileCode,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Terminal,
  Bug,
  Rocket,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Gift,
  ShoppingCart,
  Store,
  Percent,
  Receipt,
  Wallet,
  CreditCard as CardIcon,
  Banknote,
  Coins,
  PiggyBank,
  TrendingDown,
  LineChart,
  Activity,
  Zap as Lightning,
  Flame,
  Sparkles,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Wind,
  Droplet,
  Waves,
  Anchor,
  Compass,
  Map,
  Navigation,
  Crosshair,
  Move,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  RotateCw,
  Shuffle,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Airplay,
  Cast,
  Loader,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";

// Define types locally
type MultiSelectMenuGroupType = {
  label?: string;
  groupLabel?: string;
  items: MultiSelectMenuItemType[];
  showSeparator?: boolean;
};

type MultiSelectMenuItemType = {
  label: string;
  value: string;
  checked?: boolean;
  subLabel?: string;
  leftSlot?: React.ReactNode;
  slot1?: React.ReactNode;
  slot2?: React.ReactNode;
  slot3?: React.ReactNode;
  slot4?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  subMenu?: MultiSelectMenuItemType[];
};

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A multi-selection dropdown component that allows users to select multiple options from a list.

## Features
- Multiple selection from grouped items
- Selection display as count or text list
- Clear all selections button
- Container and no-container variants
- Multiple sizes (Small, Medium, Large)
- Icon support in menu items
- Keyboard navigation support
- Customizable positioning and alignment
- Form integration with labels and validation
- Disabled state support
- Custom slot for trigger content

## Usage

\`\`\`tsx
import { MultiSelect, MultiSelectSelectionTagType } from 'blend-v1';

const [selectedValues, setSelectedValues] = useState<string[]>([]);

<MultiSelect
  label="Select Skills"
  placeholder="Choose skills"
  items={skillItems}
  selectedValues={selectedValues}
  onChange={setSelectedValues}
  selectionTagType={MultiSelectSelectionTagType.COUNT}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the multi-select input",
    },
    sublabel: {
      control: "text",
      description: "Sub-label for additional context",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no selection is made",
    },
    hintText: {
      control: "text",
      description: "Hint text displayed below the select",
    },
    helpIconHintText: {
      control: "text",
      description: "Tooltip text for the help icon",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    disabled: {
      control: "boolean",
      description: "Whether the multi-select is disabled",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the multi-select component",
    },
    variant: {
      control: "select",
      options: ["container", "no-container"],
      description: "Visual variant of the multi-select",
    },
    selectionTagType: {
      control: "select",
      options: Object.values(MultiSelectSelectionTagType),
      description: "How to display selected items (count or text)",
    },
    selectedValues: {
      control: "object",
      description: "Array of currently selected values",
    },
    items: {
      control: "object",
      description: "Array of grouped menu items",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

// Sample data
const skillItems: MultiSelectMenuGroupType[] = [
  {
    label: "Frontend",
    items: [
      { value: "react", label: "React", leftSlot: <Code size={16} /> },
      { value: "vue", label: "Vue.js", leftSlot: <Code size={16} /> },
      { value: "angular", label: "Angular", leftSlot: <Code size={16} /> },
      { value: "svelte", label: "Svelte", leftSlot: <Code size={16} /> },
      { value: "nextjs", label: "Next.js", leftSlot: <Code size={16} /> },
    ],
  },
  {
    label: "Backend",
    items: [
      { value: "nodejs", label: "Node.js", leftSlot: <Server size={16} /> },
      { value: "python", label: "Python", leftSlot: <Server size={16} /> },
      { value: "java", label: "Java", leftSlot: <Server size={16} /> },
      { value: "csharp", label: "C#", leftSlot: <Server size={16} /> },
      { value: "go", label: "Go", leftSlot: <Server size={16} /> },
    ],
  },
  {
    label: "Database",
    items: [
      { value: "postgresql", label: "PostgreSQL", leftSlot: <Database size={16} /> },
      { value: "mysql", label: "MySQL", leftSlot: <Database size={16} /> },
      { value: "mongodb", label: "MongoDB", leftSlot: <Database size={16} /> },
      { value: "redis", label: "Redis", leftSlot: <Database size={16} /> },
    ],
  },
];

const tagItems: MultiSelectMenuGroupType[] = [
  {
    label: "Categories",
    items: [
      { value: "technology", label: "Technology", leftSlot: <Cpu size={16} /> },
      { value: "design", label: "Design", leftSlot: <Palette size={16} /> },
      { value: "business", label: "Business", leftSlot: <Briefcase size={16} /> },
      { value: "marketing", label: "Marketing", leftSlot: <TrendingUp size={16} /> },
      { value: "sales", label: "Sales", leftSlot: <DollarSign size={16} /> },
    ],
  },
  {
    label: "Topics",
    items: [
      { value: "ai", label: "Artificial Intelligence", leftSlot: <Brain size={16} /> },
      { value: "blockchain", label: "Blockchain", leftSlot: <Link size={16} /> },
      { value: "cloud", label: "Cloud Computing", leftSlot: <Cloud size={16} /> },
      { value: "cybersecurity", label: "Cybersecurity", leftSlot: <Shield size={16} /> },
      { value: "data", label: "Data Science", leftSlot: <Database size={16} /> },
    ],
  },
];

const permissionItems: MultiSelectMenuGroupType[] = [
  {
    label: "User Management",
    items: [
      { value: "user.view", label: "View Users", subLabel: "Read-only access", leftSlot: <Eye size={16} /> },
      { value: "user.create", label: "Create Users", subLabel: "Add new users", leftSlot: <Plus size={16} /> },
      { value: "user.edit", label: "Edit Users", subLabel: "Modify user details", leftSlot: <Edit size={16} /> },
      { value: "user.delete", label: "Delete Users", subLabel: "Remove users", leftSlot: <Trash2 size={16} /> },
    ],
  },
  {
    label: "Content Management",
    items: [
      { value: "content.view", label: "View Content", subLabel: "Read-only access", leftSlot: <FileText size={16} /> },
      { value: "content.create", label: "Create Content", subLabel: "Add new content", leftSlot: <Plus size={16} /> },
      { value: "content.edit", label: "Edit Content", subLabel: "Modify content", leftSlot: <Edit size={16} /> },
      { value: "content.publish", label: "Publish Content", subLabel: "Make content live", leftSlot: <Upload size={16} /> },
    ],
  },
  {
    label: "System Settings",
    items: [
      { value: "settings.view", label: "View Settings", subLabel: "Read-only access", leftSlot: <Settings size={16} /> },
      { value: "settings.edit", label: "Edit Settings", subLabel: "Modify settings", leftSlot: <Settings size={16} /> },
      { value: "settings.advanced", label: "Advanced Settings", subLabel: "System config", leftSlot: <Sliders size={16} /> },
    ],
  },
];

// Default story with interactive controls
export const Default: Story = {
  args: {
    label: "Select Skills",
    placeholder: "Choose skills",
    items: skillItems,
    selectedValues: [],
    required: false,
    disabled: false,
    size: "md" as any,
    variant: "container" as any,
    selectionTagType: MultiSelectSelectionTagType.COUNT,
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(args.selectedValues);

    // Update local state when args change
    React.useEffect(() => {
      setSelectedValues(args.selectedValues);
    }, [args.selectedValues]);

    return (
      <div style={{ width: "320px" }}>
        <MultiSelect
          {...args}
          selectedValues={selectedValues}
          onChange={(value) => {
            if (value === "") {
              setSelectedValues([]);
            } else if (typeof value === "string") {
              setSelectedValues(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
        />
      </div>
    );
  },
};

// With count display
export const WithCountDisplay: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    return (
      <div style={{ width: "320px" }}>
        <MultiSelect
          label="Select Tags"
          placeholder="Choose tags"
          items={tagItems}
          selectedValues={selectedValues}
          onChange={(value) => {
            if (value === "") {
              setSelectedValues([]);
            } else if (typeof value === "string") {
              setSelectedValues(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          selectionTagType={MultiSelectSelectionTagType.COUNT}
          helpIconHintText="Select multiple tags for your content"
        />
      </div>
    );
  },
};

// With text display
export const WithTextDisplay: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    return (
      <div style={{ width: "400px" }}>
        <MultiSelect
          label="Select Categories"
          placeholder="Choose categories"
          items={tagItems}
          selectedValues={selectedValues}
          onChange={(value) => {
            if (value === "") {
              setSelectedValues([]);
            } else if (typeof value === "string") {
              setSelectedValues(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          selectionTagType={MultiSelectSelectionTagType.TEXT}
        />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [selectedSmall, setSelectedSmall] = useState<string[]>([]);
    const [selectedMedium, setSelectedMedium] = useState<string[]>([]);
    const [selectedLarge, setSelectedLarge] = useState<string[]>([]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "320px" }}>
        <MultiSelect
          label="Small Size"
          placeholder="Choose options"
          items={skillItems}
          selectedValues={selectedSmall}
          onChange={(value) => {
            if (value === "") {
              setSelectedSmall([]);
            } else if (typeof value === "string") {
              setSelectedSmall(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          size={"sm" as any}
        />
        <MultiSelect
          label="Medium Size (Default)"
          placeholder="Choose options"
          items={skillItems}
          selectedValues={selectedMedium}
          onChange={(value) => {
            if (value === "") {
              setSelectedMedium([]);
            } else if (typeof value === "string") {
              setSelectedMedium(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          size={"md" as any}
        />
        <MultiSelect
          label="Large Size"
          placeholder="Choose options"
          items={skillItems}
          selectedValues={selectedLarge}
          onChange={(value) => {
            if (value === "") {
              setSelectedLarge([]);
            } else if (typeof value === "string") {
              setSelectedLarge(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          size={"lg" as any}
        />
      </div>
    );
  },
};

// No container variant
export const NoContainer: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span>Filter by:</span>
        <MultiSelect
          label="Skills"
          placeholder="All skills"
          items={skillItems}
          selectedValues={selectedValues}
          onChange={(value) => {
            if (value === "") {
              setSelectedValues([]);
            } else if (typeof value === "string") {
              setSelectedValues(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          variant={"no-container" as any}
          size={"sm" as any}
        />
      </div>
    );
  },
};

// With form elements
export const FormIntegration: Story = {
  render: () => {
    const [skills, setSkills] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);
    const [permissions, setPermissions] = useState<string[]>([]);

    const interestItems: MultiSelectMenuGroupType[] = [
      {
        label: "Professional",
        items: [
          { value: "leadership", label: "Leadership", leftSlot: <Crown size={16} /> },
          { value: "management", label: "Management", leftSlot: <Users size={16} /> },
          { value: "strategy", label: "Strategy", leftSlot: <Target size={16} /> },
          { value: "innovation", label: "Innovation", leftSlot: <Lightbulb size={16} /> },
        ],
      },
      {
        label: "Technical",
        items: [
          { value: "programming", label: "Programming", leftSlot: <Code size={16} /> },
          { value: "architecture", label: "Architecture", leftSlot: <Layers size={16} /> },
          { value: "devops", label: "DevOps", leftSlot: <GitBranch size={16} /> },
          { value: "security", label: "Security", leftSlot: <Shield size={16} /> },
        ],
      },
    ];

    return (
      <form style={{ display: "flex", flexDirection: "column", gap: "24px", width: "400px" }}>
        <MultiSelect
          label="Technical Skills"
          sublabel="Required"
          placeholder="Select your skills"
          items={skillItems}
          selectedValues={skills}
          onChange={(value) => {
            if (value === "") {
              setSkills([]);
            } else if (typeof value === "string") {
              setSkills(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          required
          hintText="Select at least 3 skills"
          selectionTagType={MultiSelectSelectionTagType.COUNT}
        />
        
        <MultiSelect
          label="Areas of Interest"
          placeholder="Select your interests"
          items={interestItems}
          selectedValues={interests}
          onChange={(value) => {
            if (value === "") {
              setInterests([]);
            } else if (typeof value === "string") {
              setInterests(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          helpIconHintText="This helps us recommend relevant content"
          selectionTagType={MultiSelectSelectionTagType.TEXT}
        />
        
        <MultiSelect
          label="User Permissions"
          placeholder="Assign permissions"
          items={permissionItems}
          selectedValues={permissions}
          onChange={(value) => {
            if (value === "") {
              setPermissions([]);
            } else if (typeof value === "string") {
              setPermissions(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          hintText="Grant appropriate access levels"
          selectionTagType={MultiSelectSelectionTagType.COUNT}
        />
      </form>
    );
  },
};

// With custom slot
export const WithCustomSlot: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const featureItems: MultiSelectMenuGroupType[] = [
      {
        label: "Core Features",
        items: [
          { value: "dashboard", label: "Dashboard", leftSlot: <LayoutDashboard size={16} /> },
          { value: "analytics", label: "Analytics", leftSlot: <BarChart3 size={16} /> },
          { value: "reports", label: "Reports", leftSlot: <FileText size={16} /> },
          { value: "notifications", label: "Notifications", leftSlot: <Bell size={16} /> },
        ],
      },
      {
        label: "Advanced Features",
        items: [
          { value: "api", label: "API Access", leftSlot: <Zap size={16} /> },
          { value: "integrations", label: "Integrations", leftSlot: <Layers size={16} /> },
          { value: "automation", label: "Automation", leftSlot: <RefreshCw size={16} /> },
          { value: "ai", label: "AI Features", leftSlot: <Brain size={16} /> },
        ],
      },
    ];

    return (
      <div style={{ width: "320px" }}>
        <MultiSelect
          label="Enable Features"
          placeholder="Select features"
          items={featureItems}
          selectedValues={selectedValues}
          onChange={(value) => {
            if (value === "") {
              setSelectedValues([]);
            } else if (typeof value === "string") {
              setSelectedValues(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          slot={<Sparkles size={16} />}
          selectionTagType={MultiSelectSelectionTagType.COUNT}
        />
      </div>
    );
  },
};

// Pre-selected values
export const PreSelectedValues: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([
      "react", "nodejs", "postgresql", "redis"
    ]);

    return (
      <div style={{ width: "320px" }}>
        <MultiSelect
          label="Current Tech Stack"
          placeholder="Modify tech stack"
          items={skillItems}
          selectedValues={selectedValues}
          onChange={(value) => {
            if (value === "") {
              setSelectedValues([]);
            } else if (typeof value === "string") {
              setSelectedValues(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              );
            }
          }}
          selectionTagType={MultiSelectSelectionTagType.TEXT}
        />
      </div>
    );
  },
};

// Complex example
export const ComplexExample: Story = {
  render: () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([
      "name", "email", "role", "status"
    ]);
    const [selectedActions, setSelectedActions] = useState<string[]>([]);

    const filterItems: MultiSelectMenuGroupType[] = [
      {
        label: "Status",
        items: [
          { value: "active", label: "Active", leftSlot: <Circle size={16} color="#10b981" fill="#10b981" /> },
          { value: "inactive", label: "Inactive", leftSlot: <Circle size={16} color="#ef4444" fill="#ef4444" /> },
          { value: "pending", label: "Pending", leftSlot: <Circle size={16} color="#f59e0b" fill="#f59e0b" /> },
          { value: "suspended", label: "Suspended", leftSlot: <Circle size={16} color="#6b7280" fill="#6b7280" /> },
        ],
      },
      {
        label: "Role",
        items: [
          { value: "admin", label: "Admin", leftSlot: <Shield size={16} color="#ef4444" /> },
          { value: "manager", label: "Manager", leftSlot: <Users size={16} color="#3b82f6" /> },
          { value: "user", label: "User", leftSlot: <User size={16} color="#6b7280" /> },
          { value: "guest", label: "Guest", leftSlot: <User size={16} color="#d1d5db" /> },
        ],
      },
      {
        label: "Department",
        items: [
          { value: "engineering", label: "Engineering", leftSlot: <Code size={16} /> },
          { value: "sales", label: "Sales", leftSlot: <TrendingUp size={16} /> },
          { value: "marketing", label: "Marketing", leftSlot: <BarChart3 size={16} /> },
          { value: "support", label: "Support", leftSlot: <Headphones size={16} /> },
        ],
      },
    ];

    const columnItems: MultiSelectMenuGroupType[] = [
      {
        label: "Basic Info",
        items: [
          { value: "name", label: "Name", subLabel: "Full name" },
          { value: "email", label: "Email", subLabel: "Email address" },
          { value: "phone", label: "Phone", subLabel: "Contact number" },
          { value: "avatar", label: "Avatar", subLabel: "Profile picture" },
        ],
      },
      {
        label: "Work Info",
        items: [
          { value: "role", label: "Role", subLabel: "Job role" },
          { value: "department", label: "Department", subLabel: "Team" },
          { value: "manager", label: "Manager", subLabel: "Reports to" },
          { value: "location", label: "Location", subLabel: "Office" },
        ],
      },
      {
        label: "Account Info",
        items: [
          { value: "status", label: "Status", subLabel: "Account status" },
          { value: "created", label: "Created", subLabel: "Join date" },
          { value: "lastLogin", label: "Last Login", subLabel: "Last active" },
          { value: "permissions", label: "Permissions", subLabel: "Access level" },
        ],
      },
    ];

    const actionItems: MultiSelectMenuGroupType[] = [
      {
        items: [
          { value: "export", label: "Export", leftSlot: <Download size={16} /> },
          { value: "print", label: "Print", leftSlot: <Printer size={16} /> },
          { value: "share", label: "Share", leftSlot: <Share2 size={16} /> },
          { value: "archive", label: "Archive", leftSlot: <Archive size={16} /> },
        ],
      },
    ];

    return (
      <div style={{ 
        padding: "24px",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        width: "600px"
      }}>
        <h3 style={{ marginBottom: "24px" }}>User Management Dashboard</h3>
        
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <div style={{ flex: 1 }}>
            <MultiSelect
              label="Filters"
              placeholder="Filter users"
              items={filterItems}
              selectedValues={selectedFilters}
              onChange={(value) => {
                if (value === "") {
                  setSelectedFilters([]);
                } else if (typeof value === "string") {
                  setSelectedFilters(prev => 
                    prev.includes(value) 
                      ? prev.filter(v => v !== value)
                      : [...prev, value]
                  );
                }
              }}
              selectionTagType={MultiSelectSelectionTagType.COUNT}
              size={"sm" as any}
            />
          </div>
          
          <div style={{ flex: 1 }}>
            <MultiSelect
              label="Visible Columns"
              placeholder="Select columns"
              items={columnItems}
              selectedValues={selectedColumns}
              onChange={(value) => {
                if (value === "") {
                  setSelectedColumns([]);
                } else if (typeof value === "string") {
                  setSelectedColumns(prev => 
                    prev.includes(value) 
                      ? prev.filter(v => v !== value)
                      : [...prev, value]
                  );
                }
              }}
              selectionTagType={MultiSelectSelectionTagType.COUNT}
              size={"sm" as any}
            />
          </div>
          
          <div style={{ width: "150px" }}>
            <MultiSelect
              label="Bulk Actions"
              placeholder="Actions"
              items={actionItems}
              selectedValues={selectedActions}
              onChange={(value) => {
                if (value === "") {
                  setSelectedActions([]);
                } else if (typeof value === "string") {
                  setSelectedActions(prev => 
                    prev.includes(value) 
                      ? prev.filter(v => v !== value)
                      : [...prev, value]
                  );
                }
              }}
              variant={"no-container" as any}
              size={"sm" as any}
            />
          </div>
        </div>
        
        <div style={{ 
          padding: "16px",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #e5e7eb"
        }}>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            {selectedFilters.length > 0 
              ? `Showing users with ${selectedFilters.length} active filter${selectedFilters.length > 1 ? 's' : ''}`
              : 'Showing all users'
            }
          </p>
          <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "8px" }}>
            {selectedColumns.length} column{selectedColumns.length !== 1 ? 's' : ''} visible
          </p>
        </div>
      </div>
    );
  },
};

// Import additional icons
import { 
  Brain, 
  Link, 
  Sliders, 
  Lightbulb, 
  LayoutDashboard, 
  Bell,
  ShoppingBag,
  Printer
} from "lucide-react";
