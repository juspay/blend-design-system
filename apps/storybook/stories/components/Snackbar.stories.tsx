import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Snackbar, addSnackbar, SnackbarVariant } from "blend-v1";
import { Button } from "blend-v1";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Trash2,
  Download,
  X,
  Layers,
  Save,
  WifiOff,
  Copy,
  Clock,
} from "lucide-react";

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `

A toast notification component for displaying temporary messages, alerts, and feedback to users with various styles and optional actions.

## Features
- Multiple variants (Info, Success, Warning, Error)
- Optional action button
- Dismissible with close button
- Auto-dismiss functionality
- Customizable header and description
- Smooth animations
- Stacked notifications support

## Usage

\`\`\`tsx
import { Snackbar, addSnackbar, SnackbarVariant } from 'blend-v1';

// First, add the Snackbar component to your app root
<Snackbar />

// Then trigger snackbars from anywhere
addSnackbar({
  header: "Success!",
  description: "Your changes have been saved.",
  variant: SnackbarVariant.SUCCESS,
  actionButton: {
    label: "Undo",
    onClick: () => console.log('Undo clicked')
  }
});
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Snackbar />
        <div style={{ height: "auto", minHeight: "250px", overflow: "hidden" }}>
          <Story />
        </div>
      </>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

// Default story
export const Default: Story = {
  render: () => (
    <div style={{ position: "relative" }}>
      <Button
        text="Show Basic Snackbar"
        onClick={() =>
          addSnackbar({
            header: "Default Snackbar",
            description: "This is a default snackbar notification.",
          })
        }
      />
    </div>
  ),
};

// Snackbar variants
export const SnackbarVariants: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, min-content)",
        gap: "16px",
        alignContent: "start",
      }}
    >
      <Button
        text="Show Info Snackbar"
        leadingIcon={Info}
        onClick={() =>
          addSnackbar({
            header: "Info Notification",
            description: "This is an informational message.",
            variant: SnackbarVariant.INFO,
          })
        }
      />
      <Button
        text="Show Success Snackbar"
        leadingIcon={CheckCircle}
        onClick={() =>
          addSnackbar({
            header: "Success!",
            description: "Your action completed successfully.",
            variant: SnackbarVariant.SUCCESS,
          })
        }
      />
      <Button
        text="Show Warning Snackbar"
        leadingIcon={AlertTriangle}
        onClick={() =>
          addSnackbar({
            header: "Warning",
            description: "Please review this important information.",
            variant: SnackbarVariant.WARNING,
          })
        }
      />
      <Button
        text="Show Error Snackbar"
        leadingIcon={XCircle}
        onClick={() =>
          addSnackbar({
            header: "Error",
            description: "Something went wrong. Please try again.",
            variant: SnackbarVariant.ERROR,
          })
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different snackbar variants for various message types and contexts.",
      },
    },
  },
};

// With action button
export const WithActionButton: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
        alignContent: "start",
      }}
    >
      <Button
        text="Show Delete with Undo"
        leadingIcon={Trash2}
        onClick={() =>
          addSnackbar({
            header: "File Deleted",
            description: "The file has been moved to trash.",
            variant: SnackbarVariant.INFO,
            actionButton: {
              label: "Undo",
              onClick: () => {
                console.log("Undo clicked");
                addSnackbar({
                  header: "Restored",
                  description: "File has been restored.",
                  variant: SnackbarVariant.SUCCESS,
                });
              },
            },
          })
        }
      />
      <Button
        text="Show Update Notification"
        leadingIcon={Download}
        onClick={() =>
          addSnackbar({
            header: "Update Available",
            description: "A new version is ready to install.",
            variant: SnackbarVariant.SUCCESS,
            actionButton: {
              label: "Install Now",
              onClick: () => {
                console.log("Install clicked");
                addSnackbar({
                  header: "Installing...",
                  description: "The update is being installed.",
                  variant: SnackbarVariant.INFO,
                });
              },
            },
          })
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Snackbars with action buttons for user interaction.",
      },
    },
  },
};

// With custom close callback
export const WithCloseCallback: Story = {
  render: () => (
    <div style={{ position: "relative" }}>
      <Button
        text="Show with Close Tracking"
        leadingIcon={X}
        onClick={() =>
          addSnackbar({
            header: "Tracking Close Event",
            description: "Check console when closing this snackbar.",
            variant: SnackbarVariant.INFO,
            onClose: () => {
              console.log("Snackbar was closed");
              // You could track analytics or perform cleanup here
            },
          })
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Snackbar with custom close callback for tracking or cleanup operations.",
      },
    },
  },
};

// Multiple snackbars
export const MultipleSnackbars: Story = {
  render: () => (
    <div style={{ position: "relative" }}>
      <Button
        text="Show Multiple Stacked"
        leadingIcon={Layers}
        onClick={() => {
          addSnackbar({
            header: "First Notification",
            description: "This is the first snackbar.",
            variant: SnackbarVariant.INFO,
          });
          setTimeout(() => {
            addSnackbar({
              header: "Second Notification",
              description: "This is the second snackbar.",
              variant: SnackbarVariant.SUCCESS,
            });
          }, 500);
          setTimeout(() => {
            addSnackbar({
              header: "Third Notification",
              description: "This is the third snackbar.",
              variant: SnackbarVariant.WARNING,
            });
          }, 1000);
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple snackbars can be stacked and displayed simultaneously.",
      },
    },
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, min-content)",
        gap: "16px",
        alignContent: "start",
      }}
    >
      <Button
        text="Show Save Success"
        leadingIcon={Save}
        onClick={() =>
          addSnackbar({
            header: "Saved",
            description: "Your changes have been saved successfully.",
            variant: SnackbarVariant.SUCCESS,
          })
        }
      />
      <Button
        text="Show Network Error"
        leadingIcon={WifiOff}
        onClick={() =>
          addSnackbar({
            header: "Network Error",
            description:
              "Unable to connect. Please check your internet connection.",
            variant: SnackbarVariant.ERROR,
            actionButton: {
              label: "Retry",
              onClick: () => {
                addSnackbar({
                  header: "Retrying...",
                  description: "Attempting to reconnect.",
                  variant: SnackbarVariant.INFO,
                });
              },
            },
          })
        }
      />
      <Button
        text="Show Copy Success"
        leadingIcon={Copy}
        onClick={() =>
          addSnackbar({
            header: "Copied to Clipboard",
            variant: SnackbarVariant.SUCCESS,
          })
        }
      />
      <Button
        text="Show Session Warning"
        leadingIcon={Clock}
        onClick={() =>
          addSnackbar({
            header: "Session Expiring",
            description: "Your session will expire in 5 minutes.",
            variant: SnackbarVariant.WARNING,
            actionButton: {
              label: "Extend Session",
              onClick: () => {
                addSnackbar({
                  header: "Session Extended",
                  description: "Your session has been extended by 30 minutes.",
                  variant: SnackbarVariant.SUCCESS,
                });
              },
            },
          })
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common real-world use cases for snackbar notifications.",
      },
    },
  },
};

// Without description
export const HeaderOnly: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        alignContent: "start",
      }}
    >
      <Button
        text="Show Quick Copy"
        leadingIcon={Copy}
        onClick={() =>
          addSnackbar({
            header: "Copied!",
            variant: SnackbarVariant.SUCCESS,
          })
        }
      />
      <Button
        text="Show Processing"
        leadingIcon={Info}
        onClick={() =>
          addSnackbar({
            header: "Processing...",
            variant: SnackbarVariant.INFO,
          })
        }
      />
      <Button
        text="Show Quick Error"
        leadingIcon={XCircle}
        onClick={() =>
          addSnackbar({
            header: "Failed to load",
            variant: SnackbarVariant.ERROR,
          })
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Snackbars can display just a header for brief notifications.",
      },
    },
  },
};
