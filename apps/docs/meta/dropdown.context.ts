import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const dropdownMeta: ComponentMeta = {
  componentName: "Dropdown",
  componentDescription:
    "A form dropdown component that combines a label, trigger button, and menu for selecting options with support for icons, hints, and customizable styling.",
  features: [
    "Form-ready with label and hint text",
    "Optional label support",
    "Custom slot for icons or content",
    "Menu-based option selection",
    "Hover and focus states",
    "Accessible design with proper labeling",
    "Customizable trigger button",
    "Responsive layout",
    "Integration with Menu component",
  ],
  usageExamples: [
    {
      title: "Basic Dropdown",
      description: "Simple dropdown with label and options",
      code: `<Dropdown 
  label="Select Country"
  hintText="Choose your country from the list"
  items={[
    {
      groupItems: [
        { id: "us", text: "United States" },
        { id: "ca", text: "Canada" },
        { id: "uk", text: "United Kingdom" },
        { id: "de", text: "Germany" }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Optional Dropdown with Icon",
      description: "Dropdown with optional label and icon slot",
      code: `<Dropdown 
  label="Preferred Language"
  optionalLabel="(optional)"
  hintText="Select your preferred language for the interface"
  slot={<LanguageIcon />}
  items={[
    {
      groupItems: [
        { id: "en", text: "English" },
        { id: "es", text: "Spanish" },
        { id: "fr", text: "French" },
        { id: "de", text: "German" }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Grouped Dropdown Options",
      description: "Dropdown with grouped menu items",
      code: `<Dropdown 
  label="Select Framework"
  hintText="Choose a frontend framework"
  items={[
    {
      groupLabel: "React Ecosystem",
      groupItems: [
        { id: "react", text: "React" },
        { id: "nextjs", text: "Next.js" },
        { id: "gatsby", text: "Gatsby" }
      ]
    },
    {
      groupLabel: "Vue Ecosystem", 
      groupItems: [
        { id: "vue", text: "Vue.js" },
        { id: "nuxt", text: "Nuxt.js" },
        { id: "quasar", text: "Quasar" }
      ]
    }
  ]}
/>`,
    },
    {
      title: "Custom Dropdown",
      description: "Dropdown with custom styling and content",
      code: `<Dropdown 
  label="Priority Level"
  hintText="Set the priority for this task"
  slot={<PriorityIcon />}
  items={[
    {
      groupItems: [
        { 
          id: "high", 
          text: "High Priority",
          hasSlotL: true,
          slotL: <HighPriorityIcon />
        },
        { 
          id: "medium", 
          text: "Medium Priority",
          hasSlotL: true,
          slotL: <MediumPriorityIcon />
        },
        { 
          id: "low", 
          text: "Low Priority",
          hasSlotL: true,
          slotL: <LowPriorityIcon />
        }
      ]
    }
  ]}
/>`,
    },
  ],
  props: [
    {
      propName: "label",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The main label text for the dropdown",
      llmContext: "The main label text for the dropdown",
      propDefault: "'Your Label'",
      category: "Content",
      required: false,
    },
    {
      propName: "optionalLabel",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Optional label text displayed next to the main label",
      llmContext: "Optional label text displayed next to the main label",
      propDefault: "'(optional)'",
      category: "Content",
      required: false,
    },
    {
      propName: "hintText",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Hint text displayed below the dropdown",
      llmContext: "Hint text displayed below the dropdown",
      propDefault: "'This is a hint text'",
      category: "Content",
      required: false,
    },
    {
      propName: "slot",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription:
        "Custom content (usually an icon) displayed in the trigger button",
      llmContext:
        "Custom content (usually an icon) displayed in the trigger button",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "items",
      propType: "MenuV2GroupType[]",
      typeDefinition: `type MenuV2GroupType = {
        groupLabel?: string;
        groupItems: MenuV2ItemType[];
      }
      
      type MenuV2ItemType = {
        id: string;
        text: string;
        hasSlotL?: boolean;
        slotL?: React.ReactNode;
        hasSlotR?: boolean;
        slotR?: React.ReactNode;
        onClick?: () => void;
        disabled?: boolean;
      }`,
      propDescription: "Array of menu groups containing selectable items",
      llmContext: "Array of menu groups containing selectable items",
      propDefault: "-",
      category: "Content",
      required: true,
    },
  ],
};

export default dropdownMeta;
