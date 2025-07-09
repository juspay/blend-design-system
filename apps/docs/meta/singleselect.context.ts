import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const singleselectMeta: ComponentMeta = {
  componentName: "SingleSelect",
  componentDescription:
    "A single-selection dropdown component with grouped items, search functionality, and customizable positioning for selecting one value from a list of options.",
  features: [
    "Single item selection with controlled state",
    "Grouped menu items with labels and separators",
    "Two visual variants (container, no-container)",
    "Optional search functionality for filtering items",
    "Custom slot content for each menu item (up to 4 slots)",
    "Flexible positioning and alignment options",
    "Form integration with labels and validation",
    "Disabled state and required field support",
    "Submenu support for nested options",
    "Customizable dimensions and styling",
  ],
  usageExamples: [
    {
      title: "Basic Single Select",
      description: "Simple single select with grouped options",
      code: `const [selectedValue, setSelectedValue] = useState('');

<SingleSelect
  selected={selectedValue}
  onSelect={setSelectedValue}
  label="Select Country"
  placeholder="Choose a country..."
  items={[
    {
      groupLabel: "North America",
      items: [
        { label: "United States", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "Mexico", value: "mx" }
      ]
    },
    {
      groupLabel: "Europe",
      items: [
        { label: "United Kingdom", value: "uk" },
        { label: "Germany", value: "de" },
        { label: "France", value: "fr" }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Single Select with Search",
      description: "Single select with search functionality enabled",
      code: `<SingleSelect
  selected={selectedFramework}
  onSelect={setSelectedFramework}
  label="Frontend Framework"
  subLabel="Choose your preferred framework"
  placeholder="Search frameworks..."
  enableSearch={true}
  size={SelectMenuSize.LARGE}
  items={[
    {
      groupLabel: "React Ecosystem",
      items: [
        { 
          label: "React", 
          value: "react",
          slot1: <ReactIcon />,
          subLabel: "A JavaScript library for building user interfaces"
        },
        { 
          label: "Next.js", 
          value: "nextjs",
          slot1: <NextIcon />,
          subLabel: "The React Framework for Production"
        }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Single Select with Custom Positioning",
      description: "Single select with custom menu positioning and sizing",
      code: `<SingleSelect
  selected={selectedOption}
  onSelect={setSelectedOption}
  label="Priority Level"
  placeholder="Select priority..."
  variant={SelectMenuVariant.NO_CONTAINER}
  side={SelectMenuSide.TOP}
  alignment={SelectMenuAlignment.START}
  maxWidth={300}
  maxHeight={200}
  items={priorityOptions}
/>`,
    },
    {
      title: "Form Single Select with Validation",
      description: "Single select with form integration and validation",
      code: `<SingleSelect
  selected={selectedCategory}
  onSelect={setSelectedCategory}
  label="Product Category"
  subLabel="Required field"
  placeholder="Choose category..."
  required={true}
  disabled={isLoading}
  helpIconText="This determines the product classification"
  hintText="Select the most appropriate category"
  slot={<CategoryIcon />}
  name="productCategory"
  items={categoryOptions}
/>`,
    },
  ],
  props: [
    {
      propName: "selected",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Currently selected value",
      llmContext: "Currently selected value",
      propDefault: "-",
      category: "State",
      required: true,
    },
    {
      propName: "onSelect",
      propType: "(value: string) => void",
      typeDefinition: "(value: string) => void",
      propDescription: "Callback fired when a selection is made",
      llmContext: "Callback fired when a selection is made",
      propDefault: "-",
      category: "Events",
      required: true,
    },
    {
      propName: "items",
      propType: "SelectMenuGroupType[]",
      typeDefinition: `type SelectMenuGroupType = {
        groupLabel?: string;
        items: SelectMenuItemType[];
        showSeparator?: boolean;
      }`,
      propDescription: "Array of grouped menu items for selection",
      llmContext: "Array of grouped menu items for selection",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "label",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The main label text for the single select",
      llmContext: "The main label text for the single select",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "placeholder",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Placeholder text displayed when no item is selected",
      llmContext: "Placeholder text displayed when no item is selected",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "subLabel",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional label text displayed below the main label",
      llmContext: "Additional label text displayed below the main label",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "hintText",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Hint text displayed below the single select",
      llmContext: "Hint text displayed below the single select",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "helpIconText",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Text displayed in help tooltip next to the label",
      llmContext: "Text displayed in help tooltip next to the label",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "variant",
      propType: "SelectMenuVariant",
      typeDefinition: `enum SelectMenuVariant {
        CONTAINER = "container",
        NO_CONTAINER = "no-container",
      }`,
      propDescription: "Visual variant of the single select component",
      llmContext: "Visual variant of the single select component",
      propDefault: "SelectMenuVariant.CONTAINER",
      category: "Appearance",
      required: false,
    },
    {
      propName: "size",
      propType: "SelectMenuSize",
      typeDefinition: `enum SelectMenuSize {
        SMALL = "sm",
        MEDIUM = "md",
        LARGE = "lg",
      }`,
      propDescription: "Size variant of the single select menu",
      llmContext: "Size variant of the single select menu",
      propDefault: "SelectMenuSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "enableSearch",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to enable search functionality for filtering items",
      llmContext: "Whether to enable search functionality for filtering items",
      propDefault: "false",
      category: "Features",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the single select is disabled",
      llmContext: "Whether the single select is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "required",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the single select is required (shows asterisk)",
      llmContext: "Whether the single select is required (shows asterisk)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "slot",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription:
        "Custom content (usually an icon) displayed in the trigger",
      llmContext: "Custom content (usually an icon) displayed in the trigger",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "name",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Name attribute for form submission",
      llmContext: "Name attribute for form submission",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "side",
      propType: "SelectMenuSide",
      typeDefinition: `enum SelectMenuSide {
        TOP = "top",
        LEFT = "left",
        RIGHT = "right",
        BOTTOM = "bottom",
      }`,
      propDescription:
        "Side where the menu should appear relative to the trigger",
      llmContext: "Side where the menu should appear relative to the trigger",
      propDefault: "SelectMenuSide.BOTTOM",
      category: "Layout",
      required: false,
    },
    {
      propName: "alignment",
      propType: "SelectMenuAlignment",
      typeDefinition: `enum SelectMenuAlignment {
        START = "start",
        CENTER = "center",
        END = "end",
      }`,
      propDescription: "Alignment of the menu relative to the trigger",
      llmContext: "Alignment of the menu relative to the trigger",
      propDefault: "SelectMenuAlignment.CENTER",
      category: "Layout",
      required: false,
    },
    {
      propName: "minWidth",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Minimum width of the dropdown menu in pixels",
      llmContext: "Minimum width of the dropdown menu in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "maxWidth",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Maximum width of the dropdown menu in pixels",
      llmContext: "Maximum width of the dropdown menu in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "maxHeight",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Maximum height of the dropdown menu in pixels",
      llmContext: "Maximum height of the dropdown menu in pixels",
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
      propName: "alignOffset",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Offset in pixels for menu alignment",
      llmContext: "Offset in pixels for menu alignment",
      propDefault: "0",
      category: "Layout",
      required: false,
    },
  ],
};

export default singleselectMeta;
