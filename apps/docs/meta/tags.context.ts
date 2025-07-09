import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const tagsMeta: ComponentMeta = {
  componentName: "Tags",
  componentDescription:
    "A versatile tag component for displaying labels, categories, or status indicators with multiple variants, sizes, and interactive capabilities.",
  features: [
    "Multiple visual variants (solid, outline, ghost)",
    "Various size options (small, medium, large)",
    "Color customization support",
    "Icon integration (leading and trailing)",
    "Removable tags with close functionality",
    "Disabled state handling",
    "Click event handling",
    "Custom styling options",
    "Accessible keyboard navigation",
    "Responsive design",
  ],
  usageExamples: [
    {
      title: "Basic Tags",
      description: "Simple tags with different variants",
      code: `<div className="flex gap-2">
  <Tags variant={TagVariant.SOLID} color="blue">
    React
  </Tags>
  <Tags variant={TagVariant.OUTLINE} color="green">
    TypeScript
  </Tags>
  <Tags variant={TagVariant.GHOST} color="purple">
    Next.js
  </Tags>
</div>`,
    },
    {
      title: "Tags with Icons",
      description: "Tags with leading and trailing icons",
      code: `<div className="flex gap-2">
  <Tags 
    leadingIcon={<StarIcon />}
    color="yellow"
  >
    Featured
  </Tags>
  <Tags 
    trailingIcon={<ArrowRightIcon />}
    color="blue"
    onClick={() => navigate('/details')}
  >
    View Details
  </Tags>
</div>`,
    },
    {
      title: "Removable Tags",
      description: "Tags with remove functionality",
      code: `const [tags, setTags] = useState(['React', 'Vue', 'Angular']);

const removeTag = (tagToRemove) => {
  setTags(tags.filter(tag => tag !== tagToRemove));
};

<div className="flex gap-2">
  {tags.map(tag => (
    <Tags
      key={tag}
      removable
      onRemove={() => removeTag(tag)}
      color="gray"
    >
      {tag}
    </Tags>
  ))}
</div>`,
    },
    {
      title: "Different Sizes and States",
      description: "Tags with various sizes and states",
      code: `<div className="space-y-4">
  <div className="flex gap-2 items-center">
    <Tags size={TagSize.SMALL} color="red">Small</Tags>
    <Tags size={TagSize.MEDIUM} color="blue">Medium</Tags>
    <Tags size={TagSize.LARGE} color="green">Large</Tags>
  </div>
  
  <div className="flex gap-2">
    <Tags color="orange">Active</Tags>
    <Tags disabled color="gray">Disabled</Tags>
    <Tags loading color="purple">Loading</Tags>
  </div>
</div>`,
    },
  ],
  props: [
    {
      propName: "children",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Content to display inside the tag",
      llmContext: "Content to display inside the tag",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "variant",
      propType: "TagVariant",
      typeDefinition: `enum TagVariant {
        SOLID = "solid",
        OUTLINE = "outline",
        GHOST = "ghost",
      }`,
      propDescription: "Visual variant of the tag",
      llmContext: "Visual variant of the tag",
      propDefault: "TagVariant.SOLID",
      category: "Appearance",
      required: false,
    },
    {
      propName: "size",
      propType: "TagSize",
      typeDefinition: `enum TagSize {
        SMALL = "small",
        MEDIUM = "medium",
        LARGE = "large",
      }`,
      propDescription: "Size variant of the tag",
      llmContext: "Size variant of the tag",
      propDefault: "TagSize.MEDIUM",
      category: "Appearance",
      required: false,
    },
    {
      propName: "color",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Color theme for the tag",
      llmContext: "Color theme for the tag",
      propDefault: "'gray'",
      category: "Styling",
      required: false,
    },
    {
      propName: "leadingIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon to display before the tag content",
      llmContext: "Icon to display before the tag content",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "trailingIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon to display after the tag content",
      llmContext: "Icon to display after the tag content",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "removable",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the tag can be removed (shows close button)",
      llmContext: "Whether the tag can be removed (shows close button)",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
    {
      propName: "onRemove",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Callback fired when the remove button is clicked",
      llmContext: "Callback fired when the remove button is clicked",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "onClick",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Callback fired when the tag is clicked",
      llmContext: "Callback fired when the tag is clicked",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "disabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the tag is disabled",
      llmContext: "Whether the tag is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "loading",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the tag is in loading state",
      llmContext: "Whether the tag is in loading state",
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

export default tagsMeta;
