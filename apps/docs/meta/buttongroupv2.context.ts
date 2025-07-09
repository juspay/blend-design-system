import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const buttongroupv2Meta: ComponentMeta = {
  componentName: "ButtonGroupV2",
  componentDescription:
    "A streamlined button group component designed specifically for ButtonV2 components, providing flexible layout options with stacked and inline arrangements.",
  features: [
    "Optimized for ButtonV2 components",
    "Stacked and inline layout modes",
    "Automatic button positioning",
    "Seamless button integration",
    "Flexible gap management",
    "Simple and lightweight design",
    "Responsive layout support",
  ],
  usageExamples: [
    {
      title: "Inline Button Group",
      description: "Simple inline button group with spacing",
      code: `<ButtonGroupV2 stacked={false}>
  <ButtonV2 
    text="Cancel" 
    buttonType={ButtonTypeV2.SECONDARY} 
  />
  <ButtonV2 
    text="Save" 
    buttonType={ButtonTypeV2.PRIMARY} 
  />
</ButtonGroupV2>`,
    },
    {
      title: "Stacked Button Group",
      description: "Connected buttons with no gaps between them",
      code: `<ButtonGroupV2 stacked={true}>
  <ButtonV2 
    text="Edit" 
    buttonType={ButtonTypeV2.SECONDARY} 
  />
  <ButtonV2 
    text="Delete" 
    buttonType={ButtonTypeV2.DANGER} 
  />
  <ButtonV2 
    text="Archive" 
    buttonType={ButtonTypeV2.SECONDARY} 
  />
</ButtonGroupV2>`,
    },
    {
      title: "Action Button Group",
      description: "Multiple action buttons with different types",
      code: `<ButtonGroupV2 stacked={false}>
  <ButtonV2 
    text="Previous" 
    buttonType={ButtonTypeV2.SECONDARY}
    leadingIcon={<ChevronLeftIcon />}
  />
  <ButtonV2 
    text="Next" 
    buttonType={ButtonTypeV2.PRIMARY}
    trailingIcon={<ChevronRightIcon />}
  />
</ButtonGroupV2>`,
    },
    {
      title: "Form Button Group",
      description: "Form action buttons in stacked layout",
      code: `<ButtonGroupV2 stacked={true}>
  <ButtonV2 
    text="Reset" 
    buttonType={ButtonTypeV2.SECONDARY}
    size={ButtonSizeV2.LARGE}
  />
  <ButtonV2 
    text="Submit" 
    buttonType={ButtonTypeV2.SUCCESS}
    size={ButtonSizeV2.LARGE}
  />
</ButtonGroupV2>`,
    },
  ],
  props: [
    {
      propName: "stacked",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether buttons should be stacked together with no gaps (true) or spaced apart (false)",
      llmContext:
        "Whether buttons should be stacked together with no gaps (true) or spaced apart (false)",
      propDefault: "false",
      category: "Layout",
      required: false,
    },
    {
      propName: "children",
      propType: "ReactElement<ButtonV2Props> | ReactElement<ButtonV2Props>[]",
      typeDefinition:
        "ReactElement<ButtonV2Props> | ReactElement<ButtonV2Props>[]",
      propDescription: "ButtonV2 components to be grouped together",
      llmContext: "ButtonV2 components to be grouped together",
      propDefault: "-",
      category: "Content",
      required: true,
    },
  ],
};

export default buttongroupv2Meta;
