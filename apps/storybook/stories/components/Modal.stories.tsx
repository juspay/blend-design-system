import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Modal, Button, ButtonType, TextInput } from "blend-v1";
import {
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  FileText,
  Download,
  Upload,
  Edit,
  Plus,
  Minus,
  Info,
  HelpCircle,
  Star,
  Heart,
  Share2,
  Copy,
  ExternalLink,
  Send,
  Image,
} from "lucide-react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    // Disable scroll locking in Storybook to prevent issues
    docs: {
      story: {
        inline: false,
        iframeHeight: "600px",
      },
      description: {
        component: `
A flexible modal dialog component for displaying content in an overlay with customizable header, footer, and action buttons.

## Features:
- Customizable header with title and subtitle
- Flexible content area for any React content
- Configurable action buttons (primary and secondary)
- Optional close button and backdrop click handling
- Custom header and footer support
- Divider and styling options
- Accessible keyboard navigation
- Focus management and scroll locking

## Use Cases:
- Confirmation dialogs
- Form submissions
- Content editing
- Information display
- User notifications
- Settings panels
- Image galleries
- Multi-step workflows

## Documentation
[View complete documentation →](http://localhost:3000/docs/components/Modal)
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Basic Modal
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "20px" }}>
        <Button
          buttonType={ButtonType.PRIMARY}
          text="Open Modal"
          onClick={() => setIsOpen(true)}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Basic Modal"
          subtitle="This is a simple modal example"
          primaryAction={{
            text: "Save",
            onClick: () => {
              alert("Saved!");
              setIsOpen(false);
            },
          }}
          secondaryAction={{
            text: "Cancel",
            onClick: () => setIsOpen(false),
          }}
        >
          <p>This is the modal content. You can put any React content here.</p>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Basic modal with title, subtitle, content, and action buttons.",
      },
    },
  },
};

// Confirmation Dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          buttonType={ButtonType.DANGER}
          text="Delete Item"
          leadingIcon={Trash2}
          onClick={() => setIsOpen(true)}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          subtitle="This action cannot be undone"
          primaryAction={{
            text: "Delete",
            onClick: () => {
              alert("Item deleted!");
              setIsOpen(false);
            },
          }}
          secondaryAction={{
            text: "Cancel",
            onClick: () => setIsOpen(false),
          }}
          showDivider={true}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <AlertTriangle size={24} color="#f59e0b" />
            <div>
              <p style={{ margin: 0, fontWeight: "500" }}>
                Are you sure you want to delete this item?
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                This will permanently remove the item from your account.
              </p>
            </div>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Confirmation dialog for destructive actions with warning styling.",
      },
    },
  },
};

// Form Modal
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    const handleSubmit = () => {
      if (!formData.name || !formData.email) {
        alert("Please fill in required fields");
        return;
      }
      alert("Form submitted successfully!");
      setIsOpen(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
      <>
        <Button
          buttonType={ButtonType.PRIMARY}
          text="Contact Us"
          leadingIcon={Mail}
          onClick={() => setIsOpen(true)}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Contact Information"
          subtitle="We'd love to hear from you"
          primaryAction={{
            text: "Send Message",
            onClick: handleSubmit,
          }}
          secondaryAction={{
            text: "Cancel",
            onClick: () => setIsOpen(false),
          }}
          showDivider={true}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your full name"
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
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email"
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
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="Enter your phone number"
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
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Tell us how we can help..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modal containing a contact form with validation and form handling.",
      },
    },
  },
};

// Custom Header and Footer
export const CustomHeaderFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const customHeader = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid #e5e7eb",
          background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Star size={24} />
          <div>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
              Premium Features
            </h2>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
              Unlock advanced capabilities
            </p>
          </div>
        </div>
        <Button
          buttonType={ButtonType.SECONDARY}
          text=""
          leadingIcon={X}
          onClick={() => setIsOpen(false)}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
          }}
        />
      </div>
    );

    const customFooter = (
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid #e5e7eb",
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          <Info size={16} />
          <span>30-day money-back guarantee</span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            buttonType={ButtonType.SECONDARY}
            text="Learn More"
            leadingIcon={ExternalLink}
          />
          <Button
            buttonType={ButtonType.PRIMARY}
            text="Upgrade Now"
            leadingIcon={Star}
          />
        </div>
      </div>
    );

    return (
      <>
        <Button
          buttonType={ButtonType.PRIMARY}
          text="View Premium"
          leadingIcon={Star}
          onClick={() => setIsOpen(true)}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          customHeader={customHeader}
          customFooter={customFooter}
          showHeader={false}
          showFooter={false}
        >
          <div style={{ padding: "24px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <CheckCircle size={20} color="#10b981" />
                <span>Advanced analytics and reporting</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <CheckCircle size={20} color="#10b981" />
                <span>Priority customer support</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <CheckCircle size={20} color="#10b981" />
                <span>Custom integrations and API access</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <CheckCircle size={20} color="#10b981" />
                <span>Unlimited team members</span>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modal with completely custom header and footer for branded experiences.",
      },
    },
  },
};

// No Header or Footer
export const ContentOnly: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          buttonType={ButtonType.SECONDARY}
          text="View Image"
          leadingIcon={Image}
          onClick={() => setIsOpen(true)}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showHeader={false}
          showFooter={false}
          showCloseButton={false}
          closeOnBackdropClick={true}
        >
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
              alt="Beautiful landscape"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <Button
              buttonType={ButtonType.SECONDARY}
              text=""
              leadingIcon={X}
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
              }}
            />
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modal without header or footer, useful for image galleries or media content.",
      },
    },
  },
};

// Header Right Slot
export const HeaderRightSlot: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const headerRightSlot = (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          buttonType={ButtonType.SECONDARY}
          text=""
          leadingIcon={isFavorite ? Heart : Heart}
          onClick={() => setIsFavorite(!isFavorite)}
          style={{
            color: isFavorite ? "#ef4444" : "#6b7280",
            border: "none",
            background: "transparent",
          }}
        />
        <Button
          buttonType={ButtonType.SECONDARY}
          text=""
          leadingIcon={Share2}
          style={{ border: "none", background: "transparent" }}
        />
        <Button
          buttonType={ButtonType.SECONDARY}
          text=""
          leadingIcon={Copy}
          style={{ border: "none", background: "transparent" }}
        />
      </div>
    );

    return (
      <>
        <Button
          buttonType={ButtonType.PRIMARY}
          text="View Article"
          leadingIcon={FileText}
          onClick={() => setIsOpen(true)}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Getting Started with React"
          subtitle="A comprehensive guide for beginners"
          headerRightSlot={headerRightSlot}
          showDivider={true}
          primaryAction={{
            text: "Continue Reading",
            onClick: () => setIsOpen(false),
          }}
        >
          <div style={{ lineHeight: "1.6" }}>
            <p>
              React is a popular JavaScript library for building user
              interfaces, particularly web applications. It was developed by
              Facebook and is now maintained by Meta and the open-source
              community.
            </p>
            <p>
              One of React's key features is its component-based architecture,
              which allows developers to build encapsulated components that
              manage their own state and compose them to make complex UIs.
            </p>
            <p>
              React uses a virtual DOM to efficiently update the user interface,
              making applications fast and responsive even with complex state
              changes.
            </p>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Modal with additional action buttons in the header right slot.",
      },
    },
  },
};

// Settings Modal
export const SettingsModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      language: "en",
    });

    return (
      <>
        <Button
          buttonType={ButtonType.SECONDARY}
          text="Settings"
          leadingIcon={Settings}
          onClick={() => setIsOpen(true)}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Application Settings"
          subtitle="Customize your experience"
          primaryAction={{
            text: "Save Changes",
            onClick: () => {
              alert("Settings saved!");
              setIsOpen(false);
            },
          }}
          secondaryAction={{
            text: "Reset to Default",
            onClick: () => {
              setSettings({
                notifications: true,
                darkMode: false,
                autoSave: true,
                language: "en",
              });
            },
          }}
          showDivider={true}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Preferences
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: e.target.checked,
                      }))
                    }
                  />
                  <span>Enable notifications</span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        darkMode: e.target.checked,
                      }))
                    }
                  />
                  <span>Dark mode</span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        autoSave: e.target.checked,
                      }))
                    }
                  />
                  <span>Auto-save changes</span>
                </label>
              </div>
            </div>

            <div>
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Language
              </h4>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, language: e.target.value }))
                }
                style={{
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  width: "100%",
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Settings modal with form controls and configuration options.",
      },
    },
  },
};

// Success Modal
export const SuccessModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          buttonType={ButtonType.SUCCESS}
          text="Complete Action"
          leadingIcon={CheckCircle}
          onClick={() => setIsOpen(true)}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Success!"
          subtitle="Your action has been completed"
          primaryAction={{
            text: "Continue",
            onClick: () => setIsOpen(false),
          }}
          showCloseButton={false}
        >
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <CheckCircle
              size={64}
              color="#10b981"
              style={{ marginBottom: "16px" }}
            />
            <p style={{ fontSize: "16px", margin: "0 0 8px 0" }}>
              Your payment has been processed successfully!
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
              You will receive a confirmation email shortly.
            </p>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Success modal for positive feedback and confirmations.",
      },
    },
  },
};
