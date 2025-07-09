import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const splittagMeta: ComponentMeta = {
  componentName: "SplitTag",
  componentDescription:
    "A tag component with split functionality, featuring a main content area and a separate action button for enhanced user interactions.",
  features: [
    "Split design with main content and action button",
    "Multiple size variants",
    "Color customization options",
    "Icon support for both sections",
    "Disabled state handling",
    "Click handlers for both sections",
    "Accessible keyboard navigation",
    "Custom styling support",
    "Flexible content layout",
    "Responsive design",
  ],
  usageExamples: [
    {
      title: "Basic Split Tag",
      description: "Simple split tag with text and action",
      code: `<SplitTag
  mainContent="JavaScript"
  onMainClick={() => console.log('Main clicked')}
  onActionClick={() => console.log('Action clicked')}
/>`,
    },
    {
      title: "Split Tag with Icons",
      description: "Split tag with icons in both sections",
      code: `<SplitTag
  mainContent="React"
  mainIcon={<ReactIcon />}
  actionIcon={<CloseIcon />}
  onMainClick={() => selectFramework('react')}
  onActionClick={() => removeFramework('react')}
/>`,
    },
    {
      title: "Colored Split Tag",
      description: "Split tag with custom colors",
      code: `<SplitTag
  mainContent="Premium User"
  backgroundColor="#ffd700"
  textColor="#000"
  actionBackgroundColor="#ff6b6b"
  onMainClick={() => viewProfile()}
  onActionClick={() => removeTag()}
/>`,
    },
    {
      title: "Large Split Tag with Custom Content",
      description: "Large split tag with complex content",
      code: `<SplitTag
  size={SplitTagSize.LARGE}
  mainContent={
    <div>
      <span>John Doe</span>
      <small>Administrator</small>
    </div>
  }
  actionIcon={<EditIcon />}
  onMainClick={() => viewUser('john-doe')}
  onActionClick={() => editUser('john-doe')}
  disabled={!canEdit}
/>`,
    },
  ],
  props: [
    {
      propName: "mainContent",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription:
        "Content to display in the main section of the split tag",
      llmContext: "Content to display in the main section of the split tag",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "onMainClick",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Click handler for the main section",
      llmContext: "Click handler for the main section",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "onActionClick",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Click handler for the action section",
      llmContext: "Click handler for the action section",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "mainIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon to display in the main section",
      llmContext: "Icon to display in the main section",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "actionIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon to display in the action section",
      llmContext: "Icon to display in the action section",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "size",
      propType: "SplitTagSize",
      typeDefinition: `enum SplitTagSize {
        SMALL = "small",
        MEDIUM = "medium",
        LARGE = "large",
      }`,
      propDescription: "Size variant of the split tag",
      llmContext: "Size variant of the split tag",
      propDefault: "SplitTagSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "backgroundColor",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Background color for the main section",
      llmContext: "Background color for the main section",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "textColor",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Text color for the main section",
      llmContext: "Text color for the main section",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "actionBackgroundColor",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Background color for the action section",
      llmContext: "Background color for the action section",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the split tag is disabled",
      llmContext: "Whether the split tag is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "className",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional CSS class names",
      llmContext: "Additional CSS class names",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
  ],
};

export default splittagMeta;
