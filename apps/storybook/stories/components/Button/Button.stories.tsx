import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button, ButtonType, ButtonSize, ButtonSubType } from "blend-v1";
import { Plus, Download, Settings, Heart, Star } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button/Button (v1)",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A versatile button component with multiple variants, sizes, and states.

## Features
- Multiple button types (Primary, Secondary, Tertiary, etc.)
- Various sizes (Small, Medium, Large)
- Icon support (leading and trailing)
- Loading and disabled states
- Accessibility features built-in

## Usage

\`\`\`tsx
import { Button, ButtonType, ButtonSize } from 'blend-v1';

<Button
  buttonType={ButtonType.PRIMARY}
  size={ButtonSize.MEDIUM}
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
      options: Object.values(ButtonType),
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: Object.values(ButtonSize),
      description: "The size of the button",
    },
    subType: {
      control: "select",
      options: Object.values(ButtonSubType),
      description: "Button subtype for special variants",
    },
    text: {
      control: "text",
      description: "The text content of the button",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading state",
    },
    isDisabled: {
      control: "boolean",
      description: "Disables the button",
    },
    onClick: {
      action: "clicked",
      description: "Click handler function",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default story
export const Default: Story = {
  args: {
    buttonType: ButtonType.PRIMARY,
    size: ButtonSize.MEDIUM,
    text: "Button",
    isLoading: false,
    isDisabled: false,
  },
};

// Button types
export const ButtonTypes: Story = {
  args: {
    buttonType: ButtonType.SECONDARY,
    size: ButtonSize.MEDIUM,
    text: "Secondary Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Different button types for various use cases. Use the controls below to switch between PRIMARY, SECONDARY, DANGER, and SUCCESS types.",
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
      <Button size={ButtonSize.SMALL} text="Small" />
      <Button size={ButtonSize.MEDIUM} text="Medium" />
      <Button size={ButtonSize.LARGE} text="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button sizes to fit various contexts.",
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button
        text="Add Item"
        leadingIcon={Plus}
        buttonType={ButtonType.PRIMARY}
      />
      <Button
        text="Download"
        leadingIcon={Download}
        buttonType={ButtonType.SECONDARY}
      />
      <Button
        text="Settings"
        trailingIcon={Settings}
        buttonType={ButtonType.SECONDARY}
      />
      <Button
        text="Favorite"
        leadingIcon={Heart}
        trailingIcon={Star}
        buttonType={ButtonType.SUCCESS}
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
      <Button
        subType={ButtonSubType.ICON_ONLY}
        leadingIcon={Plus}
        text="Add"
        buttonType={ButtonType.PRIMARY}
        size={ButtonSize.SMALL}
      />
      <Button
        subType={ButtonSubType.ICON_ONLY}
        leadingIcon={Download}
        text="Download"
        buttonType={ButtonType.SECONDARY}
        size={ButtonSize.MEDIUM}
      />
      <Button
        subType={ButtonSubType.ICON_ONLY}
        leadingIcon={Settings}
        text="Settings"
        buttonType={ButtonType.DANGER}
        size={ButtonSize.LARGE}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons for compact interfaces. The text prop is used for accessibility.",
      },
    },
  },
};

// Button states
export const ButtonStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button text="Normal" buttonType={ButtonType.PRIMARY} />
      <Button text="Loading" buttonType={ButtonType.PRIMARY} isLoading={true} />
      <Button
        text="Disabled"
        buttonType={ButtonType.PRIMARY}
        isDisabled={true}
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

// Loading state
export const Loading: Story = {
  args: {
    buttonType: ButtonType.PRIMARY,
    size: ButtonSize.MEDIUM,
    text: "Loading Button",
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Button in loading state. The text and icons are hidden while loading.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    buttonType: ButtonType.PRIMARY,
    size: ButtonSize.MEDIUM,
    text: "Disabled Button",
    isDisabled: true,
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
