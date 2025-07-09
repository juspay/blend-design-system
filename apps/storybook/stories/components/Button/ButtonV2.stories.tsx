import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  ButtonV2,
  ButtonTypeV2,
  ButtonSizeV2,
  ButtonSubTypeV2,
} from "blend-v1";
import {
  Plus,
  Download,
  Settings,
  Heart,
  Star,
  Search,
  Edit,
  Trash2,
} from "lucide-react";

const meta: Meta<typeof ButtonV2> = {
  title: "Components/Button/ButtonV2",
  component: ButtonV2,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A modern, enhanced button component with improved styling and token-based design system.

## Features
- Multiple button types (Primary, Secondary, Danger, Success)
- Various sizes (Small, Medium, Large)
- Sub-types (Default, Icon Only, Inline)
- Icon support (leading and trailing)
- Loading and disabled states
- Full width support
- Button group positioning
- Token-based styling system
- Accessibility features built-in

## Usage

\`\`\`tsx
import { ButtonV2, ButtonTypeV2, ButtonSizeV2 } from 'blend-v1';

<ButtonV2
  buttonType={ButtonTypeV2.PRIMARY}
  size={ButtonSizeV2.MEDIUM}
  text="Click me"
  onClick={() => console.log('Button clicked!')}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    buttonType: {
      control: "select",
      options: Object.values(ButtonTypeV2),
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: Object.values(ButtonSizeV2),
      description: "The size of the button",
    },
    subType: {
      control: "select",
      options: Object.values(ButtonSubTypeV2),
      description: "Button subtype for special variants",
    },
    text: {
      control: "text",
      description: "The text content of the button",
    },
    loading: {
      control: "boolean",
      description: "Shows loading state",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the button take full width",
    },
    buttonGroupPosition: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Position in button group for border radius adjustment",
    },
    justifyContent: {
      control: "select",
      options: ["flex-start", "center", "flex-end", "space-between"],
      description: "Content alignment within the button",
    },
    onClick: {
      action: "clicked",
      description: "Click handler function",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonV2>;

// Default story
export const Default: Story = {
  args: {
    buttonType: ButtonTypeV2.PRIMARY,
    size: ButtonSizeV2.MEDIUM,
    text: "Button",
    loading: false,
    disabled: false,
  },
};

// Button types
export const ButtonTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <ButtonV2 buttonType={ButtonTypeV2.PRIMARY} text="Primary" />
      <ButtonV2 buttonType={ButtonTypeV2.SECONDARY} text="Secondary" />
      <ButtonV2 buttonType={ButtonTypeV2.DANGER} text="Danger" />
      <ButtonV2 buttonType={ButtonTypeV2.SUCCESS} text="Success" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different button types for various use cases and semantic meanings.",
      },
    },
  },
};

// Button sizes
export const ButtonSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <ButtonV2 size={ButtonSizeV2.SMALL} text="Small" />
      <ButtonV2 size={ButtonSizeV2.MEDIUM} text="Medium" />
      <ButtonV2 size={ButtonSizeV2.LARGE} text="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button sizes to fit various contexts and layouts.",
      },
    },
  },
};

// Button sub-types
export const ButtonSubTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <ButtonV2 subType={ButtonSubTypeV2.DEFAULT} text="Default" />
      <ButtonV2
        subType={ButtonSubTypeV2.ICON_ONLY}
        leadingIcon={<Settings size={16} />}
        text="Icon Only"
      />
      <ButtonV2 subType={ButtonSubTypeV2.INLINE} text="Inline" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different button sub-types including default, icon-only, and inline variants.",
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <ButtonV2
        text="Add Item"
        leadingIcon={<Plus size={16} />}
        buttonType={ButtonTypeV2.PRIMARY}
      />
      <ButtonV2
        text="Download"
        leadingIcon={<Download size={16} />}
        buttonType={ButtonTypeV2.SECONDARY}
      />
      <ButtonV2
        text="Settings"
        trailingIcon={<Settings size={16} />}
        buttonType={ButtonTypeV2.SECONDARY}
      />
      <ButtonV2
        text="Favorite"
        leadingIcon={<Heart size={16} />}
        trailingIcon={<Star size={16} />}
        buttonType={ButtonTypeV2.SUCCESS}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons with leading and trailing icons for enhanced visual communication.",
      },
    },
  },
};

// Icon only buttons
export const IconOnly: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <ButtonV2
        subType={ButtonSubTypeV2.ICON_ONLY}
        leadingIcon={<Plus size={16} />}
        buttonType={ButtonTypeV2.PRIMARY}
        size={ButtonSizeV2.SMALL}
      />
      <ButtonV2
        subType={ButtonSubTypeV2.ICON_ONLY}
        leadingIcon={<Search size={16} />}
        buttonType={ButtonTypeV2.SECONDARY}
        size={ButtonSizeV2.MEDIUM}
      />
      <ButtonV2
        subType={ButtonSubTypeV2.ICON_ONLY}
        leadingIcon={<Edit size={16} />}
        buttonType={ButtonTypeV2.SUCCESS}
        size={ButtonSizeV2.LARGE}
      />
      <ButtonV2
        subType={ButtonSubTypeV2.ICON_ONLY}
        leadingIcon={<Trash2 size={16} />}
        buttonType={ButtonTypeV2.DANGER}
        size={ButtonSizeV2.MEDIUM}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons for compact interfaces. Perfect for toolbars and action bars.",
      },
    },
  },
};

// Inline buttons
export const InlineButtons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <span>This is some text with </span>
      <ButtonV2
        subType={ButtonSubTypeV2.INLINE}
        text="inline button"
        buttonType={ButtonTypeV2.PRIMARY}
      />
      <span> and </span>
      <ButtonV2
        subType={ButtonSubTypeV2.INLINE}
        text="another one"
        buttonType={ButtonTypeV2.SECONDARY}
      />
      <span> in the flow.</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Inline buttons that blend seamlessly with text content.",
      },
    },
  },
};

// Button states
export const ButtonStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <ButtonV2 text="Normal" buttonType={ButtonTypeV2.PRIMARY} />
      <ButtonV2
        text="Loading"
        buttonType={ButtonTypeV2.PRIMARY}
        loading={true}
      />
      <ButtonV2
        text="Disabled"
        buttonType={ButtonTypeV2.PRIMARY}
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different button states including normal, loading, and disabled.",
      },
    },
  },
};

// Full width buttons
export const FullWidth: Story = {
  render: () => (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <ButtonV2
        text="Full Width Primary"
        buttonType={ButtonTypeV2.PRIMARY}
        fullWidth={true}
      />
      <ButtonV2
        text="Full Width Secondary"
        buttonType={ButtonTypeV2.SECONDARY}
        fullWidth={true}
      />
      <ButtonV2
        text="Full Width with Icon"
        buttonType={ButtonTypeV2.SUCCESS}
        leadingIcon={<Plus size={16} />}
        fullWidth={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full-width buttons that take up the entire available width of their container.",
      },
    },
  },
};

// Button group positioning
export const ButtonGroupPositioning: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Button Group
        </h4>
        <div style={{ display: "flex" }}>
          <ButtonV2
            text="Left"
            buttonType={ButtonTypeV2.SECONDARY}
            buttonGroupPosition="left"
          />
          <ButtonV2
            text="Center"
            buttonType={ButtonTypeV2.SECONDARY}
            buttonGroupPosition="center"
          />
          <ButtonV2
            text="Right"
            buttonType={ButtonTypeV2.SECONDARY}
            buttonGroupPosition="right"
          />
        </div>
      </div>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Primary Group
        </h4>
        <div style={{ display: "flex" }}>
          <ButtonV2
            text="Save"
            buttonType={ButtonTypeV2.PRIMARY}
            buttonGroupPosition="left"
          />
          <ButtonV2
            text="Save & Continue"
            buttonType={ButtonTypeV2.PRIMARY}
            buttonGroupPosition="right"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button group positioning affects border radius to create seamless button groups.",
      },
    },
  },
};

// Content alignment
export const ContentAlignment: Story = {
  render: () => (
    <div
      style={{
        width: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <ButtonV2
        text="Left Aligned"
        buttonType={ButtonTypeV2.SECONDARY}
        fullWidth={true}
        justifyContent="flex-start"
      />
      <ButtonV2
        text="Center Aligned"
        buttonType={ButtonTypeV2.SECONDARY}
        fullWidth={true}
        justifyContent="center"
      />
      <ButtonV2
        text="Right Aligned"
        buttonType={ButtonTypeV2.SECONDARY}
        fullWidth={true}
        justifyContent="flex-end"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different content alignment options within the button.",
      },
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    buttonType: ButtonTypeV2.PRIMARY,
    size: ButtonSizeV2.MEDIUM,
    text: "Loading Button",
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Button in loading state. Shows a spinner and hides the text and icons.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    buttonType: ButtonTypeV2.PRIMARY,
    size: ButtonSizeV2.MEDIUM,
    text: "Disabled Button",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Button in disabled state. Click events are prevented and visual styling indicates the disabled state.",
      },
    },
  },
};

// Comprehensive showcase
export const Showcase: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "16px",
      }}
    >
      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}
        >
          Button Types
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <ButtonV2 buttonType={ButtonTypeV2.PRIMARY} text="Primary" />
          <ButtonV2 buttonType={ButtonTypeV2.SECONDARY} text="Secondary" />
          <ButtonV2 buttonType={ButtonTypeV2.DANGER} text="Danger" />
          <ButtonV2 buttonType={ButtonTypeV2.SUCCESS} text="Success" />
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}
        >
          With Icons
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <ButtonV2
            text="Add"
            leadingIcon={<Plus size={16} />}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Download"
            trailingIcon={<Download size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Settings size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}
        >
          States
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <ButtonV2 text="Normal" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2
            text="Loading"
            buttonType={ButtonTypeV2.PRIMARY}
            loading={true}
          />
          <ButtonV2
            text="Disabled"
            buttonType={ButtonTypeV2.PRIMARY}
            disabled={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A comprehensive showcase of ButtonV2 capabilities and variations.",
      },
    },
  },
};
