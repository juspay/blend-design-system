import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Menu,
  MenuAlignment,
  MenuSide,
  MenuItemV2Variant,
  MenuItemV2ActionType,
  MenuV2GroupType,
  ButtonV2,
  ButtonTypeV2,
  ButtonSizeV2,
} from "blend-v1";
import {
  ChevronDown,
  Building,
  Type,
  DollarSign,
  TrendingUp,
  User,
  Settings,
  LogOut,
  CreditCard,
  HelpCircle,
  FileText,
  Download,
  Share2,
  Copy,
  Trash2,
  Edit,
  Save,
  Plus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Mail,
  Bell,
  Shield,
  Key,
  Globe,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Check,
  X,
  AlertCircle,
  Info,
  ChevronRight,
  Home,
  BarChart,
  Users,
  Calendar,
  Folder,
  File,
  Image,
  Video,
  Music,
  Archive,
  Upload,
  RefreshCw,
  Zap,
  Star,
  Heart,
  Bookmark,
  Flag,
  Tag,
  Hash,
  AtSign,
  Phone,
  MessageSquare,
  Send,
  Inbox,
  Clock,
  MapPin,
  Wifi,
  Bluetooth,
  Battery,
  Power,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Printer,
  Scissors,
  Paperclip,
  Link,
  ExternalLink,
  Code,
  Terminal,
  Database,
  Server,
  Cloud,
  CloudOff,
  Package,
  Box,
  Grid,
  List,
  Layers,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
} from "lucide-react";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A versatile dropdown menu component built on top of Radix UI's DropdownMenu primitive. Provides a flexible and accessible way to display contextual actions and options.

## Features
- Multiple alignment and positioning options
- Search functionality for filtering menu items
- Grouped items with labels and separators
- Support for sub-labels and multiple slots
- Action variants (primary, danger)
- Disabled state support
- Sub-menu support for nested navigation
- Modal mode for focus trapping
- Customizable dimensions (min/max width/height)
- Keyboard navigation and accessibility
- Collision detection and boundary awareness

## Usage

\`\`\`tsx
import { Menu, MenuAlignment, MenuSide } from 'blend-v1';

const menuItems = [
  {
    items: [
      { label: "Profile", slot1: <User size={16} />, onClick: () => {} },
      { label: "Settings", slot1: <Settings size={16} />, onClick: () => {} }
    ]
  }
];

<Menu
  trigger={<button>Open Menu</button>}
  items={menuItems}
  alignment={MenuAlignment.START}
  side={MenuSide.BOTTOM}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    trigger: {
      control: false,
      description: "The element that triggers the menu",
    },
    items: {
      control: "object",
      description: "Array of menu groups with items",
    },
    alignment: {
      control: "select",
      options: Object.values(MenuAlignment),
      description: "Alignment of the menu relative to the trigger",
    },
    side: {
      control: "select",
      options: Object.values(MenuSide),
      description: "Side of the trigger where the menu appears",
    },
    sideOffset: {
      control: { type: "number", min: 0, max: 50 },
      description: "Distance from the trigger",
    },
    alignOffset: {
      control: { type: "number", min: -50, max: 50 },
      description: "Offset along the alignment axis",
    },
    asModal: {
      control: "boolean",
      description: "Whether the menu should trap focus",
    },
    enableSearch: {
      control: "boolean",
      description: "Enable search functionality",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for search input",
    },
    minWidth: {
      control: { type: "number", min: 100, max: 400 },
      description: "Minimum width of the menu",
    },
    maxWidth: {
      control: { type: "number", min: 200, max: 600 },
      description: "Maximum width of the menu",
    },
    maxHeight: {
      control: { type: "number", min: 100, max: 600 },
      description: "Maximum height of the menu",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// Default story
export const Default: Story = {
  args: {
    trigger: (
      <ButtonV2
        buttonType={ButtonTypeV2.SECONDARY}
        size={ButtonSizeV2.MEDIUM}
        text="Open Menu"
        trailingIcon={<ChevronDown size={16} />}
      />
    ),
    items: [
      {
        items: [
          {
            label: "Profile",
            slot1: <User size={16} />,
            onClick: () => console.log("Profile clicked"),
          },
          {
            label: "Settings",
            slot1: <Settings size={16} />,
            onClick: () => console.log("Settings clicked"),
          },
          {
            label: "Help",
            slot1: <HelpCircle size={16} />,
            onClick: () => console.log("Help clicked"),
          },
        ],
      },
      {
        showSeparator: true,
        items: [
          {
            label: "Logout",
            slot1: <LogOut size={16} />,
            variant: MenuItemV2Variant.ACTION,
            actionType: MenuItemV2ActionType.DANGER,
            onClick: () => console.log("Logout clicked"),
          },
        ],
      },
    ],
    alignment: MenuAlignment.START,
    side: MenuSide.BOTTOM,
    sideOffset: 8,
  },
};

// With search
export const WithSearch: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        label: "Actions",
        items: [
          { label: "Create New", slot1: <Plus size={16} /> },
          { label: "Open File", slot1: <Folder size={16} /> },
          { label: "Save", slot1: <Save size={16} /> },
          { label: "Save As...", slot1: <Save size={16} /> },
          { label: "Export", slot1: <Download size={16} /> },
          { label: "Import", slot1: <Upload size={16} /> },
          { label: "Print", slot1: <Printer size={16} /> },
        ],
      },
      {
        label: "Edit",
        showSeparator: true,
        items: [
          { label: "Cut", slot1: <Scissors size={16} /> },
          { label: "Copy", slot1: <Copy size={16} /> },
          { label: "Paste", slot1: <Paperclip size={16} /> },
          { label: "Delete", slot1: <Trash2 size={16} />, variant: MenuItemV2Variant.ACTION, actionType: MenuItemV2ActionType.DANGER },
        ],
      },
      {
        label: "View",
        showSeparator: true,
        items: [
          { label: "Zoom In", slot1: <Plus size={16} /> },
          { label: "Zoom Out", slot1: <X size={16} /> },
          { label: "Full Screen", slot1: <Monitor size={16} /> },
          { label: "Grid View", slot1: <Grid size={16} /> },
          { label: "List View", slot1: <List size={16} /> },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
            text="Search Menu"
            leadingIcon={<Search size={16} />}
          />
        }
        items={items}
        enableSearch
        searchPlaceholder="Search actions..."
        maxHeight={400}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Menu with search functionality to filter through many items.",
      },
    },
  },
};

// With sub-labels
export const WithSubLabels: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        label: "Subscription Plans",
        items: [
          {
            label: "Free",
            subLabel: "Basic features for individuals",
            slot1: <Package size={16} />,
            slot2: <span style={{ fontSize: "14px", color: "#666" }}>$0/mo</span>,
          },
          {
            label: "Pro",
            subLabel: "Advanced features for professionals",
            slot1: <Zap size={16} />,
            slot2: <span style={{ fontSize: "14px", color: "#3b82f6" }}>$19/mo</span>,
          },
          {
            label: "Enterprise",
            subLabel: "Custom solutions for large teams",
            slot1: <Building size={16} />,
            slot2: <span style={{ fontSize: "14px", color: "#8b5cf6" }}>Custom</span>,
          },
        ],
      },
      {
        label: "Billing",
        showSeparator: true,
        items: [
          {
            label: "Payment Methods",
            subLabel: "Manage your payment options",
            slot1: <CreditCard size={16} />,
          },
          {
            label: "Billing History",
            subLabel: "View past invoices",
            slot1: <FileText size={16} />,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
            text="Plans & Billing"
            trailingIcon={<ChevronDown size={16} />}
          />
        }
        items={items}
        minWidth={280}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Menu items with sub-labels for additional context and information.",
      },
    },
  },
};

// With multiple slots
export const WithMultipleSlots: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        label: "Team Members",
        items: [
          {
            label: "John Doe",
            subLabel: "john@example.com",
            slot1: (
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
              }}>
                JD
              </div>
            ),
            slot2: <span style={{ fontSize: "12px", color: "#22c55e" }}>Active</span>,
            slot3: <ChevronRight size={16} color="#999" />,
          },
          {
            label: "Jane Smith",
            subLabel: "jane@example.com",
            slot1: (
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#8b5cf6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
              }}>
                JS
              </div>
            ),
            slot2: <span style={{ fontSize: "12px", color: "#f59e0b" }}>Away</span>,
            slot3: <ChevronRight size={16} color="#999" />,
          },
          {
            label: "Bob Johnson",
            subLabel: "bob@example.com",
            slot1: (
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
              }}>
                BJ
              </div>
            ),
            slot2: <span style={{ fontSize: "12px", color: "#6b7280" }}>Offline</span>,
            slot3: <ChevronRight size={16} color="#999" />,
            disabled: true,
          },
        ],
      },
      {
        showSeparator: true,
        items: [
          {
            label: "Invite Team Member",
            slot1: <Plus size={16} />,
            variant: MenuItemV2Variant.ACTION,
            actionType: MenuItemV2ActionType.PRIMARY,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
            text="Team"
            leadingIcon={<Users size={16} />}
            trailingIcon={<ChevronDown size={16} />}
          />
        }
        items={items}
        minWidth={300}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Menu with multiple slots for complex layouts including avatars, status indicators, and actions.",
      },
    },
  },
};

// Action variants
export const ActionVariants: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        label: "File Actions",
        items: [
          {
            label: "Save Changes",
            slot1: <Save size={16} />,
            variant: MenuItemV2Variant.ACTION,
            actionType: MenuItemV2ActionType.PRIMARY,
          },
          {
            label: "Duplicate",
            slot1: <Copy size={16} />,
          },
          {
            label: "Move to...",
            slot1: <Folder size={16} />,
          },
          {
            label: "Rename",
            slot1: <Edit size={16} />,
          },
        ],
      },
      {
        label: "Danger Zone",
        showSeparator: true,
        items: [
          {
            label: "Delete File",
            slot1: <Trash2 size={16} />,
            variant: MenuItemV2Variant.ACTION,
            actionType: MenuItemV2ActionType.DANGER,
          },
          {
            label: "Delete Permanently",
            subLabel: "This action cannot be undone",
            slot1: <Trash2 size={16} />,
            variant: MenuItemV2Variant.ACTION,
            actionType: MenuItemV2ActionType.DANGER,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
            text="File Actions"
            trailingIcon={<ChevronDown size={16} />}
          />
        }
        items={items}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Menu demonstrating primary and danger action variants for important operations.",
      },
    },
  },
};

// With disabled items
export const WithDisabledItems: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        label: "Edit",
        items: [
          {
            label: "Undo",
            subLabel: "Ctrl+Z",
            slot1: <RefreshCw size={16} />,
            disabled: true,
          },
          {
            label: "Redo",
            subLabel: "Ctrl+Y",
            slot1: <RefreshCw size={16} style={{ transform: "scaleX(-1)" }} />,
            disabled: true,
          },
          {
            label: "Cut",
            subLabel: "Ctrl+X",
            slot1: <Scissors size={16} />,
          },
          {
            label: "Copy",
            subLabel: "Ctrl+C",
            slot1: <Copy size={16} />,
          },
          {
            label: "Paste",
            subLabel: "Ctrl+V",
            slot1: <Paperclip size={16} />,
            disabled: true,
          },
        ],
      },
      {
        label: "Advanced",
        showSeparator: true,
        items: [
          {
            label: "Find & Replace",
            subLabel: "Ctrl+H",
            slot1: <Search size={16} />,
          },
          {
            label: "Go to Line",
            subLabel: "Ctrl+G",
            slot1: <Hash size={16} />,
            disabled: true,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
            text="Edit"
            trailingIcon={<ChevronDown size={16} />}
          />
        }
        items={items}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Menu with disabled items to show unavailable actions based on context.",
      },
    },
  },
};

// Positioning examples
export const PositioningExamples: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        items: [
          { label: "Option 1", slot1: <Check size={16} /> },
          { label: "Option 2", slot1: <Check size={16} /> },
          { label: "Option 3", slot1: <Check size={16} /> },
        ],
      },
    ];

    return (
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Menu
          trigger={
            <ButtonV2
              buttonType={ButtonTypeV2.SECONDARY}
              size={ButtonSizeV2.SMALL}
              text="Bottom Start"
            />
          }
          items={items}
          side={MenuSide.BOTTOM}
          alignment={MenuAlignment.START}
        />
        <Menu
          trigger={
            <ButtonV2
              buttonType={ButtonTypeV2.SECONDARY}
              size={ButtonSizeV2.SMALL}
              text="Bottom Center"
            />
          }
          items={items}
          side={MenuSide.BOTTOM}
          alignment={MenuAlignment.CENTER}
        />
        <Menu
          trigger={
            <ButtonV2
              buttonType={ButtonTypeV2.SECONDARY}
              size={ButtonSizeV2.SMALL}
              text="Bottom End"
            />
          }
          items={items}
          side={MenuSide.BOTTOM}
          alignment={MenuAlignment.END}
        />
        <Menu
          trigger={
            <ButtonV2
              buttonType={ButtonTypeV2.SECONDARY}
              size={ButtonSizeV2.SMALL}
              text="Right"
            />
          }
          items={items}
          side={MenuSide.RIGHT}
          alignment={MenuAlignment.START}
        />
        <Menu
          trigger={
            <ButtonV2
              buttonType={ButtonTypeV2.SECONDARY}
              size={ButtonSizeV2.SMALL}
              text="Left"
            />
          }
          items={items}
          side={MenuSide.LEFT}
          alignment={MenuAlignment.START}
        />
        <Menu
          trigger={
            <ButtonV2
              buttonType={ButtonTypeV2.SECONDARY}
              size={ButtonSizeV2.SMALL}
              text="Top"
            />
          }
          items={items}
          side={MenuSide.TOP}
          alignment={MenuAlignment.CENTER}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Examples of different positioning options for the menu relative to the trigger.",
      },
    },
  },
};

// Settings menu example
export const SettingsMenuExample: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        label: "Appearance",
        items: [
          {
            label: "Theme",
            subLabel: "Light",
            slot1: <Sun size={16} />,
            slot3: <ChevronRight size={16} color="#999" />,
          },
          {
            label: "Language",
            subLabel: "English",
            slot1: <Globe size={16} />,
            slot3: <ChevronRight size={16} color="#999" />,
          },
          {
            label: "Font Size",
            subLabel: "Medium",
            slot1: <Type size={16} />,
            slot3: <ChevronRight size={16} color="#999" />,
          },
        ],
      },
      {
        label: "Privacy & Security",
        showSeparator: true,
        items: [
          {
            label: "Two-Factor Authentication",
            subLabel: "Enabled",
            slot1: <Shield size={16} />,
            slot2: <Check size={14} color="#22c55e" />,
          },
          {
            label: "Password",
            subLabel: "Last changed 30 days ago",
            slot1: <Key size={16} />,
          },
          {
            label: "Privacy Settings",
            slot1: <Lock size={16} />,
            slot3: <ChevronRight size={16} color="#999" />,
          },
        ],
      },
      {
        label: "Notifications",
        showSeparator: true,
        items: [
          {
            label: "Email Notifications",
            subLabel: "All notifications",
            slot1: <Mail size={16} />,
          },
          {
            label: "Push Notifications",
            subLabel: "Important only",
            slot1: <Bell size={16} />,
          },
          {
            label: "Sound",
            subLabel: "Enabled",
            slot1: <Volume2 size={16} />,
          },
        ],
      },
      {
        showSeparator: true,
        items: [
          {
            label: "Help & Support",
            slot1: <HelpCircle size={16} />,
          },
          {
            label: "About",
            slot1: <Info size={16} />,
          },
          {
            label: "Sign Out",
            slot1: <LogOut size={16} />,
            variant: MenuItemV2Variant.ACTION,
            actionType: MenuItemV2ActionType.DANGER,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
            text="Settings"
            leadingIcon={<Settings size={16} />}
          />
        }
        items={items}
        minWidth={280}
        maxHeight={500}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "A comprehensive settings menu example with grouped items, sub-labels, and various actions.",
      },
    },
  },
};

// File browser menu
export const FileBrowserMenu: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        items: [
          {
            label: "New Folder",
            slot1: <Folder size={16} />,
            slot2: <span style={{ fontSize: "12px", color: "#666" }}>Ctrl+Shift+N</span>,
          },
          {
            label: "Upload Files",
            slot1: <Upload size={16} />,
            slot2: <span style={{ fontSize: "12px", color: "#666" }}>Ctrl+U</span>,
          },
        ],
      },
      {
        label: "Sort By",
        showSeparator: true,
        items: [
          {
            label: "Name",
            slot1: <SortAsc size={16} />,
            slot2: <Check size={14} color="#3b82f6" />,
          },
          {
            label: "Date Modified",
            slot1: <Calendar size={16} />,
          },
          {
            label: "Size",
            slot1: <Database size={16} />,
          },
          {
            label: "Type",
            slot1: <FileText size={16} />,
          },
        ],
      },
      {
        label: "View",
        showSeparator: true,
        items: [
          {
            label: "Grid",
            slot1: <Grid size={16} />,
          },
          {
            label: "List",
            slot1: <List size={16} />,
            slot2: <Check size={14} color="#3b82f6" />,
          },
          {
            label: "Details",
            slot1: <Layout size={16} />,
          },
        ],
      },
      {
        showSeparator: true,
        items: [
          {
            label: "Show Hidden Files",
            slot1: <Eye size={16} />,
            slot2: <Check size={14} color="#3b82f6" />,
          },
          {
            label: "Refresh",
            slot1: <RefreshCw size={16} />,
            slot2: <span style={{ fontSize: "12px", color: "#666" }}>F5</span>,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
            text="View Options"
            leadingIcon={<Filter size={16} />}
            trailingIcon={<ChevronDown size={16} />}
          />
        }
        items={items}
        minWidth={240}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "File browser menu with sorting, view options, and keyboard shortcuts.",
      },
    },
  },
};

// Complex example with sub-menus
export const ComplexExample: Story = {
  render: () => {
    const items: MenuV2GroupType[] = [
      {
        label: "Dashboard",
        items: [
          {
            label: "Analytics",
            slot1: <BarChart size={16} />,
            subMenu: [
              { label: "Overview", slot1: <Home size={16} /> },
              { label: "Traffic", slot1: <Users size={16} /> },
              { label: "Revenue", slot1: <DollarSign size={16} /> },
              { label: "Conversions", slot1: <TrendingUp size={16} /> },
            ],
          },
          {
            label: "Reports",
            slot1: <FileText size={16} />,
            subMenu: [
              { label: "Daily Report", slot1: <Calendar size={16} /> },
              { label: "Weekly Report", slot1: <Calendar size={16} /> },
              { label: "Monthly Report", slot1: <Calendar size={16} /> },
              { label: "Custom Report", slot1: <Filter size={16} /> },
            ],
          },
          {
            label: "Notifications",
            slot1: <Bell size={16} />,
            slot2: <span style={{ 
              background: "#ef4444", 
              color: "white", 
              borderRadius: "10px", 
              padding: "2px 6px", 
              fontSize: "11px",
              fontWeight: 500,
            }}>3</span>,
          },
        ],
      },
      {
        label: "Content",
        showSeparator: true,
        items: [
          {
            label: "Media Library",
            slot1: <Image size={16} />,
            subMenu: [
              { label: "Images", slot1: <Image size={16} />, slot2: <span style={{ fontSize: "12px", color: "#666" }}>1,234</span> },
              { label: "Videos", slot1: <Video size={16} />, slot2: <span style={{ fontSize: "12px", color: "#666" }}>56</span> },
              { label: "Documents", slot1: <FileText size={16} />, slot2: <span style={{ fontSize: "12px", color: "#666" }}>789</span> },
              { label: "Audio", slot1: <Music size={16} />, slot2: <span style={{ fontSize: "12px", color: "#666" }}>123</span> },
            ],
          },
          {
            label: "Categories",
            slot1: <Tag size={16} />,
          },
          {
            label: "Tags",
            slot1: <Hash size={16} />,
          },
        ],
      },
      {
        label: "Tools",
        showSeparator: true,
        items: [
          {
            label: "Import/Export",
            slot1: <Package size={16} />,
            subMenu: [
              { label: "Import from CSV", slot1: <Upload size={16} /> },
              { label: "Import from JSON", slot1: <Upload size={16} /> },
              { label: "Export to CSV", slot1: <Download size={16} /> },
              { label: "Export to JSON", slot1: <Download size={16} /> },
              { label: "Export to PDF", slot1: <Download size={16} /> },
            ],
          },
          {
            label: "Backup",
            slot1: <Archive size={16} />,
          },
          {
            label: "API Keys",
            slot1: <Key size={16} />,
          },
        ],
      },
      {
        showSeparator: true,
        items: [
          {
            label: "Settings",
            slot1: <Settings size={16} />,
          },
          {
            label: "Help",
            slot1: <HelpCircle size={16} />,
          },
          {
            label: "Logout",
            slot1: <LogOut size={16} />,
            variant: MenuItemV2Variant.ACTION,
            actionType: MenuItemV2ActionType.DANGER,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
            text="Dashboard Menu"
            leadingIcon={<BarChart size={16} />}
            trailingIcon={<ChevronDown size={16} />}
          />
        }
        items={items}
        minWidth={320}
        maxHeight={500}
        enableSearch
        searchPlaceholder="Search dashboard..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Complex menu example with sub-menus, notifications, and comprehensive dashboard navigation.",
      },
    },
  },
};
