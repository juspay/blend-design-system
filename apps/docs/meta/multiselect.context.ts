import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const multiselectMeta: ComponentMeta = {
  componentName: "MultiSelect",
  componentDescription:
    "A comprehensive multi-selection dropdown component with grouped items, search functionality, customizable positioning, and flexible selection display options for selecting multiple values from a list.",
  features: [
    "Multiple item selection with controlled state",
    "Grouped menu items with labels and separators",
    "Two visual variants (container, no-container)",
    "Selection display modes (count, text tags)",
    "Custom slot content for each menu item (up to 4 slots)",
    "Flexible positioning and alignment options",
    "Form integration with labels and validation",
    "Disabled state and required field support",
    "Submenu support for nested options",
    "Customizable dimensions and styling",
  ],
  usageExamples: [
    {
      title: "Basic Multi-Select",
      description: "Simple multi-select with grouped options",
      code: `const [selectedValues, setSelectedValues] = useState([]);

const handleChange = (value) => {
  setSelectedValues(prev => 
    prev.includes(value) 
      ? prev.filter(v => v !== value)
      : [...prev, value]
  );
};

<MultiSelect
  selectedValues={selectedValues}
  onChange={handleChange}
  label="Select Technologies"
  placeholder="Choose technologies..."
  items={[
    {
      groupLabel: "Frontend",
      items: [
        { label: "React", value: "react" },
        { label: "Vue.js", value: "vue" },
        { label: "Angular", value: "angular" }
      ]
    },
    {
      groupLabel: "Backend", 
      items: [
        { label: "Node.js", value: "nodejs" },
        { label: "Python", value: "python" },
        { label: "Java", value: "java" }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Multi-Select with Custom Slots",
      description: "Multi-select with icons and additional content",
      code: `<MultiSelect
  selectedValues={selectedSkills}
  onChange={handleSkillChange}
  label="Skills & Expertise"
  sublabel="Select your areas of expertise"
  placeholder="Choose skills..."
  variant={MultiSelectVariant.CONTAINER}
  selectionTagType={MultiSelectSelectionTagType.TEXT}
  items={[
    {
      groupLabel: "Technical Skills",
      items: [
        { 
          label: "JavaScript", 
          value: "js",
          slot1: <JavaScriptIcon />,
          slot4: <Badge>Expert</Badge>
        },
        { 
          label: "TypeScript", 
          value: "ts",
          slot1: <TypeScriptIcon />,
          slot4: <Badge>Advanced</Badge>
        }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Multi-Select with Custom Positioning",
      description: "Multi-select with custom menu positioning and sizing",
      code: `<MultiSelect
  selectedValues={selectedCategories}
  onChange={handleCategoryChange}
  label="Product Categories"
  placeholder="Select categories..."
  size={MultiSelectMenuSize.LARGE}
  side={MultiSelectMenuSide.TOP}
  alignment={MultiSelectMenuAlignment.START}
  maxWidth={400}
  maxHeight={300}
  items={categoryGroups}
/>`,
    },
    {
      title: "Form Multi-Select with Validation",
      description: "Multi-select with form integration and validation",
      code: `<MultiSelect
  selectedValues={selectedOptions}
  onChange={handleSelectionChange}
  label="Required Selection"
  sublabel="Choose at least one option"
  placeholder="Select options..."
  required={true}
  disabled={isLoading}
  helpIconHintText="This field is required for processing"
  hintText="Select multiple options from the list"
  slot={<FilterIcon />}
  items={formOptions}
/>`,
    },
  ],
  props: [
    {
      propName: "selectedValues",
      propType: "string[]",
      typeDefinition: "string[]",
      propDescription: "Array of currently selected values",
      llmContext: "Array of currently selected values",
      propDefault: "-",
      category: "State",
      required: true,
    },
    {
      propName: "onChange",
      propType: "(selectedValue: string) => void",
      typeDefinition: "(selectedValue: string) => void",
      propDescription: "Callback fired when a selection changes",
      llmContext: "Callback fired when a selection changes",
      propDefault: "-",
      category: "Events",
      required: true,
    },
    {
      propName: "items",
      propType: "MultiSelectMenuGroupType[]",
      typeDefinition: `type MultiSelectMenuGroupType = {
        groupLabel?: string;
        items: MultiSelectMenuItemType[];
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
      propDescription: "The main label text for the multi-select",
      llmContext: "The main label text for the multi-select",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "placeholder",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Placeholder text displayed when no items are selected",
      llmContext: "Placeholder text displayed when no items are selected",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "sublabel",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional label text displayed below the main label",
      llmContext: "Additional label text displayed below the main label",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "variant",
      propType: "MultiSelectVariant",
      typeDefinition: `enum MultiSelectVariant {
        CONTAINER = "container",
        NO_CONTAINER = "no-container",
      }`,
      propDescription: "Visual variant of the multi-select component",
      llmContext: "Visual variant of the multi-select component",
      propDefault: "MultiSelectVariant.CONTAINER",
      category: "Appearance",
      required: false,
    },
    {
      propName: "selectionTagType",
      propType: "MultiSelectSelectionTagType",
      typeDefinition: `enum MultiSelectSelectionTagType {
        COUNT = "count",
        TEXT = "text",
      }`,
      propDescription:
        "How selected items are displayed (count or individual tags)",
      llmContext: "How selected items are displayed (count or individual tags)",
      propDefault: "MultiSelectSelectionTagType.COUNT",
      category: "Appearance",
      required: false,
    },
    {
      propName: "size",
      propType: "MultiSelectMenuSize",
      typeDefinition: `enum MultiSelectMenuSize {
        SMALL = "sm",
        MEDIUM = "md",
        LARGE = "lg",
      }`,
      propDescription: "Size variant of the multi-select menu",
      llmContext: "Size variant of the multi-select menu",
      propDefault: "MultiSelectMenuSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the multi-select is disabled",
      llmContext: "Whether the multi-select is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "required",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the multi-select is required (shows asterisk)",
      llmContext: "Whether the multi-select is required (shows asterisk)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "helpIconHintText",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Text displayed in help tooltip next to the label",
      llmContext: "Text displayed in help tooltip next to the label",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "hintText",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Hint text displayed below the multi-select",
      llmContext: "Hint text displayed below the multi-select",
      propDefault: "undefined",
      category: "Content",
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
      propType: "MultiSelectMenuSide",
      typeDefinition: `enum MultiSelectMenuSide {
        TOP = "top",
        LEFT = "left",
        RIGHT = "right",
        BOTTOM = "bottom",
      }`,
      propDescription:
        "Side where the menu should appear relative to the trigger",
      llmContext: "Side where the menu should appear relative to the trigger",
      propDefault: "MultiSelectMenuSide.BOTTOM",
      category: "Layout",
      required: false,
    },
    {
      propName: "alignment",
      propType: "MultiSelectMenuAlignment",
      typeDefinition: `enum MultiSelectMenuAlignment {
        START = "start",
        CENTER = "center",
        END = "end",
      }`,
      propDescription: "Alignment of the menu relative to the trigger",
      llmContext: "Alignment of the menu relative to the trigger",
      propDefault: "MultiSelectMenuAlignment.CENTER",
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

export default multiselectMeta;
