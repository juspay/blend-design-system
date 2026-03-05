import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    TooltipV2,
    TooltipV2Align,
    TooltipV2Side,
    TooltipV2Size,
    TooltipV2SlotDirection,
} from '../../../../../packages/blend/lib/components/TooltipV2'
import { Button, ButtonType } from '@juspay/blend-design-system'
import {
    Info,
    HelpCircle,
    Star,
    AlertTriangle,
    CheckCircle,
    Settings,
    Shield,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof TooltipV2> = {
    title: 'Components/TooltipV2',
    component: TooltipV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A flexible tooltip component (V2) for displaying contextual information on hover or focus with customizable positioning, sizing, and content slots.

## Features
- Multiple positioning options (top, right, bottom, left)
- Flexible alignment (start, center, end)
- Two sizes (sm, lg)
- Optional arrow indicator
- Custom content slots with directional placement
- Controlled and uncontrolled modes
- Customizable delay duration
- Offset positioning control
- Accessible design with proper ARIA attributes
- Keyboard navigation support

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- Keyboard accessible (Tab, Enter, Space, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes
- Tooltip content accessible to screen readers
- Focus management for keyboard users
- Hover and focus trigger support
- Color contrast ratios meet WCAG 2.1 Level AA standards

**Level AAA Compliance**: ⚠️ Partial
- ✅ Compliant: 1.4.8 Visual Presentation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ Non-Compliant: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio

## Usage

\`\`\`tsx
import { TooltipV2, TooltipV2Side, TooltipV2Align, TooltipV2Size } from '@juspay/blend-design-system';

<TooltipV2
  content="This is a helpful tooltip"
  side={TooltipV2Side.TOP}
  size={TooltipV2Size.SM}
  showArrow={true}
>
  <Button text="Hover me" />
</TooltipV2>
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
        onOpenChange: {
            description:
                'Callback when open state changes (use with open for controlled mode)',
        },
        side: {
            control: 'select',
            options: Object.values(TooltipV2Side),
            description:
                'The side where the tooltip should appear relative to the trigger',
        },
        align: {
            control: 'select',
            options: Object.values(TooltipV2Align),
            description: 'The alignment of the tooltip relative to the trigger',
        },
        showArrow: {
            control: 'boolean',
            description:
                'Whether to show an arrow pointing to the trigger element',
        },
        size: {
            control: 'select',
            options: Object.values(TooltipV2Size),
            description: 'Size variant of the tooltip',
        },
        slotDirection: {
            control: 'select',
            options: Object.values(TooltipV2SlotDirection),
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
        fullWidth: {
            control: 'boolean',
            description:
                'Whether the trigger wrapper should take full width (useful for menu items)',
        },
        disableInteractive: {
            control: 'boolean',
            description:
                'If true, the tooltip will close when the cursor moves away from the trigger element, even if hovering over the tooltip itself.',
        },
        children: {
            description:
                'The trigger element that will show the tooltip on hover/focus',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TooltipV2>

export const Default: Story = {
    args: {
        content: 'This is a helpful tooltip',
        side: TooltipV2Side.TOP,
        align: TooltipV2Align.CENTER,
        showArrow: true,
        size: TooltipV2Size.SM,
        delayDuration: 300,
        offset: 5,
    },
    render: (args) => (
        <TooltipV2 {...args}>
            <Button text="Hover me" />
        </TooltipV2>
    ),
}

export const Interactive: Story = {
    args: {
        content:
            'Use the controls below to change props and see the tooltip update.',
        side: TooltipV2Side.TOP,
        align: TooltipV2Align.CENTER,
        showArrow: true,
        size: TooltipV2Size.SM,
        slotDirection: TooltipV2SlotDirection.LEFT,
        delayDuration: 300,
        offset: 5,
        fullWidth: false,
        disableInteractive: false,
    },
    render: (args) => (
        <TooltipV2 {...args}>
            <Button
                buttonType={ButtonType.PRIMARY}
                text="Hover or focus to see tooltip"
            />
        </TooltipV2>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Use the Controls panel to change side, align, size, delay, offset, and other props. The tooltip updates in real time.',
            },
        },
    },
}

export const Visual: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '48px',
                padding: '48px',
                alignItems: 'center',
                maxWidth: '600px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <TooltipV2
                    content="Top tooltip with arrow"
                    side={TooltipV2Side.TOP}
                    showArrow={true}
                    size={TooltipV2Size.SM}
                >
                    <Button buttonType={ButtonType.SECONDARY} text="Top" />
                </TooltipV2>
                <TooltipV2
                    content="Right tooltip"
                    side={TooltipV2Side.RIGHT}
                    showArrow={true}
                >
                    <Button buttonType={ButtonType.SECONDARY} text="Right" />
                </TooltipV2>
                <TooltipV2
                    content="Bottom tooltip"
                    side={TooltipV2Side.BOTTOM}
                    showArrow={true}
                >
                    <Button buttonType={ButtonType.SECONDARY} text="Bottom" />
                </TooltipV2>
                <TooltipV2
                    content="Left tooltip"
                    side={TooltipV2Side.LEFT}
                    showArrow={true}
                >
                    <Button buttonType={ButtonType.SECONDARY} text="Left" />
                </TooltipV2>
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <TooltipV2
                    content="Small size"
                    size={TooltipV2Size.SM}
                    showArrow={true}
                >
                    <Button buttonType={ButtonType.SECONDARY} text="SM" />
                </TooltipV2>
                <TooltipV2
                    content="Large tooltip with more content"
                    size={TooltipV2Size.LG}
                    showArrow={true}
                >
                    <Button buttonType={ButtonType.PRIMARY} text="LG" />
                </TooltipV2>
                <TooltipV2
                    content="With slot"
                    slot={<Info size={16} color="#3b82f6" />}
                    slotDirection={TooltipV2SlotDirection.LEFT}
                    size={TooltipV2Size.LG}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="With icon"
                        leadingIcon={<Info size={16} />}
                    />
                </TooltipV2>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Visual overview of TooltipV2: positions, sizes, and with slot. Use Controls on other stories to tweak individual props.',
            },
        },
    },
}

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
            <TooltipV2
                content={
                    <div>
                        <strong>Pro Tip</strong>
                        <br />
                        Use keyboard shortcuts for faster navigation
                    </div>
                }
                size={TooltipV2Size.LG}
                showArrow={true}
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Rich Content"
                    leadingIcon={<Info size={16} />}
                />
            </TooltipV2>

            <TooltipV2
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
                size={TooltipV2Size.LG}
                showArrow={true}
                side={TooltipV2Side.RIGHT}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Status"
                    leadingIcon={<CheckCircle size={16} />}
                />
            </TooltipV2>

            <TooltipV2
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
                size={TooltipV2Size.LG}
                showArrow={true}
                side={TooltipV2Side.BOTTOM}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Warning"
                    leadingIcon={<AlertTriangle size={16} />}
                />
            </TooltipV2>
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
            <TooltipV2
                content="Upgrade to premium for advanced features"
                slot={<Star size={16} color="#fbbf24" />}
                slotDirection={TooltipV2SlotDirection.LEFT}
                size={TooltipV2Size.LG}
                showArrow={true}
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Premium Features"
                />
            </TooltipV2>

            <TooltipV2
                content="Get help and support documentation"
                slot={<HelpCircle size={16} color="#3b82f6" />}
                slotDirection={TooltipV2SlotDirection.RIGHT}
                size={TooltipV2Size.LG}
                showArrow={true}
                side={TooltipV2Side.RIGHT}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Help Center" />
            </TooltipV2>

            <TooltipV2
                content="Security settings and privacy controls"
                slot={<Shield size={16} color="#10b981" />}
                slotDirection={TooltipV2SlotDirection.LEFT}
                size={TooltipV2Size.LG}
                showArrow={true}
                side={TooltipV2Side.BOTTOM}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Security"
                    leadingIcon={<Settings size={16} />}
                />
            </TooltipV2>
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
                        <TooltipV2
                            content="This tooltip is controlled by hover state"
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            showArrow={true}
                            size={TooltipV2Size.LG}
                        >
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Hover Controlled"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            />
                        </TooltipV2>

                        <TooltipV2
                            content="This tooltip is controlled by click state"
                            open={manualOpen}
                            onOpenChange={setManualOpen}
                            showArrow={true}
                            size={TooltipV2Size.LG}
                            side={TooltipV2Side.RIGHT}
                        >
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Click Controlled"
                                onClick={() => setManualOpen(!manualOpen)}
                            />
                        </TooltipV2>
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
                    <TooltipV2
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
                        side={TooltipV2Side.RIGHT}
                        size={TooltipV2Size.LG}
                        showArrow={true}
                        slot={<AlertTriangle size={14} color="#ef4444" />}
                        slotDirection={TooltipV2SlotDirection.LEFT}
                    >
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="!"
                            leadingIcon={
                                <AlertTriangle size={14} color="#ef4444" />
                            }
                        />
                    </TooltipV2>
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
                    <TooltipV2
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
                        side={TooltipV2Side.RIGHT}
                        size={TooltipV2Size.LG}
                        showArrow={true}
                    >
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="✓"
                            leadingIcon={
                                <CheckCircle size={16} color="#10b981" />
                            }
                        />
                    </TooltipV2>
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
            <TooltipV2
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
                size={TooltipV2Size.LG}
                showArrow={true}
                side={TooltipV2Side.BOTTOM}
                maxWidth="280px"
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Settings"
                    leadingIcon={<Settings size={16} />}
                />
            </TooltipV2>

            <TooltipV2
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
                size={TooltipV2Size.LG}
                showArrow={true}
                side={TooltipV2Side.TOP}
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
                slotDirection={TooltipV2SlotDirection.RIGHT}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Account" />
            </TooltipV2>
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

export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                maxWidth: '800px',
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Basic Accessible Tooltip
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Tooltip with proper ARIA attributes and keyboard support.
                    Tab to focus the button, then press Enter or Space to open
                    the tooltip.
                </p>
                <TooltipV2
                    content="This tooltip provides helpful information"
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Hover or Focus Me"
                    />
                </TooltipV2>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Keyboard Accessible Tooltip
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Tooltips are fully keyboard accessible. Use Tab to focus,
                    Enter or Space to open, Escape to close.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <TooltipV2
                        content="Keyboard accessible tooltip 1"
                        showArrow={true}
                    >
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Focus Me 1"
                        />
                    </TooltipV2>
                    <TooltipV2
                        content="Keyboard accessible tooltip 2"
                        showArrow={true}
                    >
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="Focus Me 2"
                        />
                    </TooltipV2>
                    <TooltipV2 content="Press Escape to close" showArrow={true}>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="Escape to Close"
                        />
                    </TooltipV2>
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Size Variants (Accessible)
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    All tooltip sizes maintain accessibility standards. Text
                    content is accessible to screen readers.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <TooltipV2
                        content="Small tooltip with concise information"
                        size={TooltipV2Size.SM}
                        showArrow={true}
                    >
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="Small Tooltip"
                        />
                    </TooltipV2>
                    <TooltipV2
                        content="Large tooltip with more detailed information and additional context that can span multiple lines while remaining accessible"
                        size={TooltipV2Size.LG}
                        showArrow={true}
                    >
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Large Tooltip"
                        />
                    </TooltipV2>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accessibility examples: keyboard support, ARIA attributes, and screen reader compatibility.',
            },
        },
        a11y: getA11yConfig('interactive'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
