import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  ButtonGroup,
  ButtonGroupMode,
  Button,
  ButtonType,
  ButtonSize,
} from "blend-v1";
import { Plus, Download, Settings, Save, X, Edit, Trash2 } from "lucide-react";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button/ButtonGroup (v1)",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A container component for grouping multiple buttons with consistent spacing and styling.

## Features
- Multiple grouping modes (Single Primary, All Secondary, No Transform)
- Stacked and non-stacked layouts
- Automatic button type transformation
- Consistent spacing based on button size
- Support for all button variants

## Usage

\`\`\`tsx
import { ButtonGroup, ButtonGroupMode, Button, ButtonType } from 'blend-v1';

<ButtonGroup mode={ButtonGroupMode.SINGLE_PRIMARY} isStacked={true}>
  <Button text="Save" buttonType={ButtonType.PRIMARY} />
  <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
</ButtonGroup>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: Object.values(ButtonSize),
      description: "The size applied to all buttons in the group",
    },
    isStacked: {
      control: "boolean",
      description: "Whether buttons are stacked together or have spacing",
    },
    mode: {
      control: "select",
      options: Object.values(ButtonGroupMode),
      description: "How button types are transformed within the group",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// Default story
export const Default: Story = {
  args: {
    size: ButtonSize.MEDIUM,
    isStacked: true,
    mode: ButtonGroupMode.SINGLE_PRIMARY,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="Save" buttonType={ButtonType.PRIMARY} />
      <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
    </ButtonGroup>
  ),
};

// Button group modes
export const GroupModes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Single Primary Mode
        </h4>
        <ButtonGroup mode={ButtonGroupMode.SINGLE_PRIMARY} isStacked={true}>
          <Button text="Save" buttonType={ButtonType.PRIMARY} />
          <Button text="Save & Continue" buttonType={ButtonType.PRIMARY} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          All Secondary Mode
        </h4>
        <ButtonGroup mode={ButtonGroupMode.ALL_SECONDARY} isStacked={true}>
          <Button text="Edit" buttonType={ButtonType.PRIMARY} />
          <Button text="Delete" buttonType={ButtonType.DANGER} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          No Transform Mode
        </h4>
        <ButtonGroup mode={ButtonGroupMode.NO_TRANSFORM} isStacked={true}>
          <Button text="Save" buttonType={ButtonType.PRIMARY} />
          <Button text="Delete" buttonType={ButtonType.DANGER} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different button group modes that control how button types are transformed within the group.",
      },
    },
  },
};

// Stacked vs Non-stacked
export const StackedVsNonStacked: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Stacked (Connected)
        </h4>
        <ButtonGroup isStacked={true} mode={ButtonGroupMode.SINGLE_PRIMARY}>
          <Button text="Save" buttonType={ButtonType.PRIMARY} />
          <Button text="Save & Continue" buttonType={ButtonType.PRIMARY} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Non-Stacked (Spaced)
        </h4>
        <ButtonGroup isStacked={false} mode={ButtonGroupMode.SINGLE_PRIMARY}>
          <Button text="Save" buttonType={ButtonType.PRIMARY} />
          <Button text="Save & Continue" buttonType={ButtonType.PRIMARY} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison between stacked (connected) and non-stacked (spaced) button groups.",
      },
    },
  },
};

// Different sizes
export const ButtonGroupSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Small
        </h4>
        <ButtonGroup size={ButtonSize.SMALL} isStacked={true}>
          <Button text="Save" buttonType={ButtonType.PRIMARY} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Medium
        </h4>
        <ButtonGroup size={ButtonSize.MEDIUM} isStacked={true}>
          <Button text="Save" buttonType={ButtonType.PRIMARY} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Large
        </h4>
        <ButtonGroup size={ButtonSize.LARGE} isStacked={true}>
          <Button text="Save" buttonType={ButtonType.PRIMARY} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button groups in different sizes. The size prop applies to all buttons in the group.",
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Action Buttons
        </h4>
        <ButtonGroup isStacked={true} mode={ButtonGroupMode.SINGLE_PRIMARY}>
          <Button
            text="Save"
            leadingIcon={Save}
            buttonType={ButtonType.PRIMARY}
          />
          <Button
            text="Cancel"
            leadingIcon={X}
            buttonType={ButtonType.SECONDARY}
          />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          CRUD Operations
        </h4>
        <ButtonGroup isStacked={false} mode={ButtonGroupMode.NO_TRANSFORM}>
          <Button
            text="Add"
            leadingIcon={Plus}
            buttonType={ButtonType.PRIMARY}
          />
          <Button
            text="Edit"
            leadingIcon={Edit}
            buttonType={ButtonType.SECONDARY}
          />
          <Button
            text="Delete"
            leadingIcon={Trash2}
            buttonType={ButtonType.DANGER}
          />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          File Operations
        </h4>
        <ButtonGroup isStacked={true} mode={ButtonGroupMode.ALL_SECONDARY}>
          <Button
            text="Download"
            leadingIcon={Download}
            buttonType={ButtonType.PRIMARY}
          />
          <Button
            text="Settings"
            leadingIcon={Settings}
            buttonType={ButtonType.SECONDARY}
          />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button groups with icons for enhanced visual communication and context.",
      },
    },
  },
};

// Common use cases
export const CommonUseCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Form Actions
        </h4>
        <ButtonGroup isStacked={false} mode={ButtonGroupMode.SINGLE_PRIMARY}>
          <Button text="Save" buttonType={ButtonType.PRIMARY} />
          <Button text="Save as Draft" buttonType={ButtonType.SECONDARY} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Modal Actions
        </h4>
        <ButtonGroup isStacked={false} mode={ButtonGroupMode.SINGLE_PRIMARY}>
          <Button text="Confirm" buttonType={ButtonType.DANGER} />
          <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Toolbar Actions
        </h4>
        <ButtonGroup isStacked={true} mode={ButtonGroupMode.ALL_SECONDARY}>
          <Button text="Bold" buttonType={ButtonType.SECONDARY} />
          <Button text="Italic" buttonType={ButtonType.SECONDARY} />
          <Button text="Underline" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Navigation
        </h4>
        <ButtonGroup isStacked={true} mode={ButtonGroupMode.SINGLE_PRIMARY}>
          <Button text="Previous" buttonType={ButtonType.SECONDARY} />
          <Button text="Next" buttonType={ButtonType.PRIMARY} />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common use cases for button groups in different contexts and layouts.",
      },
    },
  },
};

// Single primary mode showcase
export const SinglePrimaryMode: Story = {
  args: {
    size: ButtonSize.MEDIUM,
    isStacked: true,
    mode: ButtonGroupMode.SINGLE_PRIMARY,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="Save" buttonType={ButtonType.PRIMARY} />
      <Button text="Save & Continue" buttonType={ButtonType.PRIMARY} />
      <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Single Primary mode ensures only one primary button is shown, converting others to secondary.",
      },
    },
  },
};

// All secondary mode showcase
export const AllSecondaryMode: Story = {
  args: {
    size: ButtonSize.MEDIUM,
    isStacked: true,
    mode: ButtonGroupMode.ALL_SECONDARY,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="Edit" buttonType={ButtonType.PRIMARY} />
      <Button text="Delete" buttonType={ButtonType.DANGER} />
      <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All Secondary mode converts all buttons to secondary type for uniform appearance.",
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
        gap: "32px",
        padding: "16px",
      }}
    >
      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Button Group Modes
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ButtonGroup mode={ButtonGroupMode.SINGLE_PRIMARY} isStacked={true}>
            <Button text="Save" buttonType={ButtonType.PRIMARY} />
            <Button text="Save & Continue" buttonType={ButtonType.PRIMARY} />
            <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
          </ButtonGroup>

          <ButtonGroup mode={ButtonGroupMode.ALL_SECONDARY} isStacked={true}>
            <Button text="Edit" buttonType={ButtonType.PRIMARY} />
            <Button text="Delete" buttonType={ButtonType.DANGER} />
            <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
          </ButtonGroup>
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Layout Options
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ButtonGroup isStacked={true} mode={ButtonGroupMode.SINGLE_PRIMARY}>
            <Button text="Stacked" buttonType={ButtonType.PRIMARY} />
            <Button text="Connected" buttonType={ButtonType.SECONDARY} />
          </ButtonGroup>

          <ButtonGroup isStacked={false} mode={ButtonGroupMode.SINGLE_PRIMARY}>
            <Button text="Spaced" buttonType={ButtonType.PRIMARY} />
            <Button text="Separated" buttonType={ButtonType.SECONDARY} />
          </ButtonGroup>
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          With Icons
        </h3>
        <ButtonGroup isStacked={false} mode={ButtonGroupMode.NO_TRANSFORM}>
          <Button
            text="Add"
            leadingIcon={Plus}
            buttonType={ButtonType.PRIMARY}
          />
          <Button
            text="Edit"
            leadingIcon={Edit}
            buttonType={ButtonType.SECONDARY}
          />
          <Button
            text="Delete"
            leadingIcon={Trash2}
            buttonType={ButtonType.DANGER}
          />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A comprehensive showcase of ButtonGroup capabilities and variations.",
      },
    },
  },
};
