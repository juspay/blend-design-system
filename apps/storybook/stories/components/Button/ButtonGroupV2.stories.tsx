import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  ButtonGroupV2,
  ButtonV2,
  ButtonTypeV2,
  ButtonSizeV2,
  ButtonSubTypeV2,
} from "blend-v1";
import {
  Plus,
  Download,
  Settings,
  Save,
  X,
  Edit,
  Trash2,
  Search,
  Copy,
} from "lucide-react";

const meta: Meta<typeof ButtonGroupV2> = {
  title: "Components/Button/ButtonGroupV2",
  component: ButtonGroupV2,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A modern container component for grouping ButtonV2 components with automatic positioning and spacing.

## Features
- Automatic button group positioning (left, center, right)
- Stacked and non-stacked layouts
- Works seamlessly with ButtonV2 components
- Automatic border radius adjustment for connected buttons
- Simple and clean API

## Usage

\`\`\`tsx
import { ButtonGroupV2, ButtonV2, ButtonTypeV2 } from 'blend-v1';

<ButtonGroupV2 stacked={true}>
  <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
  <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
</ButtonGroupV2>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    stacked: {
      control: "boolean",
      description:
        "Whether buttons are stacked together (connected) or have spacing",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGroupV2>;

// Default story
export const Default: Story = {
  args: {
    stacked: true,
  },
  render: (args) => (
    <ButtonGroupV2 {...args}>
      <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
      <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
    </ButtonGroupV2>
  ),
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
        <ButtonGroupV2 stacked={true}>
          <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Save & Continue" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Non-Stacked (Spaced)
        </h4>
        <ButtonGroupV2 stacked={false}>
          <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Save & Continue" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
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

// Different button types
export const ButtonTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Primary Actions
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Save & Continue" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Mixed Types
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2 text="Save" buttonType={ButtonTypeV2.SUCCESS} />
          <ButtonV2 text="Delete" buttonType={ButtonTypeV2.DANGER} />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          All Secondary
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2 text="Option 1" buttonType={ButtonTypeV2.SECONDARY} />
          <ButtonV2 text="Option 2" buttonType={ButtonTypeV2.SECONDARY} />
          <ButtonV2 text="Option 3" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button groups with different button types and combinations.",
      },
    },
  },
};

// Different sizes
export const ButtonSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Small
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            text="Save"
            buttonType={ButtonTypeV2.PRIMARY}
            size={ButtonSizeV2.SMALL}
          />
          <ButtonV2
            text="Cancel"
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.SMALL}
          />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Medium
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            text="Save"
            buttonType={ButtonTypeV2.PRIMARY}
            size={ButtonSizeV2.MEDIUM}
          />
          <ButtonV2
            text="Cancel"
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.MEDIUM}
          />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Large
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            text="Save"
            buttonType={ButtonTypeV2.PRIMARY}
            size={ButtonSizeV2.LARGE}
          />
          <ButtonV2
            text="Cancel"
            buttonType={ButtonTypeV2.SECONDARY}
            size={ButtonSizeV2.LARGE}
          />
        </ButtonGroupV2>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button groups with different button sizes.",
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
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            text="Save"
            leadingIcon={<Save size={16} />}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Cancel"
            leadingIcon={<X size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          CRUD Operations
        </h4>
        <ButtonGroupV2 stacked={false}>
          <ButtonV2
            text="Add"
            leadingIcon={<Plus size={16} />}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Edit"
            leadingIcon={<Edit size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            text="Delete"
            leadingIcon={<Trash2 size={16} />}
            buttonType={ButtonTypeV2.DANGER}
          />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          File Operations
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            text="Download"
            leadingIcon={<Download size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            text="Copy"
            leadingIcon={<Copy size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            text="Settings"
            leadingIcon={<Settings size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
        </ButtonGroupV2>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button groups with icons for enhanced visual communication.",
      },
    },
  },
};

// Icon only buttons
export const IconOnlyButtons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Toolbar Actions
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Plus size={16} />}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Edit size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Trash2 size={16} />}
            buttonType={ButtonTypeV2.DANGER}
          />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Media Controls
        </h4>
        <ButtonGroupV2 stacked={false}>
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Search size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Download size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Settings size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
        </ButtonGroupV2>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icon-only button groups for compact interfaces and toolbars.",
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
        <ButtonGroupV2 stacked={false}>
          <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Save as Draft" buttonType={ButtonTypeV2.SECONDARY} />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Modal Actions
        </h4>
        <ButtonGroupV2 stacked={false}>
          <ButtonV2 text="Confirm" buttonType={ButtonTypeV2.DANGER} />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Navigation
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2 text="Previous" buttonType={ButtonTypeV2.SECONDARY} />
          <ButtonV2 text="Next" buttonType={ButtonTypeV2.PRIMARY} />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Filter Options
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2 text="All" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Active" buttonType={ButtonTypeV2.SECONDARY} />
          <ButtonV2 text="Inactive" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
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

// Button states
export const ButtonStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Normal State
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          With Loading
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            text="Saving..."
            buttonType={ButtonTypeV2.PRIMARY}
            loading={true}
          />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>

      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          With Disabled
        </h4>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            text="Save"
            buttonType={ButtonTypeV2.PRIMARY}
            disabled={true}
          />
          <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
        </ButtonGroupV2>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button groups with different button states including loading and disabled.",
      },
    },
  },
};

// Two button groups
export const TwoButtonGroups: Story = {
  render: () => (
    <ButtonGroupV2 stacked={true}>
      <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
      <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
    </ButtonGroupV2>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple two-button group - the most common use case.",
      },
    },
  },
};

// Three button groups
export const ThreeButtonGroups: Story = {
  render: () => (
    <ButtonGroupV2 stacked={true}>
      <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
      <ButtonV2 text="Save & Continue" buttonType={ButtonTypeV2.SECONDARY} />
      <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SECONDARY} />
    </ButtonGroupV2>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three-button group with proper border radius handling.",
      },
    },
  },
};

// Many button groups
export const ManyButtonGroups: Story = {
  render: () => (
    <ButtonGroupV2 stacked={true}>
      <ButtonV2 text="1" buttonType={ButtonTypeV2.SECONDARY} />
      <ButtonV2 text="2" buttonType={ButtonTypeV2.SECONDARY} />
      <ButtonV2 text="3" buttonType={ButtonTypeV2.SECONDARY} />
      <ButtonV2 text="4" buttonType={ButtonTypeV2.SECONDARY} />
      <ButtonV2 text="5" buttonType={ButtonTypeV2.PRIMARY} />
    </ButtonGroupV2>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button group with many buttons, useful for pagination or tabs.",
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
          Layout Options
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ButtonGroupV2 stacked={true}>
            <ButtonV2 text="Stacked" buttonType={ButtonTypeV2.PRIMARY} />
            <ButtonV2 text="Connected" buttonType={ButtonTypeV2.SECONDARY} />
          </ButtonGroupV2>

          <ButtonGroupV2 stacked={false}>
            <ButtonV2 text="Spaced" buttonType={ButtonTypeV2.PRIMARY} />
            <ButtonV2 text="Separated" buttonType={ButtonTypeV2.SECONDARY} />
          </ButtonGroupV2>
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Button Types
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ButtonGroupV2 stacked={true}>
            <ButtonV2 text="Primary" buttonType={ButtonTypeV2.PRIMARY} />
            <ButtonV2 text="Secondary" buttonType={ButtonTypeV2.SECONDARY} />
            <ButtonV2 text="Success" buttonType={ButtonTypeV2.SUCCESS} />
            <ButtonV2 text="Danger" buttonType={ButtonTypeV2.DANGER} />
          </ButtonGroupV2>
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          With Icons
        </h3>
        <ButtonGroupV2 stacked={false}>
          <ButtonV2
            text="Add"
            leadingIcon={<Plus size={16} />}
            buttonType={ButtonTypeV2.PRIMARY}
          />
          <ButtonV2
            text="Edit"
            leadingIcon={<Edit size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            text="Delete"
            leadingIcon={<Trash2 size={16} />}
            buttonType={ButtonTypeV2.DANGER}
          />
        </ButtonGroupV2>
      </div>

      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Icon Only
        </h3>
        <ButtonGroupV2 stacked={true}>
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Search size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Download size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
          <ButtonV2
            subType={ButtonSubTypeV2.ICON_ONLY}
            leadingIcon={<Settings size={16} />}
            buttonType={ButtonTypeV2.SECONDARY}
          />
        </ButtonGroupV2>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A comprehensive showcase of ButtonGroupV2 capabilities and variations.",
      },
    },
  },
};
