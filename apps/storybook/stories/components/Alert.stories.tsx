import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Alert,
  AlertVariant,
  AlertStyle,
  AlertActionPlacement,
} from "blend-v1";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Settings,
  Heart,
} from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A versatile alert component for displaying important messages, notifications, and status updates with various styles and action buttons.

## Features
- Multiple variants (Primary, Success, Warning, Error, Purple, Orange, Neutral)
- Two visual styles (Subtle, No-fill)
- Primary and secondary action buttons
- Closable alerts with onClose callback
- Custom icon support
- Flexible action placement (bottom, right)
- Responsive design

## Usage

\`\`\`tsx
import { Alert, AlertVariant, AlertStyle } from 'blend-v1';

<Alert
  heading="Success!"
  description="Your changes have been saved successfully."
  variant={AlertVariant.SUCCESS}
  primaryAction={{
    label: "View Changes",
    onClick: () => console.log('View changes clicked!')
  }}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    heading: {
      control: "text",
      description: "The main heading text of the alert",
    },
    description: {
      control: "text",
      description:
        "The description text providing more details about the alert",
    },
    variant: {
      control: "select",
      options: Object.values(AlertVariant),
      description:
        "The visual variant of the alert determining its color scheme",
    },
    style: {
      control: "select",
      options: Object.values(AlertStyle),
      description: "The visual style of the alert",
    },
    actionPlacement: {
      control: "select",
      options: Object.values(AlertActionPlacement),
      description: "Placement of action buttons within the alert",
    },
    onClose: {
      action: "closed",
      description: "Callback function called when the alert is closed",
    },
    primaryAction: {
      control: "object",
      description: "Primary action button configuration",
    },
    secondaryAction: {
      control: "object",
      description: "Secondary action button configuration",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Default story
export const Default: Story = {
  args: {
    heading: "Alert Heading",
    description:
      "This is the alert description providing more context about the notification.",
    variant: AlertVariant.PRIMARY,
    style: AlertStyle.SUBTLE,
  },
};

// Alert variants
export const AlertVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <Alert
        heading="Primary Alert"
        description="This is a primary alert for general information."
        variant={AlertVariant.PRIMARY}
      />
      <Alert
        heading="Success Alert"
        description="Your action completed successfully."
        variant={AlertVariant.SUCCESS}
      />
      <Alert
        heading="Warning Alert"
        description="Please review this important information."
        variant={AlertVariant.WARNING}
      />
      <Alert
        heading="Error Alert"
        description="Something went wrong. Please try again."
        variant={AlertVariant.ERROR}
      />
      <Alert
        heading="Purple Alert"
        description="This is a purple variant alert."
        variant={AlertVariant.PURPLE}
      />
      <Alert
        heading="Orange Alert"
        description="This is an orange variant alert."
        variant={AlertVariant.ORANGE}
      />
      <Alert
        heading="Neutral Alert"
        description="This is a neutral alert for general information."
        variant={AlertVariant.NEUTRAL}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different alert variants for various message types and contexts.",
      },
    },
  },
};

// Alert styles
export const AlertStyles: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <Alert
        heading="Subtle Style"
        description="Alert with subtle background coloring."
        variant={AlertVariant.SUCCESS}
        style={AlertStyle.SUBTLE}
      />
      <Alert
        heading="No Fill Style"
        description="Alert with no background fill, border only."
        variant={AlertVariant.SUCCESS}
        style={AlertStyle.NO_FILL}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different visual styles: subtle background vs no-fill with border only.",
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <Alert
        heading="Success with Icon"
        description="Operation completed successfully."
        variant={AlertVariant.SUCCESS}
        icon={<CheckCircle size={16} />}
      />
      <Alert
        heading="Warning with Icon"
        description="Please review this important information."
        variant={AlertVariant.WARNING}
        icon={<AlertTriangle size={16} />}
      />
      <Alert
        heading="Error with Icon"
        description="Something went wrong. Please try again."
        variant={AlertVariant.ERROR}
        icon={<XCircle size={16} />}
      />
      <Alert
        heading="Info with Icon"
        description="Here's some additional information for you."
        variant={AlertVariant.PRIMARY}
        icon={<Info size={16} />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alerts with custom icons to enhance visual communication.",
      },
    },
  },
};

// With actions
export const WithActions: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <Alert
        heading="Confirmation Required"
        description="Are you sure you want to delete this item?"
        variant={AlertVariant.WARNING}
        primaryAction={{
          label: "Delete",
          onClick: () => console.log("Delete clicked"),
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => console.log("Cancel clicked"),
        }}
      />
      <Alert
        heading="Update Available"
        description="A new version is available. Would you like to update now?"
        variant={AlertVariant.SUCCESS}
        icon={<Settings size={16} />}
        primaryAction={{
          label: "Update Now",
          onClick: () => console.log("Update clicked"),
        }}
        secondaryAction={{
          label: "Later",
          onClick: () => console.log("Later clicked"),
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Alerts with primary and secondary action buttons for user interaction.",
      },
    },
  },
};

// Action placement
export const ActionPlacement: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <Alert
        heading="Actions on Right"
        description="Actions are placed on the right side of the alert content."
        variant={AlertVariant.PRIMARY}
        actionPlacement={AlertActionPlacement.RIGHT}
        primaryAction={{
          label: "Primary",
          onClick: () => console.log("Primary clicked"),
        }}
        secondaryAction={{
          label: "Secondary",
          onClick: () => console.log("Secondary clicked"),
        }}
      />
      <Alert
        heading="Actions at Bottom"
        description="Actions are placed at the bottom of the alert content for better mobile experience."
        variant={AlertVariant.SUCCESS}
        actionPlacement={AlertActionPlacement.BOTTOM}
        primaryAction={{
          label: "Primary Action",
          onClick: () => console.log("Primary clicked"),
        }}
        secondaryAction={{
          label: "Secondary Action",
          onClick: () => console.log("Secondary clicked"),
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different action button placements: right-aligned or bottom-stacked.",
      },
    },
  },
};

// Closable alerts
export const ClosableAlerts: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <Alert
        heading="Closable Alert"
        description="This alert can be dismissed by clicking the close button."
        variant={AlertVariant.PRIMARY}
        onClose={() => console.log("Alert closed")}
      />
      <Alert
        heading="Closable with Actions"
        description="This alert has both actions and a close button."
        variant={AlertVariant.WARNING}
        primaryAction={{
          label: "Action",
          onClick: () => console.log("Action clicked"),
        }}
        onClose={() => console.log("Alert closed")}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Alerts that can be dismissed by users with close functionality.",
      },
    },
  },
};
