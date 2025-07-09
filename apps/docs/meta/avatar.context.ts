import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const avatarMeta: ComponentMeta = {
  componentName: "Avatar",
  componentDescription:
    "A flexible avatar component for displaying user profile images with automatic fallback to initials, multiple sizes and shapes, and online status indicators.",
  features: [
    "Multiple sizes (small, medium, large, extra large)",
    "Two shape variants (circular, rounded)",
    "Automatic fallback to initials when image fails",
    "Online status indicator support",
    "Custom fallback content support",
    "Leading and trailing slot support",
    "Accessible design with screen reader support",
    "Error handling for broken images",
    "Responsive sizing",
  ],
  usageExamples: [
    {
      title: "Basic Avatar with Image",
      description: "Simple avatar with user image and alt text",
      code: `<Avatar 
  src="/user-profile.jpg" 
  alt="John Doe" 
  size={AvatarSize.MD} 
/>`,
    },
    {
      title: "Avatar with Fallback Initials",
      description: "Avatar that shows initials when image is not available",
      code: `<Avatar 
  alt="Jane Smith" 
  size={AvatarSize.LG}
  shape={AvatarShape.ROUNDED}
/>`,
    },
    {
      title: "Avatar with Online Status",
      description: "Avatar displaying online status indicator",
      code: `<Avatar 
  src="/user-avatar.jpg"
  alt="Alex Johnson"
  size={AvatarSize.XL}
  online={true}
/>`,
    },
    {
      title: "Avatar with Custom Slots",
      description: "Avatar with leading and trailing content slots",
      code: `<Avatar 
  src="/profile.jpg"
  alt="Sarah Wilson"
  size={AvatarSize.MD}
  leadingSlot={<Badge variant="success">Pro</Badge>}
  trailingSlot={<Button size="sm" variant="ghost"><EditIcon /></Button>}
/>`,
    },
  ],
  props: [
    {
      propName: "src",
      propType: "string",
      typeDefinition: "string",
      propDescription: "URL of the avatar image to display",
      llmContext: "URL of the avatar image to display",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "alt",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "Alternative text for the avatar image and fallback initials generation",
      llmContext:
        "Alternative text for the avatar image and fallback initials generation",
      propDefault: "''",
      category: "Content",
      required: false,
    },
    {
      propName: "fallback",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Custom fallback content when image is not available",
      llmContext: "Custom fallback content when image is not available",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "size",
      propType: "AvatarSize",
      typeDefinition: `enum AvatarSize {
        SM = 'sm',
        MD = 'md',
        LG = 'lg',
        XL = 'xl'
      }`,
      propDescription: "Size variant of the avatar",
      llmContext: "Size variant of the avatar",
      propDefault: "AvatarSize.MD",
      category: "Appearance",
      required: false,
    },
    {
      propName: "shape",
      propType: "AvatarShape",
      typeDefinition: `enum AvatarShape {
        CIRCULAR = 'circular',
        ROUNDED = 'rounded'
      }`,
      propDescription: "Shape variant of the avatar",
      llmContext: "Shape variant of the avatar",
      propDefault: "AvatarShape.CIRCULAR",
      category: "Appearance",
      required: false,
    },
    {
      propName: "online",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to show online status indicator",
      llmContext: "Whether to show online status indicator",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "leadingSlot",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Custom content to display before the avatar",
      llmContext: "Custom content to display before the avatar",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "trailingSlot",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Custom content to display after the avatar",
      llmContext: "Custom content to display after the avatar",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
  ],
};

export default avatarMeta;
