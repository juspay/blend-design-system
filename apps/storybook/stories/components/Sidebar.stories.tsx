import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  Sidebar,
  Button,
  ButtonType,
  ButtonSize,
  Avatar,
  AvatarSize,
  AvatarShape,
} from "blend-v1";
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  CreditCard,
  Package,
  ShoppingCart,
  Building,
  Store,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Mail,
  Bell,
  Search,
  HelpCircle,
  LogOut,
  ChevronRight,
  Plus,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Shield,
  Lock,
  Key,
  Database,
  Server,
  Cloud,
  Zap,
  Globe,
  Cpu,
  Tag,
  Truck,
  Star,
  LayoutDashboard,
  FileBarChart,
  GitBranch,
  Brain,
  AlertTriangle,
  Lightbulb,
  Code,
  ChevronDown,
  Percent,
  Share2,
  Receipt,
  Shirt,
  Tent,
  Webhook,
  UserCheck,
  UserX,
  ShieldCheck,
  AlertCircle,
  MoreVertical,
  Layers,
  FolderOpen,
  FileCode,
  GitCommit,
  GitPullRequest,
  Terminal,
  Bug,
  Rocket,
  Palette,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Wifi,
  WifiOff,
  Power,
  PowerOff,
  RefreshCcw,
  RotateCw,
  Save,
  Copy,
  Clipboard,
  Link,
  ExternalLink,
  Eye,
  EyeOff,
  Edit,
  Edit2,
  Edit3,
  Trash2,
  Archive,
  Inbox,
  Send,
  MessageCircle,
  MessageSquare,
  Phone,
  Video,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Headphones,
  Radio,
  Tv,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Camera,
  Image,
  Film,
  Music,
  FileAudio,
  FileVideo,
  FileImage,
  Folder,
  FolderPlus,
  FolderMinus,
  FolderX,
  ShoppingBag,
  Target,
  Clock,
  HardDrive,
} from "lucide-react";

// Type definitions for Directory data
interface DirectoryData {
  label?: string;
  items?: NavbarItem[];
  isCollapsible?: boolean;
  defaultOpen?: boolean;
}

interface NavbarItem {
  label: string;
  items?: NavbarItem[];
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `

A comprehensive sidebar navigation component with multi-tenant support, merchant switching, collapsible sections, and integrated directory navigation.

## Features
- Multi-tenant support with icon-based tenant switcher
- Merchant dropdown selector for multiple merchants
- Collapsible/expandable sidebar with smooth animations
- Integrated Directory component for hierarchical navigation
- Sticky header and footer sections
- Customizable topbar and footer content
- Responsive design with proper scrolling
- Support for nested navigation items
- Icon and badge support in navigation items

## Usage

\`\`\`tsx
import { Sidebar } from 'blend-v1';

const navigationData = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", leftSlot: <Home size={16} />, onClick: () => {} },
      { label: "Analytics", leftSlot: <BarChart3 size={16} />, onClick: () => {} }
    ]
  }
];

<Sidebar
  tenants={[{ label: "Tenant 1", icon: <Building size={16} /> }]}
  merchants={[{ label: "Store 1", icon: <Store size={16} /> }]}
  data={navigationData}
  topbar={<div>Search bar</div>}
  activeTenant="Tenant 1"
  activeMerchant="Store 1"
>
  <div>Main content</div>
</Sidebar>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    tenants: {
      control: "object",
      description: "Array of tenant objects with label and icon",
    },
    merchants: {
      control: "object",
      description: "Array of merchant objects with label and icon",
    },
    data: {
      control: "object",
      description: "Directory navigation data structure",
    },
    topbar: {
      control: false,
      description: "Content to display in the topbar",
    },
    activeTenant: {
      control: "text",
      description: "Currently active tenant",
    },
    activeMerchant: {
      control: "text",
      description: "Currently active merchant",
    },
    footer: {
      control: false,
      description: "Content to display in the sidebar footer",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Helper function to create sample content
const SampleContent = ({ title }: { title: string }) => (
  <div style={{ padding: "32px" }}>
    <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "16px" }}>{title}</h1>
    <div style={{ display: "grid", gap: "16px" }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            padding: "16px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>
            Section {i}
          </h3>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      ))}
    </div>
  </div>
);

// Default story
export const Default: Story = {
  render: () => {
    const [activeTenant, setActiveTenant] = useState("Retail Corp");
    const [activeMerchant, setActiveMerchant] = useState("Downtown Store");

    const navigationData: DirectoryData[] = [
      {
        label: "Main",
        items: [
          {
            label: "Dashboard",
            leftSlot: <Home size={16} />,
            onClick: () => console.log("Dashboard clicked"),
          },
          {
            label: "Analytics",
            leftSlot: <BarChart3 size={16} />,
            rightSlot: <ChevronRight size={16} />,
            onClick: () => console.log("Analytics clicked"),
          },
          {
            label: "Reports",
            leftSlot: <FileText size={16} />,
            onClick: () => console.log("Reports clicked"),
          },
        ],
      },
      {
        label: "Commerce",
        items: [
          {
            label: "Products",
            leftSlot: <Package size={16} />,
            onClick: () => console.log("Products clicked"),
          },
          {
            label: "Orders",
            leftSlot: <ShoppingCart size={16} />,
            rightSlot: (
              <span style={{
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "10px",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: 500,
              }}>
                12
              </span>
            ),
            onClick: () => console.log("Orders clicked"),
          },
          {
            label: "Customers",
            leftSlot: <Users size={16} />,
            onClick: () => console.log("Customers clicked"),
          },
        ],
      },
      {
        label: "Settings",
        items: [
          {
            label: "General",
            leftSlot: <Settings size={16} />,
            onClick: () => console.log("General settings clicked"),
          },
          {
            label: "Billing",
            leftSlot: <CreditCard size={16} />,
            onClick: () => console.log("Billing clicked"),
          },
        ],
      },
    ];

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar
          tenants={[
            { label: "Retail Corp", icon: <Building size={16} color="#3b82f6" /> },
            { label: "Tech Inc", icon: <Cpu size={16} color="#8b5cf6" /> },
            { label: "Finance Ltd", icon: <DollarSign size={16} color="#10b981" /> },
          ]}
          merchants={[
            { label: "Downtown Store", icon: <Store size={16} /> },
            { label: "Mall Location", icon: <ShoppingBag size={16} /> },
            { label: "Online Shop", icon: <Globe size={16} /> },
          ]}
          data={navigationData}
          topbar={
            <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
              <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
              }}>
                <Search size={16} color="#6b7280" />
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                />
              </div>
              <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={Bell}
              />
              <Avatar
                src="https://i.pravatar.cc/150?img=1"
                alt="User"
                size={AvatarSize.SM}
                shape={AvatarShape.ROUNDED}
              />
            </div>
          }
          activeTenant={activeTenant}
          setActiveTenant={setActiveTenant}
          activeMerchant={activeMerchant}
          setActiveMerchant={setActiveMerchant}
          footer={
            <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
              <Avatar
                src="https://i.pravatar.cc/150?img=1"
                alt="John Doe"
                size={AvatarSize.SM}
                shape={AvatarShape.CIRCULAR}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>John Doe</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>john@example.com</div>
              </div>
              <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={LogOut}
              />
            </div>
          }
        >
          <SampleContent title="Dashboard" />
        </Sidebar>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default sidebar with multi-tenant support, merchant switching, and navigation sections.",
      },
    },
  },
};

// E-commerce example
export const EcommerceExample: Story = {
  render: () => {
    const [activeTenant, setActiveTenant] = useState("Fashion Brand");
    const [activeMerchant, setActiveMerchant] = useState("Flagship Store");

    const navigationData: DirectoryData[] = [
      {
        label: "Overview",
        items: [
          {
            label: "Dashboard",
            leftSlot: <Home size={16} />,
            onClick: () => {},
          },
          {
            label: "Sales Analytics",
            leftSlot: <TrendingUp size={16} />,
            onClick: () => {},
          },
          {
            label: "Live View",
            leftSlot: <Activity size={16} />,
            rightSlot: (
              <span style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                animation: "pulse 2s infinite",
              }} />
            ),
            onClick: () => {},
          },
        ],
      },
      {
        label: "Catalog",
        items: [
          {
            label: "Products",
            leftSlot: <Package size={16} />,
            items: [
              { label: "All Products", onClick: () => {} },
              { label: "Categories", onClick: () => {} },
              { label: "Collections", onClick: () => {} },
              { label: "Inventory", onClick: () => {} },
            ],
          },
          {
            label: "Pricing",
            leftSlot: <Tag size={16} />,
            onClick: () => {},
          },
          {
            label: "Discounts",
            leftSlot: <Percent size={16} />,
            rightSlot: (
              <span style={{
                backgroundColor: "#f59e0b",
                color: "white",
                borderRadius: "10px",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: 500,
              }}>
                3 Active
              </span>
            ),
            onClick: () => {},
          },
        ],
      },
      {
        label: "Orders",
        items: [
          {
            label: "All Orders",
            leftSlot: <ShoppingCart size={16} />,
            rightSlot: (
              <span style={{
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "10px",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: 500,
              }}>
                24 New
              </span>
            ),
            onClick: () => {},
          },
          {
            label: "Fulfillment",
            leftSlot: <Truck size={16} />,
            onClick: () => {},
          },
          {
            label: "Returns",
            leftSlot: <Package size={16} />,
            onClick: () => {},
          },
          {
            label: "Abandoned Carts",
            leftSlot: <ShoppingCart size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Customers",
        items: [
          {
            label: "All Customers",
            leftSlot: <Users size={16} />,
            onClick: () => {},
          },
          {
            label: "Segments",
            leftSlot: <Filter size={16} />,
            onClick: () => {},
          },
          {
            label: "Reviews",
            leftSlot: <Star size={16} />,
            rightSlot: (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>4.8</span>
            ),
            onClick: () => {},
          },
        ],
      },
      {
        label: "Marketing",
        items: [
          {
            label: "Campaigns",
            leftSlot: <Zap size={16} />,
            onClick: () => {},
          },
          {
            label: "Email Marketing",
            leftSlot: <Mail size={16} />,
            onClick: () => {},
          },
          {
            label: "Social Media",
            leftSlot: <Share2 size={16} />,
            onClick: () => {},
          },
          {
            label: "SEO",
            leftSlot: <Search size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Settings",
        isCollapsible: true,
        defaultOpen: false,
        items: [
          {
            label: "Store Settings",
            leftSlot: <Store size={16} />,
            onClick: () => {},
          },
          {
            label: "Payment Methods",
            leftSlot: <CreditCard size={16} />,
            onClick: () => {},
          },
          {
            label: "Shipping",
            leftSlot: <Truck size={16} />,
            onClick: () => {},
          },
          {
            label: "Taxes",
            leftSlot: <Receipt size={16} />,
            onClick: () => {},
          },
          {
            label: "Notifications",
            leftSlot: <Bell size={16} />,
            onClick: () => {},
          },
          {
            label: "Staff",
            leftSlot: <Users size={16} />,
            onClick: () => {},
          },
        ],
      },
    ];

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar
          tenants={[
            { label: "Fashion Brand", icon: <Shirt size={16} color="#ec4899" /> },
            { label: "Electronics", icon: <Smartphone size={16} color="#3b82f6" /> },
            { label: "Home & Living", icon: <Home size={16} color="#10b981" /> },
          ]}
          merchants={[
            { label: "Flagship Store", icon: <Store size={16} /> },
            { label: "Outlet Store", icon: <ShoppingBag size={16} /> },
            { label: "Pop-up Shop", icon: <Tent size={16} /> },
            { label: "Online Only", icon: <Globe size={16} /> },
          ]}
          data={navigationData}
          topbar={
            <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
              <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
              }}>
                <Search size={16} color="#6b7280" />
                <input
                  type="text"
                  placeholder="Search products, orders, customers..."
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                />
              </div>
              <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                leadingIcon={Plus}
                text="New Product"
              />
              <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={Bell}
              />
              <Avatar
                src="https://i.pravatar.cc/150?img=5"
                alt="User"
                size={AvatarSize.SM}
                shape={AvatarShape.CIRCULAR}
              />
            </div>
          }
          activeTenant={activeTenant}
          setActiveTenant={setActiveTenant}
          activeMerchant={activeMerchant}
          setActiveMerchant={setActiveMerchant}
          footer={
            <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
              <Avatar
                src="https://i.pravatar.cc/150?img=5"
                alt="Sarah Johnson"
                size={AvatarSize.SM}
                shape={AvatarShape.CIRCULAR}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>Sarah Johnson</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Store Manager</div>
              </div>
              <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={Settings}
              />
            </div>
          }
        >
          <SampleContent title="E-commerce Dashboard" />
        </Sidebar>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "E-commerce platform sidebar with product catalog, orders, customers, and marketing sections.",
      },
    },
  },
};

// Analytics dashboard
export const AnalyticsDashboard: Story = {
  render: () => {
    const [activeTenant, setActiveTenant] = useState("Data Corp");
    const [activeMerchant, setActiveMerchant] = useState("Main Dashboard");

    const navigationData: DirectoryData[] = [
      {
        label: "Dashboards",
        items: [
          {
            label: "Overview",
            leftSlot: <LayoutDashboard size={16} />,
            onClick: () => {},
          },
          {
            label: "Real-time",
            leftSlot: <Activity size={16} />,
            rightSlot: (
              <span style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                animation: "pulse 2s infinite",
              }} />
            ),
            onClick: () => {},
          },
          {
            label: "Custom Reports",
            leftSlot: <FileBarChart size={16} />,
            items: [
              { label: "Sales Report", onClick: () => {} },
              { label: "User Analytics", onClick: () => {} },
              { label: "Performance Metrics", onClick: () => {} },
              { label: "Conversion Funnel", onClick: () => {} },
            ],
          },
        ],
      },
      {
        label: "Analytics",
        items: [
          {
            label: "Traffic Sources",
            leftSlot: <Globe size={16} />,
            onClick: () => {},
          },
          {
            label: "User Behavior",
            leftSlot: <Users size={16} />,
            onClick: () => {},
          },
          {
            label: "Conversions",
            leftSlot: <Target size={16} />,
            rightSlot: <TrendingUp size={14} color="#10b981" />,
            onClick: () => {},
          },
          {
            label: "Revenue",
            leftSlot: <DollarSign size={16} />,
            rightSlot: <TrendingUp size={14} color="#10b981" />,
            onClick: () => {},
          },
          {
            label: "A/B Testing",
            leftSlot: <GitBranch size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Data Sources",
        items: [
          {
            label: "Databases",
            leftSlot: <Database size={16} />,
            rightSlot: (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>12</span>
            ),
            onClick: () => {},
          },
          {
            label: "APIs",
            leftSlot: <Cloud size={16} />,
            rightSlot: (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>8</span>
            ),
            onClick: () => {},
          },
          {
            label: "File Uploads",
            leftSlot: <Upload size={16} />,
            onClick: () => {},
          },
          {
            label: "Webhooks",
            leftSlot: <Webhook size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Insights",
        items: [
          {
            label: "AI Predictions",
            leftSlot: <Brain size={16} />,
            rightSlot: (
              <span style={{
                backgroundColor: "#8b5cf6",
                color: "white",
                borderRadius: "10px",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: 500,
              }}>
                Beta
              </span>
            ),
            onClick: () => {},
          },
          {
            label: "Anomaly Detection",
            leftSlot: <AlertTriangle size={16} />,
            onClick: () => {},
          },
          {
            label: "Forecasting",
            leftSlot: <TrendingUp size={16} />,
            onClick: () => {},
          },
          {
            label: "Recommendations",
            leftSlot: <Lightbulb size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Tools",
        items: [
          {
            label: "Query Builder",
            leftSlot: <Code size={16} />,
            onClick: () => {},
          },
          {
            label: "Data Explorer",
            leftSlot: <Search size={16} />,
            onClick: () => {},
          },
          {
            label: "Visualization",
            leftSlot: <BarChart3 size={16} />,
            onClick: () => {},
          },
          {
            label: "Export Center",
            leftSlot: <Download size={16} />,
            onClick: () => {},
          },
        ],
      },
    ];

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar
          tenants={[
            { label: "Data Corp", icon: <Database size={16} color="#3b82f6" /> },
            { label: "Analytics Pro", icon: <BarChart3 size={16} color="#8b5cf6" /> },
            { label: "Insights Hub", icon: <Brain size={16} color="#f59e0b" /> },
          ]}
          merchants={[
            { label: "Main Dashboard", icon: <LayoutDashboard size={16} /> },
            { label: "Marketing Analytics", icon: <TrendingUp size={16} /> },
            { label: "Sales Metrics", icon: <DollarSign size={16} /> },
            { label: "User Analytics", icon: <Users size={16} /> },
          ]}
          data={navigationData}
          topbar={
            <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
              }}>
                <Calendar size={16} color="#6b7280" />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Last 30 days</span>
                <ChevronDown size={16} color="#6b7280" />
              </div>
              <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
              }}>
                <Search size={16} color="#6b7280" />
                <input
                  type="text"
                  placeholder="Search metrics, reports, insights..."
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                />
              </div>
              <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={RefreshCw}
              />
              <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                leadingIcon={Download}
                text="Export"
              />
            </div>
          }
          activeTenant={activeTenant}
          setActiveTenant={setActiveTenant}
          activeMerchant={activeMerchant}
          setActiveMerchant={setActiveMerchant}
          footer={
            <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
              <div style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
              }} />
              <span style={{ fontSize: "12px", color: "#6b7280" }}>
                Connected to 12 data sources
              </span>
              <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={HelpCircle}
              />
            </div>
          }
        >
          <SampleContent title="Analytics Overview" />
        </Sidebar>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Analytics dashboard sidebar with data sources, insights, and visualization tools.",
      },
    },
  },
};

// Admin panel
export const AdminPanel: Story = {
  render: () => {
    const [activeTenant, setActiveTenant] = useState("Enterprise");
    const [activeMerchant, setActiveMerchant] = useState("Main Office");

    const navigationData: DirectoryData[] = [
      {
        label: "Administration",
        items: [
          {
            label: "Dashboard",
            leftSlot: <LayoutDashboard size={16} />,
            onClick: () => {},
          },
          {
            label: "System Health",
            leftSlot: <Activity size={16} />,
            rightSlot: (
              <span style={{
                backgroundColor: "#10b981",
                color: "white",
                borderRadius: "10px",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: 500,
              }}>
                Healthy
              </span>
            ),
            onClick: () => {},
          },
          {
            label: "Audit Logs",
            leftSlot: <FileText size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "User Management",
        items: [
          {
            label: "Users",
            leftSlot: <Users size={16} />,
            rightSlot: (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>1,234</span>
            ),
            items: [
              { label: "All Users", onClick: () => {} },
              { label: "Active Users", onClick: () => {} },
              { label: "Pending Invites", onClick: () => {} },
              { label: "Deactivated", onClick: () => {} },
            ],
          },
          {
            label: "Roles & Permissions",
            leftSlot: <Shield size={16} />,
            onClick: () => {},
          },
          {
            label: "Teams",
            leftSlot: <Users size={16} />,
            onClick: () => {},
          },
          {
            label: "Access Control",
            leftSlot: <Lock size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Security",
        items: [
          {
            label: "Security Settings",
            leftSlot: <Shield size={16} />,
            onClick: () => {},
          },
          {
            label: "API Keys",
            leftSlot: <Key size={16} />,
            rightSlot: (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>8</span>
            ),
            onClick: () => {},
          },
          {
            label: "Two-Factor Auth",
            leftSlot: <Smartphone size={16} />,
            onClick: () => {},
          },
          {
            label: "Session Management",
            leftSlot: <Clock size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Infrastructure",
        items: [
          {
            label: "Servers",
            leftSlot: <Server size={16} />,
            rightSlot: (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>12</span>
            ),
            onClick: () => {},
          },
          {
            label: "Databases",
            leftSlot: <Database size={16} />,
            rightSlot: (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>4</span>
            ),
            onClick: () => {},
          },
          {
            label: "Storage",
            leftSlot: <HardDrive size={16} />,
            onClick: () => {},
          },
          {
            label: "Network",
            leftSlot: <Wifi size={16} />,
            onClick: () => {},
          },
          {
            label: "Backups",
            leftSlot: <Save size={16} />,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Settings",
        items: [
          {
            label: "General Settings",
            leftSlot: <Settings size={16} />,
            onClick: () => {},
          },
          {
            label: "Email Templates",
            leftSlot: <Mail size={16} />,
            onClick: () => {},
          },
          {
            label: "Integrations",
            leftSlot: <Layers size={16} />,
            onClick: () => {},
          },
          {
            label: "Webhooks",
            leftSlot: <Webhook size={16} />,
            onClick: () => {},
          },
          {
            label: "API Documentation",
            leftSlot: <FileCode size={16} />,
            onClick: () => {},
          },
        ],
      },
    ];

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar
          tenants={[
            { label: "Enterprise", icon: <Building size={16} color="#3b82f6" /> },
            { label: "Cloud Platform", icon: <Cloud size={16} color="#8b5cf6" /> },
            { label: "Security Hub", icon: <Shield size={16} color="#ef4444" /> },
          ]}
          merchants={[
            { label: "Main Office", icon: <Building size={16} /> },
            { label: "Regional Office", icon: <Globe size={16} /> },
            { label: "Remote Teams", icon: <Wifi size={16} /> },
          ]}
          data={navigationData}
          topbar={
            <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
              <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
              }}>
                <Search size={16} color="#6b7280" />
                <input
                  type="text"
                  placeholder="Search users, settings, logs..."
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                />
              </div>
              <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={AlertCircle}
                text="3 Alerts"
              />
              <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                leadingIcon={UserCheck}
                text="Add User"
              />
              <Avatar
                src="https://i.pravatar.cc/150?img=8"
                alt="Admin"
                size={AvatarSize.SM}
                shape={AvatarShape.ROUNDED}
              />
            </div>
          }
          activeTenant={activeTenant}
          setActiveTenant={setActiveTenant}
          activeMerchant={activeMerchant}
          setActiveMerchant={setActiveMerchant}
          footer={
            <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
              <Avatar
                src="https://i.pravatar.cc/150?img=8"
                alt="Admin User"
                size={AvatarSize.SM}
                shape={AvatarShape.ROUNDED}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>Admin User</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Super Admin</div>
              </div>
              <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={Settings}
              />
            </div>
          }
        >
          <SampleContent title="Admin Dashboard" />
        </Sidebar>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Admin panel sidebar with user management, security settings, and infrastructure monitoring.",
      },
    },
  },
};
