import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const buttonv2Meta: ComponentMeta = {
  componentName: "ButtonV2",
  componentDescription:
    "An enhanced button component with comprehensive styling options, multiple variants, loading states, and flexible layout configurations for modern user interfaces.",
  features: [
    "Four button types (primary, secondary, danger, success)",
    "Three sizes (small, medium, large)",
    "Multiple subtypes (default, icon-only, inline)",
    "Loading state with spinner",
    "Leading and trailing icon support",
    "Full width option",
    "Button group integration",
    "Disabled state handling",
    "Flexible content justification",
    "Accessible design",
  ],
  usageExamples: [
    {
      title: "Basic Button Types",
      description: "Different button types with text",
      code: `<ButtonV2 
  text="Primary Action" 
  buttonType={ButtonTypeV2.PRIMARY} 
  size={ButtonSizeV2.MEDIUM}
/>

<ButtonV2 
  text="Secondary Action" 
  buttonType={ButtonTypeV2.SECONDARY} 
/>

<ButtonV2 
  text="Delete Item" 
  buttonType={ButtonTypeV2.DANGER} 
/>`,
    },
    {
      title: "Buttons with Icons",
      description: "Buttons with leading and trailing icons",
      code: `<ButtonV2 
  text="Save Document" 
  buttonType={ButtonTypeV2.SUCCESS}
  leadingIcon={<SaveIcon />}
  size={ButtonSizeV2.LARGE}
/>

<ButtonV2 
  text="Download" 
  buttonType={ButtonTypeV2.SECONDARY}
  trailingIcon={<DownloadIcon />}
/>`,
    },
    {
      title: "Icon-Only and Loading States",
      description: "Icon-only buttons and loading state",
      code: `<ButtonV2 
  leadingIcon={<EditIcon />}
  subType={ButtonSubTypeV2.ICON_ONLY}
  buttonType={ButtonTypeV2.SECONDARY}
  size={ButtonSizeV2.SMALL}
/>

<ButtonV2 
  text="Processing..." 
  buttonType={ButtonTypeV2.PRIMARY}
  loading={true}
  disabled={true}
/>`,
    },
    {
      title: "Full Width and Inline Buttons",
      description: "Full width and inline button variants",
      code: `<ButtonV2 
  text="Full Width Button" 
  buttonType={ButtonTypeV2.PRIMARY}
  fullWidth={true}
  size={ButtonSizeV2.LARGE}
/>

<ButtonV2 
  text="Inline Link" 
  subType={ButtonSubTypeV2.INLINE}
  buttonType={ButtonTypeV2.SECONDARY}
  onClick={() => handleInlineAction()}
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
      propDescription: "The visual type/variant of the button",
      llmContext: "The visual type/variant of the button",
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
      propDescription: "The subtype that affects button styling and behavior",
      llmContext: "The subtype that affects button styling and behavior",
      propDefault: "ButtonSubTypeV2.DEFAULT",
      category: "Appearance",
      required: false,
    },
    {
      propName: "text",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The text content displayed in the button",
      llmContext: "The text content displayed in the button",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "leadingIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon element to display before the button text",
      llmContext: "Icon element to display before the button text",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "trailingIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon element to display after the button text",
      llmContext: "Icon element to display after the button text",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the button is disabled and non-interactive",
      llmContext: "Whether the button is disabled and non-interactive",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "onClick",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Callback function called when the button is clicked",
      llmContext: "Callback function called when the button is clicked",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "loading",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the button is in a loading state with spinner",
      llmContext: "Whether the button is in a loading state with spinner",
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
        "Whether the button should take the full width of its container",
      llmContext:
        "Whether the button should take the full width of its container",
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

export default buttonv2Meta;
