import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipSide,
  TooltipAlign,
  TooltipSize,
  TooltipSlotDirection,
  Button,
  ButtonType,
} from "blend-v1";
import {
  Info,
  HelpCircle,
  Star,
  AlertTriangle,
  CheckCircle,
  Settings,
  Zap,
  Shield,
  Heart,
  Trophy,
} from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible tooltip component for displaying contextual information on hover or focus with customizable positioning, sizing, and content slots.

## Features
- Multiple positioning options (top, right, bottom, left)
- Flexible alignment (start, center, end)
- Two sizes (small, large)
- Optional arrow indicator
- Custom content slots with directional placement
- Controlled and uncontrolled modes
- Customizable delay duration
- Offset positioning control
- Accessible design with proper ARIA attributes
- Keyboard navigation support

## Usage

\`\`\`tsx
import { Tooltip, TooltipSide, TooltipAlign, TooltipSize } from 'blend-v1';

<Tooltip 
  content="This is a helpful tooltip"
  side={TooltipSide.TOP}
  size={TooltipSize.SMALL}
  showArrow={true}
>
  <Button text="Hover me" />
</Tooltip>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    content: {
      control: "text",
      description: "The content to display inside the tooltip",
    },
    open: {
      control: "boolean",
      description: "Controlled open state of the tooltip",
    },
    side: {
      control: "select",
      options: Object.values(TooltipSide),
      description:
        "The side where the tooltip should appear relative to the trigger",
    },
    align: {
      control: "select",
      options: Object.values(TooltipAlign),
      description: "The alignment of the tooltip relative to the trigger",
    },
    showArrow: {
      control: "boolean",
      description: "Whether to show an arrow pointing to the trigger element",
    },
    size: {
      control: "select",
      options: Object.values(TooltipSize),
      description: "Size variant of the tooltip",
    },
    slotDirection: {
      control: "select",
      options: Object.values(TooltipSlotDirection),
      description: "Direction of the slot content placement",
    },
    delayDuration: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
      description: "Delay in milliseconds before the tooltip appears",
    },
    offset: {
      control: { type: "number", min: 0, max: 50, step: 1 },
      description: "Distance in pixels between the tooltip and trigger element",
    },
    children: {
      description:
        "The trigger element that will show the tooltip on hover/focus",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Default story
export const Default: Story = {
  args: {
    content: "This is a helpful tooltip",
    side: TooltipSide.TOP,
    align: TooltipAlign.CENTER,
    showArrow: true,
    size: TooltipSize.SMALL,
    delayDuration: 300,
    offset: 5,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button text="Hover me" />
    </Tooltip>
  ),
};

// Tooltip positions
export const TooltipPositions: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: "60px",
        padding: "60px",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <div></div>
      <Tooltip content="Top tooltip" side={TooltipSide.TOP} showArrow={true}>
        <Button buttonType={ButtonType.SECONDARY} text="Top" />
      </Tooltip>
      <div></div>

      <Tooltip content="Left tooltip" side={TooltipSide.LEFT} showArrow={true}>
        <Button buttonType={ButtonType.SECONDARY} text="Left" />
      </Tooltip>
      <Tooltip
        content="Center tooltip - no arrow"
        side={TooltipSide.TOP}
        showArrow={false}
      >
        <Button buttonType={ButtonType.PRIMARY} text="Center" />
      </Tooltip>
      <Tooltip
        content="Right tooltip"
        side={TooltipSide.RIGHT}
        showArrow={true}
      >
        <Button buttonType={ButtonType.SECONDARY} text="Right" />
      </Tooltip>

      <div></div>
      <Tooltip
        content="Bottom tooltip"
        side={TooltipSide.BOTTOM}
        showArrow={true}
      >
        <Button buttonType={ButtonType.SECONDARY} text="Bottom" />
      </Tooltip>
      <div></div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tooltips positioned on all four sides: top, right, bottom, left. Hover over each button to see the tooltip placement.",
      },
    },
  },
};

// Tooltip alignments
export const TooltipAlignments: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tooltip
          content="Start aligned tooltip"
          side={TooltipSide.TOP}
          align={TooltipAlign.START}
          showArrow={true}
        >
          <Button buttonType={ButtonType.SECONDARY} text="Start Align" />
        </Tooltip>
        <Tooltip
          content="Center aligned tooltip"
          side={TooltipSide.TOP}
          align={TooltipAlign.CENTER}
          showArrow={true}
        >
          <Button buttonType={ButtonType.PRIMARY} text="Center Align" />
        </Tooltip>
        <Tooltip
          content="End aligned tooltip"
          side={TooltipSide.TOP}
          align={TooltipAlign.END}
          showArrow={true}
        >
          <Button buttonType={ButtonType.SECONDARY} text="End Align" />
        </Tooltip>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tooltip
          content="Start aligned (right)"
          side={TooltipSide.RIGHT}
          align={TooltipAlign.START}
          showArrow={true}
        >
          <Button buttonType={ButtonType.SECONDARY} text="Right Start" />
        </Tooltip>
        <Tooltip
          content="Center aligned (right)"
          side={TooltipSide.RIGHT}
          align={TooltipAlign.CENTER}
          showArrow={true}
        >
          <Button buttonType={ButtonType.PRIMARY} text="Right Center" />
        </Tooltip>
        <Tooltip
          content="End aligned (right)"
          side={TooltipSide.RIGHT}
          align={TooltipAlign.END}
          showArrow={true}
        >
          <Button buttonType={ButtonType.SECONDARY} text="Right End" />
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different tooltip alignment options: start, center, and end. Hover to see how tooltips align relative to their trigger elements.",
      },
    },
  },
};

// Tooltip sizes
export const TooltipSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
      <Tooltip
        content="Small tooltip with concise information"
        size={TooltipSize.SMALL}
        showArrow={true}
      >
        <Button buttonType={ButtonType.SECONDARY} text="Small Tooltip" />
      </Tooltip>
      <Tooltip
        content="Large tooltip with more detailed information and additional context that can span multiple lines"
        size={TooltipSize.LARGE}
        showArrow={true}
      >
        <Button buttonType={ButtonType.PRIMARY} text="Large Tooltip" />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different tooltip sizes: Small and Large. Hover to see the size difference and content capacity.",
      },
    },
  },
};

// Rich content tooltips
export const RichContentTooltips: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Tooltip
        content={
          <div>
            <strong>Pro Tip</strong>
            <br />
            Use keyboard shortcuts for faster navigation
          </div>
        }
        size={TooltipSize.LARGE}
        showArrow={true}
      >
        <Button
          buttonType={ButtonType.PRIMARY}
          text="Rich Content"
          leadingIcon={Info}
        />
      </Tooltip>

      <Tooltip
        content={
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <CheckCircle size={14} color="#10b981" />
              Success
            </div>
            <div>Operation completed successfully</div>
          </div>
        }
        size={TooltipSize.LARGE}
        showArrow={true}
        side={TooltipSide.RIGHT}
      >
        <Button
          buttonType={ButtonType.SECONDARY}
          text="Status"
          leadingIcon={CheckCircle}
        />
      </Tooltip>

      <Tooltip
        content={
          <div>
            <div
              style={{
                color: "#fbbf24",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              ⚠️ Warning
            </div>
            <div>This action cannot be undone</div>
          </div>
        }
        size={TooltipSize.LARGE}
        showArrow={true}
        side={TooltipSide.BOTTOM}
      >
        <Button
          buttonType={ButtonType.SECONDARY}
          text="Warning"
          leadingIcon={AlertTriangle}
        />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tooltips with rich HTML content including formatted text, icons, and structured layouts.",
      },
    },
  },
};

// Tooltips with slots
export const WithSlots: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Tooltip
        content="Upgrade to premium for advanced features"
        slot={<Star size={16} color="#fbbf24" />}
        slotDirection={TooltipSlotDirection.LEFT}
        size={TooltipSize.LARGE}
        showArrow={true}
      >
        <Button buttonType={ButtonType.PRIMARY} text="Premium Features" />
      </Tooltip>

      <Tooltip
        content="Get help and support documentation"
        slot={<HelpCircle size={16} color="#3b82f6" />}
        slotDirection={TooltipSlotDirection.RIGHT}
        size={TooltipSize.LARGE}
        showArrow={true}
        side={TooltipSide.RIGHT}
      >
        <Button buttonType={ButtonType.SECONDARY} text="Help Center" />
      </Tooltip>

      <Tooltip
        content="Security settings and privacy controls"
        slot={<Shield size={16} color="#10b981" />}
        slotDirection={TooltipSlotDirection.LEFT}
        size={TooltipSize.LARGE}
        showArrow={true}
        side={TooltipSide.BOTTOM}
      >
        <Button
          buttonType={ButtonType.SECONDARY}
          text="Security"
          leadingIcon={Settings}
        />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tooltips with custom content slots (icons) placed on the left or right side of the content.",
      },
    },
  },
};

// Controlled tooltip
export const ControlledTooltip: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [manualOpen, setManualOpen] = useState(false);

    return (
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Tooltip
            content="This tooltip is controlled by hover state"
            open={isOpen}
            showArrow={true}
            size={TooltipSize.LARGE}
          >
            <Button
              buttonType={ButtonType.PRIMARY}
              text="Hover Controlled"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            />
          </Tooltip>

          <Tooltip
            content="This tooltip is controlled by click state"
            open={manualOpen}
            showArrow={true}
            size={TooltipSize.LARGE}
            side={TooltipSide.RIGHT}
          >
            <Button
              buttonType={ButtonType.SECONDARY}
              text="Click Controlled"
              onClick={() => setManualOpen(!manualOpen)}
            />
          </Tooltip>
        </div>

        <div style={{ fontSize: "14px", color: "#666", textAlign: "center" }}>
          <div>Hover tooltip: {isOpen ? "Open" : "Closed"}</div>
          <div>Click tooltip: {manualOpen ? "Open" : "Closed"}</div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled tooltips with custom open/close logic. One responds to hover, another to clicks.",
      },
    },
  },
};

// Delay and timing
export const DelayAndTiming: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Tooltip
        content="Instant tooltip (no delay)"
        delayDuration={0}
        showArrow={true}
      >
        <Button buttonType={ButtonType.SECONDARY} text="No Delay" />
      </Tooltip>

      <Tooltip
        content="Fast tooltip (300ms delay)"
        delayDuration={300}
        showArrow={true}
      >
        <Button buttonType={ButtonType.PRIMARY} text="Fast" />
      </Tooltip>

      <Tooltip
        content="Slow tooltip (1000ms delay)"
        delayDuration={1000}
        showArrow={true}
      >
        <Button buttonType={ButtonType.SECONDARY} text="Slow" />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different delay durations before tooltips appear: instant, fast (300ms), and slow (1000ms).",
      },
    },
  },
};

// Offset variations
export const OffsetVariations: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
      <Tooltip
        content="Close to trigger (5px offset)"
        offset={5}
        showArrow={true}
        side={TooltipSide.TOP}
      >
        <Button buttonType={ButtonType.SECONDARY} text="Close" />
      </Tooltip>

      <Tooltip
        content="Normal distance (15px offset)"
        offset={15}
        showArrow={true}
        side={TooltipSide.TOP}
      >
        <Button buttonType={ButtonType.PRIMARY} text="Normal" />
      </Tooltip>

      <Tooltip
        content="Far from trigger (30px offset)"
        offset={30}
        showArrow={true}
        side={TooltipSide.TOP}
      >
        <Button buttonType={ButtonType.SECONDARY} text="Far" />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different offset distances between tooltip and trigger element: close (5px), normal (15px), and far (30px).",
      },
    },
  },
};
