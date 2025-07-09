import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { AvatarGroup, AvatarSize, AvatarShape } from "blend-v1";
import { User, Star, Crown, Shield, Heart, Zap } from "lucide-react";

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible avatar group component for displaying multiple user avatars with overflow handling, selection support, and search functionality.

## Features
- Display multiple avatars in a compact group
- Configurable maximum visible avatars with overflow counter
- Interactive selection support with callbacks
- Search functionality in overflow menu
- Multiple sizes (Small, Medium, Large, Extra Large)
- Two shape variants (Circular, Rounded)
- Automatic fallback to initials when images fail
- Accessible design with keyboard navigation
- Smooth animations and hover effects

## Usage

\`\`\`tsx
import { AvatarGroup, AvatarSize, AvatarShape } from 'blend-v1';

const avatars = [
  { id: 1, src: "/user1.jpg", alt: "John Doe" },
  { id: 2, src: "/user2.jpg", alt: "Jane Smith" },
  // ... more avatars
];

<AvatarGroup 
  avatars={avatars}
  maxCount={5}
  size={AvatarSize.MD}
  shape={AvatarShape.CIRCULAR}
  onSelectionChange={(selectedIds) => console.log(selectedIds)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    avatars: {
      control: "object",
      description: "Array of avatar data objects with id, src, alt, and optional fallback",
    },
    maxCount: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum number of avatars to display before showing overflow",
    },
    size: {
      control: "select",
      options: Object.values(AvatarSize),
      description: "Size variant for all avatars in the group",
    },
    shape: {
      control: "select",
      options: Object.values(AvatarShape),
      description: "Shape variant for all avatars in the group",
    },
    selectedAvatarIds: {
      control: "object",
      description: "Array of selected avatar IDs for controlled selection",
    },
    onSelectionChange: {
      action: "selectionChanged",
      description: "Callback fired when avatar selection changes",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        minHeight: "400px", 
        display: "flex", 
        alignItems: "flex-start", 
        justifyContent: "center",
        paddingTop: "50px"
      }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

// Sample avatar data
const sampleAvatars = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    alt: "John Doe",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    alt: "Jane Smith",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    alt: "Mike Johnson",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=32&h=32&fit=crop&crop=face",
    alt: "Sarah Wilson",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    alt: "David Brown",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    alt: "Emma Davis",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face",
    alt: "Lisa Chen",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
    alt: "Robert Taylor",
  },
];

// Default story
export const Default: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 5),
    maxCount: 3,
    size: AvatarSize.MD,
    shape: AvatarShape.CIRCULAR,
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Small (24px)
        </h4>
        <AvatarGroup
          avatars={sampleAvatars}
          maxCount={5}
          size={AvatarSize.SM}
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Medium (32px)
        </h4>
        <AvatarGroup
          avatars={sampleAvatars}
          maxCount={5}
          size={AvatarSize.MD}
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Large (40px)
        </h4>
        <AvatarGroup
          avatars={sampleAvatars}
          maxCount={5}
          size={AvatarSize.LG}
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Extra Large (48px)
        </h4>
        <AvatarGroup
          avatars={sampleAvatars}
          maxCount={5}
          size={AvatarSize.XL}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatar groups in different sizes to match various UI contexts.",
      },
    },
  },
};

// Different shapes
export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Circular
        </h4>
        <AvatarGroup
          avatars={sampleAvatars}
          maxCount={5}
          size={AvatarSize.LG}
          shape={AvatarShape.CIRCULAR}
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Rounded
        </h4>
        <AvatarGroup
          avatars={sampleAvatars}
          maxCount={5}
          size={AvatarSize.LG}
          shape={AvatarShape.ROUNDED}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatar groups with different shape variants.",
      },
    },
  },
};

// Different max counts
export const MaxCountVariations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Max Count: 1
        </h4>
        <AvatarGroup avatars={sampleAvatars} maxCount={1} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Max Count: 3
        </h4>
        <AvatarGroup avatars={sampleAvatars} maxCount={3} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Max Count: 5
        </h4>
        <AvatarGroup avatars={sampleAvatars} maxCount={5} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Max Count: 10 (All visible)
        </h4>
        <AvatarGroup avatars={sampleAvatars} maxCount={10} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different maximum visible avatar counts with overflow handling.",
      },
    },
  },
};

// With selection
export const WithSelection: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([1, 3]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <AvatarGroup
          avatars={sampleAvatars}
          maxCount={5}
          size={AvatarSize.LG}
          selectedAvatarIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <div style={{ fontSize: "14px", color: "#666" }}>
          Selected IDs: {selectedIds.length > 0 ? selectedIds.join(", ") : "None"}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar group with selection support. Click avatars to select/deselect them.",
      },
    },
  },
};

// With fallback avatars
export const WithFallbacks: Story = {
  render: () => {
    const avatarsWithFallbacks = [
      { id: 1, alt: "John Doe" },
      { id: 2, alt: "Jane Smith" },
      { id: 3, alt: "Mike Johnson", fallback: <User size={20} /> },
      { id: 4, alt: "Sarah Wilson", fallback: "SW" },
      { id: 5, alt: "David Brown", fallback: <Star size={20} /> },
      { id: 6, alt: "Emma Davis" },
      { id: 7, alt: "Lisa Chen", fallback: <Crown size={20} /> },
      { id: 8, alt: "Robert Taylor" },
    ];

    return (
      <AvatarGroup
        avatars={avatarsWithFallbacks}
        maxCount={5}
        size={AvatarSize.LG}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar group with various fallback options including initials and custom icons.",
      },
    },
  },
};

// Large group with overflow
export const LargeGroup: Story = {
  render: () => {
    const largeAvatarList = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      src: i % 3 === 0 ? undefined : `https://i.pravatar.cc/150?img=${i + 1}`,
      alt: `User ${i + 1}`,
    }));

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
            20 users, showing 5
          </h4>
          <AvatarGroup
            avatars={largeAvatarList}
            maxCount={5}
            size={AvatarSize.MD}
          />
        </div>
        <div style={{ fontSize: "12px", color: "#666" }}>
          Click the +15 counter to see all users and search functionality
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Large avatar group demonstrating overflow menu with search functionality.",
      },
    },
  },
};

// Mixed content with icons
export const MixedContent: Story = {
  render: () => {
    const mixedAvatars = [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        alt: "John Doe",
      },
      { id: 2, alt: "System User", fallback: <Shield size={20} /> },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        alt: "Jane Smith",
      },
      { id: 4, alt: "Bot User", fallback: <Zap size={20} /> },
      { id: 5, alt: "Guest User", fallback: "?" },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        alt: "Mike Johnson",
      },
      { id: 7, alt: "Premium User", fallback: <Crown size={20} /> },
      { id: 8, alt: "Support", fallback: <Heart size={20} /> },
    ];

    return (
      <AvatarGroup
        avatars={mixedAvatars}
        maxCount={5}
        size={AvatarSize.LG}
        shape={AvatarShape.ROUNDED}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar group mixing real user images with system icons and special users.",
      },
    },
  },
};

// Interactive example
export const InteractiveExample: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [maxCount, setMaxCount] = useState(5);
    const [size, setSize] = useState(AvatarSize.MD);
    const [shape, setShape] = useState(AvatarShape.CIRCULAR);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#666" }}>
              Max Count:
              <input
                type="number"
                min="1"
                max="10"
                value={maxCount}
                onChange={(e) => setMaxCount(Number(e.target.value))}
                style={{
                  marginLeft: "8px",
                  width: "60px",
                  padding: "4px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#666" }}>
              Size:
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as AvatarSize)}
                style={{
                  marginLeft: "8px",
                  padding: "4px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                {Object.values(AvatarSize).map((s) => (
                  <option key={s} value={s}>
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#666" }}>
              Shape:
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value as AvatarShape)}
                style={{
                  marginLeft: "8px",
                  padding: "4px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                {Object.values(AvatarShape).map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <AvatarGroup
          avatars={sampleAvatars}
          maxCount={maxCount}
          size={size}
          shape={shape}
          selectedAvatarIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />

        <div style={{ fontSize: "14px", color: "#666" }}>
          <div>Selected: {selectedIds.length > 0 ? selectedIds.join(", ") : "None"}</div>
          <div style={{ marginTop: "4px", fontSize: "12px" }}>
            Try clicking avatars to select them, or click the overflow counter to see all users
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example allowing you to experiment with different configurations.",
      },
    },
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    avatars: [],
    maxCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar group with no avatars showing empty state handling.",
      },
    },
  },
};

// Single avatar
export const SingleAvatar: Story = {
  args: {
    avatars: [sampleAvatars[0]],
    maxCount: 5,
    size: AvatarSize.LG,
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar group with only one avatar, no overflow counter shown.",
      },
    },
  },
};
