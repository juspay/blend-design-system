import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const switchMeta: ComponentMeta = {
  componentName: "Switch",
  componentDescription:
    "A toggle switch component for binary on/off states with support for controlled and uncontrolled modes, multiple sizes, and comprehensive form integration.",
  features: [
    "Controlled and uncontrolled modes",
    "Two sizes (small, medium)",
    "Error state handling",
    "Required field indication",
    "Label and subtext support",
    "Custom slot for additional content",
    "Disabled state support",
    "Switch group functionality",
    "Accessible design with proper ARIA attributes",
    "Form integration ready",
  ],
  usageExamples: [
    {
      title: "Basic Switch",
      description: "Simple toggle switch with label",
      code: `<Switch 
  label="Enable notifications"
  size={SwitchSize.MEDIUM}
/>`,
    },
    {
      title: "Controlled Switch",
      description: "Switch with controlled state",
      code: `const [isEnabled, setIsEnabled] = useState(false);

<Switch 
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Dark mode"
  subtext="Toggle between light and dark themes"
/>`,
    },
    {
      title: "Switch with Error State",
      description: "Switch with error state and required indication",
      code: `<Switch 
  required={true}
  error={true}
  label="Accept terms"
  subtext="You must accept the terms to continue"
  size={SwitchSize.SMALL}
/>`,
    },
    {
      title: "Switch with Custom Slot",
      description: "Switch with additional content slot",
      code: `<Switch 
  label="Premium features"
  subtext="Unlock advanced functionality"
  slot={<Badge variant="premium">Pro</Badge>}
  defaultChecked={true}
/>`,
    },
  ],
  props: [
    {
      propName: "id",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Unique identifier for the switch input",
      llmContext: "Unique identifier for the switch input",
      propDefault: "auto-generated",
      category: "Content",
      required: false,
    },
    {
      propName: "checked",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Controlled checked state of the switch",
      llmContext: "Controlled checked state of the switch",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "defaultChecked",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Default checked state for uncontrolled mode",
      llmContext: "Default checked state for uncontrolled mode",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "onChange",
      propType: "(checked: boolean) => void",
      typeDefinition: "(checked: boolean) => void",
      propDescription: "Callback fired when the switch state changes",
      llmContext: "Callback fired when the switch state changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the switch is disabled",
      llmContext: "Whether the switch is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "required",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the switch is required (shows asterisk)",
      llmContext: "Whether the switch is required (shows asterisk)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "error",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the switch is in error state",
      llmContext: "Whether the switch is in error state",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "size",
      propType: "SwitchSize",
      typeDefinition: `enum SwitchSize {
        SMALL = 'sm',
        MEDIUM = 'md',
      }`,
      propDescription: "Size variant of the switch",
      llmContext: "Size variant of the switch",
      propDefault: "SwitchSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "label",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Label content for the switch",
      llmContext: "Label content for the switch",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "subtext",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Additional descriptive text below the switch",
      llmContext: "Additional descriptive text below the switch",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "slot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom content slot next to the switch label",
      llmContext: "Custom content slot next to the switch label",
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
      propName: "value",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Value attribute for the switch input",
      llmContext: "Value attribute for the switch input",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
  ],
};

export default switchMeta;
