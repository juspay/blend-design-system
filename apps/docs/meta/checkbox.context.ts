import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const checkboxMeta: ComponentMeta = {
  componentName: "Checkbox",
  componentDescription:
    "A versatile checkbox component with support for controlled and uncontrolled states, indeterminate state, multiple sizes, and comprehensive form integration capabilities.",
  features: [
    "Controlled and uncontrolled modes",
    "Indeterminate state support",
    "Two sizes (small, medium)",
    "Error state handling",
    "Required field indication",
    "Label and subtext support",
    "Custom slot for additional content",
    "Disabled state support",
    "Accessible design with proper ARIA attributes",
    "Form integration ready",
  ],
  usageExamples: [
    {
      title: "Basic Checkbox",
      description: "Simple checkbox with label",
      code: `<Checkbox>
  Accept terms and conditions
</Checkbox>`,
    },
    {
      title: "Controlled Checkbox",
      description: "Checkbox with controlled state",
      code: `const [isChecked, setIsChecked] = useState(false);

<Checkbox 
  checked={isChecked}
  onCheckedChange={setIsChecked}
  size={CheckboxSize.MEDIUM}
>
  Subscribe to newsletter
</Checkbox>`,
    },
    {
      title: "Checkbox with Subtext and Error",
      description: "Checkbox with additional information and error state",
      code: `<Checkbox 
  required={true}
  error={true}
  subtext="This field is required"
  size={CheckboxSize.SMALL}
>
  I agree to the privacy policy
</Checkbox>`,
    },
    {
      title: "Indeterminate Checkbox with Slot",
      description: "Checkbox in indeterminate state with custom slot content",
      code: `<Checkbox 
  checked="indeterminate"
  slot={<Badge variant="info">Partial</Badge>}
  subtext="Some items are selected"
>
  Select all items
</Checkbox>`,
    },
  ],
  props: [
    {
      propName: "id",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Unique identifier for the checkbox input",
      llmContext: "Unique identifier for the checkbox input",
      propDefault: "auto-generated",
      category: "Content",
      required: false,
    },
    {
      propName: "value",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Value attribute for the checkbox input",
      llmContext: "Value attribute for the checkbox input",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "checked",
      propType: "boolean | 'indeterminate'",
      typeDefinition: "boolean | 'indeterminate'",
      propDescription: "Controlled checked state of the checkbox",
      llmContext: "Controlled checked state of the checkbox",
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
      propName: "onCheckedChange",
      propType: "(checked: boolean | 'indeterminate') => void",
      typeDefinition: "(checked: boolean | 'indeterminate') => void",
      propDescription: "Callback fired when the checked state changes",
      llmContext: "Callback fired when the checked state changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the checkbox is disabled",
      llmContext: "Whether the checkbox is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "required",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the checkbox is required (shows asterisk)",
      llmContext: "Whether the checkbox is required (shows asterisk)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "error",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the checkbox is in error state",
      llmContext: "Whether the checkbox is in error state",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "size",
      propType: "CheckboxSize",
      typeDefinition: `enum CheckboxSize {
        SMALL = 'sm',
        MEDIUM = 'md',
      }`,
      propDescription: "Size variant of the checkbox",
      llmContext: "Size variant of the checkbox",
      propDefault: "CheckboxSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "children",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Label content for the checkbox",
      llmContext: "Label content for the checkbox",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "subtext",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional descriptive text below the checkbox",
      llmContext: "Additional descriptive text below the checkbox",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "slot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom content slot next to the checkbox label",
      llmContext: "Custom content slot next to the checkbox label",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
  ],
};

export default checkboxMeta;
