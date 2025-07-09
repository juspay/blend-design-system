import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const selectMeta: ComponentMeta = {
  componentName: "Select",
  componentDescription:
    "A versatile select menu component with grouped items, multi-selection support, search functionality, and flexible positioning for complex selection scenarios.",
  features: [
    "Single and multi-selection modes",
    "Grouped menu items with labels",
    "Search functionality for filtering",
    "Custom slot content (up to 4 slots per item)",
    "Submenu support for nested options",
    "Flexible positioning and alignment",
    "Modal mode for mobile devices",
    "Collision boundary detection",
    "Customizable dimensions",
    "Accessible keyboard navigation",
  ],
  usageExamples: [
    {
      title: "Basic Select Menu",
      description: "Simple select with grouped items",
      code: `<SelectMenu
  trigger={<Button text="Select Options" />}
  items={[
    {
      groupLabel: "Actions",
      items: [
        { label: "Edit", value: "edit" },
        { label: "Delete", value: "delete" },
        { label: "Archive", value: "archive" }
      ]
    }
  ]}
  onSelect={(value) => handleSelection(value)}
/>`,
    },
    {
      title: "Multi-Select with Search",
      description: "Select menu with multiple selection and search",
      code: `<SelectMenu
  trigger={<Button text="Choose Multiple" />}
  allowMultiSelect={true}
  enableSearch={true}
  selected={selectedValues}
  onSelect={setSelectedValues}
  items={menuItems}
/>`,
    },
    {
      title: "Select with Custom Positioning",
      description: "Select menu with custom positioning",
      code: `<SelectMenu
  trigger={<IconButton icon={<MoreIcon />} />}
  side={SelectMenuSide.LEFT}
  alignment={SelectMenuAlignment.START}
  maxHeight={300}
  items={contextMenuItems}
/>`,
    },
    {
      title: "Modal Select for Mobile",
      description: "Select that becomes modal on mobile",
      code: `<SelectMenu
  trigger={<Button text="Mobile Friendly" />}
  asModal={true}
  items={mobileMenuItems}
  onSelect={handleMobileSelection}
/>`,
    },
  ],
  props: [
    {
      propName: "trigger",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "The trigger element that opens the select menu",
      llmContext: "The trigger element that opens the select menu",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "items",
      propType: "SelectMenuGroupType[]",
      typeDefinition: "SelectMenuGroupType[]",
      propDescription: "Array of grouped menu items for selection",
      llmContext: "Array of grouped menu items for selection",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "selected",
      propType: "string | string[]",
      typeDefinition: "string | string[]",
      propDescription: "Currently selected value(s)",
      llmContext: "Currently selected value(s)",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "onSelect",
      propType: "(value: string | string[]) => void",
      typeDefinition: "(value: string | string[]) => void",
      propDescription: "Callback fired when selection changes",
      llmContext: "Callback fired when selection changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "allowMultiSelect",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether multiple items can be selected",
      llmContext: "Whether multiple items can be selected",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
    {
      propName: "enableSearch",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to enable search functionality",
      llmContext: "Whether to enable search functionality",
      propDefault: "false",
      category: "Features",
      required: false,
    },
    {
      propName: "asModal",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to render as modal on mobile devices",
      llmContext: "Whether to render as modal on mobile devices",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
    {
      propName: "side",
      propType: "SelectMenuSide",
      typeDefinition: "SelectMenuSide",
      propDescription: "Side where menu appears relative to trigger",
      llmContext: "Side where menu appears relative to trigger",
      propDefault: "SelectMenuSide.BOTTOM",
      category: "Layout",
      required: false,
    },
    {
      propName: "alignment",
      propType: "SelectMenuAlignment",
      typeDefinition: "SelectMenuAlignment",
      propDescription: "Alignment of menu relative to trigger",
      llmContext: "Alignment of menu relative to trigger",
      propDefault: "SelectMenuAlignment.CENTER",
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
  ],
};

export default selectMeta;
