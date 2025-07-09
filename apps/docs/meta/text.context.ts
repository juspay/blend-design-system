import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const textMeta: ComponentMeta = {
  componentName: "Text",
  componentDescription:
    "A versatile text component with semantic HTML support, typography variants, and comprehensive styling options for consistent text rendering across the design system.",
  features: [
    "Multiple typography variants (body, display, heading, code)",
    "Semantic HTML tag support (p, h1-h5, span, code, etc.)",
    "Automatic semantic tag selection based on variant",
    "Custom font size and weight overrides",
    "Color customization support",
    "Text truncation capabilities",
    "Responsive typography scaling",
    "Accessible markup generation",
    "Custom styling support",
  ],
  usageExamples: [
    {
      title: "Basic Text with Variants",
      description: "Text using different typography variants",
      code: `<Text variant="body.md">
  This is body text in medium size.
</Text>

<Text variant="heading.lg">
  This is a large heading
</Text>

<Text variant="code.sm">
  console.log('Hello World');
</Text>`,
    },
    {
      title: "Custom Semantic Tags",
      description: "Text with explicit semantic HTML tags",
      code: `<Text variant="heading.xl" as="h1">
  Main Page Title
</Text>

<Text variant="body.sm" as="span" color="gray.600">
  Subtitle or description text
</Text>

<Text as="label" fontWeight={600}>
  Form Label
</Text>`,
    },
    {
      title: "Text with Custom Styling",
      description: "Text with custom colors, weights, and truncation",
      code: `<Text 
  variant="body.lg"
  color="primary.500"
  fontWeight={700}
  truncate={true}
  style={{ maxWidth: '200px' }}
>
  This text will be truncated if it's too long
</Text>`,
    },
    {
      title: "Display and Heading Variants",
      description: "Large display text and various heading sizes",
      code: `<Text variant="display.xl">
  Hero Display Text
</Text>

<Text variant="heading.2xl">
  Section Title
</Text>

<Text variant="heading.md" color="gray.700">
  Subsection Heading
</Text>`,
    },
  ],
  props: [
    {
      propName: "children",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "The text content to display",
      llmContext: "The text content to display",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "variant",
      propType: "VariantType",
      typeDefinition: `type VariantType = 
  | "body.xs" | "body.sm" | "body.md" | "body.lg"
  | "display.sm" | "display.md" | "display.lg" | "display.xl"
  | "heading.sm" | "heading.md" | "heading.lg" | "heading.xl" | "heading.2xl"
  | "code.sm" | "code.md" | "code.lg"`,
      propDescription:
        "Typography variant that determines font size and semantic meaning",
      llmContext:
        "Typography variant that determines font size and semantic meaning",
      propDefault: "undefined",
      category: "Appearance",
      required: false,
    },
    {
      propName: "as",
      propType: "SemanticTagType",
      typeDefinition: `type SemanticTagType = 
  | "p" | "h1" | "h2" | "h3" | "h4" | "h5" 
  | "span" | "code" | "q" | "small" | "label"`,
      propDescription:
        "HTML semantic tag to render (overrides automatic tag selection)",
      llmContext:
        "HTML semantic tag to render (overrides automatic tag selection)",
      propDefault: "auto-selected based on variant",
      category: "Content",
      required: false,
    },
    {
      propName: "color",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Text color (supports theme color tokens)",
      llmContext: "Text color (supports theme color tokens)",
      propDefault: "inherit",
      category: "Appearance",
      required: false,
    },
    {
      propName: "fontWeight",
      propType: "number | string",
      typeDefinition: "number | string",
      propDescription: "Font weight override",
      llmContext: "Font weight override",
      propDefault: "undefined",
      category: "Appearance",
      required: false,
    },
    {
      propName: "fontSize",
      propType: "number | string",
      typeDefinition: "number | string",
      propDescription: "Font size override (bypasses variant sizing)",
      llmContext: "Font size override (bypasses variant sizing)",
      propDefault: "undefined",
      category: "Appearance",
      required: false,
    },
    {
      propName: "truncate",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to truncate text with ellipsis when it overflows",
      llmContext: "Whether to truncate text with ellipsis when it overflows",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
    {
      propName: "style",
      propType: "React.CSSProperties",
      typeDefinition: "React.CSSProperties",
      propDescription: "Custom CSS styles to apply to the text element",
      llmContext: "Custom CSS styles to apply to the text element",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
  ],
};

export default textMeta;
