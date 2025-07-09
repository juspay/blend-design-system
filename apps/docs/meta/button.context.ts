import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const buttonMeta: ComponentMeta = {
  componentName: "Button",
  componentDescription:
    "A versatile button component with multiple variants, sizes, and states for user interactions.",
  features: [
    "Multiple button types (primary, secondary, danger, success)",
    "Three sizes (small, medium, large)",
    "Loading and disabled states",
    "Icon support (leading and trailing)",
    "Full width option",
    "Flexible content alignment",
    "Button group positioning support",
  ],
  usageExamples: [
    {
      title: "Basic Button",
      description: "Simple button with text",
      code: `<Button text="Click me" buttonType={ButtonTypeV2.PRIMARY} />`,
    },
    {
      title: "Button with Icons",
      description: "Button with leading and trailing icons",
      code: `<Button 
  text="Save" 
  leadingIcon={<SaveIcon />} 
  buttonType={ButtonTypeV2.SUCCESS} 
/>`,
    },
    {
      title: "Loading Button",
      description: "Button in loading state",
      code: `<Button 
  text="Processing..." 
  loading={true}
  buttonType={ButtonTypeV2.PRIMARY} 
/>`,
    },
    {
      title: "Full Width Button",
      description: "Button that takes full width of container",
      code: `<Button 
  text="Full Width" 
  fullWidth={true}
  buttonType={ButtonTypeV2.SECONDARY} 
/>`,
    },
  ],
  props: [
    {
      propName: "buttonType",
      propType: "ButtonTypeV2",
      typeDefinition: `enum ButtonTypeV2 {
        PRIMARY = "primary",
        SECONDARY = "secondary",
        DANGER = "danger",
        SUCCESS = "success",
      }`,
      propDescription: "The type of button to use",
      llmContext: "The type of button to use",
      propDefault: "ButtonTypeV2.PRIMARY",
      category: "Appearance",
      required: false,
    },
    {
      propName: "size",
      propType: "ButtonSizeV2",
      typeDefinition: `enum ButtonSizeV2 {
        SMALL = "sm",
        MEDIUM = "md",
        LARGE = "lg",
      }`,
      propDescription: "The size of the button",
      llmContext: "The size of the button",
      propDefault: "ButtonSizeV2.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "subType",
      propType: "ButtonSubTypeV2",
      typeDefinition: `enum ButtonSubTypeV2 {
        DEFAULT = "default",
        ICON_ONLY = "iconOnly",
        INLINE = "inline",
      }`,
      propDescription: "The subtype of the button",
      llmContext: "The subtype of the button",
      propDefault: "ButtonSubTypeV2.DEFAULT",
      category: "Appearance",
      required: false,
    },
    {
      propName: "text",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The text content of the button",
      llmContext: "The text content of the button",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "leadingIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon to display before the button text",
      llmContext: "Icon to display before the button text",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "trailingIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon to display after the button text",
      llmContext: "Icon to display after the button text",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the button is disabled",
      llmContext: "Whether the button is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "onClick",
      propType: "function",
      typeDefinition: "() => void",
      propDescription: "Callback function called when button is clicked",
      llmContext: "Callback function called when button is clicked",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "loading",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the button is in loading state",
      llmContext: "Whether the button is in loading state",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "buttonGroupPosition",
      propType: "'center' | 'left' | 'right'",
      typeDefinition: "'center' | 'left' | 'right'",
      propDescription: "Position of the button within a button group",
      llmContext: "Position of the button within a button group",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "fullWidth",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether the button should take full width of its container",
      llmContext: "Whether the button should take full width of its container",
      propDefault: "false",
      category: "Layout",
      required: false,
    },
    {
      propName: "justifyContent",
      propType: "CSSObject['justifyContent']",
      typeDefinition: "CSSObject['justifyContent']",
      propDescription:
        "CSS justify-content property for button content alignment",
      llmContext: "CSS justify-content property for button content alignment",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
  ],
};

export default buttonMeta;
