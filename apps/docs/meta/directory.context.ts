import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const directoryMeta: ComponentMeta = {
  componentName: "Directory",
  componentDescription:
    "A hierarchical navigation directory component that organizes content into collapsible sections with nested navigation items, supporting icons, links, and keyboard navigation.",
  features: [
    "Hierarchical navigation structure",
    "Collapsible sections with expand/collapse",
    "Nested navigation items support",
    "Left and right slot content for items",
    "Click and link navigation support",
    "Keyboard navigation between sections",
    "Default open/closed state control",
    "Accessible design with proper ARIA",
    "Custom styling support",
    "Responsive layout",
  ],
  usageExamples: [
    {
      title: "Basic Directory",
      description: "Simple directory with sections and navigation items",
      code: `<Directory 
  directoryData={[
    {
      label: "Getting Started",
      items: [
        { label: "Installation", href: "/docs/installation" },
        { label: "Quick Start", href: "/docs/quick-start" },
        { label: "Configuration", href: "/docs/configuration" }
      ]
    },
    {
      label: "Components",
      items: [
        { label: "Button", href: "/docs/button" },
        { label: "Input", href: "/docs/input" },
        { label: "Modal", href: "/docs/modal" }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Directory with Icons and Actions",
      description: "Directory with left slot icons and right slot actions",
      code: `<Directory 
  directoryData={[
    {
      label: "Navigation",
      isCollapsible: true,
      defaultOpen: true,
      items: [
        { 
          label: "Dashboard", 
          href: "/dashboard",
          leftSlot: <DashboardIcon />,
          rightSlot: <Badge>New</Badge>
        },
        { 
          label: "Analytics", 
          href: "/analytics",
          leftSlot: <AnalyticsIcon />,
          onClick: () => handleAnalyticsClick()
        },
        { 
          label: "Settings", 
          href: "/settings",
          leftSlot: <SettingsIcon />
        }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Nested Directory Structure",
      description: "Directory with nested navigation items",
      code: `<Directory 
  directoryData={[
    {
      label: "API Reference",
      isCollapsible: true,
      items: [
        { 
          label: "Authentication",
          items: [
            { label: "Login", href: "/api/auth/login" },
            { label: "Logout", href: "/api/auth/logout" },
            { label: "Refresh Token", href: "/api/auth/refresh" }
          ]
        },
        { 
          label: "User Management",
          items: [
            { label: "Get User", href: "/api/users/get" },
            { label: "Update User", href: "/api/users/update" },
            { label: "Delete User", href: "/api/users/delete" }
          ]
        }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Custom Directory with Actions",
      description: "Directory with custom click handlers and mixed navigation",
      code: `<Directory 
  className="custom-directory"
  directoryData={[
    {
      label: "Tools",
      isCollapsible: false,
      items: [
        { 
          label: "Export Data", 
          onClick: () => handleExport(),
          leftSlot: <ExportIcon />,
          rightSlot: <ChevronRightIcon />
        },
        { 
          label: "Import Data", 
          onClick: () => handleImport(),
          leftSlot: <ImportIcon />
        },
        { 
          label: "View Reports", 
          href: "/reports",
          leftSlot: <ReportIcon />
        }
      ]
    }
  ]}
/>`,
    },
  ],
  props: [
    {
      propName: "directoryData",
      propType: "DirectoryData[]",
      typeDefinition: `type DirectoryData = {
        label?: string;
        items?: NavbarItem[];
        isCollapsible?: boolean;
        defaultOpen?: boolean;
      }`,
      propDescription:
        "Array of directory sections containing navigation items",
      llmContext: "Array of directory sections containing navigation items",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "className",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional CSS class names for the directory container",
      llmContext: "Additional CSS class names for the directory container",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "label",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Section label/title (DirectoryData property)",
      llmContext: "Section label/title (DirectoryData property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "items",
      propType: "NavbarItem[]",
      typeDefinition: `type NavbarItem = {
        label: string;
        items?: NavbarItem[];
        leftSlot?: ReactNode;
        rightSlot?: ReactNode;
        onClick?: () => void;
        href?: string;
      }`,
      propDescription:
        "Array of navigation items in the section (DirectoryData property)",
      llmContext:
        "Array of navigation items in the section (DirectoryData property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "isCollapsible",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether the section can be collapsed/expanded (DirectoryData property)",
      llmContext:
        "Whether the section can be collapsed/expanded (DirectoryData property)",
      propDefault: "true",
      category: "Behavior",
      required: false,
    },
    {
      propName: "defaultOpen",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether the section is open by default (DirectoryData property)",
      llmContext:
        "Whether the section is open by default (DirectoryData property)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "label",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "Display text for the navigation item (NavbarItem property)",
      llmContext: "Display text for the navigation item (NavbarItem property)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "leftSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "Content to display on the left side of the navigation item (NavbarItem property)",
      llmContext:
        "Content to display on the left side of the navigation item (NavbarItem property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "rightSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "Content to display on the right side of the navigation item (NavbarItem property)",
      llmContext:
        "Content to display on the right side of the navigation item (NavbarItem property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "onClick",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription:
        "Click handler for the navigation item (NavbarItem property)",
      llmContext: "Click handler for the navigation item (NavbarItem property)",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "href",
      propType: "string",
      typeDefinition: "string",
      propDescription: "URL link for the navigation item (NavbarItem property)",
      llmContext: "URL link for the navigation item (NavbarItem property)",
      propDefault: "undefined",
      category: "Navigation",
      required: false,
    },
  ],
};

export default directoryMeta;
