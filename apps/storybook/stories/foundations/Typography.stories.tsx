import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `

# Typography System

The Blend Design System uses **InterDisplay** as the primary font family across all components and applications. This ensures consistent typography and optimal readability across different platforms and devices.

## Font Family
- **Primary**: InterDisplay (display, body, heading text)
- **Monospace**: SF Mono (code and technical content)

## Font Weights Available
- **100**: Thin
- **200**: Extra Light  
- **300**: Light
- **400**: Regular (default)
- **500**: Medium
- **600**: Semi Bold
- **700**: Bold
- **800**: Extra Bold
- **900**: Black

## Font Features
- OpenType features enabled for better typography
- Font smoothing optimized for screen rendering
- Font-display: swap for better loading performance
- Support for both normal and italic styles

        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// Font weights showcase
export const FontWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 600 }}>
        Font Weights
      </h2>

      {[
        { weight: 100, name: "Thin" },
        { weight: 200, name: "Extra Light" },
        { weight: 300, name: "Light" },
        { weight: 400, name: "Regular" },
        { weight: 500, name: "Medium" },
        { weight: 600, name: "Semi Bold" },
        { weight: 700, name: "Bold" },
        { weight: 800, name: "Extra Bold" },
        { weight: 900, name: "Black" },
      ].map((font) => (
        <div
          key={font.weight}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            padding: "12px 0",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              minWidth: "120px",
              fontSize: "14px",
              color: "#6b7280",
              fontWeight: 500,
            }}
          >
            {font.weight} - {font.name}
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: font.weight,
              fontFamily: "InterDisplay, sans-serif",
            }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available font weights in the InterDisplay font family.",
      },
    },
  },
};

// Typography scale from design tokens
export const TypographyScale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 600 }}>
          Display Sizes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Display XL - 72px
            </div>
            <div
              style={{ fontSize: "72px", lineHeight: "78px", fontWeight: 700 }}
            >
              Display XL
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Display LG - 64px
            </div>
            <div
              style={{ fontSize: "64px", lineHeight: "70px", fontWeight: 700 }}
            >
              Display Large
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Display MD - 56px
            </div>
            <div
              style={{ fontSize: "56px", lineHeight: "64px", fontWeight: 700 }}
            >
              Display Medium
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Display SM - 48px
            </div>
            <div
              style={{ fontSize: "48px", lineHeight: "56px", fontWeight: 700 }}
            >
              Display Small
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 600 }}>
          Heading Sizes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Heading 2XL - 40px
            </div>
            <div
              style={{ fontSize: "40px", lineHeight: "46px", fontWeight: 600 }}
            >
              Heading 2XL
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Heading XL - 32px
            </div>
            <div
              style={{ fontSize: "32px", lineHeight: "38px", fontWeight: 600 }}
            >
              Heading XL
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Heading LG - 24px
            </div>
            <div
              style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }}
            >
              Heading Large
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Heading MD - 20px
            </div>
            <div
              style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600 }}
            >
              Heading Medium
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Heading SM - 18px
            </div>
            <div
              style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 600 }}
            >
              Heading Small
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 600 }}>
          Body Sizes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Body LG - 16px
            </div>
            <div
              style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}
            >
              Body Large - This is the default body text size used for most
              content. It provides excellent readability and is comfortable for
              extended reading sessions.
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Body MD - 14px
            </div>
            <div
              style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 400 }}
            >
              Body Medium - Used for secondary content, captions, and UI
              elements. Slightly smaller but still highly readable.
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Body SM - 12px
            </div>
            <div
              style={{ fontSize: "12px", lineHeight: "18px", fontWeight: 400 }}
            >
              Body Small - Used for fine print, metadata, and compact UI
              elements where space is limited.
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Body XS - 10px
            </div>
            <div
              style={{ fontSize: "10px", lineHeight: "14px", fontWeight: 400 }}
            >
              Body Extra Small - Used for very compact spaces, badges, and
              minimal UI elements.
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 600 }}>
          Code Sizes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Code LG - 14px
            </div>
            <div
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: 400,
                fontFamily:
                  'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                backgroundColor: "#f3f4f6",
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            >
              const example = "Code Large";
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Code MD - 12px
            </div>
            <div
              style={{
                fontSize: "12px",
                lineHeight: "18px",
                fontWeight: 400,
                fontFamily:
                  'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                backgroundColor: "#f3f4f6",
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            >
              const example = "Code Medium";
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Code SM - 10px
            </div>
            <div
              style={{
                fontSize: "10px",
                lineHeight: "14px",
                fontWeight: 400,
                fontFamily:
                  'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                backgroundColor: "#f3f4f6",
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            >
              const example = "Code Small";
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Typography scale showing all available font sizes from the design system tokens.",
      },
    },
  },
};

// Font styles showcase
export const FontStyles: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 600 }}>
          Font Styles
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Normal vs Italic
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  fontStyle: "normal",
                }}
              >
                Normal text - The quick brown fox jumps over the lazy dog
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                Italic text - The quick brown fox jumps over the lazy dog
              </div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Weight Variations
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div style={{ fontSize: "16px", fontWeight: 300 }}>
                Light (300) - Perfect for large headings and elegant displays
              </div>
              <div style={{ fontSize: "16px", fontWeight: 400 }}>
                Regular (400) - Default weight for body text and general content
              </div>
              <div style={{ fontSize: "16px", fontWeight: 500 }}>
                Medium (500) - Ideal for subheadings and emphasized content
              </div>
              <div style={{ fontSize: "16px", fontWeight: 600 }}>
                Semi Bold (600) - Great for section headings and important
                labels
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700 }}>
                Bold (700) - Strong emphasis and primary headings
              </div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Usage Examples
            </h3>
            <div
              style={{
                padding: "24px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                backgroundColor: "#fafafa",
              }}
            >
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  margin: 0,
                }}
              >
                Main Heading
              </h1>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "16px",
                  margin: 0,
                  color: "#4b5563",
                }}
              >
                Section Heading
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  marginBottom: "16px",
                  margin: 0,
                }}
              >
                This is a paragraph of body text demonstrating the regular font
                weight. It shows how the InterDisplay font renders in typical
                content scenarios with proper line height and spacing.
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  margin: 0,
                  color: "#6b7280",
                }}
              >
                Caption or metadata text using medium weight for subtle
                emphasis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples of different font styles and their typical usage in UI design.",
      },
    },
  },
};

// Font loading and performance
export const FontInfo: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h2 style={{ marginBottom: "16px", fontSize: "24px", fontWeight: 600 }}>
          Font Implementation
        </h2>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}
          >
            ✅ Font Consistency Achieved
          </h3>
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.6" }}>
            <li>InterDisplay fonts loaded in Storybook</li>
            <li>All font weights (100-900) available</li>
            <li>Both normal and italic styles supported</li>
            <li>Font-display: swap for optimal loading</li>
            <li>Consistent typography across all components</li>
          </ul>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
            }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "8px",
                color: "#059669",
              }}
            >
              ✅ Storybook (Now)
            </h4>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Font Family: InterDisplay
              <br />
              Weights: 100-900
              <br />
              Styles: Normal, Italic
              <br />
              Loading: Optimized
            </div>
          </div>

          <div
            style={{
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
            }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "8px",
                color: "#059669",
              }}
            >
              ✅ Production App
            </h4>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Font Family: InterDisplay
              <br />
              Weights: 100-900
              <br />
              Styles: Normal, Italic
              <br />
              Loading: Optimized
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
          Technical Details
        </h3>
        <div
          style={{
            padding: "16px",
            backgroundColor: "#1f2937",
            borderRadius: "6px",
            color: "#f9fafb",
            fontFamily:
              'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            fontSize: "12px",
            lineHeight: "1.5",
          }}
        >
          {`/* Font files location */
apps/storybook/public/fonts/InterDisplay-*.ttf

/* CSS configuration */
apps/storybook/.storybook/fonts.css

/* Storybook integration */
apps/storybook/.storybook/preview.tsx`}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Technical information about the font implementation and consistency solution.",
      },
    },
  },
};
