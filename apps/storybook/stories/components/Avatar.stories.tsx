import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Avatar, AvatarSize, AvatarShape } from "blend-v1";
import { Crown, Star, CheckCircle, Settings, User } from "lucide-react";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible avatar component for displaying user profile images with automatic fallback to initials, multiple sizes and shapes, and online status indicators.

## Features
- Multiple sizes (Small, Medium, Large, Extra Large)
- Two shape variants (Circular, Rounded)
- Automatic fallback to initials when image fails
- Online status indicator support
- Custom fallback content support
- Leading and trailing slot support
- Accessible design with screen reader support
- Error handling for broken images

## Usage

\`\`\`tsx
import { Avatar, AvatarSize, AvatarShape } from 'blend-v1';

<Avatar 
  src="/user-profile.jpg" 
  alt="John Doe" 
  size={AvatarSize.MD}
  shape={AvatarShape.CIRCULAR}
  online={true}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "URL of the avatar image to display",
    },
    alt: {
      control: "text",
      description:
        "Alternative text for the avatar image and fallback initials generation",
    },
    size: {
      control: "select",
      options: Object.values(AvatarSize),
      description: "Size variant of the avatar",
    },
    shape: {
      control: "select",
      options: Object.values(AvatarShape),
      description: "Shape variant of the avatar",
    },
    online: {
      control: "boolean",
      description: "Whether to show online status indicator",
    },
    fallback: {
      control: "text",
      description: "Custom fallback content when image is not available",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Default story
export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    alt: "John Doe",
    size: AvatarSize.MD,
    shape: AvatarShape.CIRCULAR,
    online: false,
  },
};

// Avatar sizes
export const AvatarSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar
        src="https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=24&h=24&fit=crop&crop=face"
        alt="Sarah Wilson"
        size={AvatarSize.SM}
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
        alt="Mike Johnson"
        size={AvatarSize.MD}
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        alt="Emma Davis"
        size={AvatarSize.LG}
      />
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
        alt="David Brown"
        size={AvatarSize.XL}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different avatar sizes: Small (24px), Medium (32px), Large (40px), and Extra Large (48px).",
      },
    },
  },
};

// Avatar shapes
export const AvatarShapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
        alt="Alex Johnson"
        size={AvatarSize.LG}
        shape={AvatarShape.CIRCULAR}
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        alt="Lisa Chen"
        size={AvatarSize.LG}
        shape={AvatarShape.ROUNDED}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different avatar shapes: Circular (fully rounded) and Rounded (slightly rounded corners).",
      },
    },
  },
};

// Fallback avatars (no image)
export const FallbackAvatars: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Avatar alt="John Doe" size={AvatarSize.MD} />
      <Avatar alt="Sarah Wilson" size={AvatarSize.MD} />
      <Avatar alt="Mike Johnson" size={AvatarSize.MD} />
      <Avatar alt="Emma Davis" size={AvatarSize.MD} />
      <Avatar alt="Alex Chen" size={AvatarSize.MD} />
      <Avatar alt="Lisa Brown" size={AvatarSize.MD} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatars without images showing automatic initials generation from the alt text.",
      },
    },
  },
};

// Online status indicators
export const OnlineStatus: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
          alt="Online User"
          size={AvatarSize.LG}
          online={true}
        />
        <div style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
          Online
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
          alt="Offline User"
          size={AvatarSize.LG}
          online={false}
        />
        <div style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
          Offline
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar alt="Online Fallback" size={AvatarSize.LG} online={true} />
        <div style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
          Online (Fallback)
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatars with online status indicators showing user presence.",
      },
    },
  },
};

// Custom fallback content
export const CustomFallback: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar
        alt="User Icon"
        size={AvatarSize.LG}
        fallback={<User size={20} />}
      />
      <Avatar
        alt="Star User"
        size={AvatarSize.LG}
        fallback={<Star size={20} />}
      />
      <Avatar alt="Custom Text" size={AvatarSize.LG} fallback="?" />
      <Avatar
        alt="Settings"
        size={AvatarSize.LG}
        fallback={<Settings size={20} />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatars with custom fallback content including icons and custom text.",
      },
    },
  },
};

// Error handling (broken images)
export const ErrorHandling: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar
        src="https://broken-image-url.jpg"
        alt="Broken Image User"
        size={AvatarSize.LG}
      />
      <Avatar
        src="https://nonexistent.jpg"
        alt="Another Broken"
        size={AvatarSize.LG}
        online={true}
      />
      <Avatar
        src="https://invalid-url"
        alt="Custom Fallback"
        size={AvatarSize.LG}
        fallback={<CheckCircle size={20} />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatars gracefully handling broken or invalid image URLs by falling back to initials or custom content.",
      },
    },
  },
};

// With slots (leading and trailing)
export const WithSlots: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
        alt="VIP User"
        size={AvatarSize.MD}
        leadingSlot={<Crown size={16} color="#gold" />}
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
        alt="Star User"
        size={AvatarSize.MD}
        trailingSlot={<Star size={16} color="#ffd700" />}
      />
      <Avatar
        alt="Both Slots"
        size={AvatarSize.MD}
        leadingSlot={<Crown size={16} color="#gold" />}
        trailingSlot={<Star size={16} color="#ffd700" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatars with leading and trailing content slots for additional context or actions.",
      },
    },
  },
};

// Size and shape combinations
export const SizeShapeCombinations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ width: "80px", fontSize: "14px", color: "#666" }}>
          Circular:
        </span>
        <Avatar alt="SM" size={AvatarSize.SM} shape={AvatarShape.CIRCULAR} />
        <Avatar alt="MD" size={AvatarSize.MD} shape={AvatarShape.CIRCULAR} />
        <Avatar alt="LG" size={AvatarSize.LG} shape={AvatarShape.CIRCULAR} />
        <Avatar alt="XL" size={AvatarSize.XL} shape={AvatarShape.CIRCULAR} />
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ width: "80px", fontSize: "14px", color: "#666" }}>
          Rounded:
        </span>
        <Avatar alt="SM" size={AvatarSize.SM} shape={AvatarShape.ROUNDED} />
        <Avatar alt="MD" size={AvatarSize.MD} shape={AvatarShape.ROUNDED} />
        <Avatar alt="LG" size={AvatarSize.LG} shape={AvatarShape.ROUNDED} />
        <Avatar alt="XL" size={AvatarSize.XL} shape={AvatarShape.ROUNDED} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All size and shape combinations showcasing the flexibility of the avatar component.",
      },
    },
  },
};
