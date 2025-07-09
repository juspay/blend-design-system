import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const radioMeta: ComponentMeta = {
  componentName: "Radio",
  componentDescription:
    "A radio button component for single selection within groups, with support for controlled and uncontrolled modes, multiple sizes, and comprehensive form integration.",
  features: [
    "Single selection within radio groups",
    "Controlled and uncontrolled modes",
    "Two sizes (small, medium)",
    "Error state handling",
    "Required field indication",
    "Label and subtext support",
    "Custom slot for additional content",
    "Disabled state support",
    "Radio group functionality",
    "Accessible design with proper ARIA attributes",
    "Form integration ready",
  ],
  usageExamples: [
    {
      title: "Basic Radio Group",
      description: "Simple radio group with multiple options",
      code: `<RadioGroup name="plan" label="Select Plan">
  <Radio value="basic">
    Basic Plan
  </Radio>
  <Radio value="pro">
    Pro Plan
  </Radio>
  <Radio value="enterprise">
    Enterprise Plan
  </Radio>
</RadioGroup>`,
    },
    {
      title: "Controlled Radio Group",
      description: "Radio group with controlled state",
      code: `const [selectedPlan, setSelectedPlan] = useState('pro');

<RadioGroup 
  name="subscription"
  value={selectedPlan}
  onChange={setSelectedPlan}
  label="Choose Subscription"
>
  <Radio value="monthly" size={RadioSize.MEDIUM}>
    Monthly Billing
  </Radio>
  <Radio value="yearly" size={RadioSize.MEDIUM}>
    Yearly Billing
  </Radio>
</RadioGroup>`,
    },
    {
      title: "Radio with Subtext and Slots",
      description: "Radio buttons with additional information",
      code: `<RadioGroup name="payment" label="Payment Method">
  <Radio 
    value="card"
    slot={<CreditCardIcon />}
    subtext="Visa, Mastercard, American Express"
  >
    Credit Card
  </Radio>
  <Radio 
    value="paypal"
    slot={<PayPalIcon />}
    subtext="Pay with your PayPal account"
  >
    PayPal
  </Radio>
  <Radio 
    value="bank"
    slot={<BankIcon />}
    subtext="Direct bank transfer"
    disabled={true}
  >
    Bank Transfer
  </Radio>
</RadioGroup>`,
    },
    {
      title: "Radio with Error State",
      description: "Radio group with error state and required indication",
      code: `<RadioGroup 
  name="agreement"
  label="Terms Agreement"
  required={true}
>
  <Radio 
    value="accept"
    error={true}
    subtext="You must accept the terms to continue"
  >
    I accept the terms and conditions
  </Radio>
  <Radio 
    value="decline"
    error={true}
  >
    I decline the terms and conditions
  </Radio>
</RadioGroup>`,
    },
  ],
  props: [
    {
      propName: "id",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Unique identifier for the radio input",
      llmContext: "Unique identifier for the radio input",
      propDefault: "auto-generated",
      category: "Content",
      required: false,
    },
    {
      propName: "value",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Value attribute for the radio input",
      llmContext: "Value attribute for the radio input",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "checked",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Controlled checked state of the radio",
      llmContext: "Controlled checked state of the radio",
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
      propDescription: "Callback fired when the radio state changes",
      llmContext: "Callback fired when the radio state changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the radio is disabled",
      llmContext: "Whether the radio is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "required",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the radio is required (shows asterisk)",
      llmContext: "Whether the radio is required (shows asterisk)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "error",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the radio is in error state",
      llmContext: "Whether the radio is in error state",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "size",
      propType: "RadioSize",
      typeDefinition: `enum RadioSize {
        SMALL = 'sm',
        MEDIUM = 'md',
      }`,
      propDescription: "Size variant of the radio",
      llmContext: "Size variant of the radio",
      propDefault: "RadioSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "children",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Label content for the radio",
      llmContext: "Label content for the radio",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "subtext",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional descriptive text below the radio",
      llmContext: "Additional descriptive text below the radio",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "slot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom content slot next to the radio label",
      llmContext: "Custom content slot next to the radio label",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "name",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Name attribute for form submission (RadioGroup prop)",
      llmContext: "Name attribute for form submission (RadioGroup prop)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "label",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Label for the radio group (RadioGroup prop)",
      llmContext: "Label for the radio group (RadioGroup prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
  ],
};

export default radioMeta;
