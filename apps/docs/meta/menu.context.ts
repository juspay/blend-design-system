import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const menuMeta: ComponentMeta = {
  componentName: "Menu",
  componentDescription:
    "A versatile dropdown menu component with support for grouped items, submenus, search functionality, and customizable positioning for creating rich contextual menus.",
  features: [
    "Grouped menu items with labels",
    "Submenu support for nested navigation",
    "Search functionality with filtering",
    "Multiple item variants (default, action)",
    "Action types (primary, danger)",
    "Custom slot content (up to 4 slots per item)",
    "Flexible positioning and alignment",
    "Controlled and uncontrolled modes",
    "Collision boundary detection",
    "Modal mode support",
    "Accessible keyboard navigation",
  ],
  usageExamples: [
    {
      title: "Basic Menu",
      description: "Simple menu with grouped items",
      code: `<Menu 
  trigger={<Button text="Actions" />}
  items={[
    {
      label: "File Operations",
      items: [
        { label: "New File", onClick: () => createFile() },
        { label: "Open File", onClick: () => openFile() },
        { label: "Save File", onClick: () => saveFile() }
      ]
    },
    {
      items: [
        { 
          label: "Delete", 
          variant: MenuItemV2Variant.ACTION,
          actionType: MenuItemV2ActionType.DANGER,
          onClick: () => deleteFile()
        }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Menu with Search",
      description: "Menu with search functionality enabled",
      code: `<Menu 
  trigger={<Button text="Select User" />}
  enableSearch={true}
  searchPlaceholder="Search users..."
  items={[
    {
      label: "Team Members",
      items: [
        { 
          label: "John Doe", 
          subLabel: "john@example.com",
          slot1: <Avatar src="/john.jpg" size="sm" />
        },
        { 
          label: "Jane Smith", 
          subLabel: "jane@example.com",
          slot1: <Avatar src="/jane.jpg" size="sm" />
        }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Menu with Submenus",
      description: "Menu with nested submenu items",
      code: `<Menu 
  trigger={<Button text="More Options" />}
  items={[
    {
      items: [
        { 
          label: "Export",
          slot1: <ExportIcon />,
          subMenu: [
            { label: "Export as PDF", onClick: () => exportPDF() },
            { label: "Export as CSV", onClick: () => exportCSV() },
            { label: "Export as JSON", onClick: () => exportJSON() }
          ]
        },
        { 
          label: "Share",
          slot1: <ShareIcon />,
          subMenu: [
            { label: "Copy Link", onClick: () => copyLink() },
            { label: "Email", onClick: () => shareEmail() },
            { label: "Social Media", onClick: () => shareSocial() }
          ]
        }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Controlled Menu with Custom Positioning",
      description: "Menu with controlled state and custom positioning",
      code: `const [isOpen, setIsOpen] = useState(false);

<Menu 
  trigger={<Button text="Settings" />}
  open={isOpen}
  onOpenChange={setIsOpen}
  side={MenuSide.LEFT}
  alignment={MenuAlignment.START}
  sideOffset={10}
  maxWidth={300}
  items={[
    {
      label: "Preferences",
      items: [
        { 
          label: "Theme", 
          subLabel: "Dark mode enabled",
          slot1: <ThemeIcon />,
          slot4: <ChevronRightIcon />
        },
        { 
          label: "Notifications", 
          slot1: <NotificationIcon />,
          slot4: <Switch checked={true} />
        }
      ]
    }
  ]}
/>`,
    },
  ],
  props: [
    {
      propName: "trigger",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "The trigger element that opens the menu when clicked",
      llmContext: "The trigger element that opens the menu when clicked",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "items",
      propType: "MenuV2GroupType[]",
      typeDefinition: `type MenuV2GroupType = {
        label?: string;
        items: MenuItemV2Type[];
        showSeparator?: boolean;
      }`,
      propDescription: "Array of menu groups containing menu items",
      llmContext: "Array of menu groups containing menu items",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "enableSearch",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to enable search functionality in the menu",
      llmContext: "Whether to enable search functionality in the menu",
      propDefault: "false",
      category: "Features",
      required: false,
    },
    {
      propName: "searchPlaceholder",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Placeholder text for the search input",
      llmContext: "Placeholder text for the search input",
      propDefault: "'Search...'",
      category: "Content",
      required: false,
    },
    {
      propName: "open",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Controlled open state of the menu",
      llmContext: "Controlled open state of the menu",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "onOpenChange",
      propType: "(open: boolean) => void",
      typeDefinition: "(open: boolean) => void",
      propDescription: "Callback fired when the menu open state changes",
      llmContext: "Callback fired when the menu open state changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "alignment",
      propType: "MenuAlignment",
      typeDefinition: `enum MenuAlignment {
        START = "start",
        CENTER = "center",
        END = "end",
      }`,
      propDescription: "Alignment of the menu relative to the trigger",
      llmContext: "Alignment of the menu relative to the trigger",
      propDefault: "MenuAlignment.CENTER",
      category: "Layout",
      required: false,
    },
    {
      propName: "side",
      propType: "MenuSide",
      typeDefinition: `enum MenuSide {
        TOP = "top",
        LEFT = "left",
        RIGHT = "right",
        BOTTOM = "bottom",
      }`,
      propDescription:
        "Side where the menu should appear relative to the trigger",
      llmContext: "Side where the menu should appear relative to the trigger",
      propDefault: "MenuSide.BOTTOM",
      category: "Layout",
      required: false,
    },
    {
      propName: "maxWidth",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Maximum width of the menu in pixels",
      llmContext: "Maximum width of the menu in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "maxHeight",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Maximum height of the menu in pixels",
      llmContext: "Maximum height of the menu in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "sideOffset",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Distance in pixels between the menu and trigger",
      llmContext: "Distance in pixels between the menu and trigger",
      propDefault: "5",
      category: "Layout",
      required: false,
    },
    {
      propName: "asModal",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to render the menu as a modal on mobile devices",
      llmContext: "Whether to render the menu as a modal on mobile devices",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
  ],
};

export default menuMeta;
