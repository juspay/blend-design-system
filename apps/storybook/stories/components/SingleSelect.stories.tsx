import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { SingleSelect } from "blend-v1";

// Define types locally since they're not exported from blend-v1
type SelectMenuGroupType = {
  label?: string;
  groupLabel?: string;
  items: SelectMenuItemType[];
  showSeparator?: boolean;
};

type SelectMenuItemType = {
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
  subMenu?: SelectMenuItemType[];
};

// Define size and variant types
type SelectMenuSize = "sm" | "md" | "lg";
type SelectMenuVariant = "container" | "no-container";

// Create enum-like objects for easier usage
const SelectMenuSizeEnum = {
  SMALL: "sm" as SelectMenuSize,
  MEDIUM: "md" as SelectMenuSize,
  LARGE: "lg" as SelectMenuSize,
};

const SelectMenuVariantEnum = {
  CONTAINER: "container" as SelectMenuVariant,
  NO_CONTAINER: "no-container" as SelectMenuVariant,
};
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
  ShoppingBag,
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
} from "lucide-react";

const meta: Meta<typeof SingleSelect> = {
  title: "Components/SingleSelect",
  component: SingleSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A single selection dropdown component that allows users to select one option from a list.

## Features
- Single selection from grouped items
- Search functionality for filtering options
- Container and no-container variants
- Multiple sizes (Small, Medium, Large)
- Icon support in trigger and menu items
- Keyboard navigation support
- Customizable positioning and alignment
- Form integration with labels and validation
- Disabled state support
- Custom slot for trigger content

## Usage

\`\`\`tsx
import { SingleSelect } from 'blend-v1';

const [selected, setSelected] = useState("");

<SingleSelect
  label="Select Country"
  placeholder="Choose a country"
  items={countryItems}
  selected={selected}
  onSelect={setSelected}
  enableSearch
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the select input",
    },
    subLabel: {
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
    helpIconText: {
      control: "text",
      description: "Tooltip text for the help icon",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    enableSearch: {
      control: "boolean",
      description: "Enable search functionality in the dropdown",
    },
    size: {
      control: "select",
      options: Object.values(SelectMenuSizeEnum),
      description: "Size of the select component",
    },
    variant: {
      control: "select",
      options: Object.values(SelectMenuVariantEnum),
      description: "Visual variant of the select",
    },
    selected: {
      control: "text",
      description: "Currently selected value",
    },
    items: {
      control: "object",
      description: "Array of grouped menu items",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SingleSelect>;

// Sample data
const countryItems: SelectMenuGroupType[] = [
  {
    label: "North America",
    items: [
      { value: "us", label: "United States", leftSlot: <Flag size={16} /> },
      { value: "ca", label: "Canada", leftSlot: <Flag size={16} /> },
      { value: "mx", label: "Mexico", leftSlot: <Flag size={16} /> },
    ],
  },
  {
    label: "Europe",
    items: [
      { value: "uk", label: "United Kingdom", leftSlot: <Flag size={16} /> },
      { value: "de", label: "Germany", leftSlot: <Flag size={16} /> },
      { value: "fr", label: "France", leftSlot: <Flag size={16} /> },
      { value: "it", label: "Italy", leftSlot: <Flag size={16} /> },
      { value: "es", label: "Spain", leftSlot: <Flag size={16} /> },
    ],
  },
  {
    label: "Asia",
    items: [
      { value: "jp", label: "Japan", leftSlot: <Flag size={16} /> },
      { value: "cn", label: "China", leftSlot: <Flag size={16} /> },
      { value: "in", label: "India", leftSlot: <Flag size={16} /> },
      { value: "kr", label: "South Korea", leftSlot: <Flag size={16} /> },
    ],
  },
];

const timezoneItems: SelectMenuGroupType[] = [
  {
    label: "Americas",
    items: [
      { value: "pst", label: "Pacific Time (PST)", subLabel: "UTC-8", leftSlot: <Clock size={16} /> },
      { value: "mst", label: "Mountain Time (MST)", subLabel: "UTC-7", leftSlot: <Clock size={16} /> },
      { value: "cst", label: "Central Time (CST)", subLabel: "UTC-6", leftSlot: <Clock size={16} /> },
      { value: "est", label: "Eastern Time (EST)", subLabel: "UTC-5", leftSlot: <Clock size={16} /> },
    ],
  },
  {
    label: "Europe & Africa",
    items: [
      { value: "gmt", label: "Greenwich Mean Time (GMT)", subLabel: "UTC+0", leftSlot: <Clock size={16} /> },
      { value: "cet", label: "Central European Time (CET)", subLabel: "UTC+1", leftSlot: <Clock size={16} /> },
      { value: "eet", label: "Eastern European Time (EET)", subLabel: "UTC+2", leftSlot: <Clock size={16} /> },
    ],
  },
  {
    label: "Asia & Pacific",
    items: [
      { value: "ist", label: "India Standard Time (IST)", subLabel: "UTC+5:30", leftSlot: <Clock size={16} /> },
      { value: "cst_china", label: "China Standard Time (CST)", subLabel: "UTC+8", leftSlot: <Clock size={16} /> },
      { value: "jst", label: "Japan Standard Time (JST)", subLabel: "UTC+9", leftSlot: <Clock size={16} /> },
      { value: "aest", label: "Australian Eastern Time (AEST)", subLabel: "UTC+10", leftSlot: <Clock size={16} /> },
    ],
  },
];

const departmentItems: SelectMenuGroupType[] = [
  {
    label: "Engineering",
    items: [
      { value: "frontend", label: "Frontend Development", leftSlot: <Globe size={16} /> },
      { value: "backend", label: "Backend Development", leftSlot: <Settings size={16} /> },
      { value: "mobile", label: "Mobile Development", leftSlot: <Phone size={16} /> },
      { value: "devops", label: "DevOps", leftSlot: <Zap size={16} /> },
      { value: "qa", label: "Quality Assurance", leftSlot: <Shield size={16} /> },
    ],
  },
  {
    label: "Business",
    items: [
      { value: "sales", label: "Sales", leftSlot: <TrendingUp size={16} /> },
      { value: "marketing", label: "Marketing", leftSlot: <BarChart3 size={16} /> },
      { value: "hr", label: "Human Resources", leftSlot: <Users size={16} /> },
      { value: "finance", label: "Finance", leftSlot: <DollarSign size={16} /> },
      { value: "operations", label: "Operations", leftSlot: <Briefcase size={16} /> },
    ],
  },
  {
    label: "Creative",
    items: [
      { value: "design", label: "Design", leftSlot: <Palette size={16} /> },
      { value: "content", label: "Content Writing", leftSlot: <FileText size={16} /> },
      { value: "video", label: "Video Production", leftSlot: <Video size={16} /> },
      { value: "photography", label: "Photography", leftSlot: <Camera size={16} /> },
    ],
  },
];

// Default story with interactive controls
export const Default: Story = {
  args: {
    label: "Select Country",
    placeholder: "Choose a country",
    items: countryItems,
    selected: "",
    required: false,
    disabled: false,
    enableSearch: false,
    size: "md" as any,
    variant: "container" as any,
  },
  render: (args) => {
    const [selected, setSelected] = useState(args.selected);

    // Update local state when args change
    React.useEffect(() => {
      setSelected(args.selected);
    }, [args.selected]);

    return (
      <div style={{ width: "320px" }}>
        <SingleSelect
          {...args}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    );
  },
};

// With search
export const WithSearch: Story = {
  render: () => {
    const [selected, setSelected] = useState("");

    return (
      <div style={{ width: "320px" }}>
        <SingleSelect
          label="Select Country"
          placeholder="Search and select a country"
          items={countryItems}
          selected={selected}
          onSelect={setSelected}
          enableSearch
          helpIconText="Start typing to filter countries"
        />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [selectedSmall, setSelectedSmall] = useState("");
    const [selectedMedium, setSelectedMedium] = useState("");
    const [selectedLarge, setSelectedLarge] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "320px" }}>
        <SingleSelect
          label="Small Size"
          placeholder="Choose an option"
          items={departmentItems}
          selected={selectedSmall}
          onSelect={setSelectedSmall}
          size={"sm" as any}
        />
        <SingleSelect
          label="Medium Size (Default)"
          placeholder="Choose an option"
          items={departmentItems}
          selected={selectedMedium}
          onSelect={setSelectedMedium}
          size={"md" as any}
        />
        <SingleSelect
          label="Large Size"
          placeholder="Choose an option"
          items={departmentItems}
          selected={selectedLarge}
          onSelect={setSelectedLarge}
          size={"lg" as any}
        />
      </div>
    );
  },
};

// No container variant
export const NoContainer: Story = {
  render: () => {
    const [selected, setSelected] = useState("");

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span>Filter by:</span>
        <SingleSelect
          label="Department"
          placeholder="All departments"
          items={departmentItems}
          selected={selected}
          onSelect={setSelected}
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
    const [country, setCountry] = useState("");
    const [timezone, setTimezone] = useState("");
    const [department, setDepartment] = useState("");

    return (
      <form style={{ display: "flex", flexDirection: "column", gap: "24px", width: "400px" }}>
        <SingleSelect
          label="Country"
          subLabel="Required"
          placeholder="Select your country"
          items={countryItems}
          selected={country}
          onSelect={setCountry}
          required
          hintText="This will determine your default currency"
        />
        
        <SingleSelect
          label="Timezone"
          placeholder="Select your timezone"
          items={timezoneItems}
          selected={timezone}
          onSelect={setTimezone}
          enableSearch
          helpIconText="Your local timezone for scheduling"
        />
        
        <SingleSelect
          label="Department"
          placeholder="Select your department"
          items={departmentItems}
          selected={department}
          onSelect={setDepartment}
          hintText="You can change this later in settings"
        />
      </form>
    );
  },
};

// With custom slot
export const WithCustomSlot: Story = {
  render: () => {
    const [selected, setSelected] = useState("");

    const languageItems: SelectMenuGroupType[] = [
      {
        label: "Popular",
        items: [
          { value: "en", label: "English", leftSlot: <Globe size={16} /> },
          { value: "es", label: "Spanish", leftSlot: <Globe size={16} /> },
          { value: "fr", label: "French", leftSlot: <Globe size={16} /> },
          { value: "de", label: "German", leftSlot: <Globe size={16} /> },
        ],
      },
      {
        label: "Asian",
        items: [
          { value: "zh", label: "Chinese", leftSlot: <Globe size={16} /> },
          { value: "ja", label: "Japanese", leftSlot: <Globe size={16} /> },
          { value: "ko", label: "Korean", leftSlot: <Globe size={16} /> },
          { value: "hi", label: "Hindi", leftSlot: <Globe size={16} /> },
        ],
      },
    ];

    return (
      <div style={{ width: "320px" }}>
        <SingleSelect
          label="Language"
          placeholder="Select language"
          items={languageItems}
          selected={selected}
          onSelect={setSelected}
          slot={<Globe size={16} />}
        />
      </div>
    );
  },
};

// Disabled state
export const DisabledState: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "320px" }}>
        <SingleSelect
          label="Disabled Empty"
          placeholder="Cannot select"
          items={countryItems}
          selected=""
          onSelect={() => {}}
          disabled
        />
        <SingleSelect
          label="Disabled with Value"
          placeholder="Choose a country"
          items={countryItems}
          selected="us"
          onSelect={() => {}}
          disabled
        />
      </div>
    );
  },
};

// Complex example
export const ComplexExample: Story = {
  render: () => {
    const [project, setProject] = useState("");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");

    const projectItems: SelectMenuGroupType[] = [
      {
        label: "Active Projects",
        items: [
          { value: "web-redesign", label: "Website Redesign", subLabel: "Due in 2 weeks", leftSlot: <Globe size={16} /> },
          { value: "mobile-app", label: "Mobile App v2.0", subLabel: "Due in 1 month", leftSlot: <Phone size={16} /> },
          { value: "api-migration", label: "API Migration", subLabel: "Due in 3 weeks", leftSlot: <Zap size={16} /> },
        ],
      },
      {
        label: "Upcoming Projects",
        items: [
          { value: "dashboard", label: "Analytics Dashboard", subLabel: "Starts next month", leftSlot: <BarChart3 size={16} /> },
          { value: "crm", label: "CRM Integration", subLabel: "Q2 2024", leftSlot: <Briefcase size={16} /> },
        ],
      },
    ];

    const assigneeItems: SelectMenuGroupType[] = [
      {
        label: "Development Team",
        items: [
          { value: "john", label: "John Doe", subLabel: "Frontend Lead", leftSlot: <User size={16} /> },
          { value: "jane", label: "Jane Smith", subLabel: "Backend Lead", leftSlot: <User size={16} /> },
          { value: "mike", label: "Mike Johnson", subLabel: "Full Stack", leftSlot: <User size={16} /> },
        ],
      },
      {
        label: "Design Team",
        items: [
          { value: "sarah", label: "Sarah Williams", subLabel: "UI/UX Lead", leftSlot: <User size={16} /> },
          { value: "tom", label: "Tom Brown", subLabel: "Product Designer", leftSlot: <User size={16} /> },
        ],
      },
    ];

    const priorityItems: SelectMenuGroupType[] = [
      {
        items: [
          { value: "critical", label: "Critical", leftSlot: <AlertCircle size={16} color="#ef4444" /> },
          { value: "high", label: "High", leftSlot: <AlertCircle size={16} color="#f59e0b" /> },
          { value: "medium", label: "Medium", leftSlot: <AlertCircle size={16} color="#3b82f6" /> },
          { value: "low", label: "Low", leftSlot: <AlertCircle size={16} color="#6b7280" /> },
        ],
      },
    ];

    const statusItems: SelectMenuGroupType[] = [
      {
        items: [
          { value: "todo", label: "To Do", leftSlot: <Circle size={16} /> },
          { value: "in-progress", label: "In Progress", leftSlot: <Clock size={16} color="#3b82f6" /> },
          { value: "review", label: "In Review", leftSlot: <Eye size={16} color="#f59e0b" /> },
          { value: "done", label: "Done", leftSlot: <Check size={16} color="#10b981" /> },
        ],
      },
    ];

    return (
      <div style={{ 
        padding: "24px",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        width: "500px"
      }}>
        <h3 style={{ marginBottom: "24px" }}>Create New Task</h3>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <SingleSelect
            label="Project"
            placeholder="Select a project"
            items={projectItems}
            selected={project}
            onSelect={setProject}
            required
            enableSearch
          />
          
          <SingleSelect
            label="Assignee"
            placeholder="Assign to team member"
            items={assigneeItems}
            selected={assignee}
            onSelect={setAssignee}
            enableSearch
            helpIconText="The person responsible for this task"
          />
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <SingleSelect
              label="Priority"
              placeholder="Set priority"
              items={priorityItems}
              selected={priority}
              onSelect={setPriority}
              required
            />
            
            <SingleSelect
              label="Status"
              placeholder="Set status"
              items={statusItems}
              selected={status}
              onSelect={setStatus}
            />
          </div>
        </form>
      </div>
    );
  },
};

// Import for missing icons
import { Circle, Users } from "lucide-react";
