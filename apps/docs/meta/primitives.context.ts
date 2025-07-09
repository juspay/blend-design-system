import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const primitivesMeta: ComponentMeta = {
  componentName: "Primitives",
  componentDescription:
    "A collection of low-level, unstyled primitive components that serve as building blocks for creating custom UI components with full control over styling and behavior.",
  features: [
    "Unstyled base components",
    "Accessibility features built-in",
    "Keyboard navigation support",
    "Focus management",
    "ARIA attributes handling",
    "Composable architecture",
    "Headless component patterns",
    "Custom styling flexibility",
    "Event handling abstractions",
    "Cross-browser compatibility",
  ],
  usageExamples: [
    {
      title: "Custom Button Primitive",
      description: "Building a custom button using primitives",
      code: `import { ButtonPrimitive } from 'blend-v1';

const CustomButton = ({ children, variant = 'primary', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };

  return (
    <ButtonPrimitive
      className={\`\${baseStyles} \${variantStyles[variant]}\`}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};`,
    },
    {
      title: "Custom Dialog Primitive",
      description: "Creating a custom dialog using dialog primitives",
      code: `import { DialogPrimitive } from 'blend-v1';

const CustomDialog = ({ children, title, open, onOpenChange }) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>
        <button>Open Dialog</button>
      </DialogPrimitive.Trigger>
      
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <DialogPrimitive.Title className="text-lg font-semibold mb-4">
            {title}
          </DialogPrimitive.Title>
          {children}
          <DialogPrimitive.Close className="absolute top-2 right-2">
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};`,
    },
    {
      title: "Custom Dropdown Primitive",
      description: "Building a dropdown menu using primitives",
      code: `import { DropdownPrimitive } from 'blend-v1';

const CustomDropdown = ({ trigger, children }) => {
  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger asChild>
        {trigger}
      </DropdownPrimitive.Trigger>
      
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content 
          className="bg-white border rounded-md shadow-lg p-1 min-w-[200px]"
          sideOffset={5}
        >
          {children}
          <DropdownPrimitive.Arrow className="fill-white" />
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
};

const DropdownItem = ({ children, onSelect }) => (
  <DropdownPrimitive.Item
    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded"
    onSelect={onSelect}
  >
    {children}
  </DropdownPrimitive.Item>
);`,
    },
    {
      title: "Custom Checkbox Primitive",
      description: "Creating a styled checkbox using primitives",
      code: `import { CheckboxPrimitive } from 'blend-v1';

const CustomCheckbox = ({ children, ...props }) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        className="w-5 h-5 border-2 border-gray-300 rounded data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        {...props}
      >
        <CheckboxPrimitive.Indicator className="text-white">
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children && (
        <label className="text-sm font-medium">
          {children}
        </label>
      )}
    </div>
  );
};`,
    },
  ],
  props: [
    {
      propName: "asChild",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Merges props with the first child element instead of rendering a wrapper",
      llmContext:
        "Merges props with the first child element instead of rendering a wrapper",
      propDefault: "false",
      category: "Composition",
      required: false,
    },
    {
      propName: "children",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Child elements to render within the primitive",
      llmContext: "Child elements to render within the primitive",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "className",
      propType: "string",
      typeDefinition: "string",
      propDescription: "CSS class names for styling the primitive",
      llmContext: "CSS class names for styling the primitive",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "onSelect",
      propType: "(event: Event) => void",
      typeDefinition: "(event: Event) => void",
      propDescription:
        "Callback fired when an item is selected (for selectable primitives)",
      llmContext:
        "Callback fired when an item is selected (for selectable primitives)",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the primitive is disabled",
      llmContext: "Whether the primitive is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "open",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Controlled open state (for dialog/dropdown primitives)",
      llmContext: "Controlled open state (for dialog/dropdown primitives)",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "onOpenChange",
      propType: "(open: boolean) => void",
      typeDefinition: "(open: boolean) => void",
      propDescription: "Callback fired when open state changes",
      llmContext: "Callback fired when open state changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "side",
      propType: "'top' | 'right' | 'bottom' | 'left'",
      typeDefinition: "'top' | 'right' | 'bottom' | 'left'",
      propDescription:
        "Preferred side for positioning (for floating primitives)",
      llmContext: "Preferred side for positioning (for floating primitives)",
      propDefault: "'bottom'",
      category: "Layout",
      required: false,
    },
    {
      propName: "align",
      propType: "'start' | 'center' | 'end'",
      typeDefinition: "'start' | 'center' | 'end'",
      propDescription:
        "Alignment relative to the trigger (for floating primitives)",
      llmContext: "Alignment relative to the trigger (for floating primitives)",
      propDefault: "'center'",
      category: "Layout",
      required: false,
    },
    {
      propName: "sideOffset",
      propType: "number",
      typeDefinition: "number",
      propDescription:
        "Distance in pixels from the trigger (for floating primitives)",
      llmContext:
        "Distance in pixels from the trigger (for floating primitives)",
      propDefault: "0",
      category: "Layout",
      required: false,
    },
    {
      propName: "checked",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Controlled checked state (for checkbox/radio primitives)",
      llmContext: "Controlled checked state (for checkbox/radio primitives)",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "onCheckedChange",
      propType: "(checked: boolean) => void",
      typeDefinition: "(checked: boolean) => void",
      propDescription: "Callback fired when checked state changes",
      llmContext: "Callback fired when checked state changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "value",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Value for form submission (for input primitives)",
      llmContext: "Value for form submission (for input primitives)",
      propDefault: "undefined",
      category: "Form",
      required: false,
    },
    {
      propName: "name",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Name attribute for form submission",
      llmContext: "Name attribute for form submission",
      propDefault: "undefined",
      category: "Form",
      required: false,
    },
  ],
};

export default primitivesMeta;
