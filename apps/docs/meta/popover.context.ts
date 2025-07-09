import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const popoverMeta: ComponentMeta = {
  componentName: "Popover",
  componentDescription:
    "A flexible popover component for displaying contextual content in an overlay with customizable positioning, sizing, and action buttons for rich interactive experiences.",
  features: [
    "Controlled and uncontrolled open state",
    "Flexible positioning (top, right, bottom, left)",
    "Customizable alignment (start, center, end)",
    "Two sizes (small, medium)",
    "Primary and secondary action buttons",
    "Optional close button",
    "Modal mode for mobile devices",
    "Customizable dimensions and offsets",
    "Z-index control for layering",
    "Rich content support with heading and description",
  ],
  usageExamples: [
    {
      title: "Basic Popover",
      description: "Simple popover with heading and content",
      code: `<Popover
  trigger={<Button text="Show Info" />}
  heading="User Information"
  description="Additional details about the user"
>
  <div>
    <p>This is the popover content area.</p>
    <p>You can put any React content here.</p>
  </div>
</Popover>`,
    },
    {
      title: "Popover with Actions",
      description: "Popover with primary and secondary action buttons",
      code: `<Popover
  trigger={<Button text="Confirm Action" />}
  heading="Confirm Deletion"
  description="This action cannot be undone"
  primaryAction={{
    text: "Delete",
    buttonType: ButtonTypeV2.DANGER,
    onClick: () => handleDelete()
  }}
  secondaryAction={{
    text: "Cancel",
    buttonType: ButtonTypeV2.SECONDARY,
    onClick: () => handleCancel()
  }}
  showCloseButton={true}
>
  <p>Are you sure you want to delete this item?</p>
</Popover>`,
    },
    {
      title: "Controlled Popover with Custom Positioning",
      description: "Popover with controlled state and custom positioning",
      code: `const [isOpen, setIsOpen] = useState(false);

<Popover
  trigger={<IconButton icon={<InfoIcon />} />}
  open={isOpen}
  onOpenChange={setIsOpen}
  heading="Help Information"
  side="top"
  align="start"
  sideOffset={10}
  size={PopoverSize.LARGE}
  maxWidth={400}
>
  <div>
    <h4>Quick Tips</h4>
    <ul>
      <li>Use keyboard shortcuts for faster navigation</li>
      <li>Right-click for context menus</li>
      <li>Drag and drop to reorder items</li>
    </ul>
  </div>
</Popover>`,
    },
    {
      title: "Mobile Modal Popover",
      description: "Popover that becomes a modal on mobile devices",
      code: `<Popover
  trigger={<Button text="Settings" />}
  heading="User Settings"
  description="Manage your account preferences"
  asModal={true}
  size={PopoverSize.MEDIUM}
  primaryAction={{
    text: "Save Changes",
    buttonType: ButtonTypeV2.PRIMARY,
    onClick: () => saveSettings()
  }}
  onClose={() => handleClose()}
>
  <div className="settings-form">
    <Switch label="Email notifications" />
    <Switch label="Push notifications" />
    <TextInput label="Display name" />
  </div>
</Popover>`,
    },
  ],
  props: [
    {
      propName: "trigger",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription:
        "The trigger element that opens the popover when clicked",
      llmContext: "The trigger element that opens the popover when clicked",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "children",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "The content to be displayed inside the popover",
      llmContext: "The content to be displayed inside the popover",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "heading",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The heading text displayed at the top of the popover",
      llmContext: "The heading text displayed at the top of the popover",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "description",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The description text displayed below the heading",
      llmContext: "The description text displayed below the heading",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "open",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Controlled open state of the popover",
      llmContext: "Controlled open state of the popover",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "onOpenChange",
      propType: "(open: boolean) => void",
      typeDefinition: "(open: boolean) => void",
      propDescription: "Callback fired when the popover open state changes",
      llmContext: "Callback fired when the popover open state changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "onClose",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Callback fired when the popover is closed",
      llmContext: "Callback fired when the popover is closed",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "showCloseButton",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to show the close button in the popover header",
      llmContext: "Whether to show the close button in the popover header",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
    {
      propName: "primaryAction",
      propType: "PopoverActionType",
      typeDefinition: `type PopoverActionType = Omit<ButtonV2Props, "buttonGroupPosition" | "subType">`,
      propDescription: "Configuration for the primary action button",
      llmContext: "Configuration for the primary action button",
      propDefault: "undefined",
      category: "Actions",
      required: false,
    },
    {
      propName: "secondaryAction",
      propType: "PopoverActionType",
      typeDefinition: `type PopoverActionType = Omit<ButtonV2Props, "buttonGroupPosition" | "subType">`,
      propDescription: "Configuration for the secondary action button",
      llmContext: "Configuration for the secondary action button",
      propDefault: "undefined",
      category: "Actions",
      required: false,
    },
    {
      propName: "size",
      propType: "PopoverSize",
      typeDefinition: `enum PopoverSize {
        SMALL = "small",
        MEDIUM = "medium",
      }`,
      propDescription: "Size variant of the popover",
      llmContext: "Size variant of the popover",
      propDefault: "PopoverSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "side",
      propType: "'top' | 'right' | 'bottom' | 'left'",
      typeDefinition: "'top' | 'right' | 'bottom' | 'left'",
      propDescription:
        "Side where the popover should appear relative to the trigger",
      llmContext:
        "Side where the popover should appear relative to the trigger",
      propDefault: "'bottom'",
      category: "Layout",
      required: false,
    },
    {
      propName: "align",
      propType: "'start' | 'center' | 'end'",
      typeDefinition: "'start' | 'center' | 'end'",
      propDescription: "Alignment of the popover relative to the trigger",
      llmContext: "Alignment of the popover relative to the trigger",
      propDefault: "'center'",
      category: "Layout",
      required: false,
    },
    {
      propName: "sideOffset",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Distance in pixels between the popover and trigger",
      llmContext: "Distance in pixels between the popover and trigger",
      propDefault: "5",
      category: "Layout",
      required: false,
    },
    {
      propName: "alignOffset",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Offset in pixels for popover alignment",
      llmContext: "Offset in pixels for popover alignment",
      propDefault: "0",
      category: "Layout",
      required: false,
    },
    {
      propName: "width",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Fixed width of the popover in pixels",
      llmContext: "Fixed width of the popover in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "minWidth",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Minimum width of the popover in pixels",
      llmContext: "Minimum width of the popover in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "maxWidth",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Maximum width of the popover in pixels",
      llmContext: "Maximum width of the popover in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "height",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Fixed height of the popover in pixels",
      llmContext: "Fixed height of the popover in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "minHeight",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Minimum height of the popover in pixels",
      llmContext: "Minimum height of the popover in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "maxHeight",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Maximum height of the popover in pixels",
      llmContext: "Maximum height of the popover in pixels",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "zIndex",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Z-index value for the popover layering",
      llmContext: "Z-index value for the popover layering",
      propDefault: "undefined",
      category: "Layout",
      required: false,
    },
    {
      propName: "asModal",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to render the popover as a modal on mobile devices",
      llmContext: "Whether to render the popover as a modal on mobile devices",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
  ],
};

export default popoverMeta;
