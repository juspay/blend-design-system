import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const breadcrumbMeta: ComponentMeta = {
  componentName: "Breadcrumb",
  componentDescription:
    "A navigation breadcrumb component that displays the current page's location within a navigational hierarchy with support for overflow handling and custom content slots.",
  features: [
    "Hierarchical navigation display",
    "Automatic overflow handling with ellipsis menu",
    "Maximum item limit (4 items) with smart truncation",
    "Left and right content slots for each item",
    "Active state indication for current page",
    "Accessible navigation structure",
    "Responsive design",
    "Custom styling support",
    "Link-based navigation",
  ],
  usageExamples: [
    {
      title: "Basic Breadcrumb",
      description: "Simple breadcrumb navigation with multiple levels",
      code: `<Breadcrumb 
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Smartphones", href: "/products/electronics/smartphones" }
  ]}
/>`,
    },
    {
      title: "Breadcrumb with Icons",
      description: "Breadcrumb items with left slot icons",
      code: `<Breadcrumb 
  items={[
    { 
      label: "Dashboard", 
      href: "/dashboard",
      leftSlot: <HomeIcon size={16} />
    },
    { 
      label: "Users", 
      href: "/dashboard/users",
      leftSlot: <UsersIcon size={16} />
    },
    { 
      label: "Profile", 
      href: "/dashboard/users/profile",
      leftSlot: <UserIcon size={16} />
    }
  ]}
/>`,
    },
    {
      title: "Breadcrumb with Custom Slots",
      description: "Breadcrumb with both left and right content slots",
      code: `<Breadcrumb 
  items={[
    { 
      label: "Projects", 
      href: "/projects",
      leftSlot: <FolderIcon size={16} />
    },
    { 
      label: "Website Redesign", 
      href: "/projects/website-redesign",
      rightSlot: <Badge variant="active">Active</Badge>
    },
    { 
      label: "Design System", 
      href: "/projects/website-redesign/design-system",
      rightSlot: <Badge variant="draft">Draft</Badge>
    }
  ]}
/>`,
    },
    {
      title: "Long Breadcrumb with Overflow",
      description: "Breadcrumb that demonstrates overflow handling",
      code: `<Breadcrumb 
  items={[
    { label: "Home", href: "/" },
    { label: "Category", href: "/category" },
    { label: "Subcategory", href: "/category/subcategory" },
    { label: "Product Type", href: "/category/subcategory/type" },
    { label: "Brand", href: "/category/subcategory/type/brand" },
    { label: "Model", href: "/category/subcategory/type/brand/model" },
    { label: "Variant", href: "/category/subcategory/type/brand/model/variant" }
  ]}
/>`,
    },
  ],
  props: [
    {
      propName: "items",
      propType: "BreadcrumbItemType[]",
      typeDefinition: `type BreadcrumbItemType = {
        leftSlot?: React.ReactNode;
        rightSlot?: React.ReactNode;
        label: string;
        href: string;
      }`,
      propDescription: "Array of breadcrumb items to display in the navigation",
      llmContext: "Array of breadcrumb items to display in the navigation",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "label",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "Display text for the breadcrumb item (BreadcrumbItemType property)",
      llmContext:
        "Display text for the breadcrumb item (BreadcrumbItemType property)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "href",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "URL link for the breadcrumb item (BreadcrumbItemType property)",
      llmContext:
        "URL link for the breadcrumb item (BreadcrumbItemType property)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "leftSlot",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription:
        "Custom content to display on the left side of the breadcrumb item (BreadcrumbItemType property)",
      llmContext:
        "Custom content to display on the left side of the breadcrumb item (BreadcrumbItemType property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "rightSlot",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription:
        "Custom content to display on the right side of the breadcrumb item (BreadcrumbItemType property)",
      llmContext:
        "Custom content to display on the right side of the breadcrumb item (BreadcrumbItemType property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
  ],
};

export default breadcrumbMeta;
