import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const avatargroupMeta: ComponentMeta = {
  componentName: "AvatarGroup",
  componentDescription:
    "A sophisticated avatar group component that displays multiple user avatars with overflow handling, selection capabilities, and an interactive menu for managing large sets of users.",
  features: [
    "Configurable maximum visible avatar count",
    "Overflow counter with expandable menu",
    "Multi-selection support with visual feedback",
    "Search functionality within overflow menu",
    "Multiple sizes and shapes (inherited from Avatar)",
    "Accessible keyboard navigation",
    "Click outside to close menu",
    "Responsive positioning",
    "Screen reader support",
  ],
  usageExamples: [
    {
      title: "Basic Avatar Group",
      description: "Simple avatar group with default settings",
      code: `<AvatarGroup 
  avatars={[
    { id: 1, src: "/user1.jpg", alt: "John Doe" },
    { id: 2, src: "/user2.jpg", alt: "Jane Smith" },
    { id: 3, src: "/user3.jpg", alt: "Bob Johnson" },
    { id: 4, alt: "Alice Brown" },
    { id: 5, alt: "Charlie Wilson" }
  ]}
  maxCount={3}
/>`,
    },
    {
      title: "Avatar Group with Selection",
      description: "Avatar group with controlled selection state",
      code: `const [selectedIds, setSelectedIds] = useState([1, 3]);

<AvatarGroup 
  avatars={teamMembers}
  maxCount={4}
  size={AvatarSize.LG}
  selectedAvatarIds={selectedIds}
  onSelectionChange={setSelectedIds}
/>`,
    },
    {
      title: "Rounded Avatar Group",
      description: "Avatar group with rounded square avatars",
      code: `<AvatarGroup 
  avatars={[
    { id: "user1", src: "/avatar1.jpg", alt: "Team Lead" },
    { id: "user2", src: "/avatar2.jpg", alt: "Developer" },
    { id: "user3", src: "/avatar3.jpg", alt: "Designer" },
    { id: "user4", alt: "Product Manager" },
    { id: "user5", alt: "QA Engineer" },
    { id: "user6", alt: "DevOps" }
  ]}
  maxCount={3}
  size={AvatarSize.MD}
  shape={AvatarShape.ROUNDED}
/>`,
    },
    {
      title: "Large Team Avatar Group",
      description: "Avatar group for displaying large teams with overflow",
      code: `<AvatarGroup 
  avatars={allTeamMembers} // Array of 20+ members
  maxCount={5}
  size={AvatarSize.SM}
  selectedAvatarIds={selectedMembers}
  onSelectionChange={handleMemberSelection}
/>`,
    },
  ],
  props: [
    {
      propName: "avatars",
      propType: "AvatarData[]",
      typeDefinition: `type AvatarData = {
        id: string | number;
        src?: string;
        alt?: string;
        fallback?: string | React.ReactNode;
        online?: boolean;
        leadingSlot?: React.ReactNode;
        trailingSlot?: React.ReactNode;
      }`,
      propDescription: "Array of avatar data objects to display in the group",
      llmContext: "Array of avatar data objects to display in the group",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "maxCount",
      propType: "number",
      typeDefinition: "number",
      propDescription:
        "Maximum number of avatars to display before showing overflow counter",
      llmContext:
        "Maximum number of avatars to display before showing overflow counter",
      propDefault: "5",
      category: "Layout",
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
      propDescription: "Size of all avatars in the group",
      llmContext: "Size of all avatars in the group",
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
      propDescription: "Shape of all avatars in the group",
      llmContext: "Shape of all avatars in the group",
      propDefault: "AvatarShape.CIRCULAR",
      category: "Appearance",
      required: false,
    },
    {
      propName: "selectedAvatarIds",
      propType: "(string | number)[]",
      typeDefinition: "(string | number)[]",
      propDescription: "Array of selected avatar IDs for controlled selection",
      llmContext: "Array of selected avatar IDs for controlled selection",
      propDefault: "[]",
      category: "State",
      required: false,
    },
    {
      propName: "onSelectionChange",
      propType: "(selectedIds: (string | number)[]) => void",
      typeDefinition: "(selectedIds: (string | number)[]) => void",
      propDescription: "Callback fired when avatar selection changes",
      llmContext: "Callback fired when avatar selection changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "id",
      propType: "string | number",
      typeDefinition: "string | number",
      propDescription: "Unique identifier for the avatar (AvatarData property)",
      llmContext: "Unique identifier for the avatar (AvatarData property)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "src",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Image source URL for the avatar (AvatarData property)",
      llmContext: "Image source URL for the avatar (AvatarData property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "alt",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "Alternative text for the avatar image (AvatarData property)",
      llmContext: "Alternative text for the avatar image (AvatarData property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "fallback",
      propType: "string | React.ReactNode",
      typeDefinition: "string | React.ReactNode",
      propDescription:
        "Fallback content when image is not available (AvatarData property)",
      llmContext:
        "Fallback content when image is not available (AvatarData property)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
  ],
};

export default avatargroupMeta;
