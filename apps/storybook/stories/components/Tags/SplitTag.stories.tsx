import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SplitTag, TagColor, TagSize, TagShape } from "blend-v1";

// Figma Code Connect is configured in SplitTag.figma.tsx
import {
  Star,
  Check,
  X,
  AlertCircle,
  Info,
  User,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Shield,
  Award,
  Flag,
  Hash,
  Percent,
  Package,
  GitBranch,
  Database,
  Server,
  Cpu,
  Activity,
} from "lucide-react";

const meta: Meta<typeof SplitTag> = {
  title: "Components/Tags/SplitTag",
  component: SplitTag,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A specialized tag component that combines two tags to display key-value pairs or related information with distinct visual separation.

## Features
- Combines primary and secondary tags seamlessly
- Automatic styling (primary: no-fill, secondary: attentive)
- Supports all tag sizes and shapes
- Left and right slots for icons in both tags
- Click handlers for interactive behavior
- Perfect for displaying metadata, statuses, and categorized information

## Usage

\`\`\`tsx
import { SplitTag, TagColor, TagSize } from 'blend-v1';

<SplitTag
  primaryTag={{
    text: "Status",
    color: TagColor.NEUTRAL
  }}
  secondaryTag={{
    text: "Active",
    color: TagColor.SUCCESS,
    leftSlot: <Check size={12} />
  }}
  size={TagSize.SM}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    primaryTag: {
      control: "object",
      description: "Configuration for the primary (left) tag",
    },
    secondaryTag: {
      control: "object",
      description: "Configuration for the secondary (right) tag",
    },
    size: {
      control: "select",
      options: Object.values(TagSize),
      description: "Size applied to both tags",
    },
    shape: {
      control: "select",
      options: Object.values(TagShape),
      description: "Shape applied to both tags",
    },
    leadingSlot: {
      control: false,
      description:
        "Leading slot content (currently not used in implementation)",
    },
    trailingSlot: {
      control: false,
      description:
        "Trailing slot content (currently not used in implementation)",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SplitTag>;

// Default story
export const Default: Story = {
  args: {
    primaryTag: {
      text: "Label",
      color: TagColor.NEUTRAL,
    },
    secondaryTag: {
      text: "Value",
      color: TagColor.PRIMARY,
    },
    size: TagSize.SM,
    shape: TagShape.SQUARICAL,
  },
};

// Basic Examples
export const BasicExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SplitTag
        primaryTag={{ text: "Version", color: TagColor.NEUTRAL }}
        secondaryTag={{ text: "2.0.0", color: TagColor.PRIMARY }}
      />
      <SplitTag
        primaryTag={{ text: "Status", color: TagColor.NEUTRAL }}
        secondaryTag={{ text: "Active", color: TagColor.SUCCESS }}
      />
      <SplitTag
        primaryTag={{ text: "Priority", color: TagColor.NEUTRAL }}
        secondaryTag={{ text: "High", color: TagColor.ERROR }}
      />
      <SplitTag
        primaryTag={{ text: "Environment", color: TagColor.NEUTRAL }}
        secondaryTag={{ text: "Production", color: TagColor.WARNING }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic split tag examples showing common key-value pairs.",
      },
    },
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SplitTag
        primaryTag={{
          text: "Status",
          color: TagColor.NEUTRAL,
          leftSlot: <Info size={12} />,
        }}
        secondaryTag={{
          text: "Online",
          color: TagColor.SUCCESS,
          leftSlot: <Check size={12} />,
        }}
      />
      <SplitTag
        primaryTag={{
          text: "Build",
          color: TagColor.NEUTRAL,
          leftSlot: <Package size={12} />,
        }}
        secondaryTag={{
          text: "Failed",
          color: TagColor.ERROR,
          leftSlot: <X size={12} />,
        }}
      />
      <SplitTag
        primaryTag={{
          text: "Branch",
          color: TagColor.NEUTRAL,
          leftSlot: <GitBranch size={12} />,
        }}
        secondaryTag={{
          text: "main",
          color: TagColor.PRIMARY,
          rightSlot: <Shield size={12} />,
        }}
      />
      <SplitTag
        primaryTag={{
          text: "Performance",
          color: TagColor.NEUTRAL,
          leftSlot: <Activity size={12} />,
        }}
        secondaryTag={{
          text: "98%",
          color: TagColor.SUCCESS,
          leftSlot: <TrendingUp size={12} />,
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Split tags with icons for enhanced visual communication.",
      },
    },
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <SplitTag
          primaryTag={{ text: "Size", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "XS", color: TagColor.PRIMARY }}
          size={TagSize.XS}
        />
        <span style={{ fontSize: "12px", color: "#666" }}>Extra Small</span>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <SplitTag
          primaryTag={{ text: "Size", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "SM", color: TagColor.PRIMARY }}
          size={TagSize.SM}
        />
        <span style={{ fontSize: "12px", color: "#666" }}>Small</span>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <SplitTag
          primaryTag={{ text: "Size", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "MD", color: TagColor.PRIMARY }}
          size={TagSize.MD}
        />
        <span style={{ fontSize: "12px", color: "#666" }}>Medium</span>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <SplitTag
          primaryTag={{ text: "Size", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "LG", color: TagColor.PRIMARY }}
          size={TagSize.LG}
        />
        <span style={{ fontSize: "12px", color: "#666" }}>Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Split tags in all available sizes.",
      },
    },
  },
};

// Different Shapes
export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}>
          Squarical Shape
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <SplitTag
            primaryTag={{ text: "Shape", color: TagColor.NEUTRAL }}
            secondaryTag={{ text: "Squarical", color: TagColor.PRIMARY }}
            shape={TagShape.SQUARICAL}
            size={TagSize.SM}
          />
          <SplitTag
            primaryTag={{ text: "Type", color: TagColor.NEUTRAL }}
            secondaryTag={{ text: "Default", color: TagColor.SUCCESS }}
            shape={TagShape.SQUARICAL}
            size={TagSize.MD}
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}>
          Rounded Shape
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <SplitTag
            primaryTag={{ text: "Shape", color: TagColor.NEUTRAL }}
            secondaryTag={{ text: "Rounded", color: TagColor.PRIMARY }}
            shape={TagShape.ROUNDED}
            size={TagSize.SM}
          />
          <SplitTag
            primaryTag={{ text: "Style", color: TagColor.NEUTRAL }}
            secondaryTag={{ text: "Smooth", color: TagColor.PURPLE }}
            shape={TagShape.ROUNDED}
            size={TagSize.MD}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Split tags with different shape options.",
      },
    },
  },
};

// Interactive Split Tags
export const Interactive: Story = {
  render: () => {
    const [selectedEnv, setSelectedEnv] = React.useState("production");
    const environments = ["development", "staging", "production"];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h3 style={{ fontSize: "14px", color: "#666" }}>
          Click to Select Environment
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {environments.map((env) => (
            <SplitTag
              key={env}
              primaryTag={{
                text: "ENV",
                color: TagColor.NEUTRAL,
                leftSlot: <Server size={12} />,
              }}
              secondaryTag={{
                text: env,
                color:
                  selectedEnv === env ? TagColor.SUCCESS : TagColor.NEUTRAL,
                leftSlot: selectedEnv === env ? <Check size={12} /> : null,
                onClick: () => setSelectedEnv(env),
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "#666" }}>
          Selected: {selectedEnv}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive split tags with click handlers on secondary tags.",
      },
    },
  },
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "bold" }}
        >
          Software Version Info
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <SplitTag
            primaryTag={{ text: "Version", color: TagColor.NEUTRAL }}
            secondaryTag={{ text: "v3.2.1", color: TagColor.PRIMARY }}
          />
          <SplitTag
            primaryTag={{ text: "Build", color: TagColor.NEUTRAL }}
            secondaryTag={{ text: "#1234", color: TagColor.SUCCESS }}
          />
          <SplitTag
            primaryTag={{ text: "Release", color: TagColor.NEUTRAL }}
            secondaryTag={{
              text: "Stable",
              color: TagColor.SUCCESS,
              leftSlot: <Check size={12} />,
            }}
          />
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "bold" }}
        >
          Server Monitoring
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <SplitTag
            primaryTag={{
              text: "CPU",
              color: TagColor.NEUTRAL,
              leftSlot: <Cpu size={12} />,
            }}
            secondaryTag={{ text: "45%", color: TagColor.SUCCESS }}
          />
          <SplitTag
            primaryTag={{
              text: "Memory",
              color: TagColor.NEUTRAL,
              leftSlot: <Database size={12} />,
            }}
            secondaryTag={{ text: "78%", color: TagColor.WARNING }}
          />
          <SplitTag
            primaryTag={{
              text: "Disk",
              color: TagColor.NEUTRAL,
              leftSlot: <Server size={12} />,
            }}
            secondaryTag={{ text: "92%", color: TagColor.ERROR }}
          />
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "bold" }}
        >
          E-commerce Order Status
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <SplitTag
            primaryTag={{ text: "Order", color: TagColor.NEUTRAL }}
            secondaryTag={{ text: "#12345", color: TagColor.PRIMARY }}
          />
          <SplitTag
            primaryTag={{ text: "Status", color: TagColor.NEUTRAL }}
            secondaryTag={{
              text: "Shipped",
              color: TagColor.SUCCESS,
              leftSlot: <Package size={12} />,
            }}
          />
          <SplitTag
            primaryTag={{
              text: "Payment",
              color: TagColor.NEUTRAL,
              leftSlot: <DollarSign size={12} />,
            }}
            secondaryTag={{
              text: "Paid",
              color: TagColor.SUCCESS,
              leftSlot: <Check size={12} />,
            }}
          />
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "bold" }}
        >
          Project Management
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <SplitTag
            primaryTag={{
              text: "Sprint",
              color: TagColor.NEUTRAL,
              leftSlot: <Calendar size={12} />,
            }}
            secondaryTag={{ text: "Week 3", color: TagColor.PRIMARY }}
          />
          <SplitTag
            primaryTag={{
              text: "Progress",
              color: TagColor.NEUTRAL,
              leftSlot: <Activity size={12} />,
            }}
            secondaryTag={{ text: "75%", color: TagColor.WARNING }}
          />
          <SplitTag
            primaryTag={{
              text: "Due",
              color: TagColor.NEUTRAL,
              leftSlot: <Clock size={12} />,
            }}
            secondaryTag={{ text: "2 days", color: TagColor.ERROR }}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common split tag usage patterns in real-world applications.",
      },
    },
  },
};

// Color Combinations
export const ColorCombinations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
        Various Color Combinations
      </h3>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <SplitTag
          primaryTag={{ text: "Type", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "Primary", color: TagColor.PRIMARY }}
        />
        <SplitTag
          primaryTag={{ text: "Status", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "Success", color: TagColor.SUCCESS }}
        />
        <SplitTag
          primaryTag={{ text: "Alert", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "Error", color: TagColor.ERROR }}
        />
        <SplitTag
          primaryTag={{ text: "Level", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "Warning", color: TagColor.WARNING }}
        />
        <SplitTag
          primaryTag={{ text: "Tag", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "Purple", color: TagColor.PURPLE }}
        />
        <SplitTag
          primaryTag={{ text: "Mode", color: TagColor.NEUTRAL }}
          secondaryTag={{ text: "Neutral", color: TagColor.NEUTRAL }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different color combinations for secondary tags while keeping primary tag neutral.",
      },
    },
  },
};

// Comprehensive Showcase
export const ComprehensiveShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "bold" }}
        >
          SplitTag Component Showcase
        </h3>
        <p style={{ marginBottom: "24px", color: "#666" }}>
          A comprehensive display of split tag variations and use cases for
          displaying key-value information.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Status Indicators */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h4
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Status Indicators
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <SplitTag
              primaryTag={{ text: "API", color: TagColor.NEUTRAL }}
              secondaryTag={{
                text: "Operational",
                color: TagColor.SUCCESS,
                leftSlot: <Check size={12} />,
              }}
              size={TagSize.SM}
            />
            <SplitTag
              primaryTag={{ text: "Database", color: TagColor.NEUTRAL }}
              secondaryTag={{
                text: "Degraded",
                color: TagColor.WARNING,
                leftSlot: <AlertCircle size={12} />,
              }}
              size={TagSize.SM}
            />
            <SplitTag
              primaryTag={{ text: "CDN", color: TagColor.NEUTRAL }}
              secondaryTag={{
                text: "Offline",
                color: TagColor.ERROR,
                leftSlot: <X size={12} />,
              }}
              size={TagSize.SM}
            />
          </div>
        </div>

        {/* Metrics Display */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h4
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Performance Metrics
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <SplitTag
              primaryTag={{
                text: "Score",
                color: TagColor.NEUTRAL,
                leftSlot: <Award size={12} />,
              }}
              secondaryTag={{ text: "A+", color: TagColor.SUCCESS }}
              size={TagSize.SM}
            />
            <SplitTag
              primaryTag={{
                text: "Speed",
                color: TagColor.NEUTRAL,
                leftSlot: <Activity size={12} />,
              }}
              secondaryTag={{ text: "1.2s", color: TagColor.PRIMARY }}
              size={TagSize.SM}
            />
            <SplitTag
              primaryTag={{
                text: "Uptime",
                color: TagColor.NEUTRAL,
                leftSlot: <TrendingUp size={12} />,
              }}
              secondaryTag={{ text: "99.9%", color: TagColor.SUCCESS }}
              size={TagSize.SM}
            />
          </div>
        </div>

        {/* User Info */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h4
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            User Information
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <SplitTag
              primaryTag={{
                text: "Role",
                color: TagColor.NEUTRAL,
                leftSlot: <User size={12} />,
              }}
              secondaryTag={{
                text: "Admin",
                color: TagColor.ERROR,
                leftSlot: <Shield size={12} />,
              }}
              size={TagSize.SM}
            />
            <SplitTag
              primaryTag={{
                text: "Plan",
                color: TagColor.NEUTRAL,
                leftSlot: <Star size={12} />,
              }}
              secondaryTag={{ text: "Premium", color: TagColor.WARNING }}
              size={TagSize.SM}
            />
            <SplitTag
              primaryTag={{
                text: "Since",
                color: TagColor.NEUTRAL,
                leftSlot: <Calendar size={12} />,
              }}
              secondaryTag={{ text: "2021", color: TagColor.PRIMARY }}
              size={TagSize.SM}
            />
          </div>
        </div>

        {/* Pricing Tiers */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h4
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Pricing Information
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <SplitTag
              primaryTag={{
                text: "Price",
                color: TagColor.NEUTRAL,
                leftSlot: <DollarSign size={12} />,
              }}
              secondaryTag={{ text: "$99/mo", color: TagColor.PRIMARY }}
              size={TagSize.SM}
            />
            <SplitTag
              primaryTag={{
                text: "Discount",
                color: TagColor.NEUTRAL,
                leftSlot: <Percent size={12} />,
              }}
              secondaryTag={{ text: "20% OFF", color: TagColor.ERROR }}
              size={TagSize.SM}
            />
            <SplitTag
              primaryTag={{
                text: "Billing",
                color: TagColor.NEUTRAL,
                leftSlot: <Calendar size={12} />,
              }}
              secondaryTag={{ text: "Annual", color: TagColor.SUCCESS }}
              size={TagSize.SM}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A comprehensive showcase demonstrating the versatility of the SplitTag component for various data display needs.",
      },
    },
  },
};
