import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Switch, SwitchGroup, SwitchSize } from "blend-v1";
import {
  Settings,
  Wifi,
  Bluetooth,
  Shield,
  Bell,
  Moon,
  Star,
  Zap,
} from "lucide-react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A toggle switch component for binary on/off states with support for controlled and uncontrolled modes, multiple sizes, and comprehensive form integration capabilities.

## Features
- Controlled and uncontrolled modes
- Two sizes (Small, Medium)
- Error state handling
- Required field indication
- Label and subtext support
- Custom slot for additional content
- Disabled state support
- Switch group functionality
- Accessible design with proper ARIA attributes
- Form integration ready

## Usage

\`\`\`tsx
import { Switch, SwitchGroup, SwitchSize } from 'blend-v1';

<Switch 
  size={SwitchSize.MEDIUM}
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
  subtext="Get alerts about new messages"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controlled checked state of the switch",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state for uncontrolled mode",
    },
    size: {
      control: "select",
      options: Object.values(SwitchSize),
      description: "Size variant of the switch",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the switch is required (shows asterisk)",
    },
    error: {
      control: "boolean",
      description: "Whether the switch is in error state",
    },
    label: {
      control: "text",
      description: "Label content for the switch",
    },
    subtext: {
      control: "text",
      description: "Additional descriptive text below the switch",
    },
    value: {
      control: "text",
      description: "Value attribute for the switch input",
    },
    name: {
      control: "text",
      description: "Name attribute for form submission",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the switch state changes",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Default story
export const Default: Story = {
  args: {
    label: "Default switch",
    size: SwitchSize.MEDIUM,
    defaultChecked: false,
    disabled: false,
    required: false,
    error: false,
  },
};

// Switch sizes
export const SwitchSizes: Story = {
  render: () => {
    const [sizes, setSizes] = useState({
      small: false,
      medium: true,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Switch
          size={SwitchSize.SMALL}
          checked={sizes.small}
          onChange={(checked) =>
            setSizes((prev) => ({ ...prev, small: checked }))
          }
          label="Small switch"
        />
        <Switch
          size={SwitchSize.MEDIUM}
          checked={sizes.medium}
          onChange={(checked) =>
            setSizes((prev) => ({ ...prev, medium: checked }))
          }
          label="Medium switch"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Different switch sizes: Small and Medium. Click to toggle each switch.",
      },
    },
  },
};

// Switch states
export const SwitchStates: Story = {
  render: () => {
    const [states, setStates] = useState({
      off: false,
      on: true,
      disabledOff: false,
      disabledOn: true,
      error: false,
      required: false,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{ marginBottom: "8px", fontWeight: "500", fontSize: "14px" }}
        >
          Interactive States:
        </div>
        <Switch
          checked={states.off}
          onChange={(checked) =>
            setStates((prev) => ({ ...prev, off: checked }))
          }
          label="Off state (Click to turn on)"
        />
        <Switch
          checked={states.on}
          onChange={(checked) =>
            setStates((prev) => ({ ...prev, on: checked }))
          }
          label="On state (Click to turn off)"
        />

        <div
          style={{
            marginTop: "16px",
            marginBottom: "8px",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Disabled States:
        </div>
        <Switch disabled={true} defaultChecked={false} label="Disabled off" />
        <Switch disabled={true} defaultChecked={true} label="Disabled on" />

        <div
          style={{
            marginTop: "16px",
            marginBottom: "8px",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Other States:
        </div>
        <Switch
          error={true}
          checked={states.error}
          onChange={(checked) =>
            setStates((prev) => ({ ...prev, error: checked }))
          }
          label="Error state"
        />
        <Switch
          required={true}
          checked={states.required}
          onChange={(checked) =>
            setStates((prev) => ({ ...prev, required: checked }))
          }
          label="Required field"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Different switch states: interactive toggles, disabled variants, error states, and required fields.",
      },
    },
  },
};

// Controlled switch
export const ControlledSwitch: Story = {
  render: () => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Switch
          checked={isEnabled}
          onChange={setIsEnabled}
          size={SwitchSize.MEDIUM}
          label="Dark mode"
          subtext="Toggle between light and dark themes"
        />
        <div style={{ fontSize: "14px", color: "#666" }}>
          Current mode: {isEnabled ? "Dark" : "Light"}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled switch with state management and visual feedback.",
      },
    },
  },
};

// Switch with subtext
export const WithSubtext: Story = {
  render: () => {
    const [subtextStates, setSubtextStates] = useState({
      notifications: true,
      sync: false,
      privacy: false,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Switch
          size={SwitchSize.MEDIUM}
          label="Push notifications"
          subtext="Get notified about important updates and messages"
          checked={subtextStates.notifications}
          onChange={(checked) =>
            setSubtextStates((prev) => ({ ...prev, notifications: checked }))
          }
        />
        <Switch
          size={SwitchSize.SMALL}
          label="Auto-sync data"
          subtext="Automatically sync your data across all devices"
          checked={subtextStates.sync}
          onChange={(checked) =>
            setSubtextStates((prev) => ({ ...prev, sync: checked }))
          }
        />
        <Switch
          error={true}
          label="Enhanced privacy"
          subtext="This setting requires premium subscription"
          checked={subtextStates.privacy}
          onChange={(checked) =>
            setSubtextStates((prev) => ({ ...prev, privacy: checked }))
          }
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Switches with additional descriptive subtext. Click to toggle each switch.",
      },
    },
  },
};

// Switch with custom slots
export const WithSlots: Story = {
  render: () => {
    const [slotStates, setSlotStates] = useState({
      wifi: true,
      bluetooth: false,
      premium: true,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Switch
          size={SwitchSize.MEDIUM}
          label="Wi-Fi"
          slot={
            <Wifi size={16} color={slotStates.wifi ? "#10b981" : "#6b7280"} />
          }
          subtext="Connect to wireless networks"
          checked={slotStates.wifi}
          onChange={(checked) =>
            setSlotStates((prev) => ({ ...prev, wifi: checked }))
          }
        />
        <Switch
          size={SwitchSize.MEDIUM}
          label="Bluetooth"
          slot={
            <Bluetooth
              size={16}
              color={slotStates.bluetooth ? "#3b82f6" : "#6b7280"}
            />
          }
          subtext="Connect to Bluetooth devices"
          checked={slotStates.bluetooth}
          onChange={(checked) =>
            setSlotStates((prev) => ({ ...prev, bluetooth: checked }))
          }
        />
        <Switch
          size={SwitchSize.MEDIUM}
          label="Premium features"
          slot={
            <Star
              size={16}
              color={slotStates.premium ? "#fbbf24" : "#6b7280"}
            />
          }
          subtext="Access advanced functionality"
          checked={slotStates.premium}
          onChange={(checked) =>
            setSlotStates((prev) => ({ ...prev, premium: checked }))
          }
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Switches with custom content slots (icons) for visual enhancement. Click to toggle each switch.",
      },
    },
  },
};

// Error and validation states
export const ErrorAndValidation: Story = {
  render: () => {
    const [errorStates, setErrorStates] = useState({
      required: false,
      error: false,
      requiredError: false,
      terms: false,
    });
    const [showError, setShowError] = useState(false);

    const handleSubmit = () => {
      if (!errorStates.terms) {
        setShowError(true);
      } else {
        setShowError(false);
        alert("Terms accepted successfully!");
      }
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Switch
          required={true}
          label="Required setting"
          checked={errorStates.required}
          onChange={(checked) =>
            setErrorStates((prev) => ({ ...prev, required: checked }))
          }
        />
        <Switch
          error={true}
          label="Error state"
          checked={errorStates.error}
          onChange={(checked) =>
            setErrorStates((prev) => ({ ...prev, error: checked }))
          }
        />
        <Switch
          required={true}
          error={true}
          label="Required with error"
          checked={errorStates.requiredError}
          onChange={(checked) =>
            setErrorStates((prev) => ({ ...prev, requiredError: checked }))
          }
        />
        <Switch
          required={true}
          error={showError}
          label="Accept terms and conditions"
          subtext={
            showError
              ? "You must accept the terms to continue"
              : "Please read our terms of service"
          }
          checked={errorStates.terms}
          onChange={(checked) => {
            setErrorStates((prev) => ({ ...prev, terms: checked }));
            if (checked) setShowError(false);
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "8px",
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Switches with required indicators, error states, and form validation.",
      },
    },
  },
};

// Switch Group examples
export const SwitchGroupExamples: Story = {
  render: () => {
    const [groupStates, setGroupStates] = useState({
      basicGroup: ["wifi"],
      settingsGroup: ["notifications", "sync"],
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <SwitchGroup
          label="Network Settings"
          name="network"
          value={groupStates.basicGroup}
          onChange={(values) =>
            setGroupStates((prev) => ({ ...prev, basicGroup: values }))
          }
        >
          <Switch
            value="wifi"
            label="Wi-Fi"
            subtext="Connect to wireless networks"
            slot={<Wifi size={16} color="#10b981" />}
          />
          <Switch
            value="bluetooth"
            label="Bluetooth"
            subtext="Connect to Bluetooth devices"
            slot={<Bluetooth size={16} color="#3b82f6" />}
          />
          <Switch
            value="cellular"
            label="Cellular Data"
            subtext="Use cellular network for internet"
          />
        </SwitchGroup>

        <SwitchGroup
          label="App Preferences"
          name="preferences"
          value={groupStates.settingsGroup}
          onChange={(values) =>
            setGroupStates((prev) => ({ ...prev, settingsGroup: values }))
          }
        >
          <Switch
            value="notifications"
            label="Push Notifications"
            subtext="Receive app notifications"
            slot={<Bell size={16} color="#f59e0b" />}
          />
          <Switch
            value="sync"
            label="Auto Sync"
            subtext="Automatically sync data"
          />
          <Switch
            value="analytics"
            label="Usage Analytics"
            subtext="Help improve the app"
          />
          <Switch
            value="darkmode"
            label="Dark Mode"
            subtext="Use dark theme"
            slot={<Moon size={16} color="#6366f1" />}
          />
        </SwitchGroup>

        <div
          style={{
            fontSize: "14px",
            color: "#666",
            padding: "12px",
            backgroundColor: "#f9fafb",
            borderRadius: "6px",
          }}
        >
          <strong>Selected values:</strong>
          <br />
          Network: {groupStates.basicGroup.join(", ") || "None"}
          <br />
          Preferences: {groupStates.settingsGroup.join(", ") || "None"}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Switch groups for managing multiple related switches with coordinated state. Click to toggle individual switches.",
      },
    },
  },
};

// Uncontrolled switch
export const UncontrolledSwitch: Story = {
  render: () => {
    const [uncontrolledStates, setUncontrolledStates] = useState({
      defaultOff: false,
      defaultOn: true,
      selfManaged: false,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <Switch
            checked={uncontrolledStates.defaultOff}
            onChange={(checked) =>
              setUncontrolledStates((prev) => ({
                ...prev,
                defaultOff: checked,
              }))
            }
            size={SwitchSize.MEDIUM}
            label={`Started off (now ${uncontrolledStates.defaultOff ? "on" : "off"})`}
          />
        </div>
        <div>
          <Switch
            checked={uncontrolledStates.defaultOn}
            onChange={(checked) =>
              setUncontrolledStates((prev) => ({ ...prev, defaultOn: checked }))
            }
            size={SwitchSize.MEDIUM}
            label={`Started on (now ${uncontrolledStates.defaultOn ? "on" : "off"})`}
          />
        </div>
        <div>
          <Switch
            checked={uncontrolledStates.selfManaged}
            onChange={(checked) =>
              setUncontrolledStates((prev) => ({
                ...prev,
                selfManaged: checked,
              }))
            }
            size={SwitchSize.SMALL}
            label="Self-managed switch"
            subtext={`Current state: ${uncontrolledStates.selfManaged ? "enabled" : "disabled"}`}
            slot={
              <Settings
                size={14}
                color={uncontrolledStates.selfManaged ? "#10b981" : "#6b7280"}
              />
            }
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates switches with different initial states but full interactivity. Click to toggle - the labels show current state values.",
      },
    },
  },
};
