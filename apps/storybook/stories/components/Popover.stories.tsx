import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Popover, PopoverSize } from "blend-v1";
import { ButtonV2, ButtonTypeV2, ButtonSizeV2 } from "blend-v1";
import {
  Settings,
  User,
  Bell,
  HelpCircle,
  Info,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Share,
} from "lucide-react";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A flexible popover component for displaying contextual content, forms, and actions in an overlay positioned relative to a trigger element.

## Features
- Two sizes (Small, Medium)
- Flexible positioning (top, right, bottom, left)
- Alignment options (start, center, end)
- Optional header with heading and description
- Optional footer with primary and secondary actions
- Controlled and uncontrolled modes
- Modal mode support
- Customizable dimensions and spacing
- Built on Radix UI primitives for accessibility

## Usage

\`\`\`tsx
import { Popover, PopoverSize } from 'blend-v1';
import { ButtonV2 } from 'blend-v1';

<Popover
  trigger={<ButtonV2>Open Popover</ButtonV2>}
  heading="Popover Title"
  description="This is a popover description"
  size={PopoverSize.MEDIUM}
>
  <div>Your popover content here</div>
</Popover>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    heading: {
      control: "text",
      description: "The heading text displayed in the popover header",
    },
    description: {
      control: "text",
      description: "The description text displayed in the popover header",
    },
    size: {
      control: "select",
      options: Object.values(PopoverSize),
      description: "The size of the popover",
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "The preferred side of the trigger to render against",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "The preferred alignment against the trigger",
    },
    sideOffset: {
      control: "number",
      description: "The distance in pixels from the trigger",
    },
    alignOffset: {
      control: "number",
      description: "An offset in pixels from the alignment axis",
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show the close button in the header",
    },
    asModal: {
      control: "boolean",
      description: "Whether the popover should behave as a modal",
    },
    open: {
      control: "boolean",
      description: "The controlled open state of the popover",
    },
    width: {
      control: "number",
      description: "The width of the popover in pixels",
    },
    minWidth: {
      control: "number",
      description: "The minimum width of the popover in pixels",
    },
    maxWidth: {
      control: "number",
      description: "The maximum width of the popover in pixels",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback when the open state changes",
    },
    onClose: {
      action: "closed",
      description: "Callback when the popover is closed",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

// Default story
export const Default: Story = {
  args: {
    heading: "Popover Title",
    description: "This is a popover with some descriptive text.",
    size: PopoverSize.MEDIUM,
    side: "bottom",
    align: "center",
    sideOffset: 8,
    showCloseButton: true,
    asModal: false,
  },
  render: (args) => (
    <div style={{ padding: "100px" }}>
      <Popover
        {...args}
        trigger={
          <ButtonV2 buttonType={ButtonTypeV2.PRIMARY} text="Open Popover" />
        }
      >
        <div style={{ padding: "20px 0" }}>
          <p
            style={{
              margin: 0,
              color: "#475569",
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            This is the main content area of the popover. You can place any
            content here, including text, forms, lists, or other components.
          </p>
        </div>
      </Popover>
    </div>
  ),
};

// Popover sizes
export const PopoverSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", padding: "100px" }}>
      <Popover
        trigger={
          <ButtonV2 buttonType={ButtonTypeV2.PRIMARY} text="Small Popover" />
        }
        heading="Small Size"
        description="This is a small popover"
        size={PopoverSize.SMALL}
      >
        <div style={{ padding: "16px 0" }}>
          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Small popover content with compact spacing and optimized typography.
          </p>
        </div>
      </Popover>

      <Popover
        trigger={
          <ButtonV2 buttonType={ButtonTypeV2.PRIMARY} text="Medium Popover" />
        }
        heading="Medium Size"
        description="This is a medium popover with more space"
        size={PopoverSize.MEDIUM}
      >
        <div style={{ padding: "20px 0" }}>
          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Medium popover content with comfortable spacing for more detailed
            information and better readability. Perfect for longer descriptions
            and content.
          </p>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different popover sizes: small for compact content and medium for more detailed information.",
      },
    },
  },
};

// Positioning options
export const Positioning: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "32px",
        padding: "150px",
        placeItems: "center",
      }}
    >
      <Popover
        trigger={<ButtonV2 buttonType={ButtonTypeV2.SECONDARY} text="Top" />}
        heading="Top Position"
        description="Popover positioned above the trigger"
        side="top"
      >
        <div style={{ padding: "18px 0" }}>
          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Content positioned above the trigger element.
          </p>
        </div>
      </Popover>

      <Popover
        trigger={<ButtonV2 buttonType={ButtonTypeV2.SECONDARY} text="Right" />}
        heading="Right Position"
        description="Popover positioned to the right"
        side="right"
      >
        <div style={{ padding: "18px 0" }}>
          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Content positioned to the right of the trigger.
          </p>
        </div>
      </Popover>

      <Popover
        trigger={<ButtonV2 buttonType={ButtonTypeV2.SECONDARY} text="Bottom" />}
        heading="Bottom Position"
        description="Popover positioned below the trigger"
        side="bottom"
      >
        <div style={{ padding: "18px 0" }}>
          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Content positioned below the trigger element.
          </p>
        </div>
      </Popover>

      <Popover
        trigger={<ButtonV2 buttonType={ButtonTypeV2.SECONDARY} text="Left" />}
        heading="Left Position"
        description="Popover positioned to the left"
        side="left"
      >
        <div style={{ padding: "18px 0" }}>
          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Content positioned to the left of the trigger.
          </p>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different positioning options: top, right, bottom, and left relative to the trigger.",
      },
    },
  },
};

// With actions
export const WithActions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", padding: "100px" }}>
      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.PRIMARY}
            text="Settings"
            leadingIcon={<Settings size={16} />}
          />
        }
        heading="Confirm Action"
        description="Are you sure you want to delete this item? This action cannot be undone."
        primaryAction={{
          text: "Delete",
          buttonType: ButtonTypeV2.DANGER,
          onClick: () => console.log("Delete clicked"),
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonTypeV2.SECONDARY,
          onClick: () => console.log("Cancel clicked"),
        }}
      >
        <div style={{ padding: "16px 0" }}>
          <div
            style={{
              padding: "12px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#dc2626",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              ⚠️ This action is permanent and cannot be undone.
            </p>
          </div>
        </div>
      </Popover>

      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            text="Profile"
            leadingIcon={<User size={16} />}
          />
        }
        heading="Update Profile"
        description="Make changes to your profile information"
        primaryAction={{
          text: "Save Changes",
          buttonType: ButtonTypeV2.PRIMARY,
          onClick: () => console.log("Save clicked"),
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonTypeV2.SECONDARY,
          onClick: () => console.log("Cancel clicked"),
        }}
      >
        <div style={{ padding: "16px 0" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
              >
                Display Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                defaultValue="john@example.com"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Popovers with primary and secondary actions for user interaction and form submission.",
      },
    },
  },
};

// Content variations
export const ContentVariations: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        padding: "100px",
        flexWrap: "wrap",
      }}
    >
      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            text="Info"
            leadingIcon={<Info size={16} />}
          />
        }
        heading="Information"
        description="Additional details and context"
      >
        <div style={{ padding: "16px 0" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle size={16} style={{ color: "#10b981" }} />
              <span style={{ fontSize: "14px" }}>Feature enabled</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={16} style={{ color: "#f59e0b" }} />
              <span style={{ fontSize: "14px" }}>Requires attention</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <User size={16} style={{ color: "#6b7280" }} />
              <span style={{ fontSize: "14px" }}>3 users affected</span>
            </div>
          </div>
        </div>
      </Popover>

      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            text="Filters"
            leadingIcon={<Filter size={16} />}
          />
        }
        heading="Filter Options"
        description="Customize your view"
        maxWidth={300}
      >
        <div style={{ padding: "16px 0" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Status
              </label>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {["Active", "Inactive", "Pending"].map((status) => (
                  <label
                    key={status}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <input
                      type="checkbox"
                      defaultChecked={status === "Active"}
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Date Range
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Custom range</option>
              </select>
            </div>
          </div>
        </div>
      </Popover>

      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            text="Share"
            leadingIcon={<Share size={16} />}
          />
        }
        heading="Share Options"
        description="Choose how to share this content"
      >
        <div style={{ padding: "16px 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              {
                icon: <User size={16} />,
                label: "Share with team",
                desc: "All team members can view",
              },
              {
                icon: <Bell size={16} />,
                label: "Send notification",
                desc: "Notify via email",
              },
              {
                icon: <Download size={16} />,
                label: "Export data",
                desc: "Download as CSV",
              },
            ].map((option, index) => (
              <button
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <div style={{ color: "#6b7280" }}>{option.icon}</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {option.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different content types: information displays, filter forms, and action menus.",
      },
    },
  },
};

// Without header
export const WithoutHeader: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", padding: "100px" }}>
      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            text="Quick Edit"
            leadingIcon={<Edit size={16} />}
          />
        }
        showCloseButton={false}
      >
        <div style={{ padding: "16px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <input
              type="text"
              placeholder="Enter title..."
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
            <textarea
              placeholder="Enter description..."
              rows={3}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <ButtonV2
                buttonType={ButtonTypeV2.SECONDARY}
                size={ButtonSizeV2.SMALL}
                text="Cancel"
              />
              <ButtonV2
                buttonType={ButtonTypeV2.PRIMARY}
                size={ButtonSizeV2.SMALL}
                text="Save"
              />
            </div>
          </div>
        </div>
      </Popover>

      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            text="Quick Actions"
            leadingIcon={<Plus size={16} />}
          />
        }
        showCloseButton={false}
        maxWidth={200}
      >
        <div style={{ padding: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { icon: <Plus size={14} />, label: "New Item" },
              { icon: <Edit size={14} />, label: "Edit Selected" },
              { icon: <Trash2 size={14} />, label: "Delete" },
              { icon: <Download size={14} />, label: "Export" },
            ].map((action, index) => (
              <button
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  borderRadius: "4px",
                  width: "100%",
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span style={{ color: "#6b7280" }}>{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Popovers without headers for compact forms and action menus.",
      },
    },
  },
};

// Modal mode
export const ModalMode: Story = {
  render: () => (
    <div style={{ padding: "100px" }}>
      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.PRIMARY}
            text="Open Modal Popover"
          />
        }
        heading="Modal Popover"
        description="This popover behaves as a modal and blocks interaction with the background"
        asModal={true}
        primaryAction={{
          text: "Confirm",
          buttonType: ButtonTypeV2.PRIMARY,
          onClick: () => console.log("Confirmed"),
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonTypeV2.SECONDARY,
          onClick: () => console.log("Cancelled"),
        }}
      >
        <div style={{ padding: "16px 0" }}>
          <p style={{ margin: "0 0 16px 0", color: "#64748b" }}>
            When a popover is in modal mode, it prevents interaction with the
            rest of the page until it's closed. This is useful for important
            confirmations or forms that require the user's full attention.
          </p>
          <div
            style={{
              padding: "12px",
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "6px",
            }}
          >
            <p style={{ margin: 0, color: "#1d4ed8", fontSize: "14px" }}>
              💡 Try clicking outside this popover - it won't close because it's
              in modal mode.
            </p>
          </div>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Modal mode prevents interaction with the background until the popover is closed.",
      },
    },
  },
};

// Complex example
export const ComplexExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        padding: "100px",
        flexWrap: "wrap",
      }}
    >
      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.PRIMARY}
            text="User Profile"
            leadingIcon={<User size={16} />}
          />
        }
        heading="John Doe"
        description="Software Engineer • Online"
        size={PopoverSize.MEDIUM}
        maxWidth={350}
        primaryAction={{
          text: "Send Message",
          buttonType: ButtonTypeV2.PRIMARY,
          onClick: () => console.log("Send message"),
        }}
        secondaryAction={{
          text: "View Profile",
          buttonType: ButtonTypeV2.SECONDARY,
          onClick: () => console.log("View profile"),
        }}
      >
        <div style={{ padding: "16px 0" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                JD
              </div>
              <div>
                <div style={{ fontWeight: "600", fontSize: "16px" }}>
                  John Doe
                </div>
                <div style={{ color: "#6b7280", fontSize: "14px" }}>
                  john.doe@company.com
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "2px",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                    }}
                  ></div>
                  <span
                    style={{
                      color: "#10b981",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>
                    Department
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>
                    Engineering
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>
                    Location
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>
                    San Francisco, CA
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>
                    Joined
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>
                    March 2023
                  </span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Recent Activity
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  • Completed code review for PR #123
                </div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  • Updated documentation for API endpoints
                </div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  • Attended team standup meeting
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popover>

      <Popover
        trigger={
          <ButtonV2
            buttonType={ButtonTypeV2.SECONDARY}
            text="Help & Support"
            leadingIcon={<HelpCircle size={16} />}
          />
        }
        heading="Need Help?"
        description="Find answers or get in touch with our support team"
        size={PopoverSize.MEDIUM}
        maxWidth={320}
      >
        <div style={{ padding: "16px 0" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {[
              {
                icon: <Info size={16} />,
                title: "Documentation",
                desc: "Browse our comprehensive guides",
                color: "#3b82f6",
              },
              {
                icon: <Bell size={16} />,
                title: "Contact Support",
                desc: "Get help from our support team",
                color: "#10b981",
              },
              {
                icon: <Settings size={16} />,
                title: "System Status",
                desc: "Check current system status",
                color: "#f59e0b",
              },
            ].map((item, index) => (
              <button
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <div style={{ color: item.color, marginTop: "2px" }}>
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "2px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {item.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complex examples with rich content, user profiles, and support interfaces.",
      },
    },
  },
};
