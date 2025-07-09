import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const sidebarMeta: ComponentMeta = {
  componentName: "Sidebar",
  componentDescription:
    "A navigation sidebar component for organizing hierarchical content with collapsible sections, custom styling, and responsive behavior.",
  features: [
    "Hierarchical navigation structure",
    "Collapsible sections and items",
    "Custom content slots",
    "Responsive design",
    "Active state management",
    "Icon and badge support",
    "Nested navigation items",
    "Customizable styling",
    "Accessible navigation",
    "Mobile-friendly layout",
  ],
  usageExamples: [
    {
      title: "Basic Sidebar",
      description: "Simple sidebar with navigation items",
      code: `<Sidebar>
  <SidebarSection title="Navigation">
    <SidebarItem href="/dashboard" icon={<DashboardIcon />}>
      Dashboard
    </SidebarItem>
    <SidebarItem href="/users" icon={<UsersIcon />}>
      Users
    </SidebarItem>
    <SidebarItem href="/settings" icon={<SettingsIcon />}>
      Settings
    </SidebarItem>
  </SidebarSection>
</Sidebar>`,
    },
    {
      title: "Collapsible Sidebar",
      description: "Sidebar with collapsible sections",
      code: `<Sidebar>
  <SidebarSection title="Main" collapsible defaultOpen>
    <SidebarItem href="/home">Home</SidebarItem>
    <SidebarItem href="/profile">Profile</SidebarItem>
  </SidebarSection>
  <SidebarSection title="Admin" collapsible>
    <SidebarItem href="/admin/users">User Management</SidebarItem>
    <SidebarItem href="/admin/settings">System Settings</SidebarItem>
  </SidebarSection>
</Sidebar>`,
    },
    {
      title: "Sidebar with Badges",
      description: "Sidebar items with notification badges",
      code: `<Sidebar>
  <SidebarItem 
    href="/messages" 
    icon={<MessageIcon />}
    badge={<Badge variant="danger">5</Badge>}
  >
    Messages
  </SidebarItem>
  <SidebarItem 
    href="/notifications"
    icon={<BellIcon />}
    badge={<Badge variant="info">12</Badge>}
  >
    Notifications
  </SidebarItem>
</Sidebar>`,
    },
    {
      title: "Nested Sidebar Navigation",
      description: "Sidebar with nested navigation items",
      code: `<Sidebar>
  <SidebarSection title="Products">
    <SidebarItem href="/products">All Products</SidebarItem>
    <SidebarItem href="/products/categories">
      Categories
      <SidebarItem href="/products/categories/electronics">Electronics</SidebarItem>
      <SidebarItem href="/products/categories/clothing">Clothing</SidebarItem>
    </SidebarItem>
    <SidebarItem href="/products/inventory">Inventory</SidebarItem>
  </SidebarSection>
</Sidebar>`,
    },
  ],
  props: [
    {
      propName: "children",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Sidebar sections and items to display",
      llmContext: "Sidebar sections and items to display",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "className",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional CSS class names for the sidebar",
      llmContext: "Additional CSS class names for the sidebar",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "collapsed",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the sidebar is in collapsed state",
      llmContext: "Whether the sidebar is in collapsed state",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "width",
      propType: "string | number",
      typeDefinition: "string | number",
      propDescription: "Width of the sidebar",
      llmContext: "Width of the sidebar",
      propDefault: "'280px'",
      category: "Layout",
      required: false,
    },
    {
      propName: "title",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Title for the sidebar section (SidebarSection prop)",
      llmContext: "Title for the sidebar section (SidebarSection prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "collapsible",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether the section can be collapsed (SidebarSection prop)",
      llmContext: "Whether the section can be collapsed (SidebarSection prop)",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
    {
      propName: "defaultOpen",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether the section is open by default (SidebarSection prop)",
      llmContext:
        "Whether the section is open by default (SidebarSection prop)",
      propDefault: "true",
      category: "State",
      required: false,
    },
    {
      propName: "href",
      propType: "string",
      typeDefinition: "string",
      propDescription: "URL for the sidebar item link (SidebarItem prop)",
      llmContext: "URL for the sidebar item link (SidebarItem prop)",
      propDefault: "undefined",
      category: "Navigation",
      required: false,
    },
    {
      propName: "icon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription:
        "Icon to display for the sidebar item (SidebarItem prop)",
      llmContext: "Icon to display for the sidebar item (SidebarItem prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "badge",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Badge or notification indicator (SidebarItem prop)",
      llmContext: "Badge or notification indicator (SidebarItem prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "active",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether the sidebar item is currently active (SidebarItem prop)",
      llmContext:
        "Whether the sidebar item is currently active (SidebarItem prop)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "onClick",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Click handler for the sidebar item (SidebarItem prop)",
      llmContext: "Click handler for the sidebar item (SidebarItem prop)",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
  ],
};

export default sidebarMeta;
