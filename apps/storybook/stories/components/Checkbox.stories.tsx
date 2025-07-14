import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Checkbox, CheckboxSize } from "blend-v1";
import { Star, Info, Settings } from "lucide-react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A versatile checkbox component with support for controlled and uncontrolled states, indeterminate state, multiple sizes, and comprehensive form integration capabilities.

## Features
- Controlled and uncontrolled modes
- Indeterminate state support
- Two sizes (Small, Medium)
- Error state handling
- Required field indication
- Label and subtext support
- Custom slot for additional content
- Disabled state support
- Accessible design with proper ARIA attributes

## Usage

\`\`\`tsx
import { Checkbox, CheckboxSize } from 'blend-v1';

<Checkbox 
  size={CheckboxSize.MEDIUM}
  checked={isChecked}
  onCheckedChange={setIsChecked}
  required={true}
>
  Accept terms and conditions
</Checkbox>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: { type: "select" },
      options: [undefined, true, false, "indeterminate"],
      description: "Controlled checked state of the checkbox",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state for uncontrolled mode",
    },
    size: {
      control: "select",
      options: Object.values(CheckboxSize),
      description: "Size variant of the checkbox",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required (shows asterisk)",
    },
    error: {
      control: "boolean",
      description: "Whether the checkbox is in error state",
    },
    children: {
      control: "text",
      description: "Label content for the checkbox",
    },
    subtext: {
      control: "text",
      description: "Additional descriptive text below the checkbox",
    },
    onCheckedChange: {
      action: "checked changed",
      description: "Callback fired when the checked state changes",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default story
export const Default: Story = {
  args: {
    children: "Default checkbox",
    size: CheckboxSize.MEDIUM,
    defaultChecked: false,
    disabled: false,
    required: false,
    error: false,
  },
};

// Checkbox sizes
export const CheckboxSizes: Story = {
  render: () => {
    const [sizes, setSizes] = useState({
      small: false,
      medium: false,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Checkbox
          size={CheckboxSize.SMALL}
          checked={sizes.small}
          onCheckedChange={(checked) =>
            setSizes((prev) => ({ ...prev, small: checked === true }))
          }
        >
          Small checkbox
        </Checkbox>
        <Checkbox
          size={CheckboxSize.MEDIUM}
          checked={sizes.medium}
          onCheckedChange={(checked) =>
            setSizes((prev) => ({ ...prev, medium: checked === true }))
          }
        >
          Medium checkbox
        </Checkbox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Different checkbox sizes: Small and Medium. Click to toggle each checkbox.",
      },
    },
  },
};

// Checkbox states
export const CheckboxStates: Story = {
  render: () => {
    const [states, setStates] = useState({
      unchecked: false,
      checked: true,
      indeterminate: "indeterminate" as boolean | "indeterminate",
      disabledUnchecked: false,
      disabledChecked: true,
      disabledIndeterminate: "indeterminate" as boolean | "indeterminate",
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Checkbox
          checked={states.unchecked}
          onCheckedChange={(checked) =>
            setStates((prev) => ({ ...prev, unchecked: checked === true }))
          }
        >
          Unchecked
        </Checkbox>
        <Checkbox
          checked={states.checked}
          onCheckedChange={(checked) =>
            setStates((prev) => ({ ...prev, checked: checked === true }))
          }
        >
          Checked
        </Checkbox>
        <Checkbox
          checked={states.indeterminate}
          onCheckedChange={(checked) =>
            setStates((prev) => ({ ...prev, indeterminate: checked }))
          }
        >
          Indeterminate
        </Checkbox>
        <Checkbox disabled={true} defaultChecked={false}>
          Disabled unchecked
        </Checkbox>
        <Checkbox disabled={true} defaultChecked={true}>
          Disabled checked
        </Checkbox>
        <Checkbox disabled={true} checked="indeterminate">
          Disabled indeterminate
        </Checkbox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Different checkbox states: unchecked, checked, indeterminate, and their disabled variants.",
      },
    },
  },
};

// Controlled checkbox
export const ControlledCheckbox: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked === true)}
          size={CheckboxSize.MEDIUM}
        >
          Subscribe to newsletter
        </Checkbox>
        <div style={{ fontSize: "14px", color: "#666" }}>
          Status: {isChecked ? "Subscribed" : "Not subscribed"}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled checkbox with state management.",
      },
    },
  },
};

// Indeterminate state example
export const IndeterminateState: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, name: "Item 1", checked: true },
      { id: 2, name: "Item 2", checked: false },
      { id: 3, name: "Item 3", checked: true },
    ]);

    const checkedCount = items.filter((item) => item.checked).length;
    const allChecked = checkedCount === items.length;
    const someChecked = checkedCount > 0 && checkedCount < items.length;

    const handleSelectAll = (checked: boolean | "indeterminate") => {
      setItems(items.map((item) => ({ ...item, checked: checked === true })));
    };

    const handleItemChange = (id: number, checked: boolean) => {
      setItems(
        items.map((item) => (item.id === id ? { ...item, checked } : item)),
      );
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Checkbox
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={handleSelectAll}
          size={CheckboxSize.MEDIUM}
        >
          Select all items ({checkedCount}/{items.length})
        </Checkbox>
        <div
          style={{
            marginLeft: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {items.map((item) => (
            <Checkbox
              key={item.id}
              checked={item.checked}
              onCheckedChange={(checked) =>
                handleItemChange(item.id, checked === true)
              }
              size={CheckboxSize.SMALL}
            >
              {item.name}
            </Checkbox>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Indeterminate state example with select all functionality.",
      },
    },
  },
};

// Error and required states
export const ErrorAndRequired: Story = {
  render: () => {
    const [errorStates, setErrorStates] = useState({
      required: false,
      error: false,
      requiredError: false,
      terms: false,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Checkbox
          required={true}
          checked={errorStates.required}
          onCheckedChange={(checked) =>
            setErrorStates((prev) => ({ ...prev, required: checked === true }))
          }
        >
          Required field
        </Checkbox>
        <Checkbox
          error={true}
          checked={errorStates.error}
          onCheckedChange={(checked) =>
            setErrorStates((prev) => ({ ...prev, error: checked === true }))
          }
        >
          Error state
        </Checkbox>
        <Checkbox
          required={true}
          error={true}
          checked={errorStates.requiredError}
          onCheckedChange={(checked) =>
            setErrorStates((prev) => ({
              ...prev,
              requiredError: checked === true,
            }))
          }
        >
          Required with error
        </Checkbox>
        <Checkbox
          required={true}
          error={true}
          subtext="This field is required and has an error"
          checked={errorStates.terms}
          onCheckedChange={(checked) =>
            setErrorStates((prev) => ({ ...prev, terms: checked === true }))
          }
        >
          I agree to the terms and conditions
        </Checkbox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Checkboxes with required indicators and error states.",
      },
    },
  },
};

// With subtext
export const WithSubtext: Story = {
  render: () => {
    const [subtextStates, setSubtextStates] = useState({
      newsletter: false,
      terms: false,
      verify: false,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Checkbox
          size={CheckboxSize.MEDIUM}
          subtext="We'll send you updates about new features and releases"
          checked={subtextStates.newsletter}
          onCheckedChange={(checked) =>
            setSubtextStates((prev) => ({
              ...prev,
              newsletter: checked === true,
            }))
          }
        >
          Subscribe to newsletter
        </Checkbox>
        <Checkbox
          size={CheckboxSize.SMALL}
          subtext="By checking this, you agree to our terms of service"
          required={true}
          checked={subtextStates.terms}
          onCheckedChange={(checked) =>
            setSubtextStates((prev) => ({ ...prev, terms: checked === true }))
          }
        >
          Accept terms and conditions
        </Checkbox>
        <Checkbox
          error={true}
          subtext="This field is required for account verification"
          checked={subtextStates.verify}
          onCheckedChange={(checked) =>
            setSubtextStates((prev) => ({ ...prev, verify: checked === true }))
          }
        >
          Verify email address
        </Checkbox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkboxes with additional descriptive subtext. Click to toggle each checkbox.",
      },
    },
  },
};

// With custom slots
export const WithSlots: Story = {
  render: () => {
    const [slotStates, setSlotStates] = useState({
      favorite: false,
      premium: false,
      settings: false,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Checkbox
          size={CheckboxSize.MEDIUM}
          slot={<Star size={16} color="#ffd700" />}
          checked={slotStates.favorite}
          onCheckedChange={(checked) =>
            setSlotStates((prev) => ({ ...prev, favorite: checked === true }))
          }
        >
          Mark as favorite
        </Checkbox>
        <Checkbox
          size={CheckboxSize.MEDIUM}
          slot={<Info size={16} color="#0ea5e9" />}
          subtext="This will enable advanced features"
          checked={slotStates.premium}
          onCheckedChange={(checked) =>
            setSlotStates((prev) => ({ ...prev, premium: checked === true }))
          }
        >
          Enable premium mode
        </Checkbox>
        <Checkbox
          size={CheckboxSize.MEDIUM}
          slot={<Settings size={16} color="#6b7280" />}
          checked={slotStates.settings}
          onCheckedChange={(checked) =>
            setSlotStates((prev) => ({ ...prev, settings: checked === true }))
          }
        >
          Configure settings
        </Checkbox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkboxes with custom content slots for additional context. Click to toggle each checkbox.",
      },
    },
  },
};

// Uncontrolled checkbox
export const UncontrolledCheckbox: Story = {
  render: () => {
    const [uncontrolledStates, setUncontrolledStates] = useState({
      defaultUnchecked: false,
      defaultChecked: true,
      selfManaged: false,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <Checkbox
            checked={uncontrolledStates.defaultUnchecked}
            onCheckedChange={(checked) =>
              setUncontrolledStates((prev) => ({
                ...prev,
                defaultUnchecked: checked === true,
              }))
            }
            size={CheckboxSize.MEDIUM}
          >
            Started unchecked (now{" "}
            {uncontrolledStates.defaultUnchecked ? "checked" : "unchecked"})
          </Checkbox>
        </div>
        <div>
          <Checkbox
            checked={uncontrolledStates.defaultChecked}
            onCheckedChange={(checked) =>
              setUncontrolledStates((prev) => ({
                ...prev,
                defaultChecked: checked === true,
              }))
            }
            size={CheckboxSize.MEDIUM}
          >
            Started checked (now{" "}
            {uncontrolledStates.defaultChecked ? "checked" : "unchecked"})
          </Checkbox>
        </div>
        <div>
          <Checkbox
            checked={uncontrolledStates.selfManaged}
            onCheckedChange={(checked) =>
              setUncontrolledStates((prev) => ({
                ...prev,
                selfManaged: checked === true,
              }))
            }
            size={CheckboxSize.SMALL}
            subtext={`Current state: ${uncontrolledStates.selfManaged ? "enabled" : "disabled"}`}
          >
            Self-managed checkbox
          </Checkbox>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates checkboxes with different initial states but full interactivity. Click to toggle - the labels show current state values.",
      },
    },
  },
};
