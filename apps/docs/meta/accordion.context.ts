import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const accordionMeta: ComponentMeta = {
  componentName: "Accordion",
  componentDescription:
    "A flexible and accessible accordion component built on Radix UI that allows users to show and hide sections of content with support for single and multiple panel expansion modes.",
  features: [
    "Built on Radix UI for accessibility compliance",
    "Single or multiple panel expansion modes",
    "Two visual variants (bordered and borderless)",
    "Customizable chevron positioning (left or right)",
    "Support for custom content slots (left, right, subtext)",
    "Disabled state support",
    "Smooth animations and transitions",
    "Keyboard navigation support",
    "Focus management and ARIA attributes",
  ],
  usageExamples: [
    {
      title: "Basic Accordion",
      description: "Simple accordion with single expansion",
      code: `<Accordion>
  <AccordionItem value="item1" title="First Section">
    <p>Content for the first section goes here.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Second Section">
    <p>Content for the second section goes here.</p>
  </AccordionItem>
</Accordion>`,
    },
    {
      title: "Multiple Expansion Accordion",
      description: "Allow multiple items to be expanded simultaneously",
      code: `<Accordion isMultiple defaultValue={["item1", "item3"]}>
  <AccordionItem value="item1" title="Always Expanded">
    <p>This section starts expanded.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Collapsible Section">
    <p>This section can be toggled.</p>
  </AccordionItem>
  <AccordionItem value="item3" title="Also Expanded">
    <p>This section also starts expanded.</p>
  </AccordionItem>
</Accordion>`,
    },
    {
      title: "Bordered Accordion with Custom Slots",
      description: "Rich accordion items with icons and additional content",
      code: `<Accordion accordionType={AccordionType.BORDER}>
  <AccordionItem 
    value="profile" 
    title="User Profile"
    subtext="Manage your personal information"
    leftSlot={<UserIcon />}
    rightSlot={<Badge>New</Badge>}
  >
    <div>
      <p>Update your profile information and preferences.</p>
      <Button text="Edit Profile" />
    </div>
  </AccordionItem>
</Accordion>`,
    },
    {
      title: "Controlled Accordion",
      description: "Accordion with external state management",
      code: `const [expandedItems, setExpandedItems] = useState(['item1']);

<Accordion 
  isMultiple 
  value={expandedItems}
  onValueChange={setExpandedItems}
>
  <AccordionItem value="item1" title="Controlled Item 1">
    <p>This accordion is controlled by external state.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Controlled Item 2">
    <p>State changes are handled by the parent component.</p>
  </AccordionItem>
</Accordion>`,
    },
  ],
  props: [
    {
      propName: "children",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "AccordionItem components to render within the accordion",
      llmContext: "AccordionItem components to render within the accordion",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "accordionType",
      propType: "AccordionType",
      typeDefinition: `enum AccordionType {
        BORDER = "border",
        NO_BORDER = "noBorder",
      }`,
      propDescription: "Visual style variant of the accordion",
      llmContext: "Visual style variant of the accordion",
      propDefault: "AccordionType.NO_BORDER",
      category: "Appearance",
      required: false,
    },
    {
      propName: "defaultValue",
      propType: "string | string[]",
      typeDefinition: "string | string[]",
      propDescription: "Default expanded item(s) for uncontrolled mode",
      llmContext: "Default expanded item(s) for uncontrolled mode",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "value",
      propType: "string | string[]",
      typeDefinition: "string | string[]",
      propDescription: "Controlled expanded item(s) value",
      llmContext: "Controlled expanded item(s) value",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "isMultiple",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether multiple items can be expanded simultaneously",
      llmContext: "Whether multiple items can be expanded simultaneously",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
    {
      propName: "onValueChange",
      propType: "(value: string | string[]) => void",
      typeDefinition: "(value: string | string[]) => void",
      propDescription: "Callback fired when expansion state changes",
      llmContext: "Callback fired when expansion state changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "className",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional CSS class names for the accordion container",
      llmContext: "Additional CSS class names for the accordion container",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "value",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "Unique identifier for the accordion item (AccordionItem prop)",
      llmContext:
        "Unique identifier for the accordion item (AccordionItem prop)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "title",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "Main heading text for the accordion item (AccordionItem prop)",
      llmContext:
        "Main heading text for the accordion item (AccordionItem prop)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "subtext",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Secondary text below the title (AccordionItem prop)",
      llmContext: "Secondary text below the title (AccordionItem prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "leftSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "Custom content on the left side of the header (AccordionItem prop)",
      llmContext:
        "Custom content on the left side of the header (AccordionItem prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "rightSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "Custom content on the right side of the header (AccordionItem prop)",
      llmContext:
        "Custom content on the right side of the header (AccordionItem prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "subtextSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "Custom content in the subtext area (AccordionItem prop)",
      llmContext: "Custom content in the subtext area (AccordionItem prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "isDisabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether the accordion item is disabled (AccordionItem prop)",
      llmContext: "Whether the accordion item is disabled (AccordionItem prop)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "chevronPosition",
      propType: "AccordionChevronPosition",
      typeDefinition: `enum AccordionChevronPosition {
        LEFT = "left",
        RIGHT = "right",
      }`,
      propDescription:
        "Position of the expand/collapse chevron (AccordionItem prop)",
      llmContext:
        "Position of the expand/collapse chevron (AccordionItem prop)",
      propDefault: "AccordionChevronPosition.RIGHT",
      category: "Appearance",
      required: false,
    },
  ],
};

export default accordionMeta;
