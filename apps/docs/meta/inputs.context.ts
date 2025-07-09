import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const inputsMeta: ComponentMeta = {
  componentName: "Inputs",
  componentDescription:
    "A comprehensive collection of input components including TextInput, NumberInput, SearchInput, OTPInput, TextArea, and specialized inputs for various data types and use cases.",
  features: [
    "Multiple input types (text, number, search, OTP, textarea)",
    "Two sizes (medium, large)",
    "Error state handling with messages",
    "Required field indication",
    "Label and sublabel support",
    "Hint text and help tooltips",
    "Left and right slot content",
    "Disabled state support",
    "Form integration ready",
    "Accessible design with proper labeling",
  ],
  usageExamples: [
    {
      title: "Basic Text Input",
      description: "Simple text input with label and hint",
      code: `const [value, setValue] = useState('');

<TextInput 
  label="Full Name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter your full name"
  hintText="This will be displayed on your profile"
/>`,
    },
    {
      title: "Required Input with Error",
      description: "Input with required indication and error state",
      code: `<TextInput 
  label="Email Address"
  sublabel="We'll use this to contact you"
  required={true}
  error={true}
  errorMessage="Please enter a valid email address"
  value={email}
  onChange={handleEmailChange}
  placeholder="you@example.com"
  size={TextInputSize.LARGE}
/>`,
    },
    {
      title: "Input with Slots",
      description: "Input with left and right slot content",
      code: `<TextInput 
  label="Website URL"
  value={url}
  onChange={handleUrlChange}
  leftSlot={<GlobeIcon />}
  rightSlot={<Button size="sm" text="Verify" />}
  placeholder="https://example.com"
  hintText="Enter your website or portfolio URL"
/>`,
    },
    {
      title: "Number Input with Help",
      description: "Number input with help tooltip",
      code: `<NumberInput 
  label="Monthly Budget"
  sublabel="USD"
  value={budget}
  onChange={setBudget}
  helpIconHintText="This helps us recommend suitable plans"
  leftSlot={<DollarIcon />}
  placeholder="0.00"
  disabled={false}
/>`,
    },
  ],
  props: [
    {
      propName: "label",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The main label text for the input",
      llmContext: "The main label text for the input",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "value",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The current value of the input",
      llmContext: "The current value of the input",
      propDefault: "-",
      category: "State",
      required: true,
    },
    {
      propName: "onChange",
      propType: "(e: React.ChangeEvent<HTMLInputElement>) => void",
      typeDefinition: "(e: React.ChangeEvent<HTMLInputElement>) => void",
      propDescription: "Callback fired when the input value changes",
      llmContext: "Callback fired when the input value changes",
      propDefault: "-",
      category: "Events",
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
      propName: "hintText",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Hint text displayed below the input",
      llmContext: "Hint text displayed below the input",
      propDefault: "undefined",
      category: "Content",
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
      propName: "required",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the input is required (shows asterisk)",
      llmContext: "Whether the input is required (shows asterisk)",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "error",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the input is in error state",
      llmContext: "Whether the input is in error state",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "errorMessage",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Error message displayed when input is in error state",
      llmContext: "Error message displayed when input is in error state",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the input is disabled",
      llmContext: "Whether the input is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "size",
      propType: "TextInputSize",
      typeDefinition: `enum TextInputSize {
        MEDIUM = "md",
        LARGE = "lg",
      }`,
      propDescription: "Size variant of the input",
      llmContext: "Size variant of the input",
      propDefault: "TextInputSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "leftSlot",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Custom content displayed on the left side of the input",
      llmContext: "Custom content displayed on the left side of the input",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "rightSlot",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription:
        "Custom content displayed on the right side of the input",
      llmContext: "Custom content displayed on the right side of the input",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "placeholder",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Placeholder text for the input",
      llmContext: "Placeholder text for the input",
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
  ],
};

export default inputsMeta;
