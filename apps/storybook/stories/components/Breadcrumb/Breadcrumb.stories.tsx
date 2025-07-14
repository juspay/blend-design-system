import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Breadcrumb, BreadcrumbItemType } from "blend-v1";
import {
  Home,
  Users,
  User,
  Folder,
  FolderOpen,
  Settings,
  ShoppingCart,
  Package,
  FileText,
  Database,
  BarChart3,
  Shield,
  Layers,
  Globe,
  ChevronRight,
} from "lucide-react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A navigation breadcrumb component that displays the current page's location within a navigational hierarchy with support for overflow handling and custom content slots.

## Features
- Hierarchical navigation display
- Automatic overflow handling with ellipsis menu
- Maximum item limit (4 items) with smart truncation
- Left and right content slots for each item
- Active state indication for current page
- Accessible navigation structure
- Responsive design
- Custom styling support
- Link-based navigation

## Usage

\`\`\`tsx
import { Breadcrumb, BreadcrumbItemType } from 'blend-v1';

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones", href: "/products/electronics/smartphones" }
];

<Breadcrumb items={breadcrumbItems} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of breadcrumb items to display in the navigation",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Default story
export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Current Page", href: "/products/electronics/smartphones" },
    ],
  },
};

// Simple breadcrumb
export const SimpleBreadcrumb: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Two levels:
        </h4>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Three levels:
        </h4>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Settings", href: "/settings" },
            { label: "Profile", href: "/settings/profile" },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Four levels:
        </h4>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Electronics", href: "/products/electronics" },
            { label: "Smartphones", href: "/products/electronics/smartphones" },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Simple breadcrumb navigation with different hierarchy levels. The last item is automatically marked as active (current page).",
      },
    },
  },
};

// Breadcrumb with icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Dashboard navigation:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Dashboard",
              href: "/dashboard",
              leftSlot: <Home size={16} />,
            },
            {
              label: "Users",
              href: "/dashboard/users",
              leftSlot: <Users size={16} />,
            },
            {
              label: "Profile",
              href: "/dashboard/users/profile",
              leftSlot: <User size={16} />,
            },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          File system navigation:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Projects",
              href: "/projects",
              leftSlot: <FolderOpen size={16} />,
            },
            {
              label: "Website",
              href: "/projects/website",
              leftSlot: <Folder size={16} />,
            },
            {
              label: "Components",
              href: "/projects/website/components",
              leftSlot: <Layers size={16} />,
            },
            {
              label: "Button.tsx",
              href: "/projects/website/components/button",
              leftSlot: <FileText size={16} />,
            },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          E-commerce navigation:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Store",
              href: "/store",
              leftSlot: <Globe size={16} />,
            },
            {
              label: "Cart",
              href: "/store/cart",
              leftSlot: <ShoppingCart size={16} />,
            },
            {
              label: "Checkout",
              href: "/store/cart/checkout",
              leftSlot: <Package size={16} />,
            },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb navigation with icons in the left slot for better visual context and hierarchy understanding.",
      },
    },
  },
};

// Breadcrumb with badges and status
export const WithBadgesAndStatus: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Project status:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Projects",
              href: "/projects",
              leftSlot: <Folder size={16} />,
            },
            {
              label: "Website Redesign",
              href: "/projects/website-redesign",
              leftSlot: <Globe size={16} />,
              rightSlot: (
                <span
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  Active
                </span>
              ),
            },
            {
              label: "Design System",
              href: "/projects/website-redesign/design-system",
              leftSlot: <Layers size={16} />,
              rightSlot: (
                <span
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  Draft
                </span>
              ),
            },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Admin navigation with permissions:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Admin",
              href: "/admin",
              leftSlot: <Shield size={16} />,
              rightSlot: (
                <span
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  Restricted
                </span>
              ),
            },
            {
              label: "Analytics",
              href: "/admin/analytics",
              leftSlot: <BarChart3 size={16} />,
            },
            {
              label: "Reports",
              href: "/admin/analytics/reports",
              leftSlot: <FileText size={16} />,
              rightSlot: (
                <span
                  style={{
                    backgroundColor: "#6b7280",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  PDF
                </span>
              ),
            },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Database navigation with counts:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Database",
              href: "/database",
              leftSlot: <Database size={16} />,
            },
            {
              label: "Users",
              href: "/database/users",
              leftSlot: <Users size={16} />,
              rightSlot: (
                <span
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  1,247
                </span>
              ),
            },
            {
              label: "Active Users",
              href: "/database/users/active",
              leftSlot: <User size={16} />,
              rightSlot: (
                <span
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  834
                </span>
              ),
            },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb navigation with badges and status indicators in the right slot for additional context and information.",
      },
    },
  },
};

// Breadcrumb overflow handling
export const OverflowHandling: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Exactly 4 items (no overflow):
        </h4>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Category", href: "/category" },
            { label: "Subcategory", href: "/category/subcategory" },
            { label: "Product", href: "/category/subcategory/product" },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          5 items (shows ellipsis):
        </h4>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Category", href: "/category" },
            { label: "Subcategory", href: "/category/subcategory" },
            { label: "Product Type", href: "/category/subcategory/type" },
            {
              label: "Specific Product",
              href: "/category/subcategory/type/product",
            },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          7 items (multiple hidden items):
        </h4>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Category", href: "/category" },
            { label: "Subcategory", href: "/category/subcategory" },
            { label: "Product Type", href: "/category/subcategory/type" },
            { label: "Brand", href: "/category/subcategory/type/brand" },
            { label: "Model", href: "/category/subcategory/type/brand/model" },
            {
              label: "Variant",
              href: "/category/subcategory/type/brand/model/variant",
            },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Deep navigation with icons:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Root",
              href: "/",
              leftSlot: <Home size={16} />,
            },
            {
              label: "Projects",
              href: "/projects",
              leftSlot: <FolderOpen size={16} />,
            },
            {
              label: "Web App",
              href: "/projects/webapp",
              leftSlot: <Globe size={16} />,
            },
            {
              label: "Frontend",
              href: "/projects/webapp/frontend",
              leftSlot: <Layers size={16} />,
            },
            {
              label: "Components",
              href: "/projects/webapp/frontend/components",
              leftSlot: <Package size={16} />,
            },
            {
              label: "Forms",
              href: "/projects/webapp/frontend/components/forms",
              leftSlot: <FileText size={16} />,
            },
            {
              label: "LoginForm.tsx",
              href: "/projects/webapp/frontend/components/forms/login",
              leftSlot: <User size={16} />,
            },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of automatic overflow handling. When more than 4 items are present, the component shows an ellipsis button and truncates middle items.",
      },
    },
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3
          style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}
        >
          E-commerce Store
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Breadcrumb
            items={[
              {
                label: "Store",
                href: "/store",
                leftSlot: <Home size={16} />,
              },
              {
                label: "Electronics",
                href: "/store/electronics",
                leftSlot: <Package size={16} />,
              },
              {
                label: "Smartphones",
                href: "/store/electronics/smartphones",
                leftSlot: <Globe size={16} />,
              },
              {
                label: "iPhone 15 Pro",
                href: "/store/electronics/smartphones/iphone-15-pro",
                rightSlot: (
                  <span
                    style={{
                      backgroundColor: "#10b981",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "500",
                    }}
                  >
                    In Stock
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div>
        <h3
          style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}
        >
          Documentation Site
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Breadcrumb
            items={[
              {
                label: "Docs",
                href: "/docs",
                leftSlot: <FileText size={16} />,
              },
              {
                label: "Components",
                href: "/docs/components",
                leftSlot: <Layers size={16} />,
              },
              {
                label: "Form Controls",
                href: "/docs/components/forms",
                leftSlot: <Package size={16} />,
              },
              {
                label: "Button",
                href: "/docs/components/forms/button",
                rightSlot: (
                  <span
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "500",
                    }}
                  >
                    v2.1
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div>
        <h3
          style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}
        >
          Admin Dashboard
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Breadcrumb
            items={[
              {
                label: "Admin",
                href: "/admin",
                leftSlot: <Shield size={16} />,
                rightSlot: (
                  <span
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "500",
                    }}
                  >
                    Secure
                  </span>
                ),
              },
              {
                label: "User Management",
                href: "/admin/users",
                leftSlot: <Users size={16} />,
              },
              {
                label: "Permissions",
                href: "/admin/users/permissions",
                leftSlot: <Settings size={16} />,
              },
              {
                label: "Role Editor",
                href: "/admin/users/permissions/roles",
                rightSlot: (
                  <span
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "500",
                    }}
                  >
                    Beta
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div>
        <h3
          style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}
        >
          File Management System
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Breadcrumb
            items={[
              {
                label: "My Files",
                href: "/files",
                leftSlot: <Home size={16} />,
              },
              {
                label: "Documents",
                href: "/files/documents",
                leftSlot: <FolderOpen size={16} />,
                rightSlot: (
                  <span
                    style={{
                      backgroundColor: "#6b7280",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "500",
                    }}
                  >
                    47 files
                  </span>
                ),
              },
              {
                label: "Projects",
                href: "/files/documents/projects",
                leftSlot: <Folder size={16} />,
              },
              {
                label: "Design System",
                href: "/files/documents/projects/design-system",
                leftSlot: <Layers size={16} />,
              },
              {
                label: "Components",
                href: "/files/documents/projects/design-system/components",
                leftSlot: <Package size={16} />,
              },
              {
                label: "Breadcrumb.md",
                href: "/files/documents/projects/design-system/components/breadcrumb",
                leftSlot: <FileText size={16} />,
                rightSlot: (
                  <span
                    style={{
                      backgroundColor: "#10b981",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "500",
                    }}
                  >
                    Updated
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world breadcrumb examples for different types of applications: e-commerce, documentation, admin dashboards, and file management.",
      },
    },
  },
};

// Single item breadcrumb
export const SingleItem: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Simple single item:
        </h4>
        <Breadcrumb items={[{ label: "Home", href: "/" }]} />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Single item with icon:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Dashboard",
              href: "/dashboard",
              leftSlot: <Home size={16} />,
            },
          ]}
        />
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500" }}
        >
          Single item with icon and badge:
        </h4>
        <Breadcrumb
          items={[
            {
              label: "Admin Panel",
              href: "/admin",
              leftSlot: <Shield size={16} />,
              rightSlot: (
                <span
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  Restricted
                </span>
              ),
            },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Single item breadcrumbs for root pages or simple navigation contexts. The single item is automatically marked as active.",
      },
    },
  },
};
