import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import {
    Tooltip,
    TooltipSide,
    TooltipAlign,
    TooltipSize,
    TooltipSlotDirection,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import {
    Info,
    HelpCircle,
    Star,
    AlertTriangle,
    CheckCircle,
    Settings,
    Shield,
} from 'lucide-react'

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
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
import { Tooltip, TooltipSide, TooltipAlign, TooltipSize } from '@juspay/blend-design-system';

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
            control: 'text',
            description: 'The content to display inside the tooltip',
        },
        open: {
            control: 'boolean',
            description: 'Controlled open state of the tooltip',
        },
        side: {
            control: 'select',
            options: Object.values(TooltipSide),
            description:
                'The side where the tooltip should appear relative to the trigger',
        },
        align: {
            control: 'select',
            options: Object.values(TooltipAlign),
            description: 'The alignment of the tooltip relative to the trigger',
        },
        showArrow: {
            control: 'boolean',
            description:
                'Whether to show an arrow pointing to the trigger element',
        },
        size: {
            control: 'select',
            options: Object.values(TooltipSize),
            description: 'Size variant of the tooltip',
        },
        slotDirection: {
            control: 'select',
            options: Object.values(TooltipSlotDirection),
            description: 'Direction of the slot content placement',
        },
        delayDuration: {
            control: { type: 'number', min: 0, max: 2000, step: 100 },
            description: 'Delay in milliseconds before the tooltip appears',
        },
        offset: {
            control: { type: 'number', min: 0, max: 50, step: 1 },
            description:
                'Distance in pixels between the tooltip and trigger element',
        },
        children: {
            description:
                'The trigger element that will show the tooltip on hover/focus',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tooltip>

// Default story
export const Default: Story = {
    args: {
        content: 'This is a helpful tooltip',
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
}

// Tooltip positions
export const TooltipPositions: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(3, 1fr)',
                gap: '60px',
                padding: '60px',
                alignItems: 'center',
                justifyItems: 'center',
            }}
        >
            <div></div>
            <Tooltip
                content="Top tooltip"
                side={TooltipSide.TOP}
                showArrow={true}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Top" />
            </Tooltip>
            <div></div>

            <Tooltip
                content="Left tooltip"
                side={TooltipSide.LEFT}
                showArrow={true}
            >
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
                story: 'Tooltips positioned on all four sides: top, right, bottom, left. Hover over each button to see the tooltip placement.',
            },
        },
    },
}

// Tooltip alignments
export const TooltipAlignments: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                padding: '40px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Tooltip
                    content="Start aligned tooltip"
                    side={TooltipSide.TOP}
                    align={TooltipAlign.START}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Start Align"
                    />
                </Tooltip>
                <Tooltip
                    content="Center aligned tooltip"
                    side={TooltipSide.TOP}
                    align={TooltipAlign.CENTER}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Center Align"
                    />
                </Tooltip>
                <Tooltip
                    content="End aligned tooltip"
                    side={TooltipSide.TOP}
                    align={TooltipAlign.END}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="End Align"
                    />
                </Tooltip>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Tooltip
                    content="Start aligned (right)"
                    side={TooltipSide.RIGHT}
                    align={TooltipAlign.START}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Right Start"
                    />
                </Tooltip>
                <Tooltip
                    content="Center aligned (right)"
                    side={TooltipSide.RIGHT}
                    align={TooltipAlign.CENTER}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Right Center"
                    />
                </Tooltip>
                <Tooltip
                    content="End aligned (right)"
                    side={TooltipSide.RIGHT}
                    align={TooltipAlign.END}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Right End"
                    />
                </Tooltip>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tooltip alignment options: start, center, and end. Hover to see how tooltips align relative to their trigger elements.',
            },
        },
    },
}

// Tooltip sizes
export const TooltipSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Tooltip
                content="Small tooltip with concise information"
                size={TooltipSize.SMALL}
                showArrow={true}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Small Tooltip"
                />
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
                story: 'Different tooltip sizes: Small and Large. Hover to see the size difference and content capacity.',
            },
        },
    },
}

// Rich content tooltips
export const RichContentTooltips: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                flexWrap: 'wrap',
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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
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
                                color: '#fbbf24',
                                fontWeight: 'bold',
                                marginBottom: '4px',
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
                story: 'Tooltips with rich HTML content including formatted text, icons, and structured layouts.',
            },
        },
    },
}

// Tooltips with slots
export const WithSlots: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Tooltip
                content="Upgrade to premium for advanced features"
                slot={<Star size={16} color="#fbbf24" />}
                slotDirection={TooltipSlotDirection.LEFT}
                size={TooltipSize.LARGE}
                showArrow={true}
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Premium Features"
                />
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
                story: 'Tooltips with custom content slots (icons) placed on the left or right side of the content.',
            },
        },
    },
}

// Controlled tooltip
export const ControlledTooltip: Story = {
    render: () => {
        const ControlledTooltipComponent = () => {
            const [isOpen, setIsOpen] = useState(false)
            const [manualOpen, setManualOpen] = useState(false)

            return (
                <div
                    style={{
                        display: 'flex',
                        gap: '24px',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '24px',
                            alignItems: 'center',
                        }}
                    >
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

                    <div
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            textAlign: 'center',
                        }}
                    >
                        <div>Hover tooltip: {isOpen ? 'Open' : 'Closed'}</div>
                        <div>
                            Click tooltip: {manualOpen ? 'Open' : 'Closed'}
                        </div>
                    </div>
                </div>
            )
        }
        return <ControlledTooltipComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled tooltips with custom open/close logic. One responds to hover, another to clicks.',
            },
        },
    },
}

// Delay and timing
export const DelayAndTiming: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
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
                story: 'Different delay durations before tooltips appear: instant, fast (300ms), and slow (1000ms).',
            },
        },
    },
}

// Offset variations
export const OffsetVariations: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
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
                story: 'Different offset distances between tooltip and trigger element: close (5px), normal (15px), and far (30px).',
            },
        },
    },
}

// Max width examples
export const MaxWidthExamples: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Tooltip
                content="This is a long tooltip content that will be constrained to a narrow width of 150px. It should wrap to multiple lines and demonstrate the maxWidth property in action."
                maxWidth="150px"
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Narrow (150px)"
                />
            </Tooltip>

            <Tooltip
                content="This tooltip has a medium width constraint of 250px. It provides a good balance between readability and space efficiency for moderately long content."
                maxWidth="250px"
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button buttonType={ButtonType.PRIMARY} text="Medium (250px)" />
            </Tooltip>

            <Tooltip
                content="This tooltip demonstrates a wide width constraint of 400px, which allows for longer content to be displayed on fewer lines while maintaining good readability."
                maxWidth="400px"
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Wide (400px)" />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different maxWidth constraints on tooltips: narrow (150px), medium (250px), and wide (400px).',
            },
        },
    },
}

// Form validation tooltips
export const FormValidationTooltips: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '20px',
                maxWidth: '400px',
            }}
        >
            <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
                <label style={{ fontSize: '14px', fontWeight: '500' }}>
                    Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '2px solid #ef4444',
                            borderRadius: '6px',
                            fontSize: '14px',
                        }}
                    />
                    <Tooltip
                        content={
                            <div>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#ef4444',
                                    }}
                                >
                                    Invalid Email Format
                                </div>
                                <div style={{ marginTop: '4px' }}>
                                    Please enter a valid email address like:
                                    user@example.com
                                </div>
                            </div>
                        }
                        side={TooltipSide.RIGHT}
                        size={TooltipSize.LARGE}
                        showArrow={true}
                        slot={<AlertTriangle size={14} color="#ef4444" />}
                        slotDirection={TooltipSlotDirection.LEFT}
                    >
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="!"
                            style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '24px',
                                height: '24px',
                                minWidth: '24px',
                                padding: '0',
                                fontSize: '12px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                            }}
                        />
                    </Tooltip>
                </div>
            </div>

            <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
                <label style={{ fontSize: '14px', fontWeight: '500' }}>
                    Password *
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '2px solid #10b981',
                            borderRadius: '6px',
                            fontSize: '14px',
                        }}
                    />
                    <Tooltip
                        content={
                            <div>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#10b981',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                    }}
                                >
                                    <CheckCircle size={14} />
                                    Strong Password
                                </div>
                                <div style={{ marginTop: '4px' }}>
                                    ✓ At least 8 characters
                                    <br />
                                    ✓ Contains uppercase letter
                                    <br />✓ Contains special character
                                </div>
                            </div>
                        }
                        side={TooltipSide.RIGHT}
                        size={TooltipSize.LARGE}
                        showArrow={true}
                    >
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="✓"
                            style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '24px',
                                height: '24px',
                                minWidth: '24px',
                                padding: '0',
                                fontSize: '12px',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                            }}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tooltips used for form validation feedback showing error states and success confirmations.',
            },
        },
    },
}

// Feature announcements
export const FeatureAnnouncements: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Tooltip
                content={
                    <div>
                        <div
                            style={{
                                fontWeight: 'bold',
                                color: '#3b82f6',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                }}
                            >
                                NEW
                            </span>
                            Dark Mode Available!
                        </div>
                        <div>
                            Switch to dark mode in settings for a better
                            night-time experience.
                            <br />
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                Click here to try it now →
                            </span>
                        </div>
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.BOTTOM}
                maxWidth="280px"
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Settings"
                    leadingIcon={Settings}
                />
            </Tooltip>

            <Tooltip
                content={
                    <div>
                        <div
                            style={{
                                fontWeight: 'bold',
                                color: '#7c3aed',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <Star size={16} color="#fbbf24" />
                            Upgrade to Premium
                        </div>
                        <div>
                            Unlock advanced analytics, custom themes, and
                            priority support.
                            <br />
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                50% off for the first month!
                            </span>
                        </div>
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.TOP}
                maxWidth="300px"
                slot={
                    <span
                        style={{
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                        }}
                    >
                        PRO
                    </span>
                }
                slotDirection={TooltipSlotDirection.RIGHT}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Account" />
            </Tooltip>

            <Tooltip
                content={
                    <div>
                        <div
                            style={{
                                fontWeight: 'bold',
                                color: '#059669',
                                marginBottom: '8px',
                            }}
                        >
                            🎉 Milestone Reached!
                        </div>
                        <div>
                            You've completed 100 tasks this month. Keep up the
                            great work!
                            <br />
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                View your achievement badge →
                            </span>
                        </div>
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.RIGHT}
                maxWidth="320px"
            >
                <Button buttonType={ButtonType.SECONDARY} text="Dashboard" />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tooltips used for feature announcements, promotions, and achievement notifications.',
            },
        },
    },
}
