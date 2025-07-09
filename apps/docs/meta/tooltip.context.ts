import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const tooltipMeta: ComponentMeta = {
  componentName: "Tooltip",
  componentDescription:
    "A flexible tooltip component for displaying contextual information on hover or focus with customizable positioning, sizing, and content slots.",
  features: [
    "Multiple positioning options (top, right, bottom, left)",
    "Flexible alignment (start, center, end)",
    "Two sizes (small, large)",
    "Optional arrow indicator",
    "Custom content slots with directional placement",
    "Controlled and uncontrolled modes",
    "Customizable delay duration",
    "Offset positioning control",
    "Accessible design with proper ARIA attributes",
    "Keyboard navigation support",
  ],
  usageExamples: [
    {
      title: "Basic Tooltip",
      description: "Simple tooltip with text content",
      code: `<Tooltip content="This is a helpful tooltip">
  <Button>Hover me</Button>
</Tooltip>`,
    },
    {
      title: "Tooltip with Custom Positioning",
      description: "Tooltip with specific side and alignment",
      code: `<Tooltip 
  content="Positioned tooltip"
  side={TooltipSide.RIGHT}
  align={TooltipAlign.START}
  showArrow={true}
  size={TooltipSize.LARGE}
>
  <IconButton icon={<InfoIcon />} />
</Tooltip>`,
    },
    {
      title: "Tooltip with Rich Content",
      description: "Tooltip containing complex content and custom slot",
      code: `<Tooltip 
  content={
    <div>
      <strong>Pro Tip</strong>
      <p>Use keyboard shortcuts for faster navigation</p>
    </div>
  }
  slot={<Badge variant="info">New</Badge>}
  slotDirection={TooltipSlotDirection.RIGHT}
  delayDuration={500}
>
  <Button variant="secondary">Advanced Feature</Button>
</Tooltip>`,
    },
    {
      title: "Controlled Tooltip",
      description: "Tooltip with controlled open state",
      code: `const [isOpen, setIsOpen] = useState(false);

<Tooltip 
  content="Controlled tooltip content"
  open={isOpen}
  side={TooltipSide.BOTTOM}
  offset={10}
>
  <Button 
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
  >
    Controlled Tooltip
  </Button>
</Tooltip>`,
    },
  ],
  props: [
    {
      propName: "children",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "The trigger element that will show the tooltip on hover/focus",
      llmContext:
        "The trigger element that will show the tooltip on hover/focus",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "content",
      propType: "ReactNode | string",
      typeDefinition: "ReactNode | string",
      propDescription: "The content to display inside the tooltip",
      llmContext: "The content to display inside the tooltip",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "open",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Controlled open state of the tooltip",
      llmContext: "Controlled open state of the tooltip",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "side",
      propType: "TooltipSide",
      typeDefinition: `enum TooltipSide {
        TOP = "top",
        RIGHT = "right",
        LEFT = "left",
        BOTTOM = "bottom",
      }`,
      propDescription:
        "The side where the tooltip should appear relative to the trigger",
      llmContext:
        "The side where the tooltip should appear relative to the trigger",
      propDefault: "TooltipSide.TOP",
      category: "Layout",
      required: false,
    },
    {
      propName: "align",
      propType: "TooltipAlign",
      typeDefinition: `enum TooltipAlign {
        START = "start",
        END = "end",
        CENTER = "center",
      }`,
      propDescription: "The alignment of the tooltip relative to the trigger",
      llmContext: "The alignment of the tooltip relative to the trigger",
      propDefault: "TooltipAlign.CENTER",
      category: "Layout",
      required: false,
    },
    {
      propName: "showArrow",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to show an arrow pointing to the trigger element",
      llmContext: "Whether to show an arrow pointing to the trigger element",
      propDefault: "false",
      category: "Appearance",
      required: false,
    },
    {
      propName: "size",
      propType: "TooltipSize",
      typeDefinition: `enum TooltipSize {
        SMALL = "sm",
        LARGE = "lg",
      }`,
      propDescription: "Size variant of the tooltip",
      llmContext: "Size variant of the tooltip",
      propDefault: "TooltipSize.SMALL",
      category: "Appearance",
      required: false,
    },
    {
      propName: "slot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Additional content slot within the tooltip",
      llmContext: "Additional content slot within the tooltip",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "slotDirection",
      propType: "TooltipSlotDirection",
      typeDefinition: `enum TooltipSlotDirection {
        LEFT = "left",
        RIGHT = "right",
      }`,
      propDescription: "Direction of the slot content placement",
      llmContext: "Direction of the slot content placement",
      propDefault: "TooltipSlotDirection.RIGHT",
      category: "Layout",
      required: false,
    },
    {
      propName: "delayDuration",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Delay in milliseconds before the tooltip appears",
      llmContext: "Delay in milliseconds before the tooltip appears",
      propDefault: "700",
      category: "Behavior",
      required: false,
    },
    {
      propName: "offset",
      propType: "number",
      typeDefinition: "number",
      propDescription:
        "Distance in pixels between the tooltip and trigger element",
      llmContext: "Distance in pixels between the tooltip and trigger element",
      propDefault: "5",
      category: "Layout",
      required: false,
    },
  ],
};

export default tooltipMeta;
