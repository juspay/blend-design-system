import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const buttongroupMeta: ComponentMeta = {
  componentName: "ButtonGroup",
  componentDescription:
    "A flexible button group component that organizes multiple buttons with intelligent styling modes, positioning, and layout options for cohesive user interfaces.",
  features: [
    "Multiple styling modes (single primary, all secondary, no transform)",
    "Stacked and inline layout options",
    "Automatic button positioning and styling",
    "Consistent sizing across all buttons",
    "Intelligent primary button detection",
    "Accessible group semantics",
    "Responsive design support",
    "Seamless button integration",
  ],
  usageExamples: [
    {
      title: "Basic Button Group",
      description: "Simple button group with single primary mode",
      code: `<ButtonGroup 
  mode={ButtonGroupMode.SINGLE_PRIMARY}
  size={ButtonSize.MEDIUM}
>
  <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
  <Button text="Save" buttonType={ButtonType.PRIMARY} />
  <Button text="Submit" buttonType={ButtonType.SECONDARY} />
</ButtonGroup>`,
    },
    {
      title: "All Secondary Mode",
      description: "Button group where all buttons are styled as secondary",
      code: `<ButtonGroup 
  mode={ButtonGroupMode.ALL_SECONDARY}
  isStacked={true}
>
  <Button text="Edit" />
  <Button text="Delete" />
  <Button text="Archive" />
</ButtonGroup>`,
    },
    {
      title: "Inline Button Group",
      description: "Non-stacked button group for horizontal layout",
      code: `<ButtonGroup 
  isStacked={false}
  mode={ButtonGroupMode.NO_TRANSFORM}
  size={ButtonSize.SMALL}
>
  <Button text="Previous" buttonType={ButtonType.SECONDARY} />
  <Button text="Next" buttonType={ButtonType.PRIMARY} />
</ButtonGroup>`,
    },
    {
      title: "Large Button Group",
      description: "Button group with large size and custom styling",
      code: `<ButtonGroup 
  size={ButtonSize.LARGE}
  mode={ButtonGroupMode.SINGLE_PRIMARY}
  isStacked={true}
>
  <Button text="Draft" buttonType={ButtonType.SECONDARY} />
  <Button text="Preview" buttonType={ButtonType.SECONDARY} />
  <Button text="Publish" buttonType={ButtonType.PRIMARY} />
</ButtonGroup>`,
    },
  ],
  props: [
    {
      propName: "size",
      propType: "ButtonSize",
      typeDefinition: `enum ButtonSize {
        SMALL = 'sm',
        MEDIUM = 'md',
        LARGE = 'lg',
      }`,
      propDescription: "Size applied to all buttons in the group",
      llmContext: "Size applied to all buttons in the group",
      propDefault: "ButtonSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "isStacked",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether buttons should be stacked with connected borders",
      llmContext: "Whether buttons should be stacked with connected borders",
      propDefault: "true",
      category: "Layout",
      required: false,
    },
    {
      propName: "mode",
      propType: "ButtonGroupMode",
      typeDefinition: `enum ButtonGroupMode {
        SINGLE_PRIMARY = "singlePrimary",
        ALL_SECONDARY = "allSecondary",
        NO_TRANSFORM = "noTransform"
      }`,
      propDescription:
        "Styling mode that determines how button types are transformed within the group",
      llmContext:
        "Styling mode that determines how button types are transformed within the group",
      propDefault: "ButtonGroupMode.SINGLE_PRIMARY",
      category: "Behavior",
      required: false,
    },
    {
      propName: "children",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Button components to be grouped together",
      llmContext: "Button components to be grouped together",
      propDefault: "-",
      category: "Content",
      required: true,
    },
  ],
};

export default buttongroupMeta;
